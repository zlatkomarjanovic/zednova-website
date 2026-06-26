import type { ArticleFaq } from "@/lib/types";

/** Normalize FAQ questions for deduplication. */
function faqKey(faq: ArticleFaq): string {
  return faq.question.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Return unique FAQs — first occurrence wins. */
export function uniqueFaqs(faqs: ArticleFaq[] | undefined): ArticleFaq[] {
  if (!faqs?.length) return [];
  const seen = new Set<string>();
  return faqs.filter((faq) => {
    const key = faqKey(faq);
    if (seen.has(key)) return false;
    seen.add(key);
    return Boolean(faq.question.trim() && faq.answer.trim());
  });
}

/** Return unique takeaways — case-insensitive trim match. */
export function uniqueTakeaways(items: string[] | undefined): string[] {
  if (!items?.length) return [];
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
