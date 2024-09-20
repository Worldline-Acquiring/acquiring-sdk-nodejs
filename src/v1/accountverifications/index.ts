/*
 * This file was automatically generated.
 */
import { processAccountVerification } from "./processAccountVerification";
import { SdkContext } from "../../model";
import { AccountVerificationsClient } from "../model/accountverifications";

export function newAccountVerificationsClient(sdkContext: SdkContext): AccountVerificationsClient {
  return {
    processAccountVerification: processAccountVerification(sdkContext)
  };
}
