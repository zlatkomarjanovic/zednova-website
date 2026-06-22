"use client";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintGuides } from "@/components/shared/BlueprintGuides";
import { SectionLabel } from "@/components/shared/SectionLabel";
import type { ComparisonRow, ComparisonSection } from "@/lib/content/agency-comparison";
import { cn } from "@/lib/utils";

const CELL =
  "px-3 py-2.5 align-top text-[11px] leading-snug md:px-4 md:py-3 md:text-[11.5px]";
const ROW_LABEL =
  "min-w-[6.5rem] border-r border-zn-border-dk bg-zn-dark-2 font-sans text-[11px] font-medium leading-snug text-zn-inv md:min-w-[7.5rem] md:text-[11.5px]";

function ColumnIcon({ color }: { color: string }) {
  return (
    <span
      className="mr-1.5 inline-block size-2 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

function ZednovaPill({ children }: { children: string }) {
  return (
    <span className="mt-1.5 inline-block rounded-full bg-[#085041] px-2 py-px font-mono text-[9px] font-medium uppercase tracking-[0.04em] text-[#5DCAA5]">
      {children}
    </span>
  );
}

function ComparisonTableRow({ row }: { row: ComparisonRow }) {
  return (
    <tr className="group border-b border-zn-border-dk last:border-b-0">
      <th scope="row" className={cn(ROW_LABEL, CELL, "text-left")}>
        {row.category}
      </th>
      <td
        className={cn(
          CELL,
          "min-w-[9rem] border-r border-zn-border-dk bg-[rgba(136,135,128,0.05)] text-[#B4B2A9] transition-colors group-hover:bg-[rgba(136,135,128,0.09)] md:min-w-[10rem]",
        )}
      >
        {row.agencies}
      </td>
      <td
        className={cn(
          CELL,
          "min-w-[9rem] bg-[rgba(29,158,117,0.06)] text-zn-inv transition-colors group-hover:bg-[rgba(29,158,117,0.1)] md:min-w-[10rem]",
        )}
      >
        <span className="block">{row.zednova}</span>
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
          colSpan={3}
          className="bg-zn-dark-2 px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-zn-inv-2 md:px-4"
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
  columns,
  sections,
}: {
  label: string;
  heading: string;
  subheading: string;
  columns: {
    category: string;
    agencies: string;
    zednova: string;
  };
  sections: ComparisonSection[];
}) {
  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden border-t border-zn-border-dk bg-zn-dark pb-[clamp(3rem,6vw,6rem)] pt-[clamp(2.5rem,5vw,4rem)] text-zn-inv"
      aria-label={heading}
    >
      <BlueprintGuides theme="dark" reveal="scroll" className="z-10" />

      <div className="zn-container relative">
        <div className="mx-auto max-w-2xl text-center">
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
            className="zn-h2 mt-5 font-sans font-normal text-zn-inv"
          />
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zn-inv-2">
              {subheading}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="zn-container-guides relative mt-8 md:mt-10">
        <Reveal delay={0.06}>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-zn-border-dk bg-zn-dark">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-left">
                <colgroup>
                  <col className="w-[26%]" />
                  <col className="w-[37%]" />
                  <col className="w-[37%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-zn-border-dk bg-zn-dark-2">
                    <th
                      scope="col"
                      className="border-r border-zn-border-dk px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.06em] text-zn-inv-2 md:px-4"
                    >
                      {columns.category}
                    </th>
                    <th
                      scope="col"
                      className="border-r border-zn-border-dk bg-[rgba(136,135,128,0.12)] px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.06em] text-[#B4B2A9] md:px-4"
                    >
                      <ColumnIcon color="#888780" />
                      {columns.agencies}
                    </th>
                    <th
                      scope="col"
                      className="bg-[#085041] px-3 py-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.06em] text-[#5DCAA5] md:px-4"
                    >
                      <ColumnIcon color="#1D9E75" />
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
        </Reveal>
      </div>
    </section>
  );
}
