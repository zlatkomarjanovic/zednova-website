/**
 * Patch industryParent docs with 10 FAQs per vertical.
 * Usage: npm run seed:industry-faqs
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { INDUSTRY_FAQ_FALLBACKS } from "../src/lib/content/industry-faq-fallbacks";
import { CANONICAL_INDUSTRY_PARENT_SLUGS } from "../src/lib/content/industry-parents";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token,
  useCdn: false,
});

async function main() {
  console.log("Patching industry FAQs in Sanity…");

  for (const slug of CANONICAL_INDUSTRY_PARENT_SLUGS) {
    const faqs = INDUSTRY_FAQ_FALLBACKS[slug];
    await client
      .patch(`industryParent-${slug}`)
      .set({ faqs })
      .commit();
    console.log(`  ${slug} → ${faqs.length} FAQs`);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
