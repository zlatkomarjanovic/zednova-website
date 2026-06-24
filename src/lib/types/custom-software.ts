import type { ArticleFaq, FeatureBullet, SeoFields } from "@/lib/types";

export type CustomSoftware = {
  slug: string;
  title: string;
  shortDescription: string;
  whatItIs?: string;
  problemSolved?: string;
  targetAudience?: string[];
  keyFeatures?: FeatureBullet[];
  whatsIncluded?: FeatureBullet[];
  deliverables?: string[];
  technologies?: string[];
  integrations?: string[];
  processSteps?: { step: number; title: string; description: string }[];
  timeline?: string;
  startingPrice?: number;
  softwareType?: string;
  faqs?: ArticleFaq[];
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedCaseStudies?: string[];
  relatedPortfolioProjects?: string[];
  relatedInsights?: string[];
  order: number;
  seo?: SeoFields;
};

export function customSoftwarePath(slug: string) {
  return `/custom-software/${slug}`;
}
