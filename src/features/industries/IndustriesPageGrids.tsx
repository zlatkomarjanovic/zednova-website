import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/ui/SectionLabel";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/ui/BlueprintTableGrid";

export type IndustriesGroupSection = {
  id: string;
  parentTitle: string;
  parentSlug: string;
  headline: string;
  description: string;
  items: TableGridItem[];
};

export function IndustriesPageGrids({
  groups,
  allIndustries,
}: {
  groups: IndustriesGroupSection[];
  allIndustries: TableGridItem[];
}) {
  return (
    <>
      {groups.map((group) => (
        <div
          key={group.id}
          className="border-b border-zn-border [content-visibility:auto]"
        >
          <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-[7rem]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <SectionLabel withRule={false}>{group.parentTitle}</SectionLabel>
                <h2 className="mt-5 zn-h2 font-sans font-normal">{group.headline}</h2>
                <p className="zn-prose mt-5 max-w-lg">{group.description}</p>
              </div>
              <Link
                href={
                  group.parentSlug === "small-business-custom-software"
                    ? "/custom-software"
                    : `/industries/${group.parentSlug}`
                }
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zn-text"
              >
                <span className="zn-underline">Explore {group.parentTitle}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <BlueprintTableGrid items={group.items} columns={3} />
        </div>
      ))}

      <div className="[content-visibility:auto]">
        <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-[7rem]">
          <SectionLabel withRule={false}>All industries</SectionLabel>
          <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal">
            More teams we build for
          </h2>
          <p className="zn-prose mt-5 max-w-lg">
            Beyond our three focus areas, we ship websites, stores, and
            automations for a wide range of teams. If yours is not listed, ask
            — we have likely built something close.
          </p>
        </div>

        <BlueprintTableGrid items={allIndustries} columns={3} />
      </div>
    </>
  );
}
