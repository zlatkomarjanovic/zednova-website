export type AlternativeGuide = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  quickAnswer: string;
  sourcePlatform: string;
  audience: string;
  intro: string;
  alternatives: {
    name: string;
    tagline: string;
    pros: string[];
    cons: string[];
    href?: string;
  }[];
  verdict: string;
  related: { label: string; href: string }[];
};

export const alternatives: AlternativeGuide[] = [
  {
    slug: "squarespace-for-clinics",
    title: "Alternatives to Squarespace for Clinics (2026)",
    h1: "Alternatives to Squarespace for clinics",
    description:
      "Squarespace is easy to launch but limits booking, CRM, and HIPAA-aware workflows. Compare Next.js + Sanity, Webflow, WordPress, and GoHighLevel for dental, med spa, and wellness clinics.",
    quickAnswer:
      "Clinics outgrow Squarespace when they need online booking tied to a CRM, automated recall, SMS reminders, and pages AI search can cite. Better alternatives are Next.js + Sanity for performance and AEO, Webflow for designer-led marketing sites, or GoHighLevel when CRM and booking are the priority over custom content.",
    sourcePlatform: "Squarespace",
    audience: "Dental, med spa, wellness, and specialty clinics",
    intro:
      "Squarespace wins on speed to launch. Clinics hit the ceiling when intake, recall, and reputation need to connect — not sit in separate plugins and spreadsheets.",
    alternatives: [
      {
        name: "Next.js + Sanity",
        tagline: "Best for clinics investing in SEO, AEO, and custom intake.",
        pros: [
          "Fast mobile performance and schema for AI Overviews",
          "Structured content for services, providers, and locations",
          "Room for patient portals and custom booking later",
        ],
        cons: [
          "Requires a developer partner for build and iteration",
          "Higher upfront cost than a Squarespace template",
        ],
        href: "/migrations/squarespace-to-nextjs-sanity",
      },
      {
        name: "Webflow",
        tagline: "Best when design control matters and CMS stays under ~50 pages.",
        pros: [
          "Designer-friendly visual CMS",
          "Strong marketing site aesthetics out of the box",
          "Faster launch than a custom Next.js build",
        ],
        cons: [
          "Limited custom logic for CRM and clinical workflows",
          "Plan limits on CMS items and form integrations",
        ],
        href: "/compare/webflow-vs-nextjs-sanity",
      },
      {
        name: "GoHighLevel",
        tagline: "Best when CRM, SMS, and booking are the product — not the brochure site.",
        pros: [
          "Built-in pipelines, calendars, and SMS",
          "Fast to wire missed-call text-back and recall",
          "Single stack for marketing + front desk automation",
        ],
        cons: [
          "Site design and SEO are secondary to CRM features",
          "Less flexible for long-form AEO content and migrations",
        ],
        href: "/compare/gohighlevel-vs-hubspot",
      },
      {
        name: "WordPress",
        tagline: "Best when the team already lives in WordPress and plugins are acceptable.",
        pros: [
          "Huge plugin ecosystem for booking and forms",
          "Familiar editor for office managers",
          "Lower switching cost if already on WordPress",
        ],
        cons: [
          "Plugin sprawl hurts speed and security",
          "Harder to pass Core Web Vitals on mobile",
        ],
        href: "/migrations/wordpress-to-nextjs-sanity",
      },
    ],
    verdict:
      "Pick Next.js + Sanity when growth depends on Google and AI search plus a credible brand site. Pick GoHighLevel when the bottleneck is follow-up, not design. Squarespace is fine for a single-location launch — not for a clinic scaling locations and recall.",
    related: [
      { label: "Squarespace → Next.js migration", href: "/migrations/squarespace-to-nextjs-sanity" },
      { label: "CRM automation for clinics", href: "/insights/crm-automation-for-clinics-without-extra-hires" },
      { label: "Healthcare industry", href: "/industries/healthcare-wellness" },
    ],
  },
  {
    slug: "webflow-for-ecommerce",
    title: "Alternatives to Webflow for Ecommerce (2026)",
    h1: "Alternatives to Webflow for ecommerce",
    description:
      "Webflow Commerce works for small catalogs but DTC brands outgrow it on checkout, subscriptions, and email flows. Compare Shopify, headless Shopify, and Next.js + Sanity.",
    quickAnswer:
      "Ecommerce brands leave Webflow when SKU count, checkout customization, or Klaviyo-driven retention outgrow Webflow Commerce limits. Shopify is the default for DTC; headless Shopify plus Next.js wins when performance and content SEO matter; Webflow stays viable only for small catalogs under ~50 SKUs with simple checkout.",
    sourcePlatform: "Webflow",
    audience: "DTC and ecommerce brands",
    intro:
      "Webflow is excellent for brand storytelling. Revenue scales on Shopify's checkout, apps, and retention stack — not on CMS page limits.",
    alternatives: [
      {
        name: "Shopify",
        tagline: "Default for DTC — checkout, apps, and Klaviyo integrations.",
        pros: ["Best-in-class checkout and payment stack", "Klaviyo, reviews, and subscription apps", "Ops team already knows the admin"],
        cons: ["Theme limits vs fully custom storefront", "Speed depends on app discipline"],
        href: "/industries/ecommerce-dtc",
      },
      {
        name: "Headless Shopify + Next.js",
        tagline: "Shopify backend, custom frontend for speed and SEO.",
        pros: ["Core Web Vitals-friendly product pages", "Editorial content + commerce in one stack", "Same Shopify admin and inventory"],
        cons: ["Higher build cost than a theme", "Requires ongoing dev for frontend changes"],
        href: "/migrations/shopify-to-headless-shopify",
      },
      {
        name: "Next.js + Sanity (content-led)",
        tagline: "When content and AEO drive acquisition before catalog scale.",
        pros: ["Structured content for compare pages and insights", "Fast marketing site with room to add Shopify later", "Strong AI citation architecture"],
        cons: ["Not a cart platform on its own", "Needs Shopify or Snipcart for transactions"],
        href: "/compare/webflow-vs-nextjs-sanity",
      },
    ],
    verdict:
      "Stay on Webflow only if the catalog is small and the site is primarily brand-led. Move to Shopify when paid traffic hits product pages daily. Go headless when LCP and content SEO are limiting ROAS.",
    related: [
      { label: "Shopify conversion fixes", href: "/insights/shopify-conversion-fixes-that-actually-move-revenue" },
      { label: "Webflow → Next.js migration", href: "/migrations/webflow-to-nextjs-sanity" },
      { label: "Ecommerce industry", href: "/industries/ecommerce-dtc" },
    ],
  },
  {
    slug: "wordpress-for-clinics",
    title: "Alternatives to WordPress for Clinics (2026)",
    h1: "Alternatives to WordPress for clinics",
    description:
      "WordPress powers many clinic sites but plugin chaos slows teams down. Compare Next.js + Sanity, Webflow, and managed healthcare stacks.",
    quickAnswer:
      "Clinics replace WordPress when plugin updates break booking forms, mobile speed fails Core Web Vitals, or marketing cannot publish without a developer. Next.js + Sanity gives performance and structured content; Webflow gives visual control; staying on WordPress only makes sense if migration cost exceeds two years of plugin maintenance.",
    sourcePlatform: "WordPress",
    audience: "Dental, medical, and wellness practices on WordPress",
    intro:
      "WordPress is flexible until it isn't — security patches, plugin conflicts, and slow mobile templates cost more than teams expect.",
    alternatives: [
      {
        name: "Next.js + Sanity",
        tagline: "Performance, schema, and marketing velocity without plugins.",
        pros: ["Sub-2s mobile loads on service pages", "FAQ and AEO blocks built into templates", "No plugin security surface"],
        cons: ["Migration project required", "Editors learn Sanity Studio"],
        href: "/migrations/wordpress-to-nextjs-sanity",
      },
      {
        name: "Webflow",
        tagline: "Visual CMS when the site is marketing-only.",
        pros: ["Designers ship pages without PHP", "Hosting included", "Good for single-location brands"],
        cons: ["Weak native CRM and recall automation", "Limited compared to WordPress plugin breadth"],
        href: "/compare/webflow-vs-nextjs-sanity",
      },
      {
        name: "WordPress (optimized)",
        tagline: "Stay put if migration is not justified this year.",
        pros: ["Team already trained", "Existing SEO equity", "Lower short-term cost"],
        cons: ["Ongoing plugin and security overhead", "Harder AEO architecture"],
      },
    ],
    verdict:
      "Migrate when WordPress maintenance eats a day per month or mobile speed kills ads. Optimize in place only if migration would delay a revenue-critical booking fix.",
    related: [
      { label: "WordPress → Next.js migration", href: "/migrations/wordpress-to-nextjs-sanity" },
      { label: "WordPress vs Sanity compare", href: "/compare/wordpress-vs-sanity" },
      { label: "AI receptionist for clinics", href: "/services/ai-receptionist" },
    ],
  },
  {
    slug: "wix-for-service-businesses",
    title: "Alternatives to Wix for Service Businesses (2026)",
    h1: "Alternatives to Wix for service businesses",
    description:
      "Wix is fine for solopreneurs but service businesses outgrow it on CRM, speed, and AI search. Compare Next.js, Webflow, and GoHighLevel.",
    quickAnswer:
      "Service businesses leave Wix when forms do not connect to a CRM, mobile speed hurts Google Ads quality score, or the site never appears in AI answers. Next.js + Sanity fixes discoverability and conversion; Webflow improves design without full custom code; GoHighLevel prioritizes pipelines over brochure polish.",
    sourcePlatform: "Wix",
    audience: "HVAC, legal, home services, and professional services",
    intro:
      "Wix optimizes for getting online fast. Service businesses win on response time, proof, and systems — not drag-and-drop alone.",
    alternatives: [
      {
        name: "Next.js + Sanity",
        tagline: "When leads come from search and AI and must convert on mobile.",
        pros: ["CRM-connected forms and schema markup", "Insights and compare pages for AEO", "Scales into portals and apps"],
        cons: ["Needs a build partner", "Not a DIY weekend project"],
        href: "/migrations/wix-to-nextjs-sanity",
      },
      {
        name: "Webflow",
        tagline: "Marketing site upgrade without a full app roadmap.",
        pros: ["Professional design faster than custom dev", "CMS for case studies and services", "Better performance than most Wix templates"],
        cons: ["CRM still requires integrations", "Less AEO structure than a Next.js program"],
        href: "/migrations/webflow-to-nextjs-sanity",
      },
      {
        name: "GoHighLevel",
        tagline: "When the CRM is broken and the site is secondary.",
        pros: ["Missed-call text-back and pipelines day one", "SMS and calendar built in", "Good for high-call-volume trades"],
        cons: ["Limited content marketing and SEO depth", "Site looks template-driven"],
        href: "/services/crm-pipeline-automation",
      },
    ],
    verdict:
      "Upgrade from Wix when you are spending on ads or hiring for growth. The site should be the front end of a sales system — not a digital business card.",
    related: [
      { label: "Wix → Next.js migration", href: "/migrations/wix-to-nextjs-sanity" },
      { label: "Revenue leak audit", href: "/insights/five-minute-revenue-leak-audit" },
      { label: "CRM automation", href: "/services/crm-pipeline-automation" },
    ],
  },
  {
    slug: "framer-for-startups",
    title: "Alternatives to Framer for Startups (2026)",
    h1: "Alternatives to Framer for startups",
    description:
      "Framer ships beautiful marketing sites fast but limits CMS depth, integrations, and long-term SEO. Compare Next.js + Sanity and Webflow for startups scaling beyond launch.",
    quickAnswer:
      "Startups outgrow Framer when they need a blog cluster for SEO, CRM-connected forms, custom auth, or pages AI systems cite reliably. Next.js + Sanity is the long-term stack for product-led companies; Webflow bridges design and CMS; Framer remains best for launch-only marketing sites under ~20 pages.",
    sourcePlatform: "Framer",
    audience: "B2B SaaS and startup marketing teams",
    intro:
      "Framer is unmatched for launch aesthetics. Funded startups eventually need content ops, integrations, and performance budgets ads demand.",
    alternatives: [
      {
        name: "Next.js + Sanity",
        tagline: "Default for startups building product + marketing in one ecosystem.",
        pros: ["Shared React talent across app and site", "Structured insights and docs for AEO", "Vercel deployment and preview workflows"],
        cons: ["Higher initial setup than Framer", "Designers need Studio training"],
        href: "/migrations/framer-to-nextjs-sanity",
      },
      {
        name: "Webflow",
        tagline: "When marketing owns the site and eng owns the app separately.",
        pros: ["Visual control for marketers", "Faster than full Next.js for content-only teams", "Good partner ecosystem"],
        cons: ["Split stack vs one React codebase", "Integration glue for product signup flows"],
        href: "/compare/framer-vs-nextjs",
      },
    ],
    verdict:
      "Use Framer to validate positioning fast. Move to Next.js + Sanity before paid acquisition and content marketing become core channels.",
    related: [
      { label: "Framer → Next.js migration", href: "/migrations/framer-to-nextjs-sanity" },
      { label: "B2B SaaS industry", href: "/industries/b2b-saas-technology" },
      { label: "AI-cited lead gen site", href: "/services/ai-lead-site" },
    ],
  },
];
