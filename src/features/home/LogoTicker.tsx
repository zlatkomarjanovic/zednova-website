"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { clientLogos } from "@/lib/content/client-logos";
import {
  LOGO_TICKER_SCROLL_DIRECTION,
  assertLogoTickerDirection,
} from "@/lib/content/logo-ticker-config";

/** Enough repeats so one loop half always fills the guide column on wide screens. */
const SETS_PER_HALF = 5;

function applyLogoTickerScroll(
  track: HTMLElement,
  loopWidth: number,
  duration: number,
): gsap.core.Tween {
  assertLogoTickerDirection(LOGO_TICKER_SCROLL_DIRECTION);

  gsap.set(track, { x: -loopWidth, force3D: true });
  return gsap.to(track, {
    x: 0,
    duration,
    ease: "none",
    repeat: -1,
    force3D: true,
    modifiers: {
      x: (value) => {
        const px = parseFloat(String(value));
        if (!Number.isFinite(px) || loopWidth <= 0) return "0px";
        const wrapped = ((px % loopWidth) + loopWidth) % loopWidth;
        return `${wrapped - loopWidth}px`;
      },
    },
  });
}

export function LogoTicker({
  label = "Trusted by teams across the US",
}: {
  label?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [loopReady, setLoopReady] = useState(false);

  useEffect(() => {
    setLoopReady(true);
  }, []);

  const half = useMemo(
    () => Array.from({ length: SETS_PER_HALF }, () => clientLogos).flat(),
    [],
  );

  /** SSR + first paint: one set only. Loop duplicate mounts client-side. */
  const items = loopReady ? [...half, ...half] : clientLogos;
  const loopHalfLength = loopReady ? half.length : clientLogos.length;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      if (reduce || !track || !loopReady || items.length === 0) return;

      const startLoop = () => {
        tweenRef.current?.kill();
        gsap.set(track, { clearProps: "transform" });

        const loopWidth = track.scrollWidth / 2;
        if (loopWidth <= 0) return;

        tweenRef.current = applyLogoTickerScroll(track, loopWidth, 78);
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
    { scope: trackRef, dependencies: [loopReady, items.length] },
  );

  return (
    <section className="relative bg-zn-bg py-10" aria-label={label}>
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
            <ul
              ref={trackRef}
              className="flex w-max list-none items-center gap-24 p-0 will-change-transform motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none] lg:gap-32"
            >
              {items.map((logo, i) => (
                <li
                  key={`${logo.src}-${i}`}
                  aria-hidden={loopReady && i >= loopHalfLength ? true : undefined}
                  className="flex h-7 shrink-0 items-center justify-center opacity-80 lg:h-8"
                >
                  <Image
                    src={logo.src}
                    alt={loopReady && i >= loopHalfLength ? "" : logo.alt}
                    width={100}
                    height={32}
                    unoptimized
                    className="h-5 w-auto max-w-[5.5rem] object-contain object-center brightness-0 opacity-45 lg:h-6"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
