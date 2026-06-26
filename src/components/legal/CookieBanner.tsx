"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/ui/Button";
import { useCookieConsent } from "@/lib/cookies/CookieConsentProvider";
import {
  CookiePreferencesForm,
  preferencesFromConsent,
} from "@/components/legal/CookiePreferencesForm";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const {
    ready,
    bannerOpen,
    consent,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    closeBanner,
  } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  if (!ready || !bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="zn-container">
        <div
          data-theme="dark"
          className={cn(
            "relative border border-zn-border-dk bg-zn-dark text-zn-inv shadow-[0_-8px_40px_rgba(0,0,0,0.35)]",
            "rounded-[2px]",
          )}
        >
          <div className="zn-container-inset py-5 lg:py-6">
            <button
              type="button"
              onClick={closeBanner}
              disabled={!consent}
              aria-label="Close cookie banner"
              className={cn(
                "absolute right-4 top-4 flex size-8 items-center justify-center rounded-[2px] text-zn-inv-2 transition-colors hover:text-zn-inv",
                !consent && "pointer-events-none opacity-0",
              )}
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            <div className="max-w-3xl space-y-3 pr-8">
              <p
                id="cookie-banner-title"
                className="font-sans text-base font-medium text-zn-inv"
              >
                We use cookies
              </p>
              <p
                id="cookie-banner-description"
                className="text-sm leading-relaxed text-zn-inv-2"
              >
                We use strictly necessary cookies to run the site and optional
                analytics cookies to understand traffic and improve the
                experience. You can accept all, reject non-essential cookies, or
                choose your preferences. Your choices are saved on this device
                until you change them.
              </p>
              <p className="text-xs text-zn-inv-2">
                <Link
                  href="/legal/privacy-policy"
                  className="underline underline-offset-2 hover:text-zn-inv"
                >
                  Privacy Policy
                </Link>
                {" · "}
                <Link
                  href="/legal/cookie-settings"
                  className="underline underline-offset-2 hover:text-zn-inv"
                >
                  Cookie Settings
                </Link>
              </p>
            </div>

            {showPreferences ? (
              <div className="mt-6 max-w-2xl rounded-[2px] border border-zn-border-dk bg-zn-dark-2 p-4 lg:p-5">
                <CookiePreferencesForm
                  initialPreferences={preferencesFromConsent(consent)}
                  onSave={(preferences) => {
                    savePreferences(preferences);
                    setShowPreferences(false);
                  }}
                  onCancel={() => setShowPreferences(false)}
                  saveLabel="Save my choices"
                />
              </div>
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  size="sm"
                  variant="inverted"
                  onClick={acceptAll}
                >
                  Accept all
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline-inverted"
                  onClick={rejectNonEssential}
                >
                  Reject non-essential
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="link"
                  className="text-zn-inv-2 hover:text-zn-inv"
                  onClick={() => setShowPreferences(true)}
                >
                  Manage preferences
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
