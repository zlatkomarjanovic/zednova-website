"use client";

import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 10;
const FLIP_DURATION = "duration-500";
const FLIP_EASE = "ease-[var(--ease-flip)]";

const BASE =
  "inline-block transition-[transform,opacity] will-change-transform motion-reduce:transition-none";

/**
 * Dual-layer hover text: crawlers and screen readers get one normal string in
 * the DOM; the split-letter flip runs in an aria-hidden decorative overlay.
 *
 * Base layer is visible by default and slides up + fades out on hover.
 * Animated overlay letters start below and slide up into view with a stagger.
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
          "relative inline-block overflow-hidden align-bottom",
          className,
        )}
      >
        <span
          className={cn(
            BASE,
            FLIP_DURATION,
            FLIP_EASE,
            "group-hover/flip:-translate-y-full group-hover/flip:opacity-0 motion-reduce:group-hover/flip:translate-y-0 motion-reduce:group-hover/flip:opacity-100",
          )}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 block translate-y-full",
            BASE,
            FLIP_DURATION,
            FLIP_EASE,
            "group-hover/flip:translate-y-0 motion-reduce:hidden",
          )}
        >
          {children}
        </span>
      </span>
    );
  }

  const chars = [...children];

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden align-bottom",
        className,
      )}
    >
      {/* Base: full readable string for crawlers + screen readers. Slides up + fades on hover. */}
      <span
        className={cn(
          BASE,
          FLIP_DURATION,
          FLIP_EASE,
          "group-hover/flip:-translate-y-full group-hover/flip:opacity-0 motion-reduce:group-hover/flip:translate-y-0 motion-reduce:group-hover/flip:opacity-100",
        )}
      >
        {children}
      </span>

      {/* Animated overlay: per-char flip, aria-hidden, decorative. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 inline-flex motion-reduce:hidden"
      >
        {chars.map((char, index) => (
          <span
            key={`${index}-${char}`}
            className="relative inline-block overflow-hidden"
          >
            <span
              className={cn(
                BASE,
                FLIP_DURATION,
                FLIP_EASE,
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
