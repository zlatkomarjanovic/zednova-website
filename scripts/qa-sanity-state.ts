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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});

async function main() {
  const services = await client.fetch(
    `*[_type == "service"]{ _id, "slug": slug.current, title, group, order, isFeatured, showInPrimaryServices, isLegacy, "hasCover": defined(coverImage.asset), "hasSeo": defined(seo.seoTitle), "hasFaqs": count(faqs) > 0, "hasProblems": count(problems) > 0, "hasSubServices": count(subServices) > 0 } | order(order asc)`,
  );
  console.log("SERVICES:");
  console.table(services);

  const parents = await client.fetch(
    `*[_type == "industryParent"]{ _id, "slug": slug.current, title, order, "hasCover": defined(coverImage.asset) } | order(order asc)`,
  );
  console.log("INDUSTRY PARENTS:");
  console.table(parents);

  const counts = await client.fetch(
    `{
      "industry": count(*[_type == "industry" && !(_id match "drafts.**")]),
      "post": count(*[_type == "post" && !(_id match "drafts.**")]),
      "serviceMegaMenuCard": count(*[_type == "serviceMegaMenuCard"]),
      "customSoftware": count(*[_type == "customSoftware"]),
      "migration": count(*[_type == "migration"]),
      "siteSettings": count(*[_type == "siteSettings"]),
      "caseStudy": count(*[_type == "caseStudy"]),
      "testimonial": count(*[_type == "testimonial"]),
      "author": count(*[_type == "author"]),
      "drafts": count(*[_id match "drafts.**"])
    }`,
  );
  console.log("COUNTS:", JSON.stringify(counts, null, 2));

  const draftIds = await client.fetch(`*[_id match "drafts.**"]{ _id, _type }`);
  console.log("DRAFTS:", JSON.stringify(draftIds, null, 2));

  const settings = await client.fetch(`*[_type == "siteSettings"][0]`);
  console.log("SITE SETTINGS:", JSON.stringify(settings, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
