import { faqPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/ui/JsonLd";
import { ArticleFaqAccordion } from "@/features/insights/ArticleFaqAccordion";
import type { ArticleFaq } from "@/lib/types";

export function FaqSection({
  faqs,
  title = "FAQ",
  id = "faq",
  showJsonLd = true,
}: {
  faqs: ArticleFaq[];
  title?: string;
  id?: string;
  showJsonLd?: boolean;
}) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section data-theme="light" className="zn-section" id={id}>
      <div className="zn-container">
        {showJsonLd && <JsonLd data={[faqPageJsonLd(faqs)]} />}
        <div className="mx-auto max-w-3xl">
          <h2 className="zn-h2 font-sans font-normal text-zn-text">{title}</h2>
          <div className="mt-8 border-y border-zn-border">
            <ArticleFaqAccordion faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
