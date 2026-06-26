import type { FaqItem } from "@/lib/types";
export type { FaqItem };

export const faqs: FaqItem[] = [
  {
    id: "faq-build",
    order: 1,
    question: "What do you actually build?",
    answer:
      "Websites on Next.js, Webflow, and Framer. Shopify stores. Web apps, client portals, booking systems, and internal dashboards. CRM automations, email and SMS sequences, and n8n or Make workflows. AI chatbots and AI phone assistants. And migrations from any platform you are currently stuck on.",
  },
  {
    id: "faq-who",
    order: 2,
    question: "Who do you usually work with?",
    answer:
      "Clinics, coaches, ecommerce brands, startups, real estate teams, marketing agencies, and small businesses across the US. If you need a website that converts, a store that sells, or a backend that runs without you doing it manually, we are probably a fit.",
  },
  {
    id: "faq-website-vs-software",
    order: 3,
    question: "Do I need a website or custom software?",
    answer:
      "Most businesses need a website first. If you need something more specific, like a client portal, a booking flow with custom logic, or an internal dashboard, that is where custom software comes in. For most teams, a fast responsive site handles what a mobile app would, without App Store cost or approval delays. We will tell you which path makes sense on the first call.",
  },
  {
    id: "faq-existing-tools",
    order: 4,
    question: "Can you work with our existing tools?",
    answer:
      "Yes. We connect to most CRMs, calendars, booking platforms, and form tools. If you are already using HubSpot, GoHighLevel, Calendly, Stripe, or something else, we work around it rather than replacing everything.",
  },
  {
    id: "faq-replace-tools",
    order: 5,
    question: "Do we need to replace our current website or tools?",
    answer:
      "Not always. Sometimes the right move is to improve what you already have. Other times it makes more sense to rebuild, migrate, or replace a messy setup. We look at what you have before recommending anything.",
  },
  {
    id: "faq-migration",
    order: 6,
    question:
      "Can you migrate our site from Webflow, WordPress, Wix, Squarespace, or Framer?",
    answer:
      "Yes. We handle migrations regularly. That includes content, design, SEO settings, redirects, and CMS structure. You keep the history, lose the limitations.",
  },
  {
    id: "faq-seo-migration",
    order: 7,
    question: "Will we lose SEO if we migrate our website?",
    answer:
      "Not if the migration is done properly. We set up 301 redirects, carry over meta data, preserve URL structures where possible, and monitor rankings after launch. Done right, migrations do not hurt SEO.",
  },
  {
    id: "faq-shopify",
    order: 8,
    question: "Can you build Shopify stores?",
    answer:
      "Yes. Full store setups, custom product pages, collection pages, landing pages, and post-purchase flows. We also connect Klaviyo for email and set up cart recovery sequences.",
  },
  {
    id: "faq-automations",
    order: 9,
    question: "What kind of automations can you build?",
    answer:
      "Lead follow-up sequences, booking confirmations and reminders, intake form processing, internal notifications, CRM data syncing, invoice triggers, client onboarding flows, and more. If there is a manual step in your process that happens the same way every time, we can probably automate it.",
  },
  {
    id: "faq-ai-assistants",
    order: 10,
    question: "What can an AI chatbot or AI phone assistant do?",
    answer:
      "Answer common questions, collect contact info, qualify leads, route inquiries to the right person, book appointments, and handle missed calls by following up with a text. It runs around the clock without adding to your payroll.",
  },
  {
    id: "faq-chatgpt",
    order: 11,
    question: "Is this just ChatGPT added to our website?",
    answer:
      "No. Anyone can add a generic chatbot. What we build is trained on your business, your services, your pricing, and your process. It knows when to answer, when to ask a follow-up question, and when to hand off to a human.",
  },
  {
    id: "faq-mobile-app",
    order: 12,
    question: "Do we need a mobile app?",
    answer:
      "Probably not. For most businesses, a fast responsive website handles everything a mobile app would, without the cost or the App Store approval process. If you do need a native app, we build in React Native.",
  },
  {
    id: "faq-timeline",
    order: 13,
    question: "How long does a project take?",
    answer:
      "Simple landing pages and automation setups can go live in one to two weeks. Full website builds typically take three to six weeks. Custom web apps and larger builds depend on scope and we scope those individually.",
  },
  {
    id: "faq-pricing",
    order: 14,
    question: "How does pricing work?",
    answer:
      "We price per project, not per hour. After the first call, you get a fixed-price proposal with a clear scope. No surprises mid-project.",
  },
  {
    id: "faq-ownership",
    order: 15,
    question: "Do we own everything after launch?",
    answer:
      "Yes. You own the code, the design, the domain, and all the accounts. We do not lock you into anything.",
  },
  {
    id: "faq-support",
    order: 16,
    question: "Do you offer support after launch?",
    answer:
      "Yes. We have a monthly support plan for updates, fixes, monitoring, and new additions. Details are in the proposal.",
  },
];

/** Consolidated FAQ set for the homepage — fewer, broader questions. */
export const homepageFaqs: FaqItem[] = [
  faqs.find((item) => item.id === "faq-build")!,
  faqs.find((item) => item.id === "faq-who")!,
  faqs.find((item) => item.id === "faq-website-vs-software")!,
  {
    id: "faq-tools-and-replacement",
    order: 4,
    question: "Can you work with our existing tools, or do we need to replace them?",
    answer:
      "Usually we connect to what you already use — HubSpot, GoHighLevel, Calendly, Stripe, and most CRMs, calendars, and form tools. We only recommend replacing something when the current setup is slowing you down or blocking automation. We audit what you have before suggesting any rebuild.",
  },
  {
    id: "faq-migration-seo",
    order: 5,
    question: "Can you migrate our site from Webflow, WordPress, Wix, or Framer without hurting SEO?",
    answer:
      "Yes. We handle migrations regularly with 301 redirects, preserved meta data, URL structures kept where possible, and post-launch monitoring. Content, design, SEO settings, and CMS structure move over — you keep the history and lose the platform limitations.",
  },
  {
    id: "faq-automation-ai",
    order: 6,
    question: "What automations and AI tools can you build?",
    answer:
      "CRM follow-up, booking confirmations, intake processing, internal notifications, reporting, and workflow syncing in n8n or Make. AI chatbots and phone assistants trained on your services, pricing, and process — not a generic ChatGPT widget. They answer questions, qualify leads, book appointments, and hand off to a human when needed.",
  },
  {
    id: "faq-timeline-pricing",
    order: 7,
    question: "How long does a project take and how does pricing work?",
    answer:
      "Simple landing pages and automation setups can go live in one to two weeks. Full website builds typically take three to six weeks. Custom apps depend on scope. We price per project, not per hour — after the first call you get a fixed-price proposal with clear scope.",
  },
  {
    id: "faq-ownership-support",
    order: 8,
    question: "Do we own everything after launch, and do you offer support?",
    answer:
      "Yes — you own the code, design, domain, and accounts. We do not lock you in. After launch we offer a monthly support plan for updates, fixes, monitoring, and new additions.",
  },
];

const FAQ_CATEGORY_ORDER = [
  "General",
  "Pricing",
  "Timeline",
  "Technical",
  "SEO",
  "AI / Automation",
  "CMS",
  "Support",
  "Migration",
  "Industry-specific",
  "Services",
  "Process",
  "Industries",
  "Migrations",
  "Custom Software",
  "Products",
  "Company",
] as const;

export function groupFaqsByCategory(faqs: FaqItem[]) {
  const byCategory = new Map<string, FaqItem[]>();

  for (const faq of faqs) {
    const category = faq.category?.trim() || "General";
    const items = byCategory.get(category) ?? [];
    items.push(faq);
    byCategory.set(category, items);
  }

  const known = FAQ_CATEGORY_ORDER.filter((category) => byCategory.has(category)).map(
    (category) => ({
      category,
      items: [...(byCategory.get(category) ?? [])].sort((a, b) => a.order - b.order),
    }),
  );

  const extra = [...byCategory.keys()]
    .filter((category) => !FAQ_CATEGORY_ORDER.includes(category as (typeof FAQ_CATEGORY_ORDER)[number]))
    .sort((a, b) => a.localeCompare(b))
    .map((category) => ({
      category,
      items: [...(byCategory.get(category) ?? [])].sort((a, b) => a.order - b.order),
    }));

  return [...known, ...extra];
}
