/*
 * This file was automatically generated.
 */
import { searchDisputeEntries } from "./searchDisputeEntries";
import { SdkContext } from "../../model";
import { DisputeEntriesClient } from "../model/disputeentries";

export function newDisputeEntriesClient(sdkContext: SdkContext): DisputeEntriesClient {
  return {
    searchDisputeEntries: searchDisputeEntries(sdkContext)
  };
}
