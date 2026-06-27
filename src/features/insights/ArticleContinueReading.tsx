import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { ArticleCover } from "@/features/insights/ArticleCover";
import { SectionLabel } from "@/ui/SectionLabel";
import { Tag } from "@/ui/Tag";
import type { Post } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

function buildIntro(current: Post, related: Post[]): string {
  const sharedTags = [
    ...new Set(
      related.flatMap((p) => p.tags).filter((tag) => current.tags.includes(tag)),
    ),
  ].slice(0, 4);

  if (sharedTags.length >= 2) {
    return `These three articles pick up where "${current.title}" leaves off — covering ${sharedTags.join(", ")}, and the Next.js + Sanity systems we use so service businesses rank in Google and get cited by AI.`;
  }

  const categories = [...new Set(related.map((p) => p.category))];
  if (categories.length === 1) {
    return `More ${categories[0]} guides from ZedNova — practical notes on AI search, conversion, and the automations behind sites that ship and compound over time.`;
  }

  return `Handpicked ZedNova insights related to ${current.category.toLowerCase()} — written for founders and operators who want clearer answers on SEO, web performance, and AI-ready content structure.`;
}

export function ContinueReadingCard({
  post,
  transparent = false,
}: {
  post: Post;
  transparent?: boolean;
}) {
  const summary = post.oneSentenceSummary ?? post.excerpt;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[2px] border border-zn-border",
        transparent ? "bg-transparent" : "bg-zn-bg",
      )}
    >
      <Link
        href={`/insights/${post.slug}`}
        className="flex flex-1 flex-col"
        aria-labelledby={`continue-reading-${post.slug}`}
      >
        <ArticleCover
          post={post}
          className="aspect-[16/10] shrink-0 border-b border-zn-border"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="flex flex-1 flex-col gap-3.5 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{post.category}</Tag>
            {post.contentType ? (
              <Tag variant="outline">{post.contentType}</Tag>
            ) : null}
            {post.difficulty ? (
              <Tag variant="outline">{post.difficulty}</Tag>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zn-text-3">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} min read</span>
            {post.updatedAt && post.updatedAt !== post.publishedAt ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              </>
            ) : null}
          </div>

          <h3
            id={`continue-reading-${post.slug}`}
            className="font-sans text-lg font-normal leading-snug text-zn-text transition-opacity group-hover:opacity-75 lg:text-xl"
          >
            {post.title}
          </h3>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-zn-text-2">
            {summary}
          </p>

          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-zn-text transition-opacity group-hover:opacity-70">
            Read article
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function ContinueReadingGrid({
  posts,
  transparentCards = false,
}: {
  posts: Post[];
  transparentCards?: boolean;
}) {
  return (
    <ul className="mt-10 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {posts.map((post) => (
        <li key={post.slug} className="min-h-0">
          <ContinueReadingCard post={post} transparent={transparentCards} />
        </li>
      ))}
    </ul>
  );
}

export function InsightsContinueReadingBlock({
  posts,
  label = "Keep reading",
  heading = "More from ZedNova",
  description,
  headingId = "continue-reading-heading",
  transparentCards = false,
  action,
}: {
  posts: Post[];
  label?: string;
  heading?: string;
  description: string;
  headingId?: string;
  transparentCards?: boolean;
  action?: ReactNode;
}) {
  if (!posts.length) return null;

  return (
    <>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="min-w-0">
          <SectionLabel withRule={false}>{label}</SectionLabel>
          <h2
            id={headingId}
            className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-text"
          >
            {heading}
          </h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <p className="zn-prose mt-5 max-w-2xl text-zn-text-2">{description}</p>
      <ContinueReadingGrid posts={posts} transparentCards={transparentCards} />
    </>
  );
}

export function ArticleContinueReading({
  current,
  related,
}: {
  current: Post;
  related: Post[];
}) {
  if (!related.length) return null;

  return (
    <section aria-labelledby="continue-reading-heading" className="relative">
      <div className="zn-container-inset py-14 lg:py-16">
        <InsightsContinueReadingBlock
          posts={related}
          description={buildIntro(current, related)}
        />
      </div>
    </section>
  );
}
