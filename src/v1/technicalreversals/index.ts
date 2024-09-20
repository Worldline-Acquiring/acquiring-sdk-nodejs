/*
 * This file was automatically generated.
 */
import { technicalReversal } from "./technicalReversal";
import { SdkContext } from "../../model";
import { TechnicalReversalsClient } from "../model/technicalreversals";

export function newTechnicalReversalsClient(sdkContext: SdkContext): TechnicalReversalsClient {
  return {
    technicalReversal: technicalReversal(sdkContext)
  };
}
