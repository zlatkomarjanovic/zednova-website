"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BlueprintGridCrosses } from "@/ui/BlueprintGridCrosses";
import { ProductCard } from "@/features/home/ProductCard";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const SLIDE_EASE = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "18%" : "-18%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-18%" : "18%",
    opacity: 0,
  }),
};

type ProductSliderProps = {
  products: Product[];
  className?: string;
};

export function ProductSlider({ products, className }: ProductSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const next = (index + products.length) % products.length;
      if (next === activeIndex) return;

      let dir: number;
      if (activeIndex === products.length - 1 && next === 0) {
        dir = 1;
      } else if (activeIndex === 0 && next === products.length - 1) {
        dir = -1;
      } else {
        dir = next > activeIndex ? 1 : -1;
      }

      setDirection(dir);
      setActiveIndex(next);
    },
    [activeIndex, products.length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  if (products.length === 0) return null;

  const active = products[activeIndex];

  return (
    <div className={cn("relative min-h-full", className)}>
      <div className="flex items-center justify-between border-b border-zn-border px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-zn-text-3">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: SLIDE_EASE }}
              className="truncate text-sm text-zn-text"
            >
              {active.title}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous product"
            className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next product"
            className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden p-6 lg:p-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={active.slug}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: SLIDE_EASE }}
          >
            <ProductCard product={active} className="h-full" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-zn-border px-6 py-4">
        {products.map((product, index) => (
          <button
            key={product.slug}
            type="button"
            aria-label={`Go to ${product.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => goTo(index)}
            className="group relative h-px flex-1"
          >
            <span
              className={cn(
                "absolute inset-0 transition-colors",
                index === activeIndex ? "bg-zn-text" : "bg-zn-border group-hover:bg-zn-text/40",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

type ProductsShowcaseProps = {
  products: Product[];
  intro: React.ReactNode;
};

export function ProductsShowcase({ products, intro }: ProductsShowcaseProps) {
  return (
    <div className="zn-container-guides relative mt-14">
      <div className="relative border-y border-zn-border">
        <BlueprintGridCrosses columns={2} rows={1} />

        <div className="relative grid lg:grid-cols-2 lg:divide-x lg:divide-zn-border">
          <div className="border-b border-zn-border px-6 py-8 lg:border-b-0 lg:py-10">
            {intro}
          </div>
          <ProductSlider products={products} />
        </div>
      </div>
    </div>
  );
}
