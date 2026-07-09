/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { GetRefundParams } from "../model/cardrefunds";
import { ApiPaymentErrorResponse, ApiRefundResource } from "../model/domain";

export function getRefund(
  sdkContext: SdkContext
): (acquirerId: string, merchantId: string, refundId: string, params: GetRefundParams) => Promise<SdkResponse<ApiRefundResource, ApiPaymentErrorResponse>> {
  return function(acquirerId, merchantId, refundId, params): Promise<SdkResponse<ApiRefundResource, ApiPaymentErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/processing/v1/${acquirerId}/${merchantId}/refunds/${refundId}`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<ApiRefundResource, ApiPaymentErrorResponse>>;
  };
}
