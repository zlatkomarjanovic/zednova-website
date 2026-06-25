const DEFAULT_SITE_ORIGIN = "https://www.zednova.studio";

/** Accepts bare domains (www.zednova.studio) or full URLs from env. */
export function normalizeSiteOrigin(raw?: string): string {
  if (!raw?.trim()) return DEFAULT_SITE_ORIGIN;

  const trimmed = raw.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  return `https://${trimmed}`;
}

/** Canonical public site origin — used for sitemap, schema, OG, and llms.txt. */
export const SITE_ORIGIN = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
