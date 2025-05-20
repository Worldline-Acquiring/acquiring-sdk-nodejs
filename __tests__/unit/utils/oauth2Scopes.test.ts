import { oauth2Scopes } from "../../../src";

/**
 * @group unit
 */
describe("OAuth2 scopes", () => {
  test("all", () => {
    const allScopes = oauth2Scopes.all();
    expect(allScopes).toEqual(expect.arrayContaining(["processing_payment", "processing_dcc_rate", "services_ping"]));

    const allScopesString = allScopes.join(" ");
    expect(allScopesString.length).toBeLessThanOrEqual(260);
  });

  test("for v1", () => {
    const scopes = oauth2Scopes.forApiVersion("v1");
    expect(scopes).toEqual(expect.arrayContaining(["processing_payment", "processing_dcc_rate", "services_ping"]));
  });

  test("for an unknown API version", () => {
    const scopes = oauth2Scopes.forApiVersion("v-1");
    expect(scopes).toEqual([]);
  });

  test("for v1 processPayment", () => {
    const scopes = oauth2Scopes.forOperation("v1", "processPayment");
    expect(scopes).toContain("processing_payment");
  });

  test("for v1 requestDccRate", () => {
    const scopes = oauth2Scopes.forOperation("v1", "requestDccRate");
    expect(scopes).toContain("processing_dcc_rate");
  });

  test("for unknown operation", () => {
    const scopes = oauth2Scopes.forOperation("v1", "unknown");
    expect(scopes).toEqual([]);
  });

  test("for an operation of an unknown API version", () => {
    const scopes = oauth2Scopes.forOperation("v-1", "processPayment");
    expect(scopes).toEqual([]);
  });

  test("for multiple v1 operations", () => {
    const scopes = oauth2Scopes.forOperations("v1", "processPayment", "requestDccRate", "unknown");
    expect(scopes).toEqual(expect.arrayContaining(["processing_payment", "processing_dcc_rate"]));
    expect(scopes).not.toEqual(expect.arrayContaining(["services_ping"]));
  });

  test("for multiple operations of unknown API version", () => {
    const scopes = oauth2Scopes.forOperations("v-1", "processPayment", "requestDccRate");
    expect(scopes).toEqual([]);
  });

  test("for operations passing a filter", () => {
    const operationIds = ["processPayment", "requestDccRate", "unknown"];
    const scopes = oauth2Scopes.forOperations((apiVersion, operationId) => apiVersion === "v1" && operationIds.includes(operationId));
    expect(scopes).toEqual(expect.arrayContaining(["processing_payment", "processing_dcc_rate"]));
    expect(scopes).not.toEqual(expect.arrayContaining(["services_ping"]));
  });
});
