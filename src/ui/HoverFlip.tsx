"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 18;
const MOBILE_MQ = "(max-width: 1023px)";

function subscribeMobileMq(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getMobileMqSnapshot() {
  return window.matchMedia(MOBILE_MQ).matches;
}

function getMobileMqServerSnapshot() {
  return false;
}

function useMobileTouchUi() {
  return useSyncExternalStore(subscribeMobileMq, getMobileMqSnapshot, getMobileMqServerSnapshot);
}

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
  const mobileTouchUi = useMobileTouchUi();

  if (typeof children !== "string") {
    return (
      <span className={cn("inline-block align-bottom leading-none", className)}>
        {children}
      </span>
    );
  }

  if (mobileTouchUi) {
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
