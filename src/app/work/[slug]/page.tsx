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
  getPostsBySlugs,
} from "@/lib/queries";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Tag } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { MediaImage } from "@/ui/MediaImage";
import { StatsRow } from "@/features/home/StatsRow";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { EntitySummary } from "@/ui/EntitySummary";
import { FaqSection } from "@/components/sections/FaqSection";
import { InternalLinkGrid } from "@/components/sections/InternalLinkGrid";
import { CaseStudyCards } from "@/features/work/CaseStudyCards";

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

  const title = caseStudy.seo?.seoTitle ?? caseStudy.title;
  const description =
    caseStudy.seo?.seoDescription ??
    `${caseStudy.client}: ${caseStudy.resultHeadline}.`;
  const canonical = caseStudy.seo?.seoCanonical ?? `/work/${slug}`;

  return {
    title,
    description,
    keywords: caseStudy.seo?.keywords,
    alternates: { canonical },
    robots: caseStudy.seo?.seoNoIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: caseStudy.seo?.ogImage
        ? [caseStudy.seo.ogImage]
        : [{ url: caseStudy.image, alt: caseStudy.title }],
    },
    twitter: {
      card: (caseStudy.seo?.twitterCard ?? "summary_large_image") as
        | "summary"
        | "summary_large_image"
        | "player"
        | "app",
      title: caseStudy.seo?.twitterTitle ?? title,
      description: caseStudy.seo?.twitterDescription ?? description,
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

  const [industryName, servicesUsed, testimonial, relatedStudies, relatedInsights] =
    await Promise.all([
    getIndustryTitle(caseStudy.industry),
    getServicesBySlugs(caseStudy.servicesUsed),
    caseStudy.testimonialId
      ? getTestimonialById(caseStudy.testimonialId)
      : Promise.resolve(null),
    caseStudy.relatedCaseStudies?.length
      ? getAllCaseStudies().then((all) =>
          all.filter((c) => caseStudy.relatedCaseStudies!.includes(c.slug)),
        )
      : Promise.resolve([]),
    caseStudy.relatedInsights?.length
      ? getPostsBySlugs(caseStudy.relatedInsights)
      : Promise.resolve([]),
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
          alt={caseStudy.imageAlt ?? caseStudy.title}
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
                  {servicesUsed.length > 0
                    ? servicesUsed.map((s, i) => (
                        <span key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="underline-offset-4 hover:underline"
                          >
                            {s.title}
                          </Link>
                          {i < servicesUsed.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "—"}
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

      {caseStudy.timelinePhases && caseStudy.timelinePhases.length > 0 && (
        <section data-theme="light" className="zn-section bg-zn-bg-2/40">
          <div className="zn-container">
            <Reveal>
              <SectionLabel withRule={false}>Timeline</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text="How the project unfolded"
              className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
            />
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {caseStudy.timelinePhases.map((phase, index) => (
                <li
                  key={phase.label}
                  className="rounded-[2px] border border-zn-border bg-zn-bg p-6"
                >
                  <span className="font-mono text-sm text-zn-text-3">
                    Phase {index + 1}
                  </span>
                  <p className="mt-3 font-sans text-lg text-zn-text">{phase.label}</p>
                  <p className="mt-1 text-sm font-medium text-zn-text-2">{phase.duration}</p>
                  {phase.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-zn-text-2">
                      {phase.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {caseStudy.workflow && caseStudy.workflow.length > 0 && (
        <section data-theme="light" className="zn-section">
          <div className="zn-container">
            <Reveal>
              <SectionLabel withRule={false}>Workflow</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text="How we delivered it"
              className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
            />
            <Stagger className="mt-12 space-y-6" stagger={0.05}>
              {caseStudy.workflow.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-4 border-t border-zn-border pt-6 md:grid-cols-[4rem_1fr]"
                >
                  <span className="font-mono text-sm text-zn-text-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-sans text-lg text-zn-text">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-zn-text-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      )}

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

      {caseStudy.screenshots && caseStudy.screenshots.length > 0 && (
        <section data-theme="light" className="zn-section bg-zn-bg-2/40">
          <div className="zn-container">
            <Reveal>
              <SectionLabel withRule={false}>Screenshots</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text="What we shipped"
              className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
            />
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {caseStudy.screenshots.map((shot) => (
                <figure key={shot.src} className="overflow-hidden rounded-[2px] border border-zn-border bg-zn-bg">
                  <MediaImage
                    src={shot.src}
                    alt={shot.alt}
                    accent={caseStudy.accent}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-[16/10] w-full"
                  />
                  {shot.caption ? (
                    <figcaption className="px-5 py-4 text-sm text-zn-text-2">
                      {shot.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <p className="zn-label mb-4 text-zn-inv-2">Tools used</p>
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

      {caseStudy.faqs && caseStudy.faqs.length > 0 && (
        <FaqSection faqs={caseStudy.faqs} title="FAQ" />
      )}

      {relatedStudies.length > 0 && (
        <section data-theme="light" className="zn-section">
          <div className="zn-container">
            <CaseStudyCards studies={relatedStudies} title="More case studies" />
          </div>
        </section>
      )}

      {relatedInsights.length > 0 && (
        <section data-theme="light" className="zn-section border-t border-zn-border">
          <div className="zn-container">
            <InternalLinkGrid
              title="Related insights"
              items={relatedInsights.map((post) => ({
                label: post.title,
                href: `/insights/${post.slug}`,
              }))}
            />
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

      <EntitySummary
        fields={[
          { label: "Client", value: caseStudy.client },
          { label: "Industry", value: industryName },
          { label: "Timeline", value: caseStudy.timeline },
          {
            label: "Result",
            value: caseStudy.resultHeadline,
          },
          {
            label: "Services",
            value:
              servicesUsed.length > 0
                ? servicesUsed.map((s) => s.title).join(", ")
                : "—",
          },
          {
            label: "Stack",
            value: caseStudy.techStack.join(", "),
          },
        ]}
        links={[
          { label: "All case studies", href: "/work" },
          ...(servicesUsed.length > 0
            ? servicesUsed.slice(0, 3).map((s) => ({
                label: `Service: ${s.title}`,
                href: `/services/${s.slug}`,
              }))
            : []),
          { label: "See services", href: "/services" },
          { label: "See industries", href: "/industries" },
        ]}
        intro={`${caseStudy.client} — ${caseStudy.resultHeadline}.`}
      />

      <DarkCTA
        heading="Want a system like this?"
        sub="Tell us what you need and we will scope it out on the first call. Whether it is a new site, a Shopify store, a booking flow, or a migration, we have done it before."
        ctaLabel="Start a similar project"
      />
    </>
  );
}
