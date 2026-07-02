"use client";

import { Button } from "@/ui/Button";
import { AuthorAvatar } from "@/features/insights/AuthorAvatar";
import { cn } from "@/lib/utils";

export function ArticleSidebarCta({
  author,
  className,
}: {
  author?: { name: string; avatar?: string } | null;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[10px] bg-[#4a5fe8] px-5 py-6 text-white shadow-sm",
        className,
      )}
    >
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

        <h3 className="mt-4 font-sans text-[1.375rem] font-normal leading-[1.2] tracking-tight">
          Ready to put this into practice?
        </h3>
        <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-white/85">
          Tell us what you are building. We will map the next steps on a
          30-minute call.
        </p>

        <Button
          href="/contact"
          variant="inverted"
          size="md"
          withArrow
          analyticsLocation="article-sidebar-cta"
          className="mt-5 w-full justify-center bg-white text-zn-text lg:hover:bg-white/90"
        >
          Book a discovery call
        </Button>
      </div>
    </div>
  );
}
