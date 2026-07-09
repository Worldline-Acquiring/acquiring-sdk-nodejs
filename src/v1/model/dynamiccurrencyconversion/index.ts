/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import { ApiPaymentErrorResponse, GetDccRateRequest, GetDccRateResponse } from "../domain";

export interface DynamicCurrencyConversionClient {
  /**
   * Resource /services/v1/{acquirerId}/{merchantId}/dcc-rates - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dynamic-Currency-Conversion/operation/requestDccRate">Request DCC rate</a>
   */
  requestDccRate(
    acquirerId: string,
    merchantId: string,
    body: GetDccRateRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<GetDccRateResponse, ApiPaymentErrorResponse>>;
}
