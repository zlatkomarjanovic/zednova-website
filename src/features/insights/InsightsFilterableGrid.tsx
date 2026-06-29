"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { InsightsArticleGrid, type InsightsGridPost } from "@/features/insights/InsightsArticleGrid";

type FilterPost = InsightsGridPost;

/**
 * Filterable + searchable insights grid. Renders all posts and filters
 * client-side by category and free-text query. Empty state included.
 */
export function InsightsFilterableGrid({
  posts,
  categories: categoryLabels,
}: {
  posts: FilterPost[];
  categories?: string[];
}) {
  const categories = useMemo(() => {
    if (categoryLabels?.length) {
      return ["All", ...categoryLabels];
    }
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [posts, categoryLabels]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, activeCategory, query]);

  return (
    <div className="relative">
      {/* Controls */}
      <div className="relative zn-container-inset flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zn-border/50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-zn-border/50"
        />
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
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
          <label htmlFor="insights-search" className="sr-only">
            Search articles
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zn-text-3"
            aria-hidden="true"
          />
          <input
            id="insights-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-zn-border bg-zn-bg-2 py-2 pl-9 pr-9 text-sm text-zn-text outline-none transition-colors placeholder:text-zn-text-3 focus:border-zn-text"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zn-text-3 transition-colors hover:text-zn-text"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <InsightsArticleGrid posts={filtered} />
      ) : (
        <div className="relative">
          <div className="zn-container-inset py-20 text-center">
            <p className="zn-label text-zn-text-3">No results</p>
            <p className="mt-4 text-lg text-zn-text-2">
              No articles match &ldquo;{query}&rdquo;
              {activeCategory !== "All" && ` in ${activeCategory}`}.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 text-sm text-zn-text underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Result count */}
      <div className="relative zn-container-inset py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zn-border/50"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {activeCategory !== "All" && ` · ${activeCategory}`}
        </p>
      </div>
    </div>
  );
}
