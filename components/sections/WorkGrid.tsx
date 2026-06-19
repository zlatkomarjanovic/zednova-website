"use client";

import { useState } from "react";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";

export function WorkGrid({
  caseStudies,
  filters,
  showHeader = true,
}: {
  caseStudies: CaseStudy[];
  filters: { value: string; label: string }[];
  showHeader?: boolean;
}) {
  const [active, setActive] = useState("all");
  const shown =
    active === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === active);

  return (
    <div>
      {showHeader && (
        <SectionHeading
          label="Latest projects"
          title="Deep-dive into our full-service case studies"
        />
      )}

      <div className={cn("flex flex-wrap gap-2", showHeader && "mt-10")}>
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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {shown.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </div>
  );
}
