import * as sdk from "../../src";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config = require("../config.json");

jest.setTimeout(60 * 1000);

const client = sdk.init({
  host: config.apiEndpoint.host,
  scheme: config.apiEndpoint.scheme,
  port: config.apiEndpoint.port,
  enableLogging: config.enableLogging, // defaults to false
  oauth2ClientId: config.oauth2.clientId,
  oauth2ClientSecret: config.oauth2.clientSecret,
  oauth2TokenUri: config.oauth2.tokenUri,
  integrator: config.integrator,
  proxy: config.proxy
});

export default client;
