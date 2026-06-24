import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  getAllIndustrySlugs,
  getIndustryPageData,
  getIndustryRelatedPortfolioProjects,
  getIndustrySegmentBySlug,
} from "@/lib/queries";
import { breadcrumbJsonLd, industryJsonLd } from "@/lib/seo";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Button } from "@/ui/Button";
import { PortfolioWorkGrid } from "@/features/work/PortfolioWorkGrid";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { FaqSection } from "@/components/sections/FaqSection";
import { TemplateSection } from "@/ui/TemplateSection";
import {
  IndustrySpecialtiesGrid,
  ParentIndustryLink,
} from "@/features/industries/IndustryDetailSections";
import { isIndustryParentRecord } from "@/lib/industry-content";

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
  const industry = await getIndustrySegmentBySlug(slug);
  if (!industry) return {};

  const title = industry.seo?.seoTitle ?? industry.title;
  const description = industry.seo?.seoDescription ?? industry.shortDescription;
  const canonical = industry.seo?.seoCanonical ?? `/industries/${slug}`;

  return {
    title,
    description,
    keywords: industry.seo?.keywords,
    alternates: { canonical },
    robots: industry.seo?.seoNoIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      images: industry.seo?.ogImage ? [industry.seo.ogImage] : undefined,
    },
    twitter: {
      card: (industry.seo?.twitterCard ?? "summary_large_image") as
        | "summary"
        | "summary_large_image"
        | "player"
        | "app",
      title: industry.seo?.twitterTitle ?? title,
      description: industry.seo?.twitterDescription ?? description,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getIndustryPageData(slug);
  if (!page) notFound();

  const {
    industry,
    isParent,
    parent,
    subIndustries,
    siblingIndustries,
    relatedInsights,
  } = page;

  const relatedWork = await getIndustryRelatedPortfolioProjects(industry);
  const isSub = !isParent;
  const parentRecord = isIndustryParentRecord(industry) ? industry : parent;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    ...(parent && parent.slug !== slug
      ? [{ label: parent.title, href: `/industries/${parent.slug}` }]
      : []),
    { label: industry.title },
  ];

  return (
    <>
      <JsonLd data={[industryJsonLd(industry), breadcrumbJsonLd(crumbs)]} />

      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-32 lg:pb-16 lg:pt-40">
                <Breadcrumbs items={crumbs} />
                <Reveal>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <SectionLabel withRule={false}>
                      {isSub && parent ? parent.title : industry.category}
                    </SectionLabel>
                    {isSub && parent ? (
                      <ParentIndustryLink
                        href={`/industries/${parent.slug}`}
                        title={`All ${parent.title}`}
                      />
                    ) : null}
                  </div>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={industry.heroHeadline || industry.title}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.08}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {industry.shortDescription}
                  </p>
                </Reveal>
                {isParent && parentRecord?.industryOverview ? (
                  <Reveal delay={0.1}>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-zn-text-2">
                      {parentRecord.industryOverview}
                    </p>
                  </Reveal>
                ) : null}
                <Reveal delay={0.12}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href={`/contact?industry=${industry.slug}`} withArrow>
                      Tell us what you need
                    </Button>
                    <Button href="/industries" variant="link" withArrow>
                      Browse industries
                    </Button>
                  </div>
                </Reveal>
                <Reveal delay={0.14}>
                  <dl className="mt-12 grid gap-6 border-t border-zn-border pt-10 sm:grid-cols-3">
                    <div>
                      <dt className="zn-label text-zn-text-3">Who it is for</dt>
                      <dd className="mt-3 text-sm leading-relaxed text-zn-text-2">
                        {industry.whoItIsFor}
                      </dd>
                    </div>
                    <div>
                      <dt className="zn-label text-zn-text-3">What we build</dt>
                      <dd className="mt-3 text-sm leading-relaxed text-zn-text-2">
                        {industry.whatWeBuild}
                      </dd>
                    </div>
                    <div>
                      <dt className="zn-label text-zn-text-3">Problem we solve</dt>
                      <dd className="mt-3 text-sm leading-relaxed text-zn-text-2">
                        {industry.problemSolved}
                      </dd>
                    </div>
                  </dl>
                </Reveal>
              </div>
            </div>

            {isParent && subIndustries.length > 0 ? (
              <div className="relative border-b border-zn-border">
                <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-12 lg:py-14">
                  <SectionLabel withRule={false}>Specialties</SectionLabel>
                  <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal">
                    {industry.title} we work with
                  </h2>
                  <p className="zn-prose mt-4 max-w-xl text-zn-text-2">
                    Pick a specialty to see what we build, common problems, and
                    related services.
                  </p>
                </div>
                <IndustrySpecialtiesGrid industries={subIndustries} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {industry.painPoints.length > 0 ? (
        <TemplateSection theme="dark">
          <Reveal>
            <SectionLabel withRule={false} className="text-zn-inv-2">
              Common problems
            </SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text={`What ${isSub ? industry.title.toLowerCase() : "teams in this industry"} struggle with`}
            className="zn-h2 mt-6 max-w-2xl font-sans font-normal"
          />
          <Stagger
            className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-zn-border-dk bg-zn-border-dk sm:grid-cols-2"
            stagger={0.05}
          >
            {industry.painPoints.map((pain, i) => (
              <div key={pain.title} className="bg-zn-dark p-8">
                <span className="font-mono text-sm text-zn-inv-2">0{i + 1}</span>
                <h3 className="mt-4 font-sans text-lg font-normal text-zn-inv">
                  {pain.title}
                </h3>
                <p className="mt-2 leading-relaxed text-zn-inv-2">{pain.description}</p>
              </div>
            ))}
          </Stagger>
        </TemplateSection>
      ) : null}

      {industry.popularServices.length > 0 ? (
        <TemplateSection>
          <Reveal>
            <SectionLabel withRule={false}>Popular services</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text={`What we most often build for ${industry.title.toLowerCase()}`}
            className="zn-h2 mt-6 max-w-2xl font-sans font-normal"
          />
          <Stagger
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.04}
          >
            {industry.popularServices.map((service) => (
              <Link
                key={`${service.label}-${service.href}`}
                href={service.href}
                className="group rounded-[2px] border border-zn-border bg-zn-bg px-5 py-4 text-sm text-zn-text transition-colors hover:border-zn-text hover:bg-zn-bg-2"
              >
                <span className="block font-medium">{service.label}</span>
                <span className="mt-1 block text-xs text-zn-text-3 group-hover:text-zn-text-2">
                  View service
                </span>
              </Link>
            ))}
          </Stagger>
        </TemplateSection>
      ) : null}

      {(industry.exampleProject || industry.commonUseCase) && (
        <TemplateSection className="bg-zn-bg-2/40">
          <div className="grid gap-10 lg:grid-cols-2">
            {industry.exampleProject ? (
              <div className="rounded-[2px] border border-zn-border bg-zn-bg p-8">
                <SectionLabel withRule={false}>Example project</SectionLabel>
                <p className="zn-prose mt-5 text-zn-text-2">{industry.exampleProject}</p>
              </div>
            ) : null}
            {industry.commonUseCase ? (
              <div className="rounded-[2px] border border-zn-border bg-zn-bg p-8">
                <SectionLabel withRule={false}>Common use case</SectionLabel>
                <p className="zn-prose mt-5 text-zn-text-2">{industry.commonUseCase}</p>
              </div>
            ) : null}
          </div>
        </TemplateSection>
      )}

      {isSub && siblingIndustries.length > 0 && parent ? (
        <TemplateSection>
          <Reveal>
            <SectionLabel withRule={false}>More in {parent.title}</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Related specialties"
            className="mt-6 zn-h2 font-sans font-normal"
          />
          <div className="mt-10">
            <IndustrySpecialtiesGrid
              industries={siblingIndustries.slice(0, 6)}
              variant="cards"
            />
          </div>
          <div className="mt-8">
            <Button href={`/industries/${parent.slug}`} variant="link" withArrow>
              View all {parent.title} specialties
            </Button>
          </div>
        </TemplateSection>
      ) : null}

      {relatedWork.length > 0 && (
        <TemplateSection withBlueprintGrid className="bg-zn-bg">
          <Reveal>
            <SectionLabel withRule={false}>Selected work</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="Projects and case studies"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <PortfolioWorkGrid projects={relatedWork} />
        </TemplateSection>
      )}

      {industry.faqs && industry.faqs.length > 0 && (
        <FaqSection faqs={industry.faqs} title={`${industry.title} FAQ`} />
      )}

      {relatedInsights.length > 0 && (
        <TemplateSection borderBottom={false}>
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
                <p className="mt-2 line-clamp-2 text-sm text-zn-text-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </TemplateSection>
      )}

      <DarkCTA
        heading={`Need help with ${industry.title.toLowerCase()}?`}
        sub="Tell us what you need built — website, Shopify store, booking flow, phone assistant, dashboard, or migration — and we will scope it on the first call."
        ctaLabel={`Talk to us about ${industry.title.toLowerCase()}`}
        ctaHref={`/contact?industry=${industry.slug}`}
      />
    </>
  );
}
