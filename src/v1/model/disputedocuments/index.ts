/*
 * This file was automatically generated.
 */
import { MultipartFormDataObject, PaymentContext, SdkBinaryResponse, SdkResponse, UploadableFile } from "../../../model/types";
import { ApiPaymentErrorResponse, UploadDocumentResponse } from "../domain";

export interface DisputeDocumentsClient {
  /**
   * Resource /dispute-management/v1/documents - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dispute-Documents/operation/uploadDisputeDocument">Upload Dispute Document</a>
   */
  uploadDisputeDocument(body: UploadDisputeDocumentRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<UploadDocumentResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /dispute-management/v1/disputes/{disputeId}/documents/{documentId} - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dispute-Documents/operation/getDisputeDocument">Retrieve Dispute Document</a>
   */
  getDisputeDocument(disputeId: string, documentId: string, paymentContext?: PaymentContext | null): Promise<SdkBinaryResponse<ApiPaymentErrorResponse>>;
}

export interface UploadDisputeDocumentRequest extends MultipartFormDataObject {
  file?: UploadableFile;
}
