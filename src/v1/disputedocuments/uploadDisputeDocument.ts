/*
 * This file was automatically generated.
 */
import { multipart } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { UploadDisputeDocumentRequest } from "../model/disputedocuments";
import { ApiPaymentErrorResponse, UploadDocumentResponse } from "../model/domain";

export function uploadDisputeDocument(
  sdkContext: SdkContext
): (body: UploadDisputeDocumentRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<UploadDocumentResponse, ApiPaymentErrorResponse>> {
  return function(body, paymentContext): Promise<SdkResponse<UploadDocumentResponse, ApiPaymentErrorResponse>> {
    return multipart(
      {
        method: "POST",
        modulePath: `/dispute-management/v1/documents`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<UploadDocumentResponse, ApiPaymentErrorResponse>>;
  };
}
