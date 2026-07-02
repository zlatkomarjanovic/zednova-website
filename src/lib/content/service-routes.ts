/**
 * Service URL registry.
 *
 * The site has 6 CMS-powered service detail pages at /services/<parent-slug>.
 * Each maps to one Service document in Sanity (or the static fallback in services.ts).
 *
 * Legacy flat slugs (e.g. /services/ai-lead-site) 301-redirect to the parent page
 * (handled in next.config.ts via SERVICE_NESTED_REDIRECTS).
 */

import { slugify } from "@/lib/utils";

import {
  PRIMARY_SERVICE_GROUPS,
  PRIMARY_SERVICE_TAB_LABELS,
  PRIMARY_SERVICE_TAGLINES,
  type PrimaryServiceGroup,
} from "./service-groups";

export const PARENT_SLUG_BY_GROUP: Record<PrimaryServiceGroup, string> = {
  "Lead-Gen Websites & AI Search": "lead-gen-websites",
  "CRM & Follow-Up Automation": "crm-follow-up-automation",
  "AI Receptionist & Booking Automation": "ai-receptionist-booking",
  "Custom In-House Software for SMBs": "custom-in-house-software-for-smbs",
  "SEO & AI Search Content": "seo-aeo-content",
  "Monthly Support & Improvements": "monthly-support",
};

export type ParentServiceSlug =
  (typeof PARENT_SLUG_BY_GROUP)[PrimaryServiceGroup];

const GROUP_BY_PARENT_SLUG = Object.fromEntries(
  Object.entries(PARENT_SLUG_BY_GROUP).map(([group, slug]) => [slug, group]),
) as Record<ParentServiceSlug, PrimaryServiceGroup>;

/**
 * Slug used for the Service document that powers each parent page.
 * The /services/[slug] route resolves these slugs against Sanity.
 */
export const SERVICE_SLUG_BY_PARENT: Record<ParentServiceSlug, string> = {
  "lead-gen-websites": "ai-lead-site",
  "crm-follow-up-automation": "crm-pipeline-automation",
  "ai-receptionist-booking": "ai-receptionist",
  "custom-in-house-software-for-smbs": "custom-in-house-software-for-smbs",
  "seo-aeo-content": "seo-aeo-content",
  "monthly-support": "ai-systems-retainer",
};

export const PARENT_SLUG_BY_SERVICE_SLUG: Record<string, ParentServiceSlug> =
  Object.fromEntries(
    Object.entries(SERVICE_SLUG_BY_PARENT).map(([parentSlug, serviceSlug]) => [
      serviceSlug,
      parentSlug as ParentServiceSlug,
    ]),
  );

export function parentServicePath(parentSlug: ParentServiceSlug | string): string {
  return `/services/${parentSlug}`;
}

export function isParentServiceSlug(slug: string): slug is ParentServiceSlug {
  return slug in GROUP_BY_PARENT_SLUG;
}

export function getParentGroup(slug: ParentServiceSlug): PrimaryServiceGroup {
  return GROUP_BY_PARENT_SLUG[slug];
}

export function getParentSlug(group: PrimaryServiceGroup): ParentServiceSlug {
  return PARENT_SLUG_BY_GROUP[group];
}

export function getServiceSlugForParent(
  parentSlug: ParentServiceSlug,
): string {
  return SERVICE_SLUG_BY_PARENT[parentSlug];
}

export function getParentSlugForServiceSlug(
  serviceSlug: string,
): ParentServiceSlug | undefined {
  return PARENT_SLUG_BY_SERVICE_SLUG[serviceSlug];
}

/**
 * Public URL for a service document. If the service is one of the 6 primary
 * services, returns its parent page (/services/<parent-slug>). Otherwise
 * returns the flat /services/<slug> path (used by legacy/secondary services).
 */
export function getServicePublicPath(serviceSlug: string): string {
  const parentSlug = PARENT_SLUG_BY_SERVICE_SLUG[serviceSlug];
  if (parentSlug) return parentServicePath(parentSlug);
  return `/services/${serviceSlug}`;
}

export function getAllParentServiceParams(): { slug: string }[] {
  return PRIMARY_SERVICE_GROUPS.map((group) => ({
    slug: PARENT_SLUG_BY_GROUP[group],
  }));
}

export function getParentServiceLabel(parentSlug: ParentServiceSlug): string {
  return PRIMARY_SERVICE_TAB_LABELS[getParentGroup(parentSlug)];
}

export function getParentServiceTagline(parentSlug: ParentServiceSlug): string {
  return PRIMARY_SERVICE_TAGLINES[getParentGroup(parentSlug)];
}

export { PRIMARY_SERVICE_TAB_LABELS, PRIMARY_SERVICE_TAGLINES };

export { slugify };
