"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Stagger } from "@/components/animations/Reveal";
import { Icon } from "@/ui/Icon";
import { cn } from "@/lib/utils";

export type ParentShowcaseCard = {
  slug: string;
  href: string;
  title: string;
  description: string;
  hook?: string;
  icon?: string;
  specialtyCount: number;
  topSpecialties: string[];
};

/**
 * Bento layout for exactly six parent industries.
 * Rows: [4+2], [2+4], [3+3] on a 6-column grid.
 */
const BENTO_SPANS = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
];

/** Cells whose right edge touches the container edge (no right border). */
const BENTO_LAST_IN_ROW = new Set([1, 3, 5]);

function showcaseCellBorderClass(index: number) {
  return cn(
    index < 4 && "border-b border-zn-border",
    index === 4 && "border-b border-zn-border md:border-b-0",
    index % 2 === 0 && "md:border-r md:border-zn-border",
    index % 2 === 1 && "md:border-r-0",
    !BENTO_LAST_IN_ROW.has(index) && "lg:border-r lg:border-zn-border",
    BENTO_LAST_IN_ROW.has(index) && "lg:border-r-0",
  );
}

function specialtiesLine(card: ParentShowcaseCard): string {
  const shown = card.topSpecialties.slice(0, 3);
  const rest = card.specialtyCount - shown.length;
  const base = shown.join(" · ");
  return rest > 0 ? `${base} + ${rest} more` : base;
}

export function IndustryParentShowcaseGrid({
  parents,
}: {
  parents: ParentShowcaseCard[];
}) {
  return (
    <Stagger
      className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-6"
      stagger={0.06}
    >
      {parents.map((parent, index) => {
        const isFeatured = BENTO_SPANS[index]?.includes("col-span-4");

        return (
          <Link
            key={parent.slug}
            href={parent.href}
            className={cn(
              "group relative flex h-full flex-col justify-between",
              "transition-colors duration-300 hover:bg-zn-bg-2/60",
              "px-8 py-10 sm:px-10 lg:px-12 lg:py-14",
              isFeatured ? "min-h-[20rem] lg:min-h-[24rem]" : "min-h-[20rem]",
              showcaseCellBorderClass(index),
              BENTO_SPANS[index],
            )}
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                {parent.icon ? (
                  <span className="flex size-12 items-center justify-center rounded-[4px] border border-zn-border bg-white text-zn-text">
                    <Icon name={parent.icon} className="size-5" strokeWidth={1.65} />
                  </span>
                ) : null}
                <span className="font-mono text-[11px] tabular-nums text-zn-text-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2
                className={cn(
                  "mt-8 font-sans font-normal tracking-tight text-zn-text",
                  isFeatured ? "text-2xl lg:text-[1.75rem]" : "text-xl lg:text-2xl",
                )}
              >
                {parent.title}
              </h2>

              <p
                className={cn(
                  "mt-4 leading-relaxed text-zn-text-2",
                  isFeatured ? "max-w-lg text-base" : "max-w-md text-sm lg:text-[0.9375rem]",
                )}
              >
                {parent.description}
              </p>
            </div>

            <div className="mt-10 space-y-5">
              {parent.topSpecialties.length > 0 ? (
                <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-zn-text-3">
                  {specialtiesLine(parent)}
                </p>
              ) : null}

              <span className="inline-flex items-center gap-1.5 text-sm text-zn-text">
                <span className="zn-underline">Explore {parent.title}</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        );
      })}
    </Stagger>
  );
}
