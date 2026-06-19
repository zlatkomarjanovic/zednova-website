import Image from "next/image";

import { BlueprintGridCrosses } from "@/components/shared/BlueprintGridCrosses";
import { cn } from "@/lib/utils";

export type BenefitItem = {
  tagline: string;
  title: string;
  body: string;
  image: string;
  accent?: string;
};

export function BenefitsGrid({
  items,
  className,
}: {
  items: BenefitItem[];
  className?: string;
}) {
  return (
    <div className={cn("relative border-y border-zn-border", className)}>
      <div className="pointer-events-none absolute inset-0 md:hidden">
        <BlueprintGridCrosses columns={1} rows={items.length} />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <BlueprintGridCrosses columns={items.length} rows={1} />
      </div>

      <div
        className={cn(
          "grid divide-y divide-zn-border md:divide-x md:divide-y-0",
          items.length === 3 && "md:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <article key={item.title} className="flex flex-col bg-zn-bg-2">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-zn-border">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: item.accent ?? "#d8d7d1" }}
                />
              )}
              <div className="zn-grain absolute inset-0 opacity-[0.03]" aria-hidden="true" />
            </div>
            <div className="flex flex-1 flex-col px-6 py-7 md:px-7 md:py-8">
              <p className="zn-label text-zn-text-3">{item.tagline}</p>
              <h3 className="mt-4 font-sans text-base font-normal tracking-tight text-zn-text md:text-lg">
                {item.title}
              </h3>
              <p className="zn-prose mt-3">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
