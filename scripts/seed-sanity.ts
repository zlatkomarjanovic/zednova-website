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
import { customSoftwareItems } from "../src/lib/content/custom-software-items";
import {
  customSoftwareGroups,
  customSoftwareNavItems,
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

function industryRef(slug: string) {
  const parent = industryParents.find((p) => p.slug === slug);
  if (parent) {
    return { _type: "reference", _ref: `industryParent-${slug}` };
  }
  return { _type: "reference", _ref: `industry-${slug}` };
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

type Mutation =
  | { createOrReplace: Record<string, unknown> }
  | { patch: { id: string; set: Record<string, unknown> } };

const mutations: Mutation[] = [];

function add(doc: Record<string, unknown>) {
  mutations.push({ createOrReplace: doc });
}

function patch(id: string, set: Record<string, unknown>) {
  mutations.push({ patch: { id, set } });
}

/* ----------------------------- Services ----------------------------- */

const caseStudiesByService = new Map<string, string[]>();
for (const study of caseStudies) {
  for (const serviceSlug of study.servicesUsed) {
    const list = caseStudiesByService.get(serviceSlug) ?? [];
    list.push(study.slug);
    caseStudiesByService.set(serviceSlug, list);
  }
}

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
    heroHeadline: service.title,
    heroSubhead: service.whatItIs,
    deliverables: service.deliverables,
    whatsIncluded: service.deliverables.map((d) => ({
      _type: "featureBullet",
      _key: slugify(d).slice(0, 20),
      title: d,
    })),
    idealClients: service.idealClients,
    processSteps: service.processSteps.map((step) => ({
      ...step,
      _type: "processStep",
      _key: `step-${step.step}`,
    })),
    results: service.results,
    pricingSignal: service.pricingSignal,
    startingPrice: undefined,
    timeline: service.timeline,
    coverImageUrl: service.image || undefined,
    order: service.order,
    relatedCaseStudies: (caseStudiesByService.get(service.slug) ?? [])
      .slice(0, 4)
      .map((slug) => ({
        _type: "reference",
        _key: slug,
        _ref: `caseStudy-${slug}`,
      })),
    seo: {
      _type: "seoFields",
      seoTitle: service.title,
      seoDescription: service.whatItIs,
      keywords: [service.category, service.group],
      ogType: "website",
      twitterCard: "summary_large_image",
    },
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

for (const item of customSoftwareItems) {
  const navItem = customSoftwareNavItems.find(
    (entry) => entry.href === `/custom-software/${item.slug}`,
  );
  const inGroup = customSoftwareGroups.find((g) =>
    g.items.some((i) => i.title === item.title),
  );
  const section = inGroup ? sectionMeta.get(inGroup.id) : undefined;

  add({
    _id: `customSoftware-${item.slug}`,
    _type: "customSoftware",
    title: item.title,
    slug: { _type: "slug", current: item.slug },
    shortDescription: item.shortDescription,
    whatItIs: item.whatItIs,
    problemSolved: item.problemSolved,
    targetAudience: item.targetAudience,
    keyFeatures: item.keyFeatures?.map((feature) => ({
      _type: "bulletItem",
      _key: slugify(feature.title).slice(0, 20),
      title: feature.title,
      description: feature.description,
    })),
    whatsIncluded: item.whatsIncluded?.map((feature) => ({
      _type: "featureBullet",
      _key: slugify(feature.title).slice(0, 20),
      title: feature.title,
      description: feature.description,
    })),
    deliverables: item.deliverables,
    technologies: item.technologies,
    integrations: item.integrations,
    process: item.processSteps?.map((step) => ({
      ...step,
      _type: "processStep",
      _key: `step-${step.step}`,
    })),
    timeline: item.timeline,
    startingPrice: item.startingPrice,
    href: `/custom-software/${item.slug}`,
    order: item.order,
    showInNav: true,
    relatedServices: item.relatedServices?.map((slug) => ({
      _type: "reference",
      _key: slug,
      _ref: `service-${slug}`,
    })),
    relatedIndustries: item.relatedIndustries?.map((slug) => ({
      _type: "reference",
      _key: slug,
      _ref: industryRef(slug)._ref,
    })),
    ...(section ?? {}),
    seo: {
      _type: "seoFields",
      seoTitle: item.title,
      seoDescription: item.shortDescription,
      ogType: "website",
      twitterCard: "summary_large_image",
    },
  });

  if (!navItem) {
    console.warn(`No nav item for custom software slug: ${item.slug}`);
  }
}

/* ----------------------------- Migrations ----------------------------- */

for (const migration of migrations) {
  add({
    _id: `migration-${migration.slug}`,
    _type: "migration",
    title: migration.title,
    slug: { _type: "slug", current: migration.slug },
    shortDescription: migration.shortDescription,
    description: migration.description,
    heroHeadline: migration.title,
    heroSubhead: migration.shortDescription,
    sourcePlatform: migration.title.split(" to ")[0]?.trim() || undefined,
    targetPlatform: "Next.js",
    order: migration.order,
    seo: {
      _type: "seoFields",
      seoTitle: migration.title,
      seoDescription: migration.shortDescription,
      ogType: "website",
      twitterCard: "summary_large_image",
    },
  });
}

/* ----------------------------- Industries ----------------------------- */

for (const parent of industryParents) {
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
    industryOverview: parent.industryOverview,
    painPoints: parent.painPoints,
    popularServices: parent.popularServices,
    exampleProject: parent.exampleProject,
    commonUseCase: parent.commonUseCase,
    icon: parent.icon,
    order: parent.order,
    showInMainNav: true,
    navOrder: parent.order,
    navTitle: parent.title,
    navShortDescription: parent.shortDescription,
    featured: parent.order <= 3,
    priority: parent.order,
    seo: {
      _type: "seoFields",
      seoTitle: parent.title,
      seoDescription: parent.shortDescription,
      keywords: [parent.category, parent.title],
      ogType: "website",
      twitterCard: "summary_large_image",
    },
  });
}

for (const industry of industries) {
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
    showInMainNav: false,
    seo: {
      _type: "seoFields",
      seoTitle: industry.title,
      seoDescription: industry.shortDescription,
      keywords: [industry.category, industry.title],
      ogType: "website",
      twitterCard: "summary_large_image",
    },
  });
}

const LEGACY_PARENT_SLUGS = [
  "healthcare-clinics",
  "ecommerce-shopify",
  "small-business-custom-software",
];

for (const slug of LEGACY_PARENT_SLUGS) {
  patch(`industryParent-${slug}`, {
    showInMainNav: false,
    seo: {
      _type: "seoFields",
      seoHideFromLists: true,
    },
  });
}

/* ----------------------------- Insights ----------------------------- */

const CATEGORY_ICONS: Record<string, string> = {
  "AI & Search": "ai-search",
  Systems: "automation",
  Conversion: "conversion",
  "Healthcare & Wellness": "healthcare",
  "Ecommerce & DTC": "ecommerce",
  "Fitness, Coaching & Performance": "fitness",
  "Professional Services": "consulting",
  "B2B SaaS & Technology": "saas",
  "Real Estate & Property": "real-estate",
};

const categoryTitles = [...new Set(posts.map((post) => post.category))];
categoryTitles.forEach((title, index) => {
  const categorySlug = slugify(title);
  add({
    _id: `insightCategory-${categorySlug}`,
    _type: "insightCategory",
    title,
    slug: { _type: "slug", current: categorySlug },
    description: `Insights about ${title.toLowerCase()} from ZedNova Studios.`,
    icon: CATEGORY_ICONS[title] ?? "insights",
    order: index + 1,
    seo: {
      _type: "seoFields",
      seoTitle: `${title} Insights`,
      seoDescription: `Insights about ${title.toLowerCase()} from ZedNova Studios.`,
    },
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
    description: `Topics tagged "${title}".`,
    seo: {
      _type: "seoFields",
      seoTitle: title,
      seoDescription: `Topics tagged "${title}".`,
    },
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
    shortBio: member.bio[0],
    linkedin: member.linkedin,
    twitter: member.twitter,
    upwork: member.upwork,
    seo: {
      _type: "seoFields",
      seoTitle: member.name,
      seoDescription: member.bio[0],
      ogType: "profile",
    },
  });
}

for (const member of team) {
  add({
    _id: `teamMember-${member.slug}`,
    _type: "teamMember",
    name: member.name,
    slug: { _type: "slug", current: member.slug },
    role: member.role,
    shortRole: member.role,
    bio: member.bio,
    shortBio: member.bio[0],
    linkedin: member.linkedin,
    twitter: member.twitter,
    upwork: member.upwork,
    order: 1,
    seo: {
      _type: "seoFields",
      seoTitle: member.name,
      seoDescription: member.bio[0],
    },
  });
}

for (const post of posts) {
  const categorySlug = slugify(post.category);

  // Match posts to services by overlapping tags/category
  const matchedServiceSlugs = services
    .filter((s) =>
      post.tags.some((t) =>
        s.title.toLowerCase().includes(t.toLowerCase()) ||
        s.category.toLowerCase().includes(t.toLowerCase()),
      ) || s.category === post.category,
    )
    .map((s) => s.slug);

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
    relatedServices: matchedServiceSlugs.length
      ? matchedServiceSlugs.map((slug) => ({
          _type: "reference",
          _key: slug,
          _ref: `service-${slug}`,
        }))
      : undefined,
    seo: {
      _type: "seoFields",
      seoTitle: post.seoTitle ?? post.title,
      seoDescription: post.seoDescription ?? post.excerpt,
      keywords: post.keywords ?? post.tags,
      ogType: "article",
      ogImage: post.image ? undefined : undefined, // would upload cover image to Sanity in production
      twitterCard: "summary_large_image",
    },
    articleBlocks: post.body,
  });
}

/* ----------------------------- Site settings ----------------------------- */

add({
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: siteSettings.siteTitle,
  siteDescription: siteSettings.siteDescription,
  siteUrl: "https://zednova.com",
  announcementBar: siteSettings.announcementBar,
  contactEmail: siteSettings.contactEmail,
  responseTime: siteSettings.responseTime,
  socialLinks: siteSettings.socialLinks,
  stats: siteSettings.stats,
  twitterCreator: "@zednova",
  defaultSeo: {
    _type: "seoFields",
    seoTitle: siteSettings.siteTitle,
    seoDescription: siteSettings.siteDescription,
    ogType: "website",
    twitterCard: "summary_large_image",
  },
});

/* ----------------------------- Products ----------------------------- */

const PRODUCT_TYPE_INFER: Record<string, string> = {
  "anti-slop-stack": "freebie",
  "framer-marketplace-components": "software",
  "prospect-engine": "software",
  "zednova-os": "software",
};

for (const product of products) {
  const features = product.features as unknown as string[];
  add({
    _id: `product-${product.slug}`,
    _type: "product",
    title: product.title,
    slug: { _type: "slug", current: product.slug },
    type: PRODUCT_TYPE_INFER[product.slug] ?? "software",
    tagline: product.tagline,
    description: product.description,
    featureList: features,
    features: features.map((f) => ({
      _type: "featureBullet",
      _key: slugify(f).slice(0, 20),
      title: f,
    })),
    status: product.status,
    ctaLabel: product.ctaLabel,
    ctaHref: product.ctaHref,
    order: product.order,
    seo: {
      _type: "seoFields",
      seoTitle: product.title,
      seoDescription: product.description,
      ogType: "product",
      twitterCard: "summary_large_image",
    },
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
    platformSource: "Direct",
    featured: testimonial.featured,
    rating: 5,
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
    year: new Date().getFullYear(),
    order: project.order,
    servicesUsed: project.servicesUsed?.map((slug) => ({
      _type: "reference",
      _key: slug,
      _ref: `service-${slug}`,
    })),
    logo: project.logo
      ? {
          _type: "portfolioLogo",
          imageUrl: project.logo.src,
          alt: project.logo.alt,
          lightVariant: project.logo.lightVariant,
        }
      : undefined,
    seo: {
      _type: "seoFields",
      seoTitle: project.title,
      seoDescription: project.summary,
      ogType: "website",
      twitterCard: "summary_large_image",
    },
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
    seo: {
      _type: "seoFields",
      seoTitle: study.title,
      seoDescription: `${study.client}: ${study.resultHeadline}.`,
      ogType: "article",
      twitterCard: "summary_large_image",
    },
  });
}

/* ----------------------------- FAQs ----------------------------- */

const FAQ_CATEGORY_INFER = (question: string): string => {
  const q = question.toLowerCase();
  if (q.includes("build")) return "Services";
  if (q.includes("price") || q.includes("cost")) return "Pricing";
  if (q.includes("long") || q.includes("timeline")) return "Process";
  if (q.includes("industry") || q.includes("who do you")) return "Industries";
  if (q.includes("migrat")) return "Migrations";
  if (q.includes("ai") || q.includes("chatbot") || q.includes("chatgpt")) return "Services";
  if (q.includes("support") || q.includes("own") || q.includes("app")) return "General";
  return "General";
};

faqs.forEach((item, index) => {
  add({
    _id: `faq-${item.id}`,
    _type: "faq",
    question: item.question,
    answer: item.answer,
    category: FAQ_CATEGORY_INFER(item.question),
    order: index + 1,
    tags: [],
  });
});

/* ----------------------------- Static pages ----------------------------- */

const staticPages = [
  {
    path: "/about",
    title: "About ZedNova Studios",
    heroHeadline: "A studio of one. A standard of ten.",
  },
  {
    path: "/contact",
    title: "Contact ZedNova Studios",
    heroHeadline: "Tell us what you need.",
  },
  {
    path: "/work",
    title: "Work — ZedNova Studios",
    heroHeadline: "Projects and case studies",
  },
  {
    path: "/insights",
    title: "Insights — ZedNova Studios",
    heroHeadline: "Notes on AI search, conversion, and systems",
  },
  {
    path: "/services",
    title: "Services — ZedNova Studios",
    heroHeadline: "Website design, Shopify, automation, and AI tools",
  },
  {
    path: "/industries",
    title: "Industries — ZedNova Studios",
    heroHeadline: "Industries we serve",
  },
  {
    path: "/migrations",
    title: "Migrations — ZedNova Studios",
    heroHeadline: "Move to a modern stack",
  },
  {
    path: "/custom-software",
    title: "Custom Software — ZedNova Studios",
    heroHeadline: "Portals, dashboards, and internal tools",
  },
  {
    path: "/resources",
    title: "Resources — ZedNova Studios",
    heroHeadline: "Guides, freebies, and software we ship",
  },
];

staticPages.forEach((p, i) => {
  add({
    _id: `page-${slugify(p.path)}`,
    _type: "page",
    title: p.title,
    slug: { _type: "slug", current: slugify(p.path) || "home" },
    path: p.path,
    heroHeadline: p.heroHeadline,
    seo: {
      _type: "seoFields",
      seoTitle: p.title,
      ogType: "website",
      twitterCard: "summary_large_image",
    },
  });
  void i;
});

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
