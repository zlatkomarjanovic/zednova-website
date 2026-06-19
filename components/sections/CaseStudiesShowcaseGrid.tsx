import type { CaseStudy, Industry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CaseStudyShowcaseCard } from "@/components/sections/CaseStudyShowcaseCard";

type CaseStudiesShowcaseGridProps = {
  caseStudies: CaseStudy[];
  industries: Industry[];
};

/** Two-column async grid — equal gaps, square cards, left higher / right lower. */
export function CaseStudiesShowcaseGrid({
  caseStudies,
  industries,
}: CaseStudiesShowcaseGridProps) {
  const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));

  return (
    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
      {caseStudies.map((caseStudy, index) => {
        const industry = industryBySlug[caseStudy.industry];
        return (
          <CaseStudyShowcaseCard
            key={caseStudy.slug}
            caseStudy={caseStudy}
            industryLabel={industry?.title ?? caseStudy.industry}
            industryIcon={industry?.icon ?? "briefcase"}
            className={cn(index % 2 === 0 ? "md:-translate-y-6" : "md:translate-y-6")}
          />
        );
      })}
    </div>
  );
}
