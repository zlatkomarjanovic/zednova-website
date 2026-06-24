import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  getAllIndustries,
  getAllIndustrySlugs,
  getCaseStudiesByIndustry,
  getIndustryParentBySlug,
  getIndustrySegmentBySlug,
  getIndustryTitle,
} from "@/lib/queries";
import { breadcrumbJsonLd, industryJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { IndustryCard } from "@/features/industries/IndustryCard";
import { CaseStudyCard } from "@/features/work/CaseStudyCard";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import type { Industry } from "@/lib/types";
import { FaqSection } from "@/components/sections/FaqSection";
import { getInsightsByIndustry } from "@/lib/queries";

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

  const title = segment.seo?.seoTitle ?? segment.title;
  const description = segment.seo?.seoDescription ?? segment.shortDescription;
  const canonical = segment.seo?.seoCanonical ?? `/industries/${slug}`;

  return {
    title,
    description,
    keywords: segment.seo?.keywords,
    alternates: { canonical },
    robots: segment.seo?.seoNoIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: segment.seo?.ogImage ? [segment.seo.ogImage] : undefined,
    },
    twitter: {
      card: (segment.seo?.twitterCard ?? "summary_large_image") as
        | "summary"
        | "summary_large_image"
        | "player"
        | "app",
      title: segment.seo?.twitterTitle ?? title,
      description: segment.seo?.twitterDescription ?? description,
    },
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
  const relatedWithLabels = await Promise.all(
    related.map(async (caseStudy) => ({
      caseStudy,
      industryLabel: await getIndustryTitle(caseStudy.industry),
    })),
  );
  const relatedInsights = await getInsightsByIndustry(slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    ...(parent && parent.slug !== slug
      ? [{ label: parent.title, href: `/industries/${parent.slug}` }]
      : []),
    { label: segment.title },
  ];

  return (
    <>
      <JsonLd data={[industryJsonLd(segment), breadcrumbJsonLd(crumbs)]} />

      {/* Hero — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} />
                <Reveal>
                  <div className="mt-6">
                    <SectionLabel withRule={false}>
                      {isSub && parent ? parent.title : "Industry"}
                    </SectionLabel>
                  </div>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={segment.heroHeadline}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
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
            </div>
          </div>
        </div>
      </section>

      {/* Common problems (dark) */}
      <section data-theme="dark" className="zn-section bg-zn-dark text-zn-inv">
        <div className="zn-container">
          <Reveal>
            <SectionLabel withRule={false} className="text-zn-inv-2">
              Common problems
            </SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text={`Typical issues in ${segment.title.toLowerCase()}`}
            className="zn-h2 mt-6 max-w-2xl font-sans font-normal"
          />
          <Stagger
            className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-zn-border-dk bg-zn-border-dk sm:grid-cols-2"
            stagger={0.05}
          >
            {segment.painPoints.map((pain, i) => (
              <div key={pain.title} className="bg-zn-dark p-8">
                <span className="font-mono text-sm text-zn-inv-2">0{i + 1}</span>
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

      {/* Popular services */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container">
          <Reveal>
            <SectionLabel withRule={false}>
              Most popular services for this industry
            </SectionLabel>
          </Reveal>
          <Stagger
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.04}
          >
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

      {/* Sub-industries */}
      {!isSub && subIndustries.length > 0 && (
        <section data-theme="light" className="zn-section bg-zn-bg-2/40">
          <div className="zn-container">
            <Reveal>
              <SectionLabel withRule={false}>Specialties</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text={`${segment.title} we work with`}
              className="mt-6 zn-h2 font-sans font-normal"
            />
            <Stagger
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.04}
            >
              {subIndustries.map((industry) => (
                <IndustryCard key={industry.slug} industry={industry} />
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Example + use case */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionLabel withRule={false}>Example project</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="zn-prose mt-6 text-zn-text-2">
                {segment.exampleProject}
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <SectionLabel withRule={false}>Common use case</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="zn-prose mt-6 text-zn-text-2">
                {segment.commonUseCase}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Selected work */}
      {related.length > 0 && (
        <section data-theme="light" className="zn-section">
          <div className="zn-container">
            <Reveal>
              <SectionLabel withRule={false}>Selected work</SectionLabel>
            </Reveal>
            <TextReveal
              as="h2"
              text="Related projects"
              className="mt-6 zn-h2 font-sans font-normal"
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {relatedWithLabels.map(({ caseStudy, industryLabel }) => (
                <CaseStudyCard
                  key={caseStudy.slug}
                  caseStudy={caseStudy}
                  industryLabel={industryLabel}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {segment.faqs && segment.faqs.length > 0 && (
        <FaqSection faqs={segment.faqs} title={`${segment.title} FAQ`} />
      )}

      {relatedInsights.length > 0 && (
        <section data-theme="light" className="zn-section bg-zn-bg-2/40">
          <div className="zn-container">
            <Reveal>
              <SectionLabel withRule={false}>Related insights</SectionLabel>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedInsights.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group border border-zn-border bg-zn-bg p-6 transition hover:border-zn-text-3"
                >
                  <p className="text-xs font-mono uppercase tracking-wider text-zn-text-3">
                    {post.category}
                  </p>
                  <p className="mt-2 font-sans text-lg text-zn-text">{post.title}</p>
                  <p className="mt-2 text-sm text-zn-text-2 line-clamp-2">{post.excerpt}</p>
                </Link>
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
