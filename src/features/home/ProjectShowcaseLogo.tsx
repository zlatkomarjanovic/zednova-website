import Image from "next/image";

import { cn } from "@/lib/utils";

type ProjectShowcaseLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Client logo in showcase cards — same muted grey treatment as the logo ticker. */
export function ProjectShowcaseLogo({ src, alt, className }: ProjectShowcaseLogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={64}
      unoptimized
      className={cn(
        "h-10 w-auto max-w-[9.5rem] object-contain object-center brightness-0 opacity-45 lg:h-12 lg:max-w-[11rem]",
        className,
      )}
    />
  );
}
