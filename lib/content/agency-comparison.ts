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
  heading: "ZedNova vs traditional agencies",
  subheading: "Sixteen categories. Experience-led delivery, not agency overhead.",
  quote:
    "We build, refine, and maintain your web and technology stack so you can run the business without the worry or mental load of web operations.",
  availabilityTag: "Open for projects",
  columns: {
    category: "Category",
    agencies: "Traditional agencies",
    zednova: "ZedNova Studios",
  },
  sections: [
    {
      title: "Scope & what you get",
      rows: [
        {
          category: "Marketing websites",
          agencies: "WordPress, page builders, templated themes. Hard to extend.",
          zednova: "Custom Next.js + Sanity. Built to extend.",
          zednovaPill: "Senior product team",
        },
        {
          category: "E-commerce",
          agencies: "Basic Shopify/WooCommerce. Deep work outsourced.",
          zednova: "Shopify, subscriptions, Klaviyo, full build.",
          zednovaPill: "E-com in-house",
        },
        {
          category: "Custom software & MVPs",
          agencies: "Out of scope or $40k+ timelines.",
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
          agencies: "Generic embed, demo chatbot, or not offered.",
          zednova: "Chat, voice agents, intake that books when useful.",
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
          agencies: "Account manager → junior dev. You rarely meet the builder.",
          zednova: "2–4 seniors with 10+ years shipping products. You talk to builders.",
          zednovaPill: "Experience first",
        },
        {
          category: "Scope changes",
          agencies: "Change orders, delays, billing fights.",
          zednova: "Fixed scope upfront. One team covers pivots.",
          zednovaPill: "No billing surprises",
        },
        {
          category: "Design → build",
          agencies: "Figma handoff. Design ≠ what ships.",
          zednova: "Same senior team designs and builds.",
          zednovaPill: "No handoff gap",
        },
      ],
    },
    {
      title: "Speed, cost & pricing",
      rows: [
        {
          category: "Timelines",
          agencies: "Often 4+ months per project.",
          zednova: "Site: ~1 week. App: 2–3 weeks. MVP: 48h.",
          zednovaPill: "Faster with experience + tooling",
        },
        {
          category: "Cost structure",
          agencies: "You pay agency overhead layers.",
          zednova: "Site + automation + CRM scoped together.",
          zednovaPill: "Pay for output",
        },
        {
          category: "Pricing clarity",
          agencies: "Hourly T&M. Final bill unpredictable.",
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
          zednova: "SMS, CRM, sequences, phone assist at launch.",
          zednovaPill: "Revenue system",
        },
        {
          category: "AI search (AEO/GEO)",
          agencies: "Legacy SEO. AI visibility ignored.",
          zednova: "Schema, AEO copy, llms.txt standard.",
          zednovaPill: "Included by default",
        },
        {
          category: "Track record",
          agencies: "Portfolio-only proof.",
          zednova: "120+ projects. Verifiable client history.",
          zednovaPill: "Check it yourself",
        },
        {
          category: "Post-launch",
          agencies: "Hourly support. New team each time.",
          zednova: "Same team. Web + automation + CRM.",
          zednovaPill: "Full-stack continuity",
        },
      ],
    },
  ] satisfies ComparisonSection[],
};
