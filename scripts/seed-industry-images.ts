/**
 * Download industry hero images and upload to Sanity industryParent docs.
 * Usage: npm run seed:industry-images
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { assignIndustryBuildSpans } from "../src/lib/content/industry-build-layout";

const INDUSTRY_IMAGES = [
  {
    slug: "healthcare-wellness",
    alt: "Healthcare professional consulting with a patient in a modern clinic",
    url: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "fitness-coaching-performance",
    alt: "People training together in a modern fitness gym",
    url: "https://images.pexels.com/photos/2261488/pexels-photo-2261488.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "professional-services",
    alt: "Professional team collaborating in a bright modern office",
    url: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "ecommerce-dtc",
    alt: "Customer shopping online with packages and a laptop",
    url: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "b2b-saas-technology",
    alt: "Developer working on a laptop with analytics dashboards",
    url: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "real-estate-property",
    alt: "Modern home exterior with pool and landscaped garden",
    url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
] as const;

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

const assetCache = new Map<string, string>();

function imageField(assetId: string, alt: string) {
  return {
    _type: "image" as const,
    alt,
    asset: { _type: "reference" as const, _ref: assetId },
  };
}

async function uploadIndustryImage(slug: string, url: string, alt: string) {
  const cached = assetCache.get(slug);
  if (cached) return cached;

  const filename = `industry-hero-${slug}.jpg`;
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  if (existing) {
    assetCache.set(slug, existing);
    return existing;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image for ${slug}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/jpeg",
    label: alt,
  });

  assetCache.set(slug, asset._id);
  console.log(`  uploaded hero → ${asset._id}`);
  return asset._id;
}

type BuildCardDoc = {
  title?: string;
  subtitle?: string;
  body?: string;
  bestFor?: string;
  serviceHref?: string;
  icon?: string;
  span?: string;
  image?: unknown;
};

async function patchIndustryParent(
  slug: string,
  assetId: string,
  alt: string,
) {
  const docId = `industryParent-${slug}`;
  const image = imageField(assetId, alt);

  const existing = await client.fetch<{ buildCards?: BuildCardDoc[] } | null>(
    `*[_id == $id][0]{ buildCards }`,
    { id: docId },
  );

  const buildCards = existing?.buildCards?.length
    ? existing.buildCards.map((card, index) => {
        const spans = assignIndustryBuildSpans(existing.buildCards!.length);
        const { subtitle, ...rest } = card;
        const cleanedSubtitle =
          subtitle && !/^deliverables?$/i.test(subtitle.trim())
            ? subtitle
            : undefined;
        return {
          ...rest,
          ...(cleanedSubtitle ? { subtitle: cleanedSubtitle } : {}),
          span: spans[index] ?? "1x1",
        };
      })
    : undefined;

  await client
    .patch(docId)
    .set({
      heroImage: image,
      coverImage: image,
      ...(buildCards ? { buildCards } : {}),
    })
    .commit();

  console.log(`  patched ${docId}`);
}

async function main() {
  console.log("Uploading industry hero images to Sanity…");

  for (const entry of INDUSTRY_IMAGES) {
    console.log(`→ ${entry.slug}`);
    const assetId = await uploadIndustryImage(entry.slug, entry.url, entry.alt);
    await patchIndustryParent(entry.slug, assetId, entry.alt);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
