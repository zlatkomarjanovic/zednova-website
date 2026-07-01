import { Check } from "lucide-react";

import {
  getAllPosts,
  getPlatformTestimonials,
  getServiceRelatedPortfolioProjects,
} from "@/lib/queries";
import type { Service, ProcessStep } from "@/lib/types";
import type { PortfolioProject } from "@/lib/types";
import type { Post } from "@/lib/types";
import type { Testimonial } from "@/lib/types";
import {
  serviceJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";
import { getServiceSectionCopy, getServiceFaqSectionCopy, getServiceProblemsHeadline } from "@/lib/content/service-detail-fallbacks";
import { AGENCY_VALUES } from "@/lib/content/agency-values";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Button } from "@/ui/Button";
import { CmsImage } from "@/ui/CmsImage";
import { PortfolioWorkGrid } from "@/features/work/PortfolioWorkGrid";
import { LogoTicker } from "@/features/home/LogoTicker";
import { OurApproachSection } from "@/features/home/OurApproachSection";
import { TestimonialCarousel } from "@/features/home/TestimonialCarousel";
import { ServicePageCTA } from "@/features/services/ServicePageCTA";
import { ServiceProblemsSection } from "@/features/services/ServiceProblemsSection";
import { ServiceSubServicesSection } from "@/features/services/ServiceSubServicesSection";
import { ServiceValuesSection } from "@/features/services/ServiceValuesSection";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { FaqSection } from "@/features/home/FaqSection";
import { InsightsHomePostsSection } from "@/features/insights/InsightsHomePostsSection";
import { cn } from "@/lib/utils";

const RECENT_INSIGHTS_DESCRIPTION =
  "Practical notes on AI search, websites, Shopify, CRM automations, and software for clinics, ecommerce brands, and service businesses.";

export type ServiceDetailContext = {
  relatedWork: PortfolioProject[];
  recentPosts: Post[];
  platformTestimonials: Testimonial[];
};

export type ServiceDetailOverrides = {
  title?: string;
  subhead?: string;
  breadcrumbs?: { label: string; href?: string }[];
  canonicalPath?: string;
};

export async function loadServiceDetailContext(service: Service): Promise<ServiceDetailContext> {
  const [relatedWork, allPosts, platformTestimonials] = await Promise.all([
    getServiceRelatedPortfolioProjects(service),
    getAllPosts(),
    getPlatformTestimonials(),
  ]);

  return {
    relatedWork,
    recentPosts: allPosts.slice(0, 3),
    platformTestimonials,
  };
}

export function ServiceDetailView({
  service,
  context,
  overrides,
}: {
  service: Service;
  context: ServiceDetailContext;
  overrides?: ServiceDetailOverrides;
}) {
  const { relatedWork, recentPosts, platformTestimonials } = context;
  const sectionCopy = getServiceSectionCopy(service.slug);
  const problemsHeadline = getServiceProblemsHeadline(service);
  const faqSectionCopy = getServiceFaqSectionCopy(service);
  const displayTitle = overrides?.title ?? service.heroHeadline ?? service.title;
  const displaySubhead = overrides?.subhead ?? service.heroSubhead ?? service.whatItIs;
  const eyebrow = service.heroEyebrow ?? service.focusKeyword ?? service.category;
  const crumbs = overrides?.breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: displayTitle },
  ];

  const problems = service.problems ?? [];
  const subServices = service.subServices ?? [];
  const values = AGENCY_VALUES;
  const faqs = service.faqs ?? [];
  const processSteps = service.processSteps ?? [];

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd(crumbs),
          ...(faqs.length > 0 ? [faqPageJsonLd(faqs)] : []),
        ]}
      />

      {/* Hero — eyebrow, H1, 1:1 image at 50% width, subtext, CTA */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <div className="zn-container-inset pb-10 pt-24 lg:pb-12 lg:pt-28">
              <Breadcrumbs items={crumbs} />
              <div className="mt-4 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="min-w-0">
                  <Reveal>
                    <SectionLabel withRule={false}>{eyebrow}</SectionLabel>
                  </Reveal>
                  <TextReveal
                    as="h1"
                    text={displayTitle}
                    className="mt-4 max-w-xl zn-h1 font-sans font-normal text-zn-text"
                  />
                  <Reveal delay={0.1}>
                    <p className="mt-5 max-w-lg text-lg leading-relaxed text-zn-text-2">
                      {displaySubhead}
                    </p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <Button href={`/contact?service=${service.slug}`} withArrow>
                        Start this service
                      </Button>
                      {service.timeline ? (
                        <span className="text-sm text-zn-text-3">{service.timeline}</span>
                      ) : null}
                    </div>
                  </Reveal>
                </div>
                <Reveal delay={0.08}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-[2px] border border-zn-border bg-zn-bg-2">
                    <CmsImage
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo carousel */}
      <LogoTicker label="Trusted by teams across the US" />

      <OurApproachSection />

      {/* Project highlights + 6 reasons (shared container, CMS-driven problems) */}
      {(relatedWork.length > 0 || problems.length > 0) && (
        <section data-theme="light" className="relative bg-zn-bg">
          <BlueprintGrid />

          <div className="zn-container-guides relative">
            <div className="relative border-x border-zn-border">
              {relatedWork.length > 0 && (
                <div className={cn(problems.length > 0 && "border-b border-zn-border")}>
                  <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)]">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                      <div>
                        <Reveal>
                          <SectionLabel withRule={false}>Project highlights</SectionLabel>
                        </Reveal>
                        <TextReveal
                          as="h2"
                          text="Work we've shipped in this lane"
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
                  </div>
                </div>
              )}

              <ServiceProblemsSection
                problems={problems}
                headline={problemsHeadline}
                showTopBorder={relatedWork.length > 0}
              />
            </div>
          </div>
        </section>
      )}

      {/* Sub-services bento — dark full-bleed grid */}
      {subServices.length > 0 && (
        <ServiceSubServicesSection
          subServices={subServices}
          eyebrow={sectionCopy.subServicesEyebrow}
          headline={sectionCopy.subServicesHeadline}
          subtext={sectionCopy.subServicesSubtext}
        />
      )}

      {/* Values — dark unified grid matching sub-services */}
      {values.length > 0 && (
        <ServiceValuesSection values={values} />
      )}

      {/* Process — sticky intro + unified step grid (shared borders, no floating cards) */}
      {processSteps.length > 0 && (
        <section data-theme="light" className="relative bg-zn-bg">
          <BlueprintGrid />

          <div className="zn-container-guides relative">
            <div className="relative border-x border-b border-zn-border">
              <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
                <aside className="zn-container-inset border-b border-zn-border py-[clamp(3rem,6vw,5rem)] lg:sticky lg:top-28 lg:self-start lg:border-b-0 lg:py-[clamp(4rem,7vw,6rem)]">
                  <Reveal>
                    <SectionLabel withRule={false}>ZedNova</SectionLabel>
                  </Reveal>
                  <TextReveal
                    as="h2"
                    text={sectionCopy.processHeadline}
                    className="mt-6 max-w-md zn-h2 font-sans font-normal"
                  />
                  <Reveal delay={0.1}>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-zn-text-2">
                      {sectionCopy.processSubtext}
                    </p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="mt-8">
                      <Button href={`/contact?service=${service.slug}`} withArrow>
                        Start this service
                      </Button>
                    </div>
                  </Reveal>
                </aside>

                <div className="relative min-w-0">
                  <Stagger className="divide-y divide-zn-border" stagger={0.05}>
                    {processSteps.map((step: ProcessStep) => (
                      <article
                        key={`${step.step}-${step.title}`}
                        className="border-l border-zn-border bg-zn-bg px-8 py-12 md:px-10 md:py-14 lg:px-12 lg:py-16"
                      >
                        {step.icon ? (
                          <div className="mb-6 flex size-11 items-center justify-center rounded-[4px] border border-zn-border bg-zn-bg-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={step.icon}
                              alt=""
                              className="size-5 object-contain"
                              loading="lazy"
                            />
                          </div>
                        ) : null}

                        <p className="font-sans text-xl font-normal text-zn-text md:text-2xl">
                          {step.title}
                        </p>

                        {step.description ? (
                          <p className="mt-6 max-w-2xl leading-relaxed text-zn-text-2 md:mt-8 md:text-[1.05rem] md:leading-relaxed">
                            {step.description}
                          </p>
                        ) : null}

                        {step.deliverables && step.deliverables.length > 0 ? (
                          <ul className="mt-8 grid gap-3 border-t border-zn-border pt-8 sm:grid-cols-2">
                            {step.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-zn-text md:text-[0.9375rem]"
                              >
                                <Check
                                  className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </article>
                    ))}
                  </Stagger>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials — same carousel as homepage */}
      {platformTestimonials.length > 0 && (
        <section
          data-theme="dark"
          data-bg="dark"
          className="relative overflow-hidden bg-zn-dark pb-[clamp(4rem,8vw,8rem)] pt-28 text-zn-inv"
        >
          <BlueprintGuides theme="dark" reveal="immediate" className="z-10" />
          <div className="zn-container relative">
            <div className="mx-auto max-w-2xl pb-28 text-center">
              <Reveal>
                <div className="flex justify-center">
                  <SectionLabel withRule={false} className="text-zn-inv-2">
                    What the people have to say
                  </SectionLabel>
                </div>
              </Reveal>
              <h2 className="zn-h2 mt-6 font-sans font-normal text-zn-inv">
                Real reviews from real clients
              </h2>
              <Reveal delay={0.08}>
                <p className="zn-prose mx-auto mt-5 max-w-md text-zn-inv-2">
                  All reviews are sourced from Contra, Fiverr, Upwork, and LinkedIn. You can
                  verify every one of them on those platforms.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="zn-container-guides relative">
            <TestimonialCarousel testimonials={platformTestimonials} />
          </div>
        </section>
      )}

      {/* Resources — 3 most recent blog posts (same as homepage) */}
      {recentPosts.length > 0 && (
        <section data-theme="light" className="relative bg-zn-bg">
          <div className="zn-container-guides relative">
            <div className="relative border-x border-b border-zn-border">
              <InsightsHomePostsSection
                posts={recentPosts}
                label="Insights"
                heading="Recent blog posts"
                headingId="service-resources-heading"
                description={RECENT_INSIGHTS_DESCRIPTION}
                insetClassName="py-[clamp(3rem,6vw,5rem)] pb-6 md:pb-8"
                action={
                  <Button href="/insights" variant="link" withArrow>
                    All insights
                  </Button>
                }
              />
            </div>
          </div>
        </section>
      )}

      <ServicePageCTA
        heading="Ready to put this system to work?"
        sub={`Tell us about your business. We will scope ${service.title.toLowerCase()} on the discovery call.`}
        ctaLabel="Start this service"
        ctaHref={`/contact?service=${service.slug}`}
      />

      {faqs.length > 0 && (
        <FaqSection
          faqs={faqs}
          showBlueprintCrosses={false}
          label={faqSectionCopy.eyebrow}
          heading={faqSectionCopy.headline}
          description={faqSectionCopy.subtext}
        />
      )}
    </>
  );
}
