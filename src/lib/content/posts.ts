import type { Post } from "@/lib/types";

/** Static fallback when Sanity is unavailable. Live posts are managed in Sanity CMS. */
export const posts: Post[] = [];
