/**
 * Sync serviceMegaMenuCard documents in Sanity from static nav-menu.ts.
 * Usage: npm run sync:mega-menu-cards
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { serviceMegaMenuCards } from "../src/lib/content/nav-menu";

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

const LEGACY_HREFS = new Set([
  "/services/portals-and-dashboards",
  "/services/reporting-dashboards",
  "/services/platform-migrations",
  "/services/custom-software",
  "/services/crm-automation",
  "/services/ai-receptionist",
]);

async function main() {
  const docs = await client.fetch<
    { _id: string; href?: string; title?: string; order?: number }[]
  >(
    `*[_type == "serviceMegaMenuCard"] | order(order asc) {
      _id, href, title, order
    }`,
  );

  let patched = 0;

  for (let index = 0; index < serviceMegaMenuCards.length; index++) {
    const card = serviceMegaMenuCards[index];
    const doc = docs[index] ?? docs.find((entry) => entry.title === card.title);

    const payload = {
      title: card.title,
      shortDescription: card.shortDescription,
      includes: card.includes,
      href: card.href,
      startingPrice: card.startingPrice,
      isFeatured: card.isFeatured ?? true,
      isLegacy: card.isLegacy ?? false,
      order: index + 1,
    };

    if (doc) {
      const hrefStale = !doc.href || LEGACY_HREFS.has(doc.href);
      if (
        doc.href === card.href &&
        doc.title === card.title &&
        !hrefStale
      ) {
        console.log(`– ${card.title} already correct (${card.href})`);
        continue;
      }

      await client.patch(doc._id).set(payload).commit();
      patched += 1;
      console.log(`✓ ${doc.title ?? doc._id} → ${card.title} @ ${card.href}`);
      continue;
    }

    await client.createOrReplace({
      _id: `serviceMegaMenuCard-${index + 1}`,
      _type: "serviceMegaMenuCard",
      ...payload,
    });
    patched += 1;
    console.log(`+ Created serviceMegaMenuCard-${index + 1} → ${card.title} @ ${card.href}`);
  }

  // Mark any extra legacy cards (card 7+) as legacy/hidden if they exist
  for (const doc of docs.slice(serviceMegaMenuCards.length)) {
    if (doc.href && LEGACY_HREFS.has(doc.href)) {
      await client.patch(doc._id).set({ isLegacy: true, isFeatured: false }).commit();
      console.log(`✓ Marked legacy card ${doc.title ?? doc._id} as isLegacy`);
      patched += 1;
    }
  }

  console.log(`\nSynced ${patched} mega menu card(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
