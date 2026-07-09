/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, ApiRefundRequest, ApiRefundResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/ApiRefundRequest.json");

export function processStandaloneRefund(
  sdkContext: SdkContext
): (acquirerId: string, merchantId: string, body: ApiRefundRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<ApiRefundResponse, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, body, paymentContext): Promise<SdkResponse<ApiRefundResponse, ApiPaymentErrorResponse>> {
    // validate body
    const isValidRequest = validate(body, requestSchema);
    if (!isValidRequest.valid) {
      const logger = sdkContext.getLogger();
      if (sdkContext.isLoggingEnabled()) {
        logger("error", isValidRequest.errors);
      }
      throw new Error(isValidRequest.errors.toString());
    }
    return json(
      {
        method: "POST",
        modulePath: `/processing/v1/${acquirerId}/${merchantId}/refunds`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<ApiRefundResponse, ApiPaymentErrorResponse>>;
  };
}
