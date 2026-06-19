import { cn } from "@/lib/utils";

type BlueprintCrossProps = {
  /** Anchor to left guide, right guide, or a horizontal position (%). */
  anchor?: "left" | "right" | number;
  className?: string;
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<"span">;

/** Small + marker for blueprint guide intersections. */
export function BlueprintCross({
  anchor = "left",
  className,
  style,
  ...props
}: BlueprintCrossProps) {
  const anchorClass =
    anchor === "left"
      ? "left-0 -translate-x-1/2"
      : anchor === "right"
        ? "right-0 translate-x-1/2"
        : "-translate-x-1/2";

  const anchorStyle =
    typeof anchor === "number" ? { left: `${anchor}%`, ...style } : style;

  return (
    <span
      aria-hidden="true"
      {...props}
      style={anchorStyle}
      className={cn(
        "pointer-events-none absolute z-[2] size-2.5",
        anchorClass,
        className,
      )}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zn-text-3/65" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zn-text-3/65" />
    </span>
  );
}
