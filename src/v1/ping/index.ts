/*
 * This file was automatically generated.
 */
import { ping } from "./ping";
import { SdkContext } from "../../model";
import { PingClient } from "../model/ping";

export function newPingClient(sdkContext: SdkContext): PingClient {
  return {
    ping: ping(sdkContext)
  };
}
