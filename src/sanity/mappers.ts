/** Map Sanity document shapes to app types. */

import type {
  ArticleBlock,
  ArticleFaq,
  CaseStudy,
  FeatureBullet,
  Industry,
  IndustryCategory,
  IndustryParent,
  InsightCategory,
  Post,
  PriceTier,
  Product,
  ProductType,
  SeoFields,
  Service,
  ServiceGroup,
  Testimonial,
} from "@/lib/types";
import { uniqueFaqs, uniqueTakeaways } from "@/lib/insights/dedupe-aeo";
import { defaultProfileLinks } from "@/lib/content/profile-links";
import type { Migration } from "@/lib/types/content-nav";
import type {
  CustomSoftwareGroupSection,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
import type { PortfolioProject } from "@/lib/types";
import type {
  IndustryBuildCard,
  IndustryGlanceItem,
  IndustrySystemStep,
  IndustryTrustStat,
} from "@/lib/types/industry-page";
import { getParentSlugForServiceSlug, getServicePublicPath } from "@/lib/content/service-routes";
import type { FaqItem, SiteSettings } from "@/lib/types";
import { portableTextToArticleBlocks } from "@/sanity/portable-text-to-blocks";
import { resolveMigrationPlatformIcons } from "@/lib/migrations/platform-icons";

type SanityFeatureBullet = { title: string; description?: string; icon?: string };
type SanityPriceTier = {
  label: string;
  amount: number;
  currency: string;
  period?: string;
  features?: string[];
  featured?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};
type SanityFaq = { id?: string | { current?: string }; question: string; answer: string };

function normalizeFaqId(id?: string | { current?: string }): string | undefined {
  if (!id) return undefined;
  if (typeof id === "string") return id;
  return id.current;
}

function mapFeatureBullets(items?: SanityFeatureBullet[]): FeatureBullet[] {
  return (items ?? []).map((i) => ({
    title: i.title,
    description: i.description,
    icon: i.icon,
  }));
}

function mapPriceTiers(items?: SanityPriceTier[]): PriceTier[] {
  return (items ?? []).map((t) => ({
    label: t.label,
    amount: t.amount,
    currency: t.currency,
    period: t.period,
    features: t.features,
    featured: t.featured,
    ctaLabel: t.ctaLabel,
    ctaHref: t.ctaHref,
  }));
}

function mapFaqs(items?: SanityFaq[]): ArticleFaq[] {
  return (items ?? []).map((f) => ({
    id: normalizeFaqId(f.id),
    question: f.question,
    answer: f.answer,
  }));
}

function mapSeo(seo?: Record<string, unknown>): SeoFields | undefined {
  if (!seo) return undefined;
  const noIndex =
    (seo.seoNoIndex as boolean) ||
    (seo.robotsIndex === false ? true : undefined);
  return {
    seoTitle: (seo.seoTitle as string) || undefined,
    seoDescription: (seo.seoDescription as string) || undefined,
    keywords: seo.keywords as string[] | undefined,
    focusKeyword: (seo.focusKeyword as string) || undefined,
    secondaryKeywords: seo.secondaryKeywords as string[] | undefined,
    searchTags: seo.searchTags as string[] | undefined,
    seoCanonical: (seo.seoCanonical as string) || undefined,
    canonicalUrl: (seo.seoCanonical as string) || undefined,
    seoNoIndex: noIndex || undefined,
    seoHideFromLists: (seo.seoHideFromLists as boolean) || undefined,
    robotsIndex: seo.robotsIndex as boolean | undefined,
    robotsFollow: seo.robotsFollow as boolean | undefined,
    structuredDataType: (seo.structuredDataType as string) || undefined,
    jsonLdOverride: (seo.jsonLdOverride as string) || undefined,
    customJsonLd: (seo.jsonLdOverride as string) || undefined,
    ogTitle: (seo.ogTitle as string) || undefined,
    ogDescription: (seo.ogDescription as string) || undefined,
    ogImage: (seo.ogImage as string) || undefined,
    ogType: (seo.ogType as string) || undefined,
    twitterCard: (seo.twitterCard as string) || undefined,
    twitterTitle: (seo.twitterTitle as string) || undefined,
    twitterDescription: (seo.twitterDescription as string) || undefined,
    twitterImage: (seo.twitterImage as string) || undefined,
  };
}

function mergePostFaqs(
  inline?: SanityFaq[],
  refs?: SanityFaq[],
  richInline?: SanityFaq[],
): ArticleFaq[] {
  const combined = [
    ...mapFaqs(inline),
    ...mapFaqs(refs),
    ...mapFaqs(richInline),
  ];
  return uniqueFaqs(combined);
}

type SanityService = {
  slug: string;
  number?: string;
  title: string;
  group: ServiceGroup;
  category?: string;
  icon?: string;
  shortDescription: string;
  whatItIs?: string;
  heroHeadline?: string;
  heroSubhead?: string;
  whatsIncluded?: SanityFeatureBullet[];
  deliverables?: string[];
  idealClients?: string[];
  processSteps?: {
    step: number;
    title: string;
    description: string;
    deliverables?: string[];
    estimatedTime?: string;
    icon?: string;
    subtext?: string;
  }[];
  results?: string[];
  faqEyebrow?: string;
  faqHeadline?: string;
  faqSubtext?: string;
  faqs?: SanityFaq[];
  pricingSignal?: string;
  pricingTiers?: SanityPriceTier[];
  startingPrice?: number;
  timeline?: string;
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  relatedMigrations?: string[];
  tags?: string[];
  image?: string;
  order: number;
  heroEyebrow?: string;
  problemsHeadline?: string;
  problems?: { title: string; subheading?: string; description?: string; icon?: string }[];
  subServices?: { title: string; description?: string; icon?: string; span?: string }[];
  values?: { title: string; description: string; icon?: string }[];
  testimonials?: {
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
    rating?: number;
  }[];
  seo?: Record<string, unknown>;
};

export function mapService(doc: SanityService): Service {
  return {
    slug: doc.slug,
    number: doc.number ?? "",
    title: doc.title,
    group: doc.group,
    category: doc.category ?? "",
    icon: doc.icon ?? "",
    shortDescription: doc.shortDescription,
    whatItIs: doc.whatItIs ?? "",
    heroHeadline: doc.heroHeadline,
    heroSubhead: doc.heroSubhead,
    whatsIncluded: mapFeatureBullets(doc.whatsIncluded),
    deliverables: doc.deliverables ?? [],
    idealClients: doc.idealClients ?? [],
    processSteps: (doc.processSteps ?? []).map((step) => ({
      step: step.step,
      title: step.title,
      description: step.description,
      deliverables: step.deliverables,
      icon: step.icon,
    })),
    results: doc.results ?? [],
    faqEyebrow: doc.faqEyebrow,
    faqHeadline: doc.faqHeadline,
    faqSubtext: doc.faqSubtext,
    faqs: mapFaqs(doc.faqs),
    pricingSignal: doc.pricingSignal ?? "",
    pricingTiers: mapPriceTiers(doc.pricingTiers),
    startingPrice: doc.startingPrice,
    timeline: doc.timeline ?? "",
    relatedServices: doc.relatedServices,
    relatedIndustries: doc.relatedIndustries,
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedInsights: doc.relatedInsights,
    relatedMigrations: doc.relatedMigrations,
    tags: doc.tags ?? [],
    image: doc.image ?? "",
    order: doc.order,
    heroEyebrow: doc.heroEyebrow,
    problemsHeadline: doc.problemsHeadline,
    problems: (doc.problems ?? []).map((p) => ({
      title: p.title,
      subheading: p.subheading,
      description: p.description,
      icon: p.icon,
    })),
    subServices: (doc.subServices ?? []).map((s) => ({
      title: s.title,
      description: s.description,
      icon: s.icon,
      span: (s.span as "1x1" | "2x1" | "1x2" | "2x2" | undefined) ?? "1x1",
    })),
    values: doc.values ?? [],
    testimonials: (doc.testimonials ?? []).map((t) => ({
      quote: t.quote,
      author: t.author,
      role: t.role,
      avatar: t.avatar,
      rating: t.rating,
    })),
    seo: mapSeo(doc.seo),
  };
}

type SanityIndustryFields = {
  slug: string;
  title: string;
  category: IndustryCategory;
  whoItIsFor?: string;
  whatWeBuild?: string;
  problemSolved?: string;
  heroHeadline?: string;
  hook?: string;
  shortDescription: string;
  industryOverview?: string;
  painPoints?: { title: string; description: string }[];
  commonProblems?: { title: string; description: string }[];
  segmentSpecificProblems?: { title: string; description: string }[];
  problems?: { title: string; description: string }[];
  aiPressuresHeadline?: string;
  aiPressuresSubtext?: string;
  aiPressures?: { title: string; description: string }[];
  heroEyebrow?: string;
  heroSubhead?: string;
  problemsHeadline?: string;
  subIndustriesEyebrow?: string;
  subIndustriesHeadline?: string;
  subIndustriesSubtext?: string;
  featuredSubIndustrySlugs?: string[];
  workEyebrow?: string;
  workHeadline?: string;
  servicesEyebrow?: string;
  servicesHeadline?: string;
  faqEyebrow?: string;
  faqHeadline?: string;
  faqSubtext?: string;
  ctaHeading?: string;
  ctaSub?: string;
  popularServices?: { label: string; href: string }[];
  recommendedServiceLinks?: { label: string; href: string }[];
  faqs?: SanityFaq[];
  faqReferences?: SanityFaq[];
  exampleProject?: string;
  commonUseCase?: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
  order: number;
  showInMainNav?: boolean;
  navOrder?: number;
  relatedServices?: string[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  tags?: string[];
  seo?: Record<string, unknown>;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  showLogoCarousel?: boolean;
  logoCarouselLabel?: string;
  glanceEyebrow?: string;
  glanceHeading?: string;
  glanceSubheading?: string;
  glanceItems?: IndustryGlanceItem[];
  problemsEyebrow?: string;
  problemsSubheading?: string;
  problemsCtaLabel?: string;
  problemsCtaHref?: string;
  problemItems?: { title: string; description: string }[];
  systemEyebrow?: string;
  systemHeading?: string;
  systemSubheading?: string;
  systemSteps?: IndustrySystemStep[];
  buildsEyebrow?: string;
  buildsHeading?: string;
  buildsSubheading?: string;
  buildCards?: IndustryBuildCard[];
  segmentsEyebrow?: string;
  segmentsHeading?: string;
  segmentsSubheading?: string;
  servicesSubheading?: string;
  servicesForThisIndustrySlugs?: string[];
  processEyebrow?: string;
  processHeading?: string;
  processSubheading?: string;
  processSteps?: {
    step: number;
    title: string;
    description: string;
    deliverables?: string[];
    icon?: string;
  }[];
  insightsEyebrow?: string;
  insightsHeading?: string;
  insightsSubheading?: string;
  insightFilterTags?: string[];
  proofEyebrow?: string;
  proofHeading?: string;
  proofSubheading?: string;
  testimonialFilterTags?: string[];
  ctaEyebrow?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaMicrocopy?: string;
  trustStats?: IndustryTrustStat[];
};

function resolveServiceHref(href: string): string {
  const match = href.match(/^\/services\/([^/?#]+)/);
  if (!match) return href;
  const slug = match[1];
  return getParentSlugForServiceSlug(slug) ? getServicePublicPath(slug) : href;
}

function mapIndustryLandingProblems(doc: {
  problems?: { title: string; description: string }[];
  painPoints?: { title: string; description: string }[];
  segmentSpecificProblems?: { title: string; description: string }[];
  commonProblems?: { title: string; description: string }[];
}): { title: string; description: string }[] {
  if (doc.problems?.length) return doc.problems;
  return mapIndustryPainPoints(doc);
}

function mapIndustryPainPoints(doc: {
  painPoints?: { title: string; description: string }[];
  segmentSpecificProblems?: { title: string; description: string }[];
  commonProblems?: { title: string; description: string }[];
}): { title: string; description: string }[] {
  if (doc.painPoints?.length) return doc.painPoints;
  if (doc.segmentSpecificProblems?.length) {
    return doc.segmentSpecificProblems.map((item) => ({
      title: item.title,
      description: item.description,
    }));
  }
  if (doc.commonProblems?.length) {
    return doc.commonProblems.map((item) => ({
      title: item.title,
      description: item.description,
    }));
  }
  return [];
}

function mapIndustryPopularServices(doc: {
  popularServices?: { label: string; href: string }[];
  recommendedServiceLinks?: { label: string; href: string }[];
}): { label: string; href: string }[] {
  if (doc.popularServices?.length) return doc.popularServices;
  if (doc.recommendedServiceLinks?.length) return doc.recommendedServiceLinks;
  return [];
}

function mapIndustryFaqs(doc: {
  faqs?: SanityFaq[];
  faqReferences?: SanityFaq[];
}) {
  return mergePostFaqs(doc.faqs, doc.faqReferences);
}

type SanityIndustry = SanityIndustryFields & {
  parentSlug?: string;
};

export function mapIndustryParent(doc: SanityIndustryFields): IndustryParent {
  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    whoItIsFor: doc.whoItIsFor ?? "",
    whatWeBuild: doc.whatWeBuild ?? "",
    problemSolved: doc.problemSolved ?? "",
    heroHeadline: doc.heroHeadline ?? doc.title,
    hook: doc.hook ?? "",
    shortDescription: doc.shortDescription,
    industryOverview: doc.industryOverview,
    painPoints: mapIndustryPainPoints(doc),
    popularServices: mapIndustryPopularServices(doc),
    faqs: mapIndustryFaqs(doc),
    exampleProject: doc.exampleProject ?? "",
    commonUseCase: doc.commonUseCase ?? "",
    icon: doc.icon ?? "",
    image: doc.image,
    imageAlt: doc.imageAlt,
    order: doc.order,
    relatedServices: doc.relatedServices,
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedInsights: doc.relatedInsights,
    tags: doc.tags ?? [],
    seo: mapSeo(doc.seo),
    heroEyebrow: doc.heroEyebrow,
    heroSubhead: doc.heroSubhead,
    problemsHeadline: doc.problemsHeadline,
    problems: mapIndustryLandingProblems(doc),
    aiPressuresHeadline: doc.aiPressuresHeadline,
    aiPressuresSubtext: doc.aiPressuresSubtext,
    aiPressures: doc.aiPressures ?? [],
    subIndustriesEyebrow: doc.subIndustriesEyebrow,
    subIndustriesHeadline: doc.subIndustriesHeadline,
    subIndustriesSubtext: doc.subIndustriesSubtext,
    featuredSubIndustrySlugs: doc.featuredSubIndustrySlugs,
    workEyebrow: doc.workEyebrow,
    workHeadline: doc.workHeadline,
    servicesEyebrow: doc.servicesEyebrow,
    servicesHeadline: doc.servicesHeadline,
    faqEyebrow: doc.faqEyebrow,
    faqHeadline: doc.faqHeadline,
    faqSubtext: doc.faqSubtext,
    ctaHeading: doc.ctaHeading,
    ctaSub: doc.ctaSub,
    primaryCtaLabel: doc.primaryCtaLabel,
    primaryCtaHref: doc.primaryCtaHref,
    secondaryCtaLabel: doc.secondaryCtaLabel,
    secondaryCtaHref: doc.secondaryCtaHref,
    showLogoCarousel: doc.showLogoCarousel,
    logoCarouselLabel: doc.logoCarouselLabel,
    glanceEyebrow: doc.glanceEyebrow,
    glanceHeading: doc.glanceHeading,
    glanceSubheading: doc.glanceSubheading,
    glanceItems: doc.glanceItems,
    problemsEyebrow: doc.problemsEyebrow,
    problemsSubheading: doc.problemsSubheading,
    problemsCtaLabel: doc.problemsCtaLabel,
    problemsCtaHref: doc.problemsCtaHref,
    problemItems: doc.problemItems?.map((item) => ({
      title: item.title,
      body: item.description,
    })),
    systemEyebrow: doc.systemEyebrow,
    systemHeading: doc.systemHeading,
    systemSubheading: doc.systemSubheading,
    systemSteps: doc.systemSteps,
    buildsEyebrow: doc.buildsEyebrow,
    buildsHeading: doc.buildsHeading,
    buildsSubheading: doc.buildsSubheading,
    buildCards: doc.buildCards?.map((card) => ({
      ...card,
      serviceHref: card.serviceHref ? resolveServiceHref(card.serviceHref) : undefined,
    })),
    segmentsEyebrow: doc.segmentsEyebrow,
    segmentsHeading: doc.segmentsHeading,
    segmentsSubheading: doc.segmentsSubheading,
    servicesSubheading: doc.servicesSubheading,
    servicesForThisIndustrySlugs: doc.servicesForThisIndustrySlugs,
    processEyebrow: doc.processEyebrow,
    processHeading: doc.processHeading,
    processSubheading: doc.processSubheading,
    processSteps: (doc.processSteps ?? []).map((step) => ({
      step: step.step,
      title: step.title,
      description: step.description,
      deliverables: step.deliverables,
      icon: step.icon,
    })),
    insightsEyebrow: doc.insightsEyebrow,
    insightsHeading: doc.insightsHeading,
    insightsSubheading: doc.insightsSubheading,
    insightFilterTags: doc.insightFilterTags,
    proofEyebrow: doc.proofEyebrow,
    proofHeading: doc.proofHeading,
    proofSubheading: doc.proofSubheading,
    testimonialFilterTags: doc.testimonialFilterTags,
    ctaEyebrow: doc.ctaEyebrow,
    ctaPrimaryLabel: doc.ctaPrimaryLabel,
    ctaPrimaryHref: doc.ctaPrimaryHref,
    ctaSecondaryLabel: doc.ctaSecondaryLabel,
    ctaSecondaryHref: doc.ctaSecondaryHref,
    ctaMicrocopy: doc.ctaMicrocopy,
    trustStats: doc.trustStats,
  };
}

export function mapIndustry(doc: SanityIndustry): Industry {
  return {
    slug: doc.slug,
    parentSlug: doc.parentSlug ?? "",
    category: doc.category,
    title: doc.title,
    whoItIsFor: doc.whoItIsFor ?? "",
    whatWeBuild: doc.whatWeBuild ?? "",
    problemSolved: doc.problemSolved ?? "",
    heroHeadline: doc.heroHeadline ?? doc.title,
    hook: doc.hook ?? "",
    shortDescription: doc.shortDescription,
    painPoints: mapIndustryPainPoints(doc),
    popularServices: mapIndustryPopularServices(doc),
    faqs: mapIndustryFaqs(doc),
    exampleProject: doc.exampleProject ?? "",
    commonUseCase: doc.commonUseCase ?? "",
    icon: doc.icon ?? "",
    image: doc.image,
    imageAlt: doc.imageAlt,
    order: doc.order,
    relatedServices: doc.relatedServices,
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedInsights: doc.relatedInsights,
    tags: doc.tags ?? [],
    seo: mapSeo(doc.seo),
  };
}

export function mapMigration(doc: {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroHeadline?: string;
  heroSubhead?: string;
  sourcePlatform?: string;
  targetPlatform?: string;
  whatsIncluded?: SanityFeatureBullet[];
  deliverables?: string[];
  processSteps?: { step: number; title: string; description: string }[];
  faqs?: SanityFaq[];
  timeline?: string;
  pricingSignal?: string;
  image?: string;
  fromIcons?: { url?: string; alt?: string }[];
  toIcons?: { url?: string; alt?: string }[];
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedInsights?: string[];
  relatedMigrations?: string[];
  tags?: string[];
  order: number;
  seo?: Record<string, unknown>;
}): Migration {
  const mapped = {
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    description: doc.description,
    heroHeadline: doc.heroHeadline,
    heroSubhead: doc.heroSubhead,
    sourcePlatform: doc.sourcePlatform,
    targetPlatform: doc.targetPlatform,
    whatsIncluded: mapFeatureBullets(doc.whatsIncluded),
    deliverables: doc.deliverables ?? [],
    processSteps: doc.processSteps ?? [],
    faqs: mapFaqs(doc.faqs),
    timeline: doc.timeline,
    pricingSignal: doc.pricingSignal,
    image: doc.image,
    fromIcons: doc.fromIcons,
    toIcons: doc.toIcons,
    relatedServices: doc.relatedServices,
    relatedIndustries: doc.relatedIndustries,
    relatedInsights: doc.relatedInsights,
    relatedMigrations: doc.relatedMigrations,
    tags: doc.tags ?? [],
    order: doc.order,
    seo: mapSeo(doc.seo),
  };

  return {
    ...mapped,
    platformIcons: resolveMigrationPlatformIcons(mapped) ?? undefined,
  };
}

export function mapCustomSoftware(doc: {
  slug: string;
  title: string;
  shortDescription: string;
  whatItIs?: string;
  problemSolved?: string;
  targetAudience?: string[];
  keyFeatures?: { title: string; description?: string }[];
  whatsIncluded?: { title: string; description?: string }[];
  deliverables?: string[];
  technologies?: string[];
  integrations?: string[];
  process?: { step: number; title: string; description: string }[];
  timeline?: string;
  startingPrice?: number;
  softwareType?: string;
  faqs?: SanityFaq[];
  faqReferences?: SanityFaq[];
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedCaseStudies?: string[];
  relatedPortfolioProjects?: string[];
  relatedInsights?: string[];
  order: number;
  image?: string;
  seo?: Record<string, unknown>;
}): import("@/lib/types/custom-software").CustomSoftware {
  const mapBullets = (items?: { title: string; description?: string }[]) =>
    items?.map((item) => ({
      title: item.title,
      description: item.description,
    }));

  return {
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    whatItIs: doc.whatItIs ?? doc.shortDescription,
    problemSolved: doc.problemSolved,
    targetAudience: doc.targetAudience,
    keyFeatures: mapBullets(doc.keyFeatures),
    whatsIncluded: mapBullets(doc.whatsIncluded),
    deliverables: doc.deliverables,
    technologies: doc.technologies,
    integrations: doc.integrations,
    processSteps: doc.process,
    timeline: doc.timeline,
    startingPrice: doc.startingPrice,
    softwareType: doc.softwareType,
    faqs: mergePostFaqs(doc.faqs, doc.faqReferences),
    relatedServices: doc.relatedServices,
    relatedIndustries: doc.relatedIndustries,
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedPortfolioProjects: doc.relatedPortfolioProjects,
    relatedInsights: doc.relatedInsights,
    order: doc.order,
    image: doc.image,
    seo: mapSeo(doc.seo),
  };
}

export function mapCustomSoftwareNavItem(doc: {
  slug?: string;
  title: string;
  shortDescription: string;
  href?: string;
  navIcon?: { url?: string; alt?: string };
}): NavMenuItem {
  const href =
    doc.slug && doc.slug.length > 0
      ? `/custom-software/${doc.slug}`
      : (doc.href ?? "/custom-software");

  return {
    title: doc.title,
    shortDescription: doc.shortDescription,
    href,
    icon: doc.navIcon?.url
      ? {
          src: doc.navIcon.url,
          alt: doc.navIcon.alt ?? doc.title,
        }
      : undefined,
  };
}

export function mapMegaMenuCard(doc: {
  title: string;
  shortDescription: string;
  includes: string;
  href: string;
  startingPrice?: string;
  isFeatured?: boolean;
  isLegacy?: boolean;
}): ServiceMegaMenuCard {
  return {
    title: doc.title,
    shortDescription: doc.shortDescription,
    includes: doc.includes,
    href: doc.href,
    startingPrice: doc.startingPrice,
    isFeatured: doc.isFeatured,
    isLegacy: doc.isLegacy,
  };
}

export function groupServiceNavItems(
  items: (NavMenuItem & { navGroup: string; order: number; image?: string })[],
): NavMenuGroup[] {
  const groups = new Map<string, NavMenuItem[]>();
  const primaryGroupOrder = [
    "Lead-Gen Websites & AI Search",
    "CRM & Follow-Up Automation",
    "AI Receptionist & Booking Automation",
    "Custom In-House Software for SMBs",
    "Platform Migrations",
    "Monthly Support & Improvements",
  ];

  /** Map legacy Sanity navGroup values onto current parent groups. */
  const navGroupAliases: Record<string, string> = {
    Websites: "Lead-Gen Websites & AI Search",
    Automation: "CRM & Follow-Up Automation",
    "AI Tools": "AI Receptionist & Booking Automation",
    "Custom Software": "Custom In-House Software for SMBs",
    "Website Migrations": "Platform Migrations",
  };

  for (const item of [...items].sort((a, b) => a.order - b.order)) {
    const groupKey = navGroupAliases[item.navGroup] ?? item.navGroup;
    const list = groups.get(groupKey) ?? [];
    list.push({
      title: item.title,
      shortDescription: item.shortDescription,
      href: item.href,
      ...(item.image ? { image: item.image } : {}),
    });
    groups.set(groupKey, list);
  }

  const orderedPrimary = primaryGroupOrder
    .filter((g) => groups.has(g))
    .map((group) => ({ group, items: groups.get(group)! }));

  const legacy = [...groups.keys()]
    .filter((g) => !primaryGroupOrder.includes(g))
    .map((group) => ({ group, items: groups.get(group)! }));

  return [...orderedPrimary, ...legacy];
}

export function buildCustomSoftwareGroups(
  items: {
    slug?: string;
    title: string;
    shortDescription: string;
    href?: string;
    order: number;
    sectionId?: string;
    sectionLabel?: string;
    sectionHeadline?: string;
    sectionDescription?: string;
    sectionOrder?: number;
  }[],
): CustomSoftwareGroupSection[] {
  const sectionMap = new Map<string, CustomSoftwareGroupSection>();

  for (const item of [...items].sort((a, b) => a.order - b.order)) {
    const sectionId = item.sectionId ?? "other";
    if (!sectionMap.has(sectionId)) {
      sectionMap.set(sectionId, {
        id: sectionId,
        label: item.sectionLabel ?? sectionId,
        headline: item.sectionHeadline ?? "",
        description: item.sectionDescription ?? "",
        items: [],
      });
    }
    sectionMap.get(sectionId)!.items.push(mapCustomSoftwareNavItem(item));
  }

  return [...sectionMap.values()].sort((a, b) => {
    const orderA =
      items.find((i) => i.sectionId === a.id)?.sectionOrder ?? 999;
    const orderB =
      items.find((i) => i.sectionId === b.id)?.sectionOrder ?? 999;
    return orderA - orderB;
  });
}

function mapOpenGraph(og?: Record<string, unknown>) {
  if (!og) return undefined;
  return {
    ogTitle: (og.ogTitle as string) || undefined,
    ogDescription: (og.ogDescription as string) || undefined,
    ogImage: (og.ogImage as string) || undefined,
    ogType: (og.ogType as string) || undefined,
    twitterTitle: (og.twitterTitle as string) || undefined,
    twitterDescription: (og.twitterDescription as string) || undefined,
    twitterImage: (og.twitterImage as string) || undefined,
    twitterCardType: (og.twitterCardType as string) || undefined,
  };
}

function mapSchemaMarkup(schema?: Record<string, unknown>) {
  if (!schema) return undefined;
  return {
    schemaType: (schema.schemaType as string) || undefined,
    enableArticleSchema: schema.enableArticleSchema as boolean | undefined,
    enableFaqSchema: schema.enableFaqSchema as boolean | undefined,
    enableBreadcrumbSchema: schema.enableBreadcrumbSchema as boolean | undefined,
    enableServiceSchema: schema.enableServiceSchema as boolean | undefined,
    enableProductSchema: schema.enableProductSchema as boolean | undefined,
    enableOrganizationSchema: schema.enableOrganizationSchema as boolean | undefined,
    enableCollectionPageSchema: schema.enableCollectionPageSchema as boolean | undefined,
    serviceType: (schema.serviceType as string) || undefined,
    areaServed: schema.areaServed as string[] | undefined,
    providerName: (schema.providerName as string) || undefined,
    priceRange: (schema.priceRange as string) || undefined,
  };
}

function resolvePostBody(doc: {
  body?: Parameters<typeof portableTextToArticleBlocks>[0];
}): ArticleBlock[] {
  return portableTextToArticleBlocks(doc.body);
}

export function mapPost(doc: {
  slug: string;
  title: string;
  excerpt: string;
  oneSentenceSummary?: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  lastReviewedAt?: string;
  readTime: number;
  featured: boolean;
  pinned?: boolean;
  contentType?: string;
  difficulty?: string;
  accent: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  imageCaption?: string;
  tags?: string[];
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedMigrations?: string[];
  relatedCustomSoftware?: string[];
  relatedProducts?: string[];
  relatedCaseStudies?: string[];
  relatedPortfolioProjects?: string[];
  relatedPosts?: string[];
  seo?: Record<string, unknown>;
  mergedSeo?: Record<string, unknown>;
  takeaways?: string[];
  faqReferences?: SanityFaq[];
  inlineFaqs?: SanityFaq[];
  aiSummary?: string;
  llmSnippet?: string;
  quickAnswer?: { question?: string; shortAnswer?: string };
  searchIntent?: string;
  targetAudience?: string[];
  painPoints?: string[];
  searchQuestions?: string[];
  entitiesMentioned?: string[];
  sources?: { title?: string; url?: string; publisher?: string; note?: string }[];
  implementationTable?: {
    fix?: string;
    problem?: string;
    change?: string;
    metric?: string;
    tool?: string;
  }[];
  tableOfContentsEnabled?: boolean;
  openGraph?: Record<string, unknown>;
  schemaMarkup?: Record<string, unknown>;
  primaryCtaTitle?: string;
  primaryCtaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaTitle?: string;
  secondaryCtaDescription?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  body?: Parameters<typeof portableTextToArticleBlocks>[0];
}): Post {
  const seo = mapSeo(doc.mergedSeo ?? doc.seo);
  const allFaqs = mergePostFaqs(undefined, doc.faqReferences, doc.inlineFaqs);
  const schemaMarkup = mapSchemaMarkup(doc.schemaMarkup);
  const hasSchemaMarkup =
    schemaMarkup && Object.values(schemaMarkup).some((value) => value !== undefined);

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    oneSentenceSummary: doc.oneSentenceSummary,
    category: doc.category,
    author: doc.author,
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt,
    lastReviewedAt: doc.lastReviewedAt,
    readTime: doc.readTime,
    featured: doc.featured,
    pinned: doc.pinned,
    contentType: doc.contentType,
    difficulty: doc.difficulty,
    accent: doc.accent,
    image: doc.image ?? "",
    imageWidth: doc.imageWidth,
    imageHeight: doc.imageHeight,
    imageAlt: doc.imageAlt,
    imageCaption: doc.imageCaption,
    tags: doc.tags ?? [],
    relatedServices: doc.relatedServices,
    relatedIndustries: doc.relatedIndustries,
    relatedMigrations: doc.relatedMigrations,
    relatedCustomSoftware: doc.relatedCustomSoftware,
    relatedProducts: doc.relatedProducts,
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedPortfolioProjects: doc.relatedPortfolioProjects,
    relatedPosts: doc.relatedPosts,
    seoTitle: seo?.seoTitle,
    seoDescription: seo?.seoDescription,
    keywords: seo?.keywords,
    ogImage: seo?.ogImage,
    takeaways: doc.takeaways?.length ? uniqueTakeaways(doc.takeaways) : undefined,
    faqs: allFaqs,
    faqReferences: mapFaqs(doc.faqReferences),
    inlineFaqs: mapFaqs(doc.inlineFaqs),
    aiSummary: doc.aiSummary,
    llmSnippet: doc.llmSnippet,
    quickAnswer: doc.quickAnswer,
    searchIntent: doc.searchIntent,
    targetAudience: doc.targetAudience,
    painPoints: doc.painPoints,
    searchQuestions: doc.searchQuestions,
    entitiesMentioned: doc.entitiesMentioned,
    tableOfContentsEnabled: doc.tableOfContentsEnabled ?? true,
    openGraph: mapOpenGraph(doc.openGraph),
    schemaMarkup: hasSchemaMarkup ? schemaMarkup : undefined,
    primaryCtaTitle: doc.primaryCtaTitle,
    primaryCtaDescription: doc.primaryCtaDescription,
    primaryCtaLabel: doc.primaryCtaLabel,
    primaryCtaHref: doc.primaryCtaHref,
    secondaryCtaTitle: doc.secondaryCtaTitle,
    secondaryCtaDescription: doc.secondaryCtaDescription,
    secondaryCtaLabel: doc.secondaryCtaLabel,
    secondaryCtaHref: doc.secondaryCtaHref,
    sources: doc.sources
      ?.filter((s) => s.title && s.url)
      .map((s) => ({
        title: s.title!,
        url: s.url!,
        publisher: s.publisher,
        note: s.note,
      })),
    implementationTable: doc.implementationTable
      ?.filter((row) => row.fix && row.problem)
      .map((row) => ({
        fix: row.fix!,
        problem: row.problem!,
        change: row.change ?? "",
        metric: row.metric ?? "",
        tool: row.tool ?? "",
      })),
    body: resolvePostBody(doc),
    seo,
  };
}

export function mapAuthor(doc: {
  slug: string;
  name: string;
  role?: string;
  bio?: string[];
  shortBio?: string;
  linkedin?: string;
  twitter?: string;
  upwork?: string;
  website?: string;
  avatar?: string;
}) {
  return {
    slug: doc.slug,
    name: doc.name,
    role: doc.role ?? "",
    bio: doc.bio?.length ? doc.bio : doc.shortBio ? [doc.shortBio] : [],
    shortBio: doc.shortBio,
    linkedin: doc.linkedin,
    twitter: doc.twitter,
    upwork: doc.upwork,
    website: doc.website,
    avatar: doc.avatar,
  };
}

export function mapIndustryNavItem(doc: {
  title: string;
  shortDescription: string;
  slug: string;
  docType: "industryParent";
  navOrder?: number;
}): NavMenuItem & { navOrder: number } {
  return {
    title: doc.title,
    shortDescription: doc.shortDescription,
    href: `/industries/${doc.slug}`,
    navOrder: doc.navOrder ?? 999,
  };
}

export function mapCaseStudy(doc: {
  slug: string;
  title: string;
  client: string;
  industry: string;
  servicesUsed?: string[];
  timeline?: string;
  resultHeadline: string;
  challenge?: string;
  solution?: string[] | string;
  results?: { value: string; label: string }[] | string[];
  techStack?: string[];
  workflow?: { title: string; description: string }[];
  timelinePhases?: { label: string; duration: string; description?: string }[];
  screenshots?: { src?: string; alt: string; caption?: string }[];
  imageAlt?: string;
  testimonialId?: string;
  faqs?: SanityFaq[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  featured?: boolean;
  accent?: string;
  image?: string;
  seo?: Record<string, unknown>;
}): CaseStudy {
  const solution = Array.isArray(doc.solution)
    ? doc.solution
    : doc.solution
      ? doc.solution.split(/\n\n+/).map((part) => part.trim()).filter(Boolean)
      : [];

  const results = (doc.results ?? []).map((entry) =>
    typeof entry === "string"
      ? { value: entry, label: "" }
      : entry,
  );

  return {
    slug: doc.slug,
    title: doc.title,
    client: doc.client,
    industry: doc.industry,
    servicesUsed: doc.servicesUsed ?? [],
    timeline: doc.timeline ?? "",
    resultHeadline: doc.resultHeadline,
    challenge: doc.challenge ?? "",
    solution,
    results,
    techStack: doc.techStack ?? [],
    workflow: doc.workflow,
    timelinePhases: doc.timelinePhases,
    screenshots: doc.screenshots
      ?.filter((shot) => shot.src)
      .map((shot) => ({
        src: shot.src!,
        alt: shot.alt,
        caption: shot.caption,
      })),
    imageAlt: doc.imageAlt,
    testimonialId: doc.testimonialId,
    faqs: mapFaqs(doc.faqs),
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedInsights: doc.relatedInsights,
    featured: doc.featured ?? false,
    accent: doc.accent ?? "#1c1917",
    image: doc.image ?? "",
    seo: mapSeo(doc.seo),
  };
}

export function mapPortfolioProject(doc: {
  slug: string;
  title: string;
  client: string;
  summary: string;
  href: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  accent?: string;
  category?: string;
  year?: number;
  servicesUsed?: string[];
  relatedIndustries?: string[];
  relatedCaseStudies?: string[];
  tags?: string[];
  order: number;
  logo?: { src?: string; alt?: string; lightVariant?: boolean };
  seo?: Record<string, unknown>;
}): PortfolioProject {
  return {
    slug: doc.slug,
    title: doc.title,
    client: doc.client,
    summary: doc.summary,
    href: doc.href,
    image: doc.image ?? "",
    imageAlt: doc.imageAlt ?? doc.title,
    video: doc.video,
    accent: doc.accent ?? "#1c1917",
    category: doc.category ?? "Websites",
    year: doc.year,
    servicesUsed: doc.servicesUsed,
    relatedIndustries: doc.relatedIndustries,
    relatedCaseStudies: doc.relatedCaseStudies,
    tags: doc.tags ?? [],
    order: doc.order,
    logo: doc.logo?.src
      ? {
          src: doc.logo.src,
          alt: doc.logo.alt ?? doc.client,
          lightVariant: doc.logo.lightVariant,
        }
      : undefined,
    seo: mapSeo(doc.seo),
  };
}

export function mapProduct(doc: {
  slug: string;
  title: string;
  type?: string;
  tagline?: string;
  description?: string;
  features?: SanityFeatureBullet[] | string[];
  featureList?: string[];
  status: string;
  pricingTiers?: SanityPriceTier[];
  startingPrice?: number;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  resourceFile?: string;
  externalUrl?: string;
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedInsights?: string[];
  tags?: string[];
  order: number;
  seo?: Record<string, unknown>;
}): Product {
  const featureBullets = Array.isArray(doc.features)
    ? (doc.features as Array<SanityFeatureBullet | string>)
        .map((f) => (typeof f === "string" ? { title: f } : f))
        .filter(Boolean) as SanityFeatureBullet[]
    : [];
  const featureStrings = (doc.featureList ?? (Array.isArray(doc.features) ? (doc.features as unknown[]).filter((f): f is string => typeof f === "string") : []));
  return {
    slug: doc.slug,
    title: doc.title,
    type: (doc.type ?? "software") as ProductType,
    tagline: doc.tagline ?? "",
    description: doc.description ?? "",
    features: mapFeatureBullets(featureBullets),
    featureList: featureStrings,
    status: doc.status as Product["status"],
    pricingTiers: mapPriceTiers(doc.pricingTiers),
    startingPrice: doc.startingPrice,
    ctaLabel: doc.ctaLabel ?? "",
    ctaHref: doc.ctaHref ?? "",
    image: doc.image,
    resourceFile: doc.resourceFile,
    externalUrl: doc.externalUrl,
    relatedServices: doc.relatedServices,
    relatedIndustries: doc.relatedIndustries,
    relatedInsights: doc.relatedInsights,
    tags: doc.tags ?? [],
    order: doc.order,
    seo: mapSeo(doc.seo),
  };
}

function normalizeTestimonialImage(image?: string): string | undefined {
  if (!image) return undefined;
  if (image.startsWith("/")) return image;

  try {
    const url = new URL(image);
    if (
      url.hostname === "zednova.com" ||
      url.hostname === "www.zednova.com" ||
      url.hostname === "zednova.studio" ||
      url.hostname === "www.zednova.studio"
    ) {
      return `${url.pathname}${url.search}`;
    }
  } catch {
    return image;
  }

  return image;
}

export function mapTestimonial(doc: {
  id: string;
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
  industry?: string;
  image?: string;
  platform?: boolean;
  platformSource?: string;
  platformUrl?: string;
  rating?: number;
  relatedServices?: string[];
  relatedCaseStudies?: string[];
  featured?: boolean;
}): Testimonial {
  return {
    id: doc.id,
    quote: doc.quote,
    authorName: doc.authorName ?? "",
    authorTitle: doc.authorTitle ?? "",
    company: doc.company ?? "",
    industry: doc.industry ?? "",
    image: normalizeTestimonialImage(doc.image),
    platform: doc.platform,
    platformSource: doc.platformSource,
    platformUrl: doc.platformUrl,
    rating: doc.rating,
    relatedServices: doc.relatedServices,
    relatedCaseStudies: doc.relatedCaseStudies,
    featured: doc.featured ?? false,
  };
}

export function mapSiteSettings(doc: {
  siteTitle: string;
  siteDescription: string;
  siteUrl?: string;
  announcementBar?: string;
  contactEmail: string;
  contactPhone?: string;
  responseTime: string;
  address?: string;
  officeHours?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
  };
  profileLinks?: {
    crunchbase?: string;
    clutch?: string;
    goodfirms?: string;
    linkedinCompany?: string;
  };
  stats: { value: string; label: string }[];
  twitterCreator?: string;
  defaultOgImage?: string;
  defaultSeo?: Record<string, unknown>;
  headerScripts?: string;
}): SiteSettings {
  return {
    siteTitle: doc.siteTitle,
    siteDescription: doc.siteDescription,
    siteUrl: doc.siteUrl,
    announcementBar: doc.announcementBar,
    contactEmail: doc.contactEmail,
    contactPhone: doc.contactPhone,
    responseTime: doc.responseTime,
    address: doc.address,
    officeHours: doc.officeHours,
    socialLinks: doc.socialLinks,
    profileLinks: {
      ...defaultProfileLinks,
      ...doc.profileLinks,
    },
    stats: doc.stats,
    twitterCreator: doc.twitterCreator,
    defaultOgImage: doc.defaultOgImage,
    defaultSeo: mapSeo(doc.defaultSeo),
    headerScripts: doc.headerScripts,
  };
}

export function mapFaq(doc: {
  id: string;
  question: string;
  answer: string;
  category?: string;
  scopeServices?: string[];
  scopeIndustries?: string[];
  scopeMigrations?: string[];
  tags?: string[];
  order: number;
}): FaqItem {
  return {
    id: doc.id,
    question: doc.question,
    answer: doc.answer,
    category: doc.category,
    scopeServices: doc.scopeServices,
    scopeIndustries: doc.scopeIndustries,
    scopeMigrations: doc.scopeMigrations,
    tags: doc.tags,
    order: doc.order,
  };
}

export function mapInsightCategory(doc: {
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  colorLabel?: string;
  order: number;
  featured?: boolean;
  postCount?: number;
}): InsightCategory {
  return {
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    icon: doc.icon,
    colorLabel: doc.colorLabel,
    order: doc.order,
    featured: doc.featured,
    postCount: doc.postCount ?? 0,
  };
}
