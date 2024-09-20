/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import { ApiPaymentErrorResponse } from "../domain";

export interface PingClient {
  /**
   * Resource /services/v1/ping - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Ping/operation/ping">Check API connection</a>
   */
  ping(paymentContext?: PaymentContext | null): Promise<SdkResponse<void, ApiPaymentErrorResponse>>;
}
