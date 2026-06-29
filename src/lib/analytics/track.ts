"use client";

import { track } from "@vercel/analytics";

import type { AnalyticsEvent, TrackProps } from "@/lib/analytics/events";
import { readStoredConsent } from "@/lib/cookies/storage";

function analyticsAllowed(): boolean {
  return readStoredConsent()?.analytics === true;
}

/** Fire a consent-gated custom event to Vercel Analytics. */
export function trackConversion<E extends AnalyticsEvent>(
  event: E,
  properties: TrackProps<E>,
): void {
  if (typeof window === "undefined" || !analyticsAllowed()) return;

  track(event, properties as Record<string, string | number | boolean | null>);
}

/** Infer outbound vs service navigation for generic link clicks. */
export function trackLinkClick(
  href: string,
  options?: { label?: string; location?: string; kind?: "service" | "cta" | "outbound" },
): void {
  if (href.startsWith("http")) {
    trackConversion("outbound_link_click", {
      href,
      label: options?.label,
      location: options?.location,
    });
    return;
  }

  if (options?.kind === "service" || href.startsWith("/services/")) {
    const service = href.replace(/^\/services\//, "").split(/[?#]/)[0] ?? href;
    trackConversion("service_card_click", {
      service,
      href,
      location: options?.location,
    });
    return;
  }

  trackConversion("cta_click", {
    label: options?.label ?? href,
    href,
    location: options?.location,
  });
}
