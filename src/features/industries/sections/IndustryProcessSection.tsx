"use client";

import { Check } from "lucide-react";

import type { IndustryPageContent } from "@/lib/types/industry-page";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Button } from "@/ui/Button";
import { hasSectionContent } from "@/lib/content/resolve-industry-page";

export function IndustryProcessSection({
  section,
  industrySlug,
  inSageFlow = false,
}: {
  section: IndustryPageContent["process"];
  industrySlug: string;
  /** When true, background/grain come from a parent sage wrapper (e.g. services above). */
  inSageFlow?: boolean;
}) {
  if (!hasSectionContent(section.steps) || !section.heading) return null;

  const content = (
    <>
      <BlueprintGrid />
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border">
          <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <aside className="zn-container-inset border-b border-zn-border py-[clamp(3rem,6vw,5rem)] lg:sticky lg:top-28 lg:z-10 lg:self-start lg:border-b-0 lg:py-[clamp(4rem,7vw,6rem)]">
              <Reveal>
                {section.eyebrow ? (
                  <SectionLabel withRule={false}>{section.eyebrow}</SectionLabel>
                ) : null}
              </Reveal>
              <TextReveal
                as="h2"
                text={section.heading}
                className="mt-6 max-w-md zn-h2 font-sans font-normal text-zn-text"
              />
              {section.subheading ? (
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-zn-text-2">
                    {section.subheading}
                  </p>
                </Reveal>
              ) : null}
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <Button href={`/contact?industry=${industrySlug}`} withArrow>
                    Start a project
                  </Button>
                </div>
              </Reveal>
            </aside>

            <div className="relative min-w-0">
              <Stagger className="divide-y divide-zn-border" stagger={0.05}>
                {section.steps.map((step) => (
                  <article
                    key={`${step.step}-${step.title}`}
                    className="border-l border-zn-border bg-transparent px-8 py-12 md:px-10 md:py-14 lg:px-12 lg:py-16"
                  >
                    {step.icon ? (
                      <div className="mb-6 flex size-11 items-center justify-center rounded-[4px] border border-zn-border bg-zn-bg-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={step.icon}
                          alt=""
                          className="size-5 object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <span className="inline-flex size-10 items-center justify-center rounded-[2px] border border-zn-border bg-white font-mono text-xs tabular-nums text-zn-text">
                        {String(step.step).padStart(2, "0")}
                      </span>
                    )}

                    <p className="mt-6 font-sans text-xl font-normal text-zn-text md:text-2xl">
                      {step.title}
                    </p>

                    {step.body ? (
                      <p className="mt-6 max-w-2xl leading-relaxed text-zn-text-2 md:mt-8 md:text-[1.05rem]">
                        {step.body}
                      </p>
                    ) : null}

                    {step.deliverables && step.deliverables.length > 0 ? (
                      <ul className="mt-8 grid gap-3 border-t border-zn-border pt-8 sm:grid-cols-2">
                        {step.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-zn-text md:text-[0.9375rem]"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (inSageFlow) {
    return (
      <div className="relative pb-[clamp(4rem,8vw,8rem)]">
        {content}
      </div>
    );
  }

  return (
    <section
      data-theme="light"
      className="relative bg-gradient-to-b from-zn-sage via-zn-sage-mid to-zn-bg"
    >
      <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
      {content}
    </section>
  );
}
