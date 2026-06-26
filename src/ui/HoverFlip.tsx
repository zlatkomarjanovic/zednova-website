"use client";

import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 18;

const FLIP =
  "block transition-[translate] duration-500 ease-[var(--ease-flip)] will-change-[translate] motion-reduce:transition-none motion-reduce:group-hover/flip:translate-y-0";

function SplitLetters({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const chars = [...text];

  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex items-end leading-none motion-reduce:hidden", className)}
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

/**
 * Split-letter hover flip for nav/footer/button links.
 *
 * Crawlers and screen readers get one clean label via `.sr-only`.
 * Split letters are decorative only (`aria-hidden`).
 */
export function HoverFlip({
  children,
  className,
  decorative = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** @deprecated All usages now use sr-only + aria-hidden split letters. */
  decorative?: boolean;
}) {
  void decorative;

  if (typeof children !== "string") {
    return (
      <span className={cn("inline-block align-bottom leading-none", className)}>
        {children}
      </span>
    );
  }

  return (
    <span className={cn("inline-block align-bottom leading-none", className)}>
      <span className="sr-only">{children}</span>
      <SplitLetters text={children} />
      <span className="hidden motion-reduce:inline">{children}</span>
    </span>
  );
}
