/**
 * Structured-data (JSON-LD) builders for article pages.
 * Shapes mirror schema.org so they can be re-pointed at Sanity GROQ
 * queries without changing the page.
 */
import type { ArticleFaq, Post, TeamMember } from "@/lib/types";
import { uniqueFaqs } from "@/lib/insights/dedupe-aeo";
import {
  normalizeModifiedDate,
  pruneJsonLd,
  stripJsonLdContext,
} from "@/lib/seo/jsonld-utils";
import { SITE_ORIGIN, absoluteUrl } from "@/lib/site-url";
import { slugify } from "@/lib/utils";

/** Shared schema @id constants — must match sitewideSchemaGraph in layout. */
export const SCHEMA_ORG_ID = `${SITE_ORIGIN}/#organization`;
export const SCHEMA_WEBSITE_ID = `${SITE_ORIGIN}/#website`;

function normalizeSchemaImageUrl(url?: string): string | undefined {
  if (!url?.trim()) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return absoluteUrl(url);
}

export function articleUrl(slug: string): string {
  return absoluteUrl(`/insights/${slug}`);
}

type ArticleJsonLdInput = {
  post: Post;
  author: TeamMember | null;
};

/** schema.org/Article or BlogPosting — main article structured data. */
export function articleJsonLd({ post, author }: ArticleJsonLdInput) {
  const url = articleUrl(post.slug);
  const imageUrl = post.seo?.ogImage ?? post.ogImage ?? post.image;
  const schemaType =
    post.seo?.structuredDataType === "Article" ? "Article" : "BlogPosting";

  const additionalProperty: Array<{
    "@type": "PropertyValue";
    name: string;
    value: string;
  }> = [];
  if (post.searchIntent) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "searchIntent",
      value: post.searchIntent,
    });
  }
  for (const point of post.painPoints ?? []) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "painPoint",
      value: point,
    });
  }

  const summary = post.aiSummary ?? post.oneSentenceSummary;
  const speakableAnswer =
    post.quickAnswer?.shortAnswer ?? post.llmSnippet ?? post.oneSentenceSummary;

  const authorSameAs = author
    ? [author.linkedin, author.twitter, author.website, author.upwork].filter(
        (link): link is string => Boolean(link),
      )
    : [];

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": url,
    url,
    headline: post.seo?.seoTitle ?? post.seoTitle ?? post.title,
    description: summary ?? post.seo?.seoDescription ?? post.seoDescription ?? post.excerpt,
    image: imageUrl
      ? [
          {
            "@type": "ImageObject",
            url: imageUrl,
            ...(post.imageCaption ? { caption: post.imageCaption } : {}),
            ...(post.imageAlt ? { name: post.imageAlt } : {}),
          },
        ]
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: (post.seo?.keywords ?? post.keywords)?.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    wordCount: estimateWordCount(post),
    ...(summary ? { abstract: summary } : {}),
    ...(post.searchIntent ? { genre: post.searchIntent } : {}),
    ...(post.entitiesMentioned?.length
      ? {
          about: post.entitiesMentioned.map((name) => ({
            "@type": "Thing",
            name,
          })),
          mentions: post.entitiesMentioned.map((name) => ({
            "@type": "Thing",
            name,
          })),
        }
      : {}),
    ...(post.targetAudience?.length
      ? {
          audience: {
            "@type": "Audience",
            audienceType: post.targetAudience.join(", "),
          },
        }
      : {}),
    ...(additionalProperty.length ? { additionalProperty } : {}),
    ...(speakableAnswer
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".article-quick-answer"],
          },
        }
      : {}),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      name: "ZedNova Studios",
      url: SITE_ORIGIN,
    },
    author: author
      ? {
          "@type": "Person",
          "@id": `${SITE_ORIGIN}/about#${author.slug}`,
          name: author.name,
          jobTitle: author.role,
          url: `${SITE_ORIGIN}/about`,
          ...(authorSameAs.length ? { sameAs: authorSameAs } : {}),
        }
      : { "@type": "Organization", name: "ZedNova Studios", url: SITE_ORIGIN },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "ZedNova Studios",
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/** Article page @graph — BlogPosting + linked Person entity for E-E-A-T. */
export function articlePageGraphJsonLd({
  post,
  author,
  related,
}: ArticleJsonLdInput & { related?: Post[] }) {
  const graph: object[] = [
    {
      ...articleJsonLd({ post, author }),
      ...(related?.length
        ? { relatedLink: related.map((p) => articleUrl(p.slug)) }
        : {}),
    },
  ];
  if (author) {
    graph.push(
      personJsonLd({
        slug: author.slug,
        name: author.name,
        role: author.role,
        bio: author.bio,
        image: author.avatar,
        sameAs: [author.linkedin, author.twitter, author.website, author.upwork].filter(
          (link): link is string => Boolean(link),
        ),
      }),
    );
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/** schema.org/ItemList — table of contents for long articles. */
export function articleTocJsonLd(
  post: Post,
  url: string,
  options?: { includeFaq?: boolean },
) {
  const headings = post.body.filter((b) => b.type === "h2");
  const items = headings.map((block, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: block.text,
    url: `${url}#${slugify(block.text)}`,
  }));

  if (options?.includeFaq) {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: "Frequently asked questions",
      url: `${url}#article-faq`,
    });
  }

  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Table of contents — ${post.title}`,
    itemListElement: items,
  };
}

/** schema.org/ItemList — related / continue-reading articles on an insight page. */
export function relatedArticlesJsonLd(related: Post[], currentTitle: string) {
  if (!related.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Continue reading — ${currentTitle}`,
    itemListElement: related.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        "@id": articleUrl(post.slug),
        url: articleUrl(post.slug),
        headline: post.seo?.seoTitle ?? post.seoTitle ?? post.title,
        description: post.oneSentenceSummary ?? post.excerpt,
        image: post.image ? [post.image] : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        articleSection: post.category,
        keywords: post.tags?.slice(0, 5).join(", "),
        ...(post.contentType ? { genre: post.contentType } : {}),
        author: {
          "@type": "Organization",
          name: "ZedNova Studios",
          url: SITE_ORIGIN,
        },
      },
    })),
  };
}

/** Unified @graph for insight article pages — article-specific nodes only. */
export function insightPageGraphJsonLd(input: {
  post: Post;
  author: TeamMember | null;
  crumbs: { label: string; href?: string }[];
  faqs?: ArticleFaq[];
  related?: Post[];
  includeToc?: boolean;
  includeFaq?: boolean;
}): { "@context": "https://schema.org"; "@graph": object[] } {
  const { post, author, crumbs, related } = input;
  const faqs = uniqueFaqs(input.faqs);
  const canonicalPath = post.seo?.seoCanonical ?? `/insights/${post.slug}`;
  const pageUrl = absoluteUrl(canonicalPath);
  const webPageId = `${pageUrl}#webpage`;
  const blogPostingId = `${pageUrl}#blogposting`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const imageUrl = normalizeSchemaImageUrl(
    post.seo?.ogImage ?? post.ogImage ?? post.image,
  );
  const imageId = `${pageUrl}#primaryimage`;
  const faqId = `${pageUrl}#faq`;
  const personId = author ? `${SITE_ORIGIN}/about#${author.slug}` : SCHEMA_ORG_ID;

  const headline = post.seo?.seoTitle ?? post.seoTitle ?? post.title;
  const description =
    post.aiSummary ??
    post.oneSentenceSummary ??
    post.seo?.seoDescription ??
    post.seoDescription ??
    post.excerpt;
  const datePublished = post.publishedAt;
  const dateModified = normalizeModifiedDate(
    datePublished,
    post.lastReviewedAt ?? post.updatedAt ?? datePublished,
  );

  const authorSameAs = author
    ? [author.linkedin, author.twitter, author.website, author.upwork].filter(
        (link): link is string => Boolean(link),
      )
    : [];

  const graph: object[] = [
    {
      "@type": "WebPage",
      "@id": webPageId,
      url: pageUrl,
      name: headline,
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": SCHEMA_WEBSITE_ID },
      breadcrumb: { "@id": breadcrumbId },
      ...(imageUrl ? { primaryImageOfPage: { "@id": imageId } } : {}),
      mainEntity: { "@id": blogPostingId },
      dateModified,
      datePublished,
    },
    {
      "@type": "BlogPosting",
      "@id": blogPostingId,
      url: pageUrl,
      headline,
      description,
      datePublished,
      dateModified,
      articleSection: post.category,
      ...((post.seo?.keywords ?? post.keywords)?.length
        ? { keywords: (post.seo?.keywords ?? post.keywords)!.join(", ") }
        : {}),
      wordCount: estimateWordCount(post),
      inLanguage: "en-US",
      isAccessibleForFree: true,
      ...(post.aiSummary || post.oneSentenceSummary
        ? { abstract: post.aiSummary ?? post.oneSentenceSummary }
        : {}),
      author: { "@id": personId },
      publisher: { "@id": SCHEMA_ORG_ID },
      mainEntityOfPage: { "@id": webPageId },
      ...(imageUrl ? { image: { "@id": imageId } } : {}),
      ...(related?.length
        ? { relatedLink: related.map((p) => articleUrl(p.slug)) }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: c.href ? absoluteUrl(c.href) : pageUrl,
      })),
    },
  ];

  if (imageUrl) {
    graph.push({
      "@type": "ImageObject",
      "@id": imageId,
      url: imageUrl,
      contentUrl: imageUrl,
      width: 1600,
      height: 900,
      ...(post.imageCaption ? { caption: post.imageCaption } : {}),
      ...(post.imageAlt ? { name: post.imageAlt } : {}),
    });
  }

  if (author) {
    graph.push({
      "@type": "Person",
      "@id": personId,
      name: author.name,
      jobTitle: author.role,
      url: absoluteUrl("/about"),
      ...(author.avatar ? { image: absoluteUrl(author.avatar) } : {}),
      ...(authorSameAs.length ? { sameAs: authorSameAs } : {}),
      worksFor: { "@id": SCHEMA_ORG_ID },
    });
  }

  if (input.includeToc) {
    const toc = articleTocJsonLd(post, pageUrl, { includeFaq: input.includeFaq });
    if (toc) {
      graph.push({
        ...stripJsonLdContext(toc as Record<string, unknown>),
        "@id": `${pageUrl}#toc`,
      });
    }
  }

  if (faqs.length && input.includeFaq !== false) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  if (related?.length) {
    const relatedList = relatedArticlesJsonLd(related, post.title);
    if (relatedList) {
      graph.push({
        ...stripJsonLdContext(relatedList as Record<string, unknown>),
        "@id": `${pageUrl}#related`,
      });
    }
  }

  return pruneJsonLd({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

/** schema.org/BreadcrumbList — for the breadcrumb trail. */
export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${SITE_ORIGIN}${c.href}` : undefined,
    })),
  };
}

/** schema.org/FAQPage — for the inline article FAQ (AEO). */
export function faqPageJsonLd(faqs: ArticleFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** schema.org/Organization — site-wide. */
export function organizationJsonLd(org?: {
  name?: string;
  legalName?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  phone?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: org?.name ?? "ZedNova Studios",
    legalName: org?.legalName,
    url: org?.url ?? SITE_ORIGIN,
    logo: org?.logo ?? `${SITE_ORIGIN}/icon.svg`,
    description: org?.description,
    email: org?.email,
    telephone: org?.phone,
    sameAs: org?.sameAs,
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: org?.email
      ? {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: org.email,
          availableLanguage: ["English"],
        }
      : undefined,
  };
}

/** schema.org/WebSite — site-wide search/discovery. */
export function websiteJsonLd(siteName = "ZedNova Studios") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: siteName,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    inLanguage: "en-US",
  };
}

/** schema.org/Service — for service detail pages. */
export function serviceJsonLd(service: {
  slug: string;
  title: string;
  whatItIs: string;
  category: string;
  pricingSignal: string;
  image: string;
}) {
  const url = `${SITE_ORIGIN}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    url,
    name: service.title,
    description: service.whatItIs,
    serviceType: service.category,
    image: service.image,
    provider: {
      "@type": "Organization",
      name: "ZedNova Studios",
      url: SITE_ORIGIN,
    },
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: service.pricingSignal.replace(/[^0-9.]/g, ""),
      description: service.pricingSignal,
    },
  };
}

/** schema.org/Service — generic variant for any path (migrations, custom software). */
export function serviceAtJsonLd(input: {
  path: string;
  title: string;
  description?: string;
  serviceType?: string;
  image?: string;
  providerName?: string;
  pricingSignal?: string;
  startingPrice?: number;
  timeline?: string;
}) {
  const url = `${SITE_ORIGIN}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    url,
    name: input.title,
    description: input.description,
    serviceType: input.serviceType,
    image: input.image,
    provider: {
      "@type": "Organization",
      name: input.providerName ?? "ZedNova Studios",
      url: SITE_ORIGIN,
    },
    areaServed: { "@type": "Country", name: "United States" },
    offers:
      input.pricingSignal || input.startingPrice != null
        ? {
            "@type": "Offer",
            priceCurrency: "USD",
            price:
              input.startingPrice != null
                ? String(input.startingPrice)
                : input.pricingSignal?.replace(/[^0-9.]/g, "") || "0",
            description: input.pricingSignal,
            availability: "https://schema.org/InStock",
          }
        : undefined,
  };
}

/** schema.org/Service for industry/category pages (treated as a service catalog page). */
export function industryJsonLd(industry: {
  slug: string;
  title: string;
  shortDescription: string;
  heroHeadline: string;
}) {
  const url = `${SITE_ORIGIN}/industries/${industry.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: industry.title,
    description: industry.shortDescription,
    headline: industry.heroHeadline,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "ZedNova Studios",
      url: SITE_ORIGIN,
    },
  };
}

/** schema.org/CreativeWork for case study / work detail pages. */
export function caseStudyJsonLd(c: {
  slug: string;
  title: string;
  client: string;
  industry: string;
  resultHeadline: string;
  challenge: string;
  image: string;
}) {
  const url = `${SITE_ORIGIN}/work/${c.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    url,
    name: c.title,
    description: `${c.client}: ${c.resultHeadline}.`,
    image: c.image,
    about: c.challenge,
    creator: {
      "@type": "Organization",
      name: "ZedNova Studios",
      url: SITE_ORIGIN,
    },
    keywords: c.industry,
    inLanguage: "en-US",
  };
}

/** Crude word-count estimate from the block model — used for article wordCount. */
function estimateWordCount(post: Post): number {
  return post.body.reduce((sum, block) => {
    if (block.type === "ul") return sum + block.items.join(" ").split(/\s+/).length;
    if ("text" in block && block.text) return sum + block.text.split(/\s+/).length;
    return sum;
  }, 0);
}

/** schema.org/Person — founder profile linked to Organization. */
export function personJsonLd(person: {
  slug: string;
  name: string;
  role: string;
  bio?: string[];
  image?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/about#${person.slug}`,
    name: person.name,
    jobTitle: person.role,
    url: `${SITE_ORIGIN}/about`,
    image: person.image ? absoluteUrl(person.image) : undefined,
    description: person.bio?.[0],
    worksFor: { "@id": `${SITE_ORIGIN}/#organization` },
    sameAs: person.sameAs?.filter(Boolean),
  };
}

/** schema.org/ContactPage for the contact route. */
export function contactPageJsonLd(email: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_ORIGIN}/contact`,
    url: `${SITE_ORIGIN}/contact`,
    name: "Contact ZedNova Studios",
    description:
      "Tell ZedNova what you need — websites, custom software, automations, and AI tools for service businesses.",
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email,
        availableLanguage: ["English"],
      },
    },
  };
}

/** Homepage ProfessionalService + core offer list. @deprecated Use homepageGraphJsonLd */
export function homepageServiceGraphJsonLd(
  services: { slug: string; title: string; shortDescription: string }[],
  recentPosts?: Post[],
) {
  return homepageGraphJsonLd({ services, recentPosts, faqs: [] });
}

type HomepageGraphPillar = {
  tagline: string;
  title: string;
  body: string;
};

type HomepageGraphPortfolio = {
  slug: string;
  title: string;
  summary: string;
  href?: string;
  category?: string;
};

type HomepageGraphCaseStudy = {
  slug: string;
  title: string;
  excerpt?: string;
};

type HomepageGraphIndustry = {
  title: string;
  shortDescription: string;
  href: string;
};

type HomepageGraphPricing = {
  slug: string;
  title: string;
  shortDescription: string;
  pricing: { setupAmount: string; monthlyAmount?: string };
  timeline: string;
};

type HomepageGraphTestimonial = {
  quote: string;
  authorName: string;
  authorTitle?: string;
  company?: string;
  rating?: number;
};

type HomepageGraphComparison = {
  heading: string;
  subheading: string;
  sections: { title: string; rows: { category: string; zednova: string }[] }[];
};

export type HomepageGraphInput = {
  pillars?: HomepageGraphPillar[];
  clientLogos?: string[];
  portfolioProjects?: HomepageGraphPortfolio[];
  featuredCases?: HomepageGraphCaseStudy[];
  stats?: { value: string; label: string }[];
  services?: { slug: string; title: string; shortDescription: string }[];
  customSoftware?: { slug: string; title: string; shortDescription?: string }[];
  migrations?: { slug: string; title: string; shortDescription?: string }[];
  techStackGroups?: { category: string; description: string; tools: string[] }[];
  industries?: HomepageGraphIndustry[];
  testimonials?: HomepageGraphTestimonial[];
  pricingPackages?: HomepageGraphPricing[];
  faqs?: ArticleFaq[];
  recentPosts?: Post[];
  founder?: Parameters<typeof personJsonLd>[0];
  agencyComparison?: HomepageGraphComparison;
};

function homepageItemList(
  id: string,
  name: string,
  items: { name: string; description?: string; url?: string; type?: string }[],
) {
  if (!items.length) return null;

  return {
    "@type": "ItemList",
    "@id": id,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": item.type ?? "Thing",
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(item.url ? { url: item.url } : {}),
      },
    })),
  };
}

function parseUsdPrice(value?: string): string | undefined {
  if (!value) return undefined;
  const match = value.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return match?.[1];
}

/** Unified @graph for the homepage — mirrors visible sections for AEO / rich results. */
export function homepageGraphJsonLd(input: HomepageGraphInput) {
  const graph: object[] = [];
  const homepageId = `${SITE_ORIGIN}/#homepage`;
  const sectionIds: { "@id": string }[] = [];

  const pushSection = (node: object | null, id: string) => {
    if (!node) return;
    graph.push(node);
    sectionIds.push({ "@id": id });
  };

  graph.push({
    "@type": "WebPage",
    "@id": homepageId,
    url: SITE_ORIGIN,
    name: "Websites, Custom Software & AI Tools | ZedNova",
    description:
      "We build Next.js websites, Shopify stores, custom software, CRM automations, and AI tools for clinics, ecommerce brands, and growing businesses.",
    isPartOf: { "@id": SCHEMA_WEBSITE_ID },
    about: { "@id": SCHEMA_ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReserveAction",
      target: `${SITE_ORIGIN}/contact`,
      name: "Book a call with ZedNova Studios",
    },
  });

  const serviceOffers = [
    ...(input.services ?? []).map((service) => ({
      name: service.title,
      description: service.shortDescription,
      url: `${SITE_ORIGIN}/services/${service.slug}`,
    })),
    ...(input.customSoftware ?? []).map((item) => ({
      name: item.title,
      description: item.shortDescription,
      url: `${SITE_ORIGIN}/custom-software/${item.slug}`,
    })),
    ...(input.migrations ?? []).map((item) => ({
      name: item.title,
      description: item.shortDescription,
      url: `${SITE_ORIGIN}/migrations/${item.slug}`,
    })),
  ];

  graph.push({
    "@type": "ProfessionalService",
    "@id": `${SITE_ORIGIN}/#professional-service`,
    name: "ZedNova Studios",
    url: SITE_ORIGIN,
    description:
      "We build websites, custom software, automations, and AI tools for clinics, ecommerce brands, and service businesses.",
    provider: { "@id": SCHEMA_ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    ...(serviceOffers.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "ZedNova Studios services",
            itemListElement: serviceOffers.map((service, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: {
                "@type": "Service",
                name: service.name,
                description: service.description,
                url: service.url,
              },
            })),
          },
        }
      : {}),
  });

  pushSection(
    homepageItemList(
      `${SITE_ORIGIN}/#approach`,
      "Our approach",
      (input.pillars ?? []).map((pillar) => ({
        name: pillar.title,
        description: `${pillar.tagline}. ${pillar.body}`,
        type: "Service",
      })),
    ),
    `${SITE_ORIGIN}/#approach`,
  );

  pushSection(
    homepageItemList(
      `${SITE_ORIGIN}/#client-logos`,
      "Trusted by teams across the US",
      (input.clientLogos ?? []).map((name) => ({ name, type: "Organization" })),
    ),
    `${SITE_ORIGIN}/#client-logos`,
  );

  pushSection(
    homepageItemList(
      `${SITE_ORIGIN}/#portfolio`,
      "Projects and case studies",
      (input.portfolioProjects ?? []).map((project) => ({
        name: project.title,
        description: project.summary,
        url: project.href ?? `${SITE_ORIGIN}/work/${project.slug}`,
        type: "CreativeWork",
      })),
    ),
    `${SITE_ORIGIN}/#portfolio`,
  );

  pushSection(
    homepageItemList(
      `${SITE_ORIGIN}/#featured-case-studies`,
      "Featured case studies",
      (input.featuredCases ?? []).map((study) => ({
        name: study.title,
        description: study.excerpt,
        url: `${SITE_ORIGIN}/work/${study.slug}`,
        type: "Article",
      })),
    ),
    `${SITE_ORIGIN}/#featured-case-studies`,
  );

  pushSection(
    homepageItemList(
      `${SITE_ORIGIN}/#stats`,
      "ZedNova Studios at a glance",
      (input.stats ?? []).map((stat) => ({
        name: `${stat.value} ${stat.label}`,
        type: "QuantitativeValue",
      })),
    ),
    `${SITE_ORIGIN}/#stats`,
  );

  pushSection(
    homepageItemList(
      `${SITE_ORIGIN}/#tech-stack`,
      "Technology stack",
      (input.techStackGroups ?? []).flatMap((group) =>
        group.tools.map((tool) => ({
          name: tool,
          description: `${group.category}: ${group.description}`,
          type: "SoftwareApplication",
        })),
      ),
    ),
    `${SITE_ORIGIN}/#tech-stack`,
  );

  pushSection(
    homepageItemList(
      `${SITE_ORIGIN}/#industries`,
      "Industries we serve",
      (input.industries ?? []).map((industry) => ({
        name: industry.title,
        description: industry.shortDescription,
        url: `${SITE_ORIGIN}${industry.href}`,
        type: "Service",
      })),
    ),
    `${SITE_ORIGIN}/#industries`,
  );

  if (input.testimonials?.length) {
    const reviewNodes = input.testimonials.slice(0, 12).map((testimonial, index) => ({
      "@type": "Review",
      "@id": `${SITE_ORIGIN}/#review-${index + 1}`,
      reviewBody: testimonial.quote,
      author: {
        "@type": "Person",
        name: testimonial.authorName,
        ...(testimonial.authorTitle ? { jobTitle: testimonial.authorTitle } : {}),
        ...(testimonial.company
          ? { worksFor: { "@type": "Organization", name: testimonial.company } }
          : {}),
      },
      itemReviewed: { "@id": SCHEMA_ORG_ID },
      ...(testimonial.rating
        ? {
            reviewRating: {
              "@type": "Rating",
              ratingValue: testimonial.rating,
              bestRating: 5,
            },
          }
        : {}),
    }));

    graph.push(...reviewNodes);
    sectionIds.push({ "@id": `${SITE_ORIGIN}/#testimonials` });
  }

  if (input.agencyComparison) {
    pushSection(
      homepageItemList(
        `${SITE_ORIGIN}/#agency-comparison`,
        input.agencyComparison.heading,
        input.agencyComparison.sections.flatMap((section) =>
          section.rows.map((row) => ({
            name: row.category,
            description: row.zednova,
          })),
        ),
      ),
      `${SITE_ORIGIN}/#agency-comparison`,
    );
  }

  if (input.pricingPackages?.length) {
    graph.push({
      "@type": "OfferCatalog",
      "@id": `${SITE_ORIGIN}/#pricing`,
      name: "ZedNova Studios pricing",
      itemListElement: input.pricingPackages.map((pkg, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: pkg.title,
        description: pkg.shortDescription,
        url: `${SITE_ORIGIN}/contact`,
        priceCurrency: "USD",
        price: parseUsdPrice(pkg.pricing.setupAmount),
        ...(pkg.pricing.monthlyAmount
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: parseUsdPrice(pkg.pricing.monthlyAmount),
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            }
          : {}),
        eligibleDuration: pkg.timeline,
        seller: { "@id": SCHEMA_ORG_ID },
      })),
    });
    sectionIds.push({ "@id": `${SITE_ORIGIN}/#pricing` });
  }

  const faqs = uniqueFaqs(input.faqs);
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_ORIGIN}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
    sectionIds.push({ "@id": `${SITE_ORIGIN}/#faq` });
  }

  if (input.recentPosts?.length) {
    const relatedList = relatedArticlesJsonLd(
      input.recentPosts,
      "Recent blog posts from ZedNova Studios",
    );
    if (relatedList) {
      graph.push({
        ...stripJsonLdContext(relatedList as Record<string, unknown>),
        "@id": `${SITE_ORIGIN}/#recent-insights`,
      });
      sectionIds.push({ "@id": `${SITE_ORIGIN}/#recent-insights` });
    }
  }

  if (input.founder) {
    graph.push({
      ...stripJsonLdContext(personJsonLd(input.founder) as Record<string, unknown>),
      "@id": `${SITE_ORIGIN}/about#${input.founder.slug}`,
    });
    sectionIds.push({ "@id": `${SITE_ORIGIN}/about#${input.founder.slug}` });
  }

  if (sectionIds.length) {
    const homepageNode = graph.find(
      (node) =>
        typeof node === "object" &&
        node !== null &&
        "@id" in node &&
        (node as { "@id"?: string })["@id"] === homepageId,
    ) as Record<string, unknown> | undefined;

    if (homepageNode) {
      homepageNode.hasPart = sectionIds;
      homepageNode.mainEntity = { "@id": `${SITE_ORIGIN}/#professional-service` };
    }
  }

  return pruneJsonLd({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

/** schema.org/AboutPage — for the about route. */
export function aboutPageJsonLd(founder?: {
  slug: string;
  name: string;
  role: string;
  bio?: string[];
  image?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_ORIGIN}/about`,
    url: `${SITE_ORIGIN}/about`,
    name: "About ZedNova Studios",
    description:
      "ZedNova Studios is a software and product studio led by Zlatko Marjanovic, building websites, ecommerce, custom software, automations, and AI tools for clinics, ecommerce brands, and service businesses.",
    mainEntity: founder
      ? {
          "@type": "Organization",
          "@id": `${SITE_ORIGIN}/#organization`,
          founder: personJsonLd(founder),
        }
      : { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

/** schema.org/CollectionPage — for index/listing routes. */
export function collectionPageJsonLd(input: {
  slug?: string;
  path: string;
  name: string;
  description: string;
}) {
  const url = `${SITE_ORIGIN}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
    },
  };
}

/** Connected @graph for sitewide Organization + WebSite + founder Person. */
export function sitewideSchemaGraph(input?: {
  org?: Parameters<typeof organizationJsonLd>[0];
  founder?: Parameters<typeof personJsonLd>[0];
  siteName?: string;
}) {
  const org = organizationJsonLd(input?.org);
  const site = websiteJsonLd(input?.siteName);
  const graph: object[] = [org, site];
  if (input?.founder) graph.push(personJsonLd(input.founder));
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
