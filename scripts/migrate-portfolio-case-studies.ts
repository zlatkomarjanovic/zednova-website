/**
 * Merge `portfolioProject` + `caseStudy` Sanity collections into `portfolioCaseStudy`.
 * Uploads cover images and logos from static portfolio data when missing in CMS.
 *
 * Usage: npx tsx scripts/migrate-portfolio-case-studies.ts [--apply]
 */
import fs from "node:fs";
import path from "node:path";
import { createClient, type SanityClient } from "@sanity/client";

import { portfolioProjects as staticPortfolioProjects } from "../src/lib/content/portfolio-projects";

type Ref = { _type: "reference"; _ref: string; _key?: string };

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

const uploadCache = new Map<string, string>();

async function uploadPublicAsset(
  client: SanityClient,
  publicPath: string,
  filename: string,
): Promise<string | null> {
  const cacheKey = publicPath;
  if (uploadCache.has(cacheKey)) return uploadCache.get(cacheKey)!;

  const fullPath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!fs.existsSync(fullPath)) {
    console.warn(`  missing local file: ${publicPath}`);
    return null;
  }

  const buffer = fs.readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, { filename });
  uploadCache.set(cacheKey, asset._id);
  console.log(`  uploaded ${publicPath} → ${asset._id}`);
  return asset._id;
}

function ref(id: string): Ref {
  return { _type: "reference", _ref: id };
}

function imageField(assetId: string, alt?: string, caption?: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    ...(alt ? { alt } : {}),
    ...(caption ? { caption } : {}),
  };
}

function mapRefs(
  refs: Ref[] | undefined,
  idMap: Map<string, string>,
): Ref[] | undefined {
  if (!refs?.length) return refs;
  return refs.map((item) => {
    const next = idMap.get(item._ref);
    return next ? { ...item, _ref: next } : item;
  });
}

function stripDoc(doc: Record<string, unknown>) {
  const {
    _id,
    _type,
    _rev,
    _createdAt,
    _updatedAt,
    _originalId,
    ...rest
  } = doc;
  return rest;
}

async function main() {
  const [portfolioDocs, caseStudyDocs] = await Promise.all([
    client.fetch<Record<string, unknown>[]>(
      `*[_type == "portfolioProject" && !(_id in path("drafts.**"))]`,
    ),
    client.fetch<Record<string, unknown>[]>(
      `*[_type == "caseStudy" && !(_id in path("drafts.**"))]`,
    ),
  ]);

  console.log(
    `Found ${portfolioDocs.length} portfolioProject and ${caseStudyDocs.length} caseStudy documents.`,
  );

  const staticBySlug = new Map(staticPortfolioProjects.map((p) => [p.slug, p]));
  const mergedBySlug = new Map<string, Record<string, unknown>>();
  const idMap = new Map<string, string>();

  let caseStudyOrder = 100;

  for (const doc of portfolioDocs) {
    const slug = (doc.slug as { current?: string })?.current;
    if (!slug) continue;
    const newId = `portfolioCaseStudy-${slug}`;
    idMap.set(String(doc._id), newId);
  }

  for (const doc of caseStudyDocs) {
    const slug = (doc.slug as { current?: string })?.current;
    if (!slug) continue;
    const newId = `portfolioCaseStudy-${slug}`;
    idMap.set(String(doc._id), newId);
  }

  for (const doc of portfolioDocs) {
    const slug = (doc.slug as { current?: string })?.current;
    if (!slug) continue;
    const newId = `portfolioCaseStudy-${slug}`;

    mergedBySlug.set(slug, {
      ...stripDoc(doc),
      _id: newId,
      _type: "portfolioCaseStudy",
      slug: doc.slug,
    });
  }

  for (const doc of caseStudyDocs) {
    const slug = (doc.slug as { current?: string })?.current;
    if (!slug) continue;
    const newId = `portfolioCaseStudy-${slug}`;

    const existing = mergedBySlug.get(slug);
    if (existing) {
      mergedBySlug.set(slug, {
        ...existing,
        ...stripDoc(doc),
        _id: newId,
        _type: "portfolioCaseStudy",
        slug: doc.slug,
        summary: existing.summary ?? doc.summary,
        href: existing.href ?? doc.href,
        order: existing.order ?? doc.order,
        category: existing.category ?? doc.category,
        logo: existing.logo ?? doc.logo,
        coverImage: existing.coverImage ?? doc.coverImage,
        imageAlt: existing.imageAlt ?? doc.imageAlt,
        videoUrl: existing.videoUrl ?? doc.videoUrl,
      });
    } else {
      mergedBySlug.set(slug, {
        ...stripDoc(doc),
        _id: newId,
        _type: "portfolioCaseStudy",
        slug: doc.slug,
        order: doc.order ?? caseStudyOrder++,
        summary: doc.summary ?? doc.resultHeadline,
      });
    }
  }

  const existingMerged = await client.fetch<Record<string, unknown>[]>(
    `*[_type == "portfolioCaseStudy" && !(_id in path("drafts.**"))]`,
  );

  for (const doc of existingMerged) {
    const slug = (doc.slug as { current?: string })?.current;
    if (!slug || mergedBySlug.has(slug)) continue;
    mergedBySlug.set(slug, doc);
  }

  console.log(`Prepared ${mergedBySlug.size} portfolioCaseStudy documents.`);

  if (apply) {
    for (const [slug, doc] of mergedBySlug.entries()) {
      const staticFallback = staticBySlug.get(slug);
      const next = { ...doc } as Record<string, unknown>;

      if (staticFallback && apply) {
        if (!next.coverImage?.asset && staticFallback.image.startsWith("/")) {
          const assetId = await uploadPublicAsset(
            client,
            staticFallback.image,
            `${slug}-cover.webp`,
          );
          if (assetId) {
            next.coverImage = imageField(assetId, staticFallback.imageAlt);
            next.imageAlt = staticFallback.imageAlt;
          }
        }

        if (!next.logo?.image?.asset && staticFallback.logo?.src.startsWith("/")) {
          const logoAssetId = await uploadPublicAsset(
            client,
            staticFallback.logo.src,
            `${slug}-logo.svg`,
          );
          if (logoAssetId) {
            next.logo = {
              _type: "portfolioLogo",
              image: imageField(logoAssetId),
              alt: staticFallback.logo.alt,
              lightVariant: staticFallback.logo.lightVariant ?? false,
            };
          }
        }

        if (!next.videoUrl && staticFallback.video) {
          next.videoUrl = staticFallback.video;
        }
        if (!next.href && staticFallback.href) {
          next.href = staticFallback.href;
        }
        if (!next.summary && staticFallback.summary) {
          next.summary = staticFallback.summary;
        }
        if (!next.category && staticFallback.category) {
          next.category = staticFallback.category;
        }
        if (next.order == null && staticFallback.order != null) {
          next.order = staticFallback.order;
        }
      }

      if (next.order == null) {
        next.order = caseStudyOrder++;
      }

      if (Array.isArray(next.relatedCaseStudies)) {
        next.relatedCaseStudies = mapRefs(next.relatedCaseStudies as Ref[], idMap);
      }

      console.log(`→ portfolioCaseStudy/${slug}`);
      await client.createOrReplace(next);
    }

    const referencerTypes = [
      "service",
      "industry",
      "industryParent",
      "post",
      "testimonial",
      "portfolioCaseStudy",
    ];

    for (const docType of referencerTypes) {
      const docs = await client.fetch<Record<string, unknown>[]>(
        `*[_type == $docType && !(_id in path("drafts.**"))]`,
        { docType },
      );

      for (const doc of docs) {
        const patch: Record<string, unknown> = {};
        let changed = false;

        for (const [key, value] of Object.entries(doc)) {
          if (key.startsWith("_")) continue;
          if (!Array.isArray(value)) continue;

          const hasLegacyRef = (value as Ref[]).some(
            (item) => item?._type === "reference" && idMap.has(item._ref),
          );
          if (!hasLegacyRef) continue;

          patch[key] = mapRefs(value as Ref[], idMap);
          changed = true;
        }

        if (mergePostReferences(doc, patch, idMap)) changed = true;

        if (!changed) continue;

        console.log(`  patch ${doc._type} ${doc._id}`);
        await client.patch(String(doc._id)).set(patch).commit();
      }
    }

    for (const doc of [...portfolioDocs, ...caseStudyDocs]) {
      console.log(`  delete ${doc._type} ${doc._id}`);
      await client.delete(String(doc._id));
    }
  }

  console.log(
    apply
      ? "Migration complete."
      : "Dry run complete. Re-run with --apply to write changes.",
  );
}

function mergePostReferences(
  doc: Record<string, unknown>,
  patch: Record<string, unknown>,
  idMap: Map<string, string>,
): boolean {
  if (doc._type !== "post") return false;

  const caseRefs = mapRefs(doc.relatedCaseStudies as Ref[] | undefined, idMap) ?? [];
  const portfolioRefs =
    mapRefs(doc.relatedPortfolioProjects as Ref[] | undefined, idMap) ?? [];

  if (portfolioRefs.length === 0 && !patch.relatedCaseStudies) return false;

  const merged = [...caseRefs, ...portfolioRefs];
  const seen = new Set<string>();
  const deduped = merged.filter((item) => {
    if (seen.has(item._ref)) return false;
    seen.add(item._ref);
    return true;
  });

  patch.relatedCaseStudies = deduped;
  patch.relatedPortfolioProjects = [];
  return true;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
