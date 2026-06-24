"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 6;
const TRAIL_EASE = 0.14;

/**
 * Smooth trailing dot that follows the pointer. The system cursor stays visible —
 * this is a decorative lag layer only.
 */
export function CustomCursor() {
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const enabledRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (reduce || noHover) return;

    enabledRef.current = true;

    const positions = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    let mouseX = positions[0].x;
    let mouseY = positions[0].y;
    let visible = false;
    let raf = 0;

    const render = () => {
      positions[0].x += (mouseX - positions[0].x) * 0.28;
      positions[0].y += (mouseY - positions[0].y) * 0.28;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * TRAIL_EASE;
        positions[i].y += (positions[i - 1].y - positions[i].y) * TRAIL_EASE;
      }

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const scale = 1 - i * 0.12;
        const opacity = visible ? Math.max(0.08, 0.42 - i * 0.06) : 0;
        dot.style.transform = `translate3d(${positions[i].x}px, ${positions[i].y}px, 0) translate(-50%, -50%) scale(${scale})`;
        dot.style.opacity = String(opacity);
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      visible = true;
    };

    const onLeave = () => {
      visible = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      enabledRef.current = false;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] hidden lg:block"
    >
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          className="absolute left-0 top-0 rounded-full bg-zn-text/25 will-change-transform"
          style={{
            width: i === 0 ? 6 : 5,
            height: i === 0 ? 6 : 5,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
