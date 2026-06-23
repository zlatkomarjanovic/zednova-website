import type { Metadata } from "next";
import { getServiceGroups } from "@/lib/queries";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/shared/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { ServicesPageGrids } from "@/components/sections/ServicesPageGrids";
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

  const gridGroups = groups.map((group) => ({
    id: group.group,
    label: group.group,
    headline: GROUP_TAGLINES[group.group] ?? group.group,
    items: group.services.map((service) => ({
      href: `/services/${service.slug}`,
      title: service.title,
      description: service.shortDescription,
      icon: service.icon,
    })),
  }));

  return (
    <>
      {/* Hero + service grids — one continuous guides frame */}
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

            <ServicesPageGrids groups={gridGroups} />

            <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
            <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
          </div>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
