"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { BlueprintCross } from "@/ui/BlueprintCross";
import { TestimonialAvatar } from "@/features/home/TestimonialAvatar";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

const MARQUEE_DURATION = 190;

const CARD_CLASS =
  "flex w-[22rem] shrink-0 flex-col justify-between self-stretch border-r border-zn-border-dk bg-zn-dark p-6 last:border-r-0 sm:w-[24rem]";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className={CARD_CLASS}>
      <p className="text-sm leading-relaxed text-zn-inv sm:text-[0.9375rem]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="-mx-6 mt-6 border-t border-zn-border-dk px-6 pt-4">
        <div className="flex items-center gap-3">
          <TestimonialAvatar name={testimonial.authorName} image={testimonial.image} />
          <div className="min-w-0">
            <p className="font-sans text-sm font-medium text-zn-inv">
              {testimonial.authorName}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-zn-inv-2">
              {testimonial.authorTitle}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  testimonials,
  direction,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const items = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      if (reduce || !track || items.length === 0) return;

      const half = track.scrollWidth / 2;

      if (direction === "left") {
        gsap.set(track, { x: -half });
        tweenRef.current = gsap.to(track, {
          x: 0,
          duration: MARQUEE_DURATION,
          ease: "none",
          repeat: -1,
        });
      } else {
        gsap.set(track, { x: 0 });
        tweenRef.current = gsap.to(track, {
          x: -half,
          duration: MARQUEE_DURATION,
          ease: "none",
          repeat: -1,
        });
      }

      return () => {
        tweenRef.current?.kill();
      };
    },
    { scope: trackRef, dependencies: [items.length, direction] },
  );

  const pause = () => tweenRef.current?.pause();
  const play = () => tweenRef.current?.play();

  return (
    <div
      ref={rowRef}
      className="overflow-hidden border-b border-zn-border-dk bg-zn-dark last:border-b-0"
      onMouseEnter={pause}
      onMouseLeave={play}
      onFocus={pause}
      onBlur={play}
    >
      <div ref={trackRef} className="flex w-max items-stretch">
        {items.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
}

export function TestimonialCarousel({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) {
  const midpoint = Math.ceil(testimonials.length / 2);
  const topRow = testimonials.slice(0, midpoint);
  const bottomRow = testimonials.slice(midpoint);

  return (
    <div className={cn("relative", className)}>
      <BlueprintCross
        anchor="left"
        theme="dark"
        className="top-0 z-10 -translate-y-1/2"
      />
      <BlueprintCross
        anchor="right"
        theme="dark"
        className="top-0 z-10 -translate-y-1/2"
      />
      <BlueprintCross
        anchor="left"
        theme="dark"
        className="bottom-0 z-10 translate-y-1/2"
      />
      <BlueprintCross
        anchor="right"
        theme="dark"
        className="bottom-0 z-10 translate-y-1/2"
      />

      <div className="relative border-y border-zn-border-dk bg-zn-dark">
        <MarqueeRow testimonials={topRow} direction="left" />
        <MarqueeRow testimonials={bottomRow} direction="right" />
      </div>
    </div>
  );
}
