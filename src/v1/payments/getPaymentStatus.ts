/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { ApiPaymentErrorResponse, ApiPaymentResource } from "../model/domain";
import { GetPaymentStatusParams } from "../model/payments";

export function getPaymentStatus(
  sdkContext: SdkContext
): (acquirerId: string, merchantId: string, paymentId: string, params: GetPaymentStatusParams) => Promise<SdkResponse<ApiPaymentResource, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, paymentId, params): Promise<SdkResponse<ApiPaymentResource, ApiPaymentErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/processing/v1/${acquirerId}/${merchantId}/payments/${paymentId}`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<ApiPaymentResource, ApiPaymentErrorResponse>>;
  };
}
