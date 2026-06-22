export type ComparisonRow = {
  category: string;
  agencies: string;
  zednova: string;
  zednovaPill: string;
};

export type ComparisonSection = {
  title: string;
  rows: ComparisonRow[];
};

export const agencyComparison = {
  label: "Why us",
  heading: "ZedNova vs traditional & AI agencies",
  subheading: "Sixteen categories. One glance to see the difference.",
  quote:
    "We build, refine, and maintain your web and technology stack so you can run the business without the worry or mental load of web operations.",
  columns: {
    category: "Category",
    agencies: "Traditional & AI agencies",
    zednova: "ZedNova Studios",
  },
  sections: [
    {
      title: "Scope & what you get",
      rows: [
        {
          category: "Marketing websites",
          agencies: "WordPress, page builders, or AI-polished same stack. Hard to extend.",
          zednova: "Custom Next.js + Sanity. Built to extend.",
          zednovaPill: "Senior devs + AI",
        },
        {
          category: "E-commerce",
          agencies: "Basic Shopify/WooCommerce, or not offered at AI studios.",
          zednova: "Shopify, subscriptions, Klaviyo, full build.",
          zednovaPill: "E-com in-house",
        },
        {
          category: "Custom software & MVPs",
          agencies: "Out of scope, $40k+ timelines, or Figma-only MVPs.",
          zednova: "Portals, apps, dashboards. MVP in 48 hours.",
          zednovaPill: "Software without enterprise pricing",
        },
        {
          category: "CRM & automation",
          agencies: "Form to inbox. Automation is a separate vendor.",
          zednova: "CRM, routing, SMS, sequences at launch.",
          zednovaPill: "Follow-up built in",
        },
        {
          category: "AI tools",
          agencies: "Generic embed, chatbot demo, or not offered.",
          zednova: "Chat, voice agents, intake that books.",
          zednovaPill: "Deployed, not demoed",
        },
        {
          category: "Platform migrations",
          agencies: "Rebuild with SEO risk. Partial CMS transfer.",
          zednova: "Full redirect map + CMS migration.",
          zednovaPill: "SEO-safe migration",
        },
      ],
    },
    {
      title: "Team & process",
      rows: [
        {
          category: "Who builds it",
          agencies: "Account manager → junior dev, or founder-led thin backend.",
          zednova: "2–4 seniors. You talk to builders.",
          zednovaPill: "Small team, big output",
        },
        {
          category: "Scope changes",
          agencies: "Change orders, sprint limits, new vendors for pivots.",
          zednova: "Fixed scope upfront. One team covers pivots.",
          zednovaPill: "No billing surprises",
        },
        {
          category: "Design → build",
          agencies: "Figma handoff or design-only AI flow. Code gaps.",
          zednova: "Same team designs and builds.",
          zednovaPill: "No handoff gap",
        },
      ],
    },
    {
      title: "Speed, cost & pricing",
      rows: [
        {
          category: "Timelines",
          agencies: "4+ months traditional, or 4–8 weeks for full AI builds.",
          zednova: "Site: ~1 week. App: 2–3 weeks. MVP: 48h.",
          zednovaPill: "Fast with depth",
        },
        {
          category: "Cost structure",
          agencies: "Agency overhead, or web-only pricing with add-ons.",
          zednova: "Site + automation + CRM scoped together.",
          zednovaPill: "Pay for output",
        },
        {
          category: "Pricing clarity",
          agencies: "Hourly T&M, or tiered sprints with scope creep.",
          zednova: "Published starts. Fixed scope, fixed price.",
          zednovaPill: "Number upfront",
        },
      ],
    },
    {
      title: "Results & support",
      rows: [
        {
          category: "Lead conversion",
          agencies: "Site only. No follow-up system wired in.",
          zednova: "SMS, CRM, sequences, AI phone at launch.",
          zednovaPill: "Revenue system",
        },
        {
          category: "AI search (AEO/GEO)",
          agencies: "Legacy SEO, or GEO sold as add-on.",
          zednova: "Schema, AEO copy, llms.txt standard.",
          zednovaPill: "Included by default",
        },
        {
          category: "Track record",
          agencies: "Portfolio-only or limited third-party reviews.",
          zednova: "120+ projects. Public Upwork JSS.",
          zednovaPill: "Verify anywhere",
        },
        {
          category: "Post-launch",
          agencies: "Hourly support, or design-only iteration.",
          zednova: "Same team. Web + automation + CRM.",
          zednovaPill: "Full-stack continuity",
        },
      ],
    },
  ] satisfies ComparisonSection[],
};
