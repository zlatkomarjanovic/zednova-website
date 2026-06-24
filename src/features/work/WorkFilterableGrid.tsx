"use client";

import { useMemo, useState } from "react";
import { PortfolioWorkGrid } from "@/features/work/PortfolioWorkGrid";
import type { PortfolioProject } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER = ["Websites", "SaaS", "Real estate", "Nonprofit"] as const;

export function WorkFilterableGrid({ projects }: { projects: PortfolioProject[] }) {
  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return CATEGORY_ORDER.filter((cat) => present.has(cat));
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      <div className="bg-zn-bg-2">
        <div className="zn-container-inset flex flex-wrap items-center gap-2 py-6 md:py-7">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors",
              activeCategory === null
                ? "border-zn-text bg-zn-text text-zn-inv"
                : "border-zn-border text-zn-text-2 hover:border-zn-text hover:text-zn-text",
            )}
          >
            All
          </button>
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(active ? null : cat)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors",
                  active
                    ? "border-zn-text bg-zn-text text-zn-inv"
                    : "border-zn-border text-zn-text-2 hover:border-zn-text hover:text-zn-text",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="zn-container-inset flex items-center justify-between gap-4 border-t border-zn-border py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {activeCategory ? ` · ${activeCategory}` : null}
          </p>
          {activeCategory ? (
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="text-xs text-zn-text-2 underline underline-offset-4 transition-opacity hover:text-zn-text"
            >
              Clear filter
            </button>
          ) : null}
        </div>
      </div>

      <div className="zn-container-inset py-14 lg:py-16">
        {filtered.length > 0 ? (
          <PortfolioWorkGrid projects={filtered} className="mt-0" />
        ) : (
          <div className="py-20 text-center">
            <p className="zn-label text-zn-text-3">No projects</p>
            <p className="mt-4 text-lg text-zn-text-2">
              No projects match this filter.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="mt-6 text-sm text-zn-text underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </>
  );
}
