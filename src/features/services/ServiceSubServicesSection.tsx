"use client";

import { Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import type { SubServiceCard } from "@/lib/types";
import { Icon } from "@/ui/Icon";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { cn } from "@/lib/utils";

const SPAN_CLASS: Record<NonNullable<SubServiceCard["span"]>, string> = {
  "1x1": "md:col-span-1 md:row-span-1",
  "2x1": "md:col-span-2 md:row-span-1",
  "1x2": "md:col-span-1 md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

type CellLayout = {
  column: "left" | "right" | "full";
  isWide: boolean;
};

function layoutSubServiceCells(subs: SubServiceCard[]): CellLayout[] {
  let col = 0;

  return subs.map((sub) => {
    const span = sub.span ?? "1x1";
    const isWide = span === "2x1" || span === "2x2";

    if (isWide) {
      col = 0;
      return { column: "full", isWide: true };
    }

    if (col === 0) {
      col = 1;
      return { column: "left", isWide: false };
    }

    col = 0;
    return { column: "right", isWide: false };
  });
}

function subServiceCellBorderClass(layout: CellLayout) {
  return cn(
    "border-b border-zn-border-dk",
    "border-l-0 border-r-0",
    layout.isWide && "md:border-r-0",
    layout.column === "left" && "md:border-r",
    layout.column === "right" && "md:border-r-0",
  );
}

function SubServiceIcon({ name }: { name: string }) {
  return (
    <div className="mb-8 flex size-11 items-center justify-center rounded-[4px] border border-zn-border-dk bg-zn-dark text-zn-inv">
      <Icon name={name} className="size-5" strokeWidth={1.65} />
    </div>
  );
}

function SubServiceCardContent({
  sub,
  layout,
}: {
  sub: SubServiceCard;
  layout: CellLayout;
}) {
  const isFeatured = layout.isWide;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col bg-zn-dark",
        "px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14",
        subServiceCellBorderClass(layout),
        SPAN_CLASS[sub.span ?? "1x1"],
      )}
    >
      <div className="flex flex-col">
        {sub.icon ? <SubServiceIcon name={sub.icon} /> : null}

        <h3
          className={cn(
            "max-w-md font-sans font-normal leading-[1.12] tracking-[-0.02em] text-zn-inv",
            isFeatured ? "text-[1.45rem] lg:text-[1.65rem]" : "text-[1.35rem] lg:text-[1.5rem]",
          )}
        >
          {sub.title}
        </h3>

        {sub.description ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zn-inv-2 lg:text-[0.9375rem] lg:leading-[1.75]">
            {sub.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function ServiceSubServicesSection({
  subServices,
  eyebrow,
  headline,
  subtext,
}: {
  subServices: SubServiceCard[];
  eyebrow: string;
  headline: string;
  subtext: string;
}) {
  if (subServices.length === 0) return null;

  const layouts = layoutSubServiceCells(subServices);

  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden bg-zn-dark text-zn-inv"
    >
      <BlueprintGuides theme="dark" reveal="scroll" showEdgeCrosses={false} />

      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border-dk">
          <div className="zn-container-inset pt-[clamp(5rem,10vw,8rem)] pb-[clamp(3rem,6vw,5rem)]">
            <div className="mx-auto max-w-3xl text-center">
              <RevealSectionLabel eyebrow={eyebrow} />
              <TextReveal
                as="h2"
                text={headline}
                className="zn-h2 font-sans font-normal text-zn-inv"
              />
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zn-inv-2 lg:text-lg lg:leading-relaxed">
                {subtext}
              </p>
            </div>
          </div>

          <div className="relative border-t border-zn-border-dk">
            <BlueprintCross theme="dark" anchor="left" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross theme="dark" anchor="right" className="top-0 z-10 -translate-y-1/2" />
            <BlueprintCross
              theme="dark"
              anchor={50}
              className="top-0 z-10 hidden -translate-y-1/2 md:block"
            />

            <Stagger
              className="grid grid-cols-1 md:grid-flow-dense md:grid-cols-2 md:items-stretch"
              stagger={0.05}
            >
              {subServices.map((sub, index) => {
                const layout = layouts[index];

                return (
                  <SubServiceCardContent
                    key={`${sub.title}-${index}`}
                    sub={sub}
                    layout={layout}
                  />
                );
              })}
            </Stagger>

            <BlueprintCross
              theme="dark"
              anchor="left"
              className="bottom-0 z-10 translate-y-1/2"
            />
            <BlueprintCross
              theme="dark"
              anchor="right"
              className="bottom-0 z-10 translate-y-1/2"
            />
            <BlueprintCross
              theme="dark"
              anchor={50}
              className="bottom-0 z-10 hidden translate-y-1/2 md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealSectionLabel({ eyebrow }: { eyebrow: string }) {
  return (
    <div className="flex justify-center">
      <SectionLabel withRule={false} className="text-zn-inv-2">
        {eyebrow}
      </SectionLabel>
    </div>
  );
}
