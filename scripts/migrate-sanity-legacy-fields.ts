/**
 * Migrate Sanity documents: copy legacy field data into canonical fields, then unset legacy keys.
 * Also deletes orphaned documents for removed schema types (teamMember, page, redirect).
 * Usage: npx tsx scripts/migrate-sanity-legacy-fields.ts [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import type { ArticleBlock } from "../src/lib/types";
import { articleBlocksToPortableText } from "../src/sanity/blocks-to-portable-text";
import { portableTextToArticleBlocks } from "../src/sanity/portable-text-to-blocks";

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

const DRY_RUN = process.argv.includes("--dry-run");
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

const REMOVED_TYPES = ["teamMember", "page", "redirect"] as const;

const POST_LEGACY_UNSET = [
  "articleBlocks",
  "faqs",
  "keyTakeaways",
  "sections",
  "coverImageUrl",
  "primaryCta",
  "secondaryCta",
  "recommendedNextStep",
  "leadMagnet",
  "newsletterCta",
  "leadMagnetTitle",
  "leadMagnetDescription",
  "leadMagnetButtonLabel",
  "leadMagnetHref",
  "glossaryTerms",
  "checklists",
  "reviewedBy",
  "factChecked",
  "notes",
  "editorialNotes",
  "oldUrl",
  "redirectFrom",
  "primaryImage",
  "categories",
  "order",
  "quickAnswerQuestion",
  "quickAnswerShort",
  "seoTitle",
  "seoDescription",
  "canonicalUrl",
  "focusKeyword",
  "secondaryKeywords",
  "searchTags",
  "robotsIndex",
  "robotsFollow",
  "structuredDataType",
  "jsonLdOverride",
  "customJsonLd",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "ogType",
  "twitterCard",
  "twitterTitle",
  "twitterDescription",
  "twitterImage",
  "openGraphTitle",
  "openGraphDescription",
  "openGraphImage",
  "schemaType",
  "enableArticleSchema",
  "enableFaqSchema",
  "enableBreadcrumbSchema",
  "schemaImage",
  "seoHideFromLists",
] as const;

const POST_NESTED_LEGACY_UNSET = ["seo.canonicalUrl", "seo.customJsonLd"] as const;

const DOC_LEGACY_UNSET: Record<string, readonly string[]> = {
  service: ["coverImageUrl"],
  caseStudy: ["coverImageUrl"],
  portfolioProject: ["coverImageUrl"],
  industry: ["recommendedServices"],
  testimonial: ["avatarUrl"],
  author: ["avatarUrl", "avatar", "seo"],
};

type LegacyPost = {
  _id: string;
  title: string;
  articleBlocks?: ArticleBlock[];
  body?: unknown[];
  faqs?: { _key?: string; question: string; answer: string }[];
  inlineFaqs?: { _key?: string; question: string; shortAnswer?: string }[];
  takeaways?: string[];
  keyTakeaways?: { title?: string }[];
};

function mergeInlineFaqs(post: LegacyPost) {
  const existing = post.inlineFaqs ?? [];
  const legacy = (post.faqs ?? []).map((faq, index) => ({
    _type: "inlineFaq" as const,
    _key: faq._key ?? `legacy-faq-${index}`,
    question: faq.question,
    shortAnswer: faq.answer,
    schemaEnabled: true,
  }));
  const seen = new Set(existing.map((f) => f.question.trim().toLowerCase()));
  const merged = [...existing];
  for (const faq of legacy) {
    const key = faq.question.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(faq);
  }
  return merged.length ? merged : undefined;
}

function mergeTakeaways(post: LegacyPost) {
  const rich = (post.keyTakeaways ?? [])
    .map((item) => item.title?.trim())
    .filter(Boolean) as string[];
  const merged = [...new Set([...(post.takeaways ?? []), ...rich])];
  return merged.length ? merged : undefined;
}

function resolveBody(post: LegacyPost) {
  const fromPt = portableTextToArticleBlocks(post.body as Parameters<typeof portableTextToArticleBlocks>[0]);
  if (fromPt.length) return post.body;
  if (!post.articleBlocks?.length) return undefined;
  return articleBlocksToPortableText(post.articleBlocks);
}

async function migratePosts() {
  const posts = await client.fetch<LegacyPost[]>(
    `*[_type == "post"]{
      _id,
      title,
      articleBlocks[]{ type, text, items, calloutVariant, imageAlt, "image": image.asset->url },
      body[]{ ... },
      faqs[]{ _key, question, answer },
      inlineFaqs[]{ _key, question, shortAnswer },
      takeaways,
      keyTakeaways[]{ title }
    }`,
  );

  for (const post of posts) {
    const set: Record<string, unknown> = {};
    const body = resolveBody(post);
    if (body) set.body = body;

    const inlineFaqs = mergeInlineFaqs(post);
    if (inlineFaqs) set.inlineFaqs = inlineFaqs;

    const takeaways = mergeTakeaways(post);
    if (takeaways) set.takeaways = takeaways;

    if (DRY_RUN) {
      console.log(`[dry-run] post: ${post.title}`);
      if (body) console.log("  → would set body");
      if (inlineFaqs) console.log(`  → would set ${inlineFaqs.length} inlineFaqs`);
      if (takeaways) console.log(`  → would set ${takeaways.length} takeaways`);
      console.log(`  → would unset: ${POST_LEGACY_UNSET.join(", ")}`);
      continue;
    }

    let patch = client.patch(post._id);
    if (Object.keys(set).length) patch = patch.set(set);
    patch = patch.unset([...POST_LEGACY_UNSET, ...POST_NESTED_LEGACY_UNSET]);
    await patch.commit();
    console.log(`✓ post: ${post.title}`);
  }
}

async function unsetLegacyDocFields() {
  for (const [type, fields] of Object.entries(DOC_LEGACY_UNSET)) {
    const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
    if (!ids.length) continue;

    for (const id of ids) {
      if (DRY_RUN) {
        console.log(`[dry-run] ${type} ${id} → unset ${fields.join(", ")}`);
        continue;
      }
      await client.patch(id).unset([...fields]).commit();
    }
    if (!DRY_RUN) console.log(`✓ ${type}: unset legacy fields on ${ids.length} doc(s)`);
  }
}

async function deleteRemovedTypes() {
  for (const type of REMOVED_TYPES) {
    const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
    if (!ids.length) continue;

    if (DRY_RUN) {
      console.log(`[dry-run] would delete ${ids.length} ${type} document(s)`);
      continue;
    }

    const tx = client.transaction();
    for (const id of ids) tx.delete(id);
    await tx.commit();
    console.log(`✓ deleted ${ids.length} ${type} document(s)`);
  }
}

async function main() {
  console.log(`${DRY_RUN ? "Dry run" : "Migrating"} legacy Sanity fields…\n`);
  await migratePosts();
  await unsetLegacyDocFields();
  await deleteRemovedTypes();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
