/**
 * Upsert the 6 parent service documents in Sanity (creates missing, patches text fields).
 * Usage: npx tsx scripts/seed-parent-services.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { FAQ_SECTION_COPY } from "../src/lib/content/service-detail-fallbacks";
import { services } from "../src/lib/content/services";
import { SERVICE_SLUG_BY_PARENT } from "../src/lib/content/service-routes";
import { slugify } from "../src/lib/utils";

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

function metaDescription(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= 155) return normalized;
  const trimmed = normalized.slice(0, 152).trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed}…`;
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

const parentSlugs = Object.values(SERVICE_SLUG_BY_PARENT);

async function main() {
  for (const slug of parentSlugs) {
    const source = services.find((entry) => entry.slug === slug);
    if (!source) {
      console.warn(`– ${slug}: no static source`);
      continue;
    }

    const docId = `service-${slug}`;
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "service" && slug.current == $slug][0]{ _id }`,
      { slug },
    );

    const payload = {
      _type: "service" as const,
      title: source.title,
      slug: { _type: "slug" as const, current: slug },
      number: source.number,
      group: source.group,
      category: source.category,
      icon: source.icon,
      isFeatured: source.order <= 4,
      showOnHomepage: true,
      showInPrimaryServices: true,
      isLegacy: false,
      isSecondary: false,
      plainPromise: source.shortDescription,
      problemSolved: source.whatItIs,
      shortDescription: source.shortDescription,
      whatItIs: source.whatItIs,
      heroHeadline: source.title,
      heroSubhead: source.whatItIs,
      heroEyebrow: source.heroEyebrow,
      deliverables: source.deliverables,
      idealClients: source.idealClients,
      results: source.results,
      pricingSignal: source.pricingSignal,
      timeline: source.timeline,
      order: source.order,
      ...(FAQ_SECTION_COPY[slug]
        ? {
            faqEyebrow: FAQ_SECTION_COPY[slug].eyebrow,
            faqHeadline: FAQ_SECTION_COPY[slug].headline,
            faqSubtext: FAQ_SECTION_COPY[slug].subtext,
          }
        : {}),
      seo: {
        _type: "seoFields" as const,
        seoTitle: source.title,
        seoDescription: metaDescription(source.shortDescription),
      },
    };

    if (existing) {
      await client.patch(existing._id).set(payload).commit();
      console.log(`✓ patched ${slug} (${existing._id})`);
    } else {
      await client.create({ _id: docId, ...payload });
      console.log(`+ created ${slug} (${docId})`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
