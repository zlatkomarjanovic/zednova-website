"use client";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { HeroLineWave } from "@/components/animations/HeroLineWave";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { HeroWorkGallery } from "@/components/sections/HeroWorkGallery";
import { Button } from "@/components/shared/Button";
import type { CaseStudy } from "@/lib/types";

export function HeroSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section
      data-theme="light"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-zn-bg"
    >
      <BlueprintGrid immediate />

      <div className="zn-container-guides relative flex min-h-0 flex-1 flex-col pb-8 lg:pb-10">
        <div className="relative" data-hero-wave-zone>
          <div className="absolute inset-x-0 top-16 bottom-0 z-0 lg:top-18">
            <HeroLineWave />
          </div>

          <div className="zn-container-inset relative z-10 flex shrink-0 flex-col pt-28 pb-8 lg:pt-32 lg:pb-10">
            <Reveal start="top bottom">
              <p className="text-sm text-zn-text-3">
                Available for new projects. Texas LLC, worldwide delivery.
              </p>
            </Reveal>

            <h1 className="mt-5 max-w-[18ch] font-sans text-[clamp(1.925rem,4.62vw,3.675rem)] font-normal leading-[1.02] tracking-[-0.025em]">
              <TextReveal
                as="span"
                text="AI systems that work"
                className="block"
                immediate
              />
              <TextReveal
                as="span"
                text="while you sleep."
                className="block zn-accent-italic text-zn-text-3"
                delay={0.12}
                immediate
              />
            </h1>

            <Reveal delay={0.08} start="top bottom">
              <p className="zn-prose mt-4 max-w-md sm:max-w-lg">
                Revenue infrastructure for American businesses. Lead capture,
                automation, CRM, and AI agents that compound.
              </p>
            </Reveal>

            <Reveal delay={0.14} start="top bottom">
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href="/contact" size="md" withArrow>
                  Start a project
                </Button>
                <Button href="/work" variant="link" withArrow>
                  View our work
                </Button>
              </div>
            </Reveal>

            <div className="mt-[10rem] lg:mt-[12rem]" aria-hidden="true" />
          </div>
        </div>

        <Reveal delay={0.22} start="top bottom" className="min-h-0">
          <HeroWorkGallery caseStudies={caseStudies} />
        </Reveal>
      </div>
    </section>
  );
}
