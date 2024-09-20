/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import {
  ApiActionResponseForRefund,
  ApiCaptureRequestForRefund,
  ApiPaymentErrorResponse,
  ApiPaymentReversalRequest,
  ApiRefundRequest,
  ApiRefundResource,
  ApiRefundResponse
} from "../domain";

export interface RefundsClient {
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Refunds/operation/processStandaloneRefund">Create standalone refund</a>
   */
  processStandaloneRefund(
    acquirerId: string,
    merchantId: string,
    body: ApiRefundRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiRefundResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds/{refundId} - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Refunds/operation/getRefund">Retrieve refund</a>
   */
  getRefund(acquirerId: string, merchantId: string, refundId: string, params: GetRefundParams): Promise<SdkResponse<ApiRefundResource, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds/{refundId}/captures - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Refunds/operation/captureRefund">Capture refund</a>
   */
  captureRefund(
    acquirerId: string,
    merchantId: string,
    refundId: string,
    body: ApiCaptureRequestForRefund,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiActionResponseForRefund, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds/{refundId}/authorization-reversals - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Refunds/operation/reverseRefundAuthorization">Reverse refund authorization</a>
   */
  reverseRefundAuthorization(
    acquirerId: string,
    merchantId: string,
    refundId: string,
    body: ApiPaymentReversalRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiActionResponseForRefund, ApiPaymentErrorResponse>>;
}

export interface GetRefundParams extends PaymentContext {
  returnOperations?: boolean;
}
