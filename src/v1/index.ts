/*
 * This file was automatically generated.
 */
import { SdkContext } from "../model";
import { newPaymentsClient } from "./payments";
import { newRefundsClient } from "./refunds";
import { newAccountVerificationsClient } from "./accountverifications";
import { newTechnicalReversalsClient } from "./technicalreversals";
import { newDynamicCurrencyConversionClient } from "./dynamiccurrencyconversion";
import { newPingClient } from "./ping";
import { V1Client } from "./model";

export function newV1Client(sdkContext: SdkContext): V1Client {
  return {
    payments: newPaymentsClient(sdkContext),
    refunds: newRefundsClient(sdkContext),
    accountVerifications: newAccountVerificationsClient(sdkContext),
    technicalReversals: newTechnicalReversalsClient(sdkContext),
    dynamicCurrencyConversion: newDynamicCurrencyConversionClient(sdkContext),
    ping: newPingClient(sdkContext)
  };
}
