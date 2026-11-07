"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { brandWordmark } from "@/lib/fonts/brand-wordmark";
import { ZMark } from "@/ui/Logo";
import { cn } from "@/lib/utils";

const SESSION_KEY = "zednova-home-preloader-seen";
const DURATION_MS = 800;
const FADE_MS = 350;

let seenThisVisit = false;

export function HomePreloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setVisible(false);
    setExiting(false);
    if (pathname !== "/" || seenThisVisit) return;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // Storage may be blocked. The in-memory flag still prevents repeats.
    }
    seenThisVisit = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // The animation and its dismissal never depend on storage access.
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);
    const fadeTimer = window.setTimeout(() => setExiting(true), DURATION_MS);
    const closeTimer = window.setTimeout(() => setVisible(false), DURATION_MS + FADE_MS);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(closeTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading ZedNova Studio"
      className="pointer-events-none fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zn-dark text-zn-inv"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex w-[min(18rem,70vw)] flex-col items-center gap-6">
        <ZMark variant="light" className="h-10 w-auto" />
        <p className={cn(brandWordmark.className, "text-base font-semibold tracking-[-0.03em] text-zn-inv")}>
          ZedNova
        </p>
        <div className="h-px w-full overflow-hidden bg-zn-border-dk/70">
          <motion.div
            className="h-full origin-left bg-zn-inv"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
      <button type="button" onClick={() => setVisible(false)} className="pointer-events-auto absolute bottom-8 underline underline-offset-4">Skip introduction</button>
    </motion.div>
  );
}
