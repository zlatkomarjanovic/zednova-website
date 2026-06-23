import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  getAllServices,
  getCaseStudiesByService,
  getServiceBySlug,
} from "@/lib/queries";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Tag } from "@/components/shared/Tag";
import { Button } from "@/components/shared/Button";
import { Icon } from "@/components/shared/Icon";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DarkCTA } from "@/components/sections/DarkCTA";

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

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zn-border">
        <div className="zn-container grid gap-12 pb-16 pt-36 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:pb-20 lg:pt-44">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
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
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-[2px] border border-zn-border bg-zn-bg-2/50 p-7">
              <p className="zn-label text-zn-text-3">Investment</p>
              <p className="mt-3 font-mono text-2xl text-zn-text">
                {service.pricingSignal}
              </p>
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
        </div>
      </section>

      {/* What's included */}
      <section className="zn-section">
        <div className="zn-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>What&apos;s included</SectionLabel>
            <h2 className="mt-6 zn-h2 font-sans font-normal leading-tight">
              Everything you get
            </h2>
          </div>
          <Stagger className="grid gap-x-10 gap-y-4 sm:grid-cols-2" stagger={0.04}>
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-b border-zn-border pb-4 text-zn-text"
              >
                <span className="mt-0.5 font-mono text-zn-text-3" aria-hidden="true">
                  —
                </span>
                <span>{item}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Who it's for */}
      <section className="zn-section bg-zn-bg-2/40">
        <div className="zn-container">
          <SectionLabel>Who it&apos;s for</SectionLabel>
          <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal leading-tight">
            Built for these teams
          </h2>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {service.idealClients.map((profile, i) => (
              <div
                key={profile}
                className="rounded-[2px] border border-zn-border bg-zn-bg p-7"
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
      <section className="zn-section">
        <div className="zn-container">
          <SectionLabel>Our process</SectionLabel>
          <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal leading-tight">
            How we deliver {service.title.toLowerCase()}
          </h2>
          <div className="mt-16">
            <ProcessSteps steps={service.processSteps} />
          </div>
        </div>
      </section>

      {/* Results (dark) */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <SectionLabel className="text-zn-inv-2">
            Results you can expect
          </SectionLabel>
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-zn-border-dk bg-zn-border-dk md:grid-cols-3">
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
        <section className="zn-section">
          <div className="zn-container">
            <div className="flex items-end justify-between gap-6">
              <div>
                <SectionLabel>Related work</SectionLabel>
                <h2 className="mt-6 zn-h2 font-sans font-normal leading-tight">
                  Proof from real deployments
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden items-center gap-1.5 text-sm font-medium text-zn-text sm:inline-flex"
              >
                <span className="zn-underline">All work</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
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
