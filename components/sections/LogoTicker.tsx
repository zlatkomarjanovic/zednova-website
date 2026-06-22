"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { clientLogos } from "@/lib/content/client-logos";

/** Enough repeats so one loop half always fills the guide column on wide screens. */
const SETS_PER_HALF = 5;

export function LogoTicker({
  label = "Trusted by teams across the US",
}: {
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const half = Array.from({ length: SETS_PER_HALF }, () => clientLogos).flat();
  const items = [...half, ...half];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      if (reduce || !track || items.length === 0) return;

      const startLoop = () => {
        tweenRef.current?.kill();
        gsap.set(track, { clearProps: "transform" });

        const loopWidth = track.scrollWidth / 2;
        if (loopWidth <= 0) return;

        gsap.set(track, { x: 0, force3D: true });
        tweenRef.current = gsap.to(track, {
          x: -loopWidth,
          duration: 78,
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
      };

      startLoop();

      const observer = new ResizeObserver(() => startLoop());
      observer.observe(track);

      track.querySelectorAll("img").forEach((img) => {
        if (!img.complete) img.addEventListener("load", startLoop, { once: true });
      });

      return () => {
        observer.disconnect();
        tweenRef.current?.kill();
        tweenRef.current = null;
        gsap.set(track, { clearProps: "transform" });
      };
    },
    { scope: trackRef },
  );

  return (
    <section className="relative bg-zn-bg py-10">
      <BlueprintGrid />

      <div className="zn-container relative">
        <p className="zn-label mb-7 text-center text-zn-text-3">{label}</p>
      </div>

      <div className="zn-container-guides relative">
        <div className="relative border-y border-zn-border">
          <BlueprintCross anchor="left" className="top-0 z-10 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 z-10 -translate-y-1/2" />
          <BlueprintCross anchor="left" className="bottom-0 z-10 translate-y-1/2" />
          <BlueprintCross anchor="right" className="bottom-0 z-10 translate-y-1/2" />

          <div className="relative overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div
              ref={trackRef}
              className="flex w-max items-center gap-24 will-change-transform motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] lg:gap-32"
            >
              {items.map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  className="flex h-7 shrink-0 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100 lg:h-8"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={32}
                    unoptimized
                    className="h-5 w-auto max-w-[5.5rem] object-contain object-center brightness-0 opacity-45 lg:h-6"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
