import { SectionLabel } from "@/ui/SectionLabel";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/ui/BlueprintTableGrid";

export type ServicesGroupSection = {
  id: string;
  label: string;
  headline: string;
  items: TableGridItem[];
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
      {/* 6 core services — matches mega menu */}
      <div className="border-b border-zn-border">
        <div className="zn-container-inset border-b border-zn-border py-12 lg:py-14">
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

      {/* All services by category */}
      <div className="zn-container-inset border-b border-zn-border py-12 lg:py-14">
        <SectionLabel withRule={false}>All services</SectionLabel>
        <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
          Browse by category
        </h2>
        <p className="zn-prose mt-5 max-w-2xl">
          Every individual service we offer, grouped so you can scan what fits
          your project and jump straight to the detail page.
        </p>
      </div>

      {groups.map((group) => (
        <div
          key={group.id}
          className="border-b border-zn-border last:border-b-0 [content-visibility:auto]"
        >
          <div className="zn-container-inset border-b border-zn-border py-10 lg:py-12">
            <SectionLabel withRule={false}>{group.label}</SectionLabel>
            <h3 className="mt-4 max-w-2xl text-xl font-sans font-normal leading-snug text-zn-text lg:text-2xl">
              {group.headline}
            </h3>
          </div>

          <BlueprintTableGrid items={group.items} columns={3} />
        </div>
      ))}
    </>
  );
}
