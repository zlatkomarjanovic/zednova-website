"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { ZMark } from "@/components/shared/Logo";
import { Tag } from "@/components/shared/Tag";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type FilterPost = Pick<
  Post,
  "slug" | "title" | "excerpt" | "category" | "publishedAt" | "readTime" | "accent" | "tags"
>;

/**
 * Filterable + searchable insights grid. Renders all posts and filters
 * client-side by category and free-text query. Empty state included.
 */
export function InsightsFilterableGrid({ posts }: { posts: FilterPost[] }) {
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

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
      <div className="zn-container-inset flex flex-col gap-5 border-y border-zn-border py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:py-7">
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
        <div className="relative border-b border-zn-border">
          <div className="relative grid grid-cols-1 divide-y divide-zn-border md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                aria-label={`Read ${post.title}`}
                className="group relative z-[2] flex h-full flex-col gap-4 border-zn-border p-6 transition-colors hover:bg-zn-bg-2/50 md:p-8 lg:[&:nth-child(3n)]:border-r-0"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{ backgroundColor: post.accent }}
                >
                  <div className="zn-grain absolute inset-0" aria-hidden="true" />
                  <ZMark className="absolute bottom-4 right-4 size-16 text-white/[0.05]" />
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zn-text-3">
                  <Tag>{post.category}</Tag>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime} min read</span>
                </div>
                <h3 className="font-sans text-base font-normal leading-snug text-zn-text transition-opacity group-hover:opacity-70 md:text-lg">
                  {post.title}
                </h3>
                <p className="zn-prose line-clamp-3">{post.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-[0.8125rem] text-zn-text-3">
                  Read article
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-b border-zn-border">
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
      <div className="zn-container-inset py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-zn-text-3">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {activeCategory !== "All" && ` · ${activeCategory}`}
        </p>
      </div>
    </div>
  );
}
