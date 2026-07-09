/*
 * This file was automatically generated.
 */
import { SdkContext } from "../model";
import { newCardPaymentsClient } from "./cardpayments";
import { newCardRefundsClient } from "./cardrefunds";
import { newAccountVerificationsClient } from "./accountverifications";
import { newBalanceInquiriesClient } from "./balanceinquiries";
import { newTechnicalReversalsClient } from "./technicalreversals";
import { newDynamicCurrencyConversionClient } from "./dynamiccurrencyconversion";
import { newPingClient } from "./ping";
import { V1Client } from "./model";

export function newV1Client(sdkContext: SdkContext): V1Client {
  return {
    cardPayments: newCardPaymentsClient(sdkContext),
    cardRefunds: newCardRefundsClient(sdkContext),
    accountVerifications: newAccountVerificationsClient(sdkContext),
    balanceInquiries: newBalanceInquiriesClient(sdkContext),
    technicalReversals: newTechnicalReversalsClient(sdkContext),
    dynamicCurrencyConversion: newDynamicCurrencyConversionClient(sdkContext),
    ping: newPingClient(sdkContext)
  };
}
