/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as uuid from "uuid";
import { assertSuccess } from "../../../src";
import client, { config } from "../init";

/**
 * @group integration
 */
describe("processPayment", () => {
  test("called successfully", async () => {
    const body = {
      amount: {
        amount: 200,
        currencyCode: "GBP",
        numberOfDecimals: 2
      },
      authorizationType: "PRE_AUTHORIZATION",
      transactionTimestamp: new Date().toISOString(),
      cardPaymentData: {
        cardEntryMode: "ECOMMERCE",
        allowPartialApproval: false,
        brand: "VISA",
        captureImmediately: false,
        cardholderVerificationMethod: "CARD_SECURITY_CODE",
        cardData: {
          expiryDate: "122031",
          cardNumber: "4176669999000104",
          cardSecurityCode: "012"
        }
      },
      references: {
        merchantReference: `your-order-${uuid.v4()}`
      },
      operationId: uuid.v4()
    };

    const processResponse = await client.v1.payments.processPayment(config.acquirerId, config.merchantId, body);
    expect(processResponse.status).toBe(201);
    expect(processResponse.body).not.toBeNull();

    const processResponseBody = assertSuccess(processResponse).body;
    expect(processResponseBody.operationId).toBe(body.operationId);
    expect(processResponseBody.responseCode).toBe("0");
    expect(processResponseBody.responseCodeCategory).toBe("APPROVED");
    expect(processResponseBody.responseCodeDescription).toBeTruthy();
    expect(processResponseBody.status).toBe("AUTHORIZED");
    expect(processResponseBody.initialAuthorizationCode).toBeTruthy();
    expect(processResponseBody.paymentId).toBeTruthy();
    expect(processResponseBody.totalAuthorizedAmount).toStrictEqual(body.amount);

    const query = {
      returnOperations: true
    };

    const statusResponse = await client.v1.payments.getPaymentStatus(config.acquirerId, config.merchantId, processResponseBody.paymentId!, query);
    expect(statusResponse.status).toBe(200);
    expect(statusResponse.body).not.toBeNull();

    const statusResponseBody = assertSuccess(statusResponse).body;
    expect(statusResponseBody.initialAuthorizationCode).toBe(processResponseBody.initialAuthorizationCode);
    expect(statusResponseBody.paymentId).toBe(processResponseBody.paymentId);
    expect(statusResponseBody.status).toBe(processResponseBody.status);
  });
});
