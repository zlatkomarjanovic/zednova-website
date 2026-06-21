export type ComparisonRow = {
  category: string;
  traditional: string;
  aiAgency: string;
  zednova: string;
  zednovaPill: string;
};

export type ComparisonSection = {
  title: string;
  rows: ComparisonRow[];
};

export const agencyComparison = {
  label: "Why us",
  heading: "ZedNova vs traditional agencies vs other AI studios",
  subheading:
    "Sixteen categories side by side: scope, team, speed, cost, and results. See where traditional web agencies, AI-first studios, and ZedNova actually differ.",
  legend: [
    { label: "Traditional web agency", color: "#888780" },
    { label: "Other AI agencies", color: "#7F77DD" },
    { label: "ZedNova Studios", color: "#1D9E75" },
  ] as const,
  columns: {
    category: "Category",
    traditional: "Traditional web agency",
    aiAgency: "Other AI agencies",
    zednova: "ZedNova Studios",
  },
  sections: [
    {
      title: "Scope & what you actually get",
      rows: [
        {
          category: "Marketing websites",
          traditional:
            "Built on WordPress, page builders, or templated Webflow themes. Fast to spin up, hard to extend, often slow on Lighthouse out of the box.",
          aiAgency:
            "Many still build on WordPress or page builders and use AI for copy, layouts, and design speed. The stack stays the same. Visual output can look polished, but custom logic and performance depth are usually out of scope.",
          zednova:
            "Custom Next.js with Sanity CMS. Coded by senior developers using the latest AI models (Claude, GLM, and others) for speed without cutting corners. Performance-optimized, SEO-wired, and built to extend with apps, automations, and AI tools.",
          zednovaPill: "Senior devs + AI models",
        },
        {
          category: "E-commerce development",
          traditional:
            "Most offer WooCommerce or basic Shopify. Deep e-com logic (subscriptions, bundles, headless) sent to a separate specialist.",
          aiAgency:
            "Rarely offered. Most AI studios focus on marketing or product design. Shopify builds are outside their lane.",
          zednova:
            "Shopify stores, product pages, subscription flows, checkout optimization, Klaviyo email. Full build, no referral needed.",
          zednovaPill: "Full e-com in-house",
        },
        {
          category: "Custom software & MVPs",
          traditional:
            "Out of scope for most web agencies. When offered, timelines run 12-20 weeks and pricing enters the $40k-$150k range. A separate vendor is usually required.",
          aiAgency:
            "Some offer MVP design or product prototyping. Most stop at Figma. Functional backend and database work are outside the typical AI studio offering.",
          zednova:
            "Web apps, client portals, booking systems, dashboards, admin panels, patient intake portals. Custom-built on Next.js. Working MVP within 48 hours, full build in 2-3 weeks.",
          zednovaPill: "Software without the enterprise price",
        },
        {
          category: "CRM & lead automation",
          traditional:
            "A contact form that emails a Gmail inbox. Occasionally a Zapier zap wiring form to a spreadsheet. CRM setup, lead routing, and sequences almost never included.",
          aiAgency:
            "Design-focused AI studios don't touch CRM. Some automation-focused AI agencies exist separately but don't build the site.",
          zednova:
            "n8n, Make, GoHighLevel, HubSpot. Lead routing, CRM pipeline setup, email and SMS sequences, booking flows wired at launch. Site and follow-up ship together.",
          zednovaPill: "Follow-up built in, not bolted on",
        },
        {
          category: "AI tools (chatbots, voice)",
          traditional:
            "Not offered. If mentioned, it's a ChatGPT embed copied from a tutorial. No custom training, no CRM connection, no phone agent.",
          aiAgency:
            "Some offer AI chatbots or landing page copy generation. Deployed voice agents (missed-call SMS, AI phone assistants) are rare outside specialist vendors.",
          zednova:
            "Website chatbots, AI phone assistants for missed calls, voice agents via Vapi and ElevenLabs, intake flows that qualify and book without human intervention.",
          zednovaPill: "Deployed, not demoed",
        },
        {
          category: "Platform migrations",
          traditional:
            "Treated as a full rebuild. SEO redirects handled inconsistently. Post-migration ranking drops are common and rarely monitored.",
          aiAgency:
            "Occasionally offered as a platform migration. SEO continuity and full CMS data migration are typically out of scope.",
          zednova:
            "WordPress, Wix, Squarespace, Webflow, Framer, Airtable to Next.js + Sanity. Full redirect mapping, pre-crawl benchmarking, schema transfer, post-launch monitoring. Rankings held.",
          zednovaPill: "SEO-safe, full CMS transfer",
        },
      ],
    },
    {
      title: "Team, communication & process",
      rows: [
        {
          category: "Who works on your project",
          traditional:
            "An account manager sells it, a project manager coordinates it, a junior executes it, a senior reviews it sometimes. You rarely speak to the person building.",
          aiAgency:
            "Usually founder-led small teams with good direct access. Strong on communication, weaker when projects require backend depth or automation that needs a different specialist.",
          zednova:
            "2-4 senior specialists who deliver the output of a 30-person team with AI. You talk directly to the people building, not a coordinator relaying messages.",
          zednovaPill: "Small team, outsized output",
        },
        {
          category: "Scope changes & change orders",
          traditional:
            "52% of agency projects experience scope expansion. 78% of agencies rarely or only sometimes charge for it, either absorbing the cost silently or triggering a formal change order that adds weeks and fees. (Ignition, 2025)",
          aiAgency:
            "Sprint-based models handle iteration better. But moving outside core design scope (adding backend, CRM, e-com) still requires a separate engagement or vendor.",
          zednova:
            "Fixed-scope builds. What's included is defined upfront. Scope changes are a conversation, not a contract renegotiation. The team covers the adjacent disciplines so pivots don't require new vendors.",
          zednovaPill: "Defined scope, no billing surprises",
        },
        {
          category: "Design-to-build continuity",
          traditional:
            "Designers hand off Figma files to a separate dev team. 83% of teams report design-dev divergence. 66% waste 25-50% of project time on handoff inefficiencies. What gets designed and what gets built frequently differ.",
          aiAgency:
            "Better than traditional agencies. Many AI studios design and build in the same tool. Friction appears when custom code or backend logic is needed beyond the visual layer.",
          zednova:
            "Design and build are handled by the same senior team. No Figma-to-developer translation gap. What you approve is what ships, across web, e-com, apps, and automations.",
          zednovaPill: "No handoff loss",
        },
      ],
    },
    {
      title: "Speed, cost & transparency",
      rows: [
        {
          category: "Delivery timelines",
          traditional:
            "Established agencies average 4+ months per project due to discovery workshops, stakeholder review cycles, internal handoffs, and coordination overhead. (Web Agency Industry Report, 2026)",
          aiAgency:
            'Faster overall. AI tools compress design cycles. "Site in a week" is common for single landing pages. Full multi-page sites with CMS and backend still take 4-8 weeks at most studios.',
          zednova:
            "Marketing site: under 1 week. E-commerce: 1-2 weeks. Web app: 2-3 weeks. A working MVP for any of this is ready within 48 hours.",
          zednovaPill: "Fast without skipping depth",
        },
        {
          category: "Cost structure",
          traditional:
            "You fund office overhead, account management layers, internal tooling, and the margin between the senior who sold it and the junior who built it. Mid-size agency: $20k-$60k for a standard SMB site.",
          aiAgency:
            "Leaner overhead than traditional agencies. Pricing is more competitive but typically covers design and web only. Automation, CRM, and software are separate engagements.",
          zednova:
            "Cost goes to the build. No overhead layer. Site, automation, CRM, and AI tools scoped and priced together, not spread across three separate vendor invoices.",
          zednovaPill: "Cost reflects the output",
        },
        {
          category: "Pricing transparency",
          traditional:
            "Hourly or time-and-materials billing makes final costs unpredictable. Scope creep adds untracked hours. 57% of agencies lose $1k-$5k monthly to unbilled scope work, costs they eventually recover elsewhere. (Ignition, 2025)",
          aiAgency:
            "Many publish pricing tiers. Sprint-based models are more predictable. Additional scope outside the sprint requires a new brief and timeline.",
          zednova:
            "Starting prices published. Fixed-scope model. You know the number before work begins. No hourly billing, no retroactive change orders.",
          zednovaPill: "Number known upfront",
        },
      ],
    },
    {
      title: "Results & performance",
      rows: [
        {
          category: "Lead conversion infrastructure",
          traditional:
            "Site launches. Leads hit an inbox. No routing, no sequences, no follow-up system. 78% of customers buy from the business that responds first. Traditional agencies build nothing that helps with this.",
          aiAgency:
            "Rarely included. AI studios focus on the site experience, not what happens after a lead submits a form. Automation is a separate engagement.",
          zednova:
            "Automated follow-up wired at launch: SMS response, CRM entry, email sequences, and AI phone assistant for missed calls. Businesses with AI-integrated follow-up report 40-60% higher lead conversion rates.",
          zednovaPill: "Revenue system, not just a site",
        },
        {
          category: "AI search visibility (AEO/GEO)",
          traditional:
            "Sites built for Google as it existed five years ago. No schema markup, no AEO-structured copy, no llms.txt. Invisible to ChatGPT, Perplexity, and AI Overviews, where buyers are increasingly searching first.",
          aiAgency:
            "Some AI studios include basic schema or GEO services as a separate add-on. Not standard across all projects.",
          zednova:
            "Schema markup, AEO-ready copy structure, Core Web Vitals optimization, and llms.txt standard on every site. Built to be found and cited by Google, ChatGPT, and Perplexity.",
          zednovaPill: "Standard, not an add-on",
        },
        {
          category: "Verifiable track record",
          traditional:
            "Curated testimonials on their own site. Underlying reviews hard to independently verify. Portfolio may include work from team members who no longer work there.",
          aiAgency:
            "Most show named testimonials and portfolio work. Newer studios may have limited public review history outside their own site.",
          zednova:
            "120+ projects. 100% Upwork Job Success Score. Every review verifiable on Contra, Fiverr, Upwork, and LinkedIn by client name, not just on our own site.",
          zednovaPill: "Public record, check it yourself",
        },
        {
          category: "Post-launch support",
          traditional:
            "Project closes at invoice. Post-launch changes billed at full hourly rates with minimum engagement requirements. The team that built it may have already been reassigned.",
          aiAgency:
            "Sprint-based iteration available at many AI studios. Strong for design updates, weaker for backend or automation fixes that fall outside design scope.",
          zednova:
            "Ongoing support across the full stack (web, automation, CRM, and software) from the same team that built it. No re-briefing a new person on why decisions were made.",
          zednovaPill: "Same team, full continuity",
        },
      ],
    },
  ] satisfies ComparisonSection[],
};
