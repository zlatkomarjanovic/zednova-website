"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Each item completes: “We build ___ for small businesses that want…” */
const HERO_BUILD_ITEMS = [
  "in-house software",
  "web or desktop applications",
  "marketing websites that convert",
  "headless ecommerce stores",
  "Shopify stores built to scale",
  "portals, forums, and membership sites",
  "landing pages that capture leads",
  "booking and follow-up automations",
  "CRM workflows on autopilot",
  "patient intake and clinic systems",
  "custom client portals",
  "client dashboards for growing teams",
  "mobile apps",
  "platform migrations without downtime",
  "AI chatbots and phone agents",
] as const;

/** Full static headline for crawlers, screen readers, and reduced-motion users. */
export const HERO_CRAWLABLE_H1 =
  "We build websites, custom software, automations, and AI tools for service businesses that want more leads with less manual work.";

const LOOP_MS = 3500;
const FIRST_CYCLE_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

const HEADING_CLASS =
  "max-w-4xl zn-h1 font-sans font-normal text-zn-text";

export function HeroRotatingHeadline() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const advance = () => {
      setIndex((i) => (i + 1) % HERO_BUILD_ITEMS.length);
    };

    timeoutId = setTimeout(() => {
      advance();
      intervalId = setInterval(advance, LOOP_MS);
    }, FIRST_CYCLE_MS);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return <h1 className={HEADING_CLASS}>{HERO_CRAWLABLE_H1}</h1>;
  }

  return (
    <h1 className={HEADING_CLASS}>
      {/* Crawlable copy — in DOM for bots; visually hidden when animation plays. */}
      <span className="sr-only">{HERO_CRAWLABLE_H1}</span>

      {/* Decorative animated headline — not read by crawlers or screen readers. */}
      <span aria-hidden="true">
        <span className="block">
          We build{" "}
          <span className="relative inline-block overflow-hidden align-bottom font-[family-name:var(--font-instrument-serif)] italic text-zn-text-3">
            <span className="invisible block whitespace-nowrap">
              {HERO_BUILD_ITEMS.reduce((a, b) => (a.length >= b.length ? a : b))}
            </span>

            <span className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={HERO_BUILD_ITEMS[index]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-x-0 bottom-0 block whitespace-nowrap"
                >
                  {HERO_BUILD_ITEMS[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </span>
        <span className="mt-2 block">
          for small businesses that want
          <br />
          more customers with less manual work.
        </span>
      </span>
    </h1>
  );
}
