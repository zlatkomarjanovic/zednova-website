import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  getAllServices,
  getCaseStudiesByService,
  getServiceBySlug,
} from "@/lib/queries";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Tag } from "@/components/shared/Tag";
import { Button } from "@/components/shared/Button";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { JsonLd } from "@/components/shared/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

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
  return {
    title: service.title,
    description: service.whatItIs,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: "website",
      url: `/services/${slug}`,
      title: service.title,
      description: service.whatItIs,
      images: [{ url: service.image, alt: service.title }],
    },
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

  const related = await getCaseStudiesByService(slug);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  return (
    <>
      <JsonLd
        data={[serviceJsonLd(service), breadcrumbJsonLd(crumbs)]}
      />

      {/* Hero — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
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
                  text={service.title}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {service.whatItIs}
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

      {/* Investment + deliverables */}
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
                  <p className="mt-2 text-sm text-zn-text-3">{service.timeline}</p>
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
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 border-b border-zn-border pb-4 text-zn-text"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container">
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
                <span className="font-mono text-sm text-zn-text-3">
                  0{i + 1}
                </span>
                <p className="mt-4 leading-relaxed text-zn-text">{profile}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container">
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
        </div>
      </section>

      {/* Results (dark) */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
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
        </div>
      </section>

      {/* Related case studies */}
      {related.length > 0 && (
        <section data-theme="light" className="zn-section">
          <div className="zn-container">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Reveal>
                  <SectionLabel withRule={false}>Related work</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h2"
                  text="Proof from real deployments"
                  className="mt-6 zn-h2 font-sans font-normal"
                />
              </div>
              <Reveal delay={0.1}>
                <Link
                  href="/work"
                  className="hidden items-center gap-1.5 text-sm font-medium text-zn-text sm:inline-flex"
                >
                  <span className="zn-underline">All work</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {related.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </div>
        </section>
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
