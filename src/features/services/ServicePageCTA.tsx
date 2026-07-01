"use client";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { CONTACT_EMAIL } from "@/lib/content/site";
import { Button } from "@/ui/Button";
import { BlueprintColumnFrame } from "@/ui/BlueprintColumnFrame";
import { SectionLabel } from "@/ui/SectionLabel";

const TRUST_ITEMS = [
  "Texas LLC",
  "120+ projects",
  "10+ years shipping products",
  "Senior-led",
];

export function ServicePageCTA({
  heading = "Ready to put this system to work?",
  sub = "Tell us about your business. We will scope the project on a discovery call and send a clear plan within 24 hours.",
  ctaLabel = "Start this service",
  ctaHref = "/contact",
  secondaryLabel = "View our work",
  secondaryHref = "/work",
  eyebrow = "Next step",
  guideBottomInset = false,
  guideShowBottomRail = true,
  guideShowBottomCrosses = true,
  guideShowTopCrosses = true,
}: {
  heading?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  eyebrow?: string;
  /** Extend side guide rails through bottom padding (e.g. before FAQ or footer CTA). */
  guideBottomInset?: boolean;
  guideShowBottomRail?: boolean;
  guideShowBottomCrosses?: boolean;
  guideShowTopCrosses?: boolean;
}) {
  return (
    <section data-theme="light" className="relative bg-zn-bg" aria-label="Get started">
      <BlueprintGrid />

      <div className="zn-container-guides relative">
        <BlueprintColumnFrame
          bottomInset={guideBottomInset}
          showBottomRail={guideShowBottomRail}
          showBottomCrosses={guideShowBottomCrosses}
          showTopCrosses={guideShowTopCrosses}
        >
          <div className="relative">
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-zn-border lg:block"
              aria-hidden="true"
            />

            <div className="zn-container-inset grid gap-12 py-[clamp(5rem,10vw,8rem)] lg:grid-cols-2 lg:gap-0 lg:py-[clamp(6rem,11vw,9rem)]">
            <div className="flex flex-col justify-end lg:pr-14 xl:pr-20">
              <Reveal>
                <SectionLabel withRule={false}>{eyebrow}</SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 max-w-xl zn-h2 font-sans font-normal text-zn-text">
                  {heading}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-zn-text-2">{sub}</p>
              </Reveal>
            </div>

            <div className="flex flex-col justify-center gap-8 border-t border-zn-border pt-12 lg:border-t-0 lg:pl-14 lg:pt-0 xl:pl-20">
              <Reveal delay={0.12}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <Button href={ctaHref} size="lg" withArrow className="flex-1">
                    {ctaLabel}
                  </Button>
                  <Button
                    href={secondaryHref}
                    variant="outline"
                    size="lg"
                    withArrow
                    className="flex-1"
                  >
                    {secondaryLabel}
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="text-sm leading-relaxed text-zn-text-3">
                  Or email{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-zn-text underline decoration-zn-border underline-offset-4 transition-colors hover:decoration-zn-text"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  . We reply within 24 hours.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-zn-border pt-8">
                  {TRUST_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            </div>
          </div>
        </BlueprintColumnFrame>
      </div>
    </section>
  );
}
