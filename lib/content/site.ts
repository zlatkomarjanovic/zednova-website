import type { SiteSettings } from "@/lib/types";

export const siteSettings: SiteSettings = {
  siteTitle: "ZedNova Studios",
  siteDescription:
    "An experienced software and product studio. We design and build Next.js websites, Shopify stores, custom software, CRM automations, and migrations for clinics, ecommerce brands, and growing businesses.",
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
    { value: "10+", label: "Years shipping products" },
    { value: "Senior", label: "Team-led delivery" },
    { value: "$0", label: "Wasted on agency overhead" },
  ],
};
