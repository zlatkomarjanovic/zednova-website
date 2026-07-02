/**
 * Fix Sanity validation: processSteps[].icon must be image objects, not strings.
 * Patches processSteps only — does not touch coverImage or any other fields.
 *
 * Usage: npm run fix:service-process-icons
 *        npm run fix:service-process-icons -- --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

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

const DRY_RUN = process.argv.includes("--dry-run");
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

type ProcessStepDoc = {
  _key?: string;
  _type?: string;
  step: number;
  title: string;
  description?: string;
  deliverables?: string[];
  icon?: unknown;
};

type ServiceDoc = {
  _id: string;
  slug?: { current?: string };
  processSteps?: ProcessStepDoc[];
};

const iconAssetCache = new Map<string, string>();

function isImageObject(icon: unknown): icon is { _type: "image"; asset: { _ref: string } } {
  return (
    typeof icon === "object" &&
    icon !== null &&
    "_type" in icon &&
    (icon as { _type?: string })._type === "image" &&
    "asset" in icon
  );
}

async function findExistingAssetId(filename: string): Promise<string | null> {
  return client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
}

async function uploadSvgIcon(key: ServiceProcessIconKey): Promise<string> {
  const cached = iconAssetCache.get(key);
  if (cached) return cached;

  const existing = await findExistingAssetId(`process-${key}.svg`);
  if (existing) {
    iconAssetCache.set(key, existing);
    return existing;
  }

  const icon = SERVICE_PROCESS_ICONS[key];
  const buffer = Buffer.from(icon.svg, "utf8");
  const asset = await client.assets.upload("image", buffer, {
    filename: `process-${key}.svg`,
    contentType: "image/svg+xml",
  });

  iconAssetCache.set(key, asset._id);
  return asset._id;
}

async function iconKeyToImage(key: string): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | null> {
  const normalized = key.trim();
  if (!normalized) return null;

  if (normalized in SERVICE_PROCESS_ICONS) {
    const assetId = await uploadSvgIcon(normalized as ServiceProcessIconKey);
    return {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    };
  }

  const existing = await findExistingAssetId(`process-${normalized}.svg`);
  if (existing) {
    return {
      _type: "image",
      asset: { _type: "reference", _ref: existing },
    };
  }

  return null;
}

async function fixProcessSteps(steps: ProcessStepDoc[] | undefined) {
  if (!steps?.length) return { steps, changed: 0 };

  let changed = 0;
  const next: ProcessStepDoc[] = [];

  for (const step of steps) {
    const icon = step.icon;

    if (isImageObject(icon)) {
      next.push(step);
      continue;
    }

    if (typeof icon !== "string") {
      next.push(step);
      continue;
    }

    const image = await iconKeyToImage(icon);
    if (!image) {
      console.warn(`  ! Step ${step.step} "${step.title}": unknown icon key "${icon}" — left unchanged`);
      next.push(step);
      continue;
    }

    changed += 1;
    next.push({
      ...step,
      _type: step._type ?? "processStep",
      icon: image,
    });
  }

  return { steps: next, changed };
}

async function main() {
  const docs = await client.fetch<ServiceDoc[]>(
    `*[_type == "service" && defined(slug.current)]{
      _id,
      slug,
      processSteps
    }`,
  );

  let patchedDocs = 0;
  let fixedIcons = 0;

  for (const doc of docs) {
    const slug = doc.slug?.current ?? doc._id;
    const { steps, changed } = await fixProcessSteps(doc.processSteps);

    if (changed === 0) continue;

    fixedIcons += changed;
    patchedDocs += 1;

    console.log(`✓ ${slug} → fixed ${changed} process step icon(s)`);

    if (DRY_RUN) continue;

    await client.patch(doc._id).set({ processSteps: steps }).commit();
  }

  console.log(
    `\n${DRY_RUN ? "[dry-run] Would patch" : "Patched"} ${patchedDocs} service document(s), ${fixedIcons} icon(s) total.`,
  );
  console.log("Cover images and all other fields were left unchanged.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
