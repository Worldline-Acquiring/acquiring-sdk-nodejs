/*
 * This file was automatically generated.
 */
import { processPayment } from "./processPayment";
import { getPaymentStatus } from "./getPaymentStatus";
import { simpleCaptureOfPayment } from "./simpleCaptureOfPayment";
import { reverseAuthorization } from "./reverseAuthorization";
import { incrementPayment } from "./incrementPayment";
import { createRefund } from "./createRefund";
import { SdkContext } from "../../model";
import { CardPaymentsClient } from "../model/cardpayments";

export function newCardPaymentsClient(sdkContext: SdkContext): CardPaymentsClient {
  return {
    processPayment: processPayment(sdkContext),
    getPaymentStatus: getPaymentStatus(sdkContext),
    simpleCaptureOfPayment: simpleCaptureOfPayment(sdkContext),
    reverseAuthorization: reverseAuthorization(sdkContext),
    incrementPayment: incrementPayment(sdkContext),
    createRefund: createRefund(sdkContext)
  };
}
