/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/types";
import { ApiPaymentErrorResponse, DisputeEntryResources, SearchDisputeEntriesRequest } from "../domain";

export interface DisputeEntriesClient {
  /**
   * Resource /dispute-management/v1/dispute-entries/search - <a href="https://docs.acquiring.worldline-solutions.com/api-reference#tag/Dispute-Entries/operation/searchDisputeEntries">Search Dispute Entries</a>
   */
  searchDisputeEntries(body: SearchDisputeEntriesRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<DisputeEntryResources, ApiPaymentErrorResponse>>;
}
