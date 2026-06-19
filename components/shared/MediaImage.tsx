import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Treated image used across the site: grayscale base + brand-accent duotone +
 * a legibility gradient + grain. Keeps stock photography cohesive and on-brand.
 * Scales subtly when an ancestor `group` is hovered.
 */
export function MediaImage({
  src,
  alt,
  accent,
  priority,
  sizes = "(max-width: 1024px) 100vw, 45vw",
  tint = 0.5,
  className,
  children,
}: {
  src: string;
  alt: string;
  accent?: string;
  priority?: boolean;
  sizes?: string;
  tint?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-zn-dark", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover grayscale transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none"
      />
      {accent && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: accent, opacity: tint }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25"
      />
      <div className="zn-grain absolute inset-0" aria-hidden="true" />
      {children}
    </div>
  );
}
