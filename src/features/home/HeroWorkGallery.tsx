"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { BlueprintCross } from "@/ui/BlueprintCross";
import { PortfolioHoverMedia } from "@/features/home/PortfolioHoverMedia";
import type { PortfolioProject } from "@/lib/types";
import { cn } from "@/lib/utils";

type HeroWorkGalleryProps = {
  projects: PortfolioProject[];
  className?: string;
  showTopBorder?: boolean;
};

function ProjectSlide({ project, priority }: { project: PortfolioProject; priority?: boolean }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-[66.666cqw] min-w-[18rem] shrink-0"
    >
      <PortfolioHoverMedia
        image={project.image}
        video={project.video}
        alt={project.imageAlt}
        priority={priority}
        sizes="(max-width: 1312px) 66vw, 840px"
        className="aspect-[16/10] w-full rounded-[10px]"
      />
      <p className="mt-2.5 w-full font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-zn-text-2">
        {project.client} — {project.title}
      </p>
    </a>
  );
}

/**
 * Horizontal project strip clipped to the guide column. Each slide is ~⅔ of the
 * guide width (~2× prior size) — one dominant + next entering.
 */
export function HeroWorkGallery({
  projects,
  className,
  showTopBorder = true,
}: HeroWorkGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const items = projects.length > 0 ? [...projects, ...projects] : [];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      if (reduce || !track || items.length === 0) return;

      const BASE_DURATION = 58;
      const scrollState = {
        lastY: window.scrollY,
        smoothVel: 0,
        smoothTimeScale: 1,
      };

      const startLoop = () => {
        tweenRef.current?.kill();
        gsap.set(track, { clearProps: "transform" });

        const loopWidth = track.scrollWidth / 2;
        if (loopWidth <= 0) return;

        gsap.set(track, { x: 0, force3D: true });
        tweenRef.current = gsap.to(track, {
          x: -loopWidth,
          duration: BASE_DURATION,
          ease: "none",
          repeat: -1,
          force3D: true,
          modifiers: {
            x: (value) => {
              const px = parseFloat(String(value));
              if (!Number.isFinite(px) || loopWidth <= 0) return "0px";
              const wrapped = ((px % -loopWidth) + -loopWidth) % -loopWidth;
              return `${wrapped}px`;
            },
          },
        });
        tweenRef.current.timeScale(scrollState.smoothTimeScale);
      };

      const syncScrollSpeed = () => {
        const tween = tweenRef.current;
        if (!tween) return;

        const y = window.scrollY;
        const delta = Math.abs(y - scrollState.lastY);
        scrollState.lastY = y;

        scrollState.smoothVel += (delta - scrollState.smoothVel) * 0.18;
        const scrollBoost = Math.min(scrollState.smoothVel * 0.22, 1.35);
        const targetTimeScale = 1 + scrollBoost;

        scrollState.smoothTimeScale += (targetTimeScale - scrollState.smoothTimeScale) * 0.09;
        tween.timeScale(scrollState.smoothTimeScale);
      };

      startLoop();
      gsap.ticker.add(syncScrollSpeed);

      const observer = new ResizeObserver(() => startLoop());
      observer.observe(track);

      track.querySelectorAll("img").forEach((img) => {
        if (!img.complete) img.addEventListener("load", startLoop, { once: true });
      });

      return () => {
        gsap.ticker.remove(syncScrollSpeed);
        observer.disconnect();
        tweenRef.current?.kill();
        tweenRef.current = null;
        gsap.set(track, { clearProps: "transform" });
      };
    },
    { dependencies: [items.length] },
  );

  return (
    <div className={cn("@container relative w-full", className)}>
      {showTopBorder && (
        <>
          <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />
          <div className="border-t border-zn-border" />
        </>
      )}

      <div className={cn("overflow-hidden", showTopBorder ? "pt-8" : "pt-0")}>
        <div
          ref={trackRef}
          className="flex w-max items-start gap-5 will-change-transform motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] lg:gap-6"
        >
          {items.map((project, index) => (
            <ProjectSlide
              key={`${project.slug}-${index}`}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
