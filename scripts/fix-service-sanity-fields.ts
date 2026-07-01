/**
 * Patch service documents in Sanity: group, parentService reference, SEO description.
 * Usage: npm run fix:sanity-services
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { services } from "../src/lib/content/services";

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

const PARENT_SERVICE_REF_BY_GROUP: Record<string, string> = {
  "Lead-Gen Websites & AI Search": "serviceMegaMenuCard-1",
  "CRM & Follow-Up Automation": "serviceMegaMenuCard-2",
  "AI Receptionist & Booking Automation": "serviceMegaMenuCard-3",
  "Custom In-House Software for SMBs": "serviceMegaMenuCard-4",
  "Platform Migrations": "serviceMegaMenuCard-5",
  "Monthly Support & Improvements": "serviceMegaMenuCard-6",
};

const LEGACY_GROUPS = new Set(["Websites", "Automation", "AI Tools", "Ecommerce"]);

function metaDescription(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= 155) return normalized;
  const trimmed = normalized.slice(0, 152).trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  const cut = lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${cut}…`;
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

const servicesBySlug = new Map(services.map((service) => [service.slug, service]));

type SanityService = {
  _id: string;
  slug?: { current?: string };
  group?: string;
  parentService?: unknown;
  seo?: { seoDescription?: string };
};

async function main() {
  const docs = await client.fetch<SanityService[]>(
    `*[_type == "service" && defined(slug.current)]{
      _id,
      slug,
      group,
      parentService,
      seo
    }`,
  );

  let patched = 0;

  for (const doc of docs) {
    const slug = doc.slug?.current;
    if (!slug) continue;

    const source = servicesBySlug.get(slug);
    const group = source?.group ?? doc.group;
    if (!group) continue;

    const set: Record<string, unknown> = { group };
    const unset: string[] = [];

    const parentRef = PARENT_SERVICE_REF_BY_GROUP[group];
    if (parentRef && !LEGACY_GROUPS.has(group)) {
      set.parentService = { _type: "reference", _ref: parentRef };
    } else {
      unset.push("parentService");
    }

    const description = metaDescription(source?.shortDescription ?? "");
    if (description) {
      set.seo = {
        _type: "seoFields",
        ...(doc.seo ?? {}),
        seoDescription: description,
      };
    }

    const patch = client.patch(doc._id).set(set);
    if (unset.length > 0) patch.unset(unset);

    await patch.commit();
    patched += 1;
    console.log(`✓ ${slug} → group "${group}"${parentRef ? `, parent ${parentRef}` : ""}`);
  }

  console.log(`\nPatched ${patched} service document(s).`);
  console.log("Redeploy Sanity Studio so schema changes apply: cd studio-zednova-studio && npm run deploy");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
