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

/** CSS-only hover — no Framer springs, SVG paths, or pointer hit-testing. */
function GridSection({
  items,
  columns = 3,
}: {
  items: IndustriesGridItem[];
  columns?: 3 | 5;
}) {
  const rows = Math.max(1, Math.ceil(items.length / columns));

  return (
    <div className="relative [contain:layout_paint]">
      <div className="pointer-events-none absolute inset-0">
        <BlueprintGridCrosses columns={columns} rows={rows} />
      </div>

      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2" />
      <BlueprintCross anchor="right" className="bottom-0 translate-y-1/2" />

      <div
        className={cn(
          "relative grid grid-cols-1",
          columns === 3 && "lg:grid-cols-3",
          columns === 5 && "lg:grid-cols-5",
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.href}
            className={cn(
              "group/cell relative flex min-h-[9rem] h-full lg:min-h-[10rem]",
              index % columns !== 0 && "lg:border-l border-zn-border",
              index > 0 && "border-t lg:border-t-0 border-zn-border",
              index >= columns && "lg:border-t border-zn-border",
            )}
          >
            {index % columns !== 0 && (
              <ColumnCrosses showTop={index < columns} />
            )}
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
