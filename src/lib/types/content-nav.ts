/** Nav and migration types shared by layout, mega menu, and CMS mappers. */

import type { ArticleFaq, FeatureBullet, SeoFields } from "@/lib/types";
import type { PlatformIcon } from "@/lib/migrations/platform-icons";

export type NavMenuItem = {
  title: string;
  shortDescription: string;
  href: string;
  image?: string;
  icon?: {
    src: string;
    alt: string;
  };
};

export type NavMenuGroup = {
  group: string;
  items: NavMenuItem[];
};

export type ServiceMegaMenuCard = {
  title: string;
  shortDescription: string;
  /** Key deliverables rendered as chips in the mega menu. */
  includes: string[];
  href: string;
  startingPrice?: string;
  isFeatured?: boolean;
  isLegacy?: boolean;
};

export type Migration = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroHeadline?: string;
  heroSubhead?: string;
  sourcePlatform?: string;
  targetPlatform?: string;
  whatsIncluded?: FeatureBullet[];
  deliverables?: string[];
  processSteps?: { step: number; title: string; description: string }[];
  faqs?: ArticleFaq[];
  timeline?: string;
  pricingSignal?: string;
  image?: string;
  coverImage?: { url: string; alt?: string };
  fromIcons?: { url?: string; alt?: string }[];
  toIcons?: { url?: string; alt?: string }[];
  platformIcons?: { from: PlatformIcon[]; to: PlatformIcon[] };
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedInsights?: string[];
  relatedMigrations?: string[];
  tags?: string[];
  order: number;
  seo?: SeoFields;
};

/**
 * Top-level landing pages for mega menu columns.
 * Migrations live under Services → Lead-Gen Websites, not as a top-level item.
 * Custom Software lives under Services → Custom In-House Software for SMBs.
 */
export const megaMenuNavLinks = {
  services: { label: "Services", href: "/services" },
  work: { label: "Work", href: "/work" },
  industries: { label: "Industries", href: "/industries" },
  insights: { label: "Insights", href: "/insights" },
  contact: { label: "Contact", href: "/contact" },
} as const;
