"use client";

import Link from "next/link";
import { useRef } from "react";
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
import type { Migration } from "@/lib/content/migrations";
import type { NavMenuGroup } from "@/lib/content/nav-menu";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  type: "services" | "industries" | "migrations";
  serviceNavGroups: NavMenuGroup[];
  industryNavGroups: NavMenuGroup[];
  migrations: Migration[];
  theme?: "light" | "dark";
  onNavigate: () => void;
};

const HIGHLIGHT_LIGHT_FILL = "var(--color-zn-bg-3)";
const HIGHLIGHT_LIGHT_FILL_OPACITY = 0.7;
const HIGHLIGHT_DARK_FILL = "var(--color-zn-dark-2)";
const HIGHLIGHT_DARK_FILL_OPACITY = 0.9;

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

function NavMenuItemLink({
  href,
  title,
  shortDescription,
  titleClass,
  bodyClass,
  onNavigate,
  highlight,
  className,
}: {
  href: string;
  title: string;
  shortDescription: string;
  titleClass: string;
  bodyClass: string;
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      data-hover-cell
      onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
      className={cn("relative z-[1] block px-6 py-3.5", className)}
    >
      <span className={cn("block text-[0.9rem] font-normal leading-snug", titleClass)}>
        {title}
      </span>
      <span className={cn("mt-1 block text-[0.78rem] leading-snug", bodyClass)}>
        {shortDescription}
      </span>
    </Link>
  );
}

function NavColumn({
  group,
  index,
  theme,
  borderClass,
  labelClass,
  titleClass,
  bodyClass,
  onNavigate,
  highlight,
}: {
  group: NavMenuGroup;
  index: number;
  theme: "light" | "dark";
  borderClass: string;
  labelClass: string;
  titleClass: string;
  bodyClass: string;
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
}) {
  return (
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
        {group.items.map((item) => (
          <li key={`${group.group}-${item.title}`} className="relative">
            <NavMenuItemLink
              href={item.href}
              title={item.title}
              shortDescription={item.shortDescription}
              titleClass={titleClass}
              bodyClass={bodyClass}
              onNavigate={onNavigate}
              highlight={highlight}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaMenu({
  type,
  serviceNavGroups,
  industryNavGroups,
  migrations,
  theme = "light",
  onNavigate,
}: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const highlight = useRubberHoverHighlight();
  useBlueprintReveal(panelRef, "mount");

  const isDark = theme === "dark";
  const borderClass = isDark ? "border-zn-border-dk" : "border-zn-border";
  const lineClass = isDark ? blueprintDarkLineClass : "bg-zn-border";
  const labelClass = isDark ? "text-zn-inv-2" : "text-zn-text-3";
  const titleClass = isDark ? "text-zn-inv" : "text-zn-text";
  const bodyClass = isDark ? "text-zn-inv-2" : "text-zn-text-2";

  const columnProps = {
    theme,
    borderClass,
    labelClass,
    titleClass,
    bodyClass,
    onNavigate,
    highlight,
  };

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
            <div className="relative grid lg:grid-cols-5">
              {serviceNavGroups.map((group, index) => (
                <NavColumn key={group.group} group={group} index={index} {...columnProps} />
              ))}
            </div>
          ) : type === "industries" ? (
            <div className="relative grid lg:grid-cols-3">
              {industryNavGroups.map((group, index) => (
                <NavColumn key={group.group} group={group} index={index} {...columnProps} />
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
                  <NavMenuItemLink
                    href={`/migrations/${item.slug}`}
                    title={item.title}
                    shortDescription={item.shortDescription}
                    titleClass={titleClass}
                    bodyClass={bodyClass}
                    onNavigate={onNavigate}
                    highlight={highlight}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
