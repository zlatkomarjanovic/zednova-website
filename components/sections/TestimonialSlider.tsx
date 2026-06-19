"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      7500,
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  const current = testimonials[index];
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
      <div className="relative min-h-[14rem] border border-zn-border-dk px-6 py-8 sm:px-8 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zn-inv-2">
              {current.industry}
            </p>
            <blockquote className="zn-accent-italic mt-5 text-2xl leading-snug text-zn-inv sm:text-[1.65rem]">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <footer className="mt-8 border-t border-zn-border-dk pt-5">
              <cite className="not-italic">
                <span className="block font-sans text-sm font-medium text-zn-inv">
                  {current.authorTitle}
                </span>
                <span className="mt-1 block text-sm text-zn-inv-2">
                  {current.company}
                </span>
              </cite>
            </footer>
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex size-9 items-center justify-center border border-zn-border-dk text-zn-inv-2 transition-colors hover:border-zn-inv-2 hover:text-zn-inv"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex size-9 items-center justify-center border border-zn-border-dk text-zn-inv-2 transition-colors hover:border-zn-inv-2 hover:text-zn-inv"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-zn-border-dk border-y border-zn-border-dk">
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === index}
            className={cn(
              "px-5 py-4 text-left transition-colors sm:px-6 sm:py-5",
              i === index
                ? "bg-zn-dark-2 text-zn-inv"
                : "text-zn-inv-2 hover:bg-zn-dark-2/60 hover:text-zn-inv",
            )}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.12em]">
              {item.industry}
            </span>
            <span className="mt-2 block line-clamp-2 text-sm leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </span>
            <span className="mt-3 block text-xs text-zn-inv-2">{item.company}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
