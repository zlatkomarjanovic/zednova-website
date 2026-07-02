"use client";

import { ArticleShare } from "@/features/insights/ArticleShare";

export function ArticleSidebarShare({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <section
      aria-label="Share this article"
      className="border-t border-zn-border pt-[1.2rem]"
    >
      <ArticleShare url={url} title={title} className="flex-wrap gap-2" />
    </section>
  );
}
