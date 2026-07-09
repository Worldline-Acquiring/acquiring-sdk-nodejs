/*
 * This file was automatically generated.
 */
import { CardPaymentsClient } from "./cardpayments";
import { CardRefundsClient } from "./cardrefunds";
import { AccountVerificationsClient } from "./accountverifications";
import { BalanceInquiriesClient } from "./balanceinquiries";
import { TechnicalReversalsClient } from "./technicalreversals";
import { DynamicCurrencyConversionClient } from "./dynamiccurrencyconversion";
import { PingClient } from "./ping";

export interface V1Client {
  readonly cardPayments: CardPaymentsClient;
  readonly cardRefunds: CardRefundsClient;
  readonly accountVerifications: AccountVerificationsClient;
  readonly balanceInquiries: BalanceInquiriesClient;
  readonly technicalReversals: TechnicalReversalsClient;
  readonly dynamicCurrencyConversion: DynamicCurrencyConversionClient;
  readonly ping: PingClient;
}
