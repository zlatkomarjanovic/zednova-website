import { services } from "@/lib/content/services";

/** Resolve service slugs to display titles for case study tags. */
export function caseStudyServiceTags(slugs: string[], limit = 4) {
  return slugs
    .slice(0, limit)
    .map((slug) => services.find((s) => s.slug === slug)?.title ?? slug);
}

/** Primary wordmark text for the card hero area. */
export function caseStudyMark(client: string) {
  const ignore = new Set([
    "multi-location",
    "multi",
    "group",
    "company",
    "firm",
    "southeast",
    "texas",
    "us",
  ]);
  const words = client
    .replace(/,/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !ignore.has(w.toLowerCase()));

  if (words.length >= 2) return words.slice(0, 2).join(" ");
  if (words.length === 1) return words[0];
  return client.split(/\s+/)[0] ?? client;
}
