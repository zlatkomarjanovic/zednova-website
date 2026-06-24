/** Map Sanity document shapes to app types. */

import type {
  ArticleBlock,
  ArticleFaq,
  CaseStudy,
  FeatureBullet,
  Industry,
  IndustryCategory,
  IndustryParent,
  Post,
  PriceTier,
  Product,
  ProductType,
  SeoFields,
  Service,
  ServiceGroup,
  Testimonial,
} from "@/lib/types";
import type { Migration } from "@/lib/types/content-nav";
import type {
  CustomSoftwareGroupSection,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
import type { PortfolioProject } from "@/lib/types";
import type { FaqItem, SiteSettings } from "@/lib/types";

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
type SanityFaq = { id?: string; question: string; answer: string };

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
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));
}

function mapSeo(seo?: Record<string, unknown>): SeoFields | undefined {
  if (!seo) return undefined;
  return {
    seoTitle: (seo.seoTitle as string) || undefined,
    seoDescription: (seo.seoDescription as string) || undefined,
    keywords: seo.keywords as string[] | undefined,
    seoCanonical: (seo.seoCanonical as string) || undefined,
    seoNoIndex: (seo.seoNoIndex as boolean) || undefined,
    seoHideFromLists: (seo.seoHideFromLists as boolean) || undefined,
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
  processSteps?: { step: number; title: string; description: string }[];
  results?: string[];
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
    processSteps: doc.processSteps ?? [],
    results: doc.results ?? [],
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
  painPoints?: { title: string; description: string }[];
  popularServices?: { label: string; href: string }[];
  faqs?: SanityFaq[];
  exampleProject?: string;
  commonUseCase?: string;
  icon?: string;
  image?: string;
  order: number;
  showInMainNav?: boolean;
  navOrder?: number;
  relatedServices?: string[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  tags?: string[];
  seo?: Record<string, unknown>;
};

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
    heroHeadline: doc.heroHeadline ?? "",
    hook: doc.hook ?? "",
    shortDescription: doc.shortDescription,
    painPoints: doc.painPoints ?? [],
    popularServices: doc.popularServices ?? [],
    faqs: mapFaqs(doc.faqs),
    exampleProject: doc.exampleProject ?? "",
    commonUseCase: doc.commonUseCase ?? "",
    icon: doc.icon ?? "",
    image: doc.image,
    order: doc.order,
    relatedServices: doc.relatedServices,
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedInsights: doc.relatedInsights,
    tags: doc.tags ?? [],
    seo: mapSeo(doc.seo),
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
    heroHeadline: doc.heroHeadline ?? "",
    hook: doc.hook ?? "",
    shortDescription: doc.shortDescription,
    painPoints: doc.painPoints ?? [],
    popularServices: doc.popularServices ?? [],
    faqs: mapFaqs(doc.faqs),
    exampleProject: doc.exampleProject ?? "",
    commonUseCase: doc.commonUseCase ?? "",
    icon: doc.icon ?? "",
    image: doc.image,
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
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedInsights?: string[];
  relatedMigrations?: string[];
  tags?: string[];
  order: number;
  seo?: Record<string, unknown>;
}): Migration {
  return {
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
    relatedServices: doc.relatedServices,
    relatedIndustries: doc.relatedIndustries,
    relatedInsights: doc.relatedInsights,
    relatedMigrations: doc.relatedMigrations,
    tags: doc.tags ?? [],
    order: doc.order,
    seo: mapSeo(doc.seo),
  };
}

export function mapNavItem(doc: {
  title: string;
  shortDescription: string;
  href: string;
}): NavMenuItem {
  return {
    title: doc.title,
    shortDescription: doc.shortDescription,
    href: doc.href,
  };
}

export function mapMegaMenuCard(doc: {
  title: string;
  shortDescription: string;
  includes: string;
  href: string;
}): ServiceMegaMenuCard {
  return {
    title: doc.title,
    shortDescription: doc.shortDescription,
    includes: doc.includes,
    href: doc.href,
  };
}

export function groupServiceNavItems(
  items: (NavMenuItem & { navGroup: string; order: number })[],
): NavMenuGroup[] {
  const groups = new Map<string, NavMenuItem[]>();
  const groupOrder = [
    "Websites",
    "Shopify & Ecommerce",
    "Custom Software",
    "Automation",
    "AI Tools",
  ];

  for (const item of [...items].sort((a, b) => a.order - b.order)) {
    const list = groups.get(item.navGroup) ?? [];
    list.push({
      title: item.title,
      shortDescription: item.shortDescription,
      href: item.href,
    });
    groups.set(item.navGroup, list);
  }

  return groupOrder
    .filter((g) => groups.has(g))
    .map((group) => ({ group, items: groups.get(group)! }));
}

export function buildCustomSoftwareGroups(
  items: {
    title: string;
    shortDescription: string;
    href: string;
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
    sectionMap.get(sectionId)!.items.push({
      title: item.title,
      shortDescription: item.shortDescription,
      href: item.href,
    });
  }

  return [...sectionMap.values()].sort((a, b) => {
    const orderA =
      items.find((i) => i.sectionId === a.id)?.sectionOrder ?? 999;
    const orderB =
      items.find((i) => i.sectionId === b.id)?.sectionOrder ?? 999;
    return orderA - orderB;
  });
}

export function mapPost(doc: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
  accent: string;
  image?: string;
  tags?: string[];
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedMigrations?: string[];
  relatedCustomSoftware?: string[];
  relatedProducts?: string[];
  relatedCaseStudies?: string[];
  relatedPosts?: string[];
  seo?: Record<string, unknown>;
  takeaways?: string[];
  faqs?: SanityFaq[];
  articleBlocks?: ArticleBlock[];
}): Post {
  const seo = mapSeo(doc.seo);
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    author: doc.author,
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt,
    readTime: doc.readTime,
    featured: doc.featured,
    accent: doc.accent,
    image: doc.image ?? "",
    tags: doc.tags ?? [],
    relatedServices: doc.relatedServices,
    relatedIndustries: doc.relatedIndustries,
    relatedMigrations: doc.relatedMigrations,
    relatedCustomSoftware: doc.relatedCustomSoftware,
    relatedProducts: doc.relatedProducts,
    relatedCaseStudies: doc.relatedCaseStudies,
    relatedPosts: doc.relatedPosts,
    seoTitle: seo?.seoTitle,
    seoDescription: seo?.seoDescription,
    keywords: seo?.keywords,
    ogImage: seo?.ogImage,
    takeaways: doc.takeaways,
    faqs: mapFaqs(doc.faqs),
    body: doc.articleBlocks ?? [],
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
    bio: doc.bio ?? [],
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
  docType: "industryParent" | "industry";
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
  solution?: string[];
  results?: { value: string; label: string }[];
  techStack?: string[];
  testimonialId?: string;
  faqs?: SanityFaq[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  featured?: boolean;
  accent?: string;
  image?: string;
  seo?: Record<string, unknown>;
}): CaseStudy {
  return {
    slug: doc.slug,
    title: doc.title,
    client: doc.client,
    industry: doc.industry,
    servicesUsed: doc.servicesUsed ?? [],
    timeline: doc.timeline ?? "",
    resultHeadline: doc.resultHeadline,
    challenge: doc.challenge ?? "",
    solution: doc.solution ?? [],
    results: doc.results ?? [],
    techStack: doc.techStack ?? [],
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
    authorName: doc.authorName,
    authorTitle: doc.authorTitle ?? "",
    company: doc.company ?? "",
    industry: doc.industry ?? "",
    image: doc.image,
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
