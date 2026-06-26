#!/usr/bin/env node
/**
 * Run all insight template QA checks.
 * Usage: npm run qa:insights-all [-- --live]
 */
import { spawnSync } from "node:child_process";

const live = process.argv.includes("--live");
const steps = [
  ["npx", ["tsx", "scripts/qa-insights-jsonld.ts"]],
  ["npx", ["tsx", "scripts/qa-insights-seo.ts"]],
  [
    "npx",
    live
      ? ["tsx", "scripts/qa-insights-crawl.ts", "--live"]
      : ["tsx", "scripts/qa-insights-crawl.ts"],
  ],
];

let failed = 0;

for (const [cmd, args] of steps) {
  console.log(`\n▶ ${cmd} ${args.join(" ")}\n`);
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) failed++;
}

if (failed) {
  console.error(`\n${failed} QA suite(s) failed.`);
  process.exit(1);
}

console.log("\n✅ All insight QA suites passed.");
if (!live) {
  console.log("Tip: run npm run qa:insights-all -- --live after deploy for production HTML checks.");
}
