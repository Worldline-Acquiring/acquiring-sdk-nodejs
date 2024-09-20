import { Server } from "http";
import { AddressInfo } from "net";
import * as express from "express";
import * as bodyParser from "body-parser";
import { OAuth2Authenticator } from "../../../src/utils/authentication";
import { OAuth2Configuration } from "../../../src/model";

/**
 * @group unit
 */
describe("OAuth2 authentication", () => {
  let server: Server | undefined;

  afterEach(() => server?.close());

  describe("successful authentication", () => {
    test("single request", async () => {
      const app = express();
      app.use(
        bodyParser.text({
          type: "*/*"
        })
      );
      app.post("/auth/realms/api/protocol/openid-connect/token", (req, res) => {
        res.status(200).json({
          access_token: req.body,
          expires_in: 300
        });
      });
      server = app.listen();
      const address = server.address() as AddressInfo;

      const configuration: OAuth2Configuration = {
        oauth2TokenUri: `http://localhost:${address.port}/auth/realms/api/protocol/openid-connect/token`,
        oauth2ClientId: "clientId",
        oauth2ClientSecret: "clientSecret",
        host: "dummy",
        integrator: "Worldline"
      };
      const authenticator = new OAuth2Authenticator(configuration);
      const expectedScopes = [
        "processing_payment",
        "processing_refund",
        "processing_credittransfer",
        "processing_accountverification",
        "processing_operation_reverse",
        "processing_dcc_rate",
        "services_ping"
      ].join(" ");
      const authorization = await authenticator.getAuthorization("", "", "", [], "/operations");
      expect(authorization).toBe(`Bearer grant_type=client_credentials&client_id=clientId&client_secret=clientSecret&scope=${expectedScopes}`);
    });

    test("multiple requests", done => {
      let requestCount = 0;

      let returnResponse: () => void = () => setTimeout(() => returnResponse(), 100);

      const app = express();
      app.use(
        bodyParser.text({
          type: "*/*"
        })
      );
      app.post("/auth/realms/api/protocol/openid-connect/token", (req, res) => {
        requestCount++;
        returnResponse = (): void => {
          res.status(200).json({
            access_token: req.body,
            expires_in: 300
          });
        };
      });
      server = app.listen();
      const address = server.address() as AddressInfo;

      const configuration: OAuth2Configuration = {
        oauth2TokenUri: `http://localhost:${address.port}/auth/realms/api/protocol/openid-connect/token`,
        oauth2ClientId: "clientId",
        oauth2ClientSecret: "clientSecret",
        host: "dummy",
        integrator: "Worldline"
      };
      const authenticator = new OAuth2Authenticator(configuration);
      const expectedScopes = [
        "processing_payment",
        "processing_refund",
        "processing_credittransfer",
        "processing_accountverification",
        "processing_operation_reverse",
        "processing_dcc_rate",
        "services_ping"
      ].join(" ");
      let authorizedCount = 0;
      for (let i = 0; i < 10; i++) {
        authenticator.getAuthorization("", "", "", [], "/operations").then(authorization => {
          expect(authorization).toBe(`Bearer grant_type=client_credentials&client_id=clientId&client_secret=clientSecret&scope=${expectedScopes}`);
          expect(requestCount).toBe(1);
          authorizedCount++;
          if (authorizedCount === 10) {
            done();
          }
        });
      }
      returnResponse();
    });
  });

  describe("failed authentication", () => {
    test("single request", async () => {
      const app = express();
      app.post("/auth/realms/api/protocol/openid-connect/token", (req, res) => {
        res.status(401).json({
          error: "unauthorized_client",
          error_description: "INVALID_CREDENTIALS: Invalid client credentials"
        });
      });
      server = app.listen();
      const address = server.address() as AddressInfo;

      const configuration: OAuth2Configuration = {
        oauth2TokenUri: `http://localhost:${address.port}/auth/realms/api/protocol/openid-connect/token`,
        oauth2ClientId: "clientId",
        oauth2ClientSecret: "clientSecret",
        host: "dummy",
        integrator: "Worldline"
      };
      const authenticator = new OAuth2Authenticator(configuration);
      const error = await authenticator.getAuthorization("", "", "", [], "/operations").catch(error => error);
      expect(error?.message).toBe("There was an error while retrieving the OAuth2 access token: unauthorized_client - INVALID_CREDENTIALS: Invalid client credentials");
    });

    test("multiple requests", done => {
      let requestCount = 0;

      let returnResponse: () => void = () => setTimeout(() => returnResponse(), 100);

      const app = express();
      app.post("/auth/realms/api/protocol/openid-connect/token", (req, res) => {
        requestCount++;
        returnResponse = (): void => {
          res.status(401).json({
            error: "unauthorized_client",
            error_description: "INVALID_CREDENTIALS: Invalid client credentials"
          });
        };
      });
      server = app.listen();
      const address = server.address() as AddressInfo;

      const configuration: OAuth2Configuration = {
        oauth2TokenUri: `http://localhost:${address.port}/auth/realms/api/protocol/openid-connect/token`,
        oauth2ClientId: "clientId",
        oauth2ClientSecret: "clientSecret",
        host: "dummy",
        integrator: "Worldline"
      };
      const authenticator = new OAuth2Authenticator(configuration);
      let authorizedCount = 0;
      for (let i = 0; i < 10; i++) {
        authenticator.getAuthorization("", "", "", [], "/operations").catch(error => {
          expect(error.message).toBe("There was an error while retrieving the OAuth2 access token: unauthorized_client - INVALID_CREDENTIALS: Invalid client credentials");
          expect(requestCount).toBe(1);
          authorizedCount++;
          if (authorizedCount === 10) {
            done();
          }
        });
      }
      returnResponse();
    });
  });

  describe("expired token", () => {
    test("single request", async () => {
      let requestCount = 0;

      const app = express();
      app.post("/auth/realms/api/protocol/openid-connect/token", (req, res) => {
        requestCount++;
        res.status(200).json({
          access_token: "expiredAccessToken",
          expires_in: -1
        });
      });
      server = app.listen();
      const address = server.address() as AddressInfo;

      const configuration: OAuth2Configuration = {
        oauth2TokenUri: `http://localhost:${address.port}/auth/realms/api/protocol/openid-connect/token`,
        oauth2ClientId: "clientId",
        oauth2ClientSecret: "clientSecret",
        host: "dummy",
        integrator: "Worldline"
      };
      const authenticator = new OAuth2Authenticator(configuration);
      const authorization = await authenticator.getAuthorization("", "", "", [], "/operations");
      expect(authorization).toBe("Bearer expiredAccessToken");
      expect(requestCount).toBe(1);

      const authorization2 = await authenticator.getAuthorization("", "", "", [], "/operations");
      expect(authorization2).toBe("Bearer expiredAccessToken");
      expect(requestCount).toBe(2);
    });

    test("multiple requests", done => {
      let requestCount = 0;

      let returnResponse: () => void = () => setTimeout(() => returnResponse(), 100);

      const app = express();
      app.post("/auth/realms/api/protocol/openid-connect/token", (req, res) => {
        requestCount++;
        returnResponse = (): void => {
          res.status(200).json({
            access_token: "accessToken",
            expires_in: -1
          });
        };
      });
      server = app.listen();
      const address = server.address() as AddressInfo;

      const configuration: OAuth2Configuration = {
        oauth2TokenUri: `http://localhost:${address.port}/auth/realms/api/protocol/openid-connect/token`,
        oauth2ClientId: "clientId",
        oauth2ClientSecret: "clientSecret",
        host: "dummy",
        integrator: "Worldline"
      };
      const authenticator = new OAuth2Authenticator(configuration);
      let authorizedCount = 0;
      for (let i = 0; i < 10; i++) {
        authenticator.getAuthorization("", "", "", [], "/operations").then(authorization => {
          expect(authorization).toBe("Bearer accessToken");
          expect(requestCount).toBe(1);
          authorizedCount++;
          if (authorizedCount === 10) {
            done();
          }
        });
      }
      returnResponse();
    });
  });

  // currently all paths match
  test.skip("unsupported path", async () => {
    const app = express();
    server = app.listen();
    const address = server.address() as AddressInfo;

    const configuration: OAuth2Configuration = {
      oauth2TokenUri: `http://localhost:${address.port}/auth/realms/api/protocol/openid-connect/token`,
      oauth2ClientId: "clientId",
      oauth2ClientSecret: "clientSecret",
      host: "dummy",
      integrator: "Worldline"
    };
    const authenticator = new OAuth2Authenticator(configuration);
    const error = await authenticator.getAuthorization("", "", "", [], "/unsupported-path").catch(error => error);
    expect(error?.message).toBe("Scope could not be found for path /unsupported-path");
  });
});
