"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const HERO_BUILD_ITEMS = [
  "websites",
  "custom software",
  "automations",
  "AI tools",
  "marketing websites",
  "Shopify stores",
  "client portals",
  "CRM workflows",
  "booking systems",
  "platform migrations",
] as const;

/** Crawlable headline — always in DOM as normal visible text. */
export const HERO_CRAWLABLE_H1 =
  "We build websites, custom software, automations, and AI tools for service businesses that want more leads with less manual work.";

const LONGEST_PHRASE = HERO_BUILD_ITEMS.reduce((a, b) =>
  a.length >= b.length ? a : b,
);

const LOOP_MS = 3500;
const FIRST_CYCLE_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Subtext uses max-w-md; H1 container is ~10% wider. */
const H1_WRAP_CLASS = "max-w-[calc(28rem*1.1)] lg:max-w-[calc(32rem*1.1)]";
const HEADING_CLASS = "zn-h1 font-sans font-normal text-zn-text";

export function HeroRotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    setEnhanced(true);

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

  const phrase = HERO_BUILD_ITEMS[index];

  if (!enhanced || reduceMotion) {
    return (
      <div className={H1_WRAP_CLASS}>
        <h1 className={HEADING_CLASS}>{HERO_CRAWLABLE_H1}</h1>
      </div>
    );
  }

  return (
    <div className={H1_WRAP_CLASS}>
      {/* Crawlable plain text — always present in DOM */}
      <h1 className="sr-only">{HERO_CRAWLABLE_H1}</h1>

      {/* Visual headline for humans — hidden from assistive tech / semantic H1 above */}
      <p aria-hidden="true" className={HEADING_CLASS}>
        <span className="block">
          We build{" "}
          <span
            className="relative inline-block overflow-hidden align-bottom font-[family-name:var(--font-instrument-serif)] italic text-zn-text-3"
            style={{ minWidth: `${LONGEST_PHRASE.length}ch` }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={phrase}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="block whitespace-nowrap"
              >
                {phrase}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
        <span className="mt-2 block">
          for service businesses that want more leads with less manual work.
        </span>
      </p>
    </div>
  );
}
