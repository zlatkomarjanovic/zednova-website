"use client";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
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
    "The platforms we build on, connect, and deploy — including the industry tools our healthcare, ecommerce, coaching, SaaS, and real estate clients already use.",
}: TechStackShowcaseProps) {
  return (
    <div className="zn-container relative min-w-0">
      <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:z-10 lg:max-h-[calc(100dvh-6rem)] lg:self-start">
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

        <div className="flex min-w-0 flex-col gap-3">
          {groups.map((group) => (
            <article
              key={group.category}
              className="rounded-[10px] border border-zn-border bg-white/90 px-5 py-5 md:px-6 md:py-6"
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
                    <span className="inline-block rounded-[6px] border border-zn-border bg-zn-bg px-2.5 py-1 text-sm tracking-tight text-zn-text">
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
  );
}
