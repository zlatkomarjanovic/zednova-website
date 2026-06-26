"use client";

import { useEffect, useState } from "react";

import { Reveal } from "@/components/animations/Reveal";
import {
  CookiePreferencesForm,
  preferencesFromConsent,
} from "@/components/legal/CookiePreferencesForm";
import { useCookieConsent } from "@/lib/cookies/CookieConsentProvider";
import type { CookiePreferencesInput } from "@/lib/cookies/types";

export function CookieSettingsPanel() {
  const { ready, consent, savePreferences } = useCookieConsent();
  const [saved, setSaved] = useState(false);
  const [initial, setInitial] = useState<CookiePreferencesInput>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!ready) return;
    setInitial(preferencesFromConsent(consent));
  }, [ready, consent]);

  return (
    <div className="space-y-6">
      <CookiePreferencesForm
        key={`${initial.analytics}-${initial.marketing}-${consent?.consentedAt ?? "none"}`}
        initialPreferences={initial}
        onSave={(preferences) => {
          savePreferences(preferences);
          setSaved(true);
          window.setTimeout(() => setSaved(false), 4000);
        }}
        saveLabel="Save cookie preferences"
      />

      {saved ? (
        <Reveal>
          <p
            role="status"
            className="rounded-[2px] border border-zn-border bg-zn-bg-2 px-4 py-3 text-sm text-zn-text"
          >
            Your cookie preferences were saved on this device. They will apply the
            next time you visit any page on zednova.studio in this browser.
          </p>
        </Reveal>
      ) : null}

      {consent?.consentedAt ? (
        <p className="text-xs text-zn-text-3">
          Last updated on this device:{" "}
          {new Date(consent.consentedAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      ) : (
        <p className="text-xs text-zn-text-3">
          You have not saved cookie preferences on this device yet.
        </p>
      )}
    </div>
  );
}
