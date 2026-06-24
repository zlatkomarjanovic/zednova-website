import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaImage } from "@/ui/MediaImage";
import { Tag } from "@/ui/Tag";
import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CaseStudyCard({
  caseStudy,
  industryLabel,
  theme = "light",
  className,
}: {
  caseStudy: CaseStudy;
  industryLabel: string;
  theme?: "light" | "dark";
  className?: string;
}) {
  const dark = theme === "dark";

  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[2px] border transition-colors duration-200",
        dark
          ? "border-zn-border-dk bg-zn-dark-2 hover:border-zn-inv/30"
          : "border-zn-border bg-zn-bg-2 hover:border-zn-text/25",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          src={caseStudy.image}
          alt={caseStudy.title}
          accent={caseStudy.accent}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="absolute inset-0"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
        <div className="flex items-start justify-between gap-3">
          <Tag variant={dark ? "outline-inverted" : "outline"}>
            {industryLabel}
          </Tag>
          <ArrowUpRight
            className={cn(
              "size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              dark ? "text-zn-inv-2" : "text-zn-text-3",
            )}
            aria-hidden="true"
          />
        </div>

        <div>
          <h3
            className={cn(
              "font-sans text-xl font-normal leading-snug tracking-tight",
              dark ? "text-zn-inv" : "text-zn-text",
            )}
          >
            {caseStudy.title}
          </h3>
          <p className={cn("mt-1 text-sm", dark ? "text-zn-inv-2" : "text-zn-text-2")}>
            {caseStudy.client}
          </p>
        </div>

        <div
          className={cn(
            "mt-auto border-t pt-4",
            dark ? "border-zn-border-dk" : "border-zn-border",
          )}
        >
          <div
            className={cn(
              "font-mono text-2xl tracking-tight",
              dark ? "text-zn-inv" : "text-zn-text",
            )}
          >
            {caseStudy.results[0].value}
          </div>
          <div className={cn("text-xs", dark ? "text-zn-inv-2" : "text-zn-text-3")}>
            {caseStudy.results[0].label}
          </div>
        </div>
      </div>
    </Link>
  );
}
