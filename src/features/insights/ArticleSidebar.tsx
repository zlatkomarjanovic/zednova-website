"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { Post } from "@/lib/types";
import { cn, slugify } from "@/lib/utils";
import { ArticleSidebarCta } from "@/features/insights/ArticleSidebarCta";
import { ArticleSidebarShare } from "@/features/insights/ArticleSidebarShare";

type TocHeading = { type: "h2"; text: string };

type ArticleSidebarProps = {
  post: Post;
  toc: TocHeading[];
  showToc: boolean;
  hasFaq: boolean;
  author?: { name: string; avatar?: string } | null;
  shareUrl: string;
  shareTitle: string;
};

function SidebarAccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-zn-border pb-5 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="mb-4 flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="zn-label text-zn-text-3">{title}</span>
        <span className="shrink-0 text-zn-text-3" aria-hidden="true">
          {open ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </section>
  );
}

/** Sticky sidebar — collapsible TOC + CTA + share + related questions. */
export function ArticleSidebar({
  post,
  toc,
  showToc,
  hasFaq,
  author,
  shareUrl,
  shareTitle,
}: ArticleSidebarProps) {
  const questions = post.searchQuestions?.slice(0, 3) ?? [];
  const hasQuestions = questions.length > 0;

  return (
    <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
      <div className="sticky top-28 space-y-5">
        {showToc && (
          <SidebarAccordionSection title="On this page" defaultOpen>
            <nav
              aria-label="Table of contents"
              className="max-h-[280px] overflow-y-auto overscroll-y-contain pr-1 [scrollbar-width:thin]"
            >
              <ul className="grid gap-3.5 border-l border-zn-border">
                {toc.map((heading) => (
                  <li key={heading.text}>
                    <a
                      href={`#${slugify(heading.text)}`}
                      className="-ml-px block border-l border-transparent py-0.5 pl-4 text-[0.8125rem] leading-relaxed text-zn-text-2 transition-colors hover:border-zn-text hover:text-zn-text"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
                {hasFaq && (
                  <li>
                    <a
                      href="#article-faq"
                      className="-ml-px block border-l border-transparent py-0.5 pl-4 text-[0.8125rem] leading-relaxed text-zn-text-2 transition-colors hover:border-zn-text hover:text-zn-text"
                    >
                      FAQ
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </SidebarAccordionSection>
        )}

        {hasQuestions && (
          <SidebarAccordionSection title="Related questions" defaultOpen={false}>
            <ul className="grid gap-4 text-[0.8125rem] leading-relaxed text-zn-text-2">
              {questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </SidebarAccordionSection>
        )}

        <ArticleSidebarCta author={author} />

        <ArticleSidebarShare url={shareUrl} title={shareTitle} />

        {/* On-page signals for crawlers — not shown visually */}
        <div className="sr-only">
          {post.category && <span>Category: {post.category}</span>}
          {post.contentType && <span>Type: {post.contentType}</span>}
          {post.difficulty && <span>Level: {post.difficulty}</span>}
          {post.searchIntent && <span>Search intent: {post.searchIntent}</span>}
          {post.aiSummary && <p>{post.aiSummary}</p>}
          {post.targetAudience?.map((a) => (
            <span key={a}>Audience: {a}</span>
          ))}
          {post.entitiesMentioned?.map((e) => (
            <span key={e}>Topic: {e}</span>
          ))}
          {post.painPoints?.map((p) => (
            <span key={p}>Pain point: {p}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}

/** Mobile-only jump links when sidebar is hidden. */
export function ArticleMobileToc({
  toc,
  hasFaq,
}: {
  toc: TocHeading[];
  hasFaq: boolean;
}) {
  if (toc.length === 0 && !hasFaq) return null;

  return (
    <nav
      aria-label="Jump to section"
      className="mb-10 border-b border-zn-border pb-8 lg:hidden"
    >
      <p className="zn-label mb-4 text-zn-text-3">On this page</p>
      <ul className="flex flex-wrap gap-2">
        {toc.map((heading) => (
          <li key={heading.text}>
            <a
              href={`#${slugify(heading.text)}`}
              className="inline-block rounded-full border border-zn-border px-3 py-1 text-xs text-zn-text-2 transition-colors hover:border-zn-text hover:text-zn-text"
            >
              {heading.text}
            </a>
          </li>
        ))}
        {hasFaq && (
          <li>
            <a
              href="#article-faq"
              className="inline-block rounded-full border border-zn-border px-3 py-1 text-xs text-zn-text-2 transition-colors hover:border-zn-text hover:text-zn-text"
            >
              FAQ
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
