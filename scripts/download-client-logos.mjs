#!/usr/bin/env node
/**
 * Download client logos from a live Webflow site into public/images/logos/.
 *
 * Usage:
 *   npm run download:logos -- https://zlatkomarjanovic.com
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "images", "logos");

const ASSETS = [
  "/images/common-crawl.svg",
  "/images/65c6c74d7509c8cb43472586_656d3132ce05a3b01d96bad2_icon-logo.webp",
  "/images/65c6c2ea17fcb5339ee9a29a_GetLargeHeaderLogo.webp",
  "/images/6681880ec9fc2fc5e3a062d9_Group-1091431.webp",
  "/images/Dana-Yao-Zlatko-Marjanovic-SVG-Logo.svg",
  "/images/egc-logo.svg",
];

const baseUrl = (process.argv[2] || process.env.WEBFLOW_SITE_URL || "https://zlatkomarjanovic.com").replace(/\/$/, "");

await mkdir(outDir, { recursive: true });

for (const assetPath of ASSETS) {
  const url = `${baseUrl}${assetPath}`;
  const filename = path.basename(assetPath);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*,*/*" },
  });

  if (!res.ok) {
    console.error(`FAIL ${filename}: ${res.status} ${url}`);
    continue;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(outDir, filename), buffer);
  console.log(`OK ${filename} (${buffer.length} bytes)`);
}
