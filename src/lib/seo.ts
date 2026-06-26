/**
 * Structured-data (JSON-LD) builders for article pages.
 * Shapes mirror schema.org so they can be re-pointed at Sanity GROQ
 * queries without changing the page.
 */
import type { ArticleFaq, Post, TeamMember } from "@/lib/types";
import { SITE_ORIGIN, absoluteUrl } from "@/lib/site-url";
import { slugify } from "@/lib/utils";

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

/** Homepage ProfessionalService + core offer list. */
export function homepageServiceGraphJsonLd(
  services: { slug: string; title: string; shortDescription: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_ORIGIN}/#professional-service`,
        name: "ZedNova Studios",
        url: SITE_ORIGIN,
        description:
          "We build websites, custom software, automations, and AI tools for clinics, ecommerce brands, and service businesses.",
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "ZedNova Studios services",
          itemListElement: services.slice(0, 8).map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.shortDescription,
              url: `${SITE_ORIGIN}/services/${service.slug}`,
            },
          })),
        },
      },
    ],
  };
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
