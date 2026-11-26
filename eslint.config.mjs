import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["node_modules", "docs", "lib", "schemas"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    // Same behaviour as ESLint 8: do not report disable directives that are not needed (generated code still contains
    // directives for rules that no longer exist in typescript-eslint 8, e.g. no-var-requires).
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  {
    // The generated API classes load their JSON schemas with require().
    files: ["src/v1/**/*.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
