export const COOKIE_CONSENT_STORAGE_KEY = "zednova-cookie-consent";
export const COOKIE_CONSENT_VERSION = 1;

export type CookieConsent = {
  version: typeof COOKIE_CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  consentedAt: string;
};

export type CookiePreferencesInput = Pick<CookieConsent, "analytics" | "marketing">;

export type CookieCategoryId = "necessary" | "analytics" | "marketing";

export type CookieCategoryDefinition = {
  id: CookieCategoryId;
  title: string;
  description: string;
  required?: boolean;
};

export const COOKIE_CATEGORIES: CookieCategoryDefinition[] = [
  {
    id: "necessary",
    title: "Strictly necessary",
    description:
      "Required for the site to work, including saving your cookie choices and keeping forms secure. These cannot be turned off.",
    required: true,
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Help us understand how visitors use the site (pages viewed, performance, and general traffic patterns) so we can improve content and UX. We use privacy-focused analytics when you allow this category.",
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Used to measure ad campaigns or show relevant promotions on other platforms. ZedNova Studio does not currently run marketing pixels on this site, but you can opt in or out for future use.",
  },
];
