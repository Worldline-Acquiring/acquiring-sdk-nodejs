import * as http from "http";
import { AddressInfo } from "net";
import { Readable } from "stream";
import { MultipartFormDataObject, SdkContext } from "../../src/model";
import * as communicator from "../../src/utils/communicator";
import { newSdkContext } from "../../src/utils/context";

/*
 * These tests verify the multipart/form-data requests that the SDK puts on the wire, using a local mock server.
 */

const AUTHORIZATION = "Bearer test-token";
const REQUEST_TIMEOUT_MS = 5000;

jest.setTimeout(60 * 1000);

interface MockResponse {
  status: number;
  contentType: string;
  body: string;
}

interface MultipartPart {
  name: string;
  fileName?: string;
  headers: Record<string, string>;
  content: Buffer;
}

interface RecordedRequest {
  method: string;
  path: string;
  headers: http.IncomingHttpHeaders;
  body: Buffer;
}

interface EchoResponse {
  method: string;
  path: string;
  form: Record<string, string>;
  files: Record<string, string>;
}

/**
 * A local HTTP server that records every request it receives.
 */
class MockHttpServer {
  private readonly server: http.Server;
  private readonly requests: RecordedRequest[] = [];
  private readonly waiters: Array<(request: RecordedRequest) => void> = [];
  private readonly responses: MockResponse[] = [];

  constructor() {
    this.server = http.createServer((req, res) => this.handle(req, res));
  }

  async start(): Promise<void> {
    await new Promise<void>((resolve) => this.server.listen(0, "127.0.0.1", resolve));
  }

  async stop(): Promise<void> {
    this.server.closeAllConnections();
    await new Promise<void>((resolve) => this.server.close(() => resolve()));
  }

  get port(): number {
    return (this.server.address() as AddressInfo).port;
  }

  enqueue(response: MockResponse): void {
    this.responses.push(response);
  }

  /**
   * Returns the next received request; rejects if no request is received within the timeout.
   */
  takeRequest(): Promise<RecordedRequest> {
    const request = this.requests.shift();
    if (request) {
      return Promise.resolve(request);
    }
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("no request was received by the mock server")), REQUEST_TIMEOUT_MS);
      this.waiters.push((received) => {
        clearTimeout(timeout);
        resolve(received);
      });
    });
  }

  private handle(req: http.IncomingMessage, res: http.ServerResponse): void {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      const request: RecordedRequest = {
        method: req.method ?? "",
        path: req.url ?? "",
        headers: req.headers,
        body: Buffer.concat(chunks),
      };
      const waiter = this.waiters.shift();
      if (waiter) {
        waiter(request);
      } else {
        this.requests.push(request);
      }

      const response = this.responses.shift() ?? createEchoResponse(request);
      res.writeHead(response.status, { "Content-Type": response.contentType });
      res.end(response.body);
    });
  }
}

function createEchoResponse(request: RecordedRequest): MockResponse {
  const echo: EchoResponse = { method: request.method, path: request.path, form: {}, files: {} };
  try {
    if (isMultipart(request)) {
      for (const part of parseMultipart(request)) {
        if (part.fileName === undefined) {
          echo.form[part.name] = part.content.toString("utf8");
        } else {
          echo.files[part.name] = part.content.toString("utf8");
        }
      }
    }
  } catch (e) {
    return { status: 400, contentType: "application/json", body: JSON.stringify({ error: (e as Error).message }) };
  }
  return { status: 200, contentType: "application/json", body: JSON.stringify(echo) };
}

function isMultipart(request: RecordedRequest): boolean {
  return (request.headers["content-type"] ?? "").toLowerCase().startsWith("multipart/form-data");
}

/**
 * Parses the body of a multipart/form-data request into its parts.
 * Each part is the text between two boundary delimiters: CRLF, headers, CRLF CRLF, content, CRLF.
 */
function parseMultipart(request: RecordedRequest): MultipartPart[] {
  const contentType = request.headers["content-type"] ?? "";
  const boundaryMatch = /;\s*boundary="?([^";]+)"?/i.exec(contentType);
  if (!boundaryMatch) {
    throw new Error("Content-Type has no boundary: " + contentType);
  }

  // latin1 maps every byte to exactly one char, so binary content survives the round trip
  const body = request.body.toString("latin1");
  const delimiter = "--" + boundaryMatch[1];
  if (!body.startsWith(delimiter + "\r\n")) {
    throw new Error("body does not start with the boundary delimiter");
  }
  const closeIndex = body.lastIndexOf(delimiter + "--");
  if (closeIndex < 0) {
    throw new Error("body does not contain the closing boundary delimiter");
  }

  // the first segment is the (empty) preamble before the first delimiter
  const segments = body.substring(0, closeIndex).split(delimiter).slice(1);
  return segments.map((segment) => {
    if (!segment.startsWith("\r\n") || !segment.endsWith("\r\n")) {
      throw new Error("part is not enclosed in CRLF");
    }
    const rawPart = segment.substring(2, segment.length - 2);
    const headerEnd = rawPart.indexOf("\r\n\r\n");
    if (headerEnd < 0) {
      throw new Error("part has no header separator");
    }

    const headers: Record<string, string> = {};
    for (const headerLine of rawPart.substring(0, headerEnd).split("\r\n")) {
      const colon = headerLine.indexOf(":");
      if (colon <= 0) {
        throw new Error("invalid part header: " + headerLine);
      }
      headers[headerLine.substring(0, colon).trim().toLowerCase()] = headerLine.substring(colon + 1).trim();
    }

    const contentDisposition = headers["content-disposition"] ?? "";
    if (!contentDisposition.toLowerCase().startsWith("form-data")) {
      throw new Error("unexpected Content-Disposition: " + contentDisposition);
    }
    const nameMatch = /;\s*name="([^"]*)"/i.exec(contentDisposition);
    if (!nameMatch) {
      throw new Error("Content-Disposition has no name: " + contentDisposition);
    }
    const fileNameMatch = /;\s*filename="([^"]*)"/i.exec(contentDisposition);

    return {
      name: nameMatch[1],
      fileName: fileNameMatch ? fileNameMatch[1] : undefined,
      headers,
      content: Buffer.from(rawPart.substring(headerEnd + 4), "latin1"),
    };
  });
}

function toReadable(content: string | Buffer): Readable {
  const result = new Readable({
    read(): void {
      // all content is pushed up front
    },
  });
  result.push(content);
  result.push(null);
  return result;
}

/**
 * @group integration
 */
describe("multipart", () => {
  let server: MockHttpServer;
  let sdkContext: SdkContext;

  beforeEach(async () => {
    server = new MockHttpServer();
    await server.start();

    sdkContext = newSdkContext({
      host: "127.0.0.1",
      scheme: "http",
      port: server.port,
      oauth2ClientId: "client-id",
      oauth2ClientSecret: "client-secret",
      oauth2TokenUri: "http://127.0.0.1/unused",
      integrator: "Integration tests",
    });
    jest.spyOn(sdkContext, "getAuthenticator").mockReturnValue({
      getAuthorization: () => Promise.resolve(AUTHORIZATION),
    });
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    await server.stop();
  });

  async function send(method: "POST" | "PUT", path: string, body: MultipartFormDataObject): Promise<EchoResponse> {
    const response = await communicator.multipart({ method, modulePath: path, body, paymentContext: null }, sdkContext);
    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
    return response.body as EchoResponse;
  }

  /**
   * Verifies the request line and headers of the multipart/form-data request that the mock server received, and returns its parts keyed by name.
   */
  async function takeMultipartRequest(expectedMethod: string, expectedPath: string): Promise<Record<string, MultipartPart>> {
    const request = await server.takeRequest();
    expect(request.method).toBe(expectedMethod);
    expect(request.path).toBe(expectedPath);
    expect(request.headers.authorization).toBe(AUTHORIZATION);
    expect(request.headers["content-type"]).toMatch(/^multipart\/form-data; boundary=.+$/);

    const parts: Record<string, MultipartPart> = {};
    for (const part of parseMultipart(request)) {
      expect(parts[part.name]).toBeUndefined();
      parts[part.name] = part;
    }
    return parts;
  }

  function expectFilePart(parts: Record<string, MultipartPart>, name: string, fileName: string, contentType: string, content: string | Buffer): void {
    const part = parts[name];
    expect(part).toBeDefined();
    expect(part.fileName).toBe(fileName);
    expect(part.headers["content-type"]).toBe(contentType);
    expect(part.content.equals(typeof content === "string" ? Buffer.from(content, "utf8") : content)).toBe(true);
  }

  function expectValuePart(parts: Record<string, MultipartPart>, name: string, value: string): void {
    const part = parts[name];
    expect(part).toBeDefined();
    expect(part.fileName).toBeUndefined();
    expect(part.content.toString("utf8")).toBe(value);
  }

  function createFileAndValueBody(): MultipartFormDataObject {
    return {
      value: "Hello World",
      file: {
        content: toReadable("This is the contents of a file"),
        fileName: "file.txt",
        contentType: "text/plain",
      },
    };
  }

  describe.each([
    ["POST", "/post"],
    ["PUT", "/put"],
  ] as const)("%s", (method, path) => {
    test("file and value", async () => {
      const responseBody = await send(method, path, createFileAndValueBody());

      expect(responseBody.files).toEqual({ file: "This is the contents of a file" });
      expect(responseBody.form).toEqual({ value: "Hello World" });

      const parts = await takeMultipartRequest(method, path);
      expect(Object.keys(parts)).toHaveLength(2);
      expectFilePart(parts, "file", "file.txt", "text/plain", "This is the contents of a file");
      expectValuePart(parts, "value", "Hello World");
    });
  });

  test("two files", async () => {
    await send("POST", "/post", {
      firstFile: { content: toReadable("firstContent"), fileName: "first.txt", contentType: "text/plain" },
      secondFile: { content: toReadable("secondContent"), fileName: "second.txt", contentType: "text/plain" },
    });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(2);
    expectFilePart(parts, "firstFile", "first.txt", "text/plain", "firstContent");
    expectFilePart(parts, "secondFile", "second.txt", "text/plain", "secondContent");
  });

  test("three files with different types", async () => {
    await send("POST", "/post", {
      textFile: { content: toReadable("text"), fileName: "file.txt", contentType: "text/plain" },
      jsonFile: { content: toReadable('{"key": "json"}'), fileName: "file.json", contentType: "application/json" },
      xmlFile: { content: toReadable("<key>xml</key>"), fileName: "file.xml", contentType: "application/xml" },
    });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(3);
    expectFilePart(parts, "textFile", "file.txt", "text/plain", "text");
    expectFilePart(parts, "jsonFile", "file.json", "application/json", '{"key": "json"}');
    expectFilePart(parts, "xmlFile", "file.xml", "application/xml", "<key>xml</key>");
  });

  test("two values", async () => {
    await send("POST", "/post", { firstKey: "firstValue", secondKey: "secondValue" });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(2);
    expectValuePart(parts, "firstKey", "firstValue");
    expectValuePart(parts, "secondKey", "secondValue");
  });

  test("three values", async () => {
    await send("POST", "/post", { name: "John", age: "30", city: "NYC" });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(3);
    expectValuePart(parts, "name", "John");
    expectValuePart(parts, "age", "30");
    expectValuePart(parts, "city", "NYC");
  });

  test("non-ASCII value", async () => {
    await send("POST", "/post", { greeting: "Hello, Šđčćž €" });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(1);
    expectValuePart(parts, "greeting", "Hello, Šđčćž €");
  });

  test("single file without values", async () => {
    await send("POST", "/post", { document: { content: toReadable("doc content"), fileName: "doc.pdf", contentType: "application/pdf" } });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(1);
    expectFilePart(parts, "document", "doc.pdf", "application/pdf", "doc content");
  });

  test("single value without files", async () => {
    await send("POST", "/post", { message: "Hello" });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(1);
    expectValuePart(parts, "message", "Hello");
  });

  test.each([
    ["pdf", "document.pdf", "application/pdf", "pdf content"],
    ["image", "photo.jpg", "image/jpeg", "image content"],
    ["data", "data.json", "application/json", '{"key": "value"}'],
  ])("file with content type of parameter %s", async (parameterName, fileName, contentType, content) => {
    await send("POST", "/post", { [parameterName]: { content: toReadable(content), fileName, contentType } });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(1);
    expectFilePart(parts, parameterName, fileName, contentType, content);
  });

  test.each([
    ["Readable", (content: Buffer) => toReadable(content)],
    ["Buffer", (content: Buffer) => content],
  ])("binary file as %s", async (_, toContent) => {
    const content = Buffer.alloc(64 * 1024);
    for (let i = 0; i < content.length; i++) {
      content[i] = i % 256;
    }

    await send("POST", "/post", { binary: { content: toContent(content), fileName: "data.bin", contentType: "application/octet-stream" } });

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(1);
    expectFilePart(parts, "binary", "data.bin", "application/octet-stream", content);
  });

  test("JSON error response", async () => {
    const errorBody = { status: 400, title: "Bad Request" };
    server.enqueue({ status: 400, contentType: "application/json", body: JSON.stringify(errorBody) });

    const response = await communicator.multipart(
      {
        method: "POST",
        modulePath: "/post",
        body: { file: { content: toReadable("file-content"), fileName: "file.txt", contentType: "text/plain" } },
        paymentContext: null,
      },
      sdkContext,
    );

    expect(response.status).toBe(400);
    expect(response.isSuccess).toBe(false);
    expect(response.body).toEqual(errorBody);

    const parts = await takeMultipartRequest("POST", "/post");
    expect(Object.keys(parts)).toHaveLength(1);
    expectFilePart(parts, "file", "file.txt", "text/plain", "file-content");
  });
});
