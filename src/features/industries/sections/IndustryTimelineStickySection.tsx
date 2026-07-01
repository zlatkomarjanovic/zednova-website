"use client";

import type { IndustryPageContent } from "@/lib/types/industry-page";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { hasSectionContent } from "@/lib/content/resolve-industry-page";

/**
 * Connected system — alternating center-rail timeline.
 *
 * Desktop rows use a [1fr_4rem_1fr] grid so the rail, node badge, and
 * connector line are positioned in a dedicated middle column and always
 * align, regardless of card height. Mobile collapses to a left rail.
 */
export function IndustryTimelineStickySection({
  section,
}: {
  section: IndustryPageContent["system"];
}) {
  if (!hasSectionContent(section.steps) || !section.heading) return null;

  const total = section.steps.length;

  return (
    <section data-theme="light" className="relative bg-zn-bg-2/30">
      <BlueprintGrid />
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border bg-zn-bg">
          {/* Header */}
          <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)] pb-10">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                {section.eyebrow ? (
                  <SectionLabel withRule={false}>{section.eyebrow}</SectionLabel>
                ) : null}
              </Reveal>
              <TextReveal
                as="h2"
                text={section.heading}
                className="mt-6 zn-h2 font-sans font-normal text-zn-text"
              />
              {section.subheading ? (
                <Reveal delay={0.08}>
                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zn-text-2">
                    {section.subheading}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-zn-border px-6 py-[clamp(2.5rem,5vw,4rem)] sm:px-8 lg:px-12">
            <div className="mx-auto max-w-5xl">
              {/* ---------- Desktop: alternating center rail ---------- */}
              <div className="hidden lg:block">
                {section.steps.map((step, index) => {
                  const stepLabel = step.label || String(index + 1).padStart(2, "0");
                  const cardOnLeft = index % 2 === 0;
                  const isFirst = index === 0;
                  const isLast = index === total - 1;

                  const card = (
                    <Reveal
                      delay={0.05}
                      className={cn("py-6", cardOnLeft ? "pr-0" : "pl-0")}
                    >
                      <div
                        className={cn(
                          "group relative rounded-[2px] border border-zn-border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_2px_24px_rgba(0,0,0,0.06)] md:p-7",
                        )}
                      >
                        {/* Connector from card to rail */}
                        <span
                          className={cn(
                            "absolute top-1/2 h-px w-8 -translate-y-1/2 bg-zn-border",
                            cardOnLeft ? "left-full" : "right-full",
                          )}
                          aria-hidden="true"
                        />
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zn-text-3">
                          Stage {stepLabel}
                        </p>
                        <h3 className="mt-2 font-sans text-lg font-normal tracking-tight text-zn-text md:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-zn-text-2 md:text-[0.9375rem]">
                          {step.body}
                        </p>
                      </div>
                    </Reveal>
                  );

                  return (
                    <div
                      key={step.title}
                      className="grid grid-cols-[1fr_4rem_1fr] items-center"
                    >
                      {/* Left cell */}
                      <div>{cardOnLeft ? card : null}</div>

                      {/* Rail cell — line + numbered node */}
                      <div className="relative flex h-full min-h-[9rem] items-center justify-center self-stretch">
                        <span
                          className={cn(
                            "absolute left-1/2 w-px -translate-x-1/2 bg-zn-border",
                            isFirst ? "top-1/2" : "top-0",
                            isLast ? "bottom-1/2" : "bottom-0",
                          )}
                          aria-hidden="true"
                        />
                        <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-zn-border bg-zn-bg font-mono text-xs tabular-nums text-zn-text shadow-[0_0_0_6px_var(--color-zn-bg,white)]">
                          {stepLabel}
                        </span>
                      </div>

                      {/* Right cell */}
                      <div>{!cardOnLeft ? card : null}</div>
                    </div>
                  );
                })}
              </div>

              {/* ---------- Mobile: left rail ---------- */}
              <div className="lg:hidden">
                {section.steps.map((step, index) => {
                  const stepLabel = step.label || String(index + 1).padStart(2, "0");
                  const isFirst = index === 0;
                  const isLast = index === total - 1;

                  return (
                    <div key={step.title} className="grid grid-cols-[3.5rem_1fr]">
                      <div className="relative flex justify-center">
                        <span
                          className={cn(
                            "absolute left-1/2 w-px -translate-x-1/2 bg-zn-border",
                            isFirst ? "top-7" : "top-0",
                            isLast ? "bottom-[calc(100%-3.5rem)]" : "bottom-0",
                          )}
                          aria-hidden="true"
                        />
                        <span className="relative z-10 mt-4 inline-flex size-9 items-center justify-center rounded-full border border-zn-border bg-zn-bg font-mono text-[11px] tabular-nums text-zn-text">
                          {stepLabel}
                        </span>
                      </div>
                      <div className="pb-8 pt-4">
                        <div className="rounded-[2px] border border-zn-border bg-white p-5">
                          <h3 className="font-sans text-base font-normal tracking-tight text-zn-text">
                            {step.title}
                          </h3>
                          <p className="mt-2.5 text-sm leading-relaxed text-zn-text-2">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
