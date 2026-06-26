import Image from "next/image";

import { cn } from "@/lib/utils";

type NavMenuIconProps = {
  src: string;
  alt: string;
  theme?: "light" | "dark";
  className?: string;
};

/** Circular nav icon chip for mega menu items. */
export function NavMenuIcon({
  src,
  alt,
  theme = "light",
  className,
}: NavMenuIconProps) {
  return (
    <span
      className={cn(
        "inline-flex size-[22px] shrink-0 items-center justify-center rounded-full p-1 shadow-sm",
        theme === "dark"
          ? "bg-white ring-1 ring-white/20"
          : "bg-white ring-1 ring-zn-border/70",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={13}
        height={13}
        unoptimized
        className="size-[13px] object-contain"
      />
    </span>
  );
}
