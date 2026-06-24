import type { Industry, IndustryParent } from "@/lib/types";

export function isNonEmptyCmsValue(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value as object).length > 0;
  return true;
}

/** Prefer CMS values when present; keep static fallbacks for empty CMS fields. */
export function mergeIndustryRecord<T extends IndustryParent | Industry>(
  fallback: T,
  cms?: T | null,
): T {
  if (!cms) return fallback;

  const merged = { ...fallback } as T;

  for (const key of Object.keys(cms) as (keyof T)[]) {
    const value = cms[key];
    if (key === "seo" && value && typeof value === "object") {
      merged.seo = {
        ...(fallback.seo ?? {}),
        ...(value as T["seo"]),
      };
      continue;
    }
    if (isNonEmptyCmsValue(value)) {
      merged[key] = value;
    }
  }

  return merged;
}

export function isIndustrySegment(
  industry: IndustryParent | Industry,
): industry is Industry {
  return "parentSlug" in industry && Boolean(industry.parentSlug);
}

export function isIndustryParentRecord(
  industry: IndustryParent | Industry,
): industry is IndustryParent {
  return !isIndustrySegment(industry);
}
