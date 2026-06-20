"use client";

import Link from "next/link";
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
import type { CaseStudy, Industry, IndustryCategory, IndustryParent, Service, ServiceGroup } from "@/lib/types";
import type { Migration } from "@/lib/content/migrations";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  type: "services" | "industries" | "migrations";
  serviceGroups: { group: ServiceGroup; services: Service[] }[];
  industryGroups: {
    category: IndustryCategory;
    parent: IndustryParent;
    industries: Industry[];
  }[];
  migrations: Migration[];
  featured: CaseStudy | null;
  theme?: "light" | "dark";
  onNavigate: () => void;
};

const MIGRATION_SLUGS = new Set([
  "webflow-to-nextjs-sanity",
  "wordpress-to-nextjs-sanity",
  "framer-to-nextjs-sanity",
  "wix-to-nextjs-sanity",
  "squarespace-to-nextjs-sanity",
  "webflow-cms-to-sanity",
  "wordpress-blog-to-sanity",
  "shopify-to-headless-shopify",
]);

function serviceHref(service: Service) {
  return MIGRATION_SLUGS.has(service.slug)
    ? `/migrations/${service.slug}`
    : `/services/${service.slug}`;
}

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
  industryGroups,
  migrations,
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
            <div className="relative grid lg:grid-cols-4">
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
                        key={`${group.group}-${service.title}`}
                        className="relative"
                        data-hover-cell
                        onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
                      >
                        <Link
                          href={serviceHref(service)}
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
            </div>
          ) : type === "industries" ? (
            <div className="relative grid lg:grid-cols-3">
              {industryGroups.map((group, index) => (
                <div
                  key={group.category}
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
                    <Link
                      href={`/industries/${group.parent.slug}`}
                      onClick={onNavigate}
                      className={cn("zn-label block px-6 py-4 transition-opacity hover:opacity-70", labelClass)}
                    >
                      {group.parent.title}
                    </Link>
                  </div>
                  <ul>
                    {group.industries.map((industry) => (
                      <li
                        key={industry.slug}
                        className="relative"
                        data-hover-cell
                        onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
                      >
                        <Link
                          href={`/industries/${industry.slug}`}
                          onClick={onNavigate}
                          className="relative z-[1] block px-6 py-3.5"
                        >
                          <span className={cn("block text-[0.9rem] font-normal", titleClass)}>
                            {industry.title}
                          </span>
                          <span className={cn("mt-1 block text-[0.78rem] leading-snug", bodyClass)}>
                            {industry.hook}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative grid lg:grid-cols-2">
              {migrations.map((item, index) => (
                <div
                  key={item.slug}
                  className={cn(
                    "relative",
                    index % 2 === 1 && cn("border-l", borderClass),
                    index >= 2 && cn("border-t", borderClass),
                  )}
                >
                  {index % 2 === 1 && <ColumnCrosses theme={theme} showTop={index < 2} />}
                  <Link
                    href={`/migrations/${item.slug}`}
                    onClick={onNavigate}
                    data-hover-cell
                    onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
                    className="relative z-[1] block px-6 py-4"
                  >
                    <span className={cn("block text-[0.9rem] font-normal", titleClass)}>
                      {item.title}
                    </span>
                    <span className={cn("mt-1 block text-[0.78rem] leading-snug", bodyClass)}>
                      {item.shortDescription}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
