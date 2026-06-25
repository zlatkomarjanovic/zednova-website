"use client";

import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 18;

/** Tailwind v4 drives motion via the `translate` property — not `transform`. */
const FLIP =
  "block transition-[translate] duration-500 ease-[var(--ease-flip)] will-change-[translate] motion-reduce:transition-none motion-reduce:group-hover/flip:translate-y-0";

/**
 * Split-letter hover flip for nav/footer/button links.
 *
 * - One clean string in `.sr-only` for screen readers and crawlers
 * - Decorative letter animation in an `aria-hidden` layer (never a second readable copy)
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
      <span className={cn("inline-block align-bottom leading-none", className)}>
        {children}
      </span>
    );
  }

  const chars = [...children];

  return (
    <span
      className={cn("inline-block align-bottom leading-none", className)}
      data-label={children}
    >
      {/* Single canonical label — never duplicated in the visible layer */}
      <span
        className={cn(
          "sr-only",
          "motion-reduce:static motion-reduce:m-0 motion-reduce:h-auto motion-reduce:w-auto motion-reduce:overflow-visible motion-reduce:p-0 motion-reduce:[clip-path:none] motion-reduce:whitespace-normal motion-reduce:not-sr-only",
        )}
      >
        {children}
      </span>

      {/* Visual-only split-letter flip */}
      <span
        aria-hidden="true"
        className="inline-flex items-end motion-reduce:hidden"
      >
        {chars.map((char, index) => (
          <span
            key={`${index}-${char}`}
            className="relative inline-block h-[1.25em] overflow-hidden align-bottom"
            style={char === " " ? { minWidth: "0.35em" } : undefined}
          >
            <span
              className={cn(FLIP, "group-hover/flip:-translate-y-[115%]")}
              style={{ transitionDelay: `${index * FLIP_STAGGER_MS}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            <span
              className={cn(
                "absolute inset-x-0 top-0",
                FLIP,
                "translate-y-[115%] group-hover/flip:translate-y-0",
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
