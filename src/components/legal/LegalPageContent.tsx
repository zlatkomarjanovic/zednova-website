import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { SectionLabel } from "@/ui/SectionLabel";
import { TemplateSection } from "@/ui/TemplateSection";
import type { LegalDocument } from "@/lib/content/legal";

type LegalPageContentProps = {
  document: LegalDocument;
};

export function LegalPageContent({ document }: LegalPageContentProps) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: document.shortTitle },
  ];

  return (
    <>
      <TemplateSection noInsetPadding borderBottom={false}>
        <div className="zn-container-inset pb-14 pt-36 lg:pb-16 lg:pt-44">
          <Reveal>
            <Breadcrumbs items={crumbs} className="mb-8" />
          </Reveal>
          <Reveal>
            <SectionLabel withRule={false}>Legal</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl zn-h1 font-sans font-normal text-zn-text">
              {document.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl zn-prose">{document.intro}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm text-zn-text-3">
              Last updated: {document.lastUpdated} ·{" "}
              <Link href="/contact" className="underline underline-offset-2">
                Contact us
              </Link>{" "}
              with questions.
            </p>
          </Reveal>
        </div>
      </TemplateSection>

      <TemplateSection borderBottom={false}>
        <div className="zn-container-inset pb-20 lg:pb-24">
          <div className="mx-auto max-w-3xl space-y-10">
            {document.sections.map((section, index) => (
              <Reveal key={section.id} delay={0.04 * index}>
                <section id={section.id} className="scroll-mt-28">
                  <h2 className="font-sans text-xl font-normal text-zn-text">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-zn-text-2">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.list ? (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </TemplateSection>
    </>
  );
}
