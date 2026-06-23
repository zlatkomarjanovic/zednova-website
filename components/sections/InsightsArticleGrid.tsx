"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlueprintGridCrosses } from "@/components/shared/BlueprintGridCrosses";
import {
  RubberHoverHighlightLayer,
  useRubberHoverHighlight,
} from "@/components/shared/HoverHighlight";
import { ArticleCardShowcaseBody } from "@/components/shared/ArticleCard";
import type { Post } from "@/lib/types";

export function InsightsArticleGrid({ posts }: { posts: Post[] }) {
  const highlight = useRubberHoverHighlight({
    cellSelector: "[data-article-cell]",
  });

  return (
    <div
      ref={highlight.rootRef}
      className="relative border-y border-zn-border"
      {...highlight.pointerHandlers}
    >
      <RubberHoverHighlightLayer
        pathD={highlight.pathD}
        opacity={highlight.opacity}
        fill="var(--color-zn-bg-3)"
      />

      <div className="pointer-events-none absolute inset-0 grid">
        <BlueprintGridCrosses columns={3} rows={1} />
      </div>

      <div className="relative grid grid-cols-1 divide-y divide-zn-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {posts.map((post) => (
          <div
            key={post.slug}
            data-article-cell
            data-hover-cell
            onMouseEnter={(e) => highlight.snapTo(e.currentTarget)}
            className="group relative z-[2] flex h-full flex-col gap-4 px-6 py-6 md:py-8"
          >
            <Link
              href={`/insights/${post.slug}`}
              aria-label={`Read ${post.title}`}
              className="absolute inset-0 z-[2]"
            />
            <div className="relative z-[1] flex flex-1 flex-col gap-4 pointer-events-none">
              <ArticleCardShowcaseBody post={post} />
              <span className="mt-auto inline-flex items-center gap-1 text-[0.8125rem] text-zn-text-3">
                Read article
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
