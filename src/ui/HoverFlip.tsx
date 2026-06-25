"use client";

import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 18;

/** Tailwind v4 drives motion via the `translate` property — not `transform`. */
const FLIP =
  "block transition-[translate,opacity] duration-500 ease-[var(--ease-flip)] will-change-[translate,opacity] motion-reduce:transition-none";

/**
 * Dual-layer hover text:
 * - Base: one normal string in the DOM (crawlers, screen readers, default visual)
 * - Overlay: split-letter flip in aria-hidden layer (visible on hover)
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
      <span
        className={cn(
          "relative inline-block overflow-hidden align-bottom leading-none",
          className,
        )}
      >
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
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-0 group-hover/flip:opacity-100 motion-reduce:hidden",
          )}
        >
          <span
            className={cn(
              "block translate-y-full",
              FLIP,
              "group-hover/flip:translate-y-0",
            )}
          >
            {children}
          </span>
        </span>
      </span>
    );
  }

  const chars = [...children];

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden align-bottom leading-none",
        className,
      )}
    >
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
        className={cn(
          "pointer-events-none absolute inset-0 inline-flex opacity-0 transition-opacity duration-0 group-hover/flip:opacity-100 motion-reduce:hidden",
        )}
      >
        {chars.map((char, index) => (
          <span
            key={`${index}-${char}`}
            className="relative inline-block overflow-hidden"
          >
            <span
              className={cn(FLIP, "group-hover/flip:-translate-y-full")}
              style={{ transitionDelay: `${index * FLIP_STAGGER_MS}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            <span
              className={cn(
                "absolute inset-x-0 top-0",
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
