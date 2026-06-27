/** Nav and migration types shared by layout, mega menu, and CMS mappers. */

import type { ArticleFaq, FeatureBullet, SeoFields } from "@/lib/types";
import type { PlatformIcon } from "@/lib/migrations/platform-icons";

export type NavMenuItem = {
  title: string;
  shortDescription: string;
  href: string;
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
  includes: string;
  href: string;
};

export type CustomSoftwareGroupSection = {
  id: string;
  label: string;
  headline: string;
  description: string;
  items: NavMenuItem[];
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
  coverImageUrl?: string;
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

/** Top-level landing pages for each mega menu column. */
export const megaMenuNavLinks = {
  services: { label: "Services", href: "/services" },
  industries: { label: "Industries", href: "/industries" },
  "custom-software": {
    label: "Custom Software",
    href: "/custom-software",
  },
  migrations: { label: "Migrations", href: "/migrations" },
  insights: { label: "Insights", href: "/insights" },
} as const;
