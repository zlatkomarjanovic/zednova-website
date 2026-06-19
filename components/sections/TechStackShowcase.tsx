"use client";

import {
  HoverHighlightSurface,
  useHoverHighlight,
} from "@/components/shared/HoverHighlight";
import type { TechStackGroup } from "@/lib/content/tech-stack";

const HIGHLIGHT =
  "pointer-events-none absolute z-0 bg-white/90 transition-[top,left,width,height,opacity] duration-250 ease-out";

export function TechStackShowcase({ groups }: { groups: TechStackGroup[] }) {
  const highlight = useHoverHighlight<HTMLDivElement>();

  return (
    <div className="zn-container-guides relative mt-14">
      <div
        ref={highlight.rootRef}
        className="relative border-y border-zn-border"
        onMouseLeave={highlight.reset}
      >
        <HoverHighlightSurface rect={highlight.rect} className={HIGHLIGHT} />

        <ul className="relative z-[1] divide-y divide-zn-border">
          {groups.map((group) => (
            <li
              key={group.category}
              onMouseEnter={(e) => highlight.moveTo(e.currentTarget)}
              className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-[6.5rem_1fr] sm:items-center sm:gap-6 md:px-8 md:py-6"
            >
              <p className="zn-label text-zn-text-3 sm:pt-0">{group.category}</p>
              <div className="flex flex-wrap justify-end gap-2">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-[4px] bg-white px-3 py-1.5 text-sm tracking-tight text-zn-text"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
