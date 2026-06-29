/**
 * Audit Sanity documents for missing cover images, OG images, and alt text.
 * Run: npx tsx scripts/audit-cms-images.ts
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type Row = {
  type: string;
  id: string;
  title: string;
  issues: string[];
};

const DOC_TYPES = [
  "post",
  "service",
  "caseStudy",
  "portfolioProject",
  "industry",
  "industryParent",
  "product",
  "migration",
  "customSoftware",
] as const;

async function main() {
  const rows: Row[] = [];

  for (const type of DOC_TYPES) {
    const docs = await client.fetch<
      Array<{
        _id: string;
        title?: string;
        coverImage?: { asset?: { _ref?: string }; alt?: string };
        openGraph?: { ogImage?: { asset?: { _ref?: string } } };
        seo?: { ogImage?: string };
        screenshots?: Array<{ image?: { asset?: { _ref?: string } }; alt?: string }>;
      }>
    >(
      `*[_type == $type && !(_id in path("drafts.**"))]{
        _id,
        title,
        coverImage,
        openGraph,
        seo,
        screenshots
      }`,
      { type },
    );

    for (const doc of docs) {
      const issues: string[] = [];
      const title = doc.title ?? doc._id;

      if (!doc.coverImage?.asset?._ref) {
        issues.push("missing coverImage");
      } else if (!doc.coverImage.alt?.trim()) {
        issues.push("coverImage missing alt");
      }

      const ogAsset = doc.openGraph?.ogImage?.asset?._ref;
      const ogUrl = doc.seo?.ogImage;
      if (type === "post" && !ogAsset && !ogUrl) {
        issues.push("missing OG image (openGraph.ogImage or seo.ogImage)");
      }

      for (const [index, shot] of (doc.screenshots ?? []).entries()) {
        if (!shot.image?.asset?._ref) {
          issues.push(`screenshot ${index + 1} missing image`);
        } else if (!shot.alt?.trim()) {
          issues.push(`screenshot ${index + 1} missing alt`);
        }
      }

      if (issues.length) rows.push({ type, id: doc._id, title, issues });
    }
  }

  if (!rows.length) {
    console.log("No image issues found.");
    return;
  }

  console.log(`Found ${rows.length} document(s) with image issues:\n`);
  for (const row of rows) {
    console.log(`- [${row.type}] ${row.title} (${row.id})`);
    for (const issue of row.issues) console.log(`    • ${issue}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
