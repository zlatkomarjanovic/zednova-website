import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { cn } from "@/lib/utils";

/** Sans section headline with optional serif italic highlight — reference layout. */
export function SectionHeading({
  label,
  title,
  highlight,
  className,
  titleClassName,
}: {
  label?: string;
  title: string;
  highlight?: string;
  className?: string;
  titleClassName?: string;
}) {
  const highlightIndex = highlight ? title.indexOf(highlight) : -1;
  const before = highlightIndex >= 0 ? title.slice(0, highlightIndex) : title;
  const after =
    highlightIndex >= 0 ? title.slice(highlightIndex + (highlight?.length ?? 0)) : "";

  return (
    <div className={cn(className)}>
      {label && (
        <Reveal>
          <SectionLabel withRule={false}>{label}</SectionLabel>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "zn-h2 mt-5 max-w-3xl font-sans font-normal",
            titleClassName,
          )}
        >
          {highlight && highlightIndex >= 0 ? (
            <>
              {before}
              <span className="zn-accent-italic">{highlight}</span>
              {after}
            </>
          ) : (
            title
          )}
        </h2>
      </Reveal>
    </div>
  );
}
