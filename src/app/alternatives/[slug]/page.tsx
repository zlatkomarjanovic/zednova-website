import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { alternatives } from "@/lib/content/alternatives";
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
import { breadcrumbJsonLd, collectionPageJsonLd, faqPageJsonLd } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-url";

export async function generateStaticParams() {
  return alternatives.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = alternatives.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: {
      type: "website",
      url: `/alternatives/${slug}`,
      title: guide.h1,
      description: guide.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function AlternativeGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = alternatives.find((g) => g.slug === slug);
  if (!guide) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Alternatives", href: "/alternatives" },
    { label: guide.h1 },
  ];

  const faqs = [
    {
      id: `faq-alt-${slug}-why-leave`,
      question: `Why do ${guide.audience.toLowerCase()} leave ${guide.sourcePlatform}?`,
      answer: guide.intro,
    },
    {
      id: `faq-alt-${slug}-best`,
      question: `What is the best alternative to ${guide.sourcePlatform}?`,
      answer: guide.verdict,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: `/alternatives/${slug}`,
            name: guide.h1,
            description: guide.description,
          }),
          breadcrumbJsonLd(crumbs),
          faqPageJsonLd(faqs),
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
                  <SectionLabel withRule={false}>
                    Alternatives to {guide.sourcePlatform}
                  </SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text={guide.h1}
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.08}>
                  <aside className="article-direct-answer mt-6 max-w-2xl rounded-[2px] border border-zn-border bg-zn-bg-2/60 p-6">
                    <p className="zn-label text-zn-text-3">
                      What are the best alternatives to {guide.sourcePlatform} for{" "}
                      {guide.audience.toLowerCase()}?
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-zn-text">
                      {guide.quickAnswer}
                    </p>
                  </aside>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {guide.intro}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplateSection>
        <div className="grid gap-6">
          {guide.alternatives.map((alt) => (
            <div
              key={alt.name}
              className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-sans text-xl font-normal text-zn-text">{alt.name}</h2>
                  <p className="mt-1 text-sm text-zn-text-3">{alt.tagline}</p>
                </div>
                {alt.href && (
                  <Button href={alt.href} variant="outline" size="sm">
                    Learn more
                  </Button>
                )}
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="zn-label text-zn-text-3">Pros</p>
                  <ul className="mt-3 grid gap-2">
                    {alt.pros.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-zn-text"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="zn-label text-zn-text-3">Cons</p>
                  <ul className="mt-3 grid gap-2">
                    {alt.cons.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-zn-text-2"
                      >
                        <X className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden />
                        <span>{item}</span>
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
          text={`Which alternative to ${guide.sourcePlatform} should you pick?`}
          className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zn-text-2">
          {guide.verdict}
        </p>
      </TemplateSection>

      <EntitySummary
        fields={[
          { label: "Company", value: "ZedNova Studio" },
          { label: "Guide", value: guide.h1 },
          { label: "Source platform", value: guide.sourcePlatform },
          { label: "Audience", value: guide.audience },
          { label: "URL", value: `${SITE_ORIGIN}/alternatives/${guide.slug}` },
        ]}
        links={guide.related}
        intro={guide.description}
      />

      <DarkCTA
        heading={`Planning a move off ${guide.sourcePlatform}?`}
        sub="Tell us what you have today and what must work on day one. We will scope migration or rebuild honestly."
        ctaLabel="Book a call"
      />

      <TemplateSection borderBottom={false}>
        <Link
          href="/alternatives"
          className="text-sm text-zn-text underline-offset-4 hover:underline"
        >
          ← All alternatives guides
        </Link>
      </TemplateSection>
    </>
  );
}
