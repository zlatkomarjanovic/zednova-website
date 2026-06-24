import { SectionLabel } from "@/ui/SectionLabel";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/ui/BlueprintTableGrid";

export type CustomSoftwareGroupSection = {
  id: string;
  label: string;
  headline: string;
  description: string;
  items: TableGridItem[];
};

export function CustomSoftwarePageGrids({
  groups,
  allItems,
}: {
  groups: CustomSoftwareGroupSection[];
  allItems: TableGridItem[];
}) {
  return (
    <>
      {groups.map((group) => (
        <div
          key={group.id}
          className="border-b border-zn-border [content-visibility:auto]"
        >
          <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-[7rem]">
            <SectionLabel withRule={false}>{group.label}</SectionLabel>
            <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
              {group.headline}
            </h2>
            <p className="zn-prose mt-5 max-w-2xl">{group.description}</p>
          </div>

          <BlueprintTableGrid items={group.items} columns={3} />
        </div>
      ))}

      <div className="[content-visibility:auto]">
        <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-[7rem]">
          <SectionLabel withRule={false}>All custom software</SectionLabel>
          <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal">
            Everything we build as custom software
          </h2>
          <p className="zn-prose mt-5 max-w-lg">
            Portals, dashboards, booking flows, intake systems, and internal
            tools — scoped and built for small teams that have outgrown
            spreadsheets and no-code limits.
          </p>
        </div>

        <BlueprintTableGrid items={allItems} columns={3} />
      </div>
    </>
  );
}
