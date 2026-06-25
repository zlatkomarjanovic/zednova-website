"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type TextRevealProps = {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  /** Animate on mount instead of waiting for scroll (hero headlines). */
  immediate?: boolean;
};

/**
 * Word-by-word blur + fade reveal. Falls back to plain visible text under
 * prefers-reduced-motion.
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  start = "top 85%",
  immediate = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ref.current) return;

      const words = ref.current.querySelectorAll<HTMLElement>("[data-word]");
      gsap.set(words, { opacity: 0, filter: "blur(10px)", y: 12 });

      const tween = {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger,
        delay,
      };

      if (immediate) {
        gsap.to(words, tween);
        return;
      }

      gsap.to(words, {
        ...tween,
        scrollTrigger: { trigger: ref.current, start },
      });
    },
    { scope: ref },
  );

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block align-bottom">
          <span data-word className="inline-block will-change-[transform,opacity,filter]">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
