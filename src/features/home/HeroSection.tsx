"use client";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { HeroLineWave } from "@/components/animations/HeroLineWave";
import { Reveal } from "@/components/animations/Reveal";
import { HeroRotatingHeadline } from "@/components/animations/HeroRotatingHeadline";
import { HeroWorkGallery } from "@/features/home/HeroWorkGallery";
import { Button } from "@/ui/Button";
import type { PortfolioProject } from "@/lib/types";

export function HeroSection({ projects }: { projects: PortfolioProject[] }) {
  return (
    <section
      id="top"
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
                120+ projects. 10+ years shipping products.
              </p>
            </Reveal>

            <div className="mt-8 lg:mt-10">
              <HeroRotatingHeadline />

              <Reveal delay={0.08} start="top bottom">
                <p className="mt-6 max-w-md text-[clamp(0.75rem,1.615vw,1.125rem)] leading-relaxed text-zn-text-2">
                  ZedNova Studios builds websites, ecommerce stores, custom software, CRM
                  automations, AI receptionists, dashboards, and platform migrations for
                  clinics, ecommerce brands, professional services firms, startups, and
                  service businesses.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.14} start="top bottom">
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href="/contact" size="md" withArrow>
                  Tell us what you need
                </Button>
                <Button href="/services" variant="link" withArrow>
                  See services
                </Button>
              </div>
            </Reveal>

            <div className="mt-[10rem] lg:mt-[12rem]" aria-hidden="true" />
          </div>
        </div>

        <Reveal delay={0.22} start="top bottom" className="min-h-0">
          <HeroWorkGallery projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
