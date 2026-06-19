"use client";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { HeroWorkGallery } from "@/components/sections/HeroWorkGallery";
import { Button } from "@/components/shared/Button";
import type { CaseStudy } from "@/lib/types";

const TRUST_BADGES = [
  "Texas LLC",
  "120+ projects delivered",
  "100% Job Success Score",
  "7+ years building systems",
];

export function HeroSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section
      data-theme="light"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-zn-bg"
    >
      <div className="zn-grain absolute inset-0" aria-hidden="true" />
      <BlueprintGrid immediate />

      {/* Single guide column — text inset, gallery flush between vertical lines */}
      <div className="zn-container-guides relative flex min-h-0 flex-1 flex-col pb-8 lg:pb-10">
        <div className="zn-container-inset flex shrink-0 flex-col pt-28 pb-0 lg:pt-32">
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
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-zn-text-2 sm:text-base">
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

          <Reveal delay={0.18} start="top bottom">
            <ul className="mt-[10rem] flex flex-wrap gap-2 lg:mt-[12rem]">
              {TRUST_BADGES.map((badge) => (
                <li key={badge}>
                  <span className="inline-flex items-center px-1 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-zn-text-3">
                    {badge}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.22} start="top bottom" className="mt-8 min-h-0 lg:mt-10">
          <HeroWorkGallery caseStudies={caseStudies} />
        </Reveal>
      </div>
    </section>
  );
}
