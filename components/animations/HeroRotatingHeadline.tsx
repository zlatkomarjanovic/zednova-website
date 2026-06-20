"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const HERO_BUILD_ITEMS = [
  "custom software",
  "Next.js web apps",
  "client portals",
  "patient systems",
  "booking flows",
  "mobile apps",
  "MVPs",
  "CRM automations",
  "AI phone assistants",
  "AI chatbots",
  "internal dashboards",
  "migration projects",
] as const;

const LOOP_MS = 3500;
const FIRST_CYCLE_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

const HEADING_CLASS =
  "max-w-4xl font-sans text-[clamp(1.49rem,3.23vw,2.44rem)] font-normal leading-[1.06] tracking-[-0.025em] text-zn-text";

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

  return (
    <h1 className={HEADING_CLASS}>
      <span className="block">
        We build{" "}
        <span
          className="relative inline-block align-bottom overflow-hidden font-[family-name:var(--font-instrument-serif)] italic text-zn-text-3"
          aria-live="polite"
        >
          <span className="invisible block whitespace-nowrap" aria-hidden="true">
            {HERO_BUILD_ITEMS.reduce((a, b) => (a.length >= b.length ? a : b))}
          </span>

          <span className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={HERO_BUILD_ITEMS[index]}
                initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
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
    </h1>
  );
}
