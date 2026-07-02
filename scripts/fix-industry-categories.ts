/**
 * Fix industry category on published docs AND drafts in Sanity.
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

const SCHEMA_CATEGORIES = [
  "Healthcare & Wellness",
  "Ecommerce & DTC",
  "Fitness, Coaching & Performance",
  "Professional Services",
  "B2B SaaS & Technology",
  "Real Estate & Property",
] as const;

const CATEGORY_MAP: Record<string, (typeof SCHEMA_CATEGORIES)[number]> = {
  "Healthcare Clinics": "Healthcare & Wellness",
  "Ecommerce & Shopify": "Ecommerce & DTC",
  "Small Business Custom Software": "Professional Services",
  "B2B SaaS & Tech": "B2B SaaS & Technology",
  "Real Estate": "Real Estate & Property",
  "Fitness & Coaching": "Fitness, Coaching & Performance",
};

const STATIC_CATEGORY_BY_SLUG = new Map<string, (typeof SCHEMA_CATEGORIES)[number]>([
  ...industryParents.map((parent) => [parent.slug, parent.category] as const),
  ...industries.map((industry) => [industry.slug, industry.category] as const),
]);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

type Row = {
  _id: string;
  _type: string;
  category?: string;
  slug?: string;
  parentSlug?: string;
  seo?: { keywords?: string[] };
};

function resolveCategory(row: Row): (typeof SCHEMA_CATEGORIES)[number] | undefined {
  if (row.slug && STATIC_CATEGORY_BY_SLUG.has(row.slug)) {
    return STATIC_CATEGORY_BY_SLUG.get(row.slug);
  }
  if (row.category && CATEGORY_MAP[row.category]) return CATEGORY_MAP[row.category];
  if (row.category && SCHEMA_CATEGORIES.includes(row.category as (typeof SCHEMA_CATEGORIES)[number])) {
    return row.category as (typeof SCHEMA_CATEGORIES)[number];
  }
  if (row.parentSlug && STATIC_CATEGORY_BY_SLUG.has(row.parentSlug)) {
    return STATIC_CATEGORY_BY_SLUG.get(row.parentSlug);
  }
  return undefined;
}

function normalizeKeywords(keywords?: string[]) {
  if (!keywords?.length) return undefined;
  const mapped = keywords.map((keyword) => CATEGORY_MAP[keyword] ?? keyword);
  const changed = mapped.some((keyword, index) => keyword !== keywords[index]);
  return changed ? mapped : undefined;
}

async function main() {
  const rows = await client.fetch<Row[]>(
    `*[_type in ["industry", "industryParent"] && !(_id in path("drafts.**"))]{
      _id,
      _type,
      category,
      "slug": slug.current,
      "parentSlug": parent->slug.current,
      seo
    }`,
  );

  let categoryPatches = 0;
  let keywordPatches = 0;
  let draftDiscards = 0;

  for (const row of rows) {
    const resolved = resolveCategory(row);
    const normalizedKeywords = normalizeKeywords(row.seo?.keywords);

    const set: Record<string, unknown> = {};
    if (resolved && row.category !== resolved) set.category = resolved;
    if (normalizedKeywords) {
      set.seo = { ...(row.seo ?? {}), _type: "seoFields", keywords: normalizedKeywords };
    }

    if (Object.keys(set).length) {
      await client.patch(row._id).set(set).commit();
      if (set.category) categoryPatches += 1;
      if (normalizedKeywords) keywordPatches += 1;
      console.log(`✓ ${row.slug ?? row._id}`);
    }

    const draftId = `drafts.${row._id}`;
    const hasDraft = await client.fetch<boolean>(`defined(*[_id == $id][0]._id)`, { id: draftId });
    if (hasDraft) {
      await client.delete(draftId);
      draftDiscards += 1;
      console.log(`✓ discarded stale draft for ${row.slug ?? row._id}`);
    }
  }

  console.log(
    `\nDone. category=${categoryPatches}, seo.keywords=${keywordPatches}, drafts discarded=${draftDiscards}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
