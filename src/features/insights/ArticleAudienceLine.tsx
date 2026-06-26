import type { Post } from "@/lib/types";

/** One-line audience signal — visible on page, matches audience schema. */
export function ArticleAudienceLine({ post }: { post: Post }) {
  if (!post.targetAudience?.length) return null;

  return (
    <p className="mb-8 text-sm text-zn-text-3">
      Written for{" "}
      <span className="text-zn-text-2">{post.targetAudience.join(" · ")}</span>
    </p>
  );
}
