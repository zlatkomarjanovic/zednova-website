import type { IndustryBuildCard } from "@/lib/types/industry-page";

/** Assign bento spans so cards fill a 2-column grid without gaps. */
export function assignIndustryBuildSpans(
  count: number,
): NonNullable<IndustryBuildCard["span"]>[] {
  if (count <= 0) return [];
  if (count === 1) return ["2x1"];
  if (count === 2) return ["1x1", "1x1"];
  if (count === 3) return ["2x1", "1x1", "1x1"];
  if (count === 4) return ["1x1", "1x1", "1x1", "1x1"];
  if (count === 5) return ["2x1", "1x1", "1x1", "1x1", "2x1"];
  return Array.from({ length: count }, () => "1x1");
}

export function isDeliverableTag(subtitle?: string | null): boolean {
  if (!subtitle?.trim()) return false;
  return /^deliverables?$/i.test(subtitle.trim());
}
