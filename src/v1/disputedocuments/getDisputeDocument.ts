/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkBinaryResponse, SdkContext } from "../../model";
import { ApiPaymentErrorResponse } from "../model/domain";

export function getDisputeDocument(
  sdkContext: SdkContext
): (disputeId: string, documentId: string, paymentContext?: PaymentContext | null) => Promise<SdkBinaryResponse<ApiPaymentErrorResponse>> {
  return function(disputeId, documentId, paymentContext): Promise<SdkBinaryResponse<ApiPaymentErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/dispute-management/v1/disputes/${disputeId}/documents/${documentId}`,
        body: null,
        paymentContext: paymentContext,
        expectBinaryResponse: true
      },
      sdkContext
    ) as Promise<SdkBinaryResponse<ApiPaymentErrorResponse>>;
  };
}
