import { Check } from "lucide-react";
import { Button } from "@/ui/Button";
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

const PRODUCT_SURFACES: Partial<Record<string, string>> = {
  "anti-slop-stack": "zn-lavender-surface",
  "framer-marketplace-components": "zn-sky-surface",
};

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const surface = PRODUCT_SURFACES[product.slug];

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden rounded-[2px] border border-zn-border p-8 transition-colors hover:border-zn-text",
        surface ?? "bg-zn-bg",
        className,
      )}
    >
      {surface && (
        <div className="zn-accent-grain absolute inset-0" aria-hidden="true" />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3 className="font-sans text-2xl font-normal text-zn-text">{product.title}</h3>
          <p className="zn-prose mt-1.5">{product.tagline}</p>
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

      <p className="zn-prose relative">{product.description}</p>

      <ul className="relative grid gap-2.5">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-zn-text">
            <Check className="mt-0.5 size-4 shrink-0 text-zn-text-3" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-2">
        <Button href={product.ctaHref} variant="link" withArrow>
          {product.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
