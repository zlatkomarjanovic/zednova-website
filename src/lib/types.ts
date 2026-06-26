/**
 * Content types. These mirror the Sanity schema shapes so the local
 * content layer can be swapped for live GROQ queries without touching pages.
 */

export type ServiceGroup =
  | "Websites"
  | "Automation"
  | "AI Tools"
  | "Ecommerce";

/** Reusable SEO object projected from Sanity seoFields. */
export type SeoFields = {
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  searchTags?: string[];
  seoCanonical?: string;
  canonicalUrl?: string;
  seoNoIndex?: boolean;
  seoHideFromLists?: boolean;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  structuredDataType?: string;
  jsonLdOverride?: string;
  customJsonLd?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export type OpenGraphFields = {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCardType?: string;
};

export type SchemaMarkupFields = {
  schemaType?: string;
  enableArticleSchema?: boolean;
  enableFaqSchema?: boolean;
  enableBreadcrumbSchema?: boolean;
  enableServiceSchema?: boolean;
  enableProductSchema?: boolean;
  enableOrganizationSchema?: boolean;
  enableCollectionPageSchema?: boolean;
  enableSoftwareApplicationSchema?: boolean;
  serviceType?: string;
  areaServed?: string[];
  providerName?: string;
  priceRange?: string;
  schemaImage?: string;
};

export type CtaFields = {
  primaryCtaTitle?: string;
  primaryCtaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaTitle?: string;
  secondaryCtaDescription?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  consultationCtaTitle?: string;
  consultationCtaDescription?: string;
  consultationCtaLabel?: string;
  consultationCtaHref?: string;
  leadFormTitle?: string;
  leadFormDescription?: string;
};

export type CtaBlock = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type AeoAnswerBlock = {
  question?: string;
  shortAnswer?: string;
};

export type FeatureBullet = {
  title: string;
  description?: string;
  icon?: string;
};

export type PriceTier = {
  label: string;
  amount: number;
  currency: string;
  period?: string;
  features?: string[];
  featured?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  group: ServiceGroup;
  category: string;
  icon: string;
  shortDescription: string;
  whatItIs: string;
  heroHeadline?: string;
  heroSubhead?: string;
  whatsIncluded?: FeatureBullet[];
  deliverables: string[];
  idealClients: string[];
  processSteps: { step: number; title: string; description: string }[];
  results: string[];
  faqs?: ArticleFaq[];
  pricingSignal: string;
  pricingTiers?: PriceTier[];
  startingPrice?: number;
  timeline: string;
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  relatedMigrations?: string[];
  tags?: string[];
  image: string;
  order: number;
  seo?: SeoFields;
} & CtaFields & SchemaMarkupFields & {
  openGraph?: OpenGraphFields;
  searchTags?: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  searchIntent?: string;
  commercialIntentKeywords?: string[];
  entitiesMentioned?: string[];
  aiSummary?: string;
  llmSnippet?: string;
  quickAnswer?: AeoAnswerBlock;
};

export type PainPoint = { title: string; description: string };

export type IndustryCategory =
  | "Healthcare & Wellness"
  | "Ecommerce & DTC"
  | "Fitness, Coaching & Performance"
  | "Professional Services"
  | "B2B SaaS & Technology"
  | "Real Estate & Property";

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
  industryOverview?: string;
  painPoints: PainPoint[];
  popularServices: PopularServiceLink[];
  faqs?: ArticleFaq[];
  exampleProject: string;
  commonUseCase: string;
  icon: string;
  image?: string;
  order: number;
  relatedServices?: string[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  tags?: string[];
  seo?: SeoFields;
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
  faqs?: ArticleFaq[];
  exampleProject: string;
  commonUseCase: string;
  icon: string;
  image?: string;
  order: number;
  relatedServices?: string[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  tags?: string[];
  seo?: SeoFields;
};

export type CaseResult = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  servicesUsed: string[];
  timeline: string;
  resultHeadline: string;
  challenge: string;
  solution: string[];
  results: CaseResult[];
  techStack: string[];
  testimonialId?: string;
  faqs?: ArticleFaq[];
  relatedCaseStudies?: string[];
  relatedInsights?: string[];
  featured: boolean;
  accent: string;
  image: string;
  seo?: SeoFields;
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
  category: string;
  year?: number;
  servicesUsed?: string[];
  relatedIndustries?: string[];
  relatedCaseStudies?: string[];
  tags?: string[];
  logo?: {
    src: string;
    alt: string;
    lightVariant?: boolean;
  };
  seo?: SeoFields;
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; text: string; calloutVariant?: string }
  | { type: "image"; image?: string; imageAlt?: string; text?: string };

export type ArticleFaq = {
  id?: string;
  question: string;
  answer: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  oneSentenceSummary?: string;
  category: string;
  body: ArticleBlock[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featured: boolean;
  pinned?: boolean;
  contentType?: string;
  difficulty?: string;
  accent: string;
  image: string;
  imageAlt?: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  ogImage?: string;
  takeaways?: string[];
  faqs?: ArticleFaq[];
  faqReferences?: ArticleFaq[];
  inlineFaqs?: ArticleFaq[];
  aiSummary?: string;
  llmSnippet?: string;
  quickAnswer?: AeoAnswerBlock;
  schemaMarkup?: SchemaMarkupFields;
  openGraph?: OpenGraphFields;
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedMigrations?: string[];
  relatedCustomSoftware?: string[];
  relatedProducts?: string[];
  relatedCaseStudies?: string[];
  relatedPortfolioProjects?: string[];
  relatedPosts?: string[];
  tableOfContentsEnabled?: boolean;
  searchIntent?: string;
  targetAudience?: string[];
  painPoints?: string[];
  searchQuestions?: string[];
  entitiesMentioned?: string[];
  primaryCtaTitle?: string;
  primaryCtaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaTitle?: string;
  secondaryCtaDescription?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  seo?: SeoFields;
};

export type ProductType =
  | "software"
  | "tool"
  | "pdf"
  | "guide"
  | "checklist"
  | "template"
  | "freebie"
  | "lead-magnet";

export type ProductStatus =
  | "live"
  | "available"
  | "coming-soon"
  | "in-development"
  | "free";

export type Product = {
  slug: string;
  title: string;
  type?: ProductType;
  tagline: string;
  description: string;
  features?: string[] | FeatureBullet[];
  featureList?: string[];
  status: ProductStatus;
  pricingTiers?: PriceTier[];
  startingPrice?: number;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
  resourceFile?: string;
  externalUrl?: string;
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedInsights?: string[];
  tags?: string[];
  order: number;
  seo?: SeoFields;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  industry: string;
  image?: string;
  platform?: boolean;
  platformSource?: string;
  platformUrl?: string;
  rating?: number;
  relatedServices?: string[];
  relatedCaseStudies?: string[];
  featured: boolean;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  shortRole?: string;
  bio: string[];
  shortBio?: string;
  linkedin?: string;
  twitter?: string;
  upwork?: string;
  website?: string;
  avatar?: string;
  order?: number;
};

export type Author = TeamMember & {
  avatar?: string;
  shortBio?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
  scopeServices?: string[];
  scopeIndustries?: string[];
  scopeMigrations?: string[];
  tags?: string[];
  order: number;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  siteUrl?: string;
  announcementBar?: string;
  contactEmail: string;
  contactPhone?: string;
  responseTime: string;
  address?: string;
  officeHours?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
  };
  stats: { value: string; label: string }[];
  twitterCreator?: string;
  defaultOgImage?: string;
  defaultSeo?: SeoFields;
  headerScripts?: string;
};

export type Redirect = {
  from: string;
  to: string;
  statusCode: number;
  permanent: boolean;
};

export type StaticPage = {
  slug: string;
  title: string;
  path: string;
  heroHeadline?: string;
  heroSubhead?: string;
  body?: unknown;
  seo?: SeoFields;
};
