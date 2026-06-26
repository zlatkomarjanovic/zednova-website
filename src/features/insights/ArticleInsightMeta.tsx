import { Tag } from "@/ui/Tag";
import type { Post } from "@/lib/types";

/** Conditionally renders supplemental CMS / AEO fields when present. */
export function ArticleInsightMeta({ post }: { post: Post }) {
  const hasAudience = Boolean(post.targetAudience?.length);
  const hasPainPoints = Boolean(post.painPoints?.length);
  const hasQuestions = Boolean(post.searchQuestions?.length);
  const hasEntities = Boolean(post.entitiesMentioned?.length);
  const hasSummary = Boolean(post.aiSummary || post.llmSnippet);

  if (!hasAudience && !hasPainPoints && !hasQuestions && !hasEntities && !hasSummary && !post.searchIntent) {
    return null;
  }

  return (
    <aside className="mb-10 grid gap-6 rounded-[2px] border border-zn-border bg-zn-bg-2/40 p-6">
      {post.searchIntent && (
        <div>
          <p className="zn-label text-zn-text-3">Search intent</p>
          <p className="mt-2 text-sm text-zn-text">{post.searchIntent}</p>
        </div>
      )}

      {hasSummary && (
        <div>
          <p className="zn-label text-zn-text-3">AI summary</p>
          <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
            {post.aiSummary ?? post.llmSnippet}
          </p>
        </div>
      )}

      {hasAudience && (
        <div>
          <p className="zn-label mb-2 text-zn-text-3">Who this is for</p>
          <div className="flex flex-wrap gap-2">
            {post.targetAudience!.map((item) => (
              <Tag key={item} variant="outline">
                {item}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {hasPainPoints && (
        <div>
          <p className="zn-label mb-2 text-zn-text-3">Common pain points</p>
          <ul className="grid gap-2 text-sm text-zn-text-2">
            {post.painPoints!.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasQuestions && (
        <div>
          <p className="zn-label mb-2 text-zn-text-3">People also ask</p>
          <ul className="grid gap-2 text-sm text-zn-text-2">
            {post.searchQuestions!.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasEntities && (
        <div>
          <p className="zn-label mb-2 text-zn-text-3">Topics & entities</p>
          <div className="flex flex-wrap gap-2">
            {post.entitiesMentioned!.map((item) => (
              <Tag key={item} variant="outline">
                {item}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
