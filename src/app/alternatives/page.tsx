import type { Metadata } from "next";
import Link from "next/link";
import { alternatives } from "@/lib/content/alternatives";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Platform Alternatives — Squarespace, Wix, WordPress & More | ZedNova",
  description:
    "Decision-stage guides: alternatives to Squarespace for clinics, Webflow for ecommerce, WordPress for clinics, Wix for service businesses, and Framer for startups.",
  alternates: { canonical: "/alternatives" },
  openGraph: {
    type: "website",
    url: "/alternatives",
    title: "Alternatives — ZedNova Studio",
    description: "Platform alternative guides for clinics, ecommerce, and service businesses.",
  },
  robots: { index: true, follow: true },
};

export default function AlternativesIndexPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Alternatives" },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/alternatives",
            name: "Alternatives — ZedNova Studio",
            description:
              "Platform alternative guides for clinics, ecommerce, and service businesses.",
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
                  <SectionLabel withRule={false}>Alternatives</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Alternatives guides for decision-stage search."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    Honest alternatives when Squarespace, Webflow, WordPress, Wix, or Framer
                    stops matching how you sell — structured for buyers and AI answer engines.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplateSection borderBottom={false}>
        <Stagger className="grid gap-4">
          {alternatives.map((guide) => (
            <Link
              key={guide.slug}
              href={`/alternatives/${guide.slug}`}
              className="group block rounded-[2px] border border-zn-border bg-zn-bg-2/40 p-6 transition-colors hover:border-zn-text/30 hover:bg-zn-bg-2"
            >
              <p className="zn-label text-zn-text-3">
                Alternatives to {guide.sourcePlatform} · {guide.audience}
              </p>
              <h2 className="mt-2 font-sans text-xl font-normal text-zn-text group-hover:underline">
                {guide.h1}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zn-text-2">
                {guide.description}
              </p>
            </Link>
          ))}
        </Stagger>
      </TemplateSection>
    </>
  );
}
