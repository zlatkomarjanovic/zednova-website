import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { comparisons } from "@/lib/content/comparisons";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { EntitySummary } from "@/ui/EntitySummary";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) return {};

  return {
    title: comparison.title,
    description: comparison.description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      type: "website",
      url: `/compare/${slug}`,
      title: comparison.h1,
      description: comparison.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: comparison.h1 },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: `/compare/${slug}`,
            name: comparison.h1,
            description: comparison.description,
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="relative border-b border-zn-border">
              <div className="zn-container-inset pb-16 pt-32 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} className="mb-8" />
                <Reveal>
                  <SectionLabel withRule={false}>Comparison</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={comparison.h1}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {comparison.intro}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplateSection>
        <div className="grid gap-6 md:grid-cols-2">
          {[comparison.left, comparison.right].map((side) => (
            <div
              key={side.name}
              className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7"
            >
              <h2 className="font-sans text-xl font-normal text-zn-text">
                {side.name}
              </h2>
              <p className="mt-1 text-sm text-zn-text-3">{side.tagline}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="zn-label text-zn-text-3">Strengths</p>
                  <ul className="mt-3 grid gap-2">
                    {side.strengths.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-zn-text"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                          aria-hidden="true"
                        />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="zn-label text-zn-text-3">Weaknesses</p>
                  <ul className="mt-3 grid gap-2">
                    {side.weaknesses.map((w) => (
                      <li
                        key={w}
                        className="flex items-start gap-2 text-sm text-zn-text-2"
                      >
                        <X
                          className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                          aria-hidden="true"
                        />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TemplateSection>

      <TemplateSection className="bg-zn-bg-2/40" borderBottom={false}>
        <Reveal>
          <SectionLabel withRule={false}>Verdict</SectionLabel>
        </Reveal>
        <TextReveal
          as="h2"
          text="Which should you pick?"
          className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zn-text-2">
          {comparison.verdict}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2px] border border-zn-border bg-zn-bg p-6">
            <p className="zn-label text-zn-text-3">
              When {comparison.left.name} wins
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zn-text-2">
              {comparison.whenLeft}
            </p>
          </div>
          <div className="rounded-[2px] border border-zn-border bg-zn-bg p-6">
            <p className="zn-label text-zn-text-3">
              When {comparison.right.name} wins
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zn-text-2">
              {comparison.whenRight}
            </p>
          </div>
        </div>
      </TemplateSection>

      <EntitySummary
        fields={[
          { label: "Company", value: "ZedNova Studios" },
          { label: "Comparison", value: comparison.h1 },
          {
            label: "Left option",
            value: comparison.left.name,
          },
          {
            label: "Right option",
            value: comparison.right.name,
          },
          {
            label: "More info",
            value: `${SITE_ORIGIN}/compare/${comparison.slug}`,
          },
        ]}
        links={comparison.related}
        intro={comparison.description}
      />

      <DarkCTA
        heading="Still not sure which stack fits?"
        sub="Tell us what you are building and what you already have. We will give you an honest recommendation — even if it is not us."
        ctaLabel="Ask us"
      />

      <TemplateSection borderBottom={false}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/compare"
            className="text-sm text-zn-text underline-offset-4 hover:underline"
          >
            ← All comparisons
          </Link>
          <Button href="/contact" variant="link" withArrow>
            Start a project
          </Button>
        </div>
      </TemplateSection>
    </>
  );
}
