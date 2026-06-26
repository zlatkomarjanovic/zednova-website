/**
 * Upload nav icons to Sanity and attach them to custom software documents.
 * Usage: npm run seed:custom-software-icons
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { customSoftwareItems } from "../src/lib/content/custom-software-items";

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

/** Colored Lucide icons via Iconify CDN. */
const ICON_MAP: Record<
  string,
  { icon: string; color: string; alt: string }
> = {
  "custom-web-app-development": {
    icon: "lucide:app-window",
    color: "2563eb",
    alt: "Custom web app",
  },
  "client-portal-development": {
    icon: "lucide:users-round",
    color: "7c3aed",
    alt: "Client portal",
  },
  "patient-portal-development": {
    icon: "lucide:heart-pulse",
    color: "ec4899",
    alt: "Patient portal",
  },
  "internal-dashboard-development": {
    icon: "lucide:layout-dashboard",
    color: "0ea5e9",
    alt: "Internal dashboard",
  },
  "booking-system-development": {
    icon: "lucide:calendar-check",
    color: "f59e0b",
    alt: "Booking system",
  },
  "admin-panel-development": {
    icon: "lucide:shield-check",
    color: "10b981",
    alt: "Admin panel",
  },
  "form-intake-systems": {
    icon: "lucide:clipboard-list",
    color: "6366f1",
    alt: "Form intake",
  },
  "crm-lead-tracking-tools": {
    icon: "lucide:contact",
    color: "0891b2",
    alt: "CRM & lead tracking",
  },
  "document-upload-portals": {
    icon: "lucide:upload-cloud",
    color: "8b5cf6",
    alt: "Document upload portal",
  },
  "membership-subscription-portals": {
    icon: "lucide:badge-check",
    color: "d97706",
    alt: "Membership portal",
  },
};

const assetCache = new Map<string, string>();

async function getOrUploadIconAsset(
  slug: string,
  spec: { icon: string; color: string; alt: string },
): Promise<string> {
  const cached = assetCache.get(slug);
  if (cached) return cached;

  const filename = `custom-software-nav-${slug}-48.svg`;

  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );

  if (existing) {
    assetCache.set(slug, existing);
    return existing;
  }

  const response = await fetch(
    `https://api.iconify.design/${spec.icon}.svg?color=%23${spec.color}&width=48&height=48`,
  );
  if (!response.ok) {
    throw new Error(`Failed to download ${spec.icon}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/svg+xml",
    label: spec.alt,
  });

  assetCache.set(slug, asset._id);
  console.log(`  uploaded ${spec.alt} (#${spec.color}) → ${asset._id}`);
  return asset._id;
}

function navIconField(assetId: string, alt: string) {
  return {
    _type: "migrationPlatformIcon",
    alt,
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    },
  };
}

async function main() {
  console.log(`Seeding custom software nav icons in ${projectId}/${dataset}…`);

  for (const item of customSoftwareItems) {
    const spec = ICON_MAP[item.slug];
    if (!spec) {
      console.warn(`No icon map for custom software: ${item.slug}`);
      continue;
    }

    const assetId = await getOrUploadIconAsset(item.slug, spec);
    const navIcon = navIconField(assetId, spec.alt);

    await client
      .patch(`customSoftware-${item.slug}`)
      .set({ navIcon })
      .commit();

    console.log(`✓ ${item.title}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
