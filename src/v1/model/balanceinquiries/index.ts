/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import { ApiBalanceInquiryRequest, ApiBalanceInquiryResponse, ApiPaymentErrorResponse } from "../domain";

export interface BalanceInquiriesClient {
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/balance-inquiries - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Balance-Inquiries/operation/processBalanceInquiry">Balance inquiry</a>
   */
  processBalanceInquiry(
    acquirerId: string,
    merchantId: string,
    body: ApiBalanceInquiryRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiBalanceInquiryResponse, ApiPaymentErrorResponse>>;
}
