import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlueprintTableGrid, type TableGridItem } from "@/ui/BlueprintTableGrid";
import { IndustryCard } from "@/features/industries/IndustryCard";
import type { Industry } from "@/lib/types";

export function IndustrySpecialtiesGrid({
  industries,
  variant = "table",
}: {
  industries: Industry[];
  variant?: "table" | "cards";
}) {
  if (industries.length === 0) return null;

  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <IndustryCard key={industry.slug} industry={industry} />
        ))}
      </div>
    );
  }

  const items: TableGridItem[] = industries.map((industry) => ({
    href: `/industries/${industry.slug}`,
    title: industry.title,
    description: industry.hook,
    icon: industry.icon,
  }));

  return <BlueprintTableGrid items={items} columns={3} showEdgeCrosses={false} />;
}

export function ParentIndustryLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-zn-border bg-zn-bg px-4 py-1.5 text-xs font-medium text-zn-text transition-colors hover:border-zn-text"
    >
      {title}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
    </Link>
  );
}
