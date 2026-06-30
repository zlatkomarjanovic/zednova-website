"use client";

import { useEffect, useRef, useState } from "react";

import { CAL_BOOKING_URL, CAL_LINK } from "@/lib/booking";
import { trackConversion } from "@/lib/analytics/track";

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
  analyticsSource = "embed",
}: {
  calLink?: string;
  namespace?: string;
  className?: string;
  theme?: CalTheme;
  minHeight?: string;
  analyticsSource?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;

    void (async () => {
      try {
        await loadCalScript();
        if (cancelled || !containerRef.current) return;

        const Cal = window.Cal;
        if (!Cal) {
          setLoadState("error");
          return;
        }

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

        Cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            trackConversion("calendar_booked", {
              source: analyticsSource,
              calLink,
            });
          },
        });

        if (!cancelled) setLoadState("ready");
      } catch {
        if (!cancelled) setLoadState("error");
      }
    })();

    return () => {
      cancelled = true;
      element.replaceChildren();
    };
  }, [calLink, theme, analyticsSource]);

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", minHeight, overflow: "hidden" }}
    >
      {loadState === "loading" ? (
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center border border-zn-border-dk bg-zn-dark-2/40 text-sm text-zn-inv-2"
          aria-hidden="true"
        >
          Loading calendar…
        </div>
      ) : null}
      {loadState === "error" ? (
        <div
          className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-4 border border-zn-border-dk bg-zn-dark-2/40 px-6 py-10 text-center text-sm text-zn-inv-2"
        >
          <p>Calendar could not load here.</p>
          <a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zn-inv underline underline-offset-4"
          >
            Book a call in a new tab
          </a>
        </div>
      ) : null}
      <div
        ref={containerRef}
        style={{ width: "100%", minHeight, overflow: "hidden" }}
        aria-label="Book a 30 minute call"
        onClick={() => {
          trackConversion("calendar_click", { source: analyticsSource, calLink });
        }}
      />
    </div>
  );
}
