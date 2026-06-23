/**
 * Structured-data (JSON-LD) builders for article pages.
 * Shapes mirror schema.org so they can be re-pointed at Sanity GROQ
 * queries without changing the page.
 */
import type { ArticleFaq, Post, TeamMember } from "@/lib/types";

const SITE_ORIGIN = "https://zednova.com";

export function articleUrl(slug: string): string {
  return `${SITE_ORIGIN}/insights/${slug}`;
}

type ArticleJsonLdInput = {
  post: Post;
  author: TeamMember | null;
};

/** schema.org/Article (BlogArticle) — main article structured data. */
export function articleJsonLd({ post, author }: ArticleJsonLdInput) {
  const url = articleUrl(post.slug);
  const image = post.ogImage ?? post.image;
  return {
    "@context": "https://schema.org",
    "@type": "BlogArticle",
    "@id": url,
    url,
    headline: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords?.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
    wordCount: estimateWordCount(post),
    author: author
      ? {
          "@type": "Person",
          "@id": `${SITE_ORIGIN}/about#${author.slug}`,
          name: author.name,
          jobTitle: author.role,
          url: `${SITE_ORIGIN}/about`,
        }
      : { "@type": "Organization", name: "ZedNova Studios", url: SITE_ORIGIN },
    publisher: {
      "@type": "Organization",
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
    return sum + block.text.split(/\s+/).length;
  }, 0);
}
