"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LOGOS = [
  "NORTHGATE",
  "SUMMIT HVAC",
  "LONE STAR DENTAL",
  "MERIDIAN LAW",
  "APEX ROOFING",
  "CEDAR CLINIC",
  "VANTAGE REALTY",
  "IRONCLAD",
  "BLUE HARBOR",
  "PINNACLE",
  "TRUE NORTH",
  "BRELL & CO",
];

export function LogoTicker({
  label = "Trusted by teams across the US",
}: {
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...LOGOS, ...LOGOS];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      if (reduce || !track) return;

      const half = track.scrollWidth / 2;
      gsap.set(track, { x: -half });
      const tween = gsap.to(track, {
        x: 0,
        duration: 52,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    { scope: trackRef },
  );

  return (
    <section className="border-y border-zn-border bg-zn-bg py-10">
      <div className="zn-container">
        <p className="zn-label mb-7 text-center text-zn-text-3">{label}</p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          ref={trackRef}
          className="flex w-max gap-16 pr-16 motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]"
        >
          {items.map((name, i) => (
            <span
              key={i}
              className="shrink-0 select-none font-sans text-lg font-normal tracking-wide text-zn-text-3"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
