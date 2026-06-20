#!/usr/bin/env node
/**
 * Download portfolio mockup cover images from a live Webflow site.
 *
 * Usage:
 *   npm run download:portfolio -- https://zlatkomarjanovic.com
 *   WEBFLOW_SITE_URL=https://zlatkomarjanovic.com npm run download:portfolio
 *
 * Files are saved to public/images/ using the same paths as the Webflow export.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "images");

const ASSETS = [
  "/images/Mavesta-Media-Cover-Image.webp",
  "/images/Vault-Apps-Cover-Image-1.webp",
  "/images/Mavi-Longevity-Living-Cover-Image.webp",
  "/images/EGC-Cover-Image.webp",
];

const baseUrl = (process.argv[2] || process.env.WEBFLOW_SITE_URL || "https://zlatkomarjanovic.com").replace(/\/$/, "");

function isWebp(buffer) {
  return buffer.length > 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
}

await mkdir(outDir, { recursive: true });

for (const assetPath of ASSETS) {
  const url = `${baseUrl}${assetPath}`;
  const filename = path.basename(assetPath);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "image/webp,image/*,*/*" },
  });

  if (!res.ok) {
    console.error(`FAIL ${filename}: ${res.status} ${url}`);
    continue;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  if (!isWebp(buffer)) {
    console.error(`FAIL ${filename}: response is not a webp file (${url})`);
    continue;
  }

  await writeFile(path.join(outDir, filename), buffer);
  console.log(`OK ${filename} (${buffer.length} bytes)`);
}
