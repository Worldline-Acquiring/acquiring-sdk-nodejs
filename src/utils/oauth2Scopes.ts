/*
 * This file was automatically generated.
 */

const scopesByOperation = {
  v1: {
    processPayment: ["processing_payment"],
    getPaymentStatus: ["processing_payment"],
    simpleCaptureOfPayment: ["processing_payment"],
    reverseAuthorization: ["processing_payment"],
    incrementPayment: ["processing_payment"],
    createRefund: ["processing_refund"],
    processStandaloneRefund: ["processing_refund"],
    getRefund: ["processing_refund"],
    captureRefund: ["processing_refund"],
    reverseRefundAuthorization: ["processing_refund"],
    processAccountVerification: ["processing_accountverification"],
    processBalanceInquiry: ["processing_balanceinquiry"],
    technicalReversal: ["processing_operation_reverse"],
    requestDccRate: ["processing_dcc_rate"],
    ping: ["services_ping"]
  }
};

const allScopes = new Set(
  Object.values(scopesByOperation)
    .flatMap(m => Object.values(m))
    .flatMap(m => m)
);

/**
 * Returns all available scopes.
 */
export function getAllScopes(): string[] {
  return [...allScopes];
}

/**
 * Returns all scopes needed for all operations of the given API version.
 */
export function getScopesForApiVersion(apiVersion: string): string[] {
  const operations = scopesByOperation[apiVersion] ?? {};
  const result: string[] = [];
  for (const scopes of Object.values(operations)) {
    result.push(...(scopes as string[]));
  }
  return [...new Set(result)];
}

/**
 * Returns all scopes needed for the given operation of the given API version.
 */
export function getScopesForOperation(apiVersion: string, operationId: string): string[] {
  const operations = scopesByOperation[apiVersion] ?? {};
  const scopes = operations[operationId];
  return scopes ? [...scopes] : [];
}

/**
 * Returns all scopes needed for the given operations of the given API version.
 */
export function getScopesForOperations(apiVersion: string, ...operationIds: string[]): string[];
/**
 * Returns all scopes needed for the operations that pass the given filter.
 */
export function getScopesForOperations(filter: (apiVersion: string, operationId: string) => boolean): string[];
export function getScopesForOperations(argument: string | ((apiVersion: string, operationId: string) => boolean), ...operationIds: string[]): string[] {
  if (typeof argument === "string") {
    const apiVersion = argument;
    const operations = scopesByOperation[apiVersion] ?? {};
    const result: string[] = [];
    for (const operationId of operationIds) {
      result.push(...(operations[operationId] ?? []));
    }
    return [...new Set(result)];
  }
  const filter = argument;
  const result: string[] = [];
  for (const apiVersion in scopesByOperation) {
    const operations = scopesByOperation[apiVersion];
    for (const operationId in operations) {
      if (filter(apiVersion, operationId)) {
        result.push(...operations[operationId]);
      }
    }
  }
  return [...new Set(result)];
}
