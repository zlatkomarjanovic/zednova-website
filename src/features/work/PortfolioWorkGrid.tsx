import type { PortfolioProject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PortfolioShowcaseCard } from "@/features/work/PortfolioShowcaseCard";

type PortfolioWorkGridProps = {
  projects: PortfolioProject[];
  className?: string;
};

/** Our Work section — info cards that reveal mockup images on hover. */
export function PortfolioWorkGrid({ projects, className }: PortfolioWorkGridProps) {
  return (
    <div className={cn("mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2", className)}>
      {projects.map((project, index) => (
        <PortfolioShowcaseCard
          key={project.slug}
          project={project}
          className={cn(index % 2 === 0 ? "lg:-translate-y-6" : "lg:translate-y-6")}
        />
      ))}
    </div>
  );
}
