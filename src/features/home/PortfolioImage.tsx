import Image from "next/image";
import { cn } from "@/lib/utils";

/** Local portfolio mockups — serve at native resolution without optimizer recompression. */
export function PortfolioImage({
  src,
  alt,
  priority,
  sizes = "(max-width: 1024px) 100vw, 45vw",
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const imageSrc = src?.trim();
  if (!imageSrc) {
    return (
      <div
        className={cn("absolute inset-0 bg-zn-bg-2", className)}
        role="img"
        aria-label={alt || "Project preview"}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized
      className={cn("object-cover", className)}
    />
  );
}
