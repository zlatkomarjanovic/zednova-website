/**
 * Seed the dedicated `subService` collection in Sanity.
 *
 * - Creates one subService document per capability, referencing its parent
 *   service document (deterministic IDs, so re-running is idempotent).
 * - Custom software offerings are seeded as sub-services of
 *   custom-in-house-software-for-smbs (the /custom-software pages were removed).
 * - Unsets the legacy inline `subServices` array on service documents.
 *
 * Usage: npx tsx scripts/seed-sub-service-collection.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { SERVICE_SUB_SERVICES_BY_SLUG } from "../src/lib/content/service-sub-services";
import { slugify } from "../src/lib/utils";

/** Former /custom-software offerings, now sub-services of the custom software parent. */
const CUSTOM_SOFTWARE_SEEDS: { slug: string; title: string; description: string }[] = [
  {
    slug: "custom-web-app-development",
    title: "Custom Web App Development",
    description:
      "Simple web apps on Next.js for workflows, records, and tools your team uses every day.",
  },
  {
    slug: "client-portal-development",
    title: "Client Portal Development",
    description:
      "Login portals where clients check project status, upload files, and get updates without emailing you.",
  },
  {
    slug: "patient-portal-development",
    title: "Patient Portal Development",
    description:
      "Secure portals for patients to book visits, complete intake forms, and view their appointment info.",
  },
  {
    slug: "internal-dashboard-development",
    title: "Internal Dashboard Development",
    description:
      "Staff dashboards that replace spreadsheets and show live business numbers at a glance.",
  },
  {
    slug: "booking-system-development",
    title: "Booking System Development",
    description:
      "Online scheduling with confirmations, reminders, intake forms, and calendar sync built in.",
  },
  {
    slug: "admin-panel-development",
    title: "Admin Panel Development",
    description:
      "Back-office panels to manage users, records, orders, content, and settings.",
  },
  {
    slug: "form-intake-systems",
    title: "Form & Intake Systems",
    description:
      "Custom forms wired to CRM, email, SMS, and follow-up sequences triggered on submission.",
  },
  {
    slug: "crm-lead-tracking-tools",
    title: "CRM & Lead Tracking Tools",
    description:
      "Simple CRM views for leads, deals, tasks, notes, and pipeline status.",
  },
  {
    slug: "document-upload-portals",
    title: "Document Upload Portals",
    description:
      "Secure upload, review, and approval flows for files from clients or staff.",
  },
  {
    slug: "membership-subscription-portals",
    title: "Membership & Subscription Portals",
    description:
      "Member login, billing access, and gated content for paid users and subscribers.",
  },
];

const PARENT_SLUGS = [
  "ai-lead-site",
  "crm-pipeline-automation",
  "ai-receptionist",
  "custom-in-house-software-for-smbs",
  "seo-aeo-content",
  "ai-systems-retainer",
] as const;

const CUSTOM_SOFTWARE_ICONS: Record<string, string> = {
  "custom-web-app-development": "build",
  "client-portal-development": "portal",
  "patient-portal-development": "healthcare",
  "internal-dashboard-development": "dashboards",
  "booking-system-development": "receptionist",
  "admin-panel-development": "ops",
  "form-intake-systems": "crm",
  "crm-lead-tracking-tools": "crm",
  "document-upload-portals": "portal",
  "membership-subscription-portals": "portal",
};

const CUSTOM_SOFTWARE_SPANS: Record<string, string> = {
  "custom-web-app-development": "2x1",
  "document-upload-portals": "2x1",
  "membership-subscription-portals": "2x1",
};

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

type SubServiceSeed = {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  span?: string;
  order: number;
};

function buildSeedsForParent(parentSlug: string): SubServiceSeed[] {
  if (parentSlug === "custom-in-house-software-for-smbs") {
    return CUSTOM_SOFTWARE_SEEDS.map((item, index) => ({
      title: item.title,
      slug: item.slug,
      description: item.description,
      icon: CUSTOM_SOFTWARE_ICONS[item.slug],
      span: CUSTOM_SOFTWARE_SPANS[item.slug] ?? "1x1",
      order: index + 1,
    }));
  }

  const cards = SERVICE_SUB_SERVICES_BY_SLUG[parentSlug] ?? [];
  return cards.map((card, index) => ({
    title: card.title,
    slug: slugify(card.title),
    description: card.description,
    icon: card.icon,
    span: card.span ?? "1x1",
    order: index + 1,
  }));
}

async function main() {
  const serviceIds = await client.fetch<{ slug: string; _id: string }[]>(
    `*[_type == "service" && slug.current in $slugs]{ "slug": slug.current, _id }`,
    { slugs: [...PARENT_SLUGS] },
  );
  const idBySlug = new Map(serviceIds.map((entry) => [entry.slug, entry._id]));

  let created = 0;

  for (const parentSlug of PARENT_SLUGS) {
    const parentId = idBySlug.get(parentSlug);
    if (!parentId) {
      console.error(`! Missing service document for ${parentSlug}, skipped`);
      continue;
    }

    const seeds = buildSeedsForParent(parentSlug);
    const tx = client.transaction();

    for (const seed of seeds) {
      tx.createOrReplace({
        _id: `subService-${parentSlug}-${seed.slug}`,
        _type: "subService",
        title: seed.title,
        slug: { _type: "slug", current: `${parentSlug}-${seed.slug}` },
        parentService: { _type: "reference", _ref: parentId },
        description: seed.description,
        icon: seed.icon,
        span: seed.span,
        order: seed.order,
      });
    }

    await tx.commit();
    created += seeds.length;
    console.log(`+ ${parentSlug}: ${seeds.length} sub-service document(s)`);
  }

  // Remove the legacy inline array now that sub-services are documents.
  const inlineIds = await client.fetch<string[]>(
    `*[_type == "service" && defined(subServices)]._id`,
  );
  for (const id of inlineIds) {
    await client.patch(id).unset(["subServices"]).commit();
    console.log(`- unset inline subServices on ${id}`);
  }

  // Remove orphaned subService docs from earlier runs.
  const validIds = new Set(
    PARENT_SLUGS.flatMap((parentSlug) =>
      buildSeedsForParent(parentSlug).map(
        (seed) => `subService-${parentSlug}-${seed.slug}`,
      ),
    ),
  );
  const existing = await client.fetch<string[]>(`*[_type == "subService"]._id`);
  for (const id of existing) {
    if (!validIds.has(id.replace(/^drafts\./, ""))) {
      await client.delete(id);
      console.log(`- deleted orphan ${id}`);
    }
  }

  console.log(`\nSeeded ${created} subService document(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
