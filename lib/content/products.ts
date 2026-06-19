import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "anti-slop-stack",
    title: "The Anti-Slop Stack",
    tagline: "Zed's AI website-building workflow, documented.",
    description:
      "A PDF guide to the exact workflow behind ZedNova's sites. Nine tools, a twelve-step process, and the prompt templates that keep AI output sharp instead of generic.",
    status: "free",
    features: [
      "9 tools, end to end",
      "12-step build process",
      "Prompt templates included",
      "Free download",
    ],
    ctaLabel: "Download free",
    ctaHref: "/contact?product=anti-slop-stack",
    order: 1,
  },
  {
    slug: "framer-marketplace-components",
    title: "Framer Marketplace Components",
    tagline: "Production-ready components used by 1,500+ creators.",
    description:
      "More than 15 production-ready Framer components, including GSAP animation presets, WebGL shaders, live data widgets, and cookie consent. Built for speed and built to ship.",
    status: "live",
    features: [
      "15+ components",
      "GSAP animation presets",
      "WebGL shaders",
      "Live data widgets",
    ],
    ctaLabel: "View on Framer",
    ctaHref: "https://www.framer.com/marketplace/",
    order: 2,
  },
  {
    slug: "prospect-engine",
    title: "ProspectEngine",
    tagline: "AI-powered B2B lead enrichment and outreach.",
    description:
      "Enrichment and outreach sequencing in one tool. Build a list, enrich it with the data that drives replies, and run multi-channel sequences that personalize at scale.",
    status: "coming-soon",
    features: [
      "B2B lead enrichment",
      "AI personalization",
      "Multi-channel sequencing",
      "Reply management",
    ],
    ctaLabel: "Join the waitlist",
    ctaHref: "/contact?product=prospect-engine",
    order: 3,
  },
  {
    slug: "zednova-os",
    title: "ZedNova OS",
    tagline: "The ops automation starter kit for agencies.",
    description:
      "An internal ops automation kit for agencies and consultants. n8n templates, SOPs, and CRM blueprints, so you can run the systems we run.",
    status: "in-development",
    features: [
      "n8n workflow templates",
      "Operating SOPs",
      "CRM blueprints",
      "Built for agencies",
    ],
    ctaLabel: "Get notified",
    ctaHref: "/contact?product=zednova-os",
    order: 4,
  },
];
