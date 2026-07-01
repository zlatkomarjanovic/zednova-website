import type { ArticleFaq } from "@/lib/types";
import type { ParentIndustrySlug } from "@/lib/content/industry-routes";

export const INDUSTRY_FAQ_FALLBACKS: Record<ParentIndustrySlug, ArticleFaq[]> = {
  "healthcare-wellness": [
    {
      question: "Can you connect to our existing PMS or CRM?",
      answer:
        "Usually yes. We integrate with common calendars, form tools, HubSpot, GoHighLevel, and many practice-management workflows via API, Zapier, or Make. We audit your stack before recommending changes.",
    },
    {
      question: "Will an AI receptionist replace our front desk?",
      answer:
        "No. It covers overflow, after-hours, and repetitive questions so your team focuses on in-person care. Humans take over when the call needs clinical judgment.",
    },
    {
      question: "How fast can a clinic site launch?",
      answer:
        "Most clinic sites launch in 4–8 weeks depending on service count, intake complexity, and integrations. MVP pages can go live sooner with a phase-2 roadmap for SEO and automations.",
    },
    {
      question: "Do you handle review and recall automation?",
      answer:
        "Yes. Post-visit review requests, rebooking nudges, and recall sequences are standard CRM automation work for us, tied to your calendar and patient tags.",
    },
    {
      question: "How do you approach HIPAA and patient data?",
      answer:
        "We design workflows around your BAAs and approved tools. We do not store PHI in marketing forms without proper handling, and we recommend HIPAA-eligible vendors where required.",
    },
    {
      question: "What does a typical clinic website include?",
      answer:
        "Service pages, provider bios, insurance and FAQ content, online booking, intake forms, local SEO structure, and analytics. Automations connect forms and calls to your CRM.",
    },
    {
      question: "Can you improve local SEO for multiple locations?",
      answer:
        "Yes. We build location pages, schema markup, and internal linking so each office ranks for its market instead of competing with itself.",
    },
    {
      question: "Can you migrate our WordPress site without losing rankings?",
      answer:
        "Yes. We map URLs, set redirects, preserve metadata, and migrate content into Next.js and Sanity so SEO and AI citations stay intact.",
    },
    {
      question: "What ongoing support do you offer after launch?",
      answer:
        "We offer monthly support retainers for content updates, automation tweaks, and performance monitoring, or project-based work for larger additions.",
    },
    {
      question: "How is pricing structured for clinic projects?",
      answer:
        "We scope fixed-price phases for website, automations, and AI tools after a discovery call. You get a written plan with timeline, deliverables, and optional phase-2 items before work starts.",
    },
  ],

  "fitness-coaching-performance": [
    {
      question: "Can you connect Stripe and our CRM?",
      answer:
        "Yes. Checkout, subscriptions, and payment-triggered onboarding sequences are core to how we build coaching funnels.",
    },
    {
      question: "Do you build client portals?",
      answer:
        "Yes. Custom portals for programs, check-ins, and resources are part of our custom software and lead-gen work.",
    },
    {
      question: "We sell multiple programs — one site or many pages?",
      answer:
        "Usually one brand site with dedicated landing pages per offer, each with its own checkout or booking path and tracking.",
    },
    {
      question: "Can you automate client onboarding after payment?",
      answer:
        "Yes. Waivers, intake forms, welcome sequences, and calendar booking can trigger automatically when Stripe marks a sale complete.",
    },
    {
      question: "Do you integrate with Mindbody, Trainerize, or similar tools?",
      answer:
        "Often yes via API, Zapier, or Make. We audit your stack first and recommend the cleanest path so data stays in sync.",
    },
    {
      question: "How fast can a coaching funnel go live?",
      answer:
        "A focused offer page with checkout and onboarding can launch in 3–6 weeks. Full brand sites with multiple programs typically take 6–10 weeks.",
    },
    {
      question: "Can you help with ads and landing page alignment?",
      answer:
        "We build campaign-specific landing pages that match your ad promise, with tracking and CRM tags so you know which creative converts.",
    },
    {
      question: "What about member retention and check-in automations?",
      answer:
        "We build SMS and email check-ins, renewal reminders, and win-back flows tied to tags and purchase dates in your CRM.",
    },
    {
      question: "Do you redesign link-in-bio pages into full sites?",
      answer:
        "Yes. We replace generic link trees with proper funnels, proof, pricing clarity, and booking or checkout paths.",
    },
    {
      question: "How is pricing structured for fitness businesses?",
      answer:
        "Fixed-price phases after discovery: site and landing pages first, then automations and portal work. You approve scope and timeline before we build.",
    },
  ],

  "professional-services": [
    {
      question: "Can you redesign without losing SEO?",
      answer:
        "Yes. We preserve URLs where possible, map redirects, and migrate meta data and structured content carefully.",
    },
    {
      question: "Do you write case studies?",
      answer:
        "We structure and build case study pages; you provide outcomes and quotes. We can also interview clients if needed.",
    },
    {
      question: "Can you connect our proposal and CRM workflow?",
      answer:
        "Yes. We wire intake forms, discovery notes, and proposal follow-up sequences so partners see pipeline status without spreadsheet chaos.",
    },
    {
      question: "Do you build authority content for AI search?",
      answer:
        "Yes. Service pages, FAQs, schema markup, and structured proof help your firm get cited when buyers ask AI tools for recommendations.",
    },
    {
      question: "How do you handle multi-practice or multi-office firms?",
      answer:
        "We build clear service architecture, location or industry vertical pages, and CRM routing so inquiries reach the right team.",
    },
    {
      question: "Can you integrate HubSpot, Salesforce, or GoHighLevel?",
      answer:
        "Yes. Forms, chat, scheduling, and nurture sequences connect to common CRMs via native integrations or middleware.",
    },
    {
      question: "What does a firm website project include?",
      answer:
        "Positioning pages, case studies, team bios, intake forms, booking, FAQ and schema content, analytics, and optional automation phases.",
    },
    {
      question: "How long does a professional services site take?",
      answer:
        "Most firm sites launch in 6–10 weeks depending on page count, case study production, and integration complexity.",
    },
    {
      question: "Do you offer ongoing updates after launch?",
      answer:
        "Yes. Monthly support covers content updates, new case studies, and automation tweaks without waiting on a full rebuild.",
    },
    {
      question: "How is pricing structured for firm projects?",
      answer:
        "We quote fixed phases after discovery: brand site first, then CRM automation and custom dashboards if needed. No surprise hourly billing.",
    },
  ],

  "ecommerce-dtc": [
    {
      question: "Do you only work on Shopify?",
      answer:
        "Shopify is our primary ecommerce stack, but we also build landing pages and automations that connect to your existing storefront.",
    },
    {
      question: "Can you improve product page conversion?",
      answer:
        "Yes. We rebuild PDPs with clearer offers, social proof, FAQ content, speed improvements, and structured data for search and AI discovery.",
    },
    {
      question: "Do you set up Klaviyo, SMS, and cart recovery flows?",
      answer:
        "Yes. Browse abandonment, cart recovery, post-purchase, and win-back sequences are standard automation work for DTC brands.",
    },
    {
      question: "Can you speed up a slow Shopify theme?",
      answer:
        "Yes. We audit apps, images, and theme code, then rebuild or optimize critical templates so mobile LCP and conversion improve.",
    },
    {
      question: "Do you build campaign landing pages outside the main theme?",
      answer:
        "Yes. We ship fast landing pages per offer or creator collab with tracking, so marketing is not blocked by theme release cycles.",
    },
    {
      question: "Can you connect support chat to our product catalog?",
      answer:
        "Yes. AI assistants and chat flows can answer sizing, ingredients, and shipping questions using structured product data.",
    },
    {
      question: "What about subscriptions and retention?",
      answer:
        "We integrate Recharge or native subscriptions and build email flows for replenishment, skip reminders, and churn saves.",
    },
    {
      question: "Do you migrate from WooCommerce or Magento to Shopify?",
      answer:
        "Yes. We handle product data, redirects, tracking, and email stack connections as part of platform migration projects.",
    },
    {
      question: "How fast can DTC fixes go live?",
      answer:
        "Critical conversion fixes can ship in weeks. Full storefront rebuilds typically run 8–12 weeks depending on catalog size and integrations.",
    },
    {
      question: "How is pricing structured for ecommerce work?",
      answer:
        "We prioritize ROI: fixed-price sprints for landing pages and flows, or phased rebuilds with clear deliverables per milestone.",
    },
  ],

  "b2b-saas-technology": [
    {
      question: "Can you work with our existing Next.js or Webflow site?",
      answer:
        "Yes. We migrate, extend, or rebuild depending on speed, SEO, and how much marketing wants to self-serve.",
    },
    {
      question: "Do you build product-led demo and trial funnels?",
      answer:
        "Yes. We connect signup forms, product-qualified routing, and nurture sequences so trials and demos do not sit in a black hole.",
    },
    {
      question: "Can you align marketing site content with our docs?",
      answer:
        "Yes. We structure messaging, FAQs, and changelog content so public pages, docs, and AI assistants share one source of truth.",
    },
    {
      question: "Do you implement FAQ and schema for AI search?",
      answer:
        "Yes. Structured FAQs, comparison pages, and schema markup help your product show up when buyers ask AI tools for vendor lists.",
    },
    {
      question: "Can you integrate HubSpot, Salesforce, or Segment?",
      answer:
        "Yes. Forms, product events, and lifecycle stages connect to your CRM and analytics stack with clear field mapping.",
    },
    {
      question: "Do you build security and compliance pages?",
      answer:
        "Yes. Trust centers, security FAQs, and SOC-ready content layouts are part of enterprise-ready marketing site work.",
    },
    {
      question: "How fast can a SaaS marketing site launch?",
      answer:
        "Focused MVP sites launch in 6–8 weeks. Larger product marketing sites with integrations and migrations run 10–14 weeks.",
    },
    {
      question: "Can marketing edit pages without engineering?",
      answer:
        "Yes. Sanity CMS gives your team controlled blocks for landing pages, blogs, and FAQs without opening a pull request.",
    },
    {
      question: "Do you build AI assistants trained on our docs?",
      answer:
        "Yes. We wire assistants to approved content sources with guardrails, handoff rules, and CRM logging for sales inquiries.",
    },
    {
      question: "How is pricing structured for SaaS projects?",
      answer:
        "Fixed-price phases after discovery: core site and positioning first, then integrations, automations, and AI tools as optional phases.",
    },
  ],

  "real-estate-property": [
    {
      question: "Can you integrate with our CRM or KVCore / Follow Up Boss?",
      answer:
        "Yes. We connect forms, chat, and automations to common real estate CRMs and calendars.",
    },
    {
      question: "Do you build IDX or listing showcase experiences?",
      answer:
        "Yes. We integrate IDX where needed and build fast listing search, neighborhood pages, and mobile-friendly property detail layouts.",
    },
    {
      question: "Can you automate speed-to-lead SMS and email?",
      answer:
        "Yes. Portal and form inquiries trigger instant SMS, email, and task assignment so agents respond in minutes, not hours.",
    },
    {
      question: "Do you build local SEO pages by neighborhood?",
      answer:
        "Yes. Hyperlocal landing pages, FAQs, and schema help teams rank when buyers search for agents in specific areas.",
    },
    {
      question: "Can AI cover after-hours and weekend inquiries?",
      answer:
        "Yes. Voice and SMS assistants qualify budget, timeline, and property interest, then book tours or alert the on-call agent.",
    },
    {
      question: "Do you work with teams and individual agents?",
      answer:
        "Both. Team sites with agent rosters and lead routing, or personal brand sites with listing marketing and CRM automation.",
    },
    {
      question: "Can you showcase sold listings and reviews?",
      answer:
        "Yes. Structured sold stories, testimonial modules, and review automation strengthen trust before the first conversation.",
    },
    {
      question: "How fast can a property site launch?",
      answer:
        "Agent brand sites often launch in 4–6 weeks. Team sites with IDX and automation integrations typically run 8–12 weeks.",
    },
    {
      question: "Do you connect Zillow, Realtor.com, and site forms to one CRM?",
      answer:
        "Yes. We consolidate lead sources with tagging so agents know where each inquiry originated and what to send next.",
    },
    {
      question: "How is pricing structured for real estate projects?",
      answer:
        "Fixed-price phases after discovery: site and local pages first, then CRM automation and AI coverage as add-on phases.",
    },
  ],
};
