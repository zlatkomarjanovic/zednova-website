"use client";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { SectionLabel } from "@/components/shared/SectionLabel";
import type { ComparisonRow, ComparisonSection } from "@/lib/content/agency-comparison";
import { cn } from "@/lib/utils";

function ZednovaPill({ children }: { children: string }) {
  return (
    <span className="mt-2 inline-block rounded-full bg-[#085041] px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.04em] text-[#5DCAA5]">
      {children}
    </span>
  );
}

function ComparisonTableRow({ row }: { row: ComparisonRow }) {
  return (
    <tr className="group border-b border-zn-border-dk last:border-b-0">
      <th
        scope="row"
        className="min-w-[9.5rem] border-r border-zn-border-dk bg-zn-dark-2 px-4 py-4 text-left align-top font-sans text-[11.5px] font-medium leading-snug text-zn-inv-2 md:min-w-[11rem] md:px-5 md:py-[0.875rem] md:text-xs"
      >
        {row.category}
      </th>
      <td className="min-w-[14rem] border-r border-zn-border-dk bg-[rgba(136,135,128,0.05)] px-4 py-4 align-top text-[12.5px] leading-relaxed text-[#B4B2A9] transition-colors group-hover:bg-[rgba(136,135,128,0.09)] md:min-w-[16rem] md:px-5 md:py-[0.875rem]">
        {row.traditional}
      </td>
      <td className="min-w-[14rem] border-r border-zn-border-dk bg-[rgba(127,119,221,0.07)] px-4 py-4 align-top text-[12.5px] leading-relaxed text-[#CECBF6] transition-colors group-hover:bg-[rgba(127,119,221,0.11)] md:min-w-[16rem] md:px-5 md:py-[0.875rem]">
        {row.aiAgency}
      </td>
      <td className="min-w-[14rem] bg-[rgba(29,158,117,0.06)] px-4 py-4 align-top text-[12.5px] leading-relaxed text-zn-inv transition-colors group-hover:bg-[rgba(29,158,117,0.1)] md:min-w-[16rem] md:px-5 md:py-[0.875rem]">
        {row.zednova}
        <br />
        <ZednovaPill>{row.zednovaPill}</ZednovaPill>
      </td>
    </tr>
  );
}

function ComparisonTableSection({ section }: { section: ComparisonSection }) {
  return (
    <>
      <tr className="border-b border-zn-border-dk">
        <td
          colSpan={4}
          className="bg-zn-dark-2 px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-zn-inv-2 md:px-5"
        >
          {section.title}
        </td>
      </tr>
      {section.rows.map((row) => (
        <ComparisonTableRow key={row.category} row={row} />
      ))}
    </>
  );
}

export function AgencyComparisonSection({
  label,
  heading,
  subheading,
  legend,
  columns,
  sections,
}: {
  label: string;
  heading: string;
  subheading: string;
  legend: readonly { label: string; color: string }[];
  columns: {
    category: string;
    traditional: string;
    aiAgency: string;
    zednova: string;
  };
  sections: ComparisonSection[];
}) {
  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden border-t border-zn-border-dk bg-zn-dark pb-[clamp(4rem,8vw,8rem)] pt-[clamp(3rem,6vw,5rem)] text-zn-inv"
      aria-label={heading}
    >
      <BlueprintGuides theme="dark" reveal="scroll" className="z-10" />

      <div className="zn-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel withRule={false} className="text-zn-inv-2">
                {label}
              </SectionLabel>
            </div>
          </Reveal>
          <TextReveal
            as="h2"
            text={heading}
            className="zn-h2 mt-6 font-sans font-normal text-zn-inv"
          />
          <Reveal delay={0.08}>
            <p className="zn-prose mx-auto mt-5 max-w-2xl text-zn-inv-2">{subheading}</p>
          </Reveal>
        </div>
      </div>

      <div className="zn-container-guides relative mt-10 md:mt-14">
        <BlueprintCross anchor="left" theme="dark" className="top-0 z-10 -translate-y-1/2" />
        <BlueprintCross anchor="right" theme="dark" className="top-0 z-10 -translate-y-1/2" />
        <BlueprintCross anchor="left" theme="dark" className="bottom-0 z-10 translate-y-1/2" />
        <BlueprintCross anchor="right" theme="dark" className="bottom-0 z-10 translate-y-1/2" />

        <Reveal delay={0.06}>
          <div className="zn-container-inset mb-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] text-zn-inv-2">
            {legend.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                {item.label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="relative border-y border-zn-border-dk bg-zn-dark">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] border-collapse text-left">
              <colgroup>
                <col className="w-[17%]" />
                <col className="w-[28%]" />
                <col className="w-[28%]" />
                <col className="w-[27%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-zn-border-dk bg-zn-dark-2">
                  <th
                    scope="col"
                    className="border-r border-zn-border-dk px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-zn-inv-2 md:px-5"
                  >
                    {columns.category}
                  </th>
                  <th
                    scope="col"
                    className="border-r border-zn-border-dk bg-[rgba(136,135,128,0.12)] border-b-2 border-b-[#888780] px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-[#B4B2A9] md:px-5"
                  >
                    {columns.traditional}
                  </th>
                  <th
                    scope="col"
                    className="border-r border-zn-border-dk bg-[#3C3489] border-b-2 border-b-[#7F77DD] px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-[#CECBF6] md:px-5"
                  >
                    {columns.aiAgency}
                  </th>
                  <th
                    scope="col"
                    className={cn(
                      "border-b-2 border-[#1D9E75] bg-[#085041] px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-[#5DCAA5] md:px-5",
                    )}
                  >
                    {columns.zednova}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <ComparisonTableSection key={section.title} section={section} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
