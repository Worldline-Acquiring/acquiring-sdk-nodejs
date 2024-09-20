/*
 * This file was automatically generated.
 */
import { requestDccRate } from "./requestDccRate";
import { SdkContext } from "../../model";
import { DynamicCurrencyConversionClient } from "../model/dynamiccurrencyconversion";

export function newDynamicCurrencyConversionClient(sdkContext: SdkContext): DynamicCurrencyConversionClient {
  return {
    requestDccRate: requestDccRate(sdkContext)
  };
}
