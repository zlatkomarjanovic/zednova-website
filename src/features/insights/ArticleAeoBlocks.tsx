import { Button } from "@/ui/Button";
import type { Post } from "@/lib/types";

export function ArticleQuickAnswer({ post }: { post: Post }) {
  const question = post.quickAnswer?.question;
  const answer =
    post.quickAnswer?.shortAnswer ??
    post.oneSentenceSummary ??
    post.aiSummary;

  if (!answer) return null;

  return (
    <aside className="mb-10 rounded-[2px] border border-zn-border bg-zn-bg-2/60 p-6">
      {question ? (
        <p className="zn-label text-zn-text-3">{question}</p>
      ) : (
        <p className="zn-label text-zn-text-3">Quick answer</p>
      )}
      <p className="mt-3 text-base leading-relaxed text-zn-text">{answer}</p>
    </aside>
  );
}

export function ArticleInlineCta({ post }: { post: Post }) {
  if (!post.primaryCtaLabel || !post.primaryCtaHref) return null;

  return (
    <aside className="mt-16 rounded-[2px] border border-zn-border bg-zn-bg-2/40 p-6 md:p-8">
      {post.primaryCtaTitle ? (
        <h2 className="font-sans text-2xl font-normal text-zn-text">
          {post.primaryCtaTitle}
        </h2>
      ) : null}
      {post.primaryCtaDescription ? (
        <p className="zn-prose mt-3 max-w-prose">{post.primaryCtaDescription}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={post.primaryCtaHref} withArrow>
          {post.primaryCtaLabel}
        </Button>
        {post.secondaryCtaLabel && post.secondaryCtaHref ? (
          <Button href={post.secondaryCtaHref} variant="outline" withArrow>
            {post.secondaryCtaLabel}
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
