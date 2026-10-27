import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored ThreeUI landing-page source and runtime assets are kept
    // byte-exact for visual parity, so they are not ours to lint.
    "src/shaders/landing-pages/**",
    "public/landing-pages/**",
  ]),
]);

export default eslintConfig;
