/*
 * This file was automatically generated.
 */
import { SdkContext } from "./model";
import { Client } from "./model/client";

import { newV1Client } from "./v1";

export function newClient(sdkContext: SdkContext): Client {
  return {
    v1: newV1Client(sdkContext),

    context: sdkContext
  };
}
