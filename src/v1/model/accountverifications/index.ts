/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import { ApiAccountVerificationRequest, ApiAccountVerificationResponse, ApiPaymentErrorResponse } from "../domain";

export interface AccountVerificationsClient {
  /**
   * Resource /processing/v1/{acquirerId}/{merchantId}/account-verifications - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Account-Verifications/operation/processAccountVerification">Verify account</a>
   */
  processAccountVerification(
    acquirerId: string,
    merchantId: string,
    body: ApiAccountVerificationRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ApiAccountVerificationResponse, ApiPaymentErrorResponse>>;
}
