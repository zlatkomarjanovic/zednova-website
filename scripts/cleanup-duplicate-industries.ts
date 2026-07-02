/**
 * Repoint references from legacy industry docs to canonical ones, then delete legacy docs.
 * Usage: npx tsx scripts/cleanup-duplicate-industries.ts --apply
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { CANONICAL_INDUSTRY_PARENT_SLUGS } from "../src/lib/content/industry-parents";
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

const APPLY = process.argv.includes("--apply");

const CANONICAL_PARENT_IDS = new Set(
  CANONICAL_INDUSTRY_PARENT_SLUGS.map((slug) => `industryParent-${slug}`),
);
const CANONICAL_SEGMENT_IDS = new Set(industries.map((item) => `industry-${item.slug}`));

/** Legacy parent slug → canonical parent slug */
const LEGACY_PARENT_MAP: Record<string, string> = {
  "ecommerce-shopify": "ecommerce-dtc",
  "healthcare-clinics": "healthcare-wellness",
  "small-business-custom-software": "professional-services",
};

/** Legacy segment slug → canonical segment slug (when a close match exists) */
const LEGACY_SEGMENT_MAP: Record<string, string> = {
  "med-spas": "medspas",
  "wellness-clinics": "wellness-practices",
  "supplement-brands": "supplement-style-wellness-brands",
  "dtc-brands": "small-dtc-brands",
  "product-brands": "small-dtc-brands",
};

/** Legacy segment slug → canonical parent slug fallback */
const LEGACY_SEGMENT_PARENT_FALLBACK: Record<string, string> = {
  "appointment-based-businesses": "professional-services",
  "local-clinics": "healthcare-wellness",
  "outgrowing-no-code-tools": "professional-services",
  "outgrowing-spreadsheets": "professional-services",
  "peptide-clinics": "healthcare-wellness",
  "portal-dashboard-booking-needs": "professional-services",
  "small-teams-manual-processes": "professional-services",
  "trt-clinics": "healthcare-wellness",
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const draftClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  perspective: "previewDrafts",
});

function resolveTargetId(legacyId: string): string | undefined {
  if (legacyId.startsWith("industryParent-")) {
    const slug = legacyId.replace("industryParent-", "");
    const mapped = LEGACY_PARENT_MAP[slug] ?? slug;
    return `industryParent-${mapped}`;
  }

  if (legacyId.startsWith("industry-")) {
    const slug = legacyId.replace("industry-", "");
    const mappedSegment = LEGACY_SEGMENT_MAP[slug];
    if (mappedSegment && CANONICAL_SEGMENT_IDS.has(`industry-${mappedSegment}`)) {
      return `industry-${mappedSegment}`;
    }
    const parentSlug = LEGACY_SEGMENT_PARENT_FALLBACK[slug];
    if (parentSlug) return `industryParent-${parentSlug}`;
  }

  return undefined;
}

function replaceRefs(value: unknown, fromId: string, toId: string): { value: unknown; changed: boolean } {
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const result = replaceRefs(item, fromId, toId);
      changed ||= result.changed;
      return result.value;
    });
    return { value: next, changed };
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj._type === "reference" && obj._ref === fromId) {
      return { value: { _type: "reference", _ref: toId }, changed: true };
    }

    let changed = false;
    const next: Record<string, unknown> = { ...obj };
    for (const [key, nested] of Object.entries(obj)) {
      if (key.startsWith("_")) continue;
      const result = replaceRefs(nested, fromId, toId);
      if (result.changed) {
        next[key] = result.value;
        changed = true;
      }
    }
    return { value: next, changed };
  }

  return { value, changed: false };
}

async function countReferences(id: string) {
  return client.fetch<number>(`count(*[references($id)])`, { id });
}

async function repointReferences(fromId: string, toId: string) {
  const referrers = await client.fetch<{ _id: string; _type: string }[]>(
    `*[references($fromId)]{ _id, _type }`,
    { fromId },
  );

  for (const doc of referrers) {
    const full = await client.fetch<Record<string, unknown>>(`*[_id == $id][0]`, { id: doc._id });
    if (!full) continue;

    const { value, changed } = replaceRefs(full, fromId, toId);
    if (!changed) continue;

    if (APPLY) {
      await client.createOrReplace(value as { _id: string; _type: string });
      console.log(`  ↪ repointed refs in ${doc._type} ${doc._id}`);
    } else {
      console.log(`  [dry-run] would repoint refs in ${doc._type} ${doc._id}`);
    }
  }
}

/** Stale insightCategory drafts blocking legacy industry deletes. */
const STALE_DRAFT_IDS = [
  "drafts.insightCategory-ecommerce",
  "drafts.insightCategory-ai-agents",
  "drafts.insightCategory-strategy-ops",
  "drafts.insightCategory-conversion-optimization",
  "drafts.insightCategory-industry-healthcare",
  "drafts.insightCategory-ai-automation",
  "drafts.insightCategory-web-development",
  "drafts.insightCategory-crm-pipelines",
];

async function discardAllDrafts() {
  const discovered = await draftClient.fetch<string[]>(`*[_id match "drafts.*"]._id`);
  const draftIds = [...new Set([...STALE_DRAFT_IDS, ...discovered])];
  if (!draftIds.length) return;
  console.log(`Discarding ${draftIds.length} draft document(s)...`);
  for (const draftId of draftIds) {
    if (!APPLY) {
      console.log(`  [dry-run] would discard ${draftId}`);
      continue;
    }
    try {
      await client.delete(draftId);
      console.log(`  ↪ discarded ${draftId}`);
    } catch {
      // already gone
    }
  }
}

async function discardDraftsReferencing(fromId: string) {
  const draftIds = await client.fetch<string[]>(
    `*[_id in path("drafts.**") && references($fromId)]._id`,
    { fromId },
  );

  for (const draftId of draftIds) {
    if (!APPLY) {
      console.log(`  [dry-run] would discard draft ${draftId}`);
      continue;
    }
    await client.delete(draftId);
    console.log(`  ↪ discarded draft ${draftId}`);
  }
}

async function main() {
  const parents = await client.fetch<{ _id: string; slug?: string; title: string }[]>(
    `*[_type == "industryParent"]{ _id, title, "slug": slug.current } | order(slug asc)`,
  );
  const segments = await client.fetch<{ _id: string; slug?: string }[]>(
    `*[_type == "industry"]{ _id, "slug": slug.current } | order(slug asc)`,
  );

  const legacyIds = [
    ...parents.filter((row) => !CANONICAL_PARENT_IDS.has(row._id)).map((row) => row._id),
    ...segments.filter((row) => !CANONICAL_SEGMENT_IDS.has(row._id)).map((row) => row._id),
  ];

  console.log(`${legacyIds.length} legacy industry document(s) to remove.\n`);

  if (APPLY && legacyIds.length) await discardAllDrafts();

  for (const legacyId of legacyIds) {
    const targetId = resolveTargetId(legacyId);
    if (!targetId || targetId === legacyId) {
      console.warn(`skip ${legacyId}: no canonical mapping`);
      continue;
    }

    const refs = await countReferences(legacyId);
    console.log(`${legacyId} → ${targetId} (${refs} reference(s))`);

    if (refs > 0) await repointReferences(legacyId, targetId);

    if (!APPLY) {
      await discardDraftsReferencing(legacyId);
      continue;
    }

    await discardDraftsReferencing(legacyId);

    const refsFinal = await countReferences(legacyId);
    if (refsFinal > 0) {
      console.warn(`  skip delete ${legacyId}: still ${refsFinal} reference(s)`);
      continue;
    }

    try {
      await client.delete(legacyId);
      console.log(`✓ deleted ${legacyId}`);
    } catch (error) {
      console.warn(`  skip delete ${legacyId}:`, error instanceof Error ? error.message : error);
    }
  }

  if (!APPLY) console.log("\nRun with --apply to repoint references and delete legacy docs.");
  else console.log("\nCleanup complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
