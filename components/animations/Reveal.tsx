"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  as?: React.ElementType;
  start?: string;
};

/** Single-element blur + fade on scroll into view. */
export function Reveal({
  children,
  className,
  y = 16,
  delay = 0,
  as: Tag = "div",
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { y, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
};

/** Staggers blur + fade of direct children on scroll into view. */
export function Stagger({
  children,
  className,
  y = 16,
  stagger = 0.08,
  start = "top 82%",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ref.current) return;
      const items = gsap.utils.toArray<HTMLElement>(ref.current.children);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { y, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
