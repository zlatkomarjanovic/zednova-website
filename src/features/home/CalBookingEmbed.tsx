"use client";

import { useEffect, useId } from "react";

const CAL_ORIGIN = "https://app.cal.com";

export function CalBookingEmbed({
  calLink = "zlatkom/30min",
  namespace = "30min",
  className,
}: {
  calLink?: string;
  namespace?: string;
  className?: string;
}) {
  const reactId = useId();
  const elementId = `cal-inline-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    // Cal.com inline embed bootstrap (official snippet, typed loosely for third-party loader)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;

    (function (C: any, A: string, L: string) {
      const push = (api: { q: unknown[] }, args: unknown[]) => {
        api.q.push(args);
      };

      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = C.document.createElement("script");
            script.src = A;
            C.document.head.appendChild(script);
            cal.loaded = true;
          }

          if (args[0] === L) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const namespaceApi: any = function (...inner: unknown[]) {
              push(namespaceApi, inner);
            };
            namespaceApi.q = namespaceApi.q || [];
            const ns = args[1];
            if (typeof ns === "string") {
              cal.ns[ns] = cal.ns[ns] || namespaceApi;
              push(cal.ns[ns], args);
              push(cal, ["initNamespace", ns]);
            } else {
              push(cal, args);
            }
            return;
          }

          push(cal, args);
        };

      C.Cal("init", namespace, { origin: CAL_ORIGIN });

      C.Cal.ns[namespace]("inline", {
        elementOrSelector: `#${elementId}`,
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink,
      });
      C.Cal.ns[namespace]("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })(w, `${CAL_ORIGIN}/embed/embed.js`, "init");
  }, [calLink, elementId, namespace]);

  return (
    <div
      id={elementId}
      className={className}
      style={{ width: "100%", minHeight: "28rem", overflow: "auto" }}
      aria-label="Book a 30 minute call"
    />
  );
}
