/**
 * Migrate serviceNavItem documents to subService type in Sanity.
 * Usage: npm run migrate:sub-services
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

type LegacyDoc = {
  _id: string;
  title: string;
  href: string;
  shortDescription: string;
  navGroup: string;
  order: number;
  image?: unknown;
};

async function main() {
  const legacy = await client.fetch<LegacyDoc[]>(
    `*[_type == "serviceNavItem"]{
      _id,
      title,
      href,
      shortDescription,
      navGroup,
      order,
      image
    }`,
  );

  if (legacy.length === 0) {
    console.log("No serviceNavItem documents to migrate.");
    return;
  }

  for (const doc of legacy) {
    const nextId = doc._id.replace(/^serviceNavItem-/, "subService-");

    await client.createOrReplace({
      _id: nextId,
      _type: "subService",
      title: doc.title,
      href: doc.href,
      shortDescription: doc.shortDescription,
      navGroup: doc.navGroup,
      order: doc.order,
      ...(doc.image ? { image: doc.image } : {}),
    });

    if (doc._id !== nextId) {
      await client.delete(doc._id);
    }

    console.log(`✓ ${doc.title} → ${nextId}`);
  }

  console.log(`\nMigrated ${legacy.length} document(s) to subService.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
