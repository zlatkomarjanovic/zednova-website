"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { IndustryBuildCard, IndustryPageContent } from "@/lib/types/industry-page";
import { Stagger } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintGuides } from "@/ui/BlueprintGuides";
import { SectionLabel } from "@/ui/SectionLabel";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { CmsImage } from "@/ui/CmsImage";
import { Icon } from "@/ui/Icon";
import { cn } from "@/lib/utils";
import { hasSectionContent } from "@/lib/content/resolve-industry-page";

const SPAN_CLASS: Record<NonNullable<IndustryBuildCard["span"]>, string> = {
  "1x1": "md:col-span-1 md:row-span-1",
  "2x1": "md:col-span-2 md:row-span-1",
  "1x2": "md:col-span-1 md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

type CellLayout = {
  column: "left" | "right" | "full";
  isWide: boolean;
};

function layoutBuildCells(cards: IndustryBuildCard[]): CellLayout[] {
  let col = 0;

  return cards.map((card) => {
    const span = card.span ?? "1x1";
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

function cellBorderClass(layout: CellLayout) {
  return cn(
    "border-b border-zn-border-dk",
    "border-l-0 border-r-0",
    layout.isWide && "md:border-r-0",
    layout.column === "left" && "md:border-r",
    layout.column === "right" && "md:border-r-0",
  );
}

function BuildCard({
  card,
  layout,
}: {
  card: IndustryBuildCard;
  layout: CellLayout;
}) {
  const isFeatured = layout.isWide;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden bg-zn-dark",
        "px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14",
        cellBorderClass(layout),
        SPAN_CLASS[card.span ?? "1x1"],
      )}
    >
      {card.image ? (
        <div className="relative -mx-8 -mt-10 mb-8 aspect-[16/9] overflow-hidden sm:-mx-10 sm:-mt-12 md:aspect-auto md:h-48 lg:h-56">
          <CmsImage
            src={card.image}
            alt={card.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zn-dark via-zn-dark/20 to-transparent" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col">
        {card.icon ? (
          <div className="mb-6 flex size-11 items-center justify-center rounded-[4px] border border-zn-border-dk bg-zn-dark text-zn-inv">
            <Icon name={card.icon} className="size-5" strokeWidth={1.65} />
          </div>
        ) : null}

        {card.subtitle ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zn-inv-2">
            {card.subtitle}
          </p>
        ) : null}

        <h3
          className={cn(
            "max-w-md font-sans font-normal leading-[1.12] tracking-[-0.02em] text-zn-inv",
            isFeatured ? "text-[1.45rem] lg:text-[1.65rem]" : "text-[1.35rem] lg:text-[1.5rem]",
            card.subtitle && "mt-2",
          )}
        >
          {card.title}
        </h3>

        <p className="mt-4 max-w-xl flex-1 text-sm leading-relaxed text-zn-inv-2 lg:text-[0.9375rem] lg:leading-[1.75]">
          {card.body}
        </p>

        {card.bestFor ? (
          <p className="mt-5 text-xs leading-relaxed text-zn-inv-2/80">
            <span className="font-medium text-zn-inv">Best for:</span> {card.bestFor}
          </p>
        ) : null}

        {card.serviceHref ? (
          <Link
            href={card.serviceHref}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-zn-inv transition-colors hover:text-white"
          >
            View service
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function IndustryBuildBentoSection({
  section,
}: {
  section: IndustryPageContent["builds"];
}) {
  if (!hasSectionContent(section.cards) || !section.heading) return null;

  const layouts = layoutBuildCells(section.cards);

  return (
    <section
      data-theme="dark"
      data-bg="dark"
      className="relative overflow-hidden bg-zn-dark text-zn-inv"
    >
      <BlueprintGuides theme="dark" reveal="immediate" className="z-10" />
      <div className="zn-container-guides relative">
        <div className="relative border-x border-b border-zn-border-dk">
          <BlueprintCross anchor="left" theme="dark" className="top-0 -translate-y-1/2" />
          <BlueprintCross anchor="right" theme="dark" className="top-0 -translate-y-1/2" />

          <div className="zn-container-inset py-[clamp(3rem,6vw,5rem)] pb-8 md:pb-10">
            {section.eyebrow ? (
              <SectionLabel withRule={false} className="text-zn-inv-2">
                {section.eyebrow}
              </SectionLabel>
            ) : null}
            <TextReveal
              as="h2"
              text={section.heading}
              className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-inv"
            />
            {section.subheading ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zn-inv-2">
                {section.subheading}
              </p>
            ) : null}
          </div>

          <Stagger
            className="grid auto-rows-fr grid-cols-1 border-t border-zn-border-dk md:grid-cols-2"
            stagger={0.05}
          >
            {section.cards.map((card, index) => (
              <BuildCard key={card.title} card={card} layout={layouts[index]!} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
