import type { SubServiceCard } from "@/lib/types";

/** Bento sub-service cards per parent service document slug (seeded to Sanity). */
export const SERVICE_SUB_SERVICES_BY_SLUG: Record<string, SubServiceCard[]> = {
  "ai-lead-site": [
    {
      title: "AI-Cited Lead Gen Site",
      description:
        "A fast Next.js or Webflow site structured with schema, llms.txt, and direct-answer blocks so ChatGPT and Perplexity can cite your business.",
      icon: "lead-site",
      span: "2x1",
    },
    {
      title: "Website Redesign",
      description:
        "Rebuild around your offer and buyer journey, not a template. Hero, proof, offer clarity, and one primary CTA per page.",
      icon: "design",
    },
    {
      title: "Landing & Offer Pages",
      description:
        "Focused pages for consults, promotions, and lead capture, each with a single conversion goal and CRM-connected forms.",
      icon: "build",
    },
    {
      title: "Service & Local SEO Pages",
      description:
        "Location and service-line pages that rank for the terms buyers search, with schema markup and internal linking built in.",
      icon: "seo",
    },
    {
      title: "SEO & AEO Content",
      description:
        "Blog posts, FAQ blocks, and direct-answer content structured to rank on Google and get cited in AI Overviews.",
      icon: "seo",
    },
    {
      title: "Schema, FAQ & llms.txt Setup",
      description:
        "Technical setup so Google and AI tools parse your offer: Organization, Service, FAQ schema, and llms.txt on every launch.",
      icon: "build",
      span: "2x1",
    },
    {
      title: "Performance Cleanup",
      description:
        "Fix slow loads, Core Web Vitals failures, and broken conversion paths on existing sites before or after a redesign.",
      icon: "launch",
      span: "2x1",
    },
  ],
  "crm-pipeline-automation": [
    {
      title: "CRM Setup",
      description:
        "HubSpot, GoHighLevel, or Salesforce configured with clean pipeline stages, ownership rules, and a view your team actually uses.",
      icon: "crm",
      span: "2x1",
    },
    {
      title: "Form-to-CRM Connection",
      description:
        "Every form fill creates a CRM contact instantly and sends a mobile alert so your team responds before competitors do.",
      icon: "build",
    },
    {
      title: "Email & SMS Follow-Up",
      description:
        "Automated sequences after form fills, calls, and bookings so follow-up runs whether or not anyone remembers.",
      icon: "outbound",
    },
    {
      title: "Missed-Lead Follow-Up",
      description:
        "Stale leads get automatic re-engagement sequences so opportunities do not sit untouched until they buy elsewhere.",
      icon: "ops",
    },
    {
      title: "Appointment Reminders",
      description:
        "SMS and email reminders that cut no-shows and keep your calendar full without manual chasing.",
      icon: "receptionist",
    },
    {
      title: "Review Request Automation",
      description:
        "Review requests triggered at the moment satisfaction peaks, with templates your team can approve in one click.",
      icon: "reviews",
      span: "2x1",
    },
    {
      title: "CRM Dashboard",
      description:
        "Pipeline value, lead source, and follow-up status in one view leadership can trust without asking three people.",
      icon: "dashboards",
      span: "2x1",
    },
  ],
  "ai-receptionist": [
    {
      title: "AI Phone Receptionist",
      description:
        "Answers calls, qualifies callers, and books appointments 24/7 using scripts tuned to your services, hours, and tone.",
      icon: "receptionist",
      span: "2x1",
    },
    {
      title: "Missed-Call Text-Back",
      description:
        "Every missed call triggers an instant SMS within seconds so leads do not dial the next contractor on the list.",
      icon: "outbound",
    },
    {
      title: "AI Website Assistant",
      description:
        "Website chat that answers common questions, captures lead details, and routes high-intent visitors to booking.",
      icon: "agents",
    },
    {
      title: "Lead Qualification Chatbot",
      description:
        "Qualifies budget, timeline, and fit before a human picks up, so your team only talks to ready buyers.",
      icon: "crm",
    },
    {
      title: "Appointment Booking Assistant",
      description:
        "Books appointments directly into your calendar with confirmations and reminders wired to your CRM.",
      icon: "build",
    },
    {
      title: "After-Hours Answering",
      description:
        "Captures every after-hours call and inquiry with scripted intake and escalation rules when a human is needed.",
      icon: "ops",
      span: "2x1",
    },
  ],
  "custom-in-house-software-for-smbs": [
    {
      title: "Client Portal Development",
      description:
        "Secure login areas where clients view project status, files, invoices, and updates without email threads.",
      icon: "portal",
      span: "2x1",
    },
    {
      title: "Patient Portal Development",
      description:
        "Booking, intake forms, and record access for clinics and wellness practices with role-based permissions.",
      icon: "healthcare",
    },
    {
      title: "Staff Dashboard",
      description:
        "Internal views that replace spreadsheets with live pipeline, task, and operations data your team opens daily.",
      icon: "dashboards",
    },
    {
      title: "Booking System",
      description:
        "Online scheduling with confirmations, reminders, intake, and CRM logging built into one flow.",
      icon: "receptionist",
    },
    {
      title: "Admin Panel",
      description:
        "Back-office tools to manage records, orders, approvals, and team workflows without developer tickets.",
      icon: "ops",
    },
    {
      title: "Document Upload Portal",
      description:
        "Secure upload, review, and approval flows for contracts, intake files, and client deliverables.",
      icon: "build",
      span: "2x1",
    },
    {
      title: "Reporting Dashboard",
      description:
        "One live view of pipeline, ad spend, traffic, and revenue pulled from the tools you already use.",
      icon: "dashboards",
      span: "2x1",
    },
  ],
  "platform-migrations": [
    {
      title: "Webflow to Next.js",
      description:
        "Move off Webflow to a faster Next.js + Sanity stack with redirects preserved and content your team can edit.",
      icon: "migration",
      span: "2x1",
    },
    {
      title: "WordPress to Next.js + Sanity",
      description:
        "Migrate WordPress content and SEO equity without losing rankings, with a redirect map for every legacy URL.",
      icon: "build",
    },
    {
      title: "Framer to Next.js",
      description:
        "Outgrow Framer limits with a proper content system, component library, and performance headroom to scale.",
      icon: "design",
    },
    {
      title: "Wix to Next.js",
      description:
        "Leave Wix for a stack you own: faster loads, cleaner SEO structure, and no platform lock-in on growth features.",
      icon: "lead-site",
    },
    {
      title: "Squarespace to Next.js",
      description:
        "Migrate Squarespace sites to an editable Next.js build with schema, redirects, and Core Web Vitals baked in.",
      icon: "seo",
    },
    {
      title: "Headless Shopify",
      description:
        "Custom Next.js storefront with Shopify checkout when you need brand control without sacrificing commerce infrastructure.",
      icon: "shopify",
      span: "2x1",
    },
  ],
  "ai-systems-retainer": [
    {
      title: "Website Support",
      description:
        "Updates, fixes, new pages, and performance tuning on your live site with a 24-hour SLA on break/fix issues.",
      icon: "lead-site",
      span: "2x1",
    },
    {
      title: "CRM & Automation Support",
      description:
        "Keep sequences, integrations, and pipeline workflows running when APIs change or something silently breaks.",
      icon: "crm",
    },
    {
      title: "AI Receptionist Monitoring",
      description:
        "Script tuning, new call scenarios, and review of real call logs so the agent improves every month.",
      icon: "receptionist",
    },
    {
      title: "Analytics & Conversion Review",
      description:
        "Monthly review of what is working, what is leaking, and the one build we ship to move the number next.",
      icon: "dashboards",
      span: "2x1",
    },
  ],
};
