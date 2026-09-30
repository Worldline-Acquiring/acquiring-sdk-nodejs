/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import { AcceptDisputeLiabilityRequest, ApiPaymentErrorResponse, DisputeResponse, SearchDisputesRequest, SearchDisputesResponse, SubmitEvidenceRequest } from "../domain";

export interface DisputeManagementClient {
  /**
   * Resource /dispute-management/v1/disputes/search - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dispute-Management/operation/searchDisputes">Search Disputes</a>
   */
  searchDisputes(body: SearchDisputesRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<SearchDisputesResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /dispute-management/v1/disputes/{disputeId} - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dispute-Management/operation/getDispute">Retrieve Dispute</a>
   */
  getDispute(disputeId: string, params: GetDisputeParams): Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /dispute-management/v1/disputes/{disputeId}/accept - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dispute-Management/operation/acceptDisputeLiability">Accept Liability</a>
   */
  acceptDisputeLiability(
    disputeId: string,
    body: AcceptDisputeLiabilityRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>>;
  /**
   * Resource /dispute-management/v1/disputes/{disputeId}/submit-evidence - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dispute-Management/operation/submitEvidence">Submit Evidence</a>
   */
  submitEvidence(disputeId: string, body: SubmitEvidenceRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<DisputeResponse, ApiPaymentErrorResponse>>;
}

export interface GetDisputeParams extends PaymentContext {
  includeEntries?: boolean;
}
