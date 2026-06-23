import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

export function ArticleCardShowcaseBody({ post }: { post: Post }) {
  return (
    <>
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
      <h3 className="font-sans text-sm font-normal tracking-tight text-zn-text md:text-base">
        {post.title}
      </h3>
      <p className="zn-prose line-clamp-4 text-[0.8125rem]">{post.excerpt}</p>
    </>
  );
}

export function ArticleCard({
  post,
  featured = false,
  variant = "default",
  className,
}: {
  post: Post;
  featured?: boolean;
  variant?: "default" | "showcase";
  className?: string;
}) {
  const cover = (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2px]",
        featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/10]",
      )}
      style={{ backgroundColor: post.accent }}
    >
      <div className="zn-grain absolute inset-0" aria-hidden="true" />
      <ZMark className="absolute bottom-4 right-4 size-20 text-white/[0.05]" />
    </div>
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
        href={`/resources/${post.slug}`}
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
      href={`/resources/${post.slug}`}
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
