import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/ui/SectionLabel";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/ui/BlueprintTableGrid";

export type ServicesGroupSection = {
  id: string;
  label: string;
  headline: string;
  description?: string;
  items: TableGridItem[];
  exploreHref?: string;
  exploreLabel?: string;
};

export function ServicesPageGrids({
  coreServices,
  groups,
}: {
  coreServices: TableGridItem[];
  groups: ServicesGroupSection[];
}) {
  return (
    <>
      <div>
        <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-[7rem]">
          <SectionLabel withRule={false}>Core services</SectionLabel>
          <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
            Six ways we help you grow
          </h2>
          <p className="zn-prose mt-5 max-w-2xl">
            Start here. Each core service is a full scope with clear
            deliverables — websites, stores, custom software, automation, AI
            tools, and ongoing support after launch.
          </p>
        </div>

        <BlueprintTableGrid items={coreServices} columns={3} />
      </div>

      {groups.map((group, index) => (
        <div
          key={group.id}
          className="[content-visibility:auto]"
        >
          <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-[7rem]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <SectionLabel withRule={false}>{group.label}</SectionLabel>
                <h2 className="mt-5 zn-h2 font-sans font-normal text-zn-text">
                  {group.headline}
                </h2>
                {group.description ? (
                  <p className="zn-prose mt-5 max-w-lg">{group.description}</p>
                ) : null}
              </div>
              {group.exploreHref && group.exploreLabel ? (
                <Link
                  href={group.exploreHref}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-zn-text"
                >
                  <span className="zn-underline">{group.exploreLabel}</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </div>

          <BlueprintTableGrid
            items={group.items}
            columns={3}
            showEdgeCrosses={index < groups.length - 1}
          />
        </div>
      ))}
    </>
  );
}
