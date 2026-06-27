import { brandWordmark } from "@/lib/fonts/brand-wordmark";
import { cn } from "@/lib/utils";

type LogoVariant = "dark" | "light";

const MARK_DARK = "/images/brand/zednova-mark-dark.png";
const MARK_LIGHT = "/images/brand/zednova-mark-light.png";

/**
 * ZedNova mark + wordmark for navigation, footer, and brand surfaces.
 */
export function Logo({
  variant = "dark",
  className,
  withWordmark = true,
  markOnly = false,
  markClassName,
}: {
  variant?: LogoVariant;
  className?: string;
  withWordmark?: boolean;
  markOnly?: boolean;
  markClassName?: string;
}) {
  const ink = variant === "light" ? "text-zn-inv" : "text-zn-text";

  return (
    <span
      role="img"
      aria-label="ZedNova Studios"
      className={cn("inline-flex items-center gap-2", ink, className)}
    >
      <ZMark
        className={cn("h-5 w-auto shrink-0", markClassName)}
        variant={variant}
      />
      {withWordmark && !markOnly && (
        <span
          className={cn(
            brandWordmark.className,
            "text-[1.3rem] font-bold leading-none tracking-[-0.035em]",
          )}
        >
          ZedNova
        </span>
      )}
    </span>
  );
}

/** ZedNova filled mark — dedicated light/dark assets, no CSS filters. */
export function ZMark({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === "light" ? MARK_LIGHT : MARK_DARK}
      alt=""
      width={1002}
      height={667}
      decoding="async"
      aria-hidden="true"
      className={cn("block shrink-0 object-contain object-left", className)}
    />
  );
}
