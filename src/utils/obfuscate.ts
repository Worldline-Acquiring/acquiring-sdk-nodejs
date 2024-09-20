import * as _ from "lodash";
import { ObfuscationRule, SdkContext } from "../model";

const REPLACECHAR = "*";
const INDENT = 2;

const ALL: ObfuscationRule = value => {
  const l = value.length;
  return _.padStart("", l, REPLACECHAR);
};

/**
 * @returns An obfuscation rule that will keep a fixed number of characters at the end, then replaces all other characters with *.
 */
export function allButLast(count: number): ObfuscationRule {
  const rule: ObfuscationRule = value => {
    const l = value.length;
    const end = value.substring(l - count);
    return _.padStart(end, l, REPLACECHAR);
  };
  return rule;
}

/**
 * @returns An obfuscation rule that will replace all characters with *.
 */
export function all(): ObfuscationRule {
  return ALL;
}

/**
 * @returns An obfuscation rule that will keep a fixed number of characters at the start, then replaces all other characters with *.
 */
export function allButFirst(count: number): ObfuscationRule {
  const rule: ObfuscationRule = value => {
    const l = value.length;
    const start = value.substring(0, count);
    return _.padEnd(start, l, REPLACECHAR);
  };
  return rule;
}

/**
 * @returns An obfuscation rule that will replace values with a fixed length string containing only *.
 */
export function withFixedLength(count: number): ObfuscationRule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rule: ObfuscationRule = _value => {
    return _.padEnd("", count, REPLACECHAR);
  };
  return rule;
}

type ObfuscationRules = { [key: string]: ObfuscationRule | undefined };

function obfuscationRuleKey(name: string, toLowerCase: boolean): string {
  return toLowerCase ? name.toLowerCase() : name;
}

function applyObfuscationRule(value: unknown, obfuscationRule?: ObfuscationRule): unknown {
  return obfuscationRule ? obfuscationRule("" + value) : value;
}

function applyObfuscationRules(json: unknown, obfuscationRules: ObfuscationRules, toLowerCase: boolean): unknown {
  if (json === null || typeof json !== "object") {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(value => applyObfuscationRules(value, obfuscationRules, toLowerCase));
  }
  const entries = Object.entries(json).map(([key, value]) => {
    const newValue =
      value !== null && typeof value === "object"
        ? applyObfuscationRules(value, obfuscationRules, toLowerCase)
        : applyObfuscationRule(value, obfuscationRules[obfuscationRuleKey(key, toLowerCase)]);
    return [key, newValue];
  });
  return Object.fromEntries(entries);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getObfuscated(input: any, context: SdkContext, caseInsensitive = false): string {
  if (!input) {
    return "";
  }
  if (typeof input === "string") {
    try {
      input = JSON.parse(input);
    } catch (e) {
      const logger = context.getLogger();
      if (context.isLoggingEnabled()) {
        logger("warn", "Cannot parse input to JSON: " + input);
      }
      return input;
    }
  }
  const obfuscationRules: ObfuscationRules = {};
  obfuscationRules[obfuscationRuleKey("address", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("authenticationValue", caseInsensitive)] = allButFirst(4);
  obfuscationRules[obfuscationRuleKey("bin", caseInsensitive)] = allButFirst(6);
  obfuscationRules[obfuscationRuleKey("cardholderAddress", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("cardholderPostalCode", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("cardNumber", caseInsensitive)] = allButLast(4);
  obfuscationRules[obfuscationRuleKey("cardSecurityCode", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("city", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("cryptogram", caseInsensitive)] = allButFirst(4);
  obfuscationRules[obfuscationRuleKey("expiryDate", caseInsensitive)] = allButLast(4);
  obfuscationRules[obfuscationRuleKey("name", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("paymentAccountReference", caseInsensitive)] = allButFirst(6);
  obfuscationRules[obfuscationRuleKey("postalCode", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("stateCode", caseInsensitive)] = all();

  // headers
  obfuscationRules[obfuscationRuleKey("Authorization", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("WWW-Authenticate", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("Proxy-Authenticate", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("Proxy-Authorization", caseInsensitive)] = withFixedLength(8);

  const customObfuscationRules = context.getObfuscationRules();
  for (const key in customObfuscationRules) {
    obfuscationRules[obfuscationRuleKey(key, caseInsensitive)] = customObfuscationRules[key];
  }

  const obfuscated = applyObfuscationRules(input, obfuscationRules, caseInsensitive);

  return JSON.stringify(obfuscated, null, INDENT);
}
