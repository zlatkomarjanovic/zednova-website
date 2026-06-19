import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  theme = "light",
  className,
}: {
  testimonial: Testimonial;
  theme?: "light" | "dark";
  className?: string;
}) {
  const quoteColor = theme === "dark" ? "text-zn-inv" : "text-zn-text";
  const metaColor = theme === "dark" ? "text-zn-inv-2" : "text-zn-text-2";
  const border = theme === "dark" ? "border-zn-border-dk" : "border-zn-border";

  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between gap-8 rounded-[2px] border p-8",
        border,
        className,
      )}
    >
      <blockquote
        className={cn(
          "zn-accent-italic text-xl leading-relaxed",
          quoteColor,
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className={cn("text-sm", metaColor)}>
        <span className={cn("font-sans font-medium not-italic", quoteColor)}>
          {testimonial.authorTitle}
        </span>
        <span className="mx-1.5" aria-hidden="true">
          ·
        </span>
        {testimonial.company}
      </figcaption>
    </figure>
  );
}
