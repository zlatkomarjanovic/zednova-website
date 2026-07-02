/**
 * Remove legacy/duplicate service documents from Sanity.
 * Keeps only the 6 parent CMS slugs from SERVICE_SLUG_BY_PARENT.
 *
 * Usage: npx tsx scripts/cleanup-legacy-services.ts
 *        npx tsx scripts/cleanup-legacy-services.ts --apply
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { SERVICE_SLUG_BY_PARENT } from "../src/lib/content/service-routes";

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

const APPLY = process.argv.includes("--apply");

/** Legacy service slug → canonical parent CMS slug to repoint references. */
const LEGACY_SERVICE_MAP: Record<string, string> = {
  "custom-ai-agents": "ai-receptionist",
  "custom-in-house-software-for-smbs-usa": "custom-in-house-software-for-smbs",
  "ops-automation": "crm-pipeline-automation",
  "outbound-lead-gen": "crm-pipeline-automation",
  "review-reputation": "ai-lead-site",
  "seo-aeo-content": "ai-lead-site",
};

const KEEP_SLUGS = new Set(Object.values(SERVICE_SLUG_BY_PARENT));

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

type ServiceDoc = {
  _id: string;
  slug?: { current?: string };
  title?: string;
  group?: string;
  coverImage?: unknown;
  processSteps?: unknown[];
  problems?: unknown[];
  subServices?: unknown[];
  faqs?: unknown[];
};

function scoreDoc(doc: ServiceDoc): number {
  let score = 0;
  if (doc.coverImage) score += 10;
  score += (doc.processSteps?.length ?? 0) * 2;
  score += (doc.problems?.length ?? 0) * 2;
  score += (doc.subServices?.length ?? 0) * 2;
  score += (doc.faqs?.length ?? 0);
  if (doc.group) score += 1;
  return score;
}

function replaceRefs(value: unknown, fromId: string, toId: string): { value: unknown; changed: boolean } {
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const result = replaceRefs(item, fromId, toId);
      changed ||= result.changed;
      return result.value;
    });
    return { value: next, changed };
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj._type === "reference" && obj._ref === fromId) {
      return { value: { _type: "reference", _ref: toId }, changed: true };
    }
    let changed = false;
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(obj)) {
      const result = replaceRefs(child, fromId, toId);
      changed ||= result.changed;
      next[key] = result.value;
    }
    return { value: next, changed };
  }

  return { value, changed: false };
}

async function countReferences(docId: string): Promise<number> {
  return client.fetch<number>(`count(*[references("${docId}")])`);
}

async function repointReferences(fromId: string, toId: string) {
  const referrers = await client.fetch<{ _id: string; _type: string }[]>(
    `*[(references($id) || (_id match "drafts.**" && references($id)))]{ _id, _type }`,
    { id: fromId },
  );

  const seen = new Set<string>();

  for (const referrer of referrers) {
    if (seen.has(referrer._id)) continue;
    seen.add(referrer._id);

    const doc = await client.getDocument(referrer._id);
    if (!doc) continue;
    const { value, changed } = replaceRefs(doc, fromId, toId);
    if (!changed) continue;
    if (APPLY) {
      await client.createOrReplace(value as typeof doc);
      console.log(`  ↪ repointed ${referrer._type} ${referrer._id}`);
    } else {
      console.log(`  [dry-run] would repoint ${referrer._type} ${referrer._id}`);
    }
  }
}

async function deleteDoc(docId: string) {
  let refs = await countReferences(docId);
  if (refs > 0) {
    const draftRefs = await client.fetch<number>(
      `count(*[_id in path("drafts.**") && references("${docId}")])`,
    );
    if (draftRefs > 0) {
      console.warn(`  skip delete ${docId}: still ${refs} published + ${draftRefs} draft reference(s)`);
      return false;
    }
    console.warn(`  skip delete ${docId}: still ${refs} reference(s)`);
    return false;
  }

  if (APPLY) {
    try {
      await client.delete(docId);
    } catch (error) {
      console.warn(`  skip delete ${docId}:`, error instanceof Error ? error.message : error);
      return false;
    }
    const draftId = docId.startsWith("drafts.") ? docId : `drafts.${docId}`;
    try {
      await client.delete(draftId);
    } catch {
      // no draft
    }
    console.log(`✓ deleted ${docId}`);
  } else {
    console.log(`  [dry-run] would delete ${docId}`);
  }
  return true;
}

async function main() {
  const docs = await client.fetch<ServiceDoc[]>(
    `*[_type == "service" && defined(slug.current)]{
      _id,
      slug,
      title,
      group,
      coverImage,
      processSteps,
      problems,
      subServices,
      faqs
    }`,
  );

  const bySlug = new Map<string, ServiceDoc[]>();
  for (const doc of docs) {
    const slug = doc.slug?.current;
    if (!slug) continue;
    const list = bySlug.get(slug) ?? [];
    list.push(doc);
    bySlug.set(slug, list);
  }

  const toDelete: ServiceDoc[] = [];
  const kept: ServiceDoc[] = [];

  for (const [slug, group] of bySlug.entries()) {
    if (!KEEP_SLUGS.has(slug)) {
      for (const doc of group) toDelete.push(doc);
      continue;
    }

    if (group.length === 1) {
      kept.push(group[0]!);
      continue;
    }

    const sorted = [...group].sort((a, b) => scoreDoc(b) - scoreDoc(a));
    kept.push(sorted[0]!);
    for (const doc of sorted.slice(1)) toDelete.push(doc);
    console.log(
      `Duplicate "${slug}": keeping ${sorted[0]!._id} (score ${scoreDoc(sorted[0]!)})`,
    );
  }

  console.log(`\nKeeping ${kept.length} parent service(s):`);
  for (const doc of kept) {
    console.log(`  ✓ ${doc.slug?.current} (${doc._id})`);
  }

  console.log(`\nDeleting ${toDelete.length} legacy/duplicate service(s):`);
  for (const doc of toDelete) {
    const slug = doc.slug?.current ?? "?";
    const targetSlug = LEGACY_SERVICE_MAP[slug];
    const targetDoc = targetSlug
      ? kept.find((entry) => entry.slug?.current === targetSlug)
      : undefined;

    console.log(`\n– ${slug} (${doc._id}) title="${doc.title ?? ""}"`);

    if (targetDoc) {
      await repointReferences(doc._id, targetDoc._id);
    } else if (slug in LEGACY_SERVICE_MAP) {
      console.warn(`  ! no target doc for legacy map ${slug} → ${targetSlug}`);
    }

    await deleteDoc(doc._id);
  }

  const remaining = await client.fetch<number>('count(*[_type == "service"])');
  console.log(`\n${APPLY ? "Done" : "[dry-run] Done"}. Remaining service docs: ${remaining}`);
  if (!APPLY) console.log("Run with --apply to execute deletes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
