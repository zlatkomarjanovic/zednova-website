"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Icon } from "@/components/shared/Icon";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { BlueprintGuides, useBlueprintReveal } from "@/components/shared/BlueprintGuides";
import {
  HoverHighlightSurface,
  useHoverHighlight,
} from "@/components/shared/HoverHighlight";
import type { CaseStudy, Industry, Service, ServiceGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  type: "services" | "industries";
  serviceGroups: { group: ServiceGroup; services: Service[] }[];
  industries: Industry[];
  featured: CaseStudy | null;
  onNavigate: () => void;
};

const HIGHLIGHT_CLASS =
  "pointer-events-none absolute z-0 bg-white transition-[top,left,width,height,opacity] duration-250 ease-out";

function GridEdgeCrosses({ columns }: { columns: number }) {
  const stops = Array.from({ length: columns + 1 }, (_, i) => (i / columns) * 100);

  return (
    <>
      {stops.map((pct) => (
        <span key={pct}>
          <BlueprintCross
            anchor={pct === 0 ? "left" : pct === 100 ? "right" : pct}
            data-blueprint-cross
            className="top-0 -translate-y-1/2"
          />
          <BlueprintCross
            anchor={pct === 0 ? "left" : pct === 100 ? "right" : pct}
            data-blueprint-cross
            className="bottom-0 translate-y-1/2"
          />
        </span>
      ))}
    </>
  );
}

function ColumnCrosses({ showTop = true }: { showTop?: boolean }) {
  return (
    <>
      {showTop && (
        <BlueprintCross
          anchor="left"
          data-blueprint-cross
          className="top-0 -translate-y-1/2"
        />
      )}
      <BlueprintCross
        anchor="left"
        data-blueprint-cross
        className="bottom-0 translate-y-1/2"
      />
    </>
  );
}

export function MegaMenu({
  type,
  serviceGroups,
  industries,
  featured,
  onNavigate,
}: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const highlight = useHoverHighlight<HTMLDivElement>();
  useBlueprintReveal(panelRef, "mount");

  return (
    <div ref={panelRef} className="relative bg-zn-bg">
      <BlueprintGuides reveal="none" showEdgeCrosses={false} />

      <div className="zn-container-guides relative">
        <div
          ref={highlight.rootRef}
          className="relative"
          onMouseLeave={highlight.reset}
        >
          <div
            data-blueprint-line
            className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-zn-border"
          />
          <div
            data-blueprint-line
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-zn-border"
          />

          <BlueprintCross
            anchor="left"
            data-blueprint-cross
            className="top-0 -translate-y-1/2"
          />
          <BlueprintCross
            anchor="right"
            data-blueprint-cross
            className="top-0 -translate-y-1/2"
          />
          <BlueprintCross
            anchor="left"
            data-blueprint-cross
            className="bottom-0 translate-y-1/2"
          />
          <BlueprintCross
            anchor="right"
            data-blueprint-cross
            className="bottom-0 translate-y-1/2"
          />

          <HoverHighlightSurface rect={highlight.rect} className={HIGHLIGHT_CLASS} />

          {type === "services" ? (
            <div className="relative grid lg:grid-cols-[1fr_1fr_22rem]">
              {serviceGroups.map((group, index) => (
                <div
                  key={group.group}
                  className={cn("relative", index > 0 && "border-l border-zn-border")}
                >
                  {index > 0 && <ColumnCrosses />}
                  <div className="relative border-b border-zn-border">
                    <BlueprintCross
                      anchor="left"
                      data-blueprint-cross
                      className="bottom-0 translate-y-1/2"
                    />
                    <p className="zn-label px-6 py-4 text-zn-text-3">{group.group}</p>
                  </div>
                  <ul>
                    {group.services.map((service) => (
                      <li
                        key={service.slug}
                        className="relative"
                        onMouseEnter={(e) => highlight.moveTo(e.currentTarget)}
                      >
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={onNavigate}
                          className="relative z-[1] flex items-start gap-3 px-6 py-4"
                        >
                          <Icon
                            name={service.icon}
                            className="mt-0.5 size-5 shrink-0 text-zn-text"
                          />
                          <span>
                            <span className="block text-[0.95rem] font-medium text-zn-text">
                              {service.title}
                            </span>
                            <span className="block text-[0.8rem] leading-snug text-zn-text-2">
                              {service.shortDescription}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="relative border-l border-zn-border">
                <ColumnCrosses />
                <div className="relative border-b border-zn-border">
                  <BlueprintCross
                    anchor="left"
                    data-blueprint-cross
                    className="bottom-0 translate-y-1/2"
                  />
                  <p className="zn-label px-6 py-4 text-zn-text-3">Featured work</p>
                </div>
                <div className="relative">
                  {featured && (
                    <Link
                      href={`/work/${featured.slug}`}
                      onClick={onNavigate}
                      onMouseEnter={(e) => highlight.moveTo(e.currentTarget)}
                      className="group relative z-[1] block px-6 py-4"
                    >
                      <div
                        className="relative aspect-[16/10] overflow-hidden rounded-[10px]"
                        style={{ backgroundColor: featured.accent }}
                      >
                        <div className="zn-grain absolute inset-0" aria-hidden="true" />
                        <div className="relative flex h-full flex-col justify-end p-5">
                          <div className="font-mono text-3xl text-zn-inv">
                            {featured.results[0].value}
                          </div>
                          <div className="text-xs text-zn-inv-2">
                            {featured.results[0].label}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3 border-t border-zn-border pt-3">
                        <span className="text-sm font-medium text-zn-text">
                          {featured.client}
                        </span>
                        <ArrowUpRight className="size-4 text-zn-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative grid grid-cols-2 divide-x divide-y divide-zn-border md:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
              <div className="pointer-events-none absolute inset-0 grid md:hidden">
                <GridEdgeCrosses columns={2} />
              </div>
              <div className="pointer-events-none absolute inset-0 hidden md:grid lg:hidden">
                <GridEdgeCrosses columns={3} />
              </div>
              <div className="pointer-events-none absolute inset-0 hidden lg:grid">
                <GridEdgeCrosses columns={5} />
              </div>
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  onClick={onNavigate}
                  onMouseEnter={(e) => highlight.moveTo(e.currentTarget)}
                  className="relative z-[1] flex flex-col gap-3 px-6 py-5"
                >
                  <Icon name={industry.icon} className="size-6 text-zn-text" />
                  <span className="text-sm font-medium leading-snug text-zn-text">
                    {industry.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
