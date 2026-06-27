"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SESSION_KEY = "zednova-home-preloader-seen";
const DURATION_MS = 2000;
const FADE_MS = 350;

function shouldShowPreloader(pathname: string) {
  if (pathname !== "/") return false;
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem(SESSION_KEY);
}

export function HomePreloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!shouldShowPreloader(pathname)) {
      setVisible(false);
      setExiting(false);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setVisible(true);
    setExiting(false);
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => setExiting(true), DURATION_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  useEffect(() => {
    if (!exiting) return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
      setVisible(false);
      setExiting(false);
    }, FADE_MS);

    return () => window.clearTimeout(timer);
  }, [exiting]);

  if (!visible) return null;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading ZedNova Studios"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zn-dark text-zn-inv"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex w-[min(18rem,70vw)] flex-col items-center gap-6">
        <p className="font-sans text-sm font-normal uppercase tracking-[0.14em] text-zn-inv">
          ZedNova Studios
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
    </motion.div>
  );
}
