import type { Post } from "@/lib/types";
import { slugify } from "@/lib/utils";

type TocHeading = { type: "h2"; text: string };

type ArticleSidebarProps = {
  post: Post;
  toc: TocHeading[];
  showToc: boolean;
  hasFaq: boolean;
};

/** Minimal sticky sidebar — TOC + related questions. AEO metadata lives in JSON-LD + sr-only block. */
export function ArticleSidebar({
  post,
  toc,
  showToc,
  hasFaq,
}: ArticleSidebarProps) {
  const questions = post.searchQuestions?.slice(0, 3) ?? [];
  const hasQuestions = questions.length > 0;

  if (!showToc && !hasQuestions) return null;

  return (
    <aside className="hidden w-52 shrink-0 lg:block xl:w-56">
      <div className="sticky top-28 space-y-14">
        {showToc && (
          <nav aria-label="Table of contents">
            <p className="zn-label mb-5 text-zn-text-3">On this page</p>
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
        )}

        {hasQuestions && (
          <div>
            <p className="zn-label mb-5 text-zn-text-3">Related questions</p>
            <ul className="grid gap-4 text-[0.8125rem] leading-relaxed text-zn-text-2">
              {questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
        )}

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
