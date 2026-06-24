/**
 * Content types. These mirror the Sanity schema shapes (Phase 6) so the local
 * content layer can be swapped for live GROQ queries without touching pages.
 */

export type ServiceGroup =
  | "Websites"
  | "Automation"
  | "AI Tools"
  | "Ecommerce";

export type Service = {
  slug: string;
  number: string; // "01"..."10"
  title: string;
  group: ServiceGroup;
  category: string; // short category tag shown on the service hero
  icon: string; // icon key resolved by <Icon />
  shortDescription: string; // one line, used in cards + mega menu
  whatItIs: string; // 2-sentence hero summary
  deliverables: string[];
  idealClients: string[]; // "Who it's for"
  processSteps: { step: number; title: string; description: string }[];
  results: string[]; // outcomes you can expect
  pricingSignal: string;
  timeline: string; // typical delivery window shown on cards
  image: string; // cover image URL for cards + showcases
  order: number;
};

export type PainPoint = { title: string; description: string };

export type IndustryCategory =
  | "Healthcare Clinics"
  | "Ecommerce & Shopify"
  | "Small Business Custom Software";

export type PopularServiceLink = {
  label: string;
  href: string;
};

export type IndustryParent = {
  slug: string;
  title: string;
  category: IndustryCategory;
  whoItIsFor: string;
  whatWeBuild: string;
  problemSolved: string;
  heroHeadline: string;
  hook: string;
  shortDescription: string;
  painPoints: PainPoint[];
  popularServices: PopularServiceLink[];
  exampleProject: string;
  commonUseCase: string;
  icon: string;
  order: number;
};

export type Industry = {
  slug: string;
  parentSlug: string;
  category: IndustryCategory;
  title: string;
  whoItIsFor: string;
  whatWeBuild: string;
  problemSolved: string;
  heroHeadline: string;
  hook: string;
  shortDescription: string;
  painPoints: PainPoint[];
  popularServices: PopularServiceLink[];
  exampleProject: string;
  commonUseCase: string;
  icon: string;
  order: number;
};

export type CaseResult = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string; // industry slug
  servicesUsed: string[]; // service slugs
  timeline: string;
  resultHeadline: string;
  challenge: string;
  solution: string[];
  results: CaseResult[];
  techStack: string[];
  testimonialId?: string;
  featured: boolean;
  accent: string; // hex tint applied over the duotone image
  image: string; // cover image URL
};

export type PortfolioProject = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  href: string;
  image: string;
  imageAlt: string;
  video?: string;
  accent: string;
  order: number;
  /** Simple filter bucket for the work page. */
  category: string;
  logo?: {
    src: string;
    alt: string;
    /** Light/white marks — tone down on light card backgrounds. */
    lightVariant?: boolean;
  };
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type ArticleFaq = {
  id: string;
  question: string;
  answer: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: ArticleBlock[];
  author: string; // team slug
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date — shown when content was revised
  readTime: number; // minutes
  featured: boolean;
  accent: string;
  image: string; // cover image URL
  /** Short list of topic tags (AEO entities). */
  tags: string[];
  /** Optional SEO overrides; fall back to title/excerpt when absent. */
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  /** Dedicated OG/Twitter image; falls back to `image`. */
  ogImage?: string;
  /** 3–5 answer-first bullets surfaced above the body (AEO). */
  takeaways?: string[];
  /** Inline FAQ section rendered with FAQPage JSON-LD (AEO). */
  faqs?: ArticleFaq[];
};

export type ProductStatus =
  | "live"
  | "available"
  | "coming-soon"
  | "in-development"
  | "free";

export type Product = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  industry: string;
  image?: string;
  /** Platform-sourced reviews shown on the homepage carousel */
  platform?: boolean;
  featured: boolean;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  linkedin?: string;
  twitter?: string;
  upwork?: string;
};

export type Author = TeamMember & {
  avatar?: string;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  responseTime: string;
  announcementBar?: string;
  socialLinks: { linkedin: string; twitter: string; github: string };
  stats: { value: string; label: string }[];
};
