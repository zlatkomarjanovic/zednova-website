"use client";

import { Button } from "@/ui/Button";
import { AuthorAvatar } from "@/features/insights/AuthorAvatar";

export function ArticleSidebarCta({
  author,
}: {
  author?: { name: string; avatar?: string } | null;
}) {
  return (
    <div className="relative overflow-hidden rounded-[10px] bg-[#4a5fe8] px-5 py-6 text-white shadow-sm">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(0,0,0,0.18),transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:10px_10px]"
        aria-hidden="true"
      />

      <div className="relative">
        {author ? (
          <AuthorAvatar
            name={author.name}
            avatar={author.avatar}
            size="sm"
            className="size-11 border-2 border-white/90 bg-white/10"
          />
        ) : null}

        <h3 className="mt-4 font-sans text-[1.05rem] font-normal leading-snug tracking-tight">
          Kickstart your project today!
        </h3>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/85">
          Book a call to discuss your goals and how we can help you reach them.
        </p>

        <Button
          href="/contact"
          variant="inverted"
          size="md"
          withArrow
          analyticsLocation="article-sidebar-cta"
          className="mt-5 w-full justify-center bg-white text-zn-text lg:hover:bg-white/90"
        >
          Book a strategy call
        </Button>
      </div>
    </div>
  );
}
