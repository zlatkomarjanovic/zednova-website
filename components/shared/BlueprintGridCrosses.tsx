import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { cn } from "@/lib/utils";

function anchorAt(pct: number) {
  if (pct === 0) return "left" as const;
  if (pct === 100) return "right" as const;
  return pct;
}

/** + markers at grid line intersections (column dividers × row dividers). */
export function BlueprintGridCrosses({
  columns,
  rows = 1,
  omitEdgeRows = false,
  className,
}: {
  columns: number;
  rows?: number;
  omitEdgeRows?: boolean;
  className?: string;
}) {
  const colStops = Array.from({ length: columns + 1 }, (_, i) => (i / columns) * 100);
  const rowStops = Array.from(
    { length: rows + 1 },
    (_, i) => (i / rows) * 100,
  ).filter((pct) => !omitEdgeRows || (pct > 0 && pct < 100));

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {rowStops.flatMap((rowPct) =>
        colStops.map((colPct) => (
          <BlueprintCross
            key={`${rowPct}-${colPct}`}
            anchor={anchorAt(colPct)}
            className="-translate-y-1/2"
            style={{ top: `${rowPct}%` }}
          />
        )),
      )}
    </div>
  );
}

/** + markers at left/right edges for each horizontal divider in a stacked list. */
export function BlueprintListCrosses({ count }: { count: number }) {
  if (count <= 1) {
    return (
      <>
        <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
        <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />
        <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2" />
        <BlueprintCross anchor="right" className="bottom-0 translate-y-1/2" />
      </>
    );
  }

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const topPct = (i / count) * 100;
        return (
          <span key={i}>
            <BlueprintCross
              anchor="left"
              className="-translate-y-1/2"
              style={{ top: `${topPct}%` }}
            />
            <BlueprintCross
              anchor="right"
              className="-translate-y-1/2"
              style={{ top: `${topPct}%` }}
            />
          </span>
        );
      })}
    </>
  );
}
