import Link from "next/link";
import { TemplateSection } from "@/ui/TemplateSection";
import { SectionLabel } from "@/ui/SectionLabel";
import { Reveal } from "@/components/animations/Reveal";

export type EntitySummaryField = {
  label: string;
  value: string;
};

export type EntitySummaryLink = {
  label: string;
  href: string;
};

/**
 * Compact entity summary block for service, industry, and case-study pages.
 * Renders plain-text key/value pairs that AI agents can quote directly.
 */
export function EntitySummary({
  fields,
  links,
  intro,
}: {
  fields: EntitySummaryField[];
  links?: EntitySummaryLink[];
  intro?: string;
}) {
  if (!fields.length && !links?.length) return null;

  return (
    <TemplateSection className="bg-zn-bg-2/40" borderBottom={false}>
      <Reveal>
        <SectionLabel withRule={false}>Entity summary</SectionLabel>
      </Reveal>
      {intro && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zn-text-2">
          {intro}
        </p>
      )}
      <dl className="mt-8 grid gap-x-10 gap-y-4 border-t border-zn-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <div key={field.label} className="grid gap-1">
            <dt className="zn-label text-zn-text-3">{field.label}</dt>
            <dd className="text-sm leading-relaxed text-zn-text">{field.value}</dd>
          </div>
        ))}
      </dl>

      {links && links.length > 0 && (
        <div className="mt-8 border-t border-zn-border pt-6">
          <p className="zn-label text-zn-text-3">Related pages</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zn-text underline-offset-4 hover:text-zn-text-3 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </TemplateSection>
  );
}
