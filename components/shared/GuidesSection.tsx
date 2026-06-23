import { cn } from "@/lib/utils";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import {
  BlueprintGuides,
  type BlueprintReveal,
} from "@/components/shared/BlueprintGuides";

type GuidesSectionProps = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  reveal?: BlueprintReveal;
  /** Render the inner content inside zn-container-inset (with horizontal padding). */
  inset?: boolean;
  /** Show the top border line across the guide column. */
  topBorder?: boolean;
  /** Show the bottom border line across the guide column. */
  bottomBorder?: boolean;
  /** Extra classes on the outer section. */
  className?: string;
  /** Extra classes on the inner content wrapper. */
  innerClassName?: string;
};

/**
 * Homepage-style framed section: vertical guide lines on the sides, edge
 * crosses at the corners, optional top/bottom border lines, and a content
 * column that aligns with zn-container. Use this to give any page the same
 * "container side-lines" treatment the homepage has.
 */
export function GuidesSection({
  children,
  theme = "light",
  reveal = "scroll",
  inset = true,
  topBorder = true,
  bottomBorder = false,
  className,
  innerClassName,
}: GuidesSectionProps) {
  const dark = theme === "dark";
  const borderColor = dark ? "border-zn-border-dk" : "border-zn-border";

  return (
    <section
      data-theme={theme}
      data-bg={dark ? "dark" : undefined}
      className={cn(
        "relative",
        dark && "bg-zn-dark text-zn-inv",
        className,
      )}
    >
      {dark && (
        <>
          <div
            className="zn-blueprint-grid absolute inset-0 opacity-[0.22]"
            aria-hidden="true"
          />
          <div className="zn-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        </>
      )}
      <BlueprintGuides
        theme={theme}
        reveal={reveal}
        showEdgeCrosses
        className="z-0"
      />
      <div className="zn-container-guides relative z-10">
        {topBorder && (
          <div className={cn("border-t", borderColor)} aria-hidden="true" />
        )}
        <div className={cn(inset && "zn-container-inset", innerClassName)}>
          {children}
        </div>
        {bottomBorder && (
          <div className={cn("border-t", borderColor)} aria-hidden="true" />
        )}
      </div>
    </section>
  );
}

/** Edge crosses for manual placement (kept for parity with existing pages). */
export { BlueprintCross };
