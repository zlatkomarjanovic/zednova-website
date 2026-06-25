"use client";

import { useEffect, useId, useRef } from "react";

const CAL_ORIGIN = "https://app.cal.com";
const CAL_SCRIPT_SRC = `${CAL_ORIGIN}/embed/embed.js`;

type CalNamespace = {
  q: unknown[][];
  (...args: unknown[]): void;
};

type CalGlobal = {
  loaded?: boolean;
  ns: Record<string, CalNamespace>;
  q: unknown[][];
  (command: string, ...args: unknown[]): void;
};

/** Official Cal embed bootstrap — queues calls until embed.js loads. */
function ensureCalStub(): CalGlobal {
  const w = window as typeof window & { Cal?: CalGlobal };

  if (w.Cal) return w.Cal;

  const cal = function (...args: unknown[]) {
    const api = cal as CalGlobal;
    if (!api.loaded) {
      api.ns = {};
      api.q = api.q || [];
      const script = document.createElement("script");
      script.src = CAL_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
      api.loaded = true;
    }

    if (args[0] === "init") {
      const namespaceApi = function (...inner: unknown[]) {
        (namespaceApi as CalNamespace).q.push(inner);
      } as CalNamespace;
      namespaceApi.q = [];

      const ns = args[1];
      if (typeof ns === "string") {
        api.ns[ns] = api.ns[ns] || namespaceApi;
        api.ns[ns].q.push(args.slice(2));
        api.q.push(["initNamespace", ns]);
      } else {
        api.q.push(args);
      }
      return;
    }

    api.q.push(args);
  } as CalGlobal;

  cal.ns = {};
  cal.q = [];
  w.Cal = cal;
  return cal;
}

function waitForCalScript(): Promise<void> {
  ensureCalStub();

  return new Promise((resolve) => {
    const w = window as typeof window & { Cal?: CalGlobal & { __embedReady?: boolean } };
    if (w.Cal?.__embedReady) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CAL_SCRIPT_SRC}"]`,
    );

    const markReady = () => {
      if (w.Cal) w.Cal.__embedReady = true;
      resolve();
    };

    if (existing?.dataset.calReady === "true") {
      markReady();
      return;
    }

    const script = existing ?? document.createElement("script");
    if (!existing) {
      script.src = CAL_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    script.addEventListener(
      "load",
      () => {
        script.dataset.calReady = "true";
        markReady();
      },
      { once: true },
    );

    // If the script was already cached/loaded before listeners attached.
    if (script.dataset.calReady === "true") markReady();
  });
}

export function CalBookingEmbed({
  calLink = "zlatkom/30min",
  className,
}: {
  calLink?: string;
  namespace?: string;
  className?: string;
}) {
  const reactId = useId();
  const namespace = `cal-${reactId.replace(/:/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;

    const mountEmbed = async () => {
      await waitForCalScript();
      if (cancelled || !containerRef.current || initializedRef.current) return;

      const Cal = ensureCalStub();
      initializedRef.current = true;

      Cal("init", namespace, { origin: CAL_ORIGIN });

      Cal.ns[namespace]("inline", {
        elementOrSelector: containerRef.current,
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink,
      });

      Cal.ns[namespace]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    const frame = requestAnimationFrame(() => {
      void mountEmbed();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      initializedRef.current = false;
      element.replaceChildren();
    };
  }, [calLink, namespace]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", minHeight: "28rem", overflow: "auto" }}
      aria-label="Book a 30 minute call"
    />
  );
}
