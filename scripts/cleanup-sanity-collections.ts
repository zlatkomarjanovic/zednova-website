/**
 * Swap platform-migrations → seo-aeo-content, purge unused Sanity collections.
 * Usage: npx tsx scripts/cleanup-sanity-collections.ts --apply
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { services } from "../src/lib/content/services";
import {
  SERVICE_PROCESS_ICONS,
  type ServiceProcessIconKey,
} from "../src/lib/content/service-process-icons";

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

const APPLY = process.argv.includes("--apply");
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token,
  useCdn: false,
});

const SEO_SLUG = "seo-aeo-content";
const PLATFORM_SLUG = "platform-migrations";
const PLATFORM_DOC_ID = "h9XvT3FTQBytpHySriBhSo";
const SEO_DOC_ID = "service-seo-aeo-content";

const PURGE_TYPES = ["serviceMegaMenuCard", "customSoftware", "migration"] as const;

const iconAssetCache = new Map<string, string>();

function replaceRefs(value: unknown, fromId: string, toId: string): { value: unknown; changed: boolean } {
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const result = replaceRefs(item, fromId, toId);
      changed ||= result.changed;
      return result.value;
    });
    return { value: next, changed };
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj._type === "reference" && obj._ref === fromId) {
      return { value: { _type: "reference", _ref: toId }, changed: true };
    }
    let changed = false;
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(obj)) {
      const result = replaceRefs(child, fromId, toId);
      changed ||= result.changed;
      next[key] = result.value;
    }
    return { value: next, changed };
  }
  return { value, changed: false };
}

async function uploadSvgIcon(key: ServiceProcessIconKey) {
  const cached = iconAssetCache.get(key);
  if (cached) return cached;
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename: `process-${key}.svg` },
  );
  if (existing) {
    iconAssetCache.set(key, existing);
    return existing;
  }
  const icon = SERVICE_PROCESS_ICONS[key];
  const asset = await client.assets.upload("image", Buffer.from(icon.svg, "utf8"), {
    filename: `process-${key}.svg`,
    contentType: "image/svg+xml",
  });
  iconAssetCache.set(key, asset._id);
  return asset._id;
}

async function mapProcessSteps(
  steps: NonNullable<(typeof services)[number]["processSteps"]>,
) {
  return Promise.all(
    steps.map(async (step, index) => {
      const iconKey = (step.icon ?? "discovery") as ServiceProcessIconKey;
      const assetId = SERVICE_PROCESS_ICONS[iconKey]
        ? await uploadSvgIcon(iconKey)
        : await uploadSvgIcon("discovery");
      return {
        _type: "processStep",
        _key: `process-${index + 1}`,
        step: step.step,
        title: step.title,
        description: step.description,
        deliverables: step.deliverables ?? [],
        icon: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
        },
      };
    }),
  );
}

async function ensureSeoService() {
  const source = services.find((entry) => entry.slug === SEO_SLUG);
  if (!source) throw new Error("Missing static seo-aeo-content");

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "service" && slug.current == $slug][0]{ _id }`,
    { slug: SEO_SLUG },
  );

  const processSteps = source.processSteps?.length
    ? await mapProcessSteps(source.processSteps)
    : [];

  const doc = {
    _id: existing?._id ?? SEO_DOC_ID,
    _type: "service",
    slug: { _type: "slug", current: SEO_SLUG },
    title: source.title,
    group: source.group,
    category: source.category,
    icon: source.icon,
    shortDescription: source.shortDescription,
    whatItIs: source.whatItIs,
    heroHeadline: source.title,
    heroSubhead: source.whatItIs,
    deliverables: source.deliverables ?? [],
    idealClients: source.idealClients ?? [],
    pricingSignal: source.pricingSignal,
    timeline: source.timeline,
    processSteps,
    results: source.results ?? [],
    order: source.order,
    isFeatured: false,
    showOnHomepage: true,
    showInPrimaryServices: true,
    isLegacy: false,
    isSecondary: false,
  };

  if (APPLY) {
    await client.createOrReplace(doc);
    console.log(`✓ upserted ${SEO_SLUG} (${doc._id})`);
  } else {
    console.log(`[dry-run] would upsert ${SEO_SLUG}`);
  }

  return doc._id;
}

async function repointAll(fromId: string, toId: string) {
  const ids = await client.fetch<string[]>(
    `array::unique(*[references($id) || (_id match "drafts.**" && references($id))]._id)`,
    { id: fromId },
  );

  for (const id of ids) {
    const doc = await client.getDocument(id);
    if (!doc) continue;
    const { value, changed } = replaceRefs(doc, fromId, toId);
    if (!changed) continue;
    if (APPLY) {
      await client.createOrReplace(value as typeof doc);
      console.log(`  ↪ repointed ${id}`);
    } else {
      console.log(`  [dry-run] would repoint ${id}`);
    }
  }
}

async function deleteDoc(id: string) {
  if (APPLY) {
    try {
      await client.delete(id);
    } catch (error) {
      console.warn(`  skip delete ${id}:`, error instanceof Error ? error.message : error);
      return;
    }
    try {
      await client.delete(`drafts.${id}`);
    } catch {
      // no draft
    }
    console.log(`✓ deleted ${id}`);
  } else {
    console.log(`[dry-run] would delete ${id}`);
  }
}

async function purgeType(type: (typeof PURGE_TYPES)[number]) {
  const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
  console.log(`\n${type}: ${ids.length} document(s)`);
  for (const id of ids) {
    await deleteDoc(id);
  }
}

async function main() {
  const seoId = await ensureSeoService();

  console.log(`\nRepoint platform-migrations → ${SEO_SLUG}`);
  await repointAll(PLATFORM_DOC_ID, seoId);
  await repointAll(`service-${PLATFORM_SLUG}`, seoId);

  console.log("\nRemove parentService mega-menu refs from services");
  const serviceDocs = await client.fetch<{ _id: string }[]>(`*[_type == "service"]{ _id }`);
  for (const { _id } of serviceDocs) {
    if (APPLY) {
      await client.patch(_id).unset(["parentService"]).commit();
    }
  }
  if (APPLY) console.log(`✓ unset parentService on ${serviceDocs.length} service(s)`);

  console.log("\nDelete platform-migrations service");
  await deleteDoc(PLATFORM_DOC_ID);

  for (const type of PURGE_TYPES) {
    await purgeType(type);
  }

  const remaining = await client.fetch<{ slug: string }[]>(
    `*[_type == "service"]{ "slug": slug.current } | order(slug asc)`,
  );
  console.log(`\nRemaining services (${remaining.length}): ${remaining.map((d) => d.slug).join(", ")}`);
  if (!APPLY) console.log("\nRun with --apply to execute.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
