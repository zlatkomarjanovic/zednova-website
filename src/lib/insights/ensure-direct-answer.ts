import type { Post } from "@/lib/types";

function words(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function joinWordRange(parts: string[], min: number, max: number): string {
  const collected: string[] = [];
  for (const part of parts) {
    for (const word of words(part)) {
      collected.push(word);
      if (collected.length >= max) break;
    }
    if (collected.length >= min) break;
  }
  return collected.slice(0, max).join(" ");
}

/** Ensure every insight post has a visible direct-answer block within 40–70 words. */
export function ensureDirectAnswer(post: Post): Post {
  const existing = post.quickAnswer?.shortAnswer?.trim();
  if (existing) {
    const count = words(existing).length;
    if (count >= 40 && count <= 70) return post;
  }

  const candidates = [
    post.quickAnswer?.shortAnswer,
    post.oneSentenceSummary,
    post.aiSummary,
    post.faqs?.[0]?.answer,
    post.seoDescription,
    post.excerpt,
  ].filter((value): value is string => Boolean(value?.trim()));

  const shortAnswer = joinWordRange(candidates, 40, 70);
  const question =
    post.quickAnswer?.question ??
    post.faqs?.[0]?.question ??
    post.seoTitle ??
    post.title;

  return {
    ...post,
    quickAnswer: {
      question,
      shortAnswer,
    },
  };
}

/** Default article CTA when CMS fields are absent. */
export function ensureArticleCta(post: Post): Post {
  if (post.primaryCtaLabel && post.primaryCtaHref) return post;
  return {
    ...post,
    primaryCtaTitle: post.primaryCtaTitle ?? "Need help implementing this?",
    primaryCtaDescription:
      post.primaryCtaDescription ??
      "We design and ship websites, automations, and custom software with AI-accelerated delivery.",
    primaryCtaLabel: post.primaryCtaLabel ?? "Start a project",
    primaryCtaHref: post.primaryCtaHref ?? "/contact",
    secondaryCtaLabel: post.secondaryCtaLabel ?? "See services",
    secondaryCtaHref: post.secondaryCtaHref ?? "/services",
  };
}
