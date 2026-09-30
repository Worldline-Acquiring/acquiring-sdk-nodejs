/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { AcceptDisputeLiabilityRequest, ApiPaymentErrorResponse, DisputeResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/AcceptDisputeLiabilityRequest.json");

export function acceptDisputeLiability(
  sdkContext: SdkContext
): (disputeId: string, body: AcceptDisputeLiabilityRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/dispute-management/v1/disputes/${disputeId}/accept`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>>;
  };
}
