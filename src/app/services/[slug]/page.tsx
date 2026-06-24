import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  getAllServices,
  getAllPosts,
  getInsightsByService,
  getServiceBySlug,
  getServiceRelatedPortfolioProjects,
  getServicesBySlugs,
} from "@/lib/queries";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Tag } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { PortfolioWorkGrid } from "@/features/work/PortfolioWorkGrid";
import { ProcessSteps } from "@/features/home/ProcessSteps";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { FaqSection } from "@/components/sections/FaqSection";
import { ArticleCard } from "@/features/insights/ArticleCard";
import { slugify } from "@/lib/utils";
import { TemplateSection } from "@/ui/TemplateSection";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const title = service.seo?.seoTitle ?? service.title;
  const description = service.seo?.seoDescription ?? service.whatItIs;
  const ogImage = service.seo?.ogImage ?? service.image;
  const noIndex = service.seo?.seoNoIndex ?? false;

  return {
    title,
    description,
    keywords: service.seo?.keywords,
    alternates: { canonical: service.seo?.seoCanonical ?? `/services/${slug}` },
    openGraph: {
      type: "website",
      url: `/services/${slug}`,
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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [relatedWork, allPosts, relatedServices] = await Promise.all([
    getServiceRelatedPortfolioProjects(service),
    getAllPosts(),
    service.relatedServices
      ? getServicesBySlugs(service.relatedServices)
      : Promise.resolve([]),
  ]);

  const insights =
    service.relatedInsights && service.relatedInsights.length > 0
      ? allPosts
          .filter((post) => service.relatedInsights!.includes(post.slug))
          .slice(0, 3)
      : await getInsightsByService(slug, 3);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  const whatsIncluded =
    service.whatsIncluded && service.whatsIncluded.length > 0
      ? service.whatsIncluded
      : service.deliverables.map((d) => ({ title: d, description: undefined }));

  const hasFaq = Boolean(service.faqs && service.faqs.length);

  return (
    <>
      <JsonLd
        data={[serviceJsonLd(service), breadcrumbJsonLd(crumbs)]}
      />

      {/* Hero */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} />
                <Reveal>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="font-mono text-sm text-zn-text-3">
                      {service.number}
                    </span>
                    <Tag>{service.category}</Tag>
                  </div>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={service.heroHeadline ?? service.title}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {service.heroSubhead ?? service.whatItIs}
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button href={`/contact?service=${service.slug}`} withArrow>
                      Start this service
                    </Button>
                    <span className="text-sm text-zn-text-3">
                      {service.timeline}
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment + What's included */}
      <section data-theme="light" className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]">
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset grid gap-12 py-[clamp(3rem,6vw,5rem)] lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <div className="rounded-[2px] border border-zn-border bg-zn-bg-2/50 p-7">
                  <p className="zn-label text-zn-text-3">Investment</p>
                  <p className="mt-3 font-mono text-2xl text-zn-text">
                    {service.pricingSignal}
                  </p>
                  {service.startingPrice != null && (
                    <p className="mt-1 text-sm text-zn-text-3">
                      From ${service.startingPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-zn-text-3">{service.timeline}</p>

                  {whatsIncluded.length > 0 && (
                    <ul className="mt-6 grid gap-3 border-t border-zn-border pt-6">
                      {whatsIncluded.map((item) => (
                        <li
                          key={item.title}
                          className="flex items-start gap-3 text-sm text-zn-text"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                            aria-hidden="true"
                          />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.pricingTiers && service.pricingTiers.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {service.pricingTiers.map((tier) => (
                        <div
                          key={tier.label}
                          className="border-t border-zn-border pt-3"
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-medium text-zn-text">
                              {tier.label}
                            </span>
                            <span className="font-mono text-sm text-zn-text-2">
                              ${tier.amount.toLocaleString()}
                              {tier.period ? ` / ${tier.period}` : ""}
                            </span>
                          </div>
                          {tier.features && tier.features.length > 0 && (
                            <ul className="mt-2 grid gap-1.5 text-sm text-zn-text-2">
                              {tier.features.map((f) => (
                                <li key={f} className="flex gap-2">
                                  <Check className="mt-0.5 size-3.5 text-zn-text-3" aria-hidden="true" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6">
                    <Button
                      href={`/contact?service=${service.slug}`}
                      withArrow
                      className="w-full"
                    >
                      Start this service
                    </Button>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <SectionLabel withRule={false}>What&apos;s included</SectionLabel>
                </Reveal>
                <Stagger
                  className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2"
                  stagger={0.04}
                >
                  {whatsIncluded.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 border-b border-zn-border pb-4 text-zn-text"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden="true" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        {item.description && (
                          <p className="mt-1 text-sm text-zn-text-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplateSection>
        <Reveal>
          <SectionLabel withRule={false}>Who it&apos;s for</SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="Built for these teams"
          className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.05}>
          {service.idealClients.map((profile, i) => (
            <div
              key={profile}
              className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7"
            >
              <span className="font-mono text-sm text-zn-text-3">0{i + 1}</span>
              <p className="mt-4 leading-relaxed text-zn-text">{profile}</p>
            </div>
          ))}
        </Stagger>
      </TemplateSection>

      {service.processSteps.length > 0 && (
        <TemplateSection>
          <Reveal>
            <SectionLabel withRule={false}>Our process</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text={`How we deliver ${service.title.toLowerCase()}`}
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <div className="mt-16">
            <ProcessSteps steps={service.processSteps} />
          </div>
        </TemplateSection>
      )}

      {service.results.length > 0 && (
        <TemplateSection theme="dark">
          <Reveal>
            <SectionLabel withRule={false} className="text-zn-inv-2">
              Results you can expect
            </SectionLabel>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-zn-border-dk bg-zn-border-dk md:grid-cols-3"
            stagger={0.05}
          >
            {service.results.map((result) => (
              <div key={result} className="bg-zn-dark p-8">
                <Check className="size-5 text-zn-inv" aria-hidden="true" />
                <p className="mt-4 leading-relaxed text-zn-inv">{result}</p>
              </div>
            ))}
          </Stagger>
        </TemplateSection>
      )}

      {/* FAQ (CMS-driven) */}
      {hasFaq && <FaqSection faqs={service.faqs!} title={`${service.title} FAQ`} id={`${slugify(service.title)}-faq`} />}

      {relatedWork.length > 0 && (
        <TemplateSection withBlueprintGrid className="bg-zn-bg">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <SectionLabel withRule={false}>Related work</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="Projects and case studies"
                className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
              />
            </div>
            <Reveal delay={0.1}>
              <Button href="/work" variant="link" withArrow>
                All case studies
              </Button>
            </Reveal>
          </div>
          <PortfolioWorkGrid projects={relatedWork} />
        </TemplateSection>
      )}

      {insights.length > 0 && (
        <TemplateSection>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Reveal>
                <SectionLabel withRule={false}>Related insights</SectionLabel>
              </Reveal>
              <TextReveal
                as="h2"
                text="Notes that connect to this service"
                className="mt-6 zn-h2 font-sans font-normal"
              />
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/insights"
                className="hidden items-center gap-1.5 text-sm font-medium text-zn-text sm:inline-flex"
              >
                <span className="zn-underline">All insights</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </TemplateSection>
      )}

      {relatedServices.length > 0 && (
        <TemplateSection borderBottom={false}>
          <Reveal>
            <SectionLabel withRule={false}>Related services</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Often combined with"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <Stagger
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-3 rounded-[2px] border border-zn-border bg-zn-bg-2 p-6 transition-colors hover:border-zn-text"
              >
                <span className="font-mono text-xs text-zn-text-3">{s.number}</span>
                <span className="font-sans text-lg font-normal text-zn-text">{s.title}</span>
                <span className="text-sm leading-relaxed text-zn-text-2">
                  {s.shortDescription}
                </span>
              </Link>
            ))}
          </Stagger>
        </TemplateSection>
      )}

      <DarkCTA
        heading="Ready to put this system to work?"
        sub={`Tell us about your business. We will scope ${service.title.toLowerCase()} on the discovery call.`}
        ctaLabel="Start this service"
        ctaHref={`/contact?service=${service.slug}`}
      />
    </>
  );
}
