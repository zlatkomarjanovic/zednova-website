import type { ArticleBlock, Post } from "../../src/lib/types";
import { team } from "../../src/lib/content/team";
import { normalizeInsightPost } from "../../src/lib/insights/normalize-post";
import {
  insightPageGraphJsonLd,
  SCHEMA_ORG_ID,
  SCHEMA_WEBSITE_ID,
} from "../../src/lib/seo";
import { SITE_ORIGIN, absoluteUrl } from "../../src/lib/site-url";
import { posts } from "../../src/lib/content/posts";

export const SPLIT_LETTER_PATTERN = /S S e e r r v v|C C u u s s t t o o m|M M i i g g r r a a t t i i o o n n s s/;

export const GENERIC_FILLER_PHRASES = [
  "What operators get wrong",
  "A practical implementation path",
  "How we apply this at ZedNova",
  "Deep dive ",
  "Additional context (",
  "Sustainable growth in",
  "In practice, teams that treat this as a systems problem",
  "Shopify operators should validate each fix against add-to-cart",
];

export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function parseListCountFromTitle(title: string): number | null {
  const leading = title.match(/^(\d+)\s+/);
  if (leading) return Number(leading[1]);
  const embedded = title.match(/(\d+)[\s-]*(minute|fix|fixes|audit|audits|way|ways|mistake|mistakes|step|steps)/i);
  if (embedded) return Number(embedded[1]);
  return null;
}

export function countMajorSections(body: ArticleBlock[]): number {
  return body.filter((block) => {
    if (block.type !== "h2" && block.type !== "h3") return false;
    const text = block.text.toLowerCase();
    return !(
      text.includes("what operators get wrong") ||
      text.includes("practical implementation path") ||
      text.includes("how we apply this at zednova") ||
      text.includes("signals you are ready") ||
      text.startsWith("deep dive")
    );
  }).length;
}

export function bodyHasInternalLinks(body: ArticleBlock[]): boolean {
  return body.some(
    (block) =>
      block.type === "p" &&
      /\[([^\]]+)\]\(\/[^)]+\)/.test(block.text ?? ""),
  );
}

export function bodyHasGenericFiller(body: ArticleBlock[]): string[] {
  const text = body
    .map((b) => (b.type === "ul" ? b.items.join(" ") : (b.text ?? "")))
    .join(" ");
  return GENERIC_FILLER_PHRASES.filter((phrase) => text.includes(phrase));
}

export function collectEmptyValues(node: unknown, path = "root"): string[] {
  if (node === null || node === undefined || node === "") {
    return [path];
  }
  if (Array.isArray(node)) {
    return node.flatMap((item, i) => collectEmptyValues(item, `${path}[${i}]`));
  }
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([key, val]) =>
      collectEmptyValues(val, `${path}.${key}`),
    );
  }
  return [];
}

export function getNormalizedPosts(): Post[] {
  return posts.map((post) =>
    normalizeInsightPost(post as Parameters<typeof normalizeInsightPost>[0]),
  );
}

export function buildGraphForPost(post: Post) {
  const author = team.find((m) => m.slug === post.author) ?? null;
  return insightPageGraphJsonLd({
    post,
    author,
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Insights", href: "/insights" },
      { label: post.title },
    ],
    faqs: post.faqs,
    related: posts.filter((p) => p.slug !== post.slug).slice(0, 2) as Post[],
    includeToc: post.tableOfContentsEnabled !== false,
    includeFaq: Boolean(post.faqs?.length),
  });
}

export function assertMetadataBasics(post: Post): string[] {
  const errors: string[] = [];
  if (!post.title?.trim()) errors.push("missing title");
  if (!(post.seoTitle ?? post.seo?.seoTitle)?.trim()) errors.push("missing SEO title");
  if (!(post.seoDescription ?? post.seo?.seoDescription)?.trim()) {
    errors.push("missing SEO description");
  }
  if (!post.publishedAt) errors.push("missing datePublished");
  if (!post.image?.trim()) errors.push("missing cover image");
  return errors;
}

export function assertDirectAnswer(post: Post): string[] {
  const errors: string[] = [];
  const answer =
    post.quickAnswer?.shortAnswer ??
    post.oneSentenceSummary ??
    post.aiSummary ??
    post.excerpt;
  if (!answer?.trim()) {
    errors.push("missing direct answer");
    return errors;
  }
  const words = wordCount(answer);
  if (words < 40 || words > 70) {
    errors.push(`direct answer ${words} words (expected 40–70)`);
  }
  return errors;
}

export { posts, SITE_ORIGIN, absoluteUrl, SCHEMA_ORG_ID, SCHEMA_WEBSITE_ID };
