import { Check } from "lucide-react";
import { Button } from "@/components/shared/Button";
import type { Product, ProductStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  available: "Available",
  "coming-soon": "Coming soon",
  "in-development": "In development",
  free: "Free",
};

const STATUS_STYLE: Record<ProductStatus, string> = {
  live: "bg-zn-text text-zn-inv",
  available: "bg-zn-text text-zn-inv",
  free: "border border-zn-text text-zn-text",
  "coming-soon": "bg-zn-bg-2 text-zn-text-2",
  "in-development": "bg-zn-bg-2 text-zn-text-2",
};

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-[2px] border border-zn-border bg-zn-bg p-8 transition-colors hover:border-zn-text",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-sans font-normal text-2xl text-zn-text">{product.title}</h3>
          <p className="mt-1.5 text-sm text-zn-text-2">{product.tagline}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
            STATUS_STYLE[product.status],
          )}
        >
          {STATUS_LABEL[product.status]}
        </span>
      </div>

      <p className="leading-relaxed text-zn-text-2">{product.description}</p>

      <ul className="grid gap-2.5">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-zn-text">
            <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <Button href={product.ctaHref} variant="link" withArrow>
          {product.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
