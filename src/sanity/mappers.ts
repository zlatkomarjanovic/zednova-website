/** Map Sanity document shapes to app types. */

import type { ArticleBlock, Industry, IndustryCategory, IndustryParent, Post, Service, ServiceGroup } from "@/lib/types";
import type { Migration } from "@/lib/types/content-nav";
import type {
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
  CustomSoftwareGroupSection,
} from "@/lib/types/content-nav";

type SanityService = {
  slug: string;
  number?: string;
  title: string;
  group: ServiceGroup;
  category?: string;
  icon?: string;
  shortDescription: string;
  whatItIs?: string;
  deliverables?: string[];
  idealClients?: string[];
  processSteps?: { step: number; title: string; description: string }[];
  results?: string[];
  pricingSignal?: string;
  timeline?: string;
  image?: string;
  order: number;
};

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
  exampleProject?: string;
  commonUseCase?: string;
  icon?: string;
  order: number;
  showInMainNav?: boolean;
  navOrder?: number;
};

type SanityIndustry = SanityIndustryFields & {
  parentSlug?: string;
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
    deliverables: doc.deliverables ?? [],
    idealClients: doc.idealClients ?? [],
    processSteps: doc.processSteps ?? [],
    results: doc.results ?? [],
    pricingSignal: doc.pricingSignal ?? "",
    timeline: doc.timeline ?? "",
    image: doc.image ?? "",
    order: doc.order,
  };
}

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
    exampleProject: doc.exampleProject ?? "",
    commonUseCase: doc.commonUseCase ?? "",
    icon: doc.icon ?? "",
    order: doc.order,
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
    exampleProject: doc.exampleProject ?? "",
    commonUseCase: doc.commonUseCase ?? "",
    icon: doc.icon ?? "",
    order: doc.order,
  };
}

export function mapMigration(doc: {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  order: number;
}): Migration {
  return {
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    description: doc.description,
    order: doc.order,
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
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  ogImage?: string;
  takeaways?: string[];
  faqs?: Post["faqs"];
  articleBlocks?: ArticleBlock[];
}): Post {
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
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    keywords: doc.keywords,
    ogImage: doc.ogImage,
    takeaways: doc.takeaways,
    faqs: doc.faqs,
    body: doc.articleBlocks ?? [],
  };
}

export function mapAuthor(doc: {
  slug: string;
  name: string;
  role?: string;
  bio?: string[];
  linkedin?: string;
  twitter?: string;
  upwork?: string;
  avatar?: string;
}) {
  return {
    slug: doc.slug,
    name: doc.name,
    role: doc.role ?? "",
    bio: doc.bio ?? [],
    linkedin: doc.linkedin,
    twitter: doc.twitter,
    upwork: doc.upwork,
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
