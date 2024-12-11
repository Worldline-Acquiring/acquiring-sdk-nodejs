/*
 * This file was automatically generated.
 */
import { processBalanceInquiry } from "./processBalanceInquiry";
import { SdkContext } from "../../model";
import { BalanceInquiriesClient } from "../model/balanceinquiries";

export function newBalanceInquiriesClient(sdkContext: SdkContext): BalanceInquiriesClient {
  return {
    processBalanceInquiry: processBalanceInquiry(sdkContext)
  };
}
