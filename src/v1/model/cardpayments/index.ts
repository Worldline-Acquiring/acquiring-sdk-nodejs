/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import {
  ApiActionResponse,
  ApiActionResponseForRefund,
  ApiCaptureRequest,
  ApiIncrementRequest,
  ApiIncrementResponse,
  ApiPaymentErrorResponse,
  ApiPaymentRefundRequest,
  ApiPaymentRequest,
  ApiPaymentResource,
  ApiPaymentResponse,
  ApiPaymentReversalRequest,
  ApiReversalResponse
} from "../domain";

export interface CardPaymentsClient {
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/payments - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Payments/operation/processPayment">Create payment</a>
   */
  processPayment(
    acquirerId: string,
    merchantId: string,
    body: ApiPaymentRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiPaymentResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/payments/{paymentId} - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Payments/operation/getPaymentStatus">Retrieve payment</a>
   */
  getPaymentStatus(acquirerId: string, merchantId: string, paymentId: string, params: GetPaymentStatusParams): Promise<SdkResponse<ApiPaymentResource, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/payments/{paymentId}/captures - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Payments/operation/simpleCaptureOfPayment">Capture payment</a>
   */
  simpleCaptureOfPayment(
    acquirerId: string,
    merchantId: string,
    paymentId: string,
    body: ApiCaptureRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiActionResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/payments/{paymentId}/authorization-reversals - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Payments/operation/reverseAuthorization">Reverse authorization</a>
   */
  reverseAuthorization(
    acquirerId: string,
    merchantId: string,
    paymentId: string,
    body: ApiPaymentReversalRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiReversalResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/payments/{paymentId}/increments - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Payments/operation/incrementPayment">Increment authorization</a>
   */
  incrementPayment(
    acquirerId: string,
    merchantId: string,
    paymentId: string,
    body: ApiIncrementRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiIncrementResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/payments/{paymentId}/refunds - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Card-Payments/operation/createRefund">Refund card payment</a>
   */
  createRefund(
    acquirerId: string,
    merchantId: string,
    paymentId: string,
    body: ApiPaymentRefundRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiActionResponseForRefund, ApiPaymentErrorResponse>>;
}

export interface GetPaymentStatusParams extends PaymentContext {
  returnOperations?: boolean;
}
