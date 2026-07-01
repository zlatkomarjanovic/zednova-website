/**
 * Seed Sanity with services, custom software, migrations, industries, and nav content.
 * Usage: npm run seed:sanity
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { services } from "../src/lib/content/services";
import { FAQ_SECTION_COPY } from "../src/lib/content/service-detail-fallbacks";
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
import { getIndustryLandingCopy } from "../src/lib/content/industry-detail-fallbacks";
import {
  SERVICE_SLUG_BY_PARENT,
  isParentServiceSlug,
} from "../src/lib/content/service-routes";
import { customSoftwareItems } from "../src/lib/content/custom-software-items";
import {
  customSoftwareGroups,
  customSoftwareNavItems,
  serviceMegaMenuCards,
  serviceNavGroups,
} from "../src/lib/content/nav-menu";
import { assignIndustryBuildSpans } from "../src/lib/content/industry-build-layout";
import {
  buildPostEnrichment,
} from "./enrich-insights-posts";

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

const PARENT_SERVICE_REF_BY_GROUP: Record<string, string> = {
  "Lead-Gen Websites & AI Search": "serviceMegaMenuCard-1",
  "CRM & Follow-Up Automation": "serviceMegaMenuCard-2",
  "AI Receptionist & Booking Automation": "serviceMegaMenuCard-3",
  "Custom In-House Software for SMBs": "serviceMegaMenuCard-4",
  "Platform Migrations": "serviceMegaMenuCard-5",
  "Monthly Support & Improvements": "serviceMegaMenuCard-6",
};

function parentServiceReference(group: string) {
  const ref = PARENT_SERVICE_REF_BY_GROUP[group];
  if (!ref) return undefined;
  return { _type: "reference" as const, _ref: ref };
}

function metaDescription(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= 155) return normalized;
  return `${normalized.slice(0, 152).trimEnd()}…`;
}

const MEGA_CARD_PARENT: Record<string, string> = {
  "Lead-Gen Websites": "lead-gen-websites",
  "CRM & Follow-Up Automation": "crm-automation",
  "AI Receptionists": "ai-receptionist",
  "Custom In-House Software": "custom-in-house-software",
  "Platform Migrations": "platform-migrations",
  "Monthly Support": "monthly-support",
};

const LEGACY_SERVICE_GROUPS = new Set([
  "Websites",
  "Automation",
  "AI Tools",
  "Ecommerce",
  "Shopify & Ecommerce (Legacy)",
]);

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

/* ----------------------------- Service mega menu cards (before services — parent refs) ----------------------------- */

serviceMegaMenuCards.forEach((card, index) => {
  add({
    _id: `serviceMegaMenuCard-${index + 1}`,
    _type: "serviceMegaMenuCard",
    title: card.title,
    shortDescription: card.shortDescription,
    includes: card.includes,
    href: card.href,
    startingPrice: card.startingPrice,
    isFeatured: card.isFeatured ?? true,
    isLegacy: card.isLegacy ?? false,
    parentService: MEGA_CARD_PARENT[card.title],
    order: index + 1,
  });
});

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
  const isLegacy = LEGACY_SERVICE_GROUPS.has(service.group);
  add({
    _id: `service-${service.slug}`,
    _type: "service",
    title: service.title,
    slug: { _type: "slug", current: service.slug },
    number: service.number,
    group: service.group,
    category: service.category,
    icon: service.icon,
    ...(parentServiceReference(service.group)
      ? { parentService: parentServiceReference(service.group) }
      : {}),
    isFeatured: service.order <= 4,
    showOnHomepage: !isLegacy,
    showInPrimaryServices: !isLegacy,
    isLegacy,
    isSecondary: isLegacy,
    plainPromise: service.shortDescription,
    problemSolved: service.whatItIs,
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
    ...(service.faqs?.length
      ? {
          faqs: service.faqs.map((faq, index) => {
            const anchor = slugify(faq.question).slice(0, 60) || `faq-${index + 1}`;
            return {
              _type: "articleFaq",
              _key: anchor.slice(0, 20),
              id: { _type: "slug", current: anchor },
              question: faq.question,
              answer: faq.answer,
            };
          }),
        }
      : {}),
    ...(FAQ_SECTION_COPY[service.slug]
      ? {
          faqEyebrow: FAQ_SECTION_COPY[service.slug].eyebrow,
          faqHeadline: FAQ_SECTION_COPY[service.slug].headline,
          faqSubtext: FAQ_SECTION_COPY[service.slug].subtext,
        }
      : {}),
    pricingSignal: service.pricingSignal,
    timeline: service.timeline,
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
      seoDescription: metaDescription(service.shortDescription),
      keywords: [service.category, service.group],
      ogType: "website",
      twitterCard: "summary_large_image",
    },
  });
}

/* ----------------------------- Service nav items ----------------------------- */

let navItemIndex = 0;
for (const group of serviceNavGroups) {
  group.items.forEach((item) => {
    navItemIndex += 1;
    add({
      _id: `subService-${navItemIndex}`,
      _type: "subService",
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

const INDUSTRY_BENTO_SPANS = ["2x1", "1x1", "1x1", "1x2", "1x1", "1x1"] as const;

function serviceRefsFromPopularLinks(links: { href: string }[]) {
  const seen = new Set<string>();

  return links
    .map((link) => {
      const match = link.href.match(/\/services\/([^/?#]+)/);
      if (!match) return null;
      const pathSlug = match[1];
      const serviceSlug = isParentServiceSlug(pathSlug)
        ? SERVICE_SLUG_BY_PARENT[pathSlug]
        : pathSlug;
      if (seen.has(serviceSlug)) return null;
      seen.add(serviceSlug);
      return { _type: "reference" as const, _ref: `service-${serviceSlug}` };
    })
    .filter((ref): ref is { _type: "reference"; _ref: string } => Boolean(ref));
}

function buildIndustryGlanceItems(parent: (typeof industryParents)[number]) {
  return [
    {
      title: "Who we build for",
      subtitle: "Your ideal client",
      body: parent.whoItIsFor,
      iconKey: "glance-audience",
    },
    {
      title: "What we build",
      subtitle: "What we ship",
      body: parent.whatWeBuild,
      iconKey: "glance-build",
    },
    {
      title: "Example outcome",
      subtitle: "Typical result",
      body: parent.exampleProject,
      iconKey: "glance-outcome",
    },
  ].filter((item) => item.body?.trim().length);
}

function buildIndustrySystemSteps(title: string) {
  const noun = title.toLowerCase();
  return [
    {
      label: "01",
      title: "Visitor lands",
      body: `Prospects find you on Google, ads, or referrals. Your ${noun} page must explain the offer fast.`,
    },
    {
      label: "02",
      title: "Inquiry captured",
      body: "Forms, calls, chat, and DMs route into one place instead of scattered inboxes.",
    },
    {
      label: "03",
      title: "Lead routed",
      body: "CRM assigns an owner, alerts the team, and triggers the right next step automatically.",
    },
    {
      label: "04",
      title: "Follow-up triggered",
      body: "Email, SMS, or AI receptionist responds in minutes, not hours or the next business day.",
    },
    {
      label: "05",
      title: "Booking or checkout",
      body: "Appointments, consults, orders, or contracts move forward with fewer manual handoffs.",
    },
    {
      label: "06",
      title: "Reporting updated",
      body: "Pipeline, revenue, and source data show up in a dashboard your team actually checks.",
    },
    {
      label: "07",
      title: "Retention loop",
      body: "Reviews, rebooking, replenishment, or nurture sequences run without someone remembering each time.",
    },
  ];
}

function buildIndustryProcessSteps() {
  return [
    {
      step: 1,
      title: "Map the current journey",
      description:
        "We audit how inquiries enter, get handled, and convert: calls, forms, DMs, booking, and follow-up.",
    },
    {
      step: 2,
      title: "Find the highest-leverage bottleneck",
      description:
        "We prioritize the fix that stops the most leaks: response time, intake, routing, or repeat revenue.",
    },
    {
      step: 3,
      title: "Build and connect the system",
      description:
        "We ship the website, automations, and dashboards wired to your CRM, calendar, and payment tools.",
    },
    {
      step: 4,
      title: "Launch, measure, and improve",
      description:
        "We go live, track what converts, and iterate without another full rebuild every quarter.",
    },
  ];
}

function buildIndustryBuildCards(parent: (typeof industryParents)[number]) {
  const spans = assignIndustryBuildSpans(parent.popularServices.length);
  return parent.popularServices.map((service, index) => ({
    title: service.label,
    body: parent.whatWeBuild,
    bestFor: parent.whoItIsFor.split(".")[0] ?? parent.whoItIsFor,
    serviceHref: service.href,
    span: spans[index] ?? INDUSTRY_BENTO_SPANS[index % INDUSTRY_BENTO_SPANS.length],
  }));
}

for (const parent of industryParents) {
  const landing = getIndustryLandingCopy(parent.slug);
  add({
    _id: `industryParent-${parent.slug}`,
    _type: "industryParent",
    title: parent.title,
    slug: { _type: "slug", current: parent.slug },
    category: parent.category,
    whoItIsFor: parent.whoItIsFor,
    whatWeBuild: parent.whatWeBuild,
    problemSolved: parent.problemSolved,
    heroHeadline: landing?.heroHeadline ?? parent.heroHeadline,
    hook: parent.hook,
    shortDescription: parent.shortDescription,
    industryOverview: parent.industryOverview,
    painPoints: parent.painPoints,
    popularServices: parent.popularServices,
    exampleProject: parent.exampleProject,
    commonUseCase: parent.commonUseCase,
    icon: parent.icon,
    order: parent.order,
    heroEyebrow: landing?.heroEyebrow,
    heroSubhead: landing?.heroSubhead,
    problemsHeadline: landing?.problemsHeadline,
    problems: landing?.problems,
    aiPressuresHeadline: landing?.aiPressuresHeadline,
    aiPressuresSubtext: landing?.aiPressuresSubtext,
    aiPressures: landing?.aiPressures,
    subIndustriesEyebrow: landing?.subIndustriesEyebrow,
    subIndustriesHeadline: landing?.subIndustriesHeadline,
    subIndustriesSubtext: landing?.subIndustriesSubtext,
    workEyebrow: landing?.workEyebrow,
    workHeadline: landing?.workHeadline,
    servicesEyebrow: landing?.servicesEyebrow,
    servicesHeadline: landing?.servicesHeadline,
    faqEyebrow: landing?.faqEyebrow,
    faqHeadline: landing?.faqHeadline,
    faqSubtext: landing?.faqSubtext,
    faqs: landing?.faqs,
    ctaHeading: landing?.ctaHeading,
    ctaSub: landing?.ctaSub,
    showLogoCarousel: true,
    logoCarouselLabel: "Trusted by teams across the US",
    glanceEyebrow: "At a glance",
    glanceHeading: "Built for your market, not a generic agency template",
    glanceItems: buildIndustryGlanceItems(parent),
    problemsEyebrow: "Diagnosis",
    problemsSubheading: landing?.aiPressuresSubtext,
    problemItems: landing?.problems,
    systemEyebrow: "Connected system",
    systemHeading: landing?.systemHeadline,
    systemSubheading: landing?.systemSubtext,
    systemSteps: buildIndustrySystemSteps(parent.title),
    buildsEyebrow: "Deliverables",
    buildsHeading: "What we build for this industry",
    buildsSubheading: parent.whatWeBuild,
    buildCards: buildIndustryBuildCards(parent),
    segmentsEyebrow: landing?.subIndustriesEyebrow,
    segmentsHeading: landing?.subIndustriesHeadline,
    segmentsSubheading: landing?.subIndustriesSubtext,
    processEyebrow: "Process",
    processHeading: "How we work with your team",
    processSteps: buildIndustryProcessSteps(),
    servicesSubheading:
      "Pick the parent service that matches your bottleneck. We wire it to your industry workflows.",
    servicesForThisIndustry: serviceRefsFromPopularLinks(parent.popularServices),
    proofEyebrow: "Proof",
    proofHeading: "What clients say",
    proofSubheading: "Real reviews from real projects",
    insightsEyebrow: "Insights",
    insightsHeading: "Related articles",
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
    description: `Insights about ${title.toLowerCase()} from ZedNova Studio.`,
    icon: CATEGORY_ICONS[title] ?? "insights",
    order: index + 1,
    seo: {
      _type: "seoFields",
      seoTitle: `${title} Insights`,
      seoDescription: `Insights about ${title.toLowerCase()} from ZedNova Studio.`,
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
  });
}

for (const post of posts) {
  const enrichment = buildPostEnrichment(post, posts);

  add({
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    category: {
      _type: "reference",
      _ref: `insightCategory-${slugify(post.category)}`,
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
    tags: post.tags.map((tagTitle) => ({
      _type: "reference",
      _key: slugify(tagTitle),
      _ref: `tag-${slugify(tagTitle)}`,
    })),
    ...enrichment,
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
    clientName: testimonial.authorName,
    clientRole: testimonial.authorTitle,
    clientCompany: testimonial.company,
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
