import type { Metadata } from "next";
import { portfolioProjects } from "@/lib/content/portfolio-projects";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/ui/Button";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";
import { WorkFilterableGrid } from "@/features/work/WorkFilterableGrid";
import { DarkCTA } from "@/features/home/DarkCTA";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from ZedNova — marketing websites, SaaS, real estate, and nonprofit builds with brand, design, and development.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section data-theme="light" className="relative bg-zn-bg">
        <div className="zn-container-guides relative">
          <BlueprintColumnFrame>
            <div className="relative border-b border-zn-border">
              <BlueprintCross anchor="left" className="top-full z-10 -translate-y-1/2" />
              <BlueprintCross anchor="right" className="top-full z-10 -translate-y-1/2" />
              <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
                <Reveal>
                  <SectionLabel withRule={false}>Our work</SectionLabel>
                </Reveal>
                <TextReveal
                  as="h1"
                  text="Projects and case studies"
                  className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text"
                />
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl zn-prose">
                    A selection of recent builds — brand, design, and development
                    for teams that needed a site that converts and scales.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button href="/contact" withArrow>
                      Start a project
                    </Button>
                    <Button href="/services" variant="link" withArrow>
                      See services
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>

            <WorkFilterableGrid projects={portfolioProjects} />
          </BlueprintColumnFrame>
        </div>
      </section>

      <DarkCTA />
    </>
  );
}
