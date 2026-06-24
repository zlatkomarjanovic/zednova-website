import type { ArticleBlock } from "@/lib/types";
import { slugify } from "@/lib/utils";

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
                className="scroll-mt-28 pt-6 font-sans font-normal text-2xl leading-tight text-zn-text lg:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={slugify(block.text)}
                className="scroll-mt-28 pt-2 font-sans text-xl font-normal text-zn-text"
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
                className="my-10 border-l-2 border-zn-text pl-6 zn-accent-italic text-xl leading-relaxed text-zn-text lg:text-2xl"
              >
                {block.text}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="text-lg leading-relaxed text-zn-text-2">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
