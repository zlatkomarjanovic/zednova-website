export type Comparison = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  left: {
    name: string;
    tagline: string;
    strengths: string[];
    weaknesses: string[];
  };
  right: {
    name: string;
    tagline: string;
    strengths: string[];
    weaknesses: string[];
  };
  verdict: string;
  whenLeft: string;
  whenRight: string;
  related: { label: string; href: string }[];
};

export const comparisons: Comparison[] = [
  {
    slug: "webflow-vs-nextjs-sanity",
    title: "Webflow vs Next.js + Sanity — Which Stack Should You Build On?",
    h1: "Webflow vs Next.js + Sanity",
    description:
      "Webflow is fast to launch but locks you into its platform. Next.js + Sanity gives you full control, better performance, and room to grow into apps, automation, and AI tools. Here is when to pick which.",
    intro:
      "Both stacks build great marketing sites. The decision comes down to how much you need to customize, integrate, and scale beyond the website itself.",
    left: {
      name: "Webflow",
      tagline: "Visual builder, fast to launch, hosted for you.",
      strengths: [
        "Designers can ship without a developer",
        "Visual CMS is approachable for non-technical teams",
        "Hosting and SSL are handled",
        "Good for marketing sites under 50 pages",
      ],
      weaknesses: [
        "Limited custom logic and integrations",
        "Performance ceiling vs a tuned Next.js build",
        "Hard to extend into apps, portals, or dashboards",
        "Plan-based limits on CMS items and traffic",
      ],
    },
    right: {
      name: "Next.js + Sanity",
      tagline: "Full-stack React with structured content you own.",
      strengths: [
        "Full control over performance, schema, and integrations",
        "Structured content reusable across apps, emails, and AI",
        "Scales into web apps, portals, dashboards, and automations",
        "No platform lock-in — you own the code and content",
      ],
      weaknesses: [
        "Requires a developer to build and maintain",
        "Higher upfront investment than a visual builder",
        "More moving parts (frontend, backend, CMS, hosting)",
      ],
    },
    verdict:
      "Pick Webflow if you need a marketing site live this week and do not plan to build apps or automation. Pick Next.js + Sanity if you want a foundation that grows into software, automation, and AI tools without a rebuild.",
    whenLeft:
      "Best when the site is the product and a designer-led workflow matters more than custom integrations.",
    whenRight:
      "Best when the website is one part of a larger system — CRM, booking, portals, automation, or AI.",
    related: [
      { label: "Webflow → Next.js migration", href: "/migrations/webflow-to-nextjs-sanity" },
      { label: "Custom software", href: "/custom-software" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    slug: "wordpress-vs-nextjs-sanity",
    title: "WordPress vs Next.js + Sanity — Migration Guide",
    h1: "WordPress vs Next.js + Sanity",
    description:
      "WordPress is familiar and plugin-rich but slow, security-heavy, and hard to extend into modern apps. Next.js + Sanity is faster, more secure, and gives you structured content for apps and AI. Here is when to migrate.",
    intro:
      "WordPress powers a huge share of the web, but most teams outgrow it once they need performance, security, or custom software.",
    left: {
      name: "WordPress",
      tagline: "Mature ecosystem, plugin-heavy, self-managed.",
      strengths: [
        "Huge plugin and theme ecosystem",
        "Familiar to most marketing teams",
        "Low cost to start",
      ],
      weaknesses: [
        "Plugin conflicts and security patches are constant",
        "Performance is hard to tune without caching layers",
        "Content model is post-centric, not structured",
        "Hard to extend into apps, portals, or AI tools",
      ],
    },
    right: {
      name: "Next.js + Sanity",
      tagline: "Modern React frontend with structured content.",
      strengths: [
        "Sub-2-second loads with no caching plugins",
        "Structured content reusable across apps and AI",
        "No plugins to maintain, no theme lock-in",
        "Scales into web apps, portals, and automations",
      ],
      weaknesses: [
        "Requires a developer to build and maintain",
        "Migration requires a redirect map and content modeling",
        "Higher upfront investment",
      ],
    },
    verdict:
      "Migrate to Next.js + Sanity when plugin fatigue, performance issues, or a need for custom software outgrows what WordPress can do without constant maintenance.",
    whenLeft:
      "Best for simple blogs or brochure sites where plugins do everything you need and performance is not a priority.",
    whenRight:
      "Best for clinics, ecommerce, and service businesses that need speed, security, and a foundation for automation and AI.",
    related: [
      { label: "WordPress → Next.js migration", href: "/migrations/wordpress-to-nextjs-sanity" },
      { label: "Migrations overview", href: "/migrations" },
      { label: "Custom software", href: "/custom-software" },
    ],
  },
  {
    slug: "framer-vs-nextjs",
    title: "Framer vs Next.js — Which Should You Build On?",
    h1: "Framer vs Next.js",
    description:
      "Framer is great for design-led marketing pages. Next.js gives you full control and a path to apps, automation, and AI. Here is how to choose.",
    intro:
      "Both can build a beautiful marketing site. The question is whether you will ever need more than a website.",
    left: {
      name: "Framer",
      tagline: "Design-first, visual, hosted.",
      strengths: [
        "Designers can ship without code",
        "Fast to launch simple marketing sites",
        "Built-in hosting and CMS",
      ],
      weaknesses: [
        "Limited custom logic and integrations",
        "Hard to extend into apps or automation",
        "Content model is not structured for reuse",
      ],
    },
    right: {
      name: "Next.js",
      tagline: "Full-stack React, no ceiling.",
      strengths: [
        "Full control over performance and integrations",
        "Scales into web apps, portals, and dashboards",
        "Structured content for AI and automation",
        "You own the code and hosting",
      ],
      weaknesses: [
        "Requires a developer",
        "Higher upfront investment",
      ],
    },
    verdict:
      "Pick Framer for a design-led marketing site you will not extend. Pick Next.js if you might build apps, automation, or AI tools on the same foundation.",
    whenLeft:
      "Best when the site is the entire project and design speed matters most.",
    whenRight:
      "Best when the website is the first piece of a larger system.",
    related: [
      { label: "Framer → Next.js migration", href: "/migrations/framer-to-nextjs-sanity" },
      { label: "Custom software", href: "/custom-software" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    slug: "website-only-vs-website-crm-automation",
    title: "Website Only vs Website + CRM Automation",
    h1: "Website Only vs Website + CRM Automation",
    description:
      "A website alone attracts leads. A website wired to CRM automation captures, follows up, and books them. Here is the difference it makes.",
    intro:
      "Most businesses buy a website and assume leads will follow. The ones that grow fastest wire the site to a CRM and automation from day one.",
    left: {
      name: "Website only",
      tagline: "A site that exists, but no follow-up.",
      strengths: [
        "Lower upfront cost",
        "Faster to launch",
        "Simpler to maintain",
      ],
      weaknesses: [
        "Leads sit in inbox, unchecked",
        "No automated follow-up or booking",
        "Missed calls go to voicemail and die",
        "Manual data entry and reporting",
      ],
    },
    right: {
      name: "Website + CRM automation",
      tagline: "A site that captures, follows up, and books.",
      strengths: [
        "Every form and call is logged automatically",
        "Instant follow-up on missed calls and leads",
        "Automated booking and reminders",
        "Dashboards and reporting without manual work",
      ],
      weaknesses: [
        "Higher upfront investment",
        "Requires CRM and workflow setup",
      ],
    },
    verdict:
      "If you have more leads than you can follow up on manually, a website plus CRM automation pays for itself in the first month.",
    whenLeft:
      "Best for businesses with very low lead volume or a dedicated receptionist.",
    whenRight:
      "Best for clinics, service businesses, and ecommerce brands that cannot afford to miss a lead.",
    related: [
      { label: "CRM & Pipeline Automation", href: "/services/crm-pipeline-automation" },
      { label: "AI Receptionist", href: "/services/ai-receptionist" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    slug: "generic-chatbot-vs-ai-receptionist",
    title: "Generic Chatbot vs AI Receptionist",
    h1: "Generic Chatbot vs AI Receptionist",
    description:
      "A generic chatbot answers FAQs. An AI receptionist answers calls, texts back missed calls, books appointments, and routes to a human. Here is the difference.",
    intro:
      "Chatbots have been around for years. AI receptionists are a different category — they handle voice, SMS, booking, and CRM together.",
    left: {
      name: "Generic chatbot",
      tagline: "Text-based FAQ bot on your site.",
      strengths: [
        "Cheap and easy to deploy",
        "Handles common FAQ questions",
        "Works 24/7 on the website",
      ],
      weaknesses: [
        "Cannot answer phone calls",
        "Cannot text back missed calls",
        "Cannot book appointments or update CRM",
        "Limited to website visitors only",
      ],
    },
    right: {
      name: "AI receptionist",
      tagline: "Voice + SMS + booking + CRM in one.",
      strengths: [
        "Answers inbound calls 24/7",
        "Texts back missed calls instantly",
        "Books appointments and updates CRM",
        "Transfers to a human when needed",
      ],
      weaknesses: [
        "Higher monthly cost than a chatbot",
        "Requires CRM and telephony setup",
      ],
    },
    verdict:
      "If your business loses leads to voicemail, an AI receptionist is the upgrade that matters. A chatbot only helps website visitors.",
    whenLeft:
      "Best for businesses that get most leads through the website, not the phone.",
    whenRight:
      "Best for clinics, service businesses, and any team that gets calls they cannot always answer.",
    related: [
      { label: "AI Receptionist", href: "/services/ai-receptionist" },
      { label: "CRM & Pipeline Automation", href: "/services/crm-pipeline-automation" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    slug: "zednova-vs-traditional-agency",
    title: "ZedNova Studios vs Traditional Agency",
    h1: "ZedNova Studios vs Traditional Agency",
    description:
      "Traditional agencies charge for overhead, layers, and meetings. ZedNova is senior-led, async, and ships the same work for less. Here is the honest comparison.",
    intro:
      "Agencies are not bad — they are expensive. The question is whether you need the layers or just the work.",
    left: {
      name: "Traditional agency",
      tagline: "Layers, overhead, meetings.",
      strengths: [
        "Large teams for big enterprise rollouts",
        "Formal account management",
        "Established procurement process",
      ],
      weaknesses: [
        "You pay for overhead, not the work",
        "Multiple layers between you and the builder",
        "Weekly meetings that could have been async",
        "Slow turnaround on changes",
      ],
    },
    right: {
      name: "ZedNova Studios",
      tagline: "Senior-led, async, ships.",
      strengths: [
        "You work with the person doing the work",
        "Async delivery — fewer meetings, more output",
        "Texas LLC, real accountability",
        "120+ projects, 10+ years shipping",
        "AI-cited, schema-ready builds out of the box",
      ],
      weaknesses: [
        "Not built for enterprise procurement",
        "Smaller team — not for huge concurrent rollouts",
      ],
    },
    verdict:
      "If you need senior work without the agency overhead, ZedNova ships the same quality for less. If you need a 20-person team and formal procurement, an agency is the better fit.",
    whenLeft:
      "Best for enterprise teams that need layers, procurement, and large concurrent rollouts.",
    whenRight:
      "Best for clinics, ecommerce brands, and service businesses that want senior work without paying for overhead.",
    related: [
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
    ],
  },
];
