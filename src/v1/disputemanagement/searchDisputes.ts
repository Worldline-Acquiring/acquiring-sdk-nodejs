/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, SearchDisputesRequest, SearchDisputesResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/SearchDisputesRequest.json");

export function searchDisputes(
  sdkContext: SdkContext
): (body: SearchDisputesRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<SearchDisputesResponse, ApiPaymentErrorResponse>> {
  return function(body, paymentContext): Promise<SdkResponse<SearchDisputesResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/dispute-management/v1/disputes/search`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<SearchDisputesResponse, ApiPaymentErrorResponse>>;
  };
}
