/**
 * Set coverImage.caption on insight posts without re-uploading assets.
 * Usage: npx tsx scripts/patch-cover-captions.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { posts } from "../src/lib/content/posts";

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
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function main() {
  for (const post of posts) {
    const caption = `Cover illustration for “${post.title}” — ${post.category} insight by ZedNova Studios.`;
    await client
      .patch(`post-${post.slug}`)
      .set({ "coverImage.caption": caption })
      .commit();
    console.log(`✓ ${post.slug}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
