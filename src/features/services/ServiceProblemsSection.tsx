"use client";

import { Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import type { PainPoint } from "@/lib/types";
import { cn } from "@/lib/utils";

function problemCellSurface(index: number) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return (row + col) % 2 === 0 ? "bg-zn-bg-2" : "bg-zn-bg";
}

/** Internal dividers only — no outer left/right lines (container guides handle edges). */
function problemCellBorderClass(index: number) {
  return cn(
    "border-b border-zn-border",
    // 1 column — side borders off; horizontal dividers only
    "border-l-0 border-r-0",
    // 2 columns
    index % 2 === 0 && "sm:border-r sm:border-l-0",
    index % 2 === 1 && "sm:border-r-0",
    // 3 columns
    index % 3 === 0 && "lg:border-l-0 lg:border-r",
    index % 3 === 1 && "lg:border-r",
    index % 3 === 2 && "lg:border-r-0",
  );
}

function ProblemIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-8 flex size-14 items-center justify-center rounded-full border border-zn-border/80 bg-zn-bg shadow-[0_1px_0_rgba(20,20,20,0.04)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="size-9 object-contain" loading="lazy" />
    </div>
  );
}

export function ServiceProblemsSection({
  problems,
  headline,
  showTopBorder = true,
}: {
  problems: PainPoint[];
  headline: string;
  showTopBorder?: boolean;
}) {
  if (problems.length === 0) return null;

  return (
    <div className={cn(showTopBorder && "border-t border-zn-border")}>
      <div className="zn-container-inset pt-[clamp(4rem,8vw,6.5rem)] pb-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto max-w-4xl text-center">
          <TextReveal
            as="h2"
            text={headline}
            className="zn-h2 font-sans font-normal text-zn-text"
          />
        </div>
      </div>

      <Stagger
        className="grid w-full grid-cols-1 border-t border-zn-border sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.05}
      >
        {problems.map((problem, index) => (
          <article
            key={`${problem.title}-${index}`}
            className={cn(
              "flex min-h-[18rem] flex-col px-8 py-11 sm:px-10 sm:py-12 lg:min-h-[20rem] lg:px-12 lg:py-14",
              problemCellSurface(index),
              problemCellBorderClass(index),
            )}
          >
            {problem.icon ? <ProblemIcon src={problem.icon} alt={problem.title} /> : null}

            <h3 className="max-w-[18rem] font-sans text-[1.35rem] font-normal leading-[1.15] tracking-[-0.02em] text-zn-text lg:text-[1.5rem]">
              {problem.title}
            </h3>

            {problem.subheading ? (
              <p className="mt-3 max-w-[18rem] font-sans text-sm font-medium leading-snug text-zn-text-2 lg:text-[0.9375rem]">
                {problem.subheading}
              </p>
            ) : null}

            {problem.description ? (
              <p className="mt-5 max-w-[20rem] text-sm leading-relaxed text-zn-text-2 lg:text-[0.9375rem] lg:leading-[1.7]">
                {problem.description}
              </p>
            ) : null}
          </article>
        ))}
      </Stagger>
    </div>
  );
}
