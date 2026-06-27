/** Alternate author slugs that refer to the same person (legacy static vs Sanity). */
export const AUTHOR_SLUG_ALIASES: Record<string, string[]> = {
  "zed-marjanovic": ["zlatko-marjanovic"],
  "zlatko-marjanovic": ["zed-marjanovic"],
};

export function resolveAuthorSlugs(slug: string): string[] {
  return [...new Set([slug, ...(AUTHOR_SLUG_ALIASES[slug] ?? [])])];
}
