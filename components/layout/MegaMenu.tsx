"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Icon } from "@/components/shared/Icon";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import {
  BlueprintGuides,
  blueprintDarkLineClass,
  useBlueprintReveal,
} from "@/components/shared/BlueprintGuides";
import {
  RubberHoverHighlightLayer,
  useRubberHoverHighlight,
} from "@/components/shared/HoverHighlight";
import type { CaseStudy, Industry, Service, ServiceGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  type: "services" | "industries";
  serviceGroups: { group: ServiceGroup; services: Service[] }[];
  industries: Industry[];
  featured: CaseStudy | null;
  theme?: "light" | "dark";
  onNavigate: () => void;
};

const HIGHLIGHT_LIGHT_FILL = "var(--color-zn-bg-3)";
const HIGHLIGHT_LIGHT_FILL_OPACITY = 0.7;
const HIGHLIGHT_DARK_FILL = "var(--color-zn-dark-2)";
const HIGHLIGHT_DARK_FILL_OPACITY = 0.9;

function GridEdgeCrosses({
  columns,
  theme,
}: {
  columns: number;
  theme: "light" | "dark";
}) {
  const stops = Array.from({ length: columns + 1 }, (_, i) => (i / columns) * 100);

  return (
    <>
      {stops.map((pct) => (
        <span key={pct}>
          <BlueprintCross
            anchor={pct === 0 ? "left" : pct === 100 ? "right" : pct}
            theme={theme}
            data-blueprint-cross
            className="top-0 -translate-y-1/2"
          />
          <BlueprintCross
            anchor={pct === 0 ? "left" : pct === 100 ? "right" : pct}
            theme={theme}
            data-blueprint-cross
            className="bottom-0 translate-y-1/2"
          />
        </span>
      ))}
    </>
  );
}

function ColumnCrosses({
  showTop = true,
  theme,
}: {
  showTop?: boolean;
  theme: "light" | "dark";
}) {
  return (
    <>
      {showTop && (
        <BlueprintCross
          anchor="left"
          theme={theme}
          data-blueprint-cross
          className="top-0 -translate-y-1/2"
        />
      )}
      <BlueprintCross
        anchor="left"
        theme={theme}
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
  theme = "light",
  onNavigate,
}: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const highlight = useRubberHoverHighlight();
  useBlueprintReveal(panelRef, "mount");

  const isDark = theme === "dark";
  const borderClass = isDark ? "border-zn-border-dk" : "border-zn-border";
  const divideClass = isDark ? "divide-zn-border-dk" : "divide-zn-border";
  const lineClass = isDark ? blueprintDarkLineClass : "bg-zn-border";
  const labelClass = isDark ? "text-zn-inv-2" : "text-zn-text-3";
  const titleClass = isDark ? "text-zn-inv" : "text-zn-text";
  const bodyClass = isDark ? "text-zn-inv-2" : "text-zn-text-2";
  const iconClass = isDark ? "text-zn-inv" : "text-zn-text";

  return (
    <div
      ref={panelRef}
      className={cn("relative", isDark ? "bg-zn-dark text-zn-inv" : "bg-zn-bg text-zn-text")}
    >
      <BlueprintGuides reveal="none" showEdgeCrosses={false} theme={theme} />

      <div className="zn-container-guides relative">
        <div
          ref={highlight.rootRef}
          className="relative"
          {...highlight.pointerHandlers}
        >
          <div
            data-blueprint-line
            className={cn(
              "pointer-events-none absolute left-0 right-0 top-0 h-px",
              lineClass,
            )}
          />
          <div
            data-blueprint-line
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 right-0 h-px",
              lineClass,
            )}
          />

          <BlueprintCross
            anchor="left"
            theme={theme}
            data-blueprint-cross
            className="top-0 -translate-y-1/2"
          />
          <BlueprintCross
            anchor="right"
            theme={theme}
            data-blueprint-cross
            className="top-0 -translate-y-1/2"
          />
          <BlueprintCross
            anchor="left"
            theme={theme}
            data-blueprint-cross
            className="bottom-0 translate-y-1/2"
          />
          <BlueprintCross
            anchor="right"
            theme={theme}
            data-blueprint-cross
            className="bottom-0 translate-y-1/2"
          />

          <RubberHoverHighlightLayer
            pathD={highlight.pathD}
            opacity={highlight.opacity}
            fill={isDark ? HIGHLIGHT_DARK_FILL : HIGHLIGHT_LIGHT_FILL}
            fillOpacity={isDark ? HIGHLIGHT_DARK_FILL_OPACITY : HIGHLIGHT_LIGHT_FILL_OPACITY}
          />

          {type === "services" ? (
            <div className="relative grid lg:grid-cols-[1fr_1fr_22rem]">
              {serviceGroups.map((group, index) => (
                <div
                  key={group.group}
                  className={cn("relative", index > 0 && cn("border-l", borderClass))}
                >
                  {index > 0 && <ColumnCrosses theme={theme} />}
                  <div className={cn("relative border-b", borderClass)}>
                    <BlueprintCross
                      anchor="left"
                      theme={theme}
                      data-blueprint-cross
                      className="bottom-0 translate-y-1/2"
                    />
                    <p className={cn("zn-label px-6 py-4", labelClass)}>{group.group}</p>
                  </div>
                  <ul>
                    {group.services.map((service) => (
                      <li
                        key={service.slug}
                        className="relative"
                        data-hover-cell
                        onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
                      >
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={onNavigate}
                          className="relative z-[1] flex items-start gap-3 px-6 py-4"
                        >
                          <Icon
                            name={service.icon}
                            className={cn("mt-0.5 size-5 shrink-0", iconClass)}
                          />
                          <span>
                            <span className={cn("block text-[0.95rem] font-medium", titleClass)}>
                              {service.title}
                            </span>
                            <span className={cn("block text-[0.8rem] leading-snug", bodyClass)}>
                              {service.shortDescription}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className={cn("relative border-l", borderClass)}>
                <ColumnCrosses theme={theme} />
                <div className={cn("relative border-b", borderClass)}>
                  <BlueprintCross
                    anchor="left"
                    theme={theme}
                    data-blueprint-cross
                    className="bottom-0 translate-y-1/2"
                  />
                  <p className={cn("zn-label px-6 py-4", labelClass)}>Featured work</p>
                </div>
                <div className="relative">
                  {featured && (
                    <Link
                      href={`/work/${featured.slug}`}
                      onClick={onNavigate}
                      data-hover-cell
                      onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
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
                      <div
                        className={cn(
                          "mt-3 flex items-center justify-between gap-3 border-t pt-3",
                          borderClass,
                        )}
                      >
                        <span className={cn("text-sm font-medium", titleClass)}>
                          {featured.client}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                            iconClass,
                          )}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "relative grid grid-cols-2 divide-x divide-y md:grid-cols-3 lg:grid-cols-5",
                divideClass,
              )}
            >
              <div className="pointer-events-none absolute inset-0 grid md:hidden">
                <GridEdgeCrosses columns={2} theme={theme} />
              </div>
              <div className="pointer-events-none absolute inset-0 hidden md:grid lg:hidden">
                <GridEdgeCrosses columns={3} theme={theme} />
              </div>
              <div className="pointer-events-none absolute inset-0 hidden lg:grid">
                <GridEdgeCrosses columns={5} theme={theme} />
              </div>
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  onClick={onNavigate}
                  data-hover-cell
                  onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
                  className="relative z-[1] flex flex-col gap-3 px-6 py-6"
                >
                  <Icon name={industry.icon} className={cn("size-6", iconClass)} />
                  <span>
                    <span className={cn("block text-sm font-medium leading-snug", titleClass)}>
                      {industry.title}
                    </span>
                    <span className={cn("mt-1.5 block text-[0.8rem] leading-snug", bodyClass)}>
                      {industry.shortDescription}
                    </span>
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
