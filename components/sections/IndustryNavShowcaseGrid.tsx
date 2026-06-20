"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Icon } from "@/components/shared/Icon";
import type { HomepageIndustry } from "@/lib/content/homepage-industries";
import { cn } from "@/lib/utils";

const SLIDE_EASE = [0.45, 0, 0.2, 1] as const;
const PER_SLIDE = 3;
const AUTOPLAY_MS = 7000;

function chunkIndustries(items: HomepageIndustry[], size: number) {
  const slides: HomepageIndustry[][] = [];
  for (let i = 0; i < items.length; i += size) {
    slides.push(items.slice(i, i + size));
  }
  return slides;
}

function IndustryCard({ industry }: { industry: HomepageIndustry }) {
  return (
    <div className="flex h-full flex-col border-r border-zn-border last:border-r-0">
      <Link
        href={industry.href}
        className="flex h-full flex-col gap-5 px-6 py-7 md:px-7 md:py-8"
      >
        <Icon name={industry.icon} className="size-6 text-zn-text" />

        <div className="space-y-3">
          <h3 className="font-sans text-base font-normal tracking-tight text-zn-text">
            {industry.title}
          </h3>
          <p className="zn-prose line-clamp-3 text-[0.8125rem] leading-relaxed text-zn-text-2">
            {industry.shortDescription}
          </p>
        </div>

        <ul className="mt-auto flex flex-wrap gap-2 pt-1">
          {industry.popularServices.map((service) => (
            <li
              key={service}
              className="rounded-full border border-zn-border bg-white/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-zn-text-3"
            >
              {service}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export function IndustryNavShowcaseGrid({ industries }: { industries: HomepageIndustry[] }) {
  const slides = useMemo(() => chunkIndustries(industries, PER_SLIDE), [industries]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeSlideRef = useRef(activeSlide);

  activeSlideRef.current = activeSlide;

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      setActiveSlide(next);
    },
    [slides.length],
  );

  const goPrev = useCallback(() => goTo(activeSlideRef.current - 1), [goTo]);
  const goNext = useCallback(() => goTo(activeSlideRef.current + 1), [goTo]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || slides.length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      goTo(activeSlideRef.current + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [goTo, paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="zn-container-guides relative mt-14">
      <div
        className="border-t border-zn-border"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="flex items-center justify-between border-b border-zn-border px-6 py-4 md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zn-text-3">
            {String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous industries"
              className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next industries"
              className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${activeSlide * 100}%` }}
            transition={{ duration: 0.75, ease: SLIDE_EASE }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="grid w-full shrink-0 grid-cols-1 md:grid-cols-3"
              >
                {slide.map((industry) => (
                  <IndustryCard key={industry.href} industry={industry} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center gap-2 border-t border-zn-border px-6 py-4 md:px-8">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => goTo(index)}
              className="group relative h-px flex-1"
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 bg-zn-text transition-all duration-500 ease-out",
                  index === activeSlide ? "w-full" : "w-0 group-hover:w-1/2",
                )}
              />
              <span className="block h-px w-full bg-zn-border" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
