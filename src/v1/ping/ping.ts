/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse } from "../model/domain";

export function ping(sdkContext: SdkContext): (paymentContext?: PaymentContext | null) => Promise<SdkResponse<void, ApiPaymentErrorResponse>> {
  return function(paymentContext): Promise<SdkResponse<void, ApiPaymentErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/services/v1/ping`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<void, ApiPaymentErrorResponse>>;
  };
}
