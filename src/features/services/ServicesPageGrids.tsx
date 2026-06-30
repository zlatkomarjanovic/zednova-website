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
          <SectionLabel withRule={false}>Core offers</SectionLabel>
          <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
            Six parent offers for small businesses that want more booked calls
          </h2>
          <p className="zn-prose mt-5 max-w-2xl">
            Start here. Each offer is a clear scope — lead-gen websites, CRM
            follow-up, AI receptionists, portals and dashboards, platform
            migrations, or monthly support after launch.
          </p>
        </div>

        <BlueprintTableGrid items={coreServices} columns={4} />
      </div>

      {groups.map((group, index) => (
        <div key={group.id}>
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
            columns={4}
            showEdgeCrosses={index < groups.length - 1}
          />
        </div>
      ))}
    </>
  );
}
