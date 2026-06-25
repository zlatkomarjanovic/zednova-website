"use client";

import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 10;

const FLIP =
  "block transition-[transform,opacity] duration-500 ease-[var(--ease-flip)] will-change-transform motion-reduce:transition-none";

/**
 * Dual-layer hover text: crawlers and screen readers get one normal string in
 * the DOM; the split-letter flip runs in an aria-hidden decorative overlay.
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
        <span
          className={cn(
            FLIP,
            "group-hover/flip:-translate-y-full group-hover/flip:opacity-0 motion-reduce:group-hover/flip:translate-y-0 motion-reduce:group-hover/flip:opacity-100",
          )}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 block translate-y-full",
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
    <span className={cn("relative inline-block align-bottom", className)}>
      <span
        className={cn(
          "inline-block",
          FLIP,
          "group-hover/flip:-translate-y-full group-hover/flip:opacity-0 motion-reduce:group-hover/flip:translate-y-0 motion-reduce:group-hover/flip:opacity-100",
        )}
      >
        {children}
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 inline-flex motion-reduce:hidden"
      >
        {[...children].map((char, index) => (
          <span
            key={`${index}-${char}`}
            className="relative inline-block overflow-hidden"
          >
            <span
              className={cn(
                FLIP,
                "translate-y-full group-hover/flip:translate-y-0",
              )}
              style={{ transitionDelay: `${index * FLIP_STAGGER_MS}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
