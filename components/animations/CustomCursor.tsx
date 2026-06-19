"use client";

import { useEffect, useRef, useState } from "react";

type CursorVariant = "default" | "link" | "media";

/**
 * Dot cursor that lags the pointer and grows over interactive elements.
 * White fill + mix-blend-difference so it auto-inverts on dark sections.
 * Not rendered on touch devices or under prefers-reduced-motion.
 */
export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (reduce || noHover) return;

    setEnabled(true);
    document.documentElement.classList.add("zn-cursor-on");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let raf = 0;

    const render = () => {
      curX += (mouseX - curX) * 0.2;
      curY += (mouseY - curY) * 0.2;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-cursor='media']")) setVariant("media");
      else if (target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='link']"))
        setVariant("link");
      else setVariant("default");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("zn-cursor-on");
    };
  }, []);

  if (!enabled) return null;

  const size = variant === "media" ? 64 : variant === "link" ? 36 : 8;

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-white text-[10px] font-medium uppercase tracking-wider text-black"
        style={{
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          transition: "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {variant === "media" ? "View" : ""}
      </div>
    </div>
  );
}
