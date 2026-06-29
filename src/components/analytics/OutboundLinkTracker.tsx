"use client";

import { useEffect } from "react";

import { trackLinkClick } from "@/lib/analytics/track";

/** Document-level delegation for external links not wired through Button. */
export function OutboundLinkTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!anchor.href.startsWith("http")) return;
      if (anchor.dataset.trackOutbound === "false") return;
      if (anchor.origin === window.location.origin) return;

      trackLinkClick(anchor.href, {
        label: anchor.textContent?.trim() || undefined,
        location: anchor.dataset.analyticsLocation,
        kind: "outbound",
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
