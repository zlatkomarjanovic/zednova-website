import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getIndustryParentBySlug } from "@/lib/queries";
import { getParentSlugForSubIndustry, isParentIndustrySlug } from "@/lib/content/industry-routes";
import { resolveIndustryPageContent } from "@/lib/content/resolve-industry-page";
import {
  IndustryDetailView,
  loadIndustryDetailContext,
} from "@/features/industries/IndustryDetailView";
import { getAllParentIndustrySlugs } from "@/lib/content/industry-routes";

export const revalidate = 60;

export async function generateStaticParams() {
  return getAllParentIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isParentIndustrySlug(slug)) {
    const parentSlug = getParentSlugForSubIndustry(slug);
    if (parentSlug) {
      const parent = await getIndustryParentBySlug(parentSlug);
      if (parent) {
        return {
          title: parent.seo?.seoTitle ?? parent.title,
          alternates: { canonical: `/industries/${parentSlug}` },
        };
      }
    }
    return {};
  }

  const parent = await getIndustryParentBySlug(slug);
  if (!parent) return {};

  const page = resolveIndustryPageContent(parent);
  const title = parent.seo?.seoTitle ?? page.seoTitle;
  const description = parent.seo?.seoDescription ?? page.seoDescription;
  const canonical = parent.seo?.seoCanonical ?? `/industries/${slug}`;

  return {
    title,
    description,
    keywords: parent.seo?.keywords,
    alternates: { canonical },
    robots: parent.seo?.seoNoIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: parent.seo?.ogImage ? [parent.seo.ogImage] : undefined,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isParentIndustrySlug(slug)) {
    const parentSlug = getParentSlugForSubIndustry(slug);
    if (parentSlug) redirect(`/industries/${parentSlug}`);
    notFound();
  }

  const parent = await getIndustryParentBySlug(slug);
  if (!parent) notFound();

  const context = await loadIndustryDetailContext(parent);

  return <IndustryDetailView parent={parent} context={context} />;
}
