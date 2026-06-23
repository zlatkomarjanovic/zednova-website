import { SectionLabel } from "@/components/shared/SectionLabel";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/components/shared/BlueprintTableGrid";

export type ServicesGroupSection = {
  id: string;
  label: string;
  headline: string;
  items: TableGridItem[];
};

export function ServicesPageGrids({
  groups,
}: {
  groups: ServicesGroupSection[];
}) {
  return (
    <>
      {groups.map((group) => (
        <div
          key={group.id}
          className="border-b border-zn-border last:border-b-0 [content-visibility:auto]"
        >
          <div className="zn-container-inset border-b border-zn-border py-12 lg:py-14">
            <SectionLabel withRule={false}>{group.label}</SectionLabel>
            <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
              {group.headline}
            </h2>
          </div>

          <BlueprintTableGrid items={group.items} columns={3} />
        </div>
      ))}
    </>
  );
}
