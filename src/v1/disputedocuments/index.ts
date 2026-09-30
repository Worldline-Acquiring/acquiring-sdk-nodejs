/*
 * This file was automatically generated.
 */
import { uploadDisputeDocument } from "./uploadDisputeDocument";
import { getDisputeDocument } from "./getDisputeDocument";
import { SdkContext } from "../../model";
import { DisputeDocumentsClient } from "../model/disputedocuments";

export function newDisputeDocumentsClient(sdkContext: SdkContext): DisputeDocumentsClient {
  return {
    uploadDisputeDocument: uploadDisputeDocument(sdkContext),
    getDisputeDocument: getDisputeDocument(sdkContext)
  };
}
