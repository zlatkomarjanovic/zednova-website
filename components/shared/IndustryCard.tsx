import Link from "next/link";
import { Icon } from "@/components/shared/Icon";
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
      href={`/industries/${industry.slug}`}
      className={cn(
        "group flex flex-col gap-4 rounded-[2px] border border-zn-border bg-zn-bg p-7 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zn-text hover:bg-zn-bg-2",
        className,
      )}
    >
      <Icon name={industry.icon} className="size-7 text-zn-text" />
      <div>
        <h3 className="font-sans text-base font-normal tracking-tight text-zn-text">
          {industry.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zn-text-2">
          {industry.hook}
        </p>
      </div>
    </Link>
  );
}
