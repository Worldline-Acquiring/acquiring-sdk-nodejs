/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, DisputeResponse, SubmitEvidenceRequest } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/SubmitEvidenceRequest.json");

export function submitEvidence(
  sdkContext: SdkContext
): (disputeId: string, body: SubmitEvidenceRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>> {
  return function(disputeId, body, paymentContext): Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/dispute-management/v1/disputes/${disputeId}/submit-evidence`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>>;
  };
}
