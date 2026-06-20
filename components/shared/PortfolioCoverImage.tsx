import Image from "next/image";
import { cn } from "@/lib/utils";

/** Portfolio screenshots — full color, no duotone treatment. */
export function PortfolioCoverImage({
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
  return (
    <div className={cn("relative overflow-hidden bg-zn-bg-2", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </div>
  );
}
