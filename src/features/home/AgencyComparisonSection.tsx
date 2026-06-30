"use client";

import { Fragment } from "react";
import { Check, X } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import { SectionLabel } from "@/ui/SectionLabel";
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
          "min-w-[9rem] border-r border-zn-border-dk bg-[rgba(136,135,128,0.05)] text-[#B4B2A9] lg:transition-colors lg:group-hover:bg-[rgba(136,135,128,0.09)] md:min-w-[10rem]",
        )}
      >
        {row.agencies}
      </td>
      <td
        className={cn(
          CELL,
          "min-w-[9rem] bg-[rgba(29,158,117,0.06)] text-zn-inv lg:transition-colors lg:group-hover:bg-[rgba(29,158,117,0.1)] md:min-w-[10rem]",
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

function ComparisonIconCell({
  value,
  highlight,
  label,
}: {
  value: boolean;
  highlight?: boolean;
  label: string;
}) {
  return (
    <td
      className={cn(
        "w-[3rem] border-l border-zn-border-dk px-0.5 py-3 text-center align-middle sm:w-12 sm:px-1",
        highlight ? "bg-[rgba(59,130,246,0.14)]" : "bg-zn-dark",
      )}
    >
      <span className="sr-only">
        {label}: {value ? "yes" : "no"}
      </span>
      {value ? (
        <Check
          className="mx-auto size-4 stroke-[2.5] text-[#4ade80]"
          aria-hidden="true"
        />
      ) : (
        <X
          className="mx-auto size-4 stroke-[2.5] text-[#f87171]"
          aria-hidden="true"
        />
      )}
    </td>
  );
}

function ComparisonMobileTable({
  sections,
  columns,
}: {
  sections: ComparisonSection[];
  columns: {
    category: string;
    agencies: string;
    otherAi: string;
    zednova: string;
  };
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zn-border-dk bg-zn-dark lg:hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-zn-border-dk bg-zn-dark-2">
              <th
                scope="col"
                className="w-[38%] max-w-[8.5rem] px-2 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-zn-inv-2 sm:max-w-[9.5rem] sm:px-3 sm:text-[11px]"
              >
                {columns.category}
              </th>
              <th
                scope="col"
                className="w-[20%] border-l border-zn-border-dk px-0.5 py-3 text-center font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.04em] text-[#B4B2A9] sm:px-1 sm:text-[10px]"
              >
                <span className="mx-auto block max-w-[2.75rem] leading-tight sm:max-w-none">{columns.agencies}</span>
              </th>
              <th
                scope="col"
                className="w-[20%] border-l border-zn-border-dk px-0.5 py-3 text-center font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.04em] text-[#B4B2A9] sm:px-1 sm:text-[10px]"
              >
                <span className="mx-auto block max-w-[2.75rem] leading-tight sm:max-w-none">{columns.otherAi}</span>
              </th>
              <th
                scope="col"
                className="w-[22%] border-l border-zn-border-dk bg-[#1e3a5f] px-0.5 py-3 text-center font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.04em] text-[#93c5fd] sm:px-1 sm:text-[10px]"
              >
                <span className="mx-auto block max-w-[2.75rem] leading-tight sm:max-w-none">{columns.zednova}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <Fragment key={section.title}>
                <tr className="border-b border-zn-border-dk">
                  <td
                    colSpan={4}
                    className="bg-zn-dark-2 px-2 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-zn-inv-2 sm:px-3 sm:text-[11px]"
                  >
                    {section.title}
                  </td>
                </tr>
                {section.rows.map((row) => (
                  <tr
                    key={row.category}
                    className="border-b border-zn-border-dk last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-[38%] max-w-[8.5rem] px-2 py-2.5 text-left text-xs font-medium leading-snug text-zn-inv sm:max-w-[9.5rem] sm:px-3 sm:py-3 sm:text-[0.8125rem]"
                    >
                      {row.category}
                    </th>
                    <ComparisonIconCell
                      value={row.traditionalHas}
                      label={columns.agencies}
                    />
                    <ComparisonIconCell value={row.otherAiHas} label={columns.otherAi} />
                    <ComparisonIconCell
                      value={row.zednovaHas}
                      highlight
                      label={columns.zednova}
                    />
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AgencyComparisonSection({
  label,
  heading,
  subheading,
  quote,
  availabilityTag,
  columns,
  sections,
}: {
  label: string;
  heading: string;
  subheading: string;
  quote: string;
  availabilityTag: string;
  columns: {
    category: string;
    agencies: string;
    otherAi: string;
    zednova: string;
  };
  sections: ComparisonSection[];
}) {
  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden border-t border-zn-border-dk bg-zn-dark pb-[clamp(4rem,8vw,7rem)] pt-[clamp(2.5rem,5vw,4rem)] text-zn-inv"
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
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-0">
            <ComparisonMobileTable sections={sections} columns={columns} />
          </div>

          <div className="mx-auto hidden max-w-3xl overflow-hidden rounded-xl border border-zn-border-dk bg-zn-dark lg:block">
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

        <div className="mx-auto mt-16 max-w-3xl px-6 pb-4 pt-2 text-center md:mt-20 md:pb-6 lg:max-w-4xl lg:pt-4">
          <TextReveal
            as="blockquote"
            text={quote}
            className="zn-accent-italic text-[clamp(1.25rem,2.35vw,1.875rem)] leading-[1.45] text-zn-inv"
            stagger={0.032}
            start="top 88%"
          />
          <Reveal delay={0.2}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#1D9E75]/40 bg-[#085041]/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#5DCAA5]">
              <span className="size-1.5 rounded-full bg-[#5DCAA5]" aria-hidden="true" />
              {availabilityTag}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
