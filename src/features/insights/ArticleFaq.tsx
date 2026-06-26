import type { ArticleFaq as ArticleFaqType } from "@/lib/types";
import { ArticleFaqAccordion } from "@/features/insights/ArticleFaqAccordion";

/**
 * Inline FAQ section for article pages. FAQPage JSON-LD is injected at the page
 * level — keep Q&A text identical to the accordion content.
 */
export function ArticleFaq({
  faqs,
  heading = "Frequently asked questions",
}: {
  faqs: ArticleFaqType[];
  heading?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section aria-label="Article FAQ" className="scroll-mt-28">
      <h2 className="font-sans text-xl font-normal leading-snug text-zn-text lg:text-[1.375rem]">
        {heading}
      </h2>
      <div className="mt-8 overflow-hidden rounded-[2px] border border-zn-border bg-zn-bg-2/50">
        <ArticleFaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
