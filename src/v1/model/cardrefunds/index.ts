/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import {
  ApiActionResponseForRefund,
  ApiCaptureRequestForRefund,
  ApiPaymentErrorResponse,
  ApiRefundRequest,
  ApiRefundResource,
  ApiRefundResponse,
  ApiRefundReversalRequest
} from "../domain";

export interface CardRefundsClient {
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Refunds/operation/processStandaloneRefund">Create standalone card refund</a>
   */
  processStandaloneRefund(
    acquirerId: string,
    merchantId: string,
    body: ApiRefundRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiRefundResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds/{refundId} - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Refunds/operation/getRefund">Retrieve card refund</a>
   */
  getRefund(acquirerId: string, merchantId: string, refundId: string, params: GetRefundParams): Promise<SdkResponse<ApiRefundResource, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds/{refundId}/captures - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Refunds/operation/captureRefund">Capture refund</a>
   */
  captureRefund(
    acquirerId: string,
    merchantId: string,
    refundId: string,
    body: ApiCaptureRequestForRefund,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiActionResponseForRefund, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/refunds/{refundId}/authorization-reversals - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Refunds/operation/reverseRefundAuthorization">Reverse refund authorization</a>
   */
  reverseRefundAuthorization(
    acquirerId: string,
    merchantId: string,
    refundId: string,
    body: ApiRefundReversalRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiActionResponseForRefund, ApiPaymentErrorResponse>>;
}

export interface GetRefundParams extends PaymentContext {
  returnOperations?: boolean;
}
