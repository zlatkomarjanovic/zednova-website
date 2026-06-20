import type { PortfolioProject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PortfolioShowcaseCard } from "@/components/sections/PortfolioShowcaseCard";

type PortfolioWorkGridProps = {
  projects: PortfolioProject[];
};

/** Our Work section — info cards that reveal mockup images on hover. */
export function PortfolioWorkGrid({ projects }: PortfolioWorkGridProps) {
  return (
    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <PortfolioShowcaseCard
          key={project.slug}
          project={project}
          className={cn(index % 2 === 0 ? "md:-translate-y-6" : "md:translate-y-6")}
        />
      ))}
    </div>
  );
}
