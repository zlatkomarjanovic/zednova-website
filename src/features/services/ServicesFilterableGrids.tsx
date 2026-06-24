"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { BlueprintTableGrid, type TableGridItem } from "@/ui/BlueprintTableGrid";
import {
  ServicesPageGrids,
  type ServicesGroupSection,
} from "@/features/services/ServicesPageGrids";
import { cn } from "@/lib/utils";

export type ServiceGridEntry = TableGridItem & {
  category: string;
};

type ServicesFilterableGridsProps = {
  coreServices: TableGridItem[];
  groups: ServicesGroupSection[];
  allServices: ServiceGridEntry[];
};

export function ServicesFilterableGrids({
  coreServices,
  groups,
  allServices,
}: ServicesFilterableGridsProps) {
  const categories = useMemo(() => {
    const order = [
      "Core",
      "AI Tools",
      "AI automation",
      "Websites",
      "Ecommerce",
      "Custom software",
      "Migrations",
    ];
    const present = new Set(allServices.map((s) => s.category));
    return order.filter((cat) => present.has(cat));
  }, [allServices]);

  const [activeCategory, setActiveCategory] = useState<string | null>("Core");
  const [query, setQuery] = useState("");

  const isFiltering = activeCategory !== null || query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allServices.filter((service) => {
      if (activeCategory && service.category !== activeCategory) return false;
      if (!q) return true;
      return (
        service.title.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        (service.includes?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [allServices, activeCategory, query]);

  function clearFilters() {
    setQuery("");
    setActiveCategory("Core");
  }

  return (
    <>
      <div className="bg-zn-bg-2">
        <div className="zn-container-inset flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:py-7">
          <div className="flex flex-wrap items-center gap-2">
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

          <div className="relative w-full md:max-w-xs">
            <label htmlFor="services-search" className="sr-only">
              Search services
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zn-text-3"
              aria-hidden="true"
            />
            <input
              id="services-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…"
              className="w-full rounded-full border border-zn-border bg-zn-bg py-2 pl-9 pr-9 text-sm text-zn-text outline-none transition-colors placeholder:text-zn-text-3 focus:border-zn-text"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zn-text-3 transition-colors hover:text-zn-text"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="zn-container-inset flex items-center justify-between gap-4 border-t border-zn-border py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3">
            {isFiltering
              ? `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`
              : `${allServices.length} services`}
            {activeCategory ? ` · ${activeCategory}` : null}
            {query.trim() ? ` · “${query.trim()}”` : null}
          </p>
          {isFiltering ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-zn-text-2 underline underline-offset-4 transition-opacity hover:text-zn-text"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {isFiltering ? (
        filtered.length > 0 ? (
          <BlueprintTableGrid items={filtered} columns={3} showEdgeCrosses={false} />
        ) : (
          <div className="zn-container-inset py-20 text-center">
              <p className="zn-label text-zn-text-3">No results</p>
              <p className="mt-4 text-lg text-zn-text-2">
                No services match your search
                {activeCategory ? ` in ${activeCategory}` : ""}.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 text-sm text-zn-text underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Clear all filters
              </button>
            </div>
        )
      ) : (
        <ServicesPageGrids coreServices={coreServices} groups={groups} />
      )}
    </>
  );
}
