/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiIncrementRequest, ApiIncrementResponse, ApiPaymentErrorResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/ApiIncrementRequest.json");

export function incrementPayment(
  sdkContext: SdkContext
): (
  acquirerId: string,
  merchantId: string,
  paymentId: string,
  body: ApiIncrementRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<ApiIncrementResponse, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, paymentId, body, paymentContext): Promise<SdkResponse<ApiIncrementResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/processing/v1/${acquirerId}/${merchantId}/payments/${paymentId}/increments`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<ApiIncrementResponse, ApiPaymentErrorResponse>>;
  };
}
