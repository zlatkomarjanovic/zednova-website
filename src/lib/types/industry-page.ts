import type { ArticleFaq } from "@/lib/types";

export type IndustryCtaLink = {
  label: string;
  href: string;
};

export type IndustryGlanceItem = {
  title: string;
  subtitle?: string;
  body: string;
  icon?: string;
  iconKey?: string;
};

export type IndustryProblemItem = {
  title: string;
  body: string;
};

export type IndustrySystemStep = {
  label: string;
  title: string;
  body: string;
};

export type IndustryBuildCard = {
  title: string;
  subtitle?: string;
  body: string;
  bestFor?: string;
  serviceHref?: string;
  image?: string;
  icon?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
};

export type IndustrySegmentCard = {
  title: string;
  body: string;
  commonBuild?: string;
  href?: string;
  statusLabel?: string;
};

export type IndustryProjectStack = {
  title: string;
  bestFor: string;
  includes: string[];
};

export type IndustryRelatedServiceCard = {
  title: string;
  href: string;
  description?: string;
};

export type IndustryProcessStepItem = {
  step: number;
  title: string;
  body: string;
  deliverables?: string[];
  icon?: string;
};

export type IndustryTrustStat = {
  value: string;
  label: string;
};

export type IndustryPageSectionMeta = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  cta?: IndustryCtaLink;
};

export type IndustryPageContent = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  hero: {
    eyebrow?: string;
    heading: string;
    subheading: string;
    primaryCta: IndustryCtaLink;
    secondaryCta: IndustryCtaLink;
    image?: string;
    imageAlt?: string;
  };
  logoCarousel: {
    show: boolean;
    label?: string;
  };
  glance: IndustryPageSectionMeta & { items: IndustryGlanceItem[] };
  problems: IndustryPageSectionMeta & { items: IndustryProblemItem[] };
  system: IndustryPageSectionMeta & { steps: IndustrySystemStep[] };
  builds: IndustryPageSectionMeta & { cards: IndustryBuildCard[] };
  segments: IndustryPageSectionMeta & { cards: IndustrySegmentCard[] };
  proof: IndustryPageSectionMeta & { testimonialTags?: string[] };
  services: IndustryPageSectionMeta;
  process: IndustryPageSectionMeta & { steps: IndustryProcessStepItem[] };
  insights: IndustryPageSectionMeta;
  cta: IndustryPageSectionMeta & {
    heading: string;
    subheading: string;
    primaryCta: IndustryCtaLink;
    secondaryCta: IndustryCtaLink;
    microcopy?: string;
    trustStats: IndustryTrustStat[];
  };
  faq: IndustryPageSectionMeta & { items: ArticleFaq[] };
  /** Portfolio work slugs / industry tag for proof grid (optional) */
  workEyebrow?: string;
  workHeadline?: string;
};
