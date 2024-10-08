/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as _ from "lodash";
import { IncomingMessage } from "http";
import { RequestOptions } from "https";
import * as uuid from "uuid";
import * as headers from "../utils/headers";
import { applyConnectionOptions, applyProxyConfiguration, sendJSON, sendMultipart } from "../utils/connection";
import { Header, JsonRequest, MultipartFormDataRequest, PaymentContext, SdkContext, SdkRequest, SdkResponse, SdkResponseError } from "../model";

async function prepareRequest(request: SdkRequest, sdkContext: SdkContext, options: RequestOptions, contentType: string): Promise<void> {
  const date = headers.date();
  let path = request.modulePath;
  if (request.paymentContext) {
    let separator = "?";
    for (const key in request.paymentContext) {
      if (key !== "extraHeaders") {
        if (Array.isArray(request.paymentContext[key])) {
          for (const value in request.paymentContext[key]) {
            path += separator + key + "=" + request.paymentContext[key][value];
            separator = "&";
          }
        } else {
          path += separator + key + "=" + request.paymentContext[key];
          separator = "&";
        }
      }
    }
  }
  const extraHeaders: Header[] = [];
  options.path = path;
  options.method = request.method;
  options.headers = options.headers || {};
  options.headers["Date"] = date;
  options.headers["Content-Type"] = contentType;
  options.headers["Trace-Id"] = uuid.v4();
  if (request.paymentContext?.extraHeaders) {
    for (let i = 0; i < request.paymentContext.extraHeaders.length; i++) {
      const header = request.paymentContext.extraHeaders[i];
      options.headers[header.key] = _.trim(header.value.replace(/\r?\n[\\s&&[^\r\n]]*/g, " "));
      extraHeaders.push(header);
    }
  }

  // add X-WL-ServerMetaInfo
  const serverMetaInfo = headers.serverMetaInfo(sdkContext);
  options.headers[serverMetaInfo.key] = serverMetaInfo.value;
  extraHeaders.push(serverMetaInfo);

  const authorization = await sdkContext.getAuthenticator().getAuthorization(request.method, contentType, date, extraHeaders, options.path);
  options.headers.Authorization = authorization;

  applyProxyConfiguration(options, sdkContext.getProxy());
  applyConnectionOptions(options, sdkContext.getConnectionOptions());
}

function handleResponse(
  response: IncomingMessage,
  paymentContext: PaymentContext | null | undefined,
  expectBinaryResponse: boolean,
  resolve: (response: SdkResponse<unknown, unknown>) => void,
  reject: (error: SdkResponseError) => void
): void {
  const statusCode = response.statusCode!;
  const isSuccess = statusCode >= 200 && statusCode < 300;
  const contentType = response.headers["content-type"];

  // Resolve to a binary response if a) the caller expects a binary response and the response is successful, or b) the response is actually binary
  // Error JSON responses are still resolved as objects
  if ((expectBinaryResponse && isSuccess) || headers.isBinaryContent(contentType)) {
    // The response is actually either an SdkBinarySuccessResponse or (unlikely) an SdkBinaryErrorResponse
    // Those are compatible with SdkSuccessResponse<Readable> and SdkErrorResponse<Readable> respectively but with an extra "file" property
    resolve({
      status: statusCode,
      body: response,
      isSuccess,
      file: {
        contentType,
        contentLength: headers.contentLength(response.headers),
        filename: headers.dispositionFilename(response.headers)
      }
    } as SdkResponse<unknown, unknown>);
  } else {
    let body = "";

    response.setEncoding("utf8");
    response.on("data", chunk => {
      body += chunk;
    });
    response.on("end", () => {
      try {
        body = body ? JSON.parse(body) : null;
        resolve({
          status: statusCode,
          body,
          isSuccess
        });
      } catch (e) {
        const error = e as SdkResponseError;
        error.status = statusCode;
        error.body = body;
        reject(error);
      }
    });
  }
}

function createOptions(sdkContext: SdkContext): RequestOptions {
  const endpoint = sdkContext.getEndpoint();
  return {
    host: endpoint.host,
    port: endpoint.port,
    protocol: endpoint.scheme + ":"
  };
}

export async function json(request: JsonRequest, sdkContext: SdkContext): Promise<SdkResponse<unknown, unknown>> {
  const options = createOptions(sdkContext);
  await prepareRequest(request, sdkContext, options, "application/json");
  return new Promise((resolve, reject) => {
    sendJSON(options, request.body, sdkContext, (error, response) => {
      if (error) {
        reject(error);
      } else {
        handleResponse(response!, request.paymentContext, request.expectBinaryResponse ?? false, resolve, reject);
      }
    });
  });
}

export async function multipart(request: MultipartFormDataRequest, sdkContext: SdkContext): Promise<SdkResponse<unknown, unknown>> {
  const options = createOptions(sdkContext);
  const boundary = uuid.v4();
  await prepareRequest(request, sdkContext, options, "multipart/form-data; boundary=" + boundary);
  return new Promise((resolve, reject) => {
    sendMultipart(options, request.body, boundary, sdkContext, (error, response) => {
      if (error) {
        reject(error);
      } else {
        handleResponse(response!, request.paymentContext, request.expectBinaryResponse ?? false, resolve, reject);
      }
    });
  });
}
