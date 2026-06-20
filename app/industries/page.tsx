import type { Metadata } from "next";
import { getIndustryGroups } from "@/lib/queries";
import { PageHero } from "@/components/sections/PageHero";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Stagger } from "@/components/animations/Reveal";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Websites, Shopify development, booking automation, and CRM workflows for healthcare clinics, Shopify and DTC brands, and B2B SaaS and tech companies.",
};

export default async function IndustriesPage() {
  const industryGroups = await getIndustryGroups();

  return (
    <>
      <PageHero
        eyebrow="Who we serve"
        title="We build for healthcare, ecommerce, and B2B tech"
        description="We design websites, Shopify stores, landing pages, AI phone assistants, booking flows, email automation, and CRM workflows for teams that sell through calls, forms, and online checkout."
      >
        <Button href="/contact" withArrow>
          Tell us what you need
        </Button>
      </PageHero>

      <section className="pb-4">
        <div className="zn-container space-y-16">
          {industryGroups.map((group) => (
            <div key={group.category}>
              <SectionLabel>{group.parent.title}</SectionLabel>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zn-text-2">
                {group.parent.shortDescription}
              </p>
              <Stagger
                className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.05}
              >
                {group.industries.map((industry) => (
                  <IndustryCard key={industry.slug} industry={industry} />
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <DarkCTA />
      </div>
    </>
  );
}
