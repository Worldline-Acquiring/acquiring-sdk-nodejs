/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, GetDCCRateRequest, GetDccRateResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/GetDCCRateRequest.json");

export function requestDccRate(
  sdkContext: SdkContext
): (acquirerId: string, merchantId: string, body: GetDCCRateRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetDccRateResponse, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, body, paymentContext): Promise<SdkResponse<GetDccRateResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/services/v1/${acquirerId}/${merchantId}/dcc-rates`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetDccRateResponse, ApiPaymentErrorResponse>>;
  };
}
