import { applyInsightOverride } from "@/lib/content/insight-overrides";
import { uniqueFaqs, uniqueTakeaways } from "@/lib/insights/dedupe-aeo";
import {
  ensureArticleCta,
  ensureDirectAnswer,
} from "@/lib/insights/ensure-direct-answer";
import type { Post } from "@/lib/types";

/** Apply insight overrides, dedupe AEO fields, and ensure direct answer + CTA before render. */
export function normalizeInsightPost(post: Post): Post {
  const merged = applyInsightOverride(post);
  const normalized: Post = {
    ...merged,
    takeaways: uniqueTakeaways(merged.takeaways),
    faqs: uniqueFaqs(merged.faqs),
  };
  return ensureArticleCta(ensureDirectAnswer(normalized));
}
