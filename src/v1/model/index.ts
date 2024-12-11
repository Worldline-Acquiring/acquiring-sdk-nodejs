/*
 * This file was automatically generated.
 */
import { PaymentsClient } from "./payments";
import { RefundsClient } from "./refunds";
import { AccountVerificationsClient } from "./accountverifications";
import { BalanceInquiriesClient } from "./balanceinquiries";
import { TechnicalReversalsClient } from "./technicalreversals";
import { DynamicCurrencyConversionClient } from "./dynamiccurrencyconversion";
import { PingClient } from "./ping";

export interface V1Client {
  readonly payments: PaymentsClient;
  readonly refunds: RefundsClient;
  readonly accountVerifications: AccountVerificationsClient;
  readonly balanceInquiries: BalanceInquiriesClient;
  readonly technicalReversals: TechnicalReversalsClient;
  readonly dynamicCurrencyConversion: DynamicCurrencyConversionClient;
  readonly ping: PingClient;
}
