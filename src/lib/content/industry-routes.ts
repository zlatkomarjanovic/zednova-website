/**
 * Industry URL registry — mirrors service-routes.ts.
 *
 * Six parent industry landing pages at /industries/<parent-slug>.
 * Sub-industry documents exist in CMS/static data but do not have public pages;
 * legacy sub URLs redirect to the parent landing page.
 */

import {
  CANONICAL_INDUSTRY_PARENT_SLUGS,
  industryParents,
} from "@/lib/content/industry-parents";
import { industries as industrySegments } from "@/lib/content/industry-subs";

export type ParentIndustrySlug = (typeof CANONICAL_INDUSTRY_PARENT_SLUGS)[number];

export { CANONICAL_INDUSTRY_PARENT_SLUGS };

/** Sub-industry slug → parent landing slug */
export const SUB_INDUSTRY_TO_PARENT: Record<string, ParentIndustrySlug> =
  Object.fromEntries(
    industrySegments.map((segment) => [segment.slug, segment.parentSlug as ParentIndustrySlug]),
  ) as Record<string, ParentIndustrySlug>;

export function parentIndustryPath(slug: ParentIndustrySlug | string): string {
  return `/industries/${slug}`;
}

export function isParentIndustrySlug(slug: string): slug is ParentIndustrySlug {
  return (CANONICAL_INDUSTRY_PARENT_SLUGS as readonly string[]).includes(slug);
}

export function getParentSlugForSubIndustry(slug: string): ParentIndustrySlug | null {
  return SUB_INDUSTRY_TO_PARENT[slug] ?? null;
}

export function getAllParentIndustrySlugs(): ParentIndustrySlug[] {
  return [...CANONICAL_INDUSTRY_PARENT_SLUGS];
}

export function getParentIndustryBySlug(slug: string) {
  return industryParents.find((parent) => parent.slug === slug) ?? null;
}
