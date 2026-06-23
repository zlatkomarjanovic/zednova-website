import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getIndustryTitle,
  getServicesBySlugs,
  getTestimonialById,
} from "@/lib/queries";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Tag } from "@/components/shared/Tag";
import { Button } from "@/components/shared/Button";
import { MediaImage } from "@/components/shared/MediaImage";
import { StatsRow } from "@/components/sections/StatsRow";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { JsonLd } from "@/components/shared/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

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
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "website",
      url: `/work/${slug}`,
      title: caseStudy.title,
      description: `${caseStudy.client}: ${caseStudy.resultHeadline}.`,
      images: [{ url: caseStudy.image, alt: caseStudy.title }],
    },
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

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: caseStudy.title },
  ];

  return (
    <>
      <JsonLd data={[caseStudyJsonLd(caseStudy), breadcrumbJsonLd(crumbs)]} />

      {/* Hero — dark with treated image */}
      <section data-theme="dark" className="relative overflow-hidden bg-zn-dark text-zn-inv">
        <MediaImage
          src={caseStudy.image}
          alt={caseStudy.title}
          accent={caseStudy.accent}
          tint={0.6}
          priority
          sizes="100vw"
          className="absolute inset-0"
        />
        <div className="zn-container relative z-10 pb-16 pt-36 lg:pb-24 lg:pt-44">
          <Reveal>
            <Breadcrumbs
              items={crumbs}
              className="text-zn-inv-2 [&_a]:text-zn-inv-2 [&_a:hover]:text-zn-inv"
            />
          </Reveal>
          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Tag variant="outline-inverted">{industryName}</Tag>
              <span className="text-sm text-zn-inv-2">{caseStudy.client}</span>
            </div>
          </Reveal>
          <TextReveal
            as="h1"
            text={caseStudy.title}
            className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-inv"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-inv-2">
              {caseStudy.resultHeadline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
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

      {/* Challenge — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset py-[clamp(3.5rem,7vw,6rem)]">
              <Reveal>
                <SectionLabel withRule={false}>The challenge</SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-8 max-w-3xl font-sans font-normal text-2xl leading-snug text-zn-text lg:text-3xl">
                  {caseStudy.challenge}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container grid gap-10 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <Reveal>
              <SectionLabel withRule={false}>The solution</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-md zn-h2 font-sans font-normal">
                What we built
              </h2>
            </Reveal>
          </div>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-zn-text-2">
            {caseStudy.solution.map((para, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Results (dark) */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <Reveal>
            <SectionLabel withRule={false} className="text-zn-inv-2">
              The results
            </SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Outcomes that moved the business"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-inv"
          />
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
        <section data-theme="light" className="zn-section">
          <div className="zn-container">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="zn-accent-italic text-2xl leading-snug text-zn-text lg:text-3xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-zn-text-2">
                <span className="font-sans font-medium text-zn-text">
                  {testimonial.authorName}
                </span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                {testimonial.company}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* Next project */}
      <section data-theme="light" className="border-t border-zn-border">
        <div className="zn-container">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-8 py-12"
          >
            <span className="zn-label text-zn-text-3">Next project</span>
            <span className="flex items-center gap-3 text-right font-sans font-normal text-xl text-zn-text transition-opacity group-hover:opacity-70 lg:text-2xl">
              {next.title}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <DarkCTA
        heading="Want a system like this?"
        sub="Tell us what you need and we will scope it out on the first call. Whether it is a new site, a Shopify store, a booking flow, or a migration, we have done it before."
        ctaLabel="Start a similar project"
      />
    </>
  );
}
