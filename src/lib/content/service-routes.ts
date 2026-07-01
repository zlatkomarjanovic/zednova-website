/**
 * Service URL registry.
 *
 * The site has 6 CMS-powered service detail pages at /services/<parent-slug>.
 * Each maps to one Service document in Sanity (or the static fallback in services.ts).
 *
 * Legacy flat slugs (e.g. /services/ai-lead-site) 301-redirect to the parent page
 * (handled in next.config.ts via SERVICE_NESTED_REDIRECTS).
 */

import type { NavMenuGroup } from "@/lib/types/content-nav";
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
  "Platform Migrations": "migrations",
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
  "migrations": "platform-migrations",
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

/**
 * Static nav groups for the mega menu. Each parent service lists its
 * deliverables as nav items (decorative — no dedicated sub-pages anymore).
 */
const PARENT_SUB_NAV: Record<PrimaryServiceGroup, { title: string; shortDescription: string }[]> = {
  "Lead-Gen Websites & AI Search": [
    { title: "AI-Cited Lead Gen Site", shortDescription: "Fast, clear website that ranks on Google and gets cited by AI tools." },
    { title: "Website Redesign", shortDescription: "Rebuild your site to convert visitors into calls, forms, and bookings." },
    { title: "Landing & Offer Pages", shortDescription: "Focused pages for offers, consults, and lead capture." },
    { title: "Service & Local SEO Pages", shortDescription: "Pages that show up for the terms your buyers actually search." },
    { title: "SEO & AEO Content", shortDescription: "Content structured to rank and get cited in AI answers." },
    { title: "Schema, FAQ & llms.txt Setup", shortDescription: "Technical setup so Google and AI tools can find and cite your business." },
    { title: "Website Performance Cleanup", shortDescription: "Fix slow loads, Core Web Vitals, and broken conversion paths." },
  ],
  "CRM & Follow-Up Automation": [
    { title: "CRM Setup", shortDescription: "HubSpot, GoHighLevel, or Salesforce setup with clean pipeline stages." },
    { title: "Form-to-CRM Connection", shortDescription: "Every form fill lands in your CRM and alerts your team instantly." },
    { title: "Email & SMS Follow-Up", shortDescription: "Automated sequences after form fills, calls, and bookings." },
    { title: "Missed-Lead Follow-Up", shortDescription: "Stale leads get automatic re-engagement so nothing slips through." },
    { title: "Appointment Reminders", shortDescription: "Automated SMS and email reminders that reduce no-shows." },
    { title: "Review Request Automation", shortDescription: "Review requests sent at the right moment after a job or visit." },
    { title: "CRM Dashboard", shortDescription: "A simple view of pipeline value, lead source, and follow-up status." },
  ],
  "AI Receptionist & Booking Automation": [
    { title: "AI Phone Receptionist", shortDescription: "Answers calls, qualifies callers, and books appointments 24/7." },
    { title: "Missed-Call Text-Back", shortDescription: "Every missed call gets an instant text so leads don't call competitors." },
    { title: "AI Website Assistant", shortDescription: "Website chat that answers questions and captures lead details." },
    { title: "Lead Qualification Chatbot", shortDescription: "Qualifies leads before they reach your team." },
    { title: "Appointment Booking Assistant", shortDescription: "Books appointments directly into your calendar." },
    { title: "After-Hours Answering", shortDescription: "Captures every after-hours call and inquiry." },
  ],
  "Custom In-House Software for SMBs": [
    { title: "Client Portal Development", shortDescription: "Login areas for clients to view status, files, and updates." },
    { title: "Patient Portal Development", shortDescription: "Secure portals for patients to book, complete intake, and view info." },
    { title: "Staff Dashboard", shortDescription: "Internal dashboards that replace spreadsheets and manual tracking." },
    { title: "Booking System", shortDescription: "Online scheduling with confirmations, reminders, and intake." },
    { title: "Admin Panel", shortDescription: "Back-office tools to manage records, orders, and team workflows." },
    { title: "Document Upload Portal", shortDescription: "Secure upload, review, and approval flows for files." },
    { title: "Reporting Dashboard", shortDescription: "One live view of pipeline, revenue, and operations." },
    { title: "Internal Workflow Tools", shortDescription: "Custom apps that replace manual handoffs between teams." },
  ],
  "Platform Migrations": [
    { title: "Webflow to Next.js", shortDescription: "Move off Webflow to a faster, more flexible Next.js stack." },
    { title: "WordPress to Next.js + Sanity", shortDescription: "Migrate WordPress content and SEO equity without losing rankings." },
    { title: "Framer to Next.js", shortDescription: "Outgrow Framer's limits with a proper Next.js + Sanity setup." },
    { title: "Wix to Next.js", shortDescription: "Leave Wix for a stack you actually own and can scale." },
    { title: "Squarespace to Next.js", shortDescription: "Migrate Squarespace sites to a faster, editable Next.js build." },
    { title: "Headless Shopify", shortDescription: "Custom Next.js storefront with Shopify checkout." },
  ],
  "Monthly Support & Improvements": [
    { title: "Website Support", shortDescription: "Updates, fixes, and new pages after launch." },
    { title: "CRM & Automation Support", shortDescription: "Keep automations running and fix what breaks." },
    { title: "AI Receptionist Monitoring", shortDescription: "Tune scripts, add services, and review call logs." },
    { title: "Analytics & Conversion Review", shortDescription: "Monthly review of what's working and what to fix next." },
  ],
};

export function buildServiceNavGroups(): NavMenuGroup[] {
  return PRIMARY_SERVICE_GROUPS.map((group) => ({
    group,
    items: (PARENT_SUB_NAV[group] ?? []).map((item) => ({
      ...item,
      href: parentServicePath(PARENT_SLUG_BY_GROUP[group]),
    })),
  }));
}

export { slugify };
