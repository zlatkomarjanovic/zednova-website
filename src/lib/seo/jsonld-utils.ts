/** Remove undefined/null/empty-string values from JSON-LD objects (recursive). */
export function pruneJsonLd<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => pruneJsonLd(item))
      .filter((item) => item !== undefined && item !== null && item !== "") as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      if (val === undefined || val === null || val === "") continue;
      const pruned = pruneJsonLd(val);
      if (pruned === undefined || pruned === null || pruned === "") continue;
      if (typeof pruned === "object" && !Array.isArray(pruned) && Object.keys(pruned).length === 0) {
        continue;
      }
      out[key] = pruned;
    }
    return out as T;
  }
  return value;
}

/** Ensure dateModified is never before datePublished. */
export function normalizeModifiedDate(publishedAt: string, modifiedAt?: string): string {
  const published = Date.parse(publishedAt);
  const modified = modifiedAt ? Date.parse(modifiedAt) : published;
  if (Number.isNaN(published)) return modifiedAt ?? publishedAt;
  if (Number.isNaN(modified) || modified < published) {
    return new Date(published).toISOString();
  }
  return modifiedAt ?? publishedAt;
}

/** Strip nested @context when embedding a schema fragment into @graph. */
export function stripJsonLdContext(node: Record<string, unknown>): Record<string, unknown> {
  const { "@context": _ctx, ...rest } = node;
  return rest;
}
