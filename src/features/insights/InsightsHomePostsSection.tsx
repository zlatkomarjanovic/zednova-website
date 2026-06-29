import type { ReactNode } from "react";

import { Reveal } from "@/components/animations/Reveal";
import { InsightsArticleGrid } from "@/features/insights/InsightsArticleGrid";
import { SectionLabel } from "@/ui/SectionLabel";
import type { Post } from "@/lib/types";

/** Homepage insights block — same full-bleed grid as /insights, no hero featured layout. */
export function InsightsHomePostsSection({
  posts,
  label = "Insights",
  heading = "Recent blog posts",
  headingId,
  description,
  action,
}: {
  posts: Post[];
  label?: string;
  heading?: string;
  headingId?: string;
  description?: string;
  action?: ReactNode;
}) {
  if (!posts.length) return null;

  return (
    <div className="relative">
      <div className="zn-container-inset py-6 md:py-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="min-w-0">
            <Reveal>
              <SectionLabel withRule={false}>{label}</SectionLabel>
            </Reveal>
            <h2
              id={headingId}
              className="mt-6 max-w-2xl zn-h2 font-sans font-normal text-zn-text"
            >
              {heading}
            </h2>
            {description ? (
              <p className="zn-prose mt-5 max-w-2xl text-zn-text-2">{description}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </div>

      <InsightsArticleGrid posts={posts} borderTop solidHover />
    </div>
  );
}
