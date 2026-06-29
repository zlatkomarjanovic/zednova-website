import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ArticleCover } from "@/features/insights/ArticleCover";
import { Tag } from "@/ui/Tag";
import type { Post } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export type InsightsGridPost = Pick<
  Post,
  | "slug"
  | "title"
  | "excerpt"
  | "category"
  | "publishedAt"
  | "readTime"
  | "accent"
  | "tags"
  | "image"
  | "imageAlt"
>;

/** Full-bleed insights article grid — matches /insights listing cards. */
export function InsightsArticleGrid({
  posts,
  borderTop = false,
  solidHover = false,
}: {
  posts: InsightsGridPost[];
  /** Adds top border on each cell (homepage sage section). */
  borderTop?: boolean;
  /** Full white hover fill (homepage). Default is semi-transparent. */
  solidHover?: boolean;
}) {
  if (!posts.length) return null;

  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/insights/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className={cn(
              "group relative z-[2] flex h-full flex-col gap-4 border-b border-zn-border p-6 transition-colors md:border-r md:p-8 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0",
              solidHover ? "hover:bg-zn-bg-2" : "hover:bg-zn-bg-2/50",
              borderTop && "border-t border-zn-border",
            )}
          >
            <ArticleCover post={post} className="aspect-[16/10]" zMarkClassName="size-16" />
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
  );
}
