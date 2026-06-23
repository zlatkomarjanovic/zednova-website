import type { Metadata } from "next";
import { getIndustryGroups } from "@/lib/queries";
import { industryNavItems } from "@/lib/content/nav-menu";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { DarkCTA } from "@/components/sections/DarkCTA";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Websites, Shopify development, booking automation, and CRM workflows for healthcare clinics, Shopify and DTC brands, and small businesses building custom software.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const industryGroups = await getIndustryGroups();

  return (
    <>
      {/* Hero — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg">
        <BlueprintGrid immediate />
        <div className="zn-container-guides relative">
          <div className="relative border-x border-zn-border">
            <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
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
          </div>
        </div>
      </section>

      {/* Industry groups with sub-industries — guides framing */}
      <section
        data-theme="light"
        className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]"
      >
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset divide-y divide-zn-border">
              {industryGroups.map((group) => (
                <div key={group.category} className="py-12 first:pt-14 last:pb-16">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                      <Reveal>
                        <SectionLabel withRule={false}>
                          {group.parent.title}
                        </SectionLabel>
                      </Reveal>
                      <TextReveal
                        as="h2"
                        text={group.parent.heroHeadline}
                        className="mt-5 zn-h2 font-sans font-normal"
                      />
                      <Reveal delay={0.08}>
                        <p className="zn-prose mt-5 max-w-lg">
                          {group.parent.shortDescription}
                        </p>
                      </Reveal>
                    </div>
                    <Reveal delay={0.1}>
                      <Link
                        href={`/industries/${group.parent.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-zn-text"
                      >
                        <span className="zn-underline">Explore {group.parent.title}</span>
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Reveal>
                  </div>

                  <Stagger
                    className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    stagger={0.05}
                  >
                    {group.industries.map((industry) => (
                      <IndustryCard key={industry.slug} industry={industry} />
                    ))}
                  </Stagger>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All industries we serve (from mega menu) */}
      <section data-theme="light" className="zn-section">
        <div className="zn-container">
          <Reveal>
            <SectionLabel withRule={false}>All industries</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text="More teams we build for"
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
          />
          <Reveal delay={0.08}>
            <p className="zn-prose mt-5 max-w-lg">
              Beyond our three focus areas, we ship websites, stores, and
              automations for a wide range of teams. If yours is not listed,
              ask — we have likely built something close.
            </p>
          </Reveal>
          <Stagger
            className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-zn-border bg-zn-border sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.03}
          >
            {industryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex h-full flex-col gap-2 bg-zn-bg p-6 transition-colors hover:bg-zn-bg-2"
              >
                <h3 className="font-sans text-base font-normal leading-snug text-zn-text">
                  {item.title}
                </h3>
                <p className="zn-prose line-clamp-3">{item.shortDescription}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-zn-text-3">
                  Learn more
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
