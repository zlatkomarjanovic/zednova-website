"use client";

import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 18;

/**
 * Split-letter hover flip for nav/footer/button links.
 *
 * Crawlers get one clean label via `.sr-only`. Decorative letters use
 * `data-char` + CSS `::before`/`::after` — no letter text nodes in the DOM.
 * The `.hover-flip-char::before` pseudo-element always renders the letter
 * visually (including reduced-motion), so no duplicate fallback text is needed.
 */
export function HoverFlip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  /** @deprecated Ignored — sr-only + data-char rendering is always used. */
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

  return (
    <span className={cn("inline-block align-bottom leading-none", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="hover-flip">
        {chars.map((char, index) => (
          <span
            key={`${index}-${char}`}
            className="hover-flip-char"
            data-char={char === " " ? "\u00A0" : char}
            style={{
              transitionDelay: `${index * FLIP_STAGGER_MS}ms`,
              ...(char === " " ? { minWidth: "0.35em" } : undefined),
            }}
          />
        ))}
      </span>
    </span>
  );
}
