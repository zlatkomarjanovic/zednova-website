/**
 * Audit and fix industry category values in Sanity.
 * Usage:
 *   npx tsx scripts/audit-industry-categories.ts
 *   npx tsx scripts/audit-industry-categories.ts --fix
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { industryParents } from "../src/lib/content/industry-parents";
import { industries } from "../src/lib/content/industry-subs";

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

const FIX = process.argv.includes("--fix");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const SCHEMA_CATEGORIES = [
  "Healthcare & Wellness",
  "Ecommerce & DTC",
  "Fitness, Coaching & Performance",
  "Professional Services",
  "B2B SaaS & Technology",
  "Real Estate & Property",
] as const;

/** Legacy CMS category labels → canonical schema values. */
const CATEGORY_MAP: Record<string, (typeof SCHEMA_CATEGORIES)[number]> = {
  "Healthcare Clinics": "Healthcare & Wellness",
  "Ecommerce & Shopify": "Ecommerce & DTC",
  "Small Business Custom Software": "Professional Services",
  "B2B SaaS & Tech": "B2B SaaS & Technology",
  "Real Estate": "Real Estate & Property",
  "Fitness & Coaching": "Fitness, Coaching & Performance",
};

/** Static slug → canonical category (parents + segments). */
const STATIC_CATEGORY_BY_SLUG = new Map<string, (typeof SCHEMA_CATEGORIES)[number]>([
  ...industryParents.map((parent) => [parent.slug, parent.category] as const),
  ...industries.map((industry) => [industry.slug, industry.category] as const),
]);

type Row = {
  _id: string;
  _type: string;
  title: string;
  category?: string;
  slug?: string;
  parentSlug?: string;
};

function resolveCategory(row: Row): (typeof SCHEMA_CATEGORIES)[number] | undefined {
  if (row.slug && STATIC_CATEGORY_BY_SLUG.has(row.slug)) {
    return STATIC_CATEGORY_BY_SLUG.get(row.slug);
  }
  if (row.category && CATEGORY_MAP[row.category]) {
    return CATEGORY_MAP[row.category];
  }
  if (row.category && SCHEMA_CATEGORIES.includes(row.category as (typeof SCHEMA_CATEGORIES)[number])) {
    return row.category as (typeof SCHEMA_CATEGORIES)[number];
  }
  if (row.parentSlug && STATIC_CATEGORY_BY_SLUG.has(row.parentSlug)) {
    return STATIC_CATEGORY_BY_SLUG.get(row.parentSlug);
  }
  return undefined;
}

function needsCategoryFix(row: Row): boolean {
  const resolved = resolveCategory(row);
  if (!resolved) return Boolean(row.category);
  return row.category !== resolved;
}

async function main() {
  const rows = await client.fetch<Row[]>(
    `*[_type in ["industry", "industryParent"]]{ _id, _type, title, category, "slug": slug.current, "parentSlug": parent->slug.current } | order(category asc)`,
  );

  const missing = rows.filter((row) => !row.category?.trim());
  if (missing.length) {
    console.log(`${missing.length} document(s) missing category:\n`);
    for (const row of missing) {
      console.log(`  - ${row._type} ${row.slug ?? row._id}`);
    }
    console.log("");
  }

  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = row.category ?? "(missing)";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  console.log("Category counts in Sanity:\n");
  for (const [category, count] of [...counts.entries()].sort()) {
    const valid = SCHEMA_CATEGORIES.includes(category as (typeof SCHEMA_CATEGORIES)[number])
      ? "OK"
      : category === "(missing)"
        ? "MISSING"
        : CATEGORY_MAP[category]
          ? "LEGACY"
          : "INVALID";
    console.log(`  ${valid.padEnd(8)} ${count}x  ${category}`);
  }

  const toFix = rows.filter(needsCategoryFix);

  if (!toFix.length) {
    console.log("\nAll categories valid and aligned with static source.");
    return;
  }

  console.log(`\n${toFix.length} document(s) need category fixes:`);
  for (const row of toFix) {
    const resolved = resolveCategory(row);
    console.log(
      `  - ${row._type} ${row.slug ?? row._id}: "${row.category ?? "(missing)"}" → ${resolved ?? "?"}`,
    );
  }

  if (!FIX) {
    console.log("\nRun with --fix to patch categories in Sanity.");
    return;
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN for --fix");
    process.exit(1);
  }

  let patched = 0;
  for (const row of toFix) {
    const mapped = resolveCategory(row);
    if (!mapped) {
      console.warn(`  skip ${row._id}: no mapping for "${row.category ?? "(missing)"}"`);
      continue;
    }
    await client.patch(row._id).set({ category: mapped }).commit();
    patched += 1;
    console.log(`✓ ${row.slug ?? row._id} → "${mapped}"`);
  }

  console.log(`\nPatched ${patched} document(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
