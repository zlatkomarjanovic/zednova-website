/**
 * Upload colored platform logos to Sanity and attach them to migration documents.
 * Usage: npm run seed:migration-icons
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { migrations } from "../src/lib/content/migrations";

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

function iconKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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

/** Brand-colored logos (Simple Icons CDN with official hex colors). */
const PLATFORM_CATALOG = {
  webflow: { slug: "webflow", alt: "Webflow", color: "146EF5" },
  wordpress: { slug: "wordpress", alt: "WordPress", color: "21759B" },
  framer: { slug: "framer", alt: "Framer", color: "0055FF" },
  wix: { slug: "wix", alt: "Wix", color: "0C6EFC" },
  squarespace: { slug: "squarespace", alt: "Squarespace", color: "000000" },
  shopify: { slug: "shopify", alt: "Shopify", color: "7AB55C" },
  airtable: { slug: "airtable", alt: "Airtable", color: "18BFFF" },
  googlesheets: { slug: "googlesheets", alt: "Google Sheets", color: "34A853" },
  nextjs: { slug: "nextdotjs", alt: "Next.js", color: "000000" },
  sanity: { slug: "sanity", alt: "Sanity", color: "F03E2F" },
} as const;

type PlatformKey = keyof typeof PLATFORM_CATALOG;

const MIGRATION_ICON_MAP: Record<string, { from: PlatformKey[]; to: PlatformKey[] }> = {
  "webflow-to-nextjs-sanity": { from: ["webflow"], to: ["nextjs", "sanity"] },
  "wordpress-to-nextjs-sanity": { from: ["wordpress"], to: ["nextjs", "sanity"] },
  "framer-to-nextjs-sanity": { from: ["framer"], to: ["nextjs", "sanity"] },
  "wix-to-nextjs-sanity": { from: ["wix"], to: ["nextjs", "sanity"] },
  "squarespace-to-nextjs-sanity": { from: ["squarespace"], to: ["nextjs", "sanity"] },
  "webflow-cms-to-sanity": { from: ["webflow"], to: ["sanity"] },
  "wordpress-blog-to-sanity": { from: ["wordpress"], to: ["sanity"] },
  "shopify-to-headless-shopify": { from: ["shopify"], to: ["shopify", "nextjs"] },
  "airtable-to-custom-dashboard": { from: ["airtable"], to: ["nextjs"] },
  "google-sheets-to-custom-dashboard": { from: ["googlesheets"], to: ["nextjs"] },
};

const assetCache = new Map<PlatformKey, string>();

async function getOrUploadPlatformAsset(key: PlatformKey): Promise<string> {
  const cached = assetCache.get(key);
  if (cached) return cached;

  const platform = PLATFORM_CATALOG[key];
  const filename = `migration-platform-color-${platform.slug}.svg`;

  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );

  if (existing) {
    assetCache.set(key, existing);
    return existing;
  }

  const response = await fetch(
    `https://cdn.simpleicons.org/${platform.slug}/${platform.color}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to download ${platform.slug}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/svg+xml",
    label: platform.alt,
  });

  assetCache.set(key, asset._id);
  console.log(`  uploaded ${platform.alt} (${platform.color}) → ${asset._id}`);
  return asset._id;
}

function platformIconField(assetId: string, alt: string) {
  return {
    _type: "migrationPlatformIcon",
    _key: iconKey(alt),
    alt,
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    },
  };
}

async function buildIconGallery(keys: PlatformKey[]) {
  const icons = [];
  for (const key of keys) {
    const platform = PLATFORM_CATALOG[key];
    const assetId = await getOrUploadPlatformAsset(key);
    icons.push(platformIconField(assetId, platform.alt));
  }
  return icons;
}

async function main() {
  console.log(`Seeding migration platform icon galleries in ${projectId}/${dataset}…`);

  for (const migration of migrations) {
    const map = MIGRATION_ICON_MAP[migration.slug];
    if (!map) {
      console.warn(`No icon map for migration: ${migration.slug}`);
      continue;
    }

    const fromIcons = await buildIconGallery(map.from);
    const toIcons = await buildIconGallery(map.to);

    await client
      .patch(`migration-${migration.slug}`)
      .set({ fromIcons, toIcons })
      .unset([
        "fromIcon",
        "fromIconUrl",
        "toIconUrls",
        "fromPlatform",
        "toPlatform",
        "sourcePlatform",
        "targetPlatform",
      ])
      .commit();

    console.log(`  patched migration-${migration.slug}`);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
