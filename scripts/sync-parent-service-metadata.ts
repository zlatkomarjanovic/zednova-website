/**
 * Sync title, group, hero fields from static services.ts into Sanity parent service docs.
 * Usage: npx tsx scripts/sync-parent-service-metadata.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { services } from "../src/lib/content/services";

const PARENT_SLUGS = [
  "ai-lead-site",
  "crm-pipeline-automation",
  "ai-receptionist",
  "custom-in-house-software-for-smbs",
  "platform-migrations",
  "ai-systems-retainer",
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

async function main() {
  let patched = 0;

  for (const slug of PARENT_SLUGS) {
    const fallback = services.find((entry) => entry.slug === slug);
    if (!fallback) {
      console.log(`– ${slug} skipped (no static fallback)`);
      continue;
    }

    const docId = await client.fetch<string | null>(
      `*[_type == "service" && slug.current == $slug][0]._id`,
      { slug },
    );
    if (!docId) {
      console.log(`– ${slug} skipped (no Sanity document)`);
      continue;
    }

    await client
      .patch(docId)
      .set({
        title: fallback.title,
        group: fallback.group,
        category: fallback.category,
        icon: fallback.icon,
        heroEyebrow: fallback.heroEyebrow,
        focusKeyword: fallback.focusKeyword,
        shortDescription: fallback.shortDescription,
        whatItIs: fallback.whatItIs,
        heroHeadline: fallback.heroHeadline ?? fallback.title,
        heroSubhead: fallback.heroSubhead ?? fallback.whatItIs,
        pricingSignal: fallback.pricingSignal,
        timeline: fallback.timeline,
        order: fallback.order,
      })
      .commit();

    patched += 1;
    console.log(`✓ ${slug} → "${fallback.title}" (${fallback.group})`);
  }

  console.log(`\nSynced metadata on ${patched} service document(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
