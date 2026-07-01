"use client";

import type { IndustryPageContent } from "@/lib/types/industry-page";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { hasSectionContent } from "@/lib/content/resolve-industry-page";

export function IndustryTimelineStickySection({
  section,
}: {
  section: IndustryPageContent["system"];
}) {
  if (!hasSectionContent(section.steps) || !section.heading) return null;

  return (
    <section data-theme="light" className="relative bg-zn-bg-2/30">
      <BlueprintGrid />
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border bg-zn-bg">
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

          <div className="relative border-t border-zn-border px-6 pb-[clamp(3rem,6vw,5rem)] pt-4 sm:px-8 lg:px-12">
            {/* Center rail — desktop only */}
            <div
              className="pointer-events-none absolute bottom-16 left-1/2 top-4 hidden w-px -translate-x-1/2 bg-zn-border lg:block"
              aria-hidden="true"
            />

            <Stagger className="relative mx-auto max-w-4xl space-y-0" stagger={0.05}>
              {section.steps.map((step, index) => {
                const stepLabel = step.label || String(index + 1).padStart(2, "0");
                const alignRight = index % 2 === 1;
                const isLast = index === section.steps.length - 1;

                return (
                  <article
                    key={step.title}
                    className={cn(
                      "relative grid grid-cols-1 gap-6 py-8 lg:grid-cols-2 lg:gap-12 lg:py-10",
                      alignRight && "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1",
                    )}
                  >
                    {/* Spacer column for zigzag */}
                    <div className="hidden lg:block" aria-hidden="true" />

                    <div
                      className={cn(
                        "relative lg:max-w-md",
                        alignRight ? "lg:ml-auto lg:text-right" : "lg:mr-auto lg:text-left",
                      )}
                    >
                      {/* Node on center rail */}
                      <span
                        className={cn(
                          "absolute top-2 z-10 hidden size-3 rounded-full border-2 border-zn-bg bg-zn-text lg:block",
                          "left-1/2 -translate-x-1/2",
                        )}
                        style={{ [alignRight ? "marginLeft" : "marginLeft"]: 0 }}
                        aria-hidden="true"
                      />

                      <div
                        className={cn(
                          "rounded-[2px] border border-zn-border bg-white p-6 md:p-7",
                          alignRight ? "lg:ml-8" : "lg:mr-8",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-start gap-4",
                            alignRight && "lg:flex-row-reverse lg:text-right",
                          )}
                        >
                          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[2px] border border-zn-border bg-zn-bg font-mono text-xs tabular-nums text-zn-text">
                            {stepLabel}
                          </span>
                          <div className="min-w-0">
                            <h3 className="font-sans text-lg font-normal tracking-tight text-zn-text">
                              {step.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-zn-text-2 md:text-[0.9375rem]">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      </div>

                      {!isLast ? (
                        <div
                          className="mx-auto mt-6 h-8 w-px bg-zn-border lg:hidden"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
