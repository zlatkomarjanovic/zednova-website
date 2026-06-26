import type { SourceReference } from "@/lib/types";

export function ArticleSources({ sources }: { sources: SourceReference[] }) {
  if (!sources.length) return null;

  return (
    <section aria-labelledby="article-sources-heading" className="mt-14 border-t border-zn-border pt-8">
      <h2
        id="article-sources-heading"
        className="font-sans text-xl font-normal leading-snug text-zn-text lg:text-[1.375rem]"
      >
        Sources &amp; references
      </h2>
      <ol className="mt-5 grid list-decimal gap-3 pl-5 text-sm leading-relaxed text-zn-text-2">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zn-text underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              {source.title}
            </a>
            {source.publisher ? (
              <span className="text-zn-text-3"> — {source.publisher}</span>
            ) : null}
            {source.note ? (
              <p className="mt-1 text-xs text-zn-text-3">{source.note}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
