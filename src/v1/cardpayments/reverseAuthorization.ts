/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, ApiPaymentReversalRequest, ApiReversalResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/ApiPaymentReversalRequest.json");

export function reverseAuthorization(
  sdkContext: SdkContext
): (
  acquirerId: string,
  merchantId: string,
  paymentId: string,
  body: ApiPaymentReversalRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<ApiReversalResponse, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, paymentId, body, paymentContext): Promise<SdkResponse<ApiReversalResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/processing/v1/${acquirerId}/${merchantId}/payments/${paymentId}/authorization-reversals`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<ApiReversalResponse, ApiPaymentErrorResponse>>;
  };
}
