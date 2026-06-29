/**
 * Fix insights (post) documents: normalize inline FAQ keys.
 * Usage: npm run fix:insights-data
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

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

type RawInlineFaq = {
  _type?: string;
  _key?: string;
  question: string;
  shortAnswer?: string;
};

function normalizeInlineFaqs(faqs?: RawInlineFaq[]) {
  if (!faqs?.length) return undefined;
  return faqs.map((faq, index) => ({
    _type: "inlineFaq" as const,
    _key: faq._key ?? sanityKey("inline-faq", String(index)),
    question: faq.question,
    shortAnswer: faq.shortAnswer ?? "",
    schemaEnabled: true,
  }));
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
    { _id: string; title: string; inlineFaqs?: RawInlineFaq[] }[]
  >(`*[_type == "post"]{ _id, title, inlineFaqs[]{ _key, _type, question, shortAnswer } }`);

  let patched = 0;

  for (const post of posts) {
    const inlineFaqs = normalizeInlineFaqs(post.inlineFaqs);
    if (!inlineFaqs) {
      console.log(`· ${post.title} — no inline FAQs`);
      continue;
    }

    const needsFix = post.inlineFaqs?.some((faq) => !faq._key || faq._type !== "inlineFaq");
    if (!needsFix) {
      console.log(`· ${post.title} — already valid`);
      continue;
    }

    await client.patch(post._id).set({ inlineFaqs }).commit();
    patched += 1;
    console.log(`✓ ${post.title} — fixed inlineFaqs`);
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
