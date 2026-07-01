/**
 * Upload process-step SVG icons + steps into Sanity service documents.
 * Usage: npm run seed:service-process-steps
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import {
  SERVICE_PROCESS_ICONS,
  type ServiceProcessIconKey,
} from "../src/lib/content/service-process-icons";
import { services } from "../src/lib/content/services";
import type { ProcessStep } from "../src/lib/types";

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

const iconAssetCache = new Map<string, string>();

async function uploadSvgIcon(key: ServiceProcessIconKey) {
  const cached = iconAssetCache.get(key);
  if (cached) return cached;

  const icon = SERVICE_PROCESS_ICONS[key];
  const buffer = Buffer.from(icon.svg, "utf8");
  const asset = await client.assets.upload("image", buffer, {
    filename: `process-${key}.svg`,
    contentType: "image/svg+xml",
  });

  iconAssetCache.set(key, asset._id);
  return asset._id;
}

async function mapProcessStepsForSanity(steps: ProcessStep[]) {
  return Promise.all(
    steps.map(async (step, index) => {
      const iconKey = step.icon as ServiceProcessIconKey | undefined;
      if (!iconKey || !SERVICE_PROCESS_ICONS[iconKey]) {
        throw new Error(
          `Step "${step.title}" is missing a valid icon key (got "${step.icon ?? ""}")`,
        );
      }

      const assetId = await uploadSvgIcon(iconKey);

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

function stepsForSlug(slug: string): ProcessStep[] {
  const service = services.find((entry) => entry.slug === slug);
  return service?.processSteps ?? [];
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

async function main() {
  let patched = 0;

  for (const slug of PARENT_SLUGS) {
    const docId = await ensureServiceDocumentId(slug);
    if (!docId) {
      console.log(`– ${slug} skipped (no Sanity document)`);
      continue;
    }

    const steps = stepsForSlug(slug);
    if (steps.length === 0) {
      console.log(`– ${slug} skipped (no static steps)`);
      continue;
    }

    const processSteps = await mapProcessStepsForSanity(steps);
    await client.patch(docId).set({ processSteps }).commit();
    patched += 1;
    console.log(`✓ ${slug} → ${processSteps.length} process step(s) with icons`);
  }

  console.log(`\nPatched ${patched} service document(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
