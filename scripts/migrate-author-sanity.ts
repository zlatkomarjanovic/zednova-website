/**
 * One-off: strip legacy SEO + avatar fields from Author documents in Sanity.
 * Run: npx tsx scripts/migrate-author-sanity.ts
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing SANITY project id or write token (SANITY_API_TOKEN).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const LEGACY_AUTHOR_FIELDS = [
  "seo",
  "seoTitle",
  "seoDescription",
  "canonicalUrl",
  "focusKeyword",
  "secondaryKeywords",
  "searchTags",
  "robotsIndex",
  "robotsFollow",
  "openGraphTitle",
  "openGraphDescription",
  "openGraphImage",
  "twitterTitle",
  "twitterDescription",
  "twitterImage",
  "avatar",
  "avatarUrl",
  "xTwitter",
] as const;

async function main() {
  const authors = await client.fetch<{ _id: string; name?: string }[]>(
    `*[_type == "author"]{ _id, name }`,
  );

  if (!authors.length) {
    console.log("No author documents found.");
    return;
  }

  for (const author of authors) {
    console.log(`Cleaning ${author._id} (${author.name ?? "unnamed"})…`);
    await client.patch(author._id).unset([...LEGACY_AUTHOR_FIELDS]).commit();
  }

  console.log(`Done. Cleaned ${authors.length} author document(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
