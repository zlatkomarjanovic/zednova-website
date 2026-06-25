"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FLIP_STAGGER_MS = 10;

const FLIP =
  "block transition-transform duration-500 ease-[var(--ease-flip)] will-change-transform motion-reduce:transition-none";

/**
 * SSR and non-JS crawlers receive plain text. After hydration, the character
 * flip animation renders in an aria-hidden layer while the real label stays
 * in the DOM as normal text for crawlers (visually covered by the animation).
 */
export function HoverFlip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setEnhanced(true);
  }, []);

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

  if (!enhanced) {
    return <span className={cn("inline-block align-bottom", className)}>{children}</span>;
  }

  return (
    <span className={cn("relative inline-flex align-bottom", className)}>
      <span className="absolute left-0 top-0 h-px w-px overflow-hidden whitespace-nowrap opacity-0">
        {children}
      </span>
      <span aria-hidden="true" className="relative inline-flex">
        {[...children].map((char, index) => (
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
                "translate-y-full group-hover/flip:translate-y-0 motion-reduce:hidden",
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
