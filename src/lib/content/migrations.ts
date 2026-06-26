import type { ArticleFaq, FeatureBullet, SeoFields } from "@/lib/types";

export type Migration = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  order: number;
  heroHeadline?: string;
  heroSubhead?: string;
  sourcePlatform?: string;
  targetPlatform?: string;
  whatsIncluded?: FeatureBullet[];
  deliverables?: string[];
  processSteps?: { step: number; title: string; description: string }[];
  faqs?: ArticleFaq[];
  timeline?: string;
  pricingSignal?: string;
  coverImage?: { url: string; alt?: string };
  coverImageUrl?: string;
  image?: string;
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedInsights?: string[];
  relatedMigrations?: string[];
  tags?: string[];
  seo?: SeoFields;
};

export const migrations: Migration[] = [
  {
    slug: "webflow-to-nextjs-sanity",
    title: "Webflow to Next.js & Sanity",
    shortDescription:
      "Move from Webflow to a faster custom website with Sanity CMS.",
    description:
      "We migrate your Webflow site to Next.js for better performance and SEO, and move content into Sanity CMS so your team can edit pages without touching code.",
    order: 1,
  },
  {
    slug: "wordpress-to-nextjs-sanity",
    title: "WordPress to Next.js & Sanity",
    shortDescription:
      "Replace a slow or outdated WordPress site with a modern Next.js website and Sanity CMS.",
    description:
      "We rebuild your WordPress site on Next.js, migrate pages and blog content into Sanity, and clean up plugins, speed, and editing workflows.",
    order: 2,
  },
  {
    slug: "framer-to-nextjs-sanity",
    title: "Framer to Next.js & Sanity",
    shortDescription:
      "Move from a design-focused Framer site to a custom-coded Next.js website with CMS control.",
    description:
      "We translate your Framer design into a production Next.js build with Sanity CMS for content updates and room to add custom features later.",
    order: 3,
  },
  {
    slug: "wix-to-nextjs-sanity",
    title: "Wix to Next.js & Sanity",
    shortDescription:
      "Move from Wix to a custom Next.js website with better performance, SEO, and editing.",
    description:
      "We move your Wix content to Next.js and Sanity so you get faster pages, cleaner SEO, and a site you can extend with custom software features.",
    order: 4,
  },
  {
    slug: "squarespace-to-nextjs-sanity",
    title: "Squarespace to Next.js & Sanity",
    shortDescription:
      "Move from Squarespace to a faster custom website with Sanity CMS.",
    description:
      "We rebuild your Squarespace site on Next.js, migrate content into Sanity, and improve performance, SEO, and flexibility for future features.",
    order: 5,
  },
  {
    slug: "webflow-cms-to-sanity",
    title: "Webflow CMS to Sanity",
    shortDescription:
      "Move static and CMS content from Webflow into Sanity for cleaner content management.",
    description:
      "We export your Webflow CMS collections and pages into Sanity so editors get a cleaner content model while keeping your current front end or planning a Next.js move.",
    order: 6,
  },
  {
    slug: "wordpress-blog-to-sanity",
    title: "WordPress Blog to Sanity",
    shortDescription:
      "Move blog posts, pages, authors, categories, and SEO data from WordPress into Sanity.",
    description:
      "We migrate posts, authors, categories, and SEO metadata from WordPress into Sanity so your blog can run on a modern Next.js front end.",
    order: 7,
  },
  {
    slug: "shopify-to-headless-shopify",
    title: "Shopify to Headless Shopify",
    shortDescription:
      "Build a custom Next.js storefront on top of Shopify for better performance and design flexibility.",
    description:
      "We keep Shopify for products, checkout, and inventory while building a custom Next.js storefront for faster pages, richer design, and better conversion.",
    order: 8,
  },
  {
    slug: "airtable-to-custom-dashboard",
    title: "Airtable to Custom Dashboard",
    shortDescription:
      "Move from Airtable views into a custom dashboard your team can use daily.",
    description:
      "We rebuild your Airtable bases into a custom web dashboard with login, filters, and automations so your team stops living in spreadsheet-style views.",
    order: 9,
  },
  {
    slug: "google-sheets-to-custom-dashboard",
    title: "Google Sheets to Custom Dashboard",
    shortDescription:
      "Replace shared spreadsheets with a simple dashboard and automated updates.",
    description:
      "We move your Google Sheets workflows into a custom dashboard with role-based access, live data, and n8n or Make automations behind the scenes.",
    order: 10,
  },
];
