"use client";

import { BlueprintCross } from "@/ui/BlueprintCross";
import type { TechStackGroup } from "@/lib/content/tech-stack";

export function TechStackShowcase({ groups }: { groups: TechStackGroup[] }) {
  return (
    <div className="zn-container-guides relative mt-14">
      <div className="relative border-x border-zn-border">
        <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
        <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

        <div className="grid gap-px border-y border-zn-border bg-zn-border md:grid-cols-2">
          {groups.map((group) => (
            <article
              key={group.category}
              className="flex flex-col bg-white/85 px-6 py-6 md:px-8 md:py-7"
            >
              <h3 className="font-sans text-lg font-normal tracking-tight text-zn-text md:text-xl">
                {group.category}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li key={tool}>
                    <span className="inline-block rounded-[4px] border border-zn-border bg-zn-bg px-3 py-1.5 text-sm tracking-tight text-zn-text">
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
