"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

type MagneticButtonProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  strength?: number;
  as?: React.ElementType;
  className?: string;
};

/**
 * Wraps an element so it drifts toward the pointer on hover, then springs back.
 * No-ops on touch devices and under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  strength = 0.3,
  as: Tag = "span",
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const allowed = () =>
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(hover: none)").matches;

  const handleMove = (e: React.MouseEvent) => {
    if (!allowed() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <Tag
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
