/**
 * Fill all relevant editorial, AEO, SEO, and relationship fields on insight posts.
 * Usage: npm run enrich:insights-posts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { posts } from "../src/lib/content/posts";
import { services } from "../src/lib/content/services";
import {
  bodyCharCount,
  expandPostBody,
  extendedTagsForPost,
} from "../src/lib/content/post-extensions";
import { getInsightOverride } from "../src/lib/content/insight-overrides";
import {
  mapArticleBlocksForSanity,
  mapFaqsForSanity,
} from "./fix-insights-post-data";

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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function sanityKey(prefix: string, seed: string) {
  return `${prefix}-${seed}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .slice(0, 24);
}

function ref(type: string, id: string, key?: string) {
  return {
    _type: "reference" as const,
    _key: key ?? id,
    _ref: id,
  };
}

function difficultyFor(readTime: number): "Beginner" | "Intermediate" | "Advanced" {
  if (readTime <= 5) return "Beginner";
  if (readTime <= 7) return "Intermediate";
  return "Advanced";
}

function searchIntentFor(category: string): string {
  if (category === "Conversion" || category === "Healthcare Clinics") return "Commercial";
  return "Informational";
}

const AUDIENCE_BY_CATEGORY: Record<string, string[]> = {
  "AI & Search": ["Marketing leaders", "Founders", "SEO and growth teams"],
  Systems: ["Operations leaders", "Small business owners", "Marketing teams"],
  Conversion: ["Marketing managers", "Ecommerce owners", "Founders"],
  "Healthcare Clinics": ["Clinic owners", "Practice managers", "Med spa operators"],
};

const ENTITIES_BY_SLUG: Record<string, string[]> = {
  "ai-overviews-are-the-new-seo": [
    "Google AI Overviews",
    "ChatGPT",
    "Perplexity",
    "Schema markup",
    "llms.txt",
  ],
  "sanity-cms-for-marketing-teams-who-hate-developer-tickets": [
    "Sanity CMS",
    "Next.js",
    "Webflow",
  ],
  "when-to-rebuild-vs-migrate": ["Next.js", "Sanity", "WordPress", "Webflow"],
  "shopify-conversion-fixes-that-actually-move-revenue": [
    "Shopify",
    "Klaviyo",
    "Ecommerce",
  ],
  "crm-automation-for-clinics-without-extra-hires": [
    "HubSpot",
    "GoHighLevel",
    "CRM automation",
  ],
};

const RELATIONS_BY_SLUG: Record<
  string,
  { services?: string[]; industries?: string[]; migrations?: string[]; relatedPosts?: string[] }
> = {
  "ai-overviews-are-the-new-seo": {
    services: ["ai-lead-site", "seo-aeo-content"],
    industries: ["b2b-saas-technology", "professional-services"],
    relatedPosts: [
      "sanity-cms-for-marketing-teams-who-hate-developer-tickets",
      "why-your-website-is-losing-clients",
    ],
  },
  "five-minute-revenue-leak-audit": {
    services: ["ai-receptionist", "crm-pipeline-automation"],
    industries: ["professional-services", "healthcare-wellness"],
    relatedPosts: ["why-your-website-is-losing-clients", "crm-automation-for-clinics-without-extra-hires"],
  },
  "why-your-website-is-losing-clients": {
    services: ["ai-lead-site", "seo-aeo-content"],
    industries: ["professional-services", "b2b-saas-technology"],
    relatedPosts: ["five-minute-revenue-leak-audit", "when-to-rebuild-vs-migrate"],
  },
  "when-to-rebuild-vs-migrate": {
    services: ["ai-lead-site"],
    industries: ["professional-services", "b2b-saas-technology"],
    migrations: [
      "webflow-to-nextjs-sanity",
      "wordpress-to-nextjs-sanity",
      "framer-to-nextjs-sanity",
    ],
    relatedPosts: [
      "sanity-cms-for-marketing-teams-who-hate-developer-tickets",
      "why-your-website-is-losing-clients",
    ],
  },
  "shopify-conversion-fixes-that-actually-move-revenue": {
    services: ["seo-aeo-content"],
    industries: ["ecommerce-dtc"],
    migrations: ["shopify-to-headless-shopify"],
    relatedPosts: ["why-your-website-is-losing-clients"],
  },
  "crm-automation-for-clinics-without-extra-hires": {
    services: ["ai-receptionist", "crm-pipeline-automation"],
    industries: ["healthcare-wellness"],
    relatedPosts: ["five-minute-revenue-leak-audit"],
  },
  "sanity-cms-for-marketing-teams-who-hate-developer-tickets": {
    services: ["ai-lead-site"],
    industries: ["b2b-saas-technology", "professional-services"],
    migrations: ["webflow-to-nextjs-sanity", "webflow-cms-to-sanity"],
    relatedPosts: ["when-to-rebuild-vs-migrate", "ai-overviews-are-the-new-seo"],
  },
};

function matchedServiceSlugs(post: (typeof posts)[number]) {
  const manual = RELATIONS_BY_SLUG[post.slug]?.services ?? [];
  const auto = services
    .filter(
      (service) =>
        post.tags.some(
          (tag) =>
            service.title.toLowerCase().includes(tag.toLowerCase()) ||
            service.category.toLowerCase().includes(tag.toLowerCase()),
        ) || service.category === post.category,
    )
    .map((service) => service.slug);
  return [...new Set([...manual, ...auto])];
}

function relatedPostSlugs(post: (typeof posts)[number]) {
  const manual = RELATIONS_BY_SLUG[post.slug]?.relatedPosts ?? [];
  const auto = posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      slug: candidate.slug,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((entry) => entry.slug);
  return [...new Set([...manual, ...auto])].slice(0, 3);
}

export function buildPostEnrichment(post: (typeof posts)[number]) {
  const categorySlug = slugify(post.category);
  const relations = RELATIONS_BY_SLUG[post.slug] ?? {};
  const serviceSlugs = matchedServiceSlugs(post);
  const relatedSlugs = relatedPostSlugs(post);
  const override = getInsightOverride(post.slug);
  const faqs = override?.faqs ?? post.faqs ?? [];
  const takeaways = override?.takeaways ?? post.takeaways ?? [];
  const firstFaq = faqs[0];
  const oneSentenceSummary = override?.quickAnswer.shortAnswer ?? post.excerpt.trim();
  const expandedBody = expandPostBody(post.body, post);
  const tagTitles = extendedTagsForPost(post.slug, post.tags);
  const readTime = Math.max(post.readTime, Math.ceil(bodyCharCount(expandedBody) / 1000));
  const reviewedAt = new Date().toISOString();

  return {
    oneSentenceSummary,
    status: "Published",
    contentType: "Guide",
    difficulty: difficultyFor(readTime),
    readTime,
    updatedAt: reviewedAt,
    lastReviewedAt: reviewedAt,
    tableOfContentsEnabled: true,
    takeaways,
    keyTakeaways: takeaways.map((title, index) => ({
      _type: "bulletItem" as const,
      _key: sanityKey("takeaway", String(index)),
      title,
    })),
    articleBlocks: mapArticleBlocksForSanity(expandedBody),
    faqs: faqs.length ? mapFaqsForSanity(faqs) : undefined,
    inlineFaqs: faqs.map((faq, index) => ({
      _type: "inlineFaq" as const,
      _key: sanityKey("inline-faq", faq.id ?? String(index)),
      question: faq.question,
      shortAnswer: faq.answer,
      schemaEnabled: true,
    })),
    aiSummary: override?.quickAnswer.shortAnswer ?? post.seoDescription ?? post.excerpt,
    llmSnippet: oneSentenceSummary,
    quickAnswer: {
      _type: "aeoAnswerBlock" as const,
      question: override?.quickAnswer.question ?? firstFaq?.question ?? post.title,
      shortAnswer: override?.quickAnswer.shortAnswer ?? firstFaq?.answer ?? post.excerpt,
    },
    searchIntent: searchIntentFor(post.category),
    targetAudience: AUDIENCE_BY_CATEGORY[post.category] ?? ["Founders", "Marketing teams"],
    painPoints: takeaways.slice(0, 4),
    searchQuestions: override?.searchQuestions ?? faqs.map((faq) => faq.question),
    entitiesMentioned: [
      ...new Set([...(ENTITIES_BY_SLUG[post.slug] ?? []), ...post.tags.slice(0, 4)]),
    ],
    sources: override?.sources?.map((source, index) => ({
      _key: sanityKey("source", String(index)),
      title: source.title,
      url: source.url,
      publisher: source.publisher,
      note: source.note,
    })),
    implementationTable: override?.implementationTable?.map((row, index) => ({
      _key: sanityKey("impl", String(index)),
      fix: row.fix,
      problem: row.problem,
      change: row.change,
      metric: row.metric,
      tool: row.tool,
    })),
    relatedServices: serviceSlugs.map((slug) => ref("service", `service-${slug}`, slug)),
    relatedIndustries: (relations.industries ?? []).map((slug) =>
      ref("industryParent", `industryParent-${slug}`, slug),
    ),
    relatedMigrations: (relations.migrations ?? []).map((slug) =>
      ref("migration", `migration-${slug}`, slug),
    ),
    relatedPosts: relatedSlugs.map((slug) => ref("post", `post-${slug}`, slug)),
    seo: {
      _type: "seoFields" as const,
      seoTitle: post.seoTitle ?? post.title,
      seoDescription: post.seoDescription ?? post.excerpt,
      keywords: post.keywords ?? post.tags,
      focusKeyword: post.keywords?.[0] ?? post.tags[0],
      secondaryKeywords: post.keywords?.slice(1) ?? post.tags.slice(1),
      ogType: "article",
      twitterCard: "summary_large_image",
    },
    schemaMarkup: {
      _type: "schemaMarkupFields" as const,
      schemaType: "BlogPosting",
      enableArticleSchema: true,
      enableFaqSchema: Boolean(faqs.length),
      enableBreadcrumbSchema: true,
    },
    primaryCta: {
      _type: "ctaBlock" as const,
      eyebrow: "Need help implementing this?",
      title: "Tell us what you are building",
      description:
        "We design and ship websites, automations, and custom software with AI-accelerated delivery.",
      primaryLabel: "Start a project",
      primaryHref: "/contact",
      secondaryLabel: "See services",
      secondaryHref: "/services",
    },
    primaryCtaTitle: "Tell us what you are building",
    primaryCtaDescription:
      "We design and ship websites, automations, and custom software with AI-accelerated delivery.",
    primaryCtaLabel: "Start a project",
    primaryCtaHref: "/contact",
    secondaryCta: {
      _type: "ctaBlock" as const,
      title: "Explore related services",
      description: "See how we help teams turn insight into shipped systems.",
      primaryLabel: "View services",
      primaryHref: "/services",
    },
    secondaryCtaTitle: "Explore related services",
    secondaryCtaDescription: "See how we help teams turn insight into shipped systems.",
    secondaryCtaLabel: "View services",
    secondaryCtaHref: "/services",
    recommendedNextStep: {
      _type: "ctaBlock" as const,
      title: serviceSlugs[0]
        ? `Next: ${services.find((service) => service.slug === serviceSlugs[0])?.title ?? "Our services"}`
        : "Book a strategy call",
      description: "We will map the fastest path from this insight to something live in your business.",
      primaryLabel: "Book a call",
      primaryHref: "/contact",
    },
    category: ref("insightCategory", `insightCategory-${categorySlug}`, categorySlug),
    coverImageUrl: post.image,
    tags: tagTitles.map((title) => ref("tag", `tag-${slugify(title)}`, slugify(title))),
  };
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token,
  useCdn: false,
});

const coverCache = new Map<string, string>();

async function uploadCoverImage(slug: string, url: string, alt: string) {
  const cached = coverCache.get(slug);
  if (cached) return cached;

  const filename = `post-cover-${slug}.jpg`;
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  if (existing) {
    coverCache.set(slug, existing);
    return existing;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download cover for ${slug}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/jpeg",
    label: alt,
  });
  coverCache.set(slug, asset._id);
  console.log(`  uploaded cover → ${asset._id}`);
  return asset._id;
}

function imageField(assetId: string, alt: string, caption?: string) {
  return {
    _type: "image" as const,
    alt,
    ...(caption ? { caption } : {}),
    asset: { _type: "reference" as const, _ref: assetId },
  };
}

async function ensureTagDocuments(tagTitles: string[]) {
  for (const title of tagTitles) {
    const tagSlug = slugify(title);
    await client.createIfNotExists({
      _id: `tag-${tagSlug}`,
      _type: "tag",
      title,
      slug: { _type: "slug", current: tagSlug },
      description: `Topics tagged "${title}".`,
    });
  }
}

async function main() {
  console.log(`Enriching ${posts.length} insight posts in ${projectId}/${dataset}…\n`);

  for (const post of posts) {
    const tagTitles = extendedTagsForPost(post.slug, post.tags);
    await ensureTagDocuments(tagTitles);
    const enrichment = buildPostEnrichment(post);
    const assetId = await uploadCoverImage(post.slug, post.image, post.title);
    const coverImage = imageField(
      assetId,
      post.title,
      `Cover illustration for “${post.title}” — ${post.category} insight by ZedNova Studios.`,
    );

    await client
      .patch(`post-${post.slug}`)
      .set({
        ...enrichment,
        coverImage,
        openGraph: {
          _type: "openGraphFields",
          ogTitle: post.seoTitle ?? post.title,
          ogDescription: post.seoDescription ?? post.excerpt,
          ogImage: coverImage,
          ogType: "article",
          twitterTitle: post.seoTitle ?? post.title,
          twitterDescription: post.seoDescription ?? post.excerpt,
          twitterImage: coverImage,
          twitterCardType: "summary_large_image",
        },
      })
      .commit();

    console.log(`✓ ${post.title}`);
  }

  console.log("\nDone.");
}

const isDirectRun = process.argv[1]?.replace(/\\/g, "/").includes("enrich-insights-posts");

if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
