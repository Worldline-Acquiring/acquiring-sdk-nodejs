/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiAccountVerificationRequest, ApiAccountVerificationResponse, ApiPaymentErrorResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/ApiAccountVerificationRequest.json");

export function processAccountVerification(
  sdkContext: SdkContext
): (
  acquirerId: string,
  merchantId: string,
  body: ApiAccountVerificationRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<ApiAccountVerificationResponse, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, body, paymentContext): Promise<SdkResponse<ApiAccountVerificationResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/processing/v1/${acquirerId}/${merchantId}/account-verifications`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<ApiAccountVerificationResponse, ApiPaymentErrorResponse>>;
  };
}
