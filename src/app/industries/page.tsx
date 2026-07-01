import type { Metadata } from "next";
import { getIndustryGroups } from "@/lib/queries";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";
import { IndustryParentShowcaseGrid } from "@/features/industries/IndustryParentShowcaseGrid";
import { DarkCTA } from "@/features/home/DarkCTA";
import { JsonLd } from "@/ui/JsonLd";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Industries — Websites, Automations & AI Tools by Vertical | ZedNova",
  description:
    "Websites, Shopify stores, booking automation, and CRM workflows for healthcare, dental, medical, medspas, ecommerce, fitness, professional services, B2B SaaS, and real estate.",
  alternates: { canonical: "/industries" },
  openGraph: {
    type: "website",
    url: "/industries",
    title: "Industries — ZedNova Studio",
    description:
      "Websites, automations, and AI tools for healthcare, ecommerce, fitness, professional services, B2B SaaS, and real estate.",
  },
  robots: { index: true, follow: true },
};

export default async function IndustriesPage() {
  const industryGroups = await getIndustryGroups();

  const parentCards = industryGroups.map((group) => ({
    slug: group.parent.slug,
    href: `/industries/${group.parent.slug}`,
    title: group.parent.title,
    description: group.parent.shortDescription,
    hook: group.parent.hook || undefined,
    icon: group.parent.icon || undefined,
    specialtyCount: group.industries.length,
    topSpecialties: group.industries.slice(0, 3).map((i) => i.title),
  }));

  const totalSpecialties = industryGroups.reduce(
    (sum, group) => sum + group.industries.length,
    0,
  );

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Industries" },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            path: "/industries",
            name: "Industries — ZedNova Studio",
            description:
              "Websites, Shopify stores, booking automation, and CRM workflows for healthcare, ecommerce, fitness, professional services, B2B SaaS, and real estate.",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <section data-theme="light" className="relative bg-zn-bg">
        <div className="zn-container-guides relative">
          <BlueprintColumnFrame showBottomRail={false} showBottomCrosses={false}>
            {/* Hero */}
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-16 pt-36 lg:pb-20 lg:pt-44">
                <Breadcrumbs items={crumbs} className="mb-8" />
                <Reveal>
                  <SectionLabel withRule={false}>Who we serve</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="We build for clinics, brands, and teams that sell through calls, forms, and checkout."
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    Six verticals, {totalSpecialties} specialties. Every build
                    starts from how your industry actually wins clients — not a
                    generic agency template.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Tell us what you need
                    </Button>
                    <Button href="/services" variant="link" withArrow>
                      See services
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>

            <IndustryParentShowcaseGrid parents={parentCards} />
          </BlueprintColumnFrame>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
