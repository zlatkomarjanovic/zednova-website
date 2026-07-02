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
    // Sanity Studio build output and dependencies (has its own toolchain):
    "studio-zednova-studio/dist/**",
    "studio-zednova-studio/node_modules/**",
    "studio-zednova-studio/.sanity/**",
    // Generated knowledge graph artifacts:
    "graphify-out/**",
  ]),
  {
    rules: {
      // React-compiler-powered rules flag intentional hydration patterns
      // (setState-on-mount after SSR) used by the animation components.
      // Keep them visible as warnings without failing the lint run.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
]);

export default eslintConfig;
