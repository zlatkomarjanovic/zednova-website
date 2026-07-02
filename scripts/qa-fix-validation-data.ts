/**
 * One-time data fixes for issues reported by `sanity documents validate`:
 *
 * 1. caseStudy.results — add missing `_type: "stat"` / `_key` to array items.
 * 2. testimonial — remove legacy authorName/authorTitle/company fields and
 *    fix `platform` stored as a boolean (derive from platformSource).
 * 3. author — make the duplicate slug unique (author-zed-marjanovic -> zed-marjanovic).
 * 4. insightCategory (incl. drafts) — merge canonicalUrl into seo.seoCanonical,
 *    strip flat duplicate SEO fields, add missing _key to reference arrays,
 *    and dedupe repeated references.
 * 5. Trim seo.seoDescription > 160 chars (portfolioProject/product truncation warnings).
 *
 * Usage: npx tsx scripts/qa-fix-validation-data.ts [--apply]
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { config } from "dotenv";

config({ path: ".env.local" });

const APPLY = process.argv.includes("--apply");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});

const key = () => randomUUID().slice(0, 12);

function log(msg: string) {
  console.log(`${APPLY ? "[apply]" : "[dry-run]"} ${msg}`);
}

async function commit(id: string, patch: Record<string, unknown>, unset: string[] = []) {
  log(`patch ${id} set=${Object.keys(patch).join(",") || "-"} unset=${unset.join(",") || "-"}`);
  if (!APPLY) return;
  let tx = client.patch(id);
  if (Object.keys(patch).length) tx = tx.set(patch);
  if (unset.length) tx = tx.unset(unset);
  await tx.commit();
}

/* 1. caseStudy.results keys */
async function fixCaseStudyResults() {
  const docs: { _id: string; results?: Array<Record<string, unknown>> }[] =
    await client.fetch(`*[_type == "caseStudy" && defined(results)]{ _id, results }`);
  for (const doc of docs) {
    const needsFix = (doc.results ?? []).some((r) => !r._key || !r._type);
    if (!needsFix) continue;
    const results = (doc.results ?? []).map((r) => ({
      _type: "stat",
      _key: (r._key as string) ?? key(),
      value: r.value,
      label: r.label,
    }));
    await commit(doc._id, { results });
  }
}

/* 2. testimonial legacy fields */
const PLATFORM_VALUES = new Set(["Google", "Clutch", "Upwork", "Direct", "Other"]);

async function fixTestimonials() {
  const docs: {
    _id: string;
    platform?: unknown;
    platformSource?: string;
    authorName?: unknown;
    authorTitle?: unknown;
    company?: unknown;
  }[] = await client.fetch(
    `*[_type == "testimonial"]{ _id, platform, platformSource, authorName, authorTitle, company }`,
  );
  for (const doc of docs) {
    const unset: string[] = [];
    const set: Record<string, unknown> = {};
    if (doc.authorName !== undefined && doc.authorName !== null) unset.push("authorName");
    if (doc.authorTitle !== undefined && doc.authorTitle !== null) unset.push("authorTitle");
    if (doc.company !== undefined && doc.company !== null) unset.push("company");
    if (typeof doc.platform === "boolean") {
      if (doc.platformSource && PLATFORM_VALUES.has(doc.platformSource)) {
        set.platform = doc.platformSource;
      } else {
        unset.push("platform");
      }
    }
    if (unset.length || Object.keys(set).length) await commit(doc._id, set, unset);
  }
}

/* 3. author duplicate slug */
async function fixAuthorSlug() {
  const zed = await client.fetch(
    `*[_id == "author-zed-marjanovic"][0]{ _id, "slug": slug.current }`,
  );
  if (zed && zed.slug === "zlatko-marjanovic") {
    await commit("author-zed-marjanovic", {
      slug: { _type: "slug", current: "zed-marjanovic" },
    });
  }
}

/* 4. insightCategory cleanup */
const FLAT_SEO_FIELDS = [
  "canonicalUrl",
  "focusKeyword",
  "secondaryKeywords",
  "seoTitle",
  "seoDescription",
  "openGraphTitle",
  "openGraphDescription",
  "twitterTitle",
  "twitterDescription",
  "robotsIndex",
  "robotsFollow",
  "schemaType",
  "priority",
  "enableArticleSchema",
  "enableBreadcrumbSchema",
  "enableCollectionPageSchema",
  "enableFaqSchema",
  "enableProductSchema",
  "enableServiceSchema",
  "enableSoftwareApplicationSchema",
];

type RefItem = { _key?: string; _ref?: string; _type?: string };

function normalizeRefArray(items: RefItem[] | undefined): RefItem[] | undefined {
  if (!items?.length) return undefined;
  const seen = new Set<string>();
  const normalized: RefItem[] = [];
  for (const item of items) {
    if (!item._ref || seen.has(item._ref)) continue;
    seen.add(item._ref);
    normalized.push({ _type: "reference", _ref: item._ref, _key: item._key ?? key() });
  }
  return normalized;
}

async function fixInsightCategories() {
  const docs: Array<Record<string, unknown> & { _id: string }> = await client.fetch(
    `*[_type == "insightCategory"]`,
  );
  for (const doc of docs) {
    const set: Record<string, unknown> = {};
    const unset: string[] = [];

    const seo = (doc.seo as Record<string, unknown> | undefined) ?? { _type: "seoFields" };
    let seoChanged = false;
    if (doc.canonicalUrl && !seo.seoCanonical) {
      seo.seoCanonical = doc.canonicalUrl;
      seoChanged = true;
    }
    if (doc.seoTitle && !seo.seoTitle) {
      seo.seoTitle = doc.seoTitle;
      seoChanged = true;
    }
    if (doc.seoDescription && !seo.seoDescription) {
      seo.seoDescription = doc.seoDescription;
      seoChanged = true;
    }
    if (seoChanged) set.seo = seo;

    for (const field of FLAT_SEO_FIELDS) {
      if (doc[field] !== undefined && doc[field] !== null) unset.push(field);
    }

    for (const field of ["relatedServices", "relatedIndustries", "faqs"] as const) {
      const items = doc[field] as RefItem[] | undefined;
      if (!items?.length) continue;
      const hasIssue =
        items.some((i) => !i._key) ||
        new Set(items.map((i) => i._ref)).size !== items.length;
      if (hasIssue) {
        const normalized = normalizeRefArray(items);
        if (normalized) set[field] = normalized;
      }
    }

    if (unset.length || Object.keys(set).length) await commit(doc._id, set, unset);
  }
}

/* 5. seoDescription length */
function trimDescription(text: string): string {
  if (text.length <= 158) return text;
  const cut = text.slice(0, 155);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : 155).replace(/[,;:.\s]+$/, "")}.`;
}

async function fixLongSeoDescriptions() {
  const docs: { _id: string; desc: string }[] = await client.fetch(
    `*[_type in ["portfolioProject", "product"] && defined(seo.seoDescription)]{ _id, "desc": seo.seoDescription }`,
  );
  for (const doc of docs) {
    if (doc.desc.length <= 160) continue;
    await commit(doc._id, { "seo.seoDescription": trimDescription(doc.desc) });
  }
}

async function main() {
  await fixCaseStudyResults();
  await fixTestimonials();
  await fixAuthorSlug();
  await fixInsightCategories();
  await fixLongSeoDescriptions();
  console.log(APPLY ? "All fixes applied." : "Dry run complete. Re-run with --apply.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
