/**
 * Fix insights (post) documents: add array _keys, articleBlock _type, and slug objects for FAQ ids.
 * Usage: npm run fix:insights-data
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import type { ArticleBlock, ArticleFaq } from "../src/lib/types";

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

function sanityKey(prefix: string, seed: string) {
  return `${prefix}-${seed}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .slice(0, 24);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function toSanitySlug(current: string) {
  return { _type: "slug" as const, current };
}

type RawArticleBlock = ArticleBlock & { _type?: string; _key?: string };
type RawFaq = { _type?: string; _key?: string; id?: string | { current?: string }; question: string; answer: string };

export function mapArticleBlocksForSanity(blocks: RawArticleBlock[]) {
  return blocks.map((block, index) => {
    const { _type: _ignoredType, _key: existingKey, ...rest } = block;
    return {
      _type: "articleBlock" as const,
      _key: existingKey ?? sanityKey("block", `${index}-${block.type}`),
      type: rest.type,
      ...(rest.text !== undefined ? { text: rest.text } : {}),
      ...(rest.items !== undefined ? { items: rest.items } : {}),
      ...(rest.calloutVariant !== undefined ? { calloutVariant: rest.calloutVariant } : {}),
      ...(rest.image !== undefined ? { image: rest.image } : {}),
      ...(rest.imageAlt !== undefined ? { imageAlt: rest.imageAlt } : {}),
    };
  });
}

export function mapFaqsForSanity(faqs: RawFaq[]) {
  return faqs.map((faq, index) => {
    const rawId =
      typeof faq.id === "string"
        ? faq.id
        : faq.id?.current ?? slugify(faq.question);

    return {
      _type: "articleFaq" as const,
      _key: faq._key ?? sanityKey("faq", rawId || String(index)),
      id: toSanitySlug(rawId),
      question: faq.question,
      answer: faq.answer,
    };
  });
}

function needsArticleBlockFix(blocks?: RawArticleBlock[]) {
  if (!blocks?.length) return false;
  return blocks.some((block) => !block._key || block._type !== "articleBlock");
}

function needsFaqFix(faqs?: RawFaq[]) {
  if (!faqs?.length) return false;
  return faqs.some(
    (faq) =>
      !faq._key ||
      faq._type !== "articleFaq" ||
      typeof faq.id === "string" ||
      (faq.id != null && typeof faq.id === "object" && !("current" in faq.id)),
  );
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token,
  useCdn: false,
});

async function main() {
  console.log(`Fixing insights post data in ${projectId}/${dataset}…`);

  const posts = await client.fetch<
    {
      _id: string;
      title: string;
      articleBlocks?: RawArticleBlock[];
      faqs?: RawFaq[];
    }[]
  >(`*[_type == "post"]{ _id, title, articleBlocks, faqs }`);

  let patched = 0;

  for (const post of posts) {
    const patch: Record<string, unknown> = {};
    const fixBlocks = needsArticleBlockFix(post.articleBlocks);
    const fixFaqs = needsFaqFix(post.faqs);

    if (fixBlocks && post.articleBlocks) {
      patch.articleBlocks = mapArticleBlocksForSanity(post.articleBlocks);
    }
    if (fixFaqs && post.faqs) {
      patch.faqs = mapFaqsForSanity(post.faqs);
    }

    if (Object.keys(patch).length === 0) {
      console.log(`· ${post.title} — already valid`);
      continue;
    }

    await client.patch(post._id).set(patch).commit();
    patched += 1;
    console.log(
      `✓ ${post.title} — fixed ${[fixBlocks && "articleBlocks", fixFaqs && "faqs"].filter(Boolean).join(", ")}`,
    );
  }

  console.log(`\nDone. Patched ${patched}/${posts.length} post(s).`);
}

const isDirectRun = process.argv[1]?.replace(/\\/g, "/").includes("fix-insights-post-data");

if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
