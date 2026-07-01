/**
 * Verify all 6 parent service documents have CMS sections populated.
 * Usage: npx tsx scripts/verify-parent-services.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { SERVICE_SLUG_BY_PARENT } from "../src/lib/content/service-routes";
import { getServiceBySlug } from "../src/lib/queries";
import { SERVICE_PORTFOLIO_HIGHLIGHTS } from "../src/lib/content/service-portfolio-highlights";

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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("=== Sanity document counts ===\n");
  for (const [parentSlug, serviceSlug] of Object.entries(SERVICE_SLUG_BY_PARENT)) {
    const doc = await client.fetch<{
      title?: string;
      group?: string;
      problems?: unknown[];
      subServices?: unknown[];
      processSteps?: unknown[];
      faqs?: unknown[];
    } | null>(
      `*[_type == "service" && slug.current == $slug][0]{
        title, group,
        problems, subServices, processSteps, faqs
      }`,
      { slug: serviceSlug },
    );

    if (!doc) {
      console.log(`${parentSlug} (${serviceSlug}): MISSING DOCUMENT`);
      continue;
    }

    console.log(
      `${parentSlug} (${serviceSlug}): group="${doc.group ?? ""}" title="${doc.title ?? ""}"`,
    );
    console.log(
      `  problems=${doc.problems?.length ?? 0} subServices=${doc.subServices?.length ?? 0} processSteps=${doc.processSteps?.length ?? 0} faqs=${doc.faqs?.length ?? 0}`,
    );
    console.log(`  portfolio highlights=${SERVICE_PORTFOLIO_HIGHLIGHTS[serviceSlug]?.length ?? 0}`);
  }

  console.log("\n=== Merged service (what the page renders) ===\n");
  for (const [parentSlug, serviceSlug] of Object.entries(SERVICE_SLUG_BY_PARENT)) {
    const service = await getServiceBySlug(serviceSlug);
    if (!service) {
      console.log(`${parentSlug}: getServiceBySlug returned null`);
      continue;
    }
    const emDash =
      JSON.stringify({
        title: service.title,
        problems: service.problems?.map((p) => p.description),
        subServices: service.subServices?.map((s) => s.description),
        process: service.processSteps?.map((s) => s.description),
      }).includes("—") ||
      JSON.stringify({
        title: service.title,
        problems: service.problems?.map((p) => p.description),
        subServices: service.subServices?.map((s) => s.description),
        process: service.processSteps?.map((s) => s.description),
      }).includes("–");

    console.log(
      `${parentSlug}: problems=${service.problems?.length ?? 0} subServices=${service.subServices?.length ?? 0} process=${service.processSteps?.length ?? 0} faqs=${service.faqs?.length ?? 0} emDash=${emDash}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
