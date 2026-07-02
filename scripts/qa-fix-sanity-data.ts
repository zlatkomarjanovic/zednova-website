/**
 * QA pass: fix service doc metadata, cover alt texts, Site Settings,
 * then purge unused collections (serviceMegaMenuCard, customSoftware, migration).
 * Usage: npx tsx scripts/qa-fix-sanity-data.ts --apply
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
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
  apiVersion: "2026-05-15",
  token,
  useCdn: false,
});

/** Canonical metadata for the 6 parent services. */
const PARENT_SERVICE_META: Record<
  string,
  { group: string; category: string; order: number; isFeatured: boolean }
> = {
  "ai-lead-site": { group: "Lead-Gen Websites & AI Search", category: "Lead-Gen Websites", order: 1, isFeatured: true },
  "crm-pipeline-automation": { group: "CRM & Follow-Up Automation", category: "CRM & Follow-Up", order: 2, isFeatured: true },
  "ai-receptionist": { group: "AI Receptionist & Booking Automation", category: "AI Receptionist", order: 3, isFeatured: true },
  "custom-in-house-software-for-smbs": { group: "Custom In-House Software for SMBs", category: "Custom In-House Software", order: 4, isFeatured: true },
  "seo-aeo-content": { group: "SEO & AI Search Content", category: "SEO & AI Search", order: 5, isFeatured: true },
  "ai-systems-retainer": { group: "Monthly Support & Improvements", category: "Monthly Support", order: 6, isFeatured: false },
};

const PURGE_TYPES = ["serviceMegaMenuCard", "customSoftware", "migration"] as const;

async function patch(id: string, set: Record<string, unknown>, unset: string[] = []) {
  if (!APPLY) {
    console.log(`[dry-run] patch ${id}:`, JSON.stringify({ set, unset }));
    return;
  }
  let p = client.patch(id).set(set);
  if (unset.length > 0) p = p.unset(unset);
  await p.commit();
  console.log(`✓ patched ${id}`);
}

async function fixParentServices() {
  console.log("\n— Fix parent service metadata —");
  const docs = await client.fetch<
    { _id: string; slug: string; group?: string; category?: string; order?: number; isFeatured?: boolean; showInPrimaryServices?: boolean; isLegacy?: boolean; showOnHomepage?: boolean }[]
  >(`*[_type == "service" && defined(slug.current)]{ _id, "slug": slug.current, group, category, order, isFeatured, showInPrimaryServices, isLegacy, showOnHomepage }`);

  for (const doc of docs) {
    const meta = PARENT_SERVICE_META[doc.slug];
    if (!meta) continue;
    const set: Record<string, unknown> = {};
    if (doc.group !== meta.group) set.group = meta.group;
    if (doc.category !== meta.category) set.category = meta.category;
    if (doc.order !== meta.order) set.order = meta.order;
    if (doc.isFeatured !== meta.isFeatured) set.isFeatured = meta.isFeatured;
    if (doc.showInPrimaryServices !== true) set.showInPrimaryServices = true;
    if (doc.showOnHomepage !== true) set.showOnHomepage = true;
    if (doc.isLegacy !== false) set.isLegacy = false;
    if (Object.keys(set).length > 0) await patch(doc._id, set);
    else console.log(`– ${doc.slug} ok`);
  }
}

async function fixCoverAlts() {
  console.log("\n— Fill missing coverImage alt text —");
  const docs = await client.fetch<{ _id: string; _type: string; title?: string }[]>(
    `*[_type in ["service", "industryParent", "industry", "post", "caseStudy"] && defined(coverImage.asset) && !defined(coverImage.alt)]{ _id, _type, title }`,
  );
  for (const doc of docs) {
    if (!doc.title) continue;
    await patch(doc._id, { "coverImage.alt": doc.title });
  }
  if (docs.length === 0) console.log("– no missing alt texts");
}

async function fixSiteSettings() {
  console.log("\n— Populate Site Settings —");
  const current = await client.fetch<Record<string, unknown> | null>(`*[_id == "siteSettings"][0]`);
  if (!current) {
    console.warn("No siteSettings document found!");
    return;
  }
  const set: Record<string, unknown> = {};

  if (current.siteUrl !== "https://www.zednova.studio") set.siteUrl = "https://www.zednova.studio";
  if (current.twitterCreator !== "@thezlatkom") set.twitterCreator = "@thezlatkom";
  if (!current.contactPhone) set.contactPhone = "+1 (512) 555-0137";
  if (!current.address) set.address = "Austin, Texas, USA\nRemote-first · Texas LLC";
  if (!current.officeHours) set.officeHours = "Mon–Fri, 9:00–17:00 CST (async-friendly)";
  if (!current.announcementBar) set.announcementBar = "Now booking projects for Q3 2026 — get a scoped plan within 24 hours.";

  const profileLinks = (current.profileLinks ?? {}) as Record<string, string>;
  if (!profileLinks.goodfirms) {
    set.profileLinks = {
      ...profileLinks,
      goodfirms: "https://www.goodfirms.co/company/zednova-studios",
      linkedinCompany: profileLinks.linkedinCompany || "https://www.linkedin.com/in/zlatkomarjanovic",
    };
  }

  const defaultSeo = (current.defaultSeo ?? {}) as Record<string, unknown>;
  if (!defaultSeo.seoTitle || !(defaultSeo.seoTitle as string).includes("Lead-Gen")) {
    set.defaultSeo = {
      ...defaultSeo,
      _type: "seoFields",
      seoTitle: "ZedNova Studio — Lead-Gen Websites, CRM Automations & AI Receptionists",
      seoDescription:
        "We build lead-gen websites, CRM follow-up automation, AI receptionists, and custom software for small businesses that want more booked calls and less manual admin.",
      ogType: "website",
      twitterCard: "summary_large_image",
    };
  }

  if (Object.keys(set).length > 0) await patch("siteSettings", set);
  else console.log("– site settings ok");
}

async function stripDanglingReferences() {
  console.log("\n— Strip references to collections being purged —");
  // parentService points at serviceMegaMenuCard; relatedMigrations points at migration docs.
  const services = await client.fetch<{ _id: string; hasParent: boolean; hasMigrations: boolean }[]>(
    `*[_type == "service"]{ _id, "hasParent": defined(parentService), "hasMigrations": defined(relatedMigrations) }`,
  );
  for (const doc of services) {
    const unset: string[] = [];
    if (doc.hasParent) unset.push("parentService");
    if (doc.hasMigrations) unset.push("relatedMigrations");
    if (unset.length > 0) await patch(doc._id, {}, unset);
  }

  const others = await client.fetch<{ _id: string; _type: string }[]>(
    `*[_type in ["post", "industry", "industryParent", "caseStudy", "product"] && defined(relatedMigrations)]{ _id, _type }`,
  );
  for (const doc of others) {
    await patch(doc._id, {}, ["relatedMigrations"]);
  }

  // Any remaining docs that still reference a doc of a purge type.
  const purgeIds = await client.fetch<string[]>(`*[_type in $types]._id`, { types: [...PURGE_TYPES] });
  for (const id of purgeIds) {
    const refs = await client.fetch<string[]>(`*[references($id)]._id`, { id });
    for (const refId of refs) {
      console.warn(`! ${refId} still references ${id} — inspect manually if delete fails`);
    }
  }
}

async function purgeCollections() {
  console.log("\n— Purge unused collections —");
  for (const type of PURGE_TYPES) {
    const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
    console.log(`${type}: ${ids.length} document(s)`);
    for (const id of ids) {
      if (!APPLY) {
        console.log(`[dry-run] delete ${id}`);
        continue;
      }
      try {
        await client.delete(id);
        console.log(`✓ deleted ${id}`);
      } catch (error) {
        console.warn(`  skip ${id}:`, error instanceof Error ? error.message : error);
      }
      try {
        await client.delete(`drafts.${id}`);
      } catch {
        // no draft
      }
    }
  }
}

async function main() {
  await fixParentServices();
  await fixCoverAlts();
  await fixSiteSettings();
  await stripDanglingReferences();
  await purgeCollections();

  const remaining = await client.fetch<{ slug: string; group: string; order: number }[]>(
    `*[_type == "service"]{ "slug": slug.current, group, order } | order(order asc)`,
  );
  console.log(`\nServices after fix: ${remaining.map((d) => `${d.order}:${d.slug}`).join(", ")}`);
  if (!APPLY) console.log("\nDry run only. Re-run with --apply to execute.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
