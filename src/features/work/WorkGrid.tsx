"use client";

import { useState } from "react";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/ui/BlueprintTableGrid";
import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = { value: string; label: string };

export function WorkGrid({
  caseStudies,
  filters,
  showHeader = true,
}: {
  caseStudies: CaseStudy[];
  filters: Filter[];
  showHeader?: boolean;
}) {
  const [active, setActive] = useState("all");
  const shown =
    active === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === active);

  const items: TableGridItem[] = shown.map((c) => ({
    href: `/work/${c.slug}`,
    title: c.title,
    description: c.resultHeadline,
  }));

  return (
    <div>
      {showHeader && (
        <div className="mb-10">
          <p className="zn-label text-zn-text-3">Latest projects</p>
          <h2 className="mt-5 max-w-2xl zn-h2 font-sans font-normal">
            Deep-dive into our full-service case studies
          </h2>
        </div>
      )}

      <div className={cn("flex flex-wrap gap-2", showHeader && "mt-6")}>
        {[{ value: "all", label: "All work" }, ...filters].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActive(filter.value)}
            className={cn(
              "rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors",
              active === filter.value
                ? "border-zn-text bg-zn-text text-zn-inv"
                : "border-zn-border text-zn-text-2 hover:border-zn-text hover:text-zn-text",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <BlueprintTableGrid items={items} columns={3} />
      </div>
    </div>
  );
}
