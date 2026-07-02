/**
 * Keep only real portfolio projects in Sanity (Mavesta, Vault Apps, MAVI, EGC).
 *
 * Usage: npx tsx scripts/purge-demo-portfolio-case-studies.ts [--apply]
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const KEEP_SLUGS = new Set(["mavesta-media", "vault-apps", "mavi-longevity", "egc-nyc"]);

function loadEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
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

const apply = process.argv.includes("--apply");
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

async function main() {
  const docs = await client.fetch<{ _id: string; slug: string }[]>(
    `*[_type == "portfolioCaseStudy" && !(_id in path("drafts.**"))]{ _id, "slug": slug.current }`,
  );

  const toDelete = docs.filter((doc) => !KEEP_SLUGS.has(doc.slug));
  console.log(`Keeping: ${[...KEEP_SLUGS].join(", ")}`);
  console.log(`Removing: ${toDelete.map((d) => d.slug).join(", ") || "(none)"}`);

  if (!apply) {
    console.log("Dry run. Re-run with --apply to delete.");
    return;
  }

  const services = await client.fetch<
    { _id: string; relatedCaseStudies?: { _ref: string }[] }[]
  >(`*[_type == "service"]{ _id, relatedCaseStudies }`);

  for (const service of services) {
    const filtered = (service.relatedCaseStudies ?? []).filter((ref) =>
      KEEP_SLUGS.has(ref._ref.replace("portfolioCaseStudy-", "")),
    );
    if (filtered.length !== (service.relatedCaseStudies ?? []).length) {
      await client.patch(service._id).set({ relatedCaseStudies: filtered }).commit();
      console.log(`  cleaned refs on ${service._id}`);
    }
  }

  for (const doc of toDelete) {
    await client.delete(doc._id);
    console.log(`  deleted ${doc.slug}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
