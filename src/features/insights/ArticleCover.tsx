import { CmsImage } from "@/ui/CmsImage";
import { ZMark } from "@/ui/Logo";
import type { Post } from "@/lib/types";
import type { CmsImagePreset } from "@/sanity/image";
import { cn } from "@/lib/utils";

type ArticleCoverProps = {
  post: Pick<Post, "image" | "imageAlt" | "title" | "accent">;
  className?: string;
  imageClassName?: string;
  zMarkClassName?: string;
  preset?: CmsImagePreset;
  priority?: boolean;
  sizes?: string;
};

/** Card / grid cover with CMS image or accent fallback. */
export function ArticleCover({
  post,
  className,
  imageClassName,
  zMarkClassName,
  preset = "card",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px",
}: ArticleCoverProps) {
  const hasImage = Boolean(post.image?.trim());

  return (
    <div
      className={cn("relative overflow-hidden rounded-[2px]", className)}
      style={hasImage ? undefined : { backgroundColor: post.accent }}
    >
      {hasImage ? (
        <CmsImage
          src={post.image}
          alt={post.imageAlt ?? post.title}
          fill
          preset={preset}
          sizes={sizes}
          priority={priority}
          className={cn("object-cover transition-transform duration-500 group-hover:scale-[1.02]", imageClassName)}
        />
      ) : (
        <>
          <div className="zn-grain absolute inset-0" aria-hidden="true" />
          <ZMark
            className={cn(
              "absolute bottom-4 right-4 h-20 w-auto opacity-[0.05]",
              zMarkClassName,
            )}
            variant="light"
          />
        </>
      )}
    </div>
  );
}
