import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { bodyCharCount } from "../src/lib/content/post-extensions";
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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-05-15",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  const docs = await client.fetch<
    {
      title: string;
      slug: string;
      body: Parameters<typeof portableTextToArticleBlocks>[0];
      tagCount: number;
      readTime: number;
    }[]
  >(`*[_type=="post"] | order(title asc) {
    title,
    "slug": slug.current,
    body[]{ ... },
    "tagCount": count(tags),
    readTime
  }`);

  for (const doc of docs) {
    const blocks = portableTextToArticleBlocks(doc.body);
    const chars = bodyCharCount(blocks);
    console.log(`${doc.slug}: ${chars} chars · ${blocks.length} blocks · ${doc.tagCount} tags · ${doc.readTime} min`);
  }
}

main();
