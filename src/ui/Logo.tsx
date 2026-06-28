import { brandWordmark } from "@/lib/fonts/brand-wordmark";
import { cn } from "@/lib/utils";

type LogoVariant = "dark" | "light";

const Z_MARK_PATHS = [
  "M290.401 444.685L732.059 366.809C862.634 343.785 987.15 430.972 1010.17 561.546C1011.5 569.069 1006.48 576.242 998.955 577.568L557.297 655.444C426.722 678.468 302.206 591.281 279.182 460.707C277.856 453.185 282.879 446.012 290.401 444.685Z",
  "M22.8876 128.832L464.546 50.956C595.12 27.9322 719.637 115.119 742.661 245.694C743.988 253.216 738.964 260.389 731.442 261.715L289.783 339.592C159.209 362.615 34.693 275.428 11.6692 144.854C10.3431 137.332 15.3656 130.159 22.8876 128.832Z",
] as const;

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
      className={cn("inline-flex items-center gap-2.5", ink, className)}
    >
      <ZMark
        className={cn("h-5 w-auto shrink-0", markClassName)}
        variant={variant}
      />
      {withWordmark && !markOnly && (
        <span
          className={cn(
            brandWordmark.className,
            "text-[1.3rem] font-semibold leading-none tracking-[-0.035em]",
          )}
        >
          ZedNova
        </span>
      )}
    </span>
  );
}

/** ZedNova filled mark — spaced-out SVG, theme-aware via currentColor. */
export function ZMark({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  return (
    <svg
      viewBox="0 0 1022 707"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(
        "block shrink-0",
        variant === "light" ? "text-zn-inv" : "text-zn-text",
        className,
      )}
    >
      {Z_MARK_PATHS.map((d) => (
        <path
          key={d.slice(0, 16)}
          d={d}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="16"
        />
      ))}
    </svg>
  );
}
