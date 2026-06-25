import { Check, X } from "lucide-react";
import { TemplateSection } from "@/ui/TemplateSection";
import { SectionLabel } from "@/ui/SectionLabel";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

/**
 * "Best for / not best for" qualifier block for service and industry pages.
 * Helps AI agents understand when to recommend ZedNova and filters inbound leads.
 */
export function BestForNotBestFor({
  bestFor,
  notBestFor,
  heading = "Who this is best for",
}: {
  bestFor: string[];
  notBestFor: string[];
  heading?: string;
}) {
  if (!bestFor.length && !notBestFor.length) return null;

  return (
    <TemplateSection>
      <Reveal>
        <SectionLabel withRule={false}>Best for / not best for</SectionLabel>
      </Reveal>
      <TextReveal
        as="h2"
        text={heading}
        className="mt-6 max-w-2xl zn-h2 font-sans font-normal"
      />
      <Stagger className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.05}>
        <div className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7">
          <p className="zn-label text-zn-text-3">Best for</p>
          <ul className="mt-4 grid gap-3">
            {bestFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-zn-text"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2px] border border-zn-border bg-zn-bg-2 p-7">
          <p className="zn-label text-zn-text-3">Not best for</p>
          <ul className="mt-4 grid gap-3">
            {notBestFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-zn-text-2"
              >
                <X
                  className="mt-0.5 size-4 shrink-0 text-zn-text-3"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Stagger>
    </TemplateSection>
  );
}
