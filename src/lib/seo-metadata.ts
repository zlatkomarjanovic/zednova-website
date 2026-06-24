import type { Metadata } from "next";
import type { OpenGraphFields, SeoFields } from "@/lib/types";

type ResolveMetadataInput = {
  title: string;
  description: string;
  path: string;
  seo?: SeoFields;
  openGraph?: OpenGraphFields;
  image?: string;
  type?: "website" | "article";
};

/** Resolve Next.js Metadata from CMS SEO fields with safe fallbacks. */
export function resolveContentMetadata({
  title,
  description,
  path,
  seo,
  openGraph,
  image,
  type = "website",
}: ResolveMetadataInput): Metadata {
  const metaTitle = seo?.seoTitle ?? openGraph?.ogTitle ?? title;
  const metaDescription =
    seo?.seoDescription ?? openGraph?.ogDescription ?? description;
  const canonical = seo?.seoCanonical ?? seo?.canonicalUrl ?? path;
  const ogTitle = openGraph?.ogTitle ?? seo?.ogTitle ?? metaTitle;
  const ogDescription = openGraph?.ogDescription ?? seo?.ogDescription ?? metaDescription;
  const ogImage = openGraph?.ogImage ?? seo?.ogImage ?? image;
  const twitterCard = (openGraph?.twitterCardType ??
    seo?.twitterCard ??
    "summary_large_image") as "summary" | "summary_large_image" | "player" | "app";
  const noIndex =
    seo?.seoNoIndex === true ||
    seo?.robotsIndex === false;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.keywords ?? seo?.secondaryKeywords,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: seo?.robotsFollow === false ? false : true }
      : {
          index: seo?.robotsIndex !== false,
          follow: seo?.robotsFollow !== false,
        },
    openGraph: {
      type: (openGraph?.ogType ?? seo?.ogType ?? type) as "website" | "article",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: twitterCard,
      title: openGraph?.twitterTitle ?? seo?.twitterTitle ?? ogTitle,
      description:
        openGraph?.twitterDescription ?? seo?.twitterDescription ?? ogDescription,
      images: openGraph?.twitterImage ?? seo?.twitterImage ?? ogImage
        ? [openGraph?.twitterImage ?? seo?.twitterImage ?? ogImage!]
        : undefined,
    },
  };
}
