import type { Metadata } from "next";
import { getIndustryGroups } from "@/lib/queries";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { IndustriesPageGrids } from "@/features/industries/IndustriesPageGrids";
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
    title: "Industries — ZedNova Studios",
    description:
      "Websites, automations, and AI tools for healthcare, ecommerce, fitness, professional services, B2B SaaS, and real estate.",
  },
  robots: { index: true, follow: true },
};

export default async function IndustriesPage() {
  const industryGroups = await getIndustryGroups();

  const parents = industryGroups.map((group) => ({
    slug: group.parent.slug,
    href: `/industries/${group.parent.slug}`,
    title: group.parent.title,
  }));

  const segments = industryGroups.flatMap((group) =>
    group.industries.map((industry) => ({
      href: `/industries/${industry.slug}`,
      title: industry.title,
      description: industry.hook,
      icon: industry.icon,
      parentSlug: group.parent.slug,
      parentTitle: group.parent.title,
    })),
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
            name: "Industries — ZedNova Studios",
            description:
              "Websites, Shopify stores, booking automation, and CRM workflows for healthcare, ecommerce, fitness, professional services, B2B SaaS, and real estate.",
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />

            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
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
                    Six parent industries and the specialties we build for under
                    each — websites, Shopify stores, booking flows, and CRM
                    automation.
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

            <IndustriesPageGrids parents={parents} segments={segments} />

            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
          </div>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
