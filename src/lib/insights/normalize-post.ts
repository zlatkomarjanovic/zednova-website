import { applyInsightOverride } from "@/lib/content/insight-overrides";
import { uniqueFaqs, uniqueTakeaways } from "@/lib/insights/dedupe-aeo";
import type { Post } from "@/lib/types";

/** Apply insight overrides and dedupe AEO fields before render. */
export function normalizeInsightPost(post: Post): Post {
  const merged = applyInsightOverride(post);
  return {
    ...merged,
    takeaways: uniqueTakeaways(merged.takeaways),
    faqs: uniqueFaqs(merged.faqs),
  };
}
