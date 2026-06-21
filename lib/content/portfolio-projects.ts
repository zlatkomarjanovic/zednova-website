import type { PortfolioProject } from "@/lib/types";

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "mavesta-media",
    client: "Mavesta Media",
    title: "Mavesta Media",
    summary:
      "Full brand rebuild and conversion-focused website. UX planning, brand and UI design in Figma, Webflow build with CMS, SEO, performance optimization, and GSAP interactions.",
    href: "https://mavestamedia.com/",
    image: "/images/Mavesta-Media-Cover-Image.webp",
    imageAlt:
      "Computer monitor on a white desk displaying a digital marketing website with a red sports car background.",
    video: "/assets/portfolio/videos/mavesta.mp4",
    accent: "#1a1210",
    order: 1,
    logo: {
      src: "/images/logos/mavesta-media.svg",
      alt: "Mavesta Media",
    },
  },
  {
    slug: "vault-apps",
    client: "Vault Apps",
    title: "Vault Apps",
    summary:
      "High-performance SaaS marketing site with scalable CMS. Clean UX, responsive design, performance, and SEO built in Webflow for a software agency.",
    href: "https://www.vaultapps.com/",
    image: "/images/Vault-Apps-Cover-Image-1.webp",
    imageAlt:
      "Laptop on dark textured surface displaying a webpage with the text app growth and a hand holding a smartphone.",
    video: "/assets/portfolio/videos/vault-apps.mp4",
    accent: "#0f1419",
    order: 2,
    logo: {
      src: "/images/logos/6681880ec9fc2fc5e3a062d9_Group-1091431.webp",
      alt: "Vault Apps",
    },
  },
  {
    slug: "mavi-longevity",
    client: "MAVI Longevity Living",
    title: "MAVI Longevity Living",
    summary:
      "Luxury wellness real estate platform and lead qualification system. Strategic positioning, cinematic design, dual conversion funnels, and a lead qualification flow for longevity-focused real estate.",
    href: "https://mavilongevity.com/",
    image: "/images/Mavi-Longevity-Living-Cover-Image.webp",
    imageAlt:
      "Open laptop on a round white marble table displaying a website homepage with the text Live in a home that makes you healthier.",
    video: "/assets/portfolio/videos/mavi-longevity.mp4",
    accent: "#161514",
    order: 3,
    logo: {
      src: "/images/logos/mavi-longevity.svg",
      alt: "MAVI Longevity Living",
    },
  },
  {
    slug: "egc-nyc",
    client: "EGC NYC",
    title: "EGC NYC",
    summary:
      "Digital platform for an international nonprofit. Webflow development, CMS setup, SEO, and Google Business integration for a nonprofit with a global reach.",
    href: "https://egcnyc.org/",
    image: "/images/EGC-Cover-Image.webp",
    imageAlt:
      "Laptop displaying EGC website homepage with the text Discover your inner entrepreneur and change the world.",
    video: "/assets/portfolio/videos/egc.mp4",
    accent: "#121318",
    order: 4,
    logo: {
      src: "/images/logos/egc-logo.svg",
      alt: "EGC NYC",
    },
  },
];
