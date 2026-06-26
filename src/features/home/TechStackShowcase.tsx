"use client";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { SectionLabel } from "@/ui/SectionLabel";
import type { TechStackGroup } from "@/lib/content/tech-stack";

type TechStackShowcaseProps = {
  groups: TechStackGroup[];
  heading?: string;
  description?: string;
};

export function TechStackShowcase({
  groups,
  heading = "The tools we wire together for you",
  description =
    "The platforms we build on, connect, and deploy. We pick the right stack for the project, not the most familiar one.",
}: TechStackShowcaseProps) {
  return (
    <div className="zn-container relative min-w-0">
      <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionLabel withRule={false}>Tech stack</SectionLabel>
          </Reveal>
          <TextReveal
            as="h2"
            text={heading}
            className="mt-6 zn-h2 font-sans font-normal"
          />
          <Reveal delay={0.08}>
            <p className="zn-prose mt-5">{description}</p>
          </Reveal>
        </aside>

        <div className="relative min-w-0">
          <div className="relative border border-zn-border">
            <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
            <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

            <div className="flex flex-col gap-px bg-zn-border">
              {groups.map((group) => (
                <article
                  key={group.category}
                  className="flex flex-col bg-white/90 px-5 py-5 md:px-6 md:py-6"
                >
                  <h3 className="font-sans text-lg font-normal tracking-tight text-zn-text md:text-xl">
                    {group.category}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                    {group.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <li key={tool}>
                        <span className="inline-block rounded-[4px] border border-zn-border bg-zn-bg px-2.5 py-1 text-sm tracking-tight text-zn-text">
                          {tool}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
