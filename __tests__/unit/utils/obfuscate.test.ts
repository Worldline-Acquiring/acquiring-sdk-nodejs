import each from "jest-each";
import * as http from "http";
import * as _ from "lodash";
import * as obfuscate from "../../../src/utils/obfuscate";
import { ObfuscationRule, SdkContext } from "../../../src/model";
import { newSdkContext } from "../../../src/utils/context";

/**
 * @group unit:obfuscate
 */
describe("obfuscate.getObfuscated", () => {
  let sdkContext: SdkContext;

  beforeEach(() => {
    sdkContext = newSdkContext({
      host: "example.org",
      scheme: "https",
      port: -1,
      enableLogging: false,
      oauth2ClientId: "dummy",
      oauth2ClientSecret: "dummy",
      oauth2TokenUri: "http://localhost/auth/realms/api/protocol/openid-connect/token",
      integrator: "Integration tests"
    });
  });

  test("undefined body", () => {
    expect(obfuscate.getObfuscated(undefined, sdkContext)).toBe("");
  });

  test("empty body", () => {
    expect(obfuscate.getObfuscated("", sdkContext)).toBe("");
  });

  test("cardNumber", () => {
    const body = {
      amount: {
        currencyCode: "CAD",
        amount: 2345
      },
      cardPaymentData: {
        cardData: {
          cardSecurityCode: "123",
          cardNumber: "1234567890123456",
          expiryDate: "122024"
        }
      }
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.cardPaymentData.cardData.cardSecurityCode = "***";
    expected.cardPaymentData.cardData.cardNumber = "************3456";
    expected.cardPaymentData.cardData.expiryDate = "**2024";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("cardNumber with custom rule", () => {
    const body = {
      amount: {
        currencyCode: "CAD",
        amount: 2345
      },
      cardPaymentData: {
        cardData: {
          cardSecurityCode: "123",
          cardNumber: "1234567890123456",
          expiryDate: "122024"
        }
      }
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.cardPaymentData.cardData.cardSecurityCode = "***";
    expected.cardPaymentData.cardData.cardNumber = "123456******3456";
    expected.cardPaymentData.cardData.expiryDate = "**2024";

    const obfuscationRule: ObfuscationRule = value => value.substring(0, 6) + _.padStart("", 6, "*") + value.substring(12);
    sdkContext.getObfuscationRules().cardNumber = obfuscationRule;

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("bin", () => {
    const body = {
      bin: "12345678"
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.bin = "123456**";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("no matches", () => {
    const body = {
      amount: {
        currencyCode: "EUR",
        amount: 1000
      },
      authorizationType: "PRE_AUTHORIZATION"
    };
    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(body, null, 2));
  });

  test("not matching object", () => {
    const body = {
      values: [{ name: true }, { name: "12345" }, { name: 12345 }, { name: {} }]
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.values[0].name = "****";
    expected.values[1].name = "*****";
    expected.values[2].name = "*****";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  const headersTestData = [
    ["Authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["AUTHORIZATION", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],

    ["Content-Type", "application/json", "application/json"],
    ["content-type", "application/json", "application/json"],
    ["CONTENT-TYPE", "application/json", "application/json"]
  ];
  each(headersTestData).test("when the header is '%s'", (name, originalValue, expectedObfuscatedValue) => {
    const headers: http.IncomingHttpHeaders = {};
    headers[name] = originalValue;
    headers["content-length"] = "5";

    const expected = JSON.parse(JSON.stringify(headers));
    expected[name] = expectedObfuscatedValue;

    expect(obfuscate.getObfuscated(headers, sdkContext, true)).toBe(JSON.stringify(expected, null, 2));
  });

  const customHeadersTestData = [
    ["Authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["AUTHORIZATION", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],

    ["Content-Type", "application/json", "****************"],
    ["content-type", "application/json", "****************"],
    ["CONTENT-TYPE", "application/json", "****************"]
  ];
  each(customHeadersTestData).test("when the header is '%s'", (name, originalValue, expectedObfuscatedValue) => {
    const headers: http.IncomingHttpHeaders = {};
    headers[name] = originalValue;
    headers["content-length"] = "5";

    const expected = JSON.parse(JSON.stringify(headers));
    expected[name] = expectedObfuscatedValue;

    const obfuscationRule: ObfuscationRule = obfuscate.all();
    sdkContext.getObfuscationRules()["content-type"] = obfuscationRule;

    expect(obfuscate.getObfuscated(headers, sdkContext, true)).toBe(JSON.stringify(expected, null, 2));
  });
});
