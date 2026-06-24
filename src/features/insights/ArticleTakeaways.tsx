import { Lightbulb } from "lucide-react";

/**
 * Answer-first key takeaways box. Surfaced above the body so answer
 * engines (and skimming readers) get the conclusion immediately.
 */
export function ArticleTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside
      aria-label="Key takeaways"
      className="rounded-[2px] border border-zn-border bg-zn-bg-2/60 p-6 md:p-7"
    >
      <div className="flex items-center gap-2 text-zn-text-3">
        <Lightbulb className="size-4" aria-hidden="true" />
        <span className="zn-label">Key takeaways</span>
      </div>
      <ul className="mt-4 grid gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="mt-0.5 font-mono text-xs text-zn-text-3"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[0.9375rem] leading-relaxed text-zn-text-2">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
