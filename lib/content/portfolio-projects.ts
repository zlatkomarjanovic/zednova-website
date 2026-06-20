import type { PortfolioProject } from "@/lib/types";

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "mavesta-media",
    client: "Mavesta Media",
    title: "Full Brand Rebuild and Conversion-Focused Website Platform for Mavesta Media",
    summary:
      "UX planning, brand and UI design in Figma, and a Webflow build with scalable CMS, SEO, performance optimization, and GSAP interactions.",
    href: "https://mavestamedia.com/",
    image: "/images/Mavesta-Media-Cover-Image.webp",
    imageAlt:
      "Computer monitor on a white desk displaying a digital marketing website with a red sports car background.",
    video: "/assets/portfolio/videos/mavesta.mp4",
    accent: "#1a1210",
    order: 1,
  },
  {
    slug: "vault-apps",
    client: "Vault Apps",
    title: "High-Performance SaaS Website with Scalable CMS",
    summary:
      "Modern marketing website for a software agency with clean UX, responsive design, scalable CMS, performance, and SEO in Webflow.",
    href: "https://www.vaultapps.com/",
    image: "/images/Vault-Apps-Cover-Image-1.webp",
    imageAlt:
      "Laptop on dark textured surface displaying a webpage with the text app growth and a hand holding a smartphone.",
    video: "/assets/portfolio/videos/vault-apps.mp4",
    accent: "#0f1419",
    order: 2,
  },
  {
    slug: "mavi-longevity",
    client: "MAVI Longevity Living",
    title: "Luxury Wellness Real Estate Platform and Lead Qualification System",
    summary:
      "Strategic website positioning MAVI in longevity-focused real estate with cinematic design, dual funnels, and lead qualification.",
    href: "https://mavilongevity.com/",
    image: "/images/Mavi-Longevity-Living-Cover-Image.webp",
    imageAlt:
      "Open laptop on a round white marble table displaying a website homepage with the text Live in a home that makes you healthier.",
    video: "/assets/portfolio/videos/mavi-longevity.mp4",
    accent: "#161514",
    order: 3,
  },
  {
    slug: "egc-nyc",
    client: "EGC NYC",
    title: "Digital Platform for an International Nonprofit Organization",
    summary:
      "Comprehensive nonprofit website with Webflow development, CMS setup, SEO, and Google Business integration for global outreach.",
    href: "https://egcnyc.org/",
    image: "/images/EGC-Cover-Image.webp",
    imageAlt:
      "Laptop displaying EGC website homepage with the text Discover your inner entrepreneur and change the world.",
    video: "/assets/portfolio/videos/egc.mp4",
    accent: "#121318",
    order: 4,
  },
];
