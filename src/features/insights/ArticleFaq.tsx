import type { ArticleFaq as ArticleFaqType } from "@/lib/types";
import { ArticleFaqAccordion } from "@/features/insights/ArticleFaqAccordion";
import { faqPageJsonLd } from "@/lib/seo";

/**
 * Inline FAQ section for article pages. Renders an accessible accordion
 * (client) plus FAQPage JSON-LD (server) so answer engines can lift the
 * Q&A verbatim.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(faqs)).replace(/</g, "\\u003c"),
        }}
      />
      <h2 className="font-sans font-normal text-2xl leading-tight text-zn-text lg:text-3xl">
        {heading}
      </h2>
      <div className="mt-8 overflow-hidden rounded-[2px] border border-zn-border bg-zn-bg-2/50">
        <ArticleFaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
