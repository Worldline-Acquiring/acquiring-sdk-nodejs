/*
 * This file was automatically generated.
 */
import { searchDisputes } from "./searchDisputes";
import { getDispute } from "./getDispute";
import { acceptDisputeLiability } from "./acceptDisputeLiability";
import { submitEvidence } from "./submitEvidence";
import { SdkContext } from "../../model";
import { DisputeManagementClient } from "../model/disputemanagement";

export function newDisputeManagementClient(sdkContext: SdkContext): DisputeManagementClient {
  return {
    searchDisputes: searchDisputes(sdkContext),
    getDispute: getDispute(sdkContext),
    acceptDisputeLiability: acceptDisputeLiability(sdkContext),
    submitEvidence: submitEvidence(sdkContext)
  };
}
