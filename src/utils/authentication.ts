import * as http from "http";
import * as https from "https";
import { URL } from "url";
import { Authenticator, ConnectionOptions, Header, OAuth2Configuration, ProxyConfiguration } from "../model";
import { applyConnectionOptions, applyProxyConfiguration } from "./connection";

// OAuth2

interface OAuth2AccessToken {
  readonly accessToken: string;
  readonly expirationTime: number;
}

interface PromiseFunctions {
  resolve: (authorization: string) => void;
  reject: (reason: Error) => void;
}

interface TokenType {
  scopes: string[];
  promises: PromiseFunctions[];
  accessToken?: OAuth2AccessToken;
}

function findTokenTypeForPath(accessTokens: Record<string, TokenType>, path: string): TokenType | undefined {
  for (const pathPart in accessTokens) {
    if (path.endsWith(pathPart) || path.includes(pathPart + "/")) {
      return accessTokens[pathPart];
    }
  }
  return undefined;
}

export class OAuth2Authenticator implements Authenticator {
  private readonly oauth2TokenUrl: URL;
  private readonly oauth2ClientId: string;
  private readonly oauth2ClientSecret: string;
  private readonly proxy?: ProxyConfiguration;
  private readonly connectionOptions?: ConnectionOptions;
  private readonly accessTokens: Record<string, TokenType>;

  constructor(configuration: OAuth2Configuration) {
    this.oauth2TokenUrl = new URL(configuration.oauth2TokenUri);
    this.oauth2ClientId = configuration.oauth2ClientId;
    this.oauth2ClientSecret = configuration.oauth2ClientSecret;
    this.proxy = configuration.proxy;
    this.connectionOptions = configuration.connectionOptions;

    // Only a limited amount of scopes may be sent in one request.
    // While at the moment all scopes fit in one request, keep this code so we can easily add more token types if necessary.
    // The empty path will ensure that all paths will match, as each full path ends with an empty string.
    this.accessTokens = {
      "": {
        scopes: [
          "processing_payment",
          "processing_refund",
          "processing_credittransfer",
          "processing_accountverification",
          "processing_operation_reverse",
          "processing_dcc_rate",
          "services_ping"
        ],
        promises: []
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAuthorization(_method: string, _contentType: string, _date: string, _headers: Header[], path: string): Promise<string> {
    const currentTime = new Date().getTime();
    const tokenType = findTokenTypeForPath(this.accessTokens, path);
    if (!tokenType) {
      throw new Error(`Scope could not be found for path ${path}`);
    }
    if (tokenType.accessToken && tokenType.accessToken.expirationTime > currentTime) {
      return `Bearer ${tokenType.accessToken.accessToken}`;
    }
    if (tokenType.promises.length === 0) {
      // No requests in progress
      return new Promise((resolve, reject) => {
        tokenType.promises.push({ resolve, reject });

        const options: https.RequestOptions = {
          host: this.oauth2TokenUrl.hostname,
          protocol: this.oauth2TokenUrl.protocol,
          port: this.oauth2TokenUrl.port,
          path: this.oauth2TokenUrl.pathname,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
        applyProxyConfiguration(options, this.proxy);
        applyConnectionOptions(options, this.connectionOptions);

        const h = options.protocol === "https:" ? https : http;
        const req = h.request(options, res => {
          let body = "";

          res.setEncoding("utf8");
          res.on("data", chunk => {
            body += chunk;
          });
          res.on("end", () => {
            const responseBody = JSON.parse(body);
            if (res.statusCode === 200) {
              const accessToken = responseBody.access_token;
              tokenType.accessToken = {
                accessToken: accessToken,
                expirationTime: currentTime + responseBody.expires_in * 1000
              };
              const promises = tokenType.promises;
              tokenType.promises = [];
              promises.forEach(promise => promise.resolve(`Bearer ${accessToken}`));
            } else {
              const error = new Error(`There was an error while retrieving the OAuth2 access token: ${responseBody.error} - ${responseBody.error_description}`);
              const promises = tokenType.promises;
              tokenType.promises = [];
              promises.forEach(promise => promise.reject(error));
            }
          });
        });
        req.on("error", e => {
          const promises = tokenType.promises;
          tokenType.promises = [];
          promises.forEach(promise => promise.reject(e));
        });

        req.write(`grant_type=client_credentials&client_id=${this.oauth2ClientId}&client_secret=${this.oauth2ClientSecret}&scope=${tokenType.scopes.join(" ")}`);
        req.end();
      });
    }
    // A request is already in progress
    return new Promise((resolve, reject) => tokenType.promises.push({ resolve, reject }));
  }
}
