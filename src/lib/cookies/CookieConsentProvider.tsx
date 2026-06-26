"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  buildConsent,
  readStoredConsent,
  writeStoredConsent,
} from "@/lib/cookies/storage";
import type { CookieConsent, CookiePreferencesInput } from "@/lib/cookies/types";

type CookieConsentContextValue = {
  ready: boolean;
  consent: CookieConsent | null;
  bannerOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (preferences: CookiePreferencesInput) => void;
  openBanner: () => void;
  closeBanner: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setBannerOpen(!stored);
    setReady(true);
  }, []);

  const persist = useCallback((next: CookieConsent) => {
    writeStoredConsent(next);
    setConsent(next);
    setBannerOpen(false);
    window.dispatchEvent(
      new CustomEvent("zednova:cookie-consent", { detail: next }),
    );
  }, []);

  const acceptAll = useCallback(() => {
    persist(buildConsent({ analytics: true, marketing: true }));
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(buildConsent({ analytics: false, marketing: false }));
  }, [persist]);

  const savePreferences = useCallback(
    (preferences: CookiePreferencesInput) => {
      persist(buildConsent(preferences));
    },
    [persist],
  );

  const openBanner = useCallback(() => {
    setBannerOpen(true);
  }, []);

  const closeBanner = useCallback(() => {
    if (consent) setBannerOpen(false);
  }, [consent]);

  const value = useMemo(
    () => ({
      ready,
      consent,
      bannerOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openBanner,
      closeBanner,
    }),
    [
      ready,
      consent,
      bannerOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openBanner,
      closeBanner,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}
