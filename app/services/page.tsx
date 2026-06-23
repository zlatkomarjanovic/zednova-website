import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServiceGroups } from "@/lib/queries";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { Icon } from "@/components/shared/Icon";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design, Shopify development, CRM automation, AI chatbots, dashboards, n8n workflows, and migrations for clinics, ecommerce, and small business.",
  alternates: { canonical: "/services" },
};

const GROUP_TAGLINES: Record<string, string> = {
  Websites: "Sites that load fast, rank, and convert.",
  Ecommerce: "Stores that turn first-time buyers into repeat customers.",
  Automation: "Follow-up that fires without you watching it.",
  "AI Tools": "AI that answers, qualifies, and books — 24/7.",
  "Custom Software": "Software your team uses every day, built for you.",
};

export default async function ServicesPage() {
  const groups = await getServiceGroups();

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
                  <SectionLabel withRule={false}>What we build</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Website design, Shopify, automation, and AI tools"
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    Pick one service or combine a few. We scope each project
                    around what your business actually needs.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Tell us what you need
                    </Button>
                    <Button href="/work" variant="link" withArrow>
                      See our work
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped service grid — guides framing */}
      <section data-theme="light" className="relative bg-zn-bg pb-[clamp(4rem,8vw,7rem)]">
        <div className="zn-container-guides relative">
          <div className="relative border-x border-b border-zn-border">
            <div className="zn-container-inset divide-y divide-zn-border">
              {groups.map((group) => (
                <div key={group.group} className="py-12 first:pt-14 last:pb-16">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <Reveal>
                        <SectionLabel withRule={false}>{group.group}</SectionLabel>
                      </Reveal>
                      <Reveal delay={0.05}>
                        <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
                          {GROUP_TAGLINES[group.group] ?? group.group}
                        </h2>
                      </Reveal>
                    </div>
                  </div>

                  <Stagger
                    className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-zn-border bg-zn-border sm:grid-cols-2 lg:grid-cols-3"
                    stagger={0.04}
                  >
                    {group.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group relative flex h-full flex-col gap-4 bg-zn-bg p-7 transition-colors hover:bg-zn-bg-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm text-zn-text-3">
                            {service.number}
                          </span>
                          <Icon
                            name={service.icon}
                            className="size-6 text-zn-text"
                          />
                        </div>
                        <h3 className="font-sans text-lg font-normal leading-snug text-zn-text">
                          {service.title}
                        </h3>
                        <p className="zn-prose line-clamp-3">{service.shortDescription}</p>
                        <span className="mt-auto inline-flex items-center gap-1 text-sm text-zn-text-3">
                          Explore
                          <ArrowUpRight
                            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    ))}
                  </Stagger>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
