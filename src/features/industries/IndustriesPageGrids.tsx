"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  BlueprintTableGrid,
  type TableGridItem,
} from "@/ui/BlueprintTableGrid";
import { cn } from "@/lib/utils";

export type IndustryParentCard = {
  slug: string;
  href: string;
  title: string;
};

export type IndustrySegmentEntry = TableGridItem & {
  parentSlug: string;
  parentTitle: string;
};

export function IndustriesPageGrids({
  parents,
  segments,
}: {
  parents: IndustryParentCard[];
  segments: IndustrySegmentEntry[];
}) {
  const defaultParent = parents[0]?.slug ?? null;
  const [activeParent, setActiveParent] = useState<string | null>(defaultParent);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return segments.filter((item) => {
      if (activeParent && item.parentSlug !== activeParent) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.parentTitle.toLowerCase().includes(q)
      );
    });
  }, [segments, activeParent, query]);

  function clearFilters() {
    setActiveParent(defaultParent);
    setQuery("");
  }

  return (
    <>
      <div className="border-b border-zn-border bg-zn-bg-2">
        <div className="zn-container-inset flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:py-7">
          <div className="flex flex-wrap items-center gap-2">
            {parents.map((parent) => {
              const active = parent.slug === activeParent;
              return (
                <button
                  key={parent.slug}
                  type="button"
                  onClick={() => setActiveParent(parent.slug)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors",
                    active
                      ? "border-zn-text bg-zn-text text-zn-inv"
                      : "border-zn-border text-zn-text-2 hover:border-zn-text hover:text-zn-text",
                  )}
                >
                  {parent.title}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:max-w-xs">
            <label htmlFor="industries-search" className="sr-only">
              Search specialties
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zn-text-3"
              aria-hidden="true"
            />
            <input
              id="industries-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search specialties…"
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
            {filtered.length} {filtered.length === 1 ? "specialty" : "specialties"}
            {activeParent
              ? ` · ${parents.find((p) => p.slug === activeParent)?.title ?? ""}`
              : null}
          </p>
          {query ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-zn-text-2 underline underline-offset-4 transition-opacity hover:text-zn-text"
            >
              Clear search
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length > 0 ? (
        <BlueprintTableGrid items={filtered} columns={3} showEdgeCrosses={false} />
      ) : (
        <div className="zn-container-inset py-20 text-center">
          <p className="text-lg text-zn-text-2">No specialties match your search.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 text-sm text-zn-text underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
