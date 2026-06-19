import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/shared/Icon";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col gap-5 rounded-[10px] border border-zn-border bg-zn-bg-2 p-7 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zn-text hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <Icon name={service.icon} className="size-6 text-zn-text" />
        <span className="font-mono text-xs text-zn-text-3">{service.number}</span>
      </div>
      <div>
        <h3 className="font-sans text-lg font-normal tracking-tight text-zn-text">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zn-text-2">
          {service.shortDescription}
        </p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-zn-text">
        Learn more
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
