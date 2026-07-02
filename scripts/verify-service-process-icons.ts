/**
 * Verify service process step icons and cover images in Sanity.
 * Usage: npx tsx scripts/verify-service-process-icons.ts
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

const token = process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN");
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
  const docs = await client.fetch<
    {
      slug?: { current?: string };
      coverImage?: unknown;
      processSteps?: { step: number; title: string; icon?: unknown }[];
    }[]
  >(
    `*[_type == "service" && defined(slug.current)] | order(slug.current asc) {
      slug,
      coverImage,
      processSteps[]{ step, title, icon }
    }`,
  );

  let stringIcons = 0;
  let missingCover = 0;

  for (const doc of docs) {
    const slug = doc.slug?.current ?? "?";
    if (!doc.coverImage) {
      missingCover += 1;
      console.log(`✗ ${slug}: missing coverImage`);
    }
    for (const step of doc.processSteps ?? []) {
      if (typeof step.icon === "string") {
        stringIcons += 1;
        console.log(`✗ ${slug} step ${step.step}: icon is still string "${step.icon}"`);
      }
    }
  }

  if (stringIcons === 0 && missingCover === 0) {
    console.log(`OK — ${docs.length} services, all process icons are image objects, all covers present.`);
  } else {
    console.log(`\n${stringIcons} string icon(s), ${missingCover} missing cover(s).`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
