/**
 * Seed Sanity with services, custom software, migrations, industries, and nav content.
 * Usage: npm run seed:sanity
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { services } from "../src/lib/content/services";
import { migrations } from "../src/lib/content/migrations";
import { team } from "../src/lib/content/team";
import { industries } from "../src/lib/content/industry-subs";
import { posts } from "../src/lib/content/posts";
import { products } from "../src/lib/content/products";
import { testimonials } from "../src/lib/content/testimonials";
import { siteSettings } from "../src/lib/content/site";
import { caseStudies } from "../src/lib/content/case-studies";
import { portfolioProjects } from "../src/lib/content/portfolio-projects";
import { faqs } from "../src/lib/content/faq";
import { industryParents } from "../src/lib/content/industry-parents";
import {
  customSoftwareGroups,
  customSoftwareNavItems,
  industryNavItems,
  serviceMegaMenuCards,
  serviceNavGroups,
} from "../src/lib/content/nav-menu";

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

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
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

type Mutation = { createOrReplace: Record<string, unknown> };

const mutations: Mutation[] = [];

function add(doc: Record<string, unknown>) {
  mutations.push({ createOrReplace: doc });
}

/* ----------------------------- Services ----------------------------- */

for (const service of services) {
  add({
    _id: `service-${service.slug}`,
    _type: "service",
    title: service.title,
    slug: { _type: "slug", current: service.slug },
    number: service.number,
    group: service.group,
    category: service.category,
    icon: service.icon,
    shortDescription: service.shortDescription,
    whatItIs: service.whatItIs,
    deliverables: service.deliverables,
    idealClients: service.idealClients,
    processSteps: service.processSteps,
    results: service.results,
    pricingSignal: service.pricingSignal,
    timeline: service.timeline,
    coverImageUrl: service.image || undefined,
    order: service.order,
  });
}

/* ----------------------------- Service mega menu cards ----------------------------- */

serviceMegaMenuCards.forEach((card, index) => {
  add({
    _id: `serviceMegaMenuCard-${index + 1}`,
    _type: "serviceMegaMenuCard",
    title: card.title,
    shortDescription: card.shortDescription,
    includes: card.includes,
    href: card.href,
    order: index + 1,
  });
});

/* ----------------------------- Service nav items ----------------------------- */

let navItemIndex = 0;
for (const group of serviceNavGroups) {
  group.items.forEach((item) => {
    navItemIndex += 1;
    add({
      _id: `serviceNavItem-${navItemIndex}`,
      _type: "serviceNavItem",
      title: item.title,
      shortDescription: item.shortDescription,
      href: item.href,
      navGroup: group.group,
      order: navItemIndex,
    });
  });
}

/* ----------------------------- Custom software ----------------------------- */

const sectionMeta = new Map(
  customSoftwareGroups.map((group, index) => [
    group.id,
    {
      sectionId: group.id,
      sectionLabel: group.label,
      sectionHeadline: group.headline,
      sectionDescription: group.description,
      sectionOrder: index + 1,
    },
  ]),
);

customSoftwareNavItems.forEach((item, index) => {
  const key = `${item.title}::${item.href}`;
  const inGroup = customSoftwareGroups.find((g) =>
    g.items.some((i) => i.title === item.title && i.href === item.href),
  );
  const section = inGroup ? sectionMeta.get(inGroup.id) : undefined;

  add({
    _id: `customSoftware-${slugify(item.title)}`,
    _type: "customSoftware",
    title: item.title,
    shortDescription: item.shortDescription,
    href: item.href,
    order: index + 1,
    showInNav: true,
    ...(section ?? {}),
  });
});

/* ----------------------------- Migrations ----------------------------- */

for (const migration of migrations) {
  add({
    _id: `migration-${migration.slug}`,
    _type: "migration",
    title: migration.title,
    slug: { _type: "slug", current: migration.slug },
    shortDescription: migration.shortDescription,
    description: migration.description,
    order: migration.order,
  });
}

/* ----------------------------- Industries ----------------------------- */

const navSlugOrder = new Map<
  string,
  { order: number; title: string; shortDescription: string }
>();
industryNavItems.forEach((item, index) => {
  const slug = item.href.replace(/^\/industries\//, "");
  navSlugOrder.set(slug, {
    order: index + 1,
    title: item.title,
    shortDescription: item.shortDescription,
  });
});

for (const parent of industryParents) {
  const nav = navSlugOrder.get(parent.slug);
  add({
    _id: `industryParent-${parent.slug}`,
    _type: "industryParent",
    title: parent.title,
    slug: { _type: "slug", current: parent.slug },
    category: parent.category,
    whoItIsFor: parent.whoItIsFor,
    whatWeBuild: parent.whatWeBuild,
    problemSolved: parent.problemSolved,
    heroHeadline: parent.heroHeadline,
    hook: parent.hook,
    shortDescription: parent.shortDescription,
    painPoints: parent.painPoints,
    popularServices: parent.popularServices,
    exampleProject: parent.exampleProject,
    commonUseCase: parent.commonUseCase,
    icon: parent.icon,
    order: parent.order,
    showInMainNav: nav != null,
    navOrder: nav?.order,
    navTitle: nav?.title,
    navShortDescription: nav?.shortDescription,
  });
}

for (const industry of industries) {
  const nav = navSlugOrder.get(industry.slug);
  add({
    _id: `industry-${industry.slug}`,
    _type: "industry",
    title: industry.title,
    slug: { _type: "slug", current: industry.slug },
    category: industry.category,
    parent: {
      _type: "reference",
      _ref: `industryParent-${industry.parentSlug}`,
    },
    whoItIsFor: industry.whoItIsFor,
    whatWeBuild: industry.whatWeBuild,
    problemSolved: industry.problemSolved,
    heroHeadline: industry.heroHeadline,
    hook: industry.hook,
    shortDescription: industry.shortDescription,
    painPoints: industry.painPoints,
    popularServices: industry.popularServices,
    exampleProject: industry.exampleProject,
    commonUseCase: industry.commonUseCase,
    icon: industry.icon,
    order: industry.order,
    showInMainNav: nav != null,
    navOrder: nav?.order,
    navTitle: nav?.title,
    navShortDescription: nav?.shortDescription,
  });
}

/* ----------------------------- Insights ----------------------------- */

const CATEGORY_ICONS: Record<string, string> = {
  "AI & Search": "ai-search",
  Systems: "automation",
  Conversion: "conversion",
  "Healthcare Clinics": "healthcare",
};

function industryRef(slug: string) {
  const parent = industryParents.find((p) => p.slug === slug);
  if (parent) {
    return { _type: "reference", _ref: `industryParent-${slug}` };
  }
  return { _type: "reference", _ref: `industry-${slug}` };
}

const categoryTitles = [...new Set(posts.map((post) => post.category))];
categoryTitles.forEach((title, index) => {
  const categorySlug = slugify(title);
  add({
    _id: `insightCategory-${categorySlug}`,
    _type: "insightCategory",
    title,
    slug: { _type: "slug", current: categorySlug },
    icon: CATEGORY_ICONS[title] ?? "insights",
    order: index + 1,
  });
});

const allTags = [...new Set(posts.flatMap((post) => post.tags))];
allTags.forEach((title) => {
  const tagSlug = slugify(title);
  add({
    _id: `tag-${tagSlug}`,
    _type: "tag",
    title,
    slug: { _type: "slug", current: tagSlug },
  });
});

for (const member of team) {
  add({
    _id: `author-${member.slug}`,
    _type: "author",
    name: member.name,
    slug: { _type: "slug", current: member.slug },
    role: member.role,
    bio: member.bio,
    linkedin: member.linkedin,
    twitter: member.twitter,
    upwork: member.upwork,
  });
}

for (const post of posts) {
  const categorySlug = slugify(post.category);
  add({
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    category: {
      _type: "reference",
      _ref: `insightCategory-${categorySlug}`,
    },
    author: {
      _type: "reference",
      _ref: `author-${post.author}`,
    },
    publishedAt: new Date(post.publishedAt).toISOString(),
    updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    readTime: post.readTime,
    featured: post.featured,
    accent: post.accent,
    coverImageUrl: post.image,
    tags: post.tags.map((tagTitle) => ({
      _type: "reference",
      _key: slugify(tagTitle),
      _ref: `tag-${slugify(tagTitle)}`,
    })),
    takeaways: post.takeaways,
    faqs: post.faqs,
    seo: {
      _type: "seoFields",
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      keywords: post.keywords,
    },
    articleBlocks: post.body,
  });
}

/* ----------------------------- Site settings ----------------------------- */

add({
  _id: "siteSettings",
  _type: "siteSettings",
  ...siteSettings,
});

/* ----------------------------- Products ----------------------------- */

for (const product of products) {
  add({
    _id: `product-${product.slug}`,
    _type: "product",
    title: product.title,
    slug: { _type: "slug", current: product.slug },
    tagline: product.tagline,
    description: product.description,
    status: product.status,
    features: product.features,
    ctaLabel: product.ctaLabel,
    ctaHref: product.ctaHref,
    order: product.order,
  });
}

/* ----------------------------- Testimonials ----------------------------- */

for (const testimonial of testimonials) {
  add({
    _id: `testimonial-${testimonial.id}`,
    _type: "testimonial",
    quote: testimonial.quote,
    authorName: testimonial.authorName,
    authorTitle: testimonial.authorTitle,
    company: testimonial.company,
    industry: testimonial.industry,
    platform: testimonial.platform ?? false,
    featured: testimonial.featured,
  });
}

/* ----------------------------- Portfolio ----------------------------- */

for (const project of portfolioProjects) {
  add({
    _id: `portfolioProject-${project.slug}`,
    _type: "portfolioProject",
    title: project.title,
    slug: { _type: "slug", current: project.slug },
    client: project.client,
    summary: project.summary,
    href: project.href,
    coverImageUrl: project.image,
    imageAlt: project.imageAlt,
    videoUrl: project.video,
    accent: project.accent,
    category: project.category,
    order: project.order,
    logo: project.logo
      ? {
          _type: "portfolioLogo",
          imageUrl: project.logo.src,
          alt: project.logo.alt,
          lightVariant: project.logo.lightVariant,
        }
      : undefined,
  });
}

/* ----------------------------- Case studies ----------------------------- */

for (const study of caseStudies) {
  add({
    _id: `caseStudy-${study.slug}`,
    _type: "caseStudy",
    title: study.title,
    slug: { _type: "slug", current: study.slug },
    client: study.client,
    industry: industryRef(study.industry),
    servicesUsed: study.servicesUsed.map((slug) => ({
      _type: "reference",
      _key: slug,
      _ref: `service-${slug}`,
    })),
    timeline: study.timeline,
    resultHeadline: study.resultHeadline,
    challenge: study.challenge,
    solution: study.solution,
    results: study.results,
    techStack: study.techStack,
    testimonial: study.testimonialId
      ? {
          _type: "reference",
          _ref: `testimonial-${study.testimonialId}`,
        }
      : undefined,
    featured: study.featured,
    accent: study.accent,
    coverImageUrl: study.image,
  });
}

/* ----------------------------- FAQs ----------------------------- */

for (const item of faqs) {
  add({
    _id: `faq-${item.id}`,
    _type: "faq",
    question: item.question,
    answer: item.answer,
    order: item.order,
  });
}

/* ----------------------------- Commit ----------------------------- */

async function main() {
  console.log(`Seeding ${mutations.length} documents to ${projectId}/${dataset}…`);

  const batchSize = 100;
  for (let i = 0; i < mutations.length; i += batchSize) {
    const batch = mutations.slice(i, i + batchSize);
    await client.mutate(batch);
    console.log(`  ${Math.min(i + batchSize, mutations.length)} / ${mutations.length}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
