import Link from "next/link";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { Icon } from "@/components/shared/Icon";
import { cn } from "@/lib/utils";

export type TableGridItem = {
  href: string;
  title: string;
  description: string;
  icon?: string;
};

function chunkRows<T>(items: T[], columns: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return rows;
}

function ColumnDividerCrosses({
  showTop,
  showBottom,
}: {
  showTop: boolean;
  showBottom: boolean;
}) {
  return (
    <>
      {showTop && (
        <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      )}
      {showBottom && (
        <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2" />
      )}
    </>
  );
}

function GridCell({
  item,
  showLeftBorder,
  showTopBorder,
  showDividerTop,
  showDividerBottom,
}: {
  item: TableGridItem;
  showLeftBorder: boolean;
  showTopBorder: boolean;
  showDividerTop: boolean;
  showDividerBottom: boolean;
}) {
  return (
    <div
      className={cn(
        "group/cell relative flex min-h-[9rem] min-w-0 flex-1 lg:min-h-[10rem]",
        showLeftBorder && "lg:border-l border-zn-border",
        showTopBorder && "border-t lg:border-t-0 border-zn-border",
      )}
    >
      {showLeftBorder && (
        <ColumnDividerCrosses
          showTop={showDividerTop}
          showBottom={showDividerBottom}
        />
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
  );
}

/** Flex rows — partial last rows stretch cells; crosses only at real dividers. */
export function BlueprintTableGrid({
  items,
  columns = 3,
}: {
  items: TableGridItem[];
  columns?: 3 | 5;
}) {
  const desktopRows = chunkRows(items, columns);

  return (
    <div className="relative [contain:layout_paint]">
      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2" />
      <BlueprintCross anchor="right" className="bottom-0 translate-y-1/2" />

      <div className="relative flex flex-col lg:hidden">
        {items.map((item, index) => (
          <GridCell
            key={item.href}
            item={item}
            showLeftBorder={false}
            showTopBorder={index > 0}
            showDividerTop={false}
            showDividerBottom={false}
          />
        ))}
      </div>

      <div className="relative hidden flex-col lg:flex">
        {desktopRows.map((row, rowIndex) => {
          const isLastRow = rowIndex === desktopRows.length - 1;
          const isPartialLastRow = isLastRow && row.length < columns;
          const showDividerBottom = !isPartialLastRow;

          return (
            <div
              key={rowIndex}
              className={cn(
                "relative flex w-full",
                rowIndex > 0 && "border-t border-zn-border",
              )}
            >
              {rowIndex > 0 && (
                <>
                  <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
                  <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />
                </>
              )}

              {row.map((item, colIndex) => (
                <GridCell
                  key={item.href}
                  item={item}
                  showLeftBorder={colIndex > 0}
                  showTopBorder={false}
                  showDividerTop={colIndex > 0 && rowIndex > 0}
                  showDividerBottom={colIndex > 0 && showDividerBottom}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
