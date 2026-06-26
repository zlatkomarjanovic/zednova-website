"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/ui/Button";
import { COOKIE_CATEGORIES } from "@/lib/cookies/types";
import type { CookiePreferencesInput } from "@/lib/cookies/types";
import { cn } from "@/lib/utils";

type CookiePreferencesFormProps = {
  initialPreferences: CookiePreferencesInput;
  onSave: (preferences: CookiePreferencesInput) => void;
  saveLabel?: string;
  className?: string;
  showActions?: boolean;
  onCancel?: () => void;
};

export function CookiePreferencesForm({
  initialPreferences,
  onSave,
  saveLabel = "Save preferences",
  className,
  showActions = true,
  onCancel,
}: CookiePreferencesFormProps) {
  const [analytics, setAnalytics] = useState(initialPreferences.analytics);
  const [marketing, setMarketing] = useState(initialPreferences.marketing);

  useEffect(() => {
    setAnalytics(initialPreferences.analytics);
    setMarketing(initialPreferences.marketing);
  }, [initialPreferences.analytics, initialPreferences.marketing]);

  return (
    <div className={cn("space-y-4", className)}>
      {COOKIE_CATEGORIES.map((category) => {
        const checked =
          category.id === "analytics"
            ? analytics
            : category.id === "marketing"
              ? marketing
              : true;

        return (
          <div
            key={category.id}
            className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-sans text-sm font-medium text-zn-text">
                  {category.title}
                </p>
                <p className="text-sm leading-relaxed text-zn-text-2">
                  {category.description}
                </p>
              </div>
              <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  disabled={category.required}
                  onChange={(event) => {
                    if (category.id === "analytics") {
                      setAnalytics(event.target.checked);
                    }
                    if (category.id === "marketing") {
                      setMarketing(event.target.checked);
                    }
                  }}
                  aria-label={`${category.title} cookies`}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-6 w-11 rounded-full transition-colors",
                    checked ? "bg-zn-text" : "bg-zn-bg-3",
                    category.required && "opacity-60",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-[translate]",
                    checked && "translate-x-5",
                    category.required && "opacity-60",
                  )}
                />
              </label>
            </div>
            {category.required ? (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3">
                Always active
              </p>
            ) : null}
          </div>
        );
      })}

      {showActions ? (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            type="button"
            size="sm"
            onClick={() => onSave({ analytics, marketing })}
          >
            {saveLabel}
          </Button>
          {onCancel ? (
            <Button type="button" size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-zn-text-3">
        Read our{" "}
        <Link href="/legal/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/legal/cookie-settings" className="underline underline-offset-2">
          Cookie Settings
        </Link>{" "}
        for details on how we use cookies and similar technologies.
      </p>
    </div>
  );
}

export function preferencesFromConsent(
  consent: CookiePreferencesInput | null | undefined,
): CookiePreferencesInput {
  return {
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  };
}
