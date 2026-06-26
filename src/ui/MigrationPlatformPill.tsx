import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { PlatformIcon } from "@/lib/migrations/platform-icons";
import { cn } from "@/lib/utils";

type MigrationPlatformPillProps = {
  from: PlatformIcon[];
  to: PlatformIcon[];
  theme?: "light" | "dark";
  className?: string;
};

function PlatformLogo({
  icon,
  theme,
}: {
  icon: PlatformIcon;
  theme: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex size-[22px] shrink-0 items-center justify-center rounded-full p-1 shadow-sm",
        theme === "dark"
          ? "bg-white ring-1 ring-white/20"
          : "bg-white ring-1 ring-zn-border/70",
      )}
    >
      <Image
        src={icon.src}
        alt={icon.alt}
        width={13}
        height={13}
        unoptimized
        className="size-[13px] object-contain"
      />
    </span>
  );
}

/** From → to platform logo row (no outer pill wrapper). */
export function MigrationPlatformPill({
  from,
  to,
  theme = "light",
  className,
}: MigrationPlatformPillProps) {
  if (from.length === 0 || to.length === 0) return null;

  const label = `${from.map((icon) => icon.alt).join(", ")} to ${to.map((icon) => icon.alt).join(", ")}`;

  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={label}
    >
      <span className="inline-flex items-center -space-x-0.5">
        {from.map((icon) => (
          <PlatformLogo key={`from-${icon.src}-${icon.alt}`} icon={icon} theme={theme} />
        ))}
      </span>
      <ArrowRight
        className={cn("size-2.5 shrink-0", theme === "dark" ? "text-zn-inv-2" : "text-zn-text-3")}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span className="inline-flex items-center -space-x-0.5">
        {to.map((icon) => (
          <PlatformLogo key={`to-${icon.src}-${icon.alt}`} icon={icon} theme={theme} />
        ))}
      </span>
    </span>
  );
}
