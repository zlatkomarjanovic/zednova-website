"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Tag } from "@/ui/Tag";
import type { Post } from "@/lib/types";
import { ArticleCover } from "@/features/insights/ArticleCover";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function InsightsFeaturedArticle({ post }: { post: Post }) {
  return (
    <div className="relative min-h-[60vh] border-t border-b border-zn-border">
      <div className="group relative grid min-h-[60vh] transition-colors hover:bg-zn-bg-2/50 lg:grid-cols-2">
        <Link
          href={`/insights/${post.slug}`}
          aria-label={`Read ${post.title}`}
          className="absolute inset-0 z-[2]"
        />

        <ArticleCover
          post={post}
          preset="hero"
          priority
          className="pointer-events-none min-h-[40vh] lg:min-h-[60vh]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          zMarkClassName="bottom-6 right-6 size-28"
        />

        <div className="relative z-[1] flex flex-col justify-center gap-5 border-t border-zn-border p-6 md:p-10 lg:border-t-0 lg:border-l lg:p-12 pointer-events-none">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zn-text-3">
            <Tag>{post.category}</Tag>
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h2 className="zn-h2 max-w-xl font-sans font-normal text-zn-text transition-opacity group-hover:opacity-70">
            {post.title}
          </h2>
          <p className="zn-prose max-w-prose">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1 text-sm text-zn-text-3">
            Read article
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
