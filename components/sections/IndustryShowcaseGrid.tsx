"use client";

import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
import { BlueprintGridCrosses } from "@/components/shared/BlueprintGridCrosses";
import {
  RubberHoverHighlightLayer,
  useRubberHoverHighlight,
} from "@/components/shared/HoverHighlight";
import type { IndustryParent } from "@/lib/types";

export function IndustryShowcaseGrid({
  industries,
}: {
  industries: IndustryParent[];
}) {
  const highlight = useRubberHoverHighlight({
    cellSelector: "[data-industry-cell]",
  });

  return (
    <div className="zn-container-guides relative mt-14">
      <div
        ref={highlight.rootRef}
        className="relative border-y border-zn-border"
        {...highlight.pointerHandlers}
      >
        <RubberHoverHighlightLayer
          pathD={highlight.pathD}
          opacity={highlight.opacity}
          fill="white"
          stroke="var(--color-zn-border)"
        />

        <div className="pointer-events-none absolute inset-0 grid">
          <BlueprintGridCrosses columns={3} rows={1} />
        </div>

        <div className="relative grid grid-cols-1 divide-y divide-zn-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {industries.map((industry) => (
            <div
              key={industry.slug}
              data-industry-cell
              data-hover-cell
              onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
              className="group relative z-[2] flex flex-col gap-4 px-6 py-6 md:py-8"
            >
              <Link
                href={`/industries/${industry.slug}`}
                aria-label={`View ${industry.title}`}
                className="absolute inset-0 z-0"
              />
              <Icon name={industry.icon} className="relative z-[1] size-6 text-zn-text" />
              <div className="relative z-[1] space-y-3">
                <h3 className="font-sans text-sm font-normal tracking-tight text-zn-text md:text-base">
                  {industry.title}
                </h3>
                <p className="zn-prose text-[0.8125rem]">
                  <span className="text-zn-text-3">For: </span>
                  {industry.whoItIsFor}
                </p>
                <p className="zn-prose text-[0.8125rem]">
                  <span className="text-zn-text-3">We build: </span>
                  {industry.whatWeBuild}
                </p>
                <p className="zn-prose text-[0.8125rem]">
                  <span className="text-zn-text-3">Fixes: </span>
                  {industry.problemSolved}
                </p>
                <div className="relative z-10 space-y-2 pt-1">
                  <p className="text-[0.6875rem] uppercase tracking-[0.08em] text-zn-text-3">
                    Most popular services
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {industry.popularServices.slice(0, 4).map((service) => (
                      <li key={service.label}>
                        <Link
                          href={service.href}
                          className="text-[0.8125rem] text-zn-text-2 underline-offset-2 hover:text-zn-text hover:underline"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
