import type { ArticleFaq } from "@/lib/types";

/** Default FAQ items per parent service — seeded to Sanity and used as fallback when CMS list is empty. */
export const serviceFaqsBySlug: Record<string, ArticleFaq[]> = {
  "ai-lead-site": [
    {
      question: "How long does a lead-gen website take to launch?",
      answer:
        "Most projects launch in 7–10 business days for an MVP with core offer pages, lead capture, and CRM connection live. Larger sites with multiple service lines or programmatic SEO pages typically take 2–4 weeks.",
    },
    {
      question: "Do you build on Next.js or Webflow?",
      answer:
        "Both. We recommend Next.js + Sanity when you want maximum speed, AI-search structure, and a content system that scales. Webflow works well for simpler sites or teams already on that stack.",
    },
    {
      question: "Will my site show up in ChatGPT and Google AI Overviews?",
      answer:
        "We structure every page with schema markup, direct-answer blocks, FAQ schema, and llms.txt so AI engines can parse and cite your business. Rankings and citations depend on your market, but the technical foundation is built in from day one.",
    },
    {
      question: "What happens to my leads after someone fills out a form?",
      answer:
        "Every form submission creates a CRM contact instantly and sends a mobile alert to your team. We wire HubSpot, GoHighLevel, or Salesforce depending on what you already use.",
    },
    {
      question: "Can you redesign my existing site without losing SEO?",
      answer:
        "Yes. We map every existing URL, set up 301 redirects, preserve schema and content equity, and launch on a faster stack without dropping rankings.",
    },
    {
      question: "What's included in the starting price?",
      answer:
        "Funnel mapping, custom design, MVP build on Next.js or Webflow, schema & AI-search setup, CRM-connected forms, GA4 tracking, staging review, production launch, and 30 days of post-launch fixes.",
    },
  ],
  "crm-pipeline-automation": [
    {
      question: "Which CRM platforms do you work with?",
      answer:
        "HubSpot, GoHighLevel, and Salesforce are the most common. We audit what you already use and recommend staying on your current stack unless there is a clear reason to switch.",
    },
    {
      question: "How long does CRM automation setup take?",
      answer:
        "Most CRM automation projects go live in 3–7 business days after the pipeline workshop. Complex multi-team setups with custom routing can take 2–3 weeks.",
    },
    {
      question: "Do you migrate our existing contacts and deals?",
      answer:
        "Yes. We clean up stages, import contacts and open deals, and map legacy fields so your team does not start from zero on go-live day.",
    },
    {
      question: "What automations are included in the MVP?",
      answer:
        "Form-to-CRM capture, instant lead alerts, stage-based email and SMS follow-up, missed-lead re-engagement, appointment reminders, and owner notifications for new pipeline activity.",
    },
    {
      question: "Will my team actually use this?",
      answer:
        "We design stages around how your team already sells, document the workflow, and run a handoff session so adoption is not an afterthought.",
    },
  ],
  "ai-receptionist": [
    {
      question: "Can the AI receptionist book appointments on my calendar?",
      answer:
        "Yes. We connect your calendar and booking rules so qualified callers can schedule directly. Complex cases escalate to a human with context attached.",
    },
    {
      question: "What happens when someone calls after hours?",
      answer:
        "The agent answers with after-hours messaging, captures lead details, offers booking if appropriate, and triggers missed-call text-back within seconds.",
    },
    {
      question: "How natural does the voice agent sound?",
      answer:
        "We script for your services, tone, and common objections using Vapi, Retell, or Twilio. You approve scripts before go-live and we tune from real call logs after launch.",
    },
    {
      question: "Does every call get logged to our CRM?",
      answer:
        "Yes. Each interaction creates or updates a contact with a call summary, outcome, and next step so your team picks up where the agent left off.",
    },
    {
      question: "How fast can we go live?",
      answer:
        "Most AI receptionist MVPs launch in 5–10 business days with your top call scenarios handled, missed-call SMS wired, and escalation rules in place.",
    },
  ],
  "custom-in-house-software-for-smbs": [
    {
      question: "Which tools can you pull data from?",
      answer:
        "Common sources include HubSpot, GoHighLevel, Google Analytics, Google Ads, Meta Ads, Stripe, and spreadsheets. We audit your stack first and connect what matters for your KPIs.",
    },
    {
      question: "Do you build in Looker Studio or custom dashboards?",
      answer:
        "Both. Looker Studio is faster for standard reporting. Custom Next.js dashboards make sense when you need auth, client-facing portals, or workflows inside the view.",
    },
    {
      question: "How often does the data refresh?",
      answer:
        "Most MVP dashboards refresh daily. Near-real-time pipelines are available in phase two if you need live operational views.",
    },
    {
      question: "Can clients or staff get their own login?",
      answer:
        "Yes. We can ship role-based portals so clients see their data only, while internal teams see the full operational view.",
    },
    {
      question: "What does the MVP include?",
      answer:
        "A KPI workshop, source audit, pipeline for 6–8 core metrics, one executive dashboard, mobile-friendly access, and threshold alerts on key drops.",
    },
  ],
  "platform-migrations": [
    {
      question: "Which platforms do you migrate from?",
      answer:
        "Webflow, WordPress, Framer, Wix, Squarespace, Shopify themes, and custom stacks. We rebuild on Next.js + Sanity unless your requirements clearly fit another target.",
    },
    {
      question: "Will we lose SEO rankings during migration?",
      answer:
        "Not if we do it correctly. Every URL is mapped, 301 redirects are tested, schema and metadata are preserved, and we monitor Search Console after cutover.",
    },
    {
      question: "How long does a migration take?",
      answer:
        "Small marketing sites typically migrate in 2–4 weeks. Larger sites with hundreds of URLs, blog archives, or ecommerce flows take 4–8 weeks depending on scope.",
    },
    {
      question: "Is there downtime on launch day?",
      answer:
        "We stage the new site, run QA, switch DNS with a rollback plan, and cut over with zero-downtime deployment wherever your hosting allows it.",
    },
    {
      question: "Do you migrate blog posts and CMS content too?",
      answer:
        "Yes. Content, authors, categories, images, and metadata move into Sanity with redirects so indexed URLs keep working.",
    },
  ],
  "ai-systems-retainer": [
    {
      question: "What's included each month on the retainer?",
      answer:
        "A strategy check-in, one shipped improvement, unlimited small fixes, performance monitoring, and a monthly report on site speed, leads, and system health.",
    },
    {
      question: "What counts as a small fix vs a project?",
      answer:
        "Small fixes are copy updates, form tweaks, automation adjustments, and bug fixes under about an hour. Larger features are scoped separately or rolled into your monthly improvement slot.",
    },
    {
      question: "Can we pause or cancel?",
      answer:
        "Yes. Retainers are month-to-month after the initial 90-day onboarding period so we can actually improve the system, not just patch emergencies.",
    },
    {
      question: "Do you support sites you didn't build?",
      answer:
        "Sometimes. We audit the stack first. Next.js, Webflow, Shopify, HubSpot, and GoHighLevel stacks are the best fit.",
    },
    {
      question: "How fast do you respond to urgent issues?",
      answer:
        "Critical production issues get same-business-day response on active retainers. Non-urgent requests are batched into your monthly improvement queue.",
    },
  ],
};

export function getServiceFaqs(slug: string): ArticleFaq[] {
  return serviceFaqsBySlug[slug] ?? [];
}
