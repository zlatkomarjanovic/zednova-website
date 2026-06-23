"use client";

import { useState } from "react";
import { CaseStudiesShowcaseGrid } from "@/components/sections/CaseStudiesShowcaseGrid";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { industryParents } from "@/lib/content/industry-parents";
import { industries } from "@/lib/content/industry-subs";
import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = { value: string; label: string };

const PARENT_LOOKUP = Object.fromEntries(industryParents.map((p) => [p.slug, p]));
const SUB_LOOKUP = Object.fromEntries(industries.map((i) => [i.slug, i]));

function industryMeta(slug: string) {
  return (
    PARENT_LOOKUP[slug] ?? {
      slug,
      title: SUB_LOOKUP[slug]?.title ?? slug,
      icon: SUB_LOOKUP[slug]?.icon ?? "box",
    }
  );
}

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

  const industryLookup = shown.map((c) => industryMeta(c.industry));

  return (
    <div>
      {showHeader && (
        <div className="mb-10">
          <SectionLabel withRule={false}>Latest projects</SectionLabel>
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
        <CaseStudiesShowcaseGrid
          caseStudies={shown}
          industries={industryLookup}
        />
      </div>
    </div>
  );
}
