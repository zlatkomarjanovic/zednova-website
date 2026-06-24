"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { BlueprintCross } from "@/ui/BlueprintCross";
import { cn } from "@/lib/utils";

/** Shared dark blueprint stroke — matches testimonial grid borders. */
export const blueprintDarkLineClass = "bg-zn-border-dk";

export type BlueprintReveal = "immediate" | "scroll" | "mount" | "none";

type BlueprintGuidesProps = {
  className?: string;
  reveal?: BlueprintReveal;
  showEdgeCrosses?: boolean;
  theme?: "light" | "dark";
  /** Internal vertical divider positions as % of the guide column. */
  columnDividers?: number[];
};

export function useBlueprintReveal(
  scope: React.RefObject<HTMLElement | null>,
  reveal: BlueprintReveal,
) {
  useGSAP(
    () => {
      if (reveal === "none" || !scope.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lines = scope.current.querySelectorAll<HTMLElement>("[data-blueprint-line]");
      const crosses = scope.current.querySelectorAll<HTMLElement>("[data-blueprint-cross]");

      if (reduce) {
        gsap.set([...lines, ...crosses], { opacity: 1 });
        return;
      }

      gsap.set([...lines, ...crosses], { opacity: 0 });

      const fadeIn = () => {
        gsap.to([...lines, ...crosses], {
          opacity: 1,
          duration: 0.5,
          stagger: 0.035,
          ease: "power2.out",
        });
      };

      if (reveal === "immediate" || reveal === "mount") {
        fadeIn();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top 90%",
        once: true,
        onEnter: fadeIn,
      });
    },
    { scope },
  );
}

/** Vertical container guides with optional ticks, panel dividers, and + markers. */
export function BlueprintGuides({
  className,
  reveal = "scroll",
  showEdgeCrosses = false,
  theme = "light",
  columnDividers = [],
}: BlueprintGuidesProps) {
  const ref = useRef<HTMLDivElement>(null);
  useBlueprintReveal(ref, reveal);

  const lineClass =
    theme === "dark" ? blueprintDarkLineClass : "bg-zn-border/80";
  const lineClassSolid =
    theme === "dark" ? blueprintDarkLineClass : "bg-zn-border";

  const dividerCrosses = columnDividers.flatMap((pct) => [
    { key: `${pct}-top`, pct, edge: "top" as const },
    { key: `${pct}-bottom`, pct, edge: "bottom" as const },
  ]);

  const edgeCrosses = [
    { anchor: "left" as const, edge: "top" as const },
    { anchor: "right" as const, edge: "top" as const },
    { anchor: "left" as const, edge: "bottom" as const },
    { anchor: "right" as const, edge: "bottom" as const },
  ];

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="zn-container-guides relative h-full">
        <div
          data-blueprint-line
          className={cn("absolute bottom-0 top-0 left-0 w-px", lineClass)}
        />
        <div
          data-blueprint-line
          className={cn("absolute bottom-0 top-0 right-0 w-px", lineClass)}
        />

        {columnDividers.map((pct) => (
          <div
            key={pct}
            data-blueprint-line
            className={cn("absolute bottom-0 top-0 w-px -translate-x-1/2", lineClassSolid)}
            style={{ left: `${pct}%` }}
          />
        ))}

        {columnDividers.length > 0 && (
          <>
            <div
              data-blueprint-line
              className={cn("absolute left-0 right-0 top-0 h-px", lineClassSolid)}
            />
            <div
              data-blueprint-line
              className={cn("absolute bottom-0 left-0 right-0 h-px", lineClassSolid)}
            />
          </>
        )}

        {showEdgeCrosses &&
          edgeCrosses.map(({ anchor, edge }) => (
            <BlueprintCross
              key={`${anchor}-${edge}`}
              anchor={anchor}
              theme={theme}
              data-blueprint-cross
              className={edge === "top" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"}
            />
          ))}

        {dividerCrosses.map(({ key, pct, edge }) => (
          <BlueprintCross
            key={key}
            anchor={pct}
            theme={theme}
            data-blueprint-cross
            className={edge === "top" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"}
          />
        ))}
      </div>
    </div>
  );
}
