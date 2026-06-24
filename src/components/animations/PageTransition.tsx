"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Fades + lifts each route on enter. Exit animations are best-effort under the
 * App Router; the enter transition is the one that matters here.
 */
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        ref={ref}
        key={pathname}
        className={className}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          // Clear the residual transform so it can't create a containing block
          // that would break GSAP ScrollTrigger pinning further down the page.
          if (ref.current) ref.current.style.transform = "";
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
