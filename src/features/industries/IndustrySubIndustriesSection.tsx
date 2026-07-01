import { Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { SectionLabel } from "@/ui/SectionLabel";
import { Icon } from "@/ui/Icon";
import type { Industry } from "@/lib/types";

export function IndustrySubIndustriesSection({
  subIndustries,
  eyebrow,
  headline,
  subtext,
}: {
  subIndustries: Industry[];
  eyebrow: string;
  headline: string;
  subtext: string;
}) {
  if (subIndustries.length === 0) return null;

  return (
    <section data-theme="light" className="relative bg-zn-bg">
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border">
          <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)]">
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel withRule={false}>{eyebrow}</SectionLabel>
              <TextReveal
                as="h2"
                text={headline}
                className="mt-6 zn-h2 font-sans font-normal text-zn-text"
              />
              <p className="zn-prose mx-auto mt-5 max-w-xl text-zn-text-2">{subtext}</p>
            </div>
          </div>

          <Stagger
            className="grid grid-cols-1 border-t border-zn-border sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.04}
          >
            {subIndustries.map((segment) => (
              <article
                key={segment.slug}
                className="flex flex-col gap-4 border-b border-zn-border px-6 py-8 sm:border-r sm:px-8 lg:px-10"
              >
                <Icon name={segment.icon} className="size-7 text-zn-text" />
                <div>
                  <h3 className="font-sans text-base font-normal tracking-tight text-zn-text">
                    {segment.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zn-text-2">{segment.hook}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
