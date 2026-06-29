import { cn } from "@/lib/utils";

type BlueprintCrossProps = {
  /** Anchor to left guide, right guide, or a horizontal position (%). */
  anchor?: "left" | "right" | number;
  className?: string;
  style?: React.CSSProperties;
  theme?: "light" | "dark";
} & React.ComponentPropsWithoutRef<"span">;

/** Small + marker for blueprint guide intersections. */
export function BlueprintCross({
  anchor = "left",
  className,
  style,
  theme = "light",
  ...props
}: BlueprintCrossProps) {
  const strokeClass =
    theme === "dark" ? "bg-zn-inv-2/90" : "bg-zn-text-3/65";
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
        "pointer-events-none absolute z-[2] size-2.5 max-lg:hidden",
        anchorClass,
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-1/2 top-0 h-full w-px -translate-x-1/2",
          strokeClass,
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-px w-full -translate-y-1/2",
          strokeClass,
        )}
      />
    </span>
  );
}
