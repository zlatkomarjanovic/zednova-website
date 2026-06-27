"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Logo, ZMark } from "@/ui/Logo";
import { cn } from "@/lib/utils";

const SESSION_KEY = "zednova-home-preloader-seen";
const MIN_MS = 900;
const MAX_MS = 2600;
const EXIT_MS = 650;

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

    setVisible(true);
    setExiting(false);
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
      setVisible(false);
      return;
    }

    let cancelled = false;

    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_MS);
    });

    const loadReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    const maxWait = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MAX_MS);
    });

    void Promise.all([minDelay, Promise.race([loadReady, maxWait])]).then(() => {
      if (cancelled) return;
      setExiting(true);
    });

    return () => {
      cancelled = true;
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
    }, EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [exiting]);

  if (!visible) return null;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading ZedNova Studios"
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center",
        "bg-zn-dark text-zn-inv",
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="zn-blueprint-grid absolute inset-0 opacity-[0.18]" aria-hidden="true" />
      <div className="zn-grain absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-8 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <ZMark className="size-11 text-zn-inv" />
          <Logo variant="light" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-zn-inv-2"
        >
          Websites · Software · Automations
        </motion.p>

        <div className="h-px w-36 overflow-hidden bg-zn-border-dk/80">
          <motion.div
            className="h-full origin-left bg-zn-inv/90"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: exiting ? 1 : 0.92 }}
            transition={
              exiting
                ? { duration: 0.35, ease: "easeOut" }
                : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
