import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ServiceDetailView,
  loadServiceDetailContext,
} from "@/features/services/ServiceDetailView";
import {
  getAllParentServiceParams,
  getParentSlugForServiceSlug,
  getServiceSlugForParent,
  isParentServiceSlug,
  parentServicePath,
  getParentServiceLabel,
  getParentServiceTagline,
} from "@/lib/content/service-routes";
import { getAllServices, getServiceBySlug } from "@/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getAllServices();
  const parents = getAllParentServiceParams();
  return [
    ...services.map((service) => ({ slug: service.slug })),
    ...parents,
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (isParentServiceSlug(slug)) {
    const label = getParentServiceLabel(slug);
    const description = getParentServiceTagline(slug);
    return {
      title: `${label} | ZedNova Studio`,
      description,
      alternates: { canonical: `/services/${slug}` },
      openGraph: {
        type: "website",
        url: `/services/${slug}`,
        title: `${label} | ZedNova Studio`,
        description,
      },
    };
  }

  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const canonical = parentServicePath(slug);
  const title = service.seo?.seoTitle ?? service.title;
  const description = service.seo?.seoDescription ?? service.whatItIs;
  const ogImage = service.seo?.ogImage ?? service.image;
  const noIndex = service.seo?.seoNoIndex ?? false;

  return {
    title,
    description,
    keywords: service.seo?.keywords,
    alternates: { canonical: service.seo?.seoCanonical ?? canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: ogImage ? [{ url: ogImage, alt: service.title }] : undefined,
    },
    twitter: {
      card: (service.seo?.twitterCard ?? "summary_large_image") as
        | "summary"
        | "summary_large_image"
        | "player"
        | "app",
      title: service.seo?.twitterTitle ?? title,
      description: service.seo?.twitterDescription ?? description,
      images: service.seo?.twitterImage ? [service.seo.twitterImage] : undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function ServiceSegmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // /services/<parent-slug> — load the service document that powers this parent.
  if (isParentServiceSlug(slug)) {
    const serviceSlug = getServiceSlugForParent(slug);
    const service = await getServiceBySlug(serviceSlug);
    if (!service) notFound();

    const context = await loadServiceDetailContext(service);
    return (
      <ServiceDetailView
        service={service}
        context={context}
        overrides={{
          title: service.heroHeadline ?? service.title,
          subhead: service.heroSubhead ?? service.whatItIs,
          breadcrumbs: [
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: getParentServiceLabel(slug) },
          ],
          canonicalPath: parentServicePath(slug),
        }}
      />
    );
  }

  // Legacy flat slug (e.g. /services/ai-lead-site) — redirect to parent page.
  const parentSlug = getParentSlugForServiceSlug(slug);
  if (parentSlug) {
    const service = await getServiceBySlug(slug);
    if (!service) notFound();
    const context = await loadServiceDetailContext(service);
    return (
      <ServiceDetailView
        service={service}
        context={context}
        overrides={{
          title: service.heroHeadline ?? service.title,
          subhead: service.heroSubhead ?? service.whatItIs,
          breadcrumbs: [
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: getParentServiceLabel(parentSlug) },
          ],
          canonicalPath: parentServicePath(parentSlug),
        }}
      />
    );
  }

  // Any other service slug — render directly (secondary services).
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const context = await loadServiceDetailContext(service);
  return <ServiceDetailView service={service} context={context} />;
}
