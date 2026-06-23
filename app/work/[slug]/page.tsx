import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getIndustryTitle,
  getServicesBySlugs,
  getTestimonialById,
} from "@/lib/queries";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Tag } from "@/components/shared/Tag";
import { Button } from "@/components/shared/Button";
import { MediaImage } from "@/components/shared/MediaImage";
import { StatsRow } from "@/components/sections/StatsRow";

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: `${caseStudy.client}: ${caseStudy.resultHeadline}.`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const all = await getAllCaseStudies();
  const index = all.findIndex((c) => c.slug === slug);
  const next = all[(index + 1) % all.length];

  const [industryName, servicesUsed, testimonial] = await Promise.all([
    getIndustryTitle(caseStudy.industry),
    getServicesBySlugs(caseStudy.servicesUsed),
    caseStudy.testimonialId
      ? getTestimonialById(caseStudy.testimonialId)
      : Promise.resolve(null),
  ]);

  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="relative overflow-hidden text-zn-inv">
        <MediaImage
          src={caseStudy.image}
          alt={caseStudy.title}
          accent={caseStudy.accent}
          tint={0.55}
          priority
          sizes="100vw"
          className="absolute inset-0"
        />
        <div className="zn-container relative z-10 pb-16 pt-36 lg:pb-24 lg:pt-44">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Tag variant="outline-inverted">{industryName}</Tag>
              <span className="text-sm text-zn-inv-2">{caseStudy.client}</span>
            </div>
          </Reveal>
          <TextReveal
            as="h1"
            text={caseStudy.title}
            className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
          />
          <Reveal delay={0.1}>
            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-8 border-t border-zn-border-dk pt-8 sm:grid-cols-3">
              <div>
                <dt className="zn-label text-zn-inv-2">Timeline</dt>
                <dd className="mt-2 text-zn-inv">{caseStudy.timeline}</dd>
              </div>
              <div>
                <dt className="zn-label text-zn-inv-2">Result</dt>
                <dd className="mt-2 text-zn-inv">{caseStudy.resultHeadline}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="zn-label text-zn-inv-2">Services</dt>
                <dd className="mt-2 text-zn-inv">
                  {servicesUsed.map((s) => s.title).join(", ")}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Challenge */}
      <section className="zn-section">
        <div className="zn-container grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <SectionLabel>The challenge</SectionLabel>
          <p className="max-w-3xl font-sans font-normal text-2xl leading-snug text-zn-text lg:text-3xl">
            {caseStudy.challenge}
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="zn-section bg-zn-bg-2/40">
        <div className="zn-container grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <SectionLabel>The solution</SectionLabel>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-zn-text-2">
            {caseStudy.solution.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <SectionLabel className="text-zn-inv-2">The results</SectionLabel>
          <div className="mt-12">
            <StatsRow
              stats={caseStudy.results}
              theme="dark"
              className="md:grid-cols-3"
            />
          </div>
          <div className="mt-16 border-t border-zn-border-dk pt-8">
            <p className="zn-label mb-4 text-zn-inv-2">Tech used</p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techStack.map((tech) => (
                <Tag key={tech} variant="outline-inverted">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="zn-section">
          <div className="zn-container">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="zn-accent-italic text-2xl leading-snug text-zn-text lg:text-3xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-zn-text-2">
                <span className="font-sans font-medium text-zn-text">
                  {testimonial.authorName}
                </span>
                <span className="mx-1.5" aria-hidden="true">
                  ·
                </span>
                {testimonial.company}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Next + CTA */}
      <section data-theme="dark" className="border-t border-zn-border-dk bg-zn-dark text-zn-inv">
        <div className="zn-container grid gap-px overflow-hidden md:grid-cols-2">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col justify-between gap-8 py-14 pr-8"
          >
            <span className="zn-label text-zn-inv-2">Next project</span>
            <span className="flex items-center gap-2 font-sans font-normal text-2xl text-zn-inv lg:text-3xl">
              {next.title}
              <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <div className="flex flex-col justify-between gap-8 border-zn-border-dk py-14 md:border-l md:pl-12">
            <span className="zn-label text-zn-inv-2">Start something</span>
            <div>
              <p className="font-sans font-normal text-2xl text-zn-inv lg:text-3xl">
                Want a system like this?
              </p>
              <div className="mt-6">
                <Button href="/contact" variant="inverted" withArrow>
                  Start a similar project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
