import { BlueprintCross } from "@/ui/BlueprintCross";
import { Button } from "@/ui/Button";
import { InsightsContinueReadingBlock } from "@/features/insights/ArticleContinueReading";
import type { Post } from "@/lib/types";

const HOMEPAGE_INSIGHTS_DESCRIPTION =
  "Practical notes on AI search, websites, Shopify, CRM automations, and software for clinics, ecommerce brands, and service businesses — the same guides we link from each article.";

export function HomepageRecentInsights({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <div
      aria-labelledby="homepage-recent-insights-heading"
      className="relative border-t border-zn-border"
    >
      <div className="zn-container-guides relative">
        <div className="relative border-x border-zn-border">
          <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />

          <div className="zn-container-inset py-14 lg:py-16">
            <InsightsContinueReadingBlock
              posts={posts}
              label="Insights"
              heading="Recent blog posts"
              headingId="homepage-recent-insights-heading"
              description={HOMEPAGE_INSIGHTS_DESCRIPTION}
            />

            <div className="mt-10 flex justify-end border-t border-zn-border pt-8">
              <Button href="/insights" variant="link" withArrow>
                All insights
              </Button>
            </div>
          </div>

          <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
          <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
