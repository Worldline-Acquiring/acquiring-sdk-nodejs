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
import { PaymentsClient } from "../model/payments";

export function newPaymentsClient(sdkContext: SdkContext): PaymentsClient {
  return {
    processPayment: processPayment(sdkContext),
    getPaymentStatus: getPaymentStatus(sdkContext),
    simpleCaptureOfPayment: simpleCaptureOfPayment(sdkContext),
    reverseAuthorization: reverseAuthorization(sdkContext),
    incrementPayment: incrementPayment(sdkContext),
    createRefund: createRefund(sdkContext)
  };
}
