import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  getAllIndustries,
  getAllIndustrySlugs,
  getCaseStudiesByIndustry,
  getIndustryParentBySlug,
  getIndustrySegmentBySlug,
} from "@/lib/queries";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { DarkCTA } from "@/components/sections/DarkCTA";
import type { Industry } from "@/lib/types";

export async function generateStaticParams() {
  const slugs = await getAllIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const segment = await getIndustrySegmentBySlug(slug);
  if (!segment) return {};
  return {
    title: segment.title,
    description: segment.shortDescription,
  };
}

function isSubIndustry(
  segment: Awaited<ReturnType<typeof getIndustrySegmentBySlug>>,
): segment is Industry {
  return Boolean(segment && "parentSlug" in segment);
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const segment = await getIndustrySegmentBySlug(slug);
  if (!segment) notFound();

  const isSub = isSubIndustry(segment);
  const parent = isSub
    ? await getIndustryParentBySlug(segment.parentSlug)
    : segment;
  const subIndustries = isSub
    ? []
    : (await getAllIndustries()).filter((i) => i.parentSlug === slug);

  const related = await getCaseStudiesByIndustry(slug);

  return (
    <>
      <section className="border-b border-zn-border">
        <div className="zn-container pb-16 pt-36 lg:pb-20 lg:pt-44">
          <Reveal>
            {isSub && parent ? (
              <Link
                href={`/industries/${parent.slug}`}
                className="zn-label inline-flex items-center gap-1 text-zn-text-3 transition-opacity hover:opacity-70"
              >
                {parent.title}
              </Link>
            ) : (
              <SectionLabel>{segment.title}</SectionLabel>
            )}
          </Reveal>
          <TextReveal
            as="h1"
            text={segment.heroHeadline}
            className="mt-6 max-w-4xl font-sans font-normal text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
              {segment.shortDescription}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <dl className="mt-10 grid max-w-3xl gap-4 text-sm leading-relaxed">
              <div>
                <dt className="zn-label text-zn-text-3">Who it is for</dt>
                <dd className="mt-2 text-zn-text-2">{segment.whoItIsFor}</dd>
              </div>
              <div>
                <dt className="zn-label text-zn-text-3">What we build</dt>
                <dd className="mt-2 text-zn-text-2">{segment.whatWeBuild}</dd>
              </div>
              <div>
                <dt className="zn-label text-zn-text-3">Problem we solve</dt>
                <dd className="mt-2 text-zn-text-2">{segment.problemSolved}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <SectionLabel className="text-zn-inv-2">Common problems</SectionLabel>
          <h2 className="zn-h2 mt-6 max-w-2xl font-sans font-normal leading-tight text-zn-inv">
            Typical issues in {segment.title.toLowerCase()}
          </h2>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-zn-border-dk bg-zn-border-dk sm:grid-cols-2">
            {segment.painPoints.map((pain, i) => (
              <div key={pain.title} className="bg-zn-dark p-8">
                <span className="font-mono text-sm text-zn-inv-2">0{i + 1}</span>
                <h3 className="mt-4 font-sans text-lg font-normal text-zn-inv">
                  {pain.title}
                </h3>
                <p className="mt-2 leading-relaxed text-zn-inv-2">{pain.description}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="zn-section">
        <div className="zn-container">
          <SectionLabel>Most popular services for this industry</SectionLabel>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {segment.popularServices.map((service) => (
              <Link
                key={`${service.label}-${service.href}`}
                href={service.href}
                className="rounded-[2px] border border-zn-border bg-zn-bg-2 px-5 py-4 text-sm text-zn-text transition-colors hover:border-zn-text hover:bg-zn-bg"
              >
                {service.label}
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {!isSub && subIndustries.length > 0 && (
        <section className="zn-section bg-zn-bg-2/40">
          <div className="zn-container">
            <SectionLabel>Specialties</SectionLabel>
            <h2 className="mt-6 zn-h2 font-sans font-normal leading-tight">
              {segment.title} we work with
            </h2>
            <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
              {subIndustries.map((industry) => (
                <IndustryCard key={industry.slug} industry={industry} />
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="zn-section bg-zn-bg-2/40">
        <div className="zn-container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>Example project</SectionLabel>
            <p className="zn-prose mt-6 text-zn-text-2">{segment.exampleProject}</p>
          </div>
          <div>
            <SectionLabel>Common use case</SectionLabel>
            <p className="zn-prose mt-6 text-zn-text-2">{segment.commonUseCase}</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="zn-section">
          <div className="zn-container">
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="mt-6 zn-h2 font-sans font-normal leading-tight">
              Related projects
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
        heading={`Need help with ${segment.title.toLowerCase()}?`}
        sub="Tell us what you need built — website, Shopify store, booking flow, phone assistant, dashboard, or migration — and we will scope it on the first call."
        ctaLabel={`Talk to us about ${segment.title.toLowerCase()}`}
        ctaHref={`/contact?industry=${segment.slug}`}
      />
    </>
  );
}
