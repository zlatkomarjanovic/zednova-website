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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-05-15",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const TRACK_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "oneSentenceSummary",
  "category",
  "author",
  "publishedAt",
  "readTime",
  "status",
  "contentType",
  "difficulty",
  "featured",
  "accent",
  "coverImage",
  "coverImageUrl",
  "tags",
  "articleBlocks",
  "body",
  "takeaways",
  "keyTakeaways",
  "faqs",
  "inlineFaqs",
  "faqReferences",
  "aiSummary",
  "llmSnippet",
  "quickAnswer",
  "searchIntent",
  "targetAudience",
  "painPoints",
  "searchQuestions",
  "relatedServices",
  "relatedIndustries",
  "relatedMigrations",
  "relatedPosts",
  "seo",
  "openGraph",
  "schemaMarkup",
  "primaryCta",
  "tableOfContentsEnabled",
] as const;

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if ("current" in obj) return isEmpty(obj.current);
    if ("_ref" in obj) return false;
    return Object.values(obj).every(isEmpty);
  }
  return false;
}

async function main() {
  const docs = await client.fetch<
    Record<string, unknown>[]
  >(`*[_type == "post"] | order(title asc) {
      title,
      "slug": slug.current,
      excerpt,
      oneSentenceSummary,
      status,
      contentType,
      difficulty,
      readTime,
      featured,
      coverImage,
      coverImageUrl,
      "tagCount": count(tags),
      "articleBlockCount": count(articleBlocks),
      "faqCount": count(faqs),
      "inlineFaqCount": count(inlineFaqs),
      "takeawayCount": count(takeaways),
      "keyTakeawayCount": count(keyTakeaways),
      "relatedServiceCount": count(relatedServices),
      "relatedIndustryCount": count(relatedIndustries),
      "relatedMigrationCount": count(relatedMigrations),
      "relatedPostCount": count(relatedPosts),
      aiSummary,
      llmSnippet,
      quickAnswer,
      searchIntent,
      "targetAudienceCount": count(targetAudience),
      "painPointCount": count(painPoints),
      "searchQuestionCount": count(searchQuestions),
      "entityCount": count(entitiesMentioned),
      seo,
      openGraph,
      schemaMarkup,
      primaryCta,
      secondaryCta,
      tableOfContentsEnabled
    }`);

  console.log(`# Insights audit (${docs.length} posts)\n`);

  for (const doc of docs) {
    const missing = TRACK_FIELDS.filter((field) => isEmpty(doc[field]));
    console.log(`## ${doc.title}`);
    console.log(`- slug: ${doc.slug}`);
    console.log(`- status: ${doc.status ?? "—"} · type: ${doc.contentType ?? "—"} · difficulty: ${doc.difficulty ?? "—"}`);
    console.log(`- read time: ${doc.readTime} min · featured: ${doc.featured ? "yes" : "no"}`);
    console.log(`- cover image: ${doc.coverImage ? "uploaded" : "missing"} · legacy URL: ${doc.coverImageUrl ? "set" : "missing"}`);
    console.log(`- article blocks: ${doc.articleBlockCount} · FAQs: ${doc.faqCount} · inline FAQs: ${doc.inlineFaqCount}`);
    console.log(`- takeaways: ${doc.takeawayCount} · key takeaways: ${doc.keyTakeawayCount}`);
    console.log(`- related: ${doc.relatedServiceCount} services · ${doc.relatedIndustryCount} industries · ${doc.relatedMigrationCount} migrations · ${doc.relatedPostCount} posts`);
    console.log(`- AEO: summary ${doc.aiSummary ? "✓" : "✗"} · llm snippet ${doc.llmSnippet ? "✓" : "✗"} · quick answer ${doc.quickAnswer ? "✓" : "✗"}`);
    console.log(`- search intent: ${doc.searchIntent ?? "—"} · audiences: ${doc.targetAudienceCount} · pain points: ${doc.painPointCount} · questions: ${doc.searchQuestionCount} · entities: ${doc.entityCount}`);
    console.log(`- SEO block: ${doc.seo ? "✓" : "✗"} · Open Graph: ${doc.openGraph ? "✓" : "✗"} · schema: ${doc.schemaMarkup ? "✓" : "✗"}`);
    console.log(`- CTAs: primary ${doc.primaryCta ? "✓" : "✗"} · secondary ${doc.secondaryCta ? "✓" : "✗"} · TOC: ${doc.tableOfContentsEnabled === false ? "off" : "on"}`);
    if (missing.length) {
      console.log(`- still empty: ${missing.join(", ")}`);
    } else {
      console.log(`- all tracked fields populated`);
    }
    console.log("");
  }
}

main().catch(console.error);
