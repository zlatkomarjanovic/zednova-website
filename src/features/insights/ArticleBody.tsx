import type { ArticleBlock } from "@/lib/types";
import { parseInlineLinks } from "@/lib/insights/parse-inline-links";
import { slugify } from "@/lib/utils";
import { CmsImage } from "@/ui/CmsImage";

/** Renders the simple block model. Stands in for Sanity Portable Text today. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className="scroll-mt-28 pt-8 font-sans text-xl font-normal leading-snug text-zn-text first:pt-0 lg:text-[1.375rem]"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={slugify(block.text)}
                className="scroll-mt-28 pt-4 font-sans text-lg font-normal leading-snug text-zn-text"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="grid gap-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-zn-text-2">
                    <span className="mt-0.5 font-mono text-zn-text-3" aria-hidden="true">
                      —
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-l-2 border-zn-text pl-6 zn-accent-italic text-lg leading-relaxed text-zn-text lg:text-xl"
              >
                {block.text}
              </blockquote>
            );
          case "callout": {
            const variantStyles: Record<string, string> = {
              info: "border-zn-text bg-zn-bg-2/60",
              warning: "border-amber-500/60 bg-amber-50",
              success: "border-emerald-600/40 bg-emerald-50",
              quote: "border-zn-text bg-zn-bg-2/40",
            };
            const style = variantStyles[block.calloutVariant ?? "info"] ?? variantStyles.info;
            return (
              <div key={i} className={`my-8 rounded-[2px] border-l-2 p-5 ${style}`}>
                <p className="text-base leading-relaxed text-zn-text">{block.text}</p>
              </div>
            );
          }
          case "image":
            return block.image ? (
              <figure key={i} className="my-8">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-zn-border">
                  <CmsImage
                    src={block.image}
                    alt={block.imageAlt ?? block.text ?? ""}
                    fill
                    preset="article"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 720px"
                    className="object-cover"
                  />
                </div>
                {block.text && (
                  <figcaption className="mt-2 text-sm text-zn-text-3">
                    {block.text}
                  </figcaption>
                )}
              </figure>
            ) : null;
          default:
            return (
              <p key={i} className="text-lg leading-relaxed text-zn-text-2">
                {parseInlineLinks(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
