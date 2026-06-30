import type {
  CustomSoftwareGroupSection,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
import { industryParents } from "@/lib/content/industry-parents";
import { migrations } from "@/lib/content/migrations";

export type {
  NavMenuItem,
  NavMenuGroup,
  ServiceMegaMenuCard,
  CustomSoftwareGroupSection,
} from "@/lib/types/content-nav";

export { megaMenuNavLinks, PARENT_SERVICE_LABELS } from "@/lib/types/content-nav";

/** Parent service groups — same order as mega menu cards and /services page. */
export const PRIMARY_SERVICE_GROUPS = [
  "Lead-Gen Websites & AI Search",
  "CRM & Follow-Up Automation",
  "AI Receptionist & Booking Automation",
  "Custom Portals & Dashboards",
  "Platform Migrations",
  "Monthly Support & Improvements",
] as const;

export type PrimaryServiceGroup = (typeof PRIMARY_SERVICE_GROUPS)[number];

export const PRIMARY_SERVICE_TAB_LABELS: Record<PrimaryServiceGroup, string> = {
  "Lead-Gen Websites & AI Search": "Lead-Gen Websites",
  "CRM & Follow-Up Automation": "CRM & Follow-Up",
  "AI Receptionist & Booking Automation": "AI Receptionist",
  "Custom Portals & Dashboards": "Portals & Dashboards",
  "Platform Migrations": "Platform Migrations",
  "Monthly Support & Improvements": "Monthly Support",
};

export const PRIMARY_SERVICE_TAGLINES: Record<PrimaryServiceGroup, string> = {
  "Lead-Gen Websites & AI Search":
    "Fast websites that explain your offer, rank on Google and AI search, and turn visitors into calls, forms, and bookings.",
  "CRM & Follow-Up Automation":
    "Every form, call, and booking request gets captured, followed up with, and tracked until it becomes a booked call or customer.",
  "AI Receptionist & Booking Automation":
    "AI voice and chat assistants that answer calls, qualify leads, book appointments, and text back missed calls.",
  "Custom Portals & Dashboards":
    "Client portals, staff dashboards, booking systems, and internal tools for teams outgrowing spreadsheets.",
  "Platform Migrations":
    "Move from Webflow, WordPress, Framer, Wix, or Squarespace to Next.js + Sanity without losing SEO or content.",
  "Monthly Support & Improvements":
    "Monthly help for your website, CRM automations, AI receptionist, dashboards, forms, and integrations.",
};

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
    href: "/services/ai-lead-site",
    startingPrice: "From $3,500",
    isFeatured: true,
  },
  {
    title: "CRM & Follow-Up Automation",
    shortDescription:
      "Forms, calls, bookings, email, SMS, and pipeline stages wired together so no lead gets lost.",
    includes: "HubSpot, GoHighLevel, pipeline stages, email & SMS",
    href: "/services/crm-pipeline-automation",
    startingPrice: "From $2,500",
    isFeatured: true,
  },
  {
    title: "AI Receptionists",
    shortDescription:
      "AI voice/chat agents that answer questions, qualify leads, book appointments, and text back missed calls.",
    includes: "AI phone, website chat, missed-call text-back, booking",
    href: "/services/ai-receptionist",
    startingPrice: "From $1,200 + $299/mo",
    isFeatured: true,
  },
  {
    title: "Portals & Dashboards",
    shortDescription:
      "Client portals, staff dashboards, booking systems, and internal tools for teams outgrowing spreadsheets.",
    includes: "client portals, patient portals, dashboards, booking systems",
    href: "/custom-software",
    startingPrice: "From $4,999",
    isFeatured: true,
  },
  {
    title: "Platform Migrations",
    shortDescription:
      "Move from Webflow, WordPress, Framer, Wix, or Squarespace to Next.js + Sanity without losing SEO or content.",
    includes: "Webflow, WordPress, Framer, Wix, Squarespace",
    href: "/migrations",
    startingPrice: "From $3,500",
    isFeatured: true,
  },
  {
    title: "Monthly Support",
    shortDescription:
      "Monthly help for your website, CRM automations, AI receptionist, dashboards, forms, and integrations after launch.",
    includes: "website updates, automation fixes, new pages, monitoring",
    href: "/services/ai-systems-retainer",
    startingPrice: "From $349/mo",
    isFeatured: false,
  },
];

/**
 * Service nav groups aligned to the 5 parent services.
 * Shopify & Ecommerce is now a legacy/hidden group, kept for SEO only.
 */
export const serviceNavGroups: NavMenuGroup[] = [
  {
    group: "Lead-Gen Websites & AI Search",
    items: [
      {
        title: "AI-Cited Lead Gen Site",
        shortDescription: "Fast, clear website that ranks on Google and gets cited by AI tools.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Website Redesign",
        shortDescription: "Rebuild your site to convert visitors into calls, forms, and bookings.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Landing & Offer Pages",
        shortDescription: "Focused pages for offers, consults, and lead capture.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Service & Local SEO Pages",
        shortDescription: "Pages that show up for the terms your buyers actually search.",
        href: "/services/seo-aeo-content",
      },
      {
        title: "SEO & AEO Content",
        shortDescription: "Content structured to rank and get cited in AI answers.",
        href: "/services/seo-aeo-content",
      },
      {
        title: "Schema, FAQ & llms.txt Setup",
        shortDescription: "Technical setup so Google and AI tools can find and cite your business.",
        href: "/services/seo-aeo-content",
      },
      {
        title: "Website Performance Cleanup",
        shortDescription: "Fix slow loads, Core Web Vitals, and broken conversion paths.",
        href: "/services/ai-lead-site",
      },
    ],
  },
  {
    group: "CRM & Follow-Up Automation",
    items: [
      {
        title: "CRM Setup",
        shortDescription: "HubSpot, GoHighLevel, or Salesforce setup with clean pipeline stages.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Form-to-CRM Connection",
        shortDescription: "Every form fill lands in your CRM and alerts your team instantly.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Email & SMS Follow-Up",
        shortDescription: "Automated sequences after form fills, calls, and bookings.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Missed-Lead Follow-Up",
        shortDescription: "Stale leads get automatic re-engagement so nothing slips through.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Appointment Reminders",
        shortDescription: "Automated SMS and email reminders that reduce no-shows.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Review Request Automation",
        shortDescription: "Review requests sent at the right moment after a job or visit.",
        href: "/services/review-reputation",
      },
      {
        title: "CRM Dashboard",
        shortDescription: "A simple view of pipeline value, lead source, and follow-up status.",
        href: "/services/reporting-dashboards",
      },
    ],
  },
  {
    group: "AI Receptionist & Booking Automation",
    items: [
      {
        title: "AI Phone Receptionist",
        shortDescription: "Answers calls, qualifies callers, and books appointments 24/7.",
        href: "/services/ai-receptionist",
      },
      {
        title: "Missed-Call Text-Back",
        shortDescription: "Every missed call gets an instant text so leads don't call competitors.",
        href: "/services/ai-receptionist",
      },
      {
        title: "AI Website Assistant",
        shortDescription: "Website chat that answers questions and captures lead details.",
        href: "/services/ai-receptionist",
      },
      {
        title: "Lead Qualification Chatbot",
        shortDescription: "Qualifies leads before they reach your team.",
        href: "/services/ai-receptionist",
      },
      {
        title: "Appointment Booking Assistant",
        shortDescription: "Books appointments directly into your calendar.",
        href: "/services/ai-receptionist",
      },
      {
        title: "After-Hours Answering",
        shortDescription: "Captures every after-hours call and inquiry.",
        href: "/services/ai-receptionist",
      },
    ],
  },
  {
    group: "Custom Portals & Dashboards",
    items: [
      {
        title: "Client Portal Development",
        shortDescription: "Login areas for clients to view status, files, and updates.",
        href: cs("client-portal-development"),
      },
      {
        title: "Patient Portal Development",
        shortDescription: "Secure portals for patients to book, complete intake, and view info.",
        href: cs("patient-portal-development"),
      },
      {
        title: "Staff Dashboard",
        shortDescription: "Internal dashboards that replace spreadsheets and manual tracking.",
        href: cs("internal-dashboard-development"),
      },
      {
        title: "Booking System",
        shortDescription: "Online scheduling with confirmations, reminders, and intake.",
        href: cs("booking-system-development"),
      },
      {
        title: "Admin Panel",
        shortDescription: "Back-office tools to manage records, orders, and team workflows.",
        href: cs("admin-panel-development"),
      },
      {
        title: "Document Upload Portal",
        shortDescription: "Secure upload, review, and approval flows for files.",
        href: cs("document-upload-portals"),
      },
      {
        title: "Reporting Dashboard",
        shortDescription: "One live view of pipeline, revenue, and operations.",
        href: "/services/reporting-dashboards",
      },
    ],
  },
  {
    group: "Platform Migrations",
    items: migrations
      .filter((m) => !m.slug.includes("shopify"))
      .slice(0, 8)
      .map((migration) => ({
        title: migration.title,
        shortDescription: migration.shortDescription,
        href: `/migrations/${migration.slug}`,
      })),
  },
  {
    group: "Monthly Support & Improvements",
    items: [
      {
        title: "Website Support",
        shortDescription: "Updates, fixes, and new pages after launch.",
        href: "/services/ai-systems-retainer",
      },
      {
        title: "CRM & Automation Support",
        shortDescription: "Keep automations running and fix what breaks.",
        href: "/services/ai-systems-retainer",
      },
      {
        title: "AI Receptionist Monitoring",
        shortDescription: "Tune scripts, add services, and review call logs.",
        href: "/services/ai-systems-retainer",
      },
      {
        title: "Analytics & Conversion Review",
        shortDescription: "Monthly review of what's working and what to fix next.",
        href: "/services/ai-systems-retainer",
      },
    ],
  },
  {
    group: "Shopify & Ecommerce (Legacy)",
    items: [
      {
        title: "Shopify Development",
        shortDescription: "Custom Shopify stores, product pages, and checkout flows.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Headless Shopify Development",
        shortDescription: "Custom Next.js storefront with Shopify checkout.",
        href: "/migrations/shopify-to-headless-shopify",
      },
      {
        title: "Klaviyo Email Flows",
        shortDescription: "Welcome, cart recovery, and post-purchase sequences.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Cart Abandonment Automation",
        shortDescription: "Timed emails and SMS to recover abandoned carts.",
        href: "/services/crm-pipeline-automation",
      },
    ],
  },
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
