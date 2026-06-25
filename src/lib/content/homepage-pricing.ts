export type HomepagePricingPackage = {
  slug: string;
  group: string;
  title: string;
  shortDescription: string;
  pricingSignal: string;
  timeline: string;
  badge?: string;
  deliverables: string[];
  contactHref: string;
  detailHref: string;
  detailLabel: string;
};

/** Homepage pricing row: bundled growth stack, custom software, platform migration. */
export const homepagePricingPackages: HomepagePricingPackage[] = [
  {
    slug: "growth-stack",
    group: "Websites + automation + AI",
    title: "Lead-to-close growth stack",
    shortDescription:
      "One engagement for the site, CRM follow-up, and AI phone coverage most service businesses need first.",
    pricingSignal: "From $5,900 setup + $349/mo",
    timeline: "MVP in 7 to 10 business days, then iterate and maintain after launch",
    badge: "Most common starting point",
    deliverables: [
      "Funnel mapping and primary conversion goal workshop",
      "Custom homepage and offer page design in Figma",
      "MVP marketing site on Next.js or Webflow",
      "Schema markup, llms.txt, and AI-citation-ready page structure",
      "CRM-connected lead forms with instant team alerts",
      "CRM workspace with pipeline stages and routing rules",
      "Automated email and SMS follow-up sequences",
      "AI voice or chat agent for top inbound call scenarios",
      "Missed-call SMS text-back within 60 seconds",
      "Calendar booking for qualified leads",
      "Google Analytics 4 and conversion event tracking",
      "30-day post-launch fixes and iteration sprint",
    ],
    contactHref: "/contact?service=ai-lead-site",
    detailHref: "/services",
    detailLabel: "See related services",
  },
  {
    slug: "custom-software",
    group: "Custom software",
    title: "Custom in-house software",
    shortDescription:
      "Client portals, internal dashboards, booking tools, and ops software built for how your team actually works.",
    pricingSignal: "From $8,500",
    timeline: "MVP in 10 to 15 business days, then iterate and maintain after launch",
    deliverables: [
      "Discovery workshop and workflow mapping",
      "User roles and permissions architecture",
      "Custom UI design in Figma",
      "Next.js frontend with responsive layouts",
      "Backend API and database schema",
      "Admin dashboard for your team",
      "Authentication and secure login",
      "Email notifications on key events",
      "Document upload and file management",
      "Search and filtering for records",
      "Staging environment and QA pass before launch",
      "Deployment, handover docs, and team walkthrough",
    ],
    contactHref: "/contact",
    detailHref: "/custom-software",
    detailLabel: "Browse custom software",
  },
  {
    slug: "platform-migration",
    group: "Migrations",
    title: "Platform migration to Next.js",
    shortDescription:
      "Move off WordPress, Webflow, Framer, Wix, or Squarespace to a faster Next.js site with a modern CMS.",
    pricingSignal: "From $4,500",
    timeline: "MVP in 5 to 8 business days, then iterate and maintain after launch",
    deliverables: [
      "Current site audit and migration scope workshop",
      "URL and redirect map to protect existing SEO",
      "Content export from your current platform",
      "Page rebuild on Next.js with improved performance",
      "Sanity CMS setup for editable pages and blog posts",
      "Blog and resource content migrated and formatted",
      "Forms rebuilt and connected to your CRM",
      "Schema markup and metadata carried forward",
      "Core Web Vitals pass on launch pages",
      "Analytics and tracking reconnected",
      "Staging review before production cutover",
      "30-day post-launch fixes and redirect monitoring",
    ],
    contactHref: "/contact",
    detailHref: "/migrations",
    detailLabel: "See migrations",
  },
];
