"use client";

import { useEffect, useRef } from "react";

import { CAL_LINK } from "@/lib/booking";

const CAL_ORIGIN = "https://app.cal.com";
const CAL_SCRIPT = `${CAL_ORIGIN}/embed/embed.js`;

type CalTheme = "light" | "dark" | "auto";

type CalFn = {
  (command: string, ...args: unknown[]): void;
  loaded?: boolean;
  ns?: Record<string, CalFn>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/** Official Cal.com queue bootstrap (embed.js processes the queue on load). */
function bootstrapCalQueue() {
  if (window.Cal) return;

  const cal = function (...args: unknown[]) {
    const api = cal as CalFn;
    if (!api.loaded) {
      api.ns = {};
      api.q = api.q || [];
      const script = document.createElement("script");
      script.src = CAL_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
      api.loaded = true;
    }

    if (args[0] === "init") {
      const ns = args[1];
      if (typeof ns === "string") {
        const namespaceApi = function (...inner: unknown[]) {
          (namespaceApi as CalFn).q = (namespaceApi as CalFn).q || [];
          (namespaceApi as CalFn).q!.push(inner);
        } as CalFn;
        namespaceApi.q = [];
        api.ns![ns] = api.ns![ns] || namespaceApi;
        api.ns![ns].q!.push(args.slice(2));
        api.q!.push(["initNamespace", ns]);
      } else {
        api.q!.push(args);
      }
      return;
    }

    api.q!.push(args);
  } as CalFn;

  cal.ns = {};
  cal.q = [];
  window.Cal = cal;
}

function loadCalScript(): Promise<void> {
  bootstrapCalQueue();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CAL_SCRIPT}"]`,
    );

    if (existing?.dataset.calLoaded === "true") {
      resolve();
      return;
    }

    const script =
      existing ??
      (() => {
        const el = document.createElement("script");
        el.src = CAL_SCRIPT;
        el.async = true;
        document.head.appendChild(el);
        return el;
      })();

    script.addEventListener(
      "load",
      () => {
        script.dataset.calLoaded = "true";
        resolve();
      },
      { once: true },
    );

    script.addEventListener(
      "error",
      () => reject(new Error("Cal.com embed script failed to load")),
      { once: true },
    );
  });
}

export function CalBookingEmbed({
  calLink = CAL_LINK,
  className,
  theme = "auto",
  minHeight = "28rem",
}: {
  calLink?: string;
  namespace?: string;
  className?: string;
  theme?: CalTheme;
  minHeight?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;

    void (async () => {
      try {
        await loadCalScript();
        if (cancelled || !containerRef.current) return;

        const Cal = window.Cal;
        if (!Cal) return;

        Cal("init", { origin: CAL_ORIGIN });

        const resolvedTheme = theme === "auto" ? undefined : theme;

        Cal("inline", {
          elementOrSelector: containerRef.current,
          calLink,
          config: {
            layout: "month_view",
            useSlotsViewOnSmallScreen: "true",
            ...(resolvedTheme ? { theme: resolvedTheme } : {}),
          },
        });

        Cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          ...(resolvedTheme ? { theme: resolvedTheme } : {}),
        });
      } catch {
        /* Leave empty container — user can still use /contact */
      }
    })();

    return () => {
      cancelled = true;
      element.replaceChildren();
    };
  }, [calLink, theme]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", minHeight, overflow: "hidden" }}
      aria-label="Book a 30 minute call"
    />
  );
}
