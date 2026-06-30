import { InsightsHomePostsSection } from "@/features/insights/InsightsHomePostsSection";
import type { Post } from "@/lib/types";

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

export function ArticleContinueReading({
  current,
  related,
}: {
  current: Post;
  related: Post[];
}) {
  if (!related.length) return null;

  return (
    <section
      aria-labelledby="continue-reading-heading"
      className="relative"
    >
      <InsightsHomePostsSection
        posts={related}
        label="Keep reading"
        heading="More from ZedNova"
        headingId="continue-reading-heading"
        description={buildIntro(current, related)}
        insetClassName="pt-28"
        descriptionClassName="mb-28"
        gridClassName="pb-28"
      />
    </section>
  );
}
