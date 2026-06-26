"use client";

import Link from "next/link";
import { useRef } from "react";
import { BlueprintCross } from "@/ui/BlueprintCross";
import {
  BlueprintGuides,
  blueprintDarkLineClass,
  useBlueprintReveal,
} from "@/ui/BlueprintGuides";
import {
  RubberHoverHighlightLayer,
  useRubberHoverHighlight,
} from "@/ui/HoverHighlight";
import type { Migration } from "@/lib/types/content-nav";
import type { NavMenuItem, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import { MigrationPlatformPill } from "@/ui/MigrationPlatformPill";
import { NavMenuIcon } from "@/ui/NavMenuIcon";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  type: "services" | "industries" | "custom-software" | "migrations";
  industryNavItems: NavMenuItem[];
  customSoftwareNavItems: NavMenuItem[];
  migrations: Migration[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
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

function MigrationNavMenuItemLink({
  item,
  titleClass,
  bodyClass,
  theme,
  onNavigate,
  highlight,
}: {
  item: Migration;
  titleClass: string;
  bodyClass: string;
  theme: "light" | "dark";
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
}) {
  return (
    <Link
      href={`/migrations/${item.slug}`}
      onClick={onNavigate}
      data-hover-cell
      onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
      className="relative z-[1] block px-6 py-3.5"
    >
      {item.platformIcons && (
        <MigrationPlatformPill
          from={item.platformIcons.from}
          to={item.platformIcons.to}
          theme={theme}
          className="mb-2.5"
        />
      )}
      <span className={cn("block text-[0.9rem] font-normal leading-snug", titleClass)}>
        {item.title}
      </span>
      <span className={cn("mt-1 block text-[0.78rem] leading-snug", bodyClass)}>
        {item.shortDescription}
      </span>
    </Link>
  );
}

function NavMenuItemLink({
  href,
  title,
  shortDescription,
  icon,
  theme = "light",
  titleClass,
  bodyClass,
  onNavigate,
  highlight,
  className,
  interactive = true,
}: {
  href: string;
  title: string;
  shortDescription: string;
  icon?: { src: string; alt: string };
  theme?: "light" | "dark";
  titleClass: string;
  bodyClass: string;
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      {...(interactive
        ? {
            "data-hover-cell": true,
            onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
              highlight.snapTo(e.currentTarget),
          }
        : {})}
      className={cn("relative z-[1] block px-6 py-3.5", className)}
    >
      {icon && (
        <NavMenuIcon src={icon.src} alt={icon.alt} theme={theme} className="mb-2.5" />
      )}
      <span className={cn("block text-[0.9rem] font-normal leading-snug", titleClass)}>
        {title}
      </span>
      <span className={cn("mt-1 block text-[0.78rem] leading-snug", bodyClass)}>
        {shortDescription}
      </span>
    </Link>
  );
}

function ServiceMegaCard({
  card,
  titleClass,
  bodyClass,
  labelClass,
  onNavigate,
  highlight,
  interactive = true,
  className,
}: {
  card: ServiceMegaMenuCard;
  titleClass: string;
  bodyClass: string;
  labelClass: string;
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={card.href}
      onClick={onNavigate}
      {...(interactive
        ? {
            "data-hover-cell": true,
            onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
              highlight.snapTo(e.currentTarget),
          }
        : {})}
      className={cn(
        "relative z-[1] flex h-full min-h-[11rem] w-full flex-col px-6 py-5 md:min-h-[10.5rem] md:py-6",
        className,
      )}
    >
      <span className={cn("block text-[0.95rem] font-normal leading-snug md:text-base", titleClass)}>
        {card.title}
      </span>
      <span className={cn("mt-2.5 block text-[0.8125rem] leading-relaxed md:text-[0.84rem]", bodyClass)}>
        {card.shortDescription}
      </span>
      <span className={cn("zn-label mt-auto block pt-5 text-[0.625rem] leading-relaxed", labelClass)}>
        Includes: {card.includes}
      </span>
    </Link>
  );
}

function ServiceMegaMenuGrid({
  cards,
  theme,
  borderClass,
  titleClass,
  bodyClass,
  labelClass,
  onNavigate,
  highlight,
}: {
  cards: ServiceMegaMenuCard[];
  theme: "light" | "dark";
  borderClass: string;
  titleClass: string;
  bodyClass: string;
  labelClass: string;
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
}) {
  const columns = 3;

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2">
      {cards.map((card, index) => (
        <div
          key={`service-${index}-${card.href}`}
          data-hover-cell
          onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
          className={cn(
            "relative flex h-full",
            index % columns !== 0 && cn("lg:border-l", borderClass),
            index > 0 && cn("border-t lg:border-t-0", borderClass),
            index >= columns && cn("lg:border-t", borderClass),
          )}
        >
          {index % columns !== 0 && (
            <ColumnCrosses theme={theme} showTop={index < columns} />
          )}
          <ServiceMegaCard
            card={card}
            titleClass={titleClass}
            bodyClass={bodyClass}
            labelClass={labelClass}
            onNavigate={onNavigate}
            highlight={highlight}
            interactive={false}
            className="flex h-full w-full flex-col"
          />
        </div>
      ))}
    </div>
  );
}

function IndustryMegaMenuGrid({
  items,
  theme,
  borderClass,
  titleClass,
  bodyClass,
  onNavigate,
  highlight,
}: {
  items: NavMenuItem[];
  theme: "light" | "dark";
  borderClass: string;
  titleClass: string;
  bodyClass: string;
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
}) {
  const columns = 3;
  const displayItems = items.slice(0, 6);

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2">
      {displayItems.map((item, index) => (
        <div
          key={`industry-${index}-${item.href}`}
          data-hover-cell
          onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
          className={cn(
            "relative flex h-full min-h-[10.5rem]",
            index % columns !== 0 && cn("lg:border-l", borderClass),
            index > 0 && cn("border-t lg:border-t-0", borderClass),
            index >= columns && cn("lg:border-t", borderClass),
          )}
        >
          {index % columns !== 0 && (
            <ColumnCrosses theme={theme} showTop={index < columns} />
          )}
          <NavMenuItemLink
            href={item.href}
            title={item.title}
            shortDescription={item.shortDescription}
            titleClass={titleClass}
            bodyClass={bodyClass}
            onNavigate={onNavigate}
            highlight={highlight}
            interactive={false}
            className="flex h-full w-full flex-col px-6 py-5 md:py-6"
          />
        </div>
      ))}
    </div>
  );
}

function NavItemGrid({
  items,
  columns,
  rows,
  theme,
  borderClass,
  titleClass,
  bodyClass,
  onNavigate,
  highlight,
  cellClassName,
}: {
  items: NavMenuItem[];
  columns: number;
  rows: number;
  theme: "light" | "dark";
  borderClass: string;
  titleClass: string;
  bodyClass: string;
  onNavigate: () => void;
  highlight: ReturnType<typeof useRubberHoverHighlight>;
  cellClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 lg:items-stretch",
        columns === 5 && "lg:grid-cols-5",
        columns === 4 && "lg:grid-cols-4",
        columns === 3 && "lg:grid-cols-3",
        rows === 3 && "lg:grid-rows-3",
        rows === 2 && "lg:grid-rows-2",
        rows === 1 && "lg:grid-rows-1",
      )}
    >
      {items.map((item, index) => (
        <div
          key={`nav-${index}-${item.href}`}
          data-hover-cell
          onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
          className={cn(
            cellClassName ?? "relative flex min-h-[9rem] h-full lg:min-h-[8.75rem]",
            index % columns !== 0 && cn("lg:border-l", borderClass),
            index > 0 && cn("border-t lg:border-t-0", borderClass),
            index >= columns && cn("lg:border-t", borderClass),
          )}
        >
          {index % columns !== 0 && (
            <ColumnCrosses theme={theme} showTop={index < columns} />
          )}
          <NavMenuItemLink
            href={item.href}
            title={item.title}
            shortDescription={item.shortDescription}
            icon={item.icon}
            theme={theme}
            titleClass={titleClass}
            bodyClass={bodyClass}
            onNavigate={onNavigate}
            highlight={highlight}
            interactive={false}
            className="flex h-full w-full flex-col"
          />
        </div>
      ))}
    </div>
  );
}

export function MegaMenu({
  type,
  industryNavItems,
  customSoftwareNavItems,
  migrations,
  serviceMegaMenuCards,
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
            <ServiceMegaMenuGrid
              cards={serviceMegaMenuCards}
              theme={theme}
              borderClass={borderClass}
              titleClass={titleClass}
              bodyClass={bodyClass}
              labelClass={labelClass}
              onNavigate={onNavigate}
              highlight={highlight}
            />
          ) : type === "industries" ? (
            <IndustryMegaMenuGrid
              items={industryNavItems}
              theme={theme}
              borderClass={borderClass}
              titleClass={titleClass}
              bodyClass={bodyClass}
              onNavigate={onNavigate}
              highlight={highlight}
            />
          ) : type === "custom-software" ? (
            <NavItemGrid
              items={customSoftwareNavItems}
              columns={5}
              rows={2}
              theme={theme}
              borderClass={borderClass}
              titleClass={titleClass}
              bodyClass={bodyClass}
              onNavigate={onNavigate}
              highlight={highlight}
            />
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
                  <MigrationNavMenuItemLink
                    item={item}
                    titleClass={titleClass}
                    bodyClass={bodyClass}
                    theme={theme}
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
