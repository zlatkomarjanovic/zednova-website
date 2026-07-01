/**
 * Seed bento sub-service cards into Sanity for all 6 parent service documents.
 * Creates missing service documents (e.g. platform-migrations) when needed.
 * Usage: npm run seed:service-sub-services
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { SECTION_COPY } from "../src/lib/content/service-detail-fallbacks";
import { SERVICE_SUB_SERVICES_BY_SLUG } from "../src/lib/content/service-sub-services";
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

function mapSubServicesForSanity(
  cards: (typeof SERVICE_SUB_SERVICES_BY_SLUG)[string],
) {
  return cards.map((card, index) => ({
    _type: "subServiceCard",
    _key: `sub-${index + 1}`,
    title: card.title,
    description: card.description,
    icon: card.icon,
    span: card.span ?? "1x1",
  }));
}

async function ensureServiceDocumentId(slug: string): Promise<string | null> {
  const existing = await client.fetch<string | null>(
    `*[_type == "service" && slug.current == $slug][0]._id`,
    { slug },
  );
  if (existing) return existing;

  const fallback = services.find((entry) => entry.slug === slug);
  if (!fallback) return null;

  const created = await client.create({
    _type: "service",
    slug: { _type: "slug", current: slug },
    title: fallback.title,
    group: fallback.group,
    category: fallback.category,
    shortDescription: fallback.shortDescription,
    whatItIs: fallback.whatItIs,
    heroHeadline: fallback.title,
    heroSubhead: fallback.whatItIs,
    heroEyebrow: fallback.heroEyebrow,
    order: fallback.order,
    deliverables: fallback.deliverables ?? [],
    idealClients: fallback.idealClients ?? [],
    pricingSignal: fallback.pricingSignal,
    timeline: fallback.timeline,
  });

  console.log(`+ Created missing service document: ${slug}`);
  return created._id;
}

async function migrateServiceSlug(oldSlug: string, newSlug: string) {
  const existingNew = await client.fetch<string | null>(
    `*[_type == "service" && slug.current == $newSlug][0]._id`,
    { newSlug },
  );
  if (existingNew) return;

  const docId = await client.fetch<string | null>(
    `*[_type == "service" && slug.current == $oldSlug][0]._id`,
    { oldSlug },
  );
  if (!docId) return;

  await client
    .patch(docId)
    .set({ slug: { _type: "slug", current: newSlug } })
    .commit();
  console.log(`↪ Migrated Sanity slug ${oldSlug} → ${newSlug}`);
}

async function main() {
  await migrateServiceSlug("reporting-dashboards", "custom-in-house-software-for-smbs");

  let patched = 0;

  for (const slug of PARENT_SLUGS) {
    const cards = SERVICE_SUB_SERVICES_BY_SLUG[slug];
    if (!cards?.length) {
      console.log(`– ${slug} skipped (no sub-service seed data)`);
      continue;
    }

    const docId = await ensureServiceDocumentId(slug);
    if (!docId) {
      console.log(`– ${slug} skipped (no static fallback service)`);
      continue;
    }

    const sectionCopy = SECTION_COPY[slug];
    const set: Record<string, unknown> = {
      subServices: mapSubServicesForSanity(cards),
    };

    if (sectionCopy?.problemsHeadline) {
      set.problemsHeadline = sectionCopy.problemsHeadline;
    }

    await client.patch(docId).set(set).commit();
    patched += 1;
    console.log(`✓ ${slug} → ${cards.length} sub-service card(s)`);
  }

  console.log(`\nPatched ${patched} service document(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
