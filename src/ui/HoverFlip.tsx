"use client";

import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 18;

const FLIP =
  "block transition-[translate] duration-500 ease-[var(--ease-flip)] will-change-[translate] motion-reduce:transition-none motion-reduce:group-hover/flip:translate-y-0";

/**
 * Split-letter hover flip for nav/footer/button links.
 *
 * When `decorative` is true, the parent link must provide `aria-label` —
 * crawlers and screen readers get one clean label; letters are visual only.
 */
export function HoverFlip({
  children,
  className,
  decorative = false,
}: {
  children: React.ReactNode;
  className?: string;
  decorative?: boolean;
}) {
  if (typeof children !== "string") {
    return (
      <span className={cn("inline-block align-bottom leading-none", className)}>
        {children}
      </span>
    );
  }

  const chars = [...children];

  if (decorative) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-flex items-end leading-none", className)}
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
    );
  }

  return (
    <span className={cn("inline-block align-bottom leading-none", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-flex items-end motion-reduce:hidden">
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
      <span className="hidden motion-reduce:inline">{children}</span>
    </span>
  );
}
