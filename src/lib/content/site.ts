import type { SiteSettings } from "@/lib/types";
import { defaultProfileLinks } from "@/lib/content/profile-links";

export const siteSettings: SiteSettings = {
  siteTitle: "ZedNova Studio",
  siteDescription:
    "An experienced software and product studio. We design and build Next.js websites, Shopify stores, custom software, CRM automations, and migrations for clinics, ecommerce brands, and growing businesses.",
  contactEmail: "hello@zednova.com",
  responseTime: "Usually within 24 hours",
  announcementBar: undefined,
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/zlatkomarjanovic",
    twitter: "https://x.com/thezlatkom",
    github: "https://github.com/zlatkomarjanovic",
  },
  profileLinks: {
    ...defaultProfileLinks,
    goodfirms: "https://www.goodfirms.co/company/zednova-studios",
  },
  stats: [
    { value: "120+", label: "Projects completed" },
    { value: "10+", label: "Years shipping products" },
    { value: "Senior", label: "Team-led delivery" },
    { value: "$0", label: "Wasted on agency overhead" },
  ],
};
