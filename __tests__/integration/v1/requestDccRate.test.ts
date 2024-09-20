/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as uuid from "uuid";
import { assertSuccess } from "../../../src";
import client, { config } from "../init";

/**
 * @group integration
 */
describe("requestDccRate", () => {
  test("called successfully", async () => {
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

    const response = await client.v1.dynamicCurrencyConversion.requestDccRate(config.acquirerId, config.merchantId, body);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();

    const responseBody = assertSuccess(response).body;
    expect(responseBody.proposal?.originalAmount).toStrictEqual(body.transaction?.amount);
    expect(responseBody.proposal?.resultingAmount?.currencyCode).toBe(body.targetCurrency);
  });
});
