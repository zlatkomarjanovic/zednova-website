import type { SiteSettings } from "@/lib/types";

export const siteSettings: SiteSettings = {
  siteTitle: "ZedNova Studios",
  siteDescription:
    "We design and build Next.js websites, Shopify stores, booking flows, CRM automations, AI chatbots, and migration projects for clinics, ecommerce brands, and small businesses.",
  contactEmail: "hello@zednova.com",
  responseTime: "Usually within 24 hours",
  announcementBar: undefined,
  socialLinks: {
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    github: "https://github.com/",
  },
  stats: [
    { value: "120+", label: "Projects completed" },
    { value: "100%", label: "Job Success Score" },
    { value: "7+", label: "Years building" },
    { value: "$0", label: "Wasted on agency overhead" },
  ],
};
