/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, DisputeEntryResources, SearchDisputeEntriesRequest } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/SearchDisputeEntriesRequest.json");

export function searchDisputeEntries(
  sdkContext: SdkContext
): (body: SearchDisputeEntriesRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<DisputeEntryResources, ApiPaymentErrorResponse>> {
  return function(body, paymentContext): Promise<SdkResponse<DisputeEntryResources, ApiPaymentErrorResponse>> {
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
        modulePath: `/dispute-management/v1/dispute-entries/search`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<DisputeEntryResources, ApiPaymentErrorResponse>>;
  };
}
