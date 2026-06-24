import type { Metadata } from "next";
import { getIndustryGroups, getIndustryNavItems } from "@/lib/queries";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { IndustriesPageGrids } from "@/features/industries/IndustriesPageGrids";
import { DarkCTA } from "@/features/home/DarkCTA";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Websites, Shopify development, booking automation, and CRM workflows for healthcare clinics, Shopify and DTC brands, and small businesses building custom software.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const [industryGroups, industryNavItems] = await Promise.all([
    getIndustryGroups(),
    getIndustryNavItems(),
  ]);

  const groups = industryGroups.map((group) => ({
    id: group.category,
    parentTitle: group.parent.title,
    parentSlug: group.parent.slug,
    headline: group.parent.heroHeadline,
    description: group.parent.shortDescription,
    items: group.industries.map((industry) => ({
      href: `/industries/${industry.slug}`,
      title: industry.title,
      description: industry.hook,
      icon: industry.icon,
    })),
  }));

  const allIndustries = industryNavItems.map((item) => ({
    href: item.href,
    title: item.title,
    description: item.shortDescription,
  }));

  return (
    <>
      {/* Hero + industry grids — one continuous guides frame */}
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />

            {/* Hero */}
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
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
                    We design websites, Shopify stores, landing pages, AI phone
                    assistants, booking flows, email automation, and CRM
                    workflows for teams across the United States.
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

            <IndustriesPageGrids groups={groups} allIndustries={allIndustries} />

            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
          </div>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
