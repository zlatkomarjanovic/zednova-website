"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

import { useCookieConsent } from "@/lib/cookies/CookieConsentProvider";

/** Loads Vercel Analytics only after the visitor opts in to analytics cookies. */
export function ConsentAwareAnalytics() {
  const { ready, consent } = useCookieConsent();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setEnabled(Boolean(consent?.analytics));
  }, [ready, consent]);

  useEffect(() => {
    const onConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<{ analytics?: boolean }>).detail;
      setEnabled(Boolean(detail?.analytics));
    };

    window.addEventListener("zednova:cookie-consent", onConsentChange);
    return () =>
      window.removeEventListener("zednova:cookie-consent", onConsentChange);
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}
