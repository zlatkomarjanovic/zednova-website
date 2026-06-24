import { SectionLabel } from "@/ui/SectionLabel";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/ui/BlueprintTableGrid";

export function MigrationsPageGrids({ items }: { items: TableGridItem[] }) {
  return (
    <div className="[content-visibility:auto]">
      <div className="zn-container-inset border-b border-zn-border bg-zn-bg-2 py-[7rem]">
        <SectionLabel withRule={false}>All migrations</SectionLabel>
        <h2 className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-text">
          From anything, to a modern stack
        </h2>
        <p className="zn-prose mt-5 max-w-lg">
          Each migration keeps your content, redirects, and SEO intact. Pick
          the path that matches where you are today.
        </p>
      </div>

      <BlueprintTableGrid items={items} columns={3} />
    </div>
  );
}
