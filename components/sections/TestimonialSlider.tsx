"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      6500,
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex min-h-[16rem] w-full max-w-4xl items-center justify-center sm:min-h-[14rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="zn-accent-italic text-2xl leading-snug text-zn-inv sm:text-3xl"
          >
            &ldquo;{current.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 text-sm text-zn-inv-2">
        <span className="font-sans font-medium text-zn-inv">
          {current.authorTitle}
        </span>
        <span className="mx-1.5" aria-hidden="true">
          ·
        </span>
        {current.company}
        <span className="mx-1.5" aria-hidden="true">
          ·
        </span>
        {current.industry}
      </div>

      <div className="mt-8 flex items-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-8 bg-zn-inv" : "w-1.5 bg-zn-inv-2/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
