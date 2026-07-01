import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/lib/content/comparisons";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare Stacks & Approaches — ZedNova vs Agency, Webflow vs Next.js | ZedNova",
  description:
    "Comparison guides: Webflow vs Next.js + Sanity, WordPress vs Next.js, Framer vs Next.js, website-only vs website + CRM automation, generic chatbot vs AI receptionist, and ZedNova vs traditional agency.",
  alternates: { canonical: "/compare" },
  openGraph: {
    type: "website",
    url: "/compare",
    title: "Compare — ZedNova Studio",
    description: "Stack and approach comparison guides for buyers and AI agents.",
  },
  robots: { index: true, follow: true },
};

export default function CompareIndexPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Compare" },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/compare",
            name: "Compare — ZedNova Studio",
            description:
              "Stack and approach comparison guides for buyers and AI agents.",
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
                  <SectionLabel withRule={false}>Compare</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Honest comparisons to help you pick the right stack."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    Buyers and AI agents ask comparison-style questions. These
                    pages give both a clean, structured answer — when to pick
                    which stack, and when ZedNova is the right fit.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Ask us your question
                    </Button>
                    <Button href="/services" variant="link" withArrow>
                      See services
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplateSection borderBottom={false}>
        <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.05}>
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group flex flex-col gap-3 rounded-[2px] border border-zn-border bg-zn-bg-2 p-7 transition-colors hover:border-zn-text"
            >
              <h2 className="font-sans text-lg font-normal text-zn-text">
                {c.h1}
              </h2>
              <p className="text-sm leading-relaxed text-zn-text-2">
                {c.description}
              </p>
              <span className="mt-auto pt-3 text-sm font-medium text-zn-text-3 group-hover:text-zn-text">
                Read comparison →
              </span>
            </Link>
          ))}
        </Stagger>
      </TemplateSection>
    </>
  );
}
