/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as uuid from "uuid";
import { assertSuccess } from "../../src";
import { clientWithOAuth2Scopes, config } from "./init";

/**
 * @group integration
 */
describe("OAuth2 authentication", () => {
  const body = {
    operationId: uuid.v4(),
    targetCurrency: "EUR",
    cardPaymentData: {
      bin: "41766699",
      brand: "VISA"
    },
    pointOfSaleData: {
      terminalId: "12345678"
    },
    transaction: {
      amount: {
        amount: 200,
        currencyCode: "GBP",
        numberOfDecimals: 2
      },
      transactionType: "PAYMENT",
      transactionTimestamp: new Date().toISOString()
    }
  };

  const validScopes = ["processing_dcc_rate", "processing_dcc_rate services_ping", "", undefined];
  test.each(validScopes)("called with scopes '%s'", async oauth2Scopes => {
    const response = await clientWithOAuth2Scopes(oauth2Scopes).v1.dynamicCurrencyConversion.requestDccRate(config.acquirerId, config.merchantId, body);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();

    const responseBody = assertSuccess(response).body;
    expect(responseBody.proposal?.originalAmount).toStrictEqual(body.transaction?.amount);
    expect(responseBody.proposal?.resultingAmount?.currencyCode).toBe(body.targetCurrency);
  });

  test("called with missing scopes", async () => {
    const response = await clientWithOAuth2Scopes("services_ping").v1.dynamicCurrencyConversion.requestDccRate(config.acquirerId, config.merchantId, body);
    expect(response.status).toBe(403);
    expect(response.body).not.toBeNull();
  });

  test("called with invalid scopes", async () => {
    expect.assertions(2);

    await clientWithOAuth2Scopes("processing_dcc_rate invalid_scope")
      .v1.dynamicCurrencyConversion.requestDccRate(config.acquirerId, config.merchantId, body)
      .catch(e => {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch(/There was an error while retrieving the OAuth2 access token: invalid_scope - .*/);
      });
  });
});
