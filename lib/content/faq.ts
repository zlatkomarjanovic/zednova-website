export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export const faqs: FaqItem[] = [
  {
    id: "faq-build",
    order: 1,
    question: "What do you actually build?",
    answer:
      "We build websites, Shopify stores, landing pages, client portals, dashboards, booking systems, CRM automations, AI chatbots, AI phone assistants, and website migrations. Most projects combine a few of these, depending on what your business needs.",
  },
  {
    id: "faq-who",
    order: 2,
    question: "Who do you usually work with?",
    answer:
      "We work with clinics, coaches, fitness businesses, ecommerce brands, startups, nonprofits, marketing agencies, and small businesses that need better websites, cleaner workflows, or custom software features.",
  },
  {
    id: "faq-website-vs-software",
    order: 3,
    question: "Do I need a website or custom software?",
    answer:
      "You need a website if people only need to learn about your business, contact you, book a call, or buy something. You need custom software if users need to log in, upload files, view progress, manage records, track data, complete forms, or use a custom dashboard.",
  },
  {
    id: "faq-existing-tools",
    order: 4,
    question: "Can you work with our existing tools?",
    answer:
      "Yes. We can usually work with the tools you already use. That can include Shopify, Webflow, WordPress, Sanity, HubSpot, GoHighLevel, Airtable, Google Sheets, Stripe, Calendly, Typeform, Slack, email, SMS, n8n, Make, Zapier, and custom APIs.",
  },
  {
    id: "faq-replace-tools",
    order: 5,
    question: "Do we need to replace our current website or tools?",
    answer:
      "Not always. Sometimes the best move is to improve what you already have. Other times it makes more sense to rebuild, migrate, or replace a messy setup. We look at your current website, tools, content, workflows, and goals before recommending anything.",
  },
  {
    id: "faq-migration",
    order: 6,
    question:
      "Can you migrate our site from Webflow, WordPress, Wix, Squarespace, or Framer?",
    answer:
      "Yes. We can migrate websites from no-code or CMS platforms into a custom Next.js website with Sanity CMS. A migration can include pages, blog posts, CMS content, images, redirects, SEO basics, analytics, forms, and a cleaner editing setup for your team.",
  },
  {
    id: "faq-seo-migration",
    order: 7,
    question: "Will we lose SEO if we migrate our website?",
    answer:
      "A migration can affect SEO if it is handled poorly. We reduce risk by mapping old URLs to new URLs, setting up redirects, preserving important content, checking metadata, submitting sitemaps, and testing the site before launch. Some ranking movement can still happen after a major migration, but planning helps avoid obvious mistakes.",
  },
  {
    id: "faq-shopify",
    order: 8,
    question: "Can you build Shopify stores?",
    answer:
      "Yes. We build Shopify stores, product pages, landing pages, collection pages, checkout improvements, subscription flows, Klaviyo email flows, cart abandonment emails, post-purchase emails, and ecommerce dashboards. We can also build headless Shopify storefronts when a brand needs more design control or performance.",
  },
  {
    id: "faq-automations",
    order: 9,
    question: "What kind of automations can you build?",
    answer:
      "We can automate lead follow-up, appointment reminders, form submissions, CRM updates, email and SMS sequences, review requests, booking flows, internal notifications, dashboard updates, and repetitive admin tasks. The goal is to remove manual steps that your team repeats every day.",
  },
  {
    id: "faq-ai-assistants",
    order: 10,
    question: "What can an AI chatbot or AI phone assistant do?",
    answer:
      "An AI chatbot can answer common questions, collect details, qualify leads, route inquiries, and help people take the next step. An AI phone assistant can answer calls, collect caller information, handle missed-call text-back, and send details into your CRM or booking workflow.",
  },
  {
    id: "faq-chatgpt",
    order: 11,
    question: "Is this just ChatGPT added to our website?",
    answer:
      "No. A useful AI setup needs clear prompts, business rules, forms, data sources, routing, CRM connection, fallback paths, testing, and monitoring. The chatbot or phone assistant should fit your workflow, not just sit on the site as a generic widget.",
  },
  {
    id: "faq-mobile-app",
    order: 12,
    question: "Do we need a mobile app?",
    answer:
      "Most small businesses should start with a responsive web app first. It works on phones, tablets, and computers without app store approval. A mobile app makes sense later if users need push notifications, offline access, camera features, location features, or frequent daily use.",
  },
  {
    id: "faq-timeline",
    order: 13,
    question: "How long does a project take?",
    answer:
      "A simple landing page or automation can take a few days. A full website usually takes a few weeks. A Shopify store, custom dashboard, client portal, or migration depends on the number of pages, features, integrations, and revisions. After we understand the scope, we give you a clear timeline.",
  },
  {
    id: "faq-pricing",
    order: 14,
    question: "How does pricing work?",
    answer:
      "Pricing depends on the project type, complexity, number of pages, integrations, and how much custom functionality is needed. Small fixes and automations cost less. Full websites, Shopify builds, migrations, dashboards, and custom web apps cost more because they involve planning, design, development, testing, and launch work.",
  },
  {
    id: "faq-ownership",
    order: 15,
    question: "Do we own everything after launch?",
    answer:
      "Yes. You get access to the website, CMS, codebase, automations, dashboards, accounts, and documentation where applicable. We do not build projects in a way that locks you out of your own business setup.",
  },
  {
    id: "faq-support",
    order: 16,
    question: "Do you offer support after launch?",
    answer:
      "Yes. We can help with updates, fixes, new pages, automation changes, dashboard improvements, CMS support, analytics, and new features. You can hire us for a one-time project or keep us available for ongoing support.",
  },
];
