import type {
  CustomSoftwareGroupSection,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
import { industryParents } from "@/lib/content/industry-parents";
import {
  PRIMARY_SERVICE_GROUPS,
  PRIMARY_SERVICE_TAB_LABELS,
  PRIMARY_SERVICE_TAGLINES,
  type PrimaryServiceGroup,
} from "@/lib/content/service-groups";
import { buildServiceNavGroups, getServicePublicPath, parentServicePath, getParentSlug } from "@/lib/content/service-routes";

export type {
  NavMenuItem,
  NavMenuGroup,
  ServiceMegaMenuCard,
  CustomSoftwareGroupSection,
} from "@/lib/types/content-nav";

export { megaMenuNavLinks, PARENT_SERVICE_LABELS } from "@/lib/types/content-nav";

export {
  PRIMARY_SERVICE_GROUPS,
  PRIMARY_SERVICE_TAB_LABELS,
  PRIMARY_SERVICE_TAGLINES,
  type PrimaryServiceGroup,
} from "@/lib/content/service-groups";

function cs(slug: string) {
  return `/custom-software/${slug}`;
}

/**
 * Homepage cards, services page "Core" grid, and services mega menu.
 * Ecommerce/Shopify is intentionally NOT a primary card.
 */
export const serviceMegaMenuCards: ServiceMegaMenuCard[] = [
  {
    title: "Lead-Gen Websites",
    shortDescription:
      "Fast websites that explain your offer, rank on Google and AI search, and turn visitors into calls, forms, and bookings.",
    includes: "Next.js, Webflow, Sanity, SEO & AEO setup",
    href: parentServicePath(getParentSlug("Lead-Gen Websites & AI Search")),
    startingPrice: "From $3,500",
    isFeatured: true,
  },
  {
    title: "CRM & Follow-Up Automation",
    shortDescription:
      "Forms, calls, bookings, email, SMS, and pipeline stages wired together so no lead gets lost.",
    includes: "HubSpot, GoHighLevel, pipeline stages, email & SMS",
    href: parentServicePath(getParentSlug("CRM & Follow-Up Automation")),
    startingPrice: "From $2,500",
    isFeatured: true,
  },
  {
    title: "AI Receptionists",
    shortDescription:
      "AI voice/chat agents that answer questions, qualify leads, book appointments, and text back missed calls.",
    includes: "AI phone, website chat, missed-call text-back, booking",
    href: parentServicePath(getParentSlug("AI Receptionist & Booking Automation")),
    startingPrice: "From $1,200 + $299/mo",
    isFeatured: true,
  },
  {
    title: "Custom In-House Software",
    shortDescription:
      "Client portals, internal tools, booking systems, and dashboards built for SMB teams outgrowing spreadsheets.",
    includes: "client portals, staff dashboards, booking systems, admin panels",
    href: parentServicePath(getParentSlug("Custom In-House Software for SMBs")),
    startingPrice: "From $4,999",
    isFeatured: true,
  },
  {
    title: "Platform Migrations",
    shortDescription:
      "Move from Webflow, WordPress, Framer, Wix, or Squarespace to Next.js + Sanity without losing SEO or content.",
    includes: "Webflow, WordPress, Framer, Wix, Squarespace",
    href: parentServicePath(getParentSlug("Platform Migrations")),
    startingPrice: "From $3,500",
    isFeatured: true,
  },
  {
    title: "Monthly Support",
    shortDescription:
      "Monthly help for your website, CRM automations, AI receptionist, dashboards, forms, and integrations after launch.",
    includes: "website updates, automation fixes, new pages, monitoring",
    href: parentServicePath(getParentSlug("Monthly Support & Improvements")),
    startingPrice: "From $349/mo",
    isFeatured: false,
  },
];

/**
 * Nested sub-service links per parent group, plus legacy ecommerce (hidden from primary nav).
 */
const legacyEcommerceNavGroup: NavMenuGroup = {
  group: "Shopify & Ecommerce (Legacy)",
  items: [
    {
      title: "Shopify Development",
      shortDescription: "Custom Shopify stores, product pages, and checkout flows.",
      href: getServicePublicPath("ai-lead-site"),
    },
    {
      title: "Headless Shopify Development",
      shortDescription: "Custom Next.js storefront with Shopify checkout.",
      href: "/migrations/shopify-to-headless-shopify",
    },
    {
      title: "Klaviyo Email Flows",
      shortDescription: "Welcome, cart recovery, and post-purchase sequences.",
      href: getServicePublicPath("crm-pipeline-automation"),
    },
    {
      title: "Cart Abandonment Automation",
      shortDescription: "Timed emails and SMS to recover abandoned carts.",
      href: getServicePublicPath("crm-pipeline-automation"),
    },
  ],
};

export const serviceNavGroups: NavMenuGroup[] = [
  ...buildServiceNavGroups(),
  legacyEcommerceNavGroup,
];

export const industryNavItems: NavMenuItem[] = industryParents.map((parent) => ({
  title: parent.title,
  shortDescription: parent.shortDescription,
  href: `/industries/${parent.slug}`,
}));

export const customSoftwareNavItems: NavMenuItem[] = [
  {
    title: "Custom Web App Development",
    shortDescription:
      "Simple web apps on Next.js for workflows, records, and tools your team uses every day.",
    href: cs("custom-web-app-development"),
  },
  {
    title: "Client Portal Development",
    shortDescription:
      "Login portals where clients check project status, upload files, and get updates without emailing you.",
    href: cs("client-portal-development"),
  },
  {
    title: "Patient Portal Development",
    shortDescription:
      "Secure portals for patients to book visits, complete intake forms, and view their appointment info.",
    href: cs("patient-portal-development"),
  },
  {
    title: "Internal Dashboard Development",
    shortDescription:
      "Staff dashboards that replace spreadsheets and show live business numbers at a glance.",
    href: cs("internal-dashboard-development"),
  },
  {
    title: "Booking System Development",
    shortDescription:
      "Online scheduling with confirmations, reminders, intake forms, and calendar sync built in.",
    href: cs("booking-system-development"),
  },
  {
    title: "Admin Panel Development",
    shortDescription:
      "Back-office panels to manage users, records, orders, content, and settings.",
    href: cs("admin-panel-development"),
  },
  {
    title: "Form & Intake Systems",
    shortDescription:
      "Custom forms wired to CRM, email, SMS, and follow-up sequences triggered on submission.",
    href: cs("form-intake-systems"),
  },
  {
    title: "CRM & Lead Tracking Tools",
    shortDescription:
      "Simple CRM views for leads, deals, tasks, notes, and pipeline status.",
    href: cs("crm-lead-tracking-tools"),
  },
  {
    title: "Document Upload Portals",
    shortDescription:
      "Secure upload, review, and approval flows for files from clients or staff.",
    href: cs("document-upload-portals"),
  },
  {
    title: "Membership & Subscription Portals",
    shortDescription:
      "Member login, billing access, and gated content for paid users and subscribers.",
    href: cs("membership-subscription-portals"),
  },
];

function csItem(title: string): NavMenuItem {
  const item = customSoftwareNavItems.find((entry) => entry.title === title);
  return (
    item ?? {
      title,
      shortDescription: "",
      href: "/custom-software",
    }
  );
}

export const customSoftwareGroups: CustomSoftwareGroupSection[] = [
  {
    id: "portals",
    label: "Portals & dashboards",
    headline: "Login areas and live views for clients, patients, and staff.",
    description:
      "Replace email threads and spreadsheet updates with portals your clients and team actually use.",
    items: [
      csItem("Client Portal Development"),
      csItem("Patient Portal Development"),
      csItem("Internal Dashboard Development"),
      csItem("Admin Panel Development"),
      csItem("Document Upload Portals"),
      csItem("Membership & Subscription Portals"),
    ],
  },
  {
    id: "systems",
    label: "Apps & workflows",
    headline: "Booking, intake, CRM, and custom tools wired to how you work.",
    description:
      "From scheduling to lead tracking — systems that connect forms, notifications, and follow-up automatically.",
    items: [
      csItem("Custom Web App Development"),
      csItem("Booking System Development"),
      csItem("Form & Intake Systems"),
      csItem("CRM & Lead Tracking Tools"),
    ],
  },
];
