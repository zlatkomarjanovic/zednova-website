"use client";

import { cn } from "@/lib/utils";

const FLIP =
  "block transition-transform duration-[420ms] ease-[var(--ease-flip)] will-change-transform motion-reduce:transition-none";

/**
 * Label swaps on hover character-by-character — each glyph rides up while a
 * duplicate rises from below. Trigger from any ancestor marked `group/flip`.
 */
export function HoverFlip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (typeof children !== "string") {
    return (
      <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
        <span className={cn(FLIP, "group-hover/flip:-translate-y-full")}>{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 block translate-y-full",
            FLIP,
            "group-hover/flip:translate-y-0 motion-reduce:hidden",
          )}
        >
          {children}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex align-bottom", className)} aria-label={children}>
      {[...children].map((char, index) => (
        <span
          key={`${index}-${char}`}
          className="relative inline-block overflow-hidden"
          aria-hidden="true"
        >
          <span
            className={cn(FLIP, "group-hover/flip:-translate-y-full")}
            style={{ transitionDelay: `${index * 22}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 top-0",
              FLIP,
              "translate-y-full group-hover/flip:translate-y-0 motion-reduce:hidden",
            )}
            style={{ transitionDelay: `${index * 22}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
