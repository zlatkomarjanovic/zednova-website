/**
 * Content types. These mirror the Sanity schema shapes (Phase 6) so the local
 * content layer can be swapped for live GROQ queries without touching pages.
 */

export type ServiceGroup = "Growth & Automation" | "Infrastructure & Intelligence";

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

export type Industry = {
  slug: string;
  title: string;
  heroHeadline: string;
  heroStat?: string;
  hook: string; // one line for the grid
  shortDescription: string;
  painPoints: PainPoint[];
  coreServices: string[]; // service slugs
  miniCaseNarrative: string;
  socialProof: string;
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

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  body: ArticleBlock[];
  author: string; // team slug
  publishedAt: string; // ISO date
  readTime: number; // minutes
  featured: boolean;
  accent: string;
  image: string; // cover image URL
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

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  responseTime: string;
  announcementBar?: string;
  socialLinks: { linkedin: string; twitter: string; github: string };
  stats: { value: string; label: string }[];
};
