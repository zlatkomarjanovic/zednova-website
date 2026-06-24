import type {
  CustomSoftwareGroupSection,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
import { industryParents } from "@/lib/content/industry-parents";

export type {
  NavMenuItem,
  NavMenuGroup,
  ServiceMegaMenuCard,
  CustomSoftwareGroupSection,
} from "@/lib/types/content-nav";

export { megaMenuNavLinks } from "@/lib/types/content-nav";

function cs(slug: string) {
  return `/custom-software/${slug}`;
}

export const serviceMegaMenuCards: ServiceMegaMenuCard[] = [
  {
    title: "Marketing website development",
    shortDescription:
      "B2B and B2C marketing websites, landing pages, and CMS setups for brands that need to convert traffic into leads.",
    includes: "Next.js, Webflow, Sanity, SEO setup",
    href: "/services/ai-lead-site",
  },
  {
    title: "E-commerce development",
    shortDescription:
      "Shopify stores, product pages, checkout flows, email sequences, and ecommerce dashboards.",
    includes: "Shopify, headless Shopify, Klaviyo, cart recovery",
    href: "/industries/ecommerce-dtc",
  },
  {
    title: "Custom in-house software development",
    shortDescription:
      "Client portals, staff dashboards, booking systems, admin panels, and internal tools built for your team.",
    includes: "client portals, staff dashboards, booking flows",
    href: "/custom-software",
  },
  {
    title: "CRM & Workflow Automation",
    shortDescription:
      "Automations that connect forms, leads, bookings, email, SMS, and internal tasks across your existing tools.",
    includes: "CRM setup, n8n, Make, Airtable, Zapier",
    href: "/services/crm-pipeline-automation",
  },
  {
    title: "AI Chatbots & Phone Assistants",
    shortDescription:
      "AI tools that answer questions, collect details, qualify leads, and handle missed calls.",
    includes: "website chatbots, intake chatbots, AI phone assistants",
    href: "/services/ai-receptionist",
  },
  {
    title: "Ongoing Support",
    shortDescription:
      "Updates, fixes, improvements, monitoring, and new features after launch.",
    includes: "website updates, automation fixes, new pages",
    href: "/services/ai-systems-retainer",
  },
];

export const serviceNavGroups: NavMenuGroup[] = [
  {
    group: "Websites",
    items: [
      {
        title: "Website Design & Development",
        shortDescription: "Custom business websites built on Next.js or Webflow.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Next.js Website Development",
        shortDescription: "Fast, SEO-friendly websites with a modern React stack.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Sanity CMS Development",
        shortDescription: "Content editing setup so your team can update pages easily.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Landing Page Design",
        shortDescription: "Focused pages for offers, consults, and lead capture.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Clinic Website Design",
        shortDescription:
          "Websites for dental, medical, peptide, TRT, longevity, and wellness clinics.",
        href: "/industries/healthcare-wellness",
      },
      {
        title: "Dental Website Design",
        shortDescription: "Websites with booking, recall, and new-patient intake.",
        href: "/industries/dental-clinics",
      },
      {
        title: "Shopify Website Design",
        shortDescription: "Storefront pages and brand sites connected to Shopify.",
        href: "/industries/ecommerce-dtc",
      },
    ],
  },
  {
    group: "Shopify & Ecommerce",
    items: [
      {
        title: "Shopify Development",
        shortDescription:
          "Custom Shopify stores, product pages, checkout improvements, and ecommerce sections.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Headless Shopify Development",
        shortDescription: "Custom Next.js storefront with Shopify for products and checkout.",
        href: "/migrations/shopify-to-headless-shopify",
      },
      {
        title: "Product Page Design",
        shortDescription: "Product pages that explain the offer and drive add-to-cart.",
        href: "/services/ai-lead-site",
      },
      {
        title: "Klaviyo Email Flows",
        shortDescription: "Welcome, browse, cart, and post-purchase email sequences.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Cart Abandonment Emails",
        shortDescription: "Timed emails and SMS to recover shoppers who leave checkout.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Post-Purchase Email Flows",
        shortDescription: "Onboarding, education, and repeat-order emails after purchase.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Ecommerce Dashboard",
        shortDescription: "Simple dashboards for orders, revenue, and campaign performance.",
        href: "/services/reporting-dashboards",
      },
    ],
  },
  {
    group: "Custom Software",
    items: [
      {
        title: "Custom Web App Development",
        shortDescription:
          "Simple web apps, portals, dashboards, and internal tools for small businesses.",
        href: "/custom-software",
      },
      {
        title: "Client Portal Development",
        shortDescription: "Login areas for clients to view status, files, and updates.",
        href: "/industries/portal-dashboard-booking-needs",
      },
      {
        title: "Internal Dashboard Development",
        shortDescription: "Staff dashboards that replace spreadsheets and manual tracking.",
        href: "/services/reporting-dashboards",
      },
      {
        title: "Booking System Development",
        shortDescription: "Online scheduling with confirmations, reminders, and intake.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Form & Intake System Development",
        shortDescription: "Patient, client, and lead intake forms connected to your CRM.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "Admin Panel Development",
        shortDescription: "Back-office tools to manage records, orders, and team workflows.",
        href: "/custom-software",
      },
    ],
  },
  {
    group: "Automation",
    items: [
      {
        title: "CRM Automation",
        shortDescription:
          "Connect forms, leads, email, SMS, reminders, and follow-up tasks.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Appointment Booking Automation",
        shortDescription: "Online booking, reminders, and calendar sync for clinics and services.",
        href: "/services/crm-pipeline-automation",
      },
      {
        title: "Email & SMS Follow-Up",
        shortDescription: "Automated sequences after form fills, calls, and purchases.",
        href: "/services/outbound-lead-gen",
      },
      {
        title: "Google Review Automation",
        shortDescription: "Review requests and reply drafts after completed jobs or visits.",
        href: "/services/review-reputation",
      },
      {
        title: "n8n Automation",
        shortDescription: "Custom workflows in n8n for reporting, routing, and notifications.",
        href: "/services/ops-automation",
      },
      {
        title: "Make Automation",
        shortDescription: "Make scenarios that connect your apps and remove manual steps.",
        href: "/services/ops-automation",
      },
      {
        title: "Airtable Automation",
        shortDescription: "Automations and views that extend Airtable into daily workflows.",
        href: "/services/ops-automation",
      },
    ],
  },
  {
    group: "AI Tools",
    items: [
      {
        title: "AI Chatbot for Website",
        shortDescription: "Website chat that answers questions and captures leads.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "AI Phone Assistant",
        shortDescription: "Answers calls, qualifies callers, and sends missed-call texts.",
        href: "/services/ai-receptionist",
      },
      {
        title: "Patient Intake Chatbot",
        shortDescription: "Collects patient details and routes them before the visit.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "Customer Support Chatbot",
        shortDescription: "Handles common support questions and escalates when needed.",
        href: "/services/custom-ai-agents",
      },
      {
        title: "Document Processing AI",
        shortDescription: "Extracts data from forms, PDFs, and uploads into your systems.",
        href: "/services/custom-ai-agents",
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
