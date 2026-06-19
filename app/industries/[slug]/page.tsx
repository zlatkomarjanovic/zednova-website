import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  getAllIndustries,
  getCaseStudiesByIndustry,
  getIndustryBySlug,
  getServicesBySlugs,
} from "@/lib/queries";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Button } from "@/components/shared/Button";
import { Icon } from "@/components/shared/Icon";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { DarkCTA } from "@/components/sections/DarkCTA";

export async function generateStaticParams() {
  const industries = await getAllIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.title} — AI Systems`,
    description: industry.shortDescription,
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  const [coreServices, related] = await Promise.all([
    getServicesBySlugs(industry.coreServices),
    getCaseStudiesByIndustry(slug),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zn-border">
        <div className="zn-container pb-16 pt-36 lg:pb-20 lg:pt-44">
          <Reveal>
            <SectionLabel>{industry.title}</SectionLabel>
          </Reveal>
          <TextReveal
            as="h1"
            text={industry.heroHeadline}
            className="mt-6 max-w-4xl font-sans font-normal text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
              {industry.shortDescription}
            </p>
          </Reveal>
          {industry.heroStat && (
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-2xl border-l-2 border-zn-text pl-5 zn-accent-italic text-xl leading-snug text-zn-text">
                {industry.heroStat}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Problems (dark) */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <SectionLabel className="text-zn-inv-2">
            The problems we&apos;ve seen
          </SectionLabel>
          <h2 className="zn-h2 mt-6 max-w-2xl font-sans font-normal leading-tight text-zn-inv">
            Where {industry.title.toLowerCase()} leak revenue
          </h2>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-zn-border-dk bg-zn-border-dk sm:grid-cols-2">
            {industry.painPoints.map((pain, i) => (
              <div key={pain.title} className="bg-zn-dark p-8">
                <span className="font-mono text-sm text-zn-inv-2">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-sans text-lg font-normal text-zn-inv">
                  {pain.title}
                </h3>
                <p className="mt-2 leading-relaxed text-zn-inv-2">
                  {pain.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Systems we build */}
      <section className="zn-section">
        <div className="zn-container">
          <SectionLabel>The systems we build</SectionLabel>
          <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal leading-tight">
            What we build for {industry.title.toLowerCase()}
          </h2>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {coreServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-start gap-5 rounded-[2px] border border-zn-border p-7 transition-all hover:-translate-y-0.5 hover:border-zn-text hover:bg-zn-bg-2"
              >
                <Icon name={service.icon} className="mt-1 size-6 text-zn-text" />
                <div>
                  <h3 className="flex items-center gap-1.5 font-sans text-lg font-normal text-zn-text">
                    {service.title}
                    <ArrowUpRight className="size-4 text-zn-text-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                    {service.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* In practice */}
      <section className="zn-section bg-zn-bg-2/40">
        <div className="zn-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <SectionLabel>In practice</SectionLabel>
            <h2 className="mt-6 zn-h2 font-sans font-normal leading-tight">
              What this looks like
            </h2>
          </div>
          <figure>
            <blockquote className="zn-accent-italic text-2xl leading-relaxed text-zn-text lg:text-3xl">
              {industry.miniCaseNarrative}
            </blockquote>
            <figcaption className="mt-6 text-sm text-zn-text-2">
              {industry.socialProof}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="zn-section">
          <div className="zn-container">
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="mt-6 zn-h2 font-sans font-normal leading-tight">
              Systems we shipped in {industry.title.toLowerCase()}
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {related.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </div>
        </section>
      )}

      <DarkCTA
        heading={`Let's talk about ${industry.title.toLowerCase()}`}
        sub="Tell us where the revenue leaks. We will show you the system that plugs it."
        ctaLabel={`Talk to us about ${industry.title.toLowerCase()}`}
        ctaHref={`/contact?industry=${industry.slug}`}
      />
    </>
  );
}
