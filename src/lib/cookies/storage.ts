import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
  type CookieConsent,
  type CookiePreferencesInput,
} from "@/lib/cookies/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseStoredConsent(raw: string | null): CookieConsent | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    if (parsed.necessary !== true) return null;
    if (typeof parsed.analytics !== "boolean") return null;
    if (typeof parsed.marketing !== "boolean") return null;
    if (typeof parsed.consentedAt !== "string") return null;

    return {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      consentedAt: parsed.consentedAt,
    };
  } catch {
    return null;
  }
}

export function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  return parseStoredConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
}

export function buildConsent(preferences: CookiePreferencesInput): CookieConsent {
  return {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    consentedAt: new Date().toISOString(),
  };
}

export function writeStoredConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

export function clearStoredConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
}
