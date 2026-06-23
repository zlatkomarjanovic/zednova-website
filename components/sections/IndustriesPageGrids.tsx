import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { BlueprintGridCrosses } from "@/components/shared/BlueprintGridCrosses";
import { Icon } from "@/components/shared/Icon";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { cn } from "@/lib/utils";

export type IndustriesGridItem = {
  href: string;
  title: string;
  description: string;
  icon?: string;
};

export type IndustriesGroupSection = {
  id: string;
  parentTitle: string;
  parentSlug: string;
  headline: string;
  description: string;
  items: IndustriesGridItem[];
};

function chunkRows<T>(items: T[], columns: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return rows;
}

function ColumnCrosses({ showTop = true }: { showTop?: boolean }) {
  return (
    <>
      {showTop && (
        <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      )}
      <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2" />
    </>
  );
}

function GridCell({
  item,
  showLeftBorder,
  showTopBorder,
  showColumnCrosses,
}: {
  item: IndustriesGridItem;
  showLeftBorder: boolean;
  showTopBorder: boolean;
  showColumnCrosses: boolean;
}) {
  return (
    <div
      className={cn(
        "group/cell relative flex min-h-[9rem] min-w-0 flex-1 lg:min-h-[10rem]",
        showLeftBorder && "lg:border-l border-zn-border",
        showTopBorder && "border-t lg:border-t-0 border-zn-border",
      )}
    >
      {showColumnCrosses && <ColumnCrosses showTop={showTopBorder} />}
      <Link
        href={item.href}
        className="relative z-[1] flex h-full w-full flex-col bg-zn-bg px-6 py-5 transition-colors duration-200 ease-out group-hover/cell:bg-zn-bg-3 md:px-7 md:py-6"
      >
        {item.icon ? (
          <Icon
            name={item.icon}
            className="mb-3 size-6 shrink-0 text-zn-text"
          />
        ) : null}
        <span className="block text-[0.9rem] font-normal leading-snug text-zn-text md:text-base">
          {item.title}
        </span>
        <span className="mt-2 block line-clamp-3 text-[0.8125rem] leading-relaxed text-zn-text-2">
          {item.description}
        </span>
      </Link>
    </div>
  );
}

/** Flex rows so partial last rows stretch cells to fill the full width. */
function GridSection({
  items,
  columns = 3,
}: {
  items: IndustriesGridItem[];
  columns?: 3 | 5;
}) {
  const desktopRows = chunkRows(items, columns);
  const rowCount = Math.max(1, desktopRows.length);

  return (
    <div className="relative [contain:layout_paint]">
      <div className="pointer-events-none absolute inset-0 max-lg:hidden">
        <BlueprintGridCrosses columns={columns} rows={rowCount} />
      </div>

      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2" />
      <BlueprintCross anchor="right" className="bottom-0 translate-y-1/2" />

      {/* Mobile — single column stack */}
      <div className="relative flex flex-col lg:hidden">
        {items.map((item, index) => (
          <GridCell
            key={item.href}
            item={item}
            showLeftBorder={false}
            showTopBorder={index > 0}
            showColumnCrosses={false}
          />
        ))}
      </div>

      {/* Desktop — flex rows; partial rows divide width evenly */}
      <div className="relative hidden flex-col lg:flex">
        {desktopRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "flex w-full",
              rowIndex > 0 && "border-t border-zn-border",
            )}
          >
            {row.map((item, colIndex) => (
              <GridCell
                key={item.href}
                item={item}
                showLeftBorder={colIndex > 0}
                showTopBorder={false}
                showColumnCrosses={colIndex > 0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function IndustriesPageGrids({
  groups,
  allIndustries,
}: {
  groups: IndustriesGroupSection[];
  allIndustries: IndustriesGridItem[];
}) {
  return (
    <>
      {groups.map((group) => (
        <div
          key={group.id}
          className="border-b border-zn-border [content-visibility:auto]"
        >
          <div className="zn-container-inset border-b border-zn-border py-12 lg:py-14">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <SectionLabel withRule={false}>{group.parentTitle}</SectionLabel>
                <h2 className="mt-5 zn-h2 font-sans font-normal">{group.headline}</h2>
                <p className="zn-prose mt-5 max-w-lg">{group.description}</p>
              </div>
              <Link
                href={`/industries/${group.parentSlug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zn-text"
              >
                <span className="zn-underline">Explore {group.parentTitle}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <GridSection items={group.items} columns={3} />
        </div>
      ))}

      <div className="[content-visibility:auto]">
        <div className="zn-container-inset border-b border-zn-border py-12 lg:py-14">
          <SectionLabel withRule={false}>All industries</SectionLabel>
          <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal">
            More teams we build for
          </h2>
          <p className="zn-prose mt-5 max-w-lg">
            Beyond our three focus areas, we ship websites, stores, and
            automations for a wide range of teams. If yours is not listed, ask
            — we have likely built something close.
          </p>
        </div>

        <GridSection items={allIndustries} columns={3} />
      </div>
    </>
  );
}
