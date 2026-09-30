/*
 * This file was automatically generated.
 */

export interface AcceptDisputeLiabilityRequest {
  includeEntries?: boolean | null;
  messageText?: string | null;
  userId?: string | null;
}

export interface AdditionalResponseData {
  merchantAdviceCode?: string | null;
  merchantAdviceCodeDescription?: string | null;
}

export interface AddressVerificationData {
  cardholderAddress?: string | null;
  cardholderPostalCode?: string | null;
}

export interface AesUkptPinEncryptionData extends PinEncryptionData {
  pinEncryptionType: "AES_UKPT";
  keyGeneration?: number | null;
  randomValue?: string | null;
}

export interface AmountBreakdownData {
  cashbackAmount?: AmountData | null;
  tipAmount?: AmountData | null;
}

export interface AmountData {
  amount?: number | null;
  currencyCode?: string | null;
  numberOfDecimals?: number | null;
}

export interface ApiAccountVerificationRequest {
  cardPaymentData?: CardPaymentDataForVerification | null;
  merchant?: MerchantData | null;
  operationId?: string | null;
  references?: PaymentReferences | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiAccountVerificationResponse {
  additionalResponseData?: AdditionalResponseData | null;
  authorizationCode?: string | null;
  cardPaymentData?: CardPaymentDataForResponse | null;
  operationId?: string | null;
  references?: ApiReferencesForResponses | null;
  responder?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
}

export interface ApiActionResponse {
  additionalResponseData?: AdditionalResponseData | null;
  operationId?: string | null;
  payment?: ApiPaymentSummaryForResponse | null;
  responder?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
}

export interface ApiActionResponseForRefund {
  additionalResponseData?: AdditionalResponseData | null;
  operationId?: string | null;
  refund?: ApiRefundSummaryForResponse | null;
  responder?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
}

export interface ApiBalanceInquiryRequest {
  cardPaymentData?: CardPaymentDataForBalanceInquiry | null;
  merchant?: MerchantData | null;
  operationId?: string | null;
  references?: PaymentReferences | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiBalanceInquiryResponse {
  additionalResponseData?: AdditionalResponseData | null;
  authorizationCode?: string | null;
  availableAmount?: AmountData | null;
  cardPaymentData?: CardPaymentDataForResponse | null;
  operationId?: string | null;
  references?: ApiReferencesForResponses | null;
  responder?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
}

export interface ApiCaptureRequest {
  amount?: AmountData | null;
  captureAmountBreakdownData?: CaptureAmountBreakdownData | null;
  capturePointOfSaleData?: CapturePointOfSaleData | null;
  captureSequenceNumber?: number | null;
  dynamicCurrencyConversion?: DccData | null;
  isFinal?: boolean | null;
  marketplaceData?: MarketplaceData | null;
  operationId?: string | null;
  references?: PaymentReferences | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiCaptureRequestForRefund {
  capturePointOfSaleData?: CapturePointOfSaleData | null;
  operationId?: string | null;
  references?: PaymentReferences | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiIncrementRequest {
  dynamicCurrencyConversion?: DccData | null;
  incrementAmount?: AmountData | null;
  operationId?: string | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiIncrementResponse extends ApiActionResponse {
  authorizationCode?: string | null;
  totalAuthorizedAmount?: AmountData | null;
}

export interface ApiPaymentErrorResponse {
  detail?: string | null;
  instance?: string | null;
  requestId?: string | null;
  status?: number | null;
  title?: string | null;
  type?: string | null;
}

export interface ApiPaymentRefundRequest {
  amount?: AmountData | null;
  captureImmediately?: boolean | null;
  dynamicCurrencyConversion?: DccData | null;
  operationId?: string | null;
  references?: PaymentReferences | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiPaymentRequest {
  amount?: AmountData | null;
  amountBreakdownData?: AmountBreakdownData | null;
  authorizationType?: string | null;
  cardPaymentData?: CardPaymentData | null;
  dynamicCurrencyConversion?: DccData | null;
  merchant?: MerchantData | null;
  operationId?: string | null;
  references?: PaymentReferences | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiPaymentResource {
  cardPaymentData?: CardPaymentDataForResource | null;
  initialAuthorizationCode?: string | null;
  operations?: SubOperation[] | null;
  paymentId?: string | null;
  references?: ApiReferencesForResponses | null;
  status?: string | null;
  statusTimestamp?: string | null;
  totalAuthorizedAmount?: AmountData | null;
}

export interface ApiPaymentResponse {
  additionalResponseData?: AdditionalResponseData | null;
  cardPaymentData?: CardPaymentDataForResponse | null;
  initialAuthorizationCode?: string | null;
  operationId?: string | null;
  paymentId?: string | null;
  references?: ApiReferencesForResponses | null;
  responder?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
  status?: string | null;
  statusTimestamp?: string | null;
  totalAuthorizedAmount?: AmountData | null;
}

export interface ApiPaymentReversalRequest {
  dynamicCurrencyConversion?: DccData | null;
  operationId?: string | null;
  reversalAmount?: AmountData | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiPaymentSummaryForResponse {
  paymentId?: string | null;
  references?: ApiReferencesForResponses | null;
  status?: string | null;
  statusTimestamp?: string | null;
}

export interface ApiReferencesForResponses {
  paymentAccountReference?: string | null;
  retrievalReferenceNumber?: string | null;
  schemeTransactionId?: string | null;
  schemeTransactionLinkId?: string | null;
}

export interface ApiRefundRequest {
  amount?: AmountData | null;
  cardPaymentData?: CardPaymentDataForRefund | null;
  dynamicCurrencyConversion?: DccData | null;
  merchant?: MerchantData | null;
  operationId?: string | null;
  references?: PaymentReferences | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiRefundResource {
  cardPaymentData?: CardPaymentDataForResource | null;
  initialAuthorizationCode?: string | null;
  operations?: SubOperationForRefund[] | null;
  referencedPaymentId?: string | null;
  references?: ApiReferencesForResponses | null;
  refundId?: string | null;
  status?: string | null;
  statusTimestamp?: string | null;
  totalAuthorizedAmount?: AmountData | null;
}

export interface ApiRefundResponse {
  additionalResponseData?: AdditionalResponseData | null;
  authorizationCode?: string | null;
  cardPaymentData?: CardPaymentDataForResponse | null;
  emvData?: EmvDataItem[] | null;
  operationId?: string | null;
  referencedPaymentId?: string | null;
  references?: ApiReferencesForResponses | null;
  refundId?: string | null;
  responder?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
  status?: string | null;
  statusTimestamp?: string | null;
  totalAuthorizedAmount?: AmountData | null;
}

export interface ApiRefundReversalRequest {
  operationId?: string | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiRefundSummaryForResponse {
  references?: ApiReferencesForResponses | null;
  refundId?: string | null;
  status?: string | null;
  statusTimestamp?: string | null;
}

export interface ApiReversalResponse extends ApiActionResponse {
  totalAuthorizedAmount?: AmountData | null;
}

export interface ApiTechnicalReversalRequest {
  operationId?: string | null;
  reason?: string | null;
  terminalData?: TerminalData | null;
  transactionTimestamp?: string | null;
}

export interface ApiTechnicalReversalResponse {
  operationId?: string | null;
  responder?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
}

export interface ByAcquirerIds extends MerchantScope {
  merchantScopeType: "BY_ACQUIRER_IDS";
  acquirerIds?: string[] | null;
}

export interface ByMerchantIds extends MerchantScope {
  merchantScopeType: "BY_MERCHANT_IDS";
  merchantIds?: MerchantIdItem[] | null;
}

export interface ByMerchantRootIds extends MerchantScope {
  merchantScopeType: "BY_MERCHANT_ROOT_IDS";
  merchantRootIds?: MerchantRootIdItem[] | null;
}

export interface CaptureAmountBreakdownData {
  tipAmount?: AmountData | null;
}

export interface CapturePointOfSaleData {
  emvData?: EmvDataItem[] | null;
}

export interface CardDataForDcc {
  bin?: string | null;
  brand?: string | null;
  cardCountryCode?: string | null;
  cardEntryMode?: string | null;
}

export interface CardOnFileData {
  initialCardOnFileData?: InitialCardOnFileData | null;
  isInitialTransaction?: boolean | null;
  subsequentCardOnFileData?: SubsequentCardOnFileData | null;
}

export interface CardPaymentData {
  allowPartialApproval?: boolean | null;
  brand?: string | null;
  brandSelector?: string | null;
  captureImmediately?: boolean | null;
  cardData?: PlainCardData | null;
  cardEntryMode?: string | null;
  cardOnFileData?: CardOnFileData | null;
  cardholderVerificationMethod?: string | null;
  ecommerceData?: ECommerceData | null;
  networkTokenData?: NetworkTokenData | null;
  pointOfSaleData?: PointOfSaleData | null;
  serviceLocationData?: ServiceLocationData | null;
  walletId?: string | null;
}

export interface CardPaymentDataForBalanceInquiry {
  brand?: string | null;
  brandSelector?: string | null;
  cardData?: PlainCardData | null;
  cardEntryMode?: string | null;
  cardholderVerificationMethod?: string | null;
  ecommerceData?: ECommerceData | null;
  pointOfSaleData?: PointOfSaleData | null;
  walletId?: string | null;
}

export interface CardPaymentDataForRefund {
  brand?: string | null;
  brandSelector?: string | null;
  captureImmediately?: boolean | null;
  cardData?: PlainCardData | null;
  cardEntryMode?: string | null;
  cardholderVerificationMethod?: string | null;
  networkTokenData?: NetworkTokenData | null;
  originalTransactionReferences?: OriginalTransactionReferences | null;
  pointOfSaleData?: PointOfSaleData | null;
  walletId?: string | null;
}

export interface CardPaymentDataForResource {
  brand?: string | null;
}

export interface CardPaymentDataForResponse {
  brand?: string | null;
  ecommerceData?: ECommerceDataForResponse | null;
  pointOfSaleData?: PointOfSaleDataForResponse | null;
}

export interface CardPaymentDataForVerification {
  brand?: string | null;
  brandSelector?: string | null;
  cardData?: PlainCardData | null;
  cardEntryMode?: string | null;
  cardOnFileData?: CardOnFileData | null;
  cardholderVerificationMethod?: string | null;
  ecommerceData?: ECommerceDataForAccountVerification | null;
  networkTokenData?: NetworkTokenData | null;
  pointOfSaleData?: PointOfSaleData | null;
  walletId?: string | null;
}

export interface CustomerServiceData {
  customerServiceEmail?: string | null;
  customerServicePhoneNumber?: string | null;
  customerServiceUrl?: string | null;
}

export interface DateRange {
  greaterEqual?: string | null;
  lowerEqual?: string | null;
}

export interface DateTimeRange {
  greater?: string | null;
  greaterEqual?: string | null;
  lower?: string | null;
  lowerEqual?: string | null;
}

export interface DccData {
  amount?: number | null;
  conversionRate?: number | null;
  currencyCode?: string | null;
  numberOfDecimals?: number | null;
}

export interface DccProposal {
  originalAmount?: AmountData | null;
  rate?: RateData | null;
  rateReferenceId?: string | null;
  resultingAmount?: AmountData | null;
}

export interface DisputeCase {
  disputeDateTimeData?: DisputeDateTimeData | null;
  disputeId?: string | null;
  disputeReferences?: DisputeReferences | null;
  disputeStage?: string | null;
  disputeStatus?: string | null;
  disputeStatusCategory?: string | null;
  isOpen?: boolean | null;
  merchantBalanceAmount?: SignedAmountData | null;
  merchantData?: DisputeMerchantData | null;
  originalDisputeAmount?: AmountData | null;
  originalTransactionData?: OriginalTransactionData | null;
  schemeReason?: string | null;
  schemeReasonDescription?: string | null;
  unifiedCategory?: string | null;
  unifiedReason?: string | null;
}

export interface DisputeCaseWithEntries extends DisputeCase {
  entries?: DisputeEntry[] | null;
}

export interface DisputeDateTimeData {
  closedDateTime?: string | null;
  lastStatusChangedDateTime?: string | null;
  openedDateTime?: string | null;
  responseDueDate?: string | null;
}

export interface DisputeDocument {
  documentId?: string | null;
  fileName?: string | null;
  mimeType?: string | null;
}

export interface DisputeDocumentIdItem {
  documentId?: string | null;
}

export interface DisputeEntry {
  documents?: DisputeDocument[] | null;
  elaboration?: string | null;
  entryCategory?: string | null;
  entryDateTime?: string | null;
  entryId?: string | null;
  entryType?: string | null;
  entryTypeDescription?: string | null;
  messageText?: string | null;
  questionnaire?: string | null;
  responseDueDate?: string | null;
  schemeReason?: string | null;
  schemeReasonDescription?: string | null;
  settlementAmount?: AmountData | null;
  transactionAmount?: AmountData | null;
  userId?: string | null;
}

export interface DisputeEntryResources {
  disputeEntries?: DisputeEntryWithDisputeSummary[] | null;
  pagination?: PaginationResponse | null;
  requestId?: string | null;
}

export interface DisputeEntryWithDisputeSummary extends DisputeEntry {
  disputeId?: string | null;
  disputeSummary?: DisputeSummary | null;
}

export interface DisputeMerchantData extends DisputeMerchantDataBase {
  merchantCategoryCode?: number | null;
  merchantCity?: string | null;
  merchantCountryCode?: string | null;
  merchantName?: string | null;
}

export interface DisputeMerchantDataBase {
  acquirerId?: string | null;
  merchantId?: string | null;
  merchantRootId?: string | null;
}

export interface DisputeReferences {
  acquirerDisputeReference?: string | null;
  schemeDisputeReference?: string | null;
}

export interface DisputeResponse {
  dispute?: DisputeCaseWithEntries | null;
  requestId?: string | null;
}

export interface DisputeSummary {
  acquirerDisputeReference?: string | null;
  merchantData?: DisputeMerchantDataBase | null;
  originalTransactionData?: OriginalTransactionSummaryData | null;
  schemeReason?: string | null;
  schemeReasonDescription?: string | null;
  unifiedCategory?: string | null;
  unifiedReason?: string | null;
}

export interface DukptPinEncryptionData extends PinEncryptionData {
  pinEncryptionType: "DUKPT";
  keySerialNumber?: string | null;
}

export interface ECommerceData {
  addressVerificationData?: AddressVerificationData | null;
  scaExemptionRequest?: string | null;
  threeDSecure?: ThreeDSecure | null;
}

export interface ECommerceDataForAccountVerification {
  addressVerificationData?: AddressVerificationData | null;
  threeDSecure?: ThreeDSecure | null;
}

export interface ECommerceDataForResponse {
  addressVerificationResult?: string | null;
  cardSecurityCodeResult?: string | null;
}

export interface EmvDataItem {
  tag?: string | null;
  value?: string | null;
}

export interface GeoCoordinates {
  latitude?: number | null;
  longitude?: number | null;
}

export interface GetDccRateRequest {
  cardPaymentData?: CardDataForDcc | null;
  operationId?: string | null;
  pointOfSaleData?: PointOfSaleDataForDcc | null;
  rateReferenceId?: string | null;
  targetCurrency?: string | null;
  transaction?: TransactionDataForDcc | null;
}

export interface GetDccRateResponse {
  disclaimerDisplay?: string | null;
  disclaimerReceipt?: string | null;
  proposal?: DccProposal | null;
  result?: string | null;
}

export interface InitialCardOnFileData {
  futureUse?: string | null;
  transactionType?: string | null;
}

export interface MarketplaceData {
  retailerCountryCode?: string | null;
  retailerName?: string | null;
}

export interface MerchantData {
  address?: string | null;
  city?: string | null;
  countryCode?: string | null;
  customerServiceData?: CustomerServiceData | null;
  merchantCategoryCode?: number | null;
  name?: string | null;
  paymentFacilitatorId?: string | null;
  postalCode?: string | null;
  stateCode?: string | null;
  subMerchantId?: string | null;
  taxId?: string | null;
}

export interface MerchantIdItem {
  acquirerId?: string | null;
  merchantId?: string | null;
}

export interface MerchantRootIdItem {
  acquirerId?: string | null;
  merchantRootId?: string | null;
}

export interface MerchantScope {
  merchantScopeType: string;
}

export interface NetworkTokenData {
  cryptogram?: string | null;
  eci?: string | null;
}

export interface OnlinePinData {
  encryptedPinBlock?: string | null;
  pinBlockFormat?: number | null;
  pinEncryptionData?: PinEncryptionData | null;
}

export interface OriginalTransactionData {
  cardholderVerificationMethod?: string | null;
  localTransactionDateTime?: string | null;
  paymentCategory?: string | null;
  paymentMethodData?: PaymentMethodData | null;
  pointOfSaleEntryMode?: string | null;
  schemeProcessedDateTime?: string | null;
  settlementAmount?: AmountData | null;
  transactionAmount?: AmountData | null;
  transactionReferences?: TransactionReferencesDispute | null;
}

export interface OriginalTransactionReferences {
  originalSchemeTransactionId?: string | null;
  originalSchemeTransactionLinkId?: string | null;
}

export interface OriginalTransactionSummaryData {
  cardholderVerificationMethod?: string | null;
  paymentCategory?: string | null;
  paymentMethodData?: PaymentMethodDataBase | null;
  pointOfSaleEntryMode?: string | null;
  transactionReferences?: TransactionReferencesBase | null;
}

export interface PaginationRequest {
  fromIndex?: number | null;
  pageSize?: number | null;
  searchId?: string | null;
}

export interface PaginationResponse {
  lastIndex?: number | null;
  searchId?: string | null;
  totalCount?: number | null;
}

export interface PaymentMethodData extends PaymentMethodDataBase {
  issuingCountryCode?: string | null;
}

export interface PaymentMethodDataBase {
  maskedIdentifier?: string | null;
  scheme?: string | null;
  schemeBrand?: string | null;
}

export interface PaymentReferences {
  dynamicDescriptor?: string | null;
  merchantReference?: string | null;
}

export interface PinEncryptionData {
  pinEncryptionType: string;
}

export interface PlainCardData {
  cardNumber?: string | null;
  cardSecurityCode?: string | null;
  cardSequenceNumber?: number | null;
  expiryDate?: string | null;
}

export interface PointOfSaleData {
  emvData?: EmvDataItem[] | null;
  isResponseToPinRequest?: boolean | null;
  isRetryWithTheSameOperationId?: boolean | null;
  onlinePinData?: OnlinePinData | null;
  track2Data?: string | null;
}

export interface PointOfSaleDataForDcc {
  terminalCountryCode?: string | null;
  terminalId?: string | null;
}

export interface PointOfSaleDataForResponse {
  emvData?: EmvDataItem[] | null;
  panLast4Digits?: string | null;
  pinRetryCounter?: number | null;
}

export interface RateData {
  exchangeRate?: number | null;
  invertedExchangeRate?: number | null;
  markUp?: number | null;
  markUpBasis?: string | null;
  quotationDateTime?: string | null;
}

export interface SearchDisputeEntriesRequest {
  disputeId?: string | null;
  entryCategories?: string[] | null;
  entryDateTime?: DateTimeRange | null;
  entryId?: string | null;
  entryTypes?: string[] | null;
  includeDisputeSummary?: boolean | null;
  merchantScope?: MerchantScope | null;
  pagination?: PaginationRequest | null;
  sortOrder?: string | null;
}

export interface SearchDisputesRequest {
  acquirerDisputeReference?: string | null;
  acquirerReferenceNumber?: string | null;
  closedDateTime?: DateTimeRange | null;
  disputeId?: string | null;
  disputeStages?: string[] | null;
  disputeStatusCategories?: string[] | null;
  isOpen?: boolean | null;
  lastStatusChangedDateTime?: DateTimeRange | null;
  merchantReference?: string | null;
  merchantScope?: MerchantScope | null;
  openedDateTime?: DateTimeRange | null;
  pagination?: PaginationRequest | null;
  paymentId?: string | null;
  responseDueDate?: DateRange | null;
  schemes?: string[] | null;
  sortBy?: string | null;
  sortOrder?: string | null;
  unifiedCategories?: string[] | null;
}

export interface SearchDisputesResponse {
  disputes?: DisputeCase[] | null;
  pagination?: PaginationResponse | null;
  requestId?: string | null;
}

export interface ServiceLocationAddress {
  city?: string | null;
  countryCode?: string | null;
  countrySubdivisionCode?: string | null;
  postalCode?: string | null;
}

export interface ServiceLocationData {
  address?: ServiceLocationAddress | null;
  geoCoordinates?: GeoCoordinates | null;
}

export interface SignedAmountData {
  amount?: number | null;
  currencyCode?: string | null;
  debitCreditIndicator?: string | null;
  numberOfDecimals?: number | null;
}

export interface SubOperation {
  amount?: AmountData | null;
  authorizationCode?: string | null;
  operationId?: string | null;
  operationTimestamp?: string | null;
  operationType?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
}

export interface SubOperationForRefund {
  amount?: AmountData | null;
  operationId?: string | null;
  operationTimestamp?: string | null;
  operationType?: string | null;
  responseCode?: string | null;
  responseCodeCategory?: string | null;
  responseCodeDescription?: string | null;
}

export interface SubmitEvidenceRequest {
  documentIds?: DisputeDocumentIdItem[] | null;
  elaboration?: string | null;
  includeEntries?: boolean | null;
  partialAmount?: AmountData | null;
  userId?: string | null;
}

export interface SubsequentCardOnFileData {
  cardOnFileInitiator?: string | null;
  initialSchemeTransactionId?: string | null;
  initialSchemeTransactionLinkId?: string | null;
  transactionType?: string | null;
}

export interface TerminalData {
  allowSingleTap?: boolean | null;
  cardReadingCapabilities?: string[] | null;
  cardholderActivatedTerminalLevel?: string | null;
  isAttendedTerminal?: boolean | null;
  isOfflineApproved?: boolean | null;
  mposDevice?: string | null;
  offlineAuthorizationResponseCode?: string | null;
  pinEntryCapability?: string | null;
  terminalId?: string | null;
  terminalLocation?: string | null;
}

export interface ThreeDSecure {
  authenticationValue?: string | null;
  directoryServerTransactionId?: string | null;
  eci?: string | null;
  threeDSecureType?: string | null;
  version?: string | null;
}

export interface TransactionDataForDcc {
  amount?: AmountData | null;
  transactionTimestamp?: string | null;
  transactionType?: string | null;
}

export interface TransactionReferencesBase {
  acquirerReferenceNumber?: string | null;
  merchantReference?: string | null;
  paymentId?: string | null;
}

export interface TransactionReferencesDispute extends TransactionReferencesBase {
  acquirerTransactionReference?: string | null;
  merchantOperationId?: string | null;
  retrievalReferenceNumber?: string | null;
  schemeTransactionId?: string | null;
  schemeTransactionLinkId?: string | null;
  terminalId?: string | null;
  terminalTransactionReference?: string | null;
}

export interface UploadDocumentResponse {
  documentId?: string | null;
  requestId?: string | null;
}

export interface ZpkPinEncryptionData extends PinEncryptionData {
  pinEncryptionType: "ZPK";
  zonePinKeyId?: string | null;
}
