/**
 * Ensure brand name is singular everywhere in Sanity CMS.
 * Replaces legacy "ZedNova Studios" copy with "ZedNova Studio".
 *
 * Usage: npm run patch:brand-name
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { siteSettings } from "../src/lib/content/site";

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

const LEGACY_BRAND = "ZedNova Studios";
const BRAND = "ZedNova Studio";
const LEGACY_LEGAL = "ZedNova Studios LLC";
const LEGAL = "ZedNova Studio LLC";

const SKIP_STRING_PATTERNS = [
  /^https:\/\/www\.goodfirms\.co\/company\/zednova-studios/i,
  /architecture studios/i,
  /architecture-studios/i,
  /martial arts studios/i,
  /med spas/i,
  /pilates studios/i,
  /yoga studios/i,
  /design studios/i,
];

function shouldSkipString(value: string): boolean {
  return SKIP_STRING_PATTERNS.some((pattern) => pattern.test(value));
}

function patchString(value: string): string {
  if (shouldSkipString(value)) return value;
  return value
    .replaceAll(LEGACY_LEGAL, LEGAL)
    .replaceAll(LEGACY_BRAND, BRAND)
    .replaceAll("Zednova Studios", BRAND)
    .replaceAll("zednova studios", BRAND);
}

function deepPatch(value: unknown): { next: unknown; changed: boolean } {
  if (typeof value === "string") {
    const next = patchString(value);
    return { next, changed: next !== value };
  }

  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const result = deepPatch(item);
      if (result.changed) changed = true;
      return result.next;
    });
    return { next, changed };
  }

  if (value && typeof value === "object") {
    let changed = false;
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (key.startsWith("_") && key !== "_type") {
        next[key] = child;
        continue;
      }
      const result = deepPatch(child);
      next[key] = result.next;
      if (result.changed) changed = true;
    }
    return { next, changed };
  }

  return { next: value, changed: false };
}

type SanityDoc = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

async function main() {
  const docs = await client.fetch<SanityDoc[]>(
    `*[!(_id in path("drafts.**")) && !(_type match "sanity.*")]{
      _id,
      _type,
      ...
    }`,
  );

  let patched = 0;
  let legacyHits = 0;

  for (const doc of docs) {
    const { _id, _type, ...fields } = doc;
    const serialized = JSON.stringify(fields);
    if (!serialized.includes(LEGACY_BRAND) && !serialized.includes(LEGACY_LEGAL)) {
      continue;
    }

    legacyHits += 1;
    const { next, changed } = deepPatch(fields);
    if (!changed) {
      console.log(`– ${_type} ${_id} (legacy match skipped)`);
      continue;
    }

    await client.patch(_id).set(next as Record<string, unknown>).commit();
    patched += 1;
    console.log(`✓ ${_type} ${_id}`);
  }

  const settingsDoc = docs.find((doc) => doc._type === "siteSettings");
  if (settingsDoc) {
    const { _id, _type, ...fields } = settingsDoc;
    await client
      .patch(_id)
      .set({
        ...fields,
        siteTitle: siteSettings.siteTitle,
        seo: {
          ...(typeof fields.seo === "object" && fields.seo ? fields.seo : {}),
          _type: "seoFields",
          seoTitle: siteSettings.siteTitle,
        },
      })
      .commit();
    console.log(`✓ ${_type} ${_id} (siteTitle forced to "${siteSettings.siteTitle}")`);
  }

  console.log(`\nScanned ${docs.length} documents.`);
  console.log(`Legacy brand hits: ${legacyHits}. Patched: ${patched}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
