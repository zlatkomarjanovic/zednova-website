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
  startingPrice?: string;
  isFeatured?: boolean;
  isLegacy?: boolean;
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
 * Custom Software lives under Services → Portals & Dashboards.
 */
export const megaMenuNavLinks = {
  services: { label: "Services", href: "/services" },
  work: { label: "Work", href: "/work" },
  industries: { label: "Industries", href: "/industries" },
  insights: { label: "Insights", href: "/insights" },
  contact: { label: "Contact", href: "/contact" },
} as const;

/**
 * The 5 parent services that drive homepage cards, services page, footer, and nav.
 * Monthly Support is a support layer, not a primary homepage card unless needed.
 */
export const PARENT_SERVICE_SLUGS = [
  "lead-gen-websites",
  "crm-automation",
  "ai-receptionist",
  "portals-dashboards",
  "monthly-support",
] as const;

export const PARENT_SERVICE_LABELS: Record<
  (typeof PARENT_SERVICE_SLUGS)[number],
  { label: string; shortLabel: string; href: string }
> = {
  "lead-gen-websites": {
    label: "Lead-Gen Websites & AI Search",
    shortLabel: "Lead-Gen Websites",
    href: "/services/ai-lead-site",
  },
  "crm-automation": {
    label: "CRM & Follow-Up Automation",
    shortLabel: "CRM & Follow-Up",
    href: "/services/crm-pipeline-automation",
  },
  "ai-receptionist": {
    label: "AI Receptionist & Booking Automation",
    shortLabel: "AI Receptionist",
    href: "/services/ai-receptionist",
  },
  "portals-dashboards": {
    label: "Custom Portals & Dashboards",
    shortLabel: "Portals & Dashboards",
    href: "/custom-software",
  },
  "monthly-support": {
    label: "Monthly Support & Improvements",
    shortLabel: "Monthly Support",
    href: "/services/ai-systems-retainer",
  },
};
