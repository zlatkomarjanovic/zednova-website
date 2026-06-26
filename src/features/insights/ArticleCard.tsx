import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/ui/Tag";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArticleCover } from "@/features/insights/ArticleCover";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({
  post,
  featured = false,
  className,
}: {
  post: Post;
  featured?: boolean;
  className?: string;
}) {
  const cover = (
    <ArticleCover
      post={post}
      className={cn(
        featured ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[280px]" : "aspect-[16/10]",
      )}
    />
  );

  const meta = (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zn-text-3">
      <Tag>{post.category}</Tag>
      <span>{formatDate(post.publishedAt)}</span>
      <span aria-hidden="true">·</span>
      <span>{post.readTime} min read</span>
    </div>
  );

  if (featured) {
    return (
      <Link
        href={`/insights/${post.slug}`}
        className={cn(
          "group grid gap-8 rounded-[2px] border border-zn-border bg-zn-bg p-6 transition-colors hover:border-zn-text lg:grid-cols-2 lg:p-8",
          className,
        )}
      >
        {cover}
        <div className="flex flex-col justify-center gap-5">
          {meta}
          <h2 className="zn-h2 font-sans font-normal leading-tight text-zn-text">
            {post.title}
          </h2>
          <p className="zn-prose max-w-prose text-zn-text-2">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1 text-sm text-zn-text">
            Read article
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/insights/${post.slug}`}
      className={cn("group flex flex-col gap-4", className)}
    >
      {cover}
      {meta}
      <h3 className="font-sans text-xl font-normal leading-snug text-zn-text transition-opacity group-hover:opacity-70">
        {post.title}
      </h3>
    </Link>
  );
}
