/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, ApiTechnicalReversalRequest, ApiTechnicalReversalResponse } from "../model/domain";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestSchema = require("../../../schemas/v1/ApiTechnicalReversalRequest.json");

export function technicalReversal(
  sdkContext: SdkContext
): (
  acquirerId: string,
  merchantId: string,
  operationId: string,
  body: ApiTechnicalReversalRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<ApiTechnicalReversalResponse, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, operationId, body, paymentContext): Promise<SdkResponse<ApiTechnicalReversalResponse, ApiPaymentErrorResponse>> {
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
        modulePath: `/processing/v1/${acquirerId}/${merchantId}/operations/${operationId}/reverse`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<ApiTechnicalReversalResponse, ApiPaymentErrorResponse>>;
  };
}
