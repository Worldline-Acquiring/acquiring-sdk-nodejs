/*
 * This file was automatically generated.
 */
import { processStandaloneRefund } from "./processStandaloneRefund";
import { getRefund } from "./getRefund";
import { captureRefund } from "./captureRefund";
import { reverseRefundAuthorization } from "./reverseRefundAuthorization";
import { SdkContext } from "../../model";
import { CardRefundsClient } from "../model/cardrefunds";

export function newCardRefundsClient(sdkContext: SdkContext): CardRefundsClient {
  return {
    processStandaloneRefund: processStandaloneRefund(sdkContext),
    getRefund: getRefund(sdkContext),
    captureRefund: captureRefund(sdkContext),
    reverseRefundAuthorization: reverseRefundAuthorization(sdkContext)
  };
}
