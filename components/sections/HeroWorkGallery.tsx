"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { MediaImage } from "@/components/shared/MediaImage";
import type { CaseStudy } from "@/lib/types";
import { cn } from "@/lib/utils";

type HeroWorkGalleryProps = {
  caseStudies: CaseStudy[];
  className?: string;
  showTopBorder?: boolean;
};

/**
 * Horizontal project strip clipped to the guide column. Each slide is ~⅔ of the
 * guide width (~2× prior size) — one dominant + next entering.
 */
export function HeroWorkGallery({
  caseStudies,
  className,
  showTopBorder = true,
}: HeroWorkGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = caseStudies.length > 0 ? [...caseStudies, ...caseStudies] : [];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      if (reduce || !track || items.length === 0) return;

      const half = track.scrollWidth / 2;
      gsap.set(track, { x: -half });
      const tween = gsap.to(track, {
        x: 0,
        duration: 34,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
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
          className="flex w-max items-start gap-5 motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] lg:gap-6"
        >
          {items.map((project, index) => (
            <Link
              key={`${project.slug}-${index}`}
              href={`/work/${project.slug}`}
              className="group block w-[66.666cqw] min-w-[18rem] shrink-0"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px]">
                <MediaImage
                  src={project.image}
                  alt={project.title}
                  accent={project.accent}
                  priority={index === 0}
                  sizes="(max-width: 1312px) 66vw, 840px"
                  className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </div>
              <p className="mt-2.5 w-full font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-zn-text-2">
                {project.client} — {project.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
