/**
 * One-off: remove em dashes from all string/text fields in published Sanity
 * documents. Recursively walks every document and patches only those that
 * contain an em dash.
 *
 * Usage: npx tsx scripts/remove-em-dashes-sanity.ts [--apply]
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

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

function cleanString(value: string): string {
  return value.replace(/\s*\u2014\s*/g, ", ").replace(/\u2014/g, "-");
}

function cleanValue(value: unknown): { value: unknown; changed: boolean } {
  if (typeof value === "string") {
    if (!value.includes("\u2014")) return { value, changed: false };
    return { value: cleanString(value), changed: true };
  }
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const result = cleanValue(item);
      if (result.changed) changed = true;
      return result.value;
    });
    return { value: changed ? next : value, changed };
  }
  if (value && typeof value === "object") {
    let changed = false;
    const next: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      const result = cleanValue(val);
      if (result.changed) changed = true;
      next[key] = result.value;
    }
    return { value: changed ? next : value, changed };
  }
  return { value, changed: false };
}

async function main() {
  const docs = await client.fetch<Record<string, unknown>[]>(
    `*[!(_id in path("drafts.**")) && !(_id match "_.**")]`,
  );
  console.log(`Scanning ${docs.length} published documents...`);

  let patched = 0;
  for (const doc of docs) {
    // Skip Sanity-internal documents (schema registry, system docs).
    const rawId = String(doc._id ?? "");
    const rawType = String(doc._type ?? "");
    if (rawId.startsWith("_.") || rawType.startsWith("system.") || rawType.startsWith("sanity.")) {
      continue;
    }
    const { _id, _type, _rev, _createdAt, _updatedAt, ...fields } = doc as {
      _id: string;
      _type: string;
      _rev?: string;
      _createdAt?: string;
      _updatedAt?: string;
      [key: string]: unknown;
    };
    const { value, changed } = cleanValue(fields);
    if (!changed) continue;

    patched += 1;
    console.log(`${_type} ${_id}`);
    if (apply) {
      await client
        .patch(_id)
        .set(value as Record<string, unknown>)
        .commit();
    }
  }

  console.log(
    apply
      ? `Patched ${patched} documents.`
      : `${patched} documents contain em dashes. Re-run with --apply to fix.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
