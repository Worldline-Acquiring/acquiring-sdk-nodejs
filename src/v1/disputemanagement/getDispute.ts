/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { GetDisputeParams } from "../model/disputemanagement";
import { ApiPaymentErrorResponse, DisputeResponse } from "../model/domain";

export function getDispute(sdkContext: SdkContext): (disputeId: string, params: GetDisputeParams) => Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>> {
  return function(disputeId, params): Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/dispute-management/v1/disputes/${disputeId}`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>>;
  };
}
