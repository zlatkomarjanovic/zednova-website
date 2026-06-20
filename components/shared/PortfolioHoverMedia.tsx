"use client";

import { useId, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { cn } from "@/lib/utils";

type PortfolioHoverMediaProps = {
  image: string;
  video?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const REVEAL_SPRING = { stiffness: 220, damping: 32, mass: 0.85 };

/**
 * Webflow-style portfolio media: mockup cover image with a video overlay that
 * reveals top-to-bottom through a curved SVG clip path on hover.
 */
export function PortfolioHoverMedia({
  image,
  video,
  alt,
  priority,
  sizes = "(max-width: 1024px) 100vw, 45vw",
  className,
}: PortfolioHoverMediaProps) {
  const clipId = useId().replace(/:/g, "");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const reveal = useSpring(0, REVEAL_SPRING);

  const clipPathD = useTransform(reveal, (v) => {
    if (v <= 0.001) return "M0,0 H1 V0 Q0.5,0 0,0 Z";
    const curve = Math.min(0.1, v * 0.14);
    return `M0,0 H1 V${v} Q0.5,${v + curve} 0,${v} Z`;
  });

  const playVideo = () => {
    setHovering(true);
    reveal.set(1);
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play().catch(() => undefined);
  };

  const pauseVideo = () => {
    setHovering(false);
    reveal.set(0);
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <div
      className={cn("relative overflow-hidden bg-zn-bg-2", className)}
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      onFocus={playVideo}
      onBlur={pauseVideo}
    >
      <PortfolioImage
        src={image}
        alt={alt}
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />

      {video && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ clipPath: `url(#${clipId})` }}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden={!hovering}
              className="size-full object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>

          <svg className="pointer-events-none absolute size-0" aria-hidden="true">
            <defs>
              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                <motion.path d={clipPathD} />
              </clipPath>
            </defs>
          </svg>
        </>
      )}
    </div>
  );
}
