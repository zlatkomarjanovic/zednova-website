"use client";

import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
import { BlueprintGridCrosses } from "@/components/shared/BlueprintGridCrosses";
import {
  HoverHighlightSurface,
  useHoverHighlight,
} from "@/components/shared/HoverHighlight";
import type { Industry } from "@/lib/types";

const HIGHLIGHT_CLASS =
  "pointer-events-none absolute z-0 bg-white transition-[top,left,width,height,opacity] duration-250 ease-out";

export function IndustryShowcaseGrid({ industries }: { industries: Industry[] }) {
  const highlight = useHoverHighlight<HTMLDivElement>();

  return (
    <div className="zn-container-guides relative mt-14">
      <div
        ref={highlight.rootRef}
        className="relative border-y border-zn-border"
        onMouseLeave={highlight.reset}
      >
        <HoverHighlightSurface rect={highlight.rect} className={HIGHLIGHT_CLASS} />

        <div className="pointer-events-none absolute inset-0 grid md:hidden">
          <BlueprintGridCrosses columns={2} rows={5} />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden md:grid lg:hidden">
          <BlueprintGridCrosses columns={3} rows={4} />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden lg:grid">
          <BlueprintGridCrosses columns={5} rows={2} />
        </div>

        <div className="relative grid grid-cols-2 divide-x divide-y divide-zn-border md:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              onMouseEnter={(e) => highlight.moveTo(e.currentTarget)}
              className="group relative z-[1] flex flex-col gap-3 px-6 py-6 md:py-7"
            >
              <Icon name={industry.icon} className="size-6 text-zn-text" />
              <div>
                <h3 className="font-sans text-sm font-normal tracking-tight text-zn-text md:text-base">
                  {industry.title}
                </h3>
                <p className="zn-prose mt-1.5">
                  {industry.hook}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
