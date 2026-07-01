import Link from "next/link";
import { Icon } from "@/ui/Icon";
import type { Industry } from "@/lib/types";
import { cn } from "@/lib/utils";

export function IndustryCard({
  industry,
  className,
}: {
  industry: Industry;
  className?: string;
}) {
  return (
    <Link
      href={`/industries/${industry.parentSlug}`}
      className={cn(
        "group flex flex-col gap-4 rounded-[2px] border border-zn-border bg-zn-bg p-7 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zn-text hover:bg-zn-bg-2",
        className,
      )}
    >
      <Icon name={industry.icon} className="size-7 text-zn-text" />
      <div className="space-y-2">
        <h3 className="font-sans text-base font-normal tracking-tight text-zn-text">
          {industry.title}
        </h3>
        <p className="text-sm leading-relaxed text-zn-text-2">{industry.hook}</p>
        <p className="text-xs leading-relaxed text-zn-text-3">{industry.problemSolved}</p>
      </div>
    </Link>
  );
}
