/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import { ApiPaymentErrorResponse, ApiTechnicalReversalRequest, ApiTechnicalReversalResponse } from "../domain";

export interface TechnicalReversalsClient {
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/operations/{operationId}/reverse - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Technical-Reversals/operation/technicalReversal">Technical reversal</a>
   */
  technicalReversal(
    acquirerId: string,
    merchantId: string,
    operationId: string,
    body: ApiTechnicalReversalRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiTechnicalReversalResponse, ApiPaymentErrorResponse>>;
}
