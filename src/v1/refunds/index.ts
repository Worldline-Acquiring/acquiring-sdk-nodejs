/*
 * This file was automatically generated.
 */
import { processStandaloneRefund } from "./processStandaloneRefund";
import { getRefund } from "./getRefund";
import { captureRefund } from "./captureRefund";
import { reverseRefundAuthorization } from "./reverseRefundAuthorization";
import { SdkContext } from "../../model";
import { RefundsClient } from "../model/refunds";

export function newRefundsClient(sdkContext: SdkContext): RefundsClient {
  return {
    processStandaloneRefund: processStandaloneRefund(sdkContext),
    getRefund: getRefund(sdkContext),
    captureRefund: captureRefund(sdkContext),
    reverseRefundAuthorization: reverseRefundAuthorization(sdkContext)
  };
}
