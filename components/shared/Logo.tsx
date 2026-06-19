import { cn } from "@/lib/utils";

type LogoVariant = "dark" | "light";

/**
 * ZedNova wordmark — text only in navigation (no Z mark icon).
 */
export function Logo({
  variant = "dark",
  className,
  withWordmark = true,
}: {
  variant?: LogoVariant;
  className?: string;
  withWordmark?: boolean;
}) {
  const ink = variant === "light" ? "text-zn-inv" : "text-zn-text";
  const sub = variant === "light" ? "text-zn-inv-2" : "text-zn-text-2";

  return (
    <span
      role="img"
      aria-label="ZedNova Studios"
      className={cn("inline-flex items-center", ink, className)}
    >
      {withWordmark && (
        <span className="flex flex-col justify-center leading-none">
          <span className="font-sans text-[0.9rem] font-normal uppercase leading-none tracking-[0.14em]">
            ZEDNOVA
          </span>
          <span
            className={cn(
              "mt-[3px] font-sans text-[0.48rem] font-normal uppercase leading-none tracking-[0.32em]",
              sub,
            )}
          >
            STUDIOS
          </span>
        </span>
      )}
    </span>
  );
}

/** The geometric Z mark on its own (uses currentColor). */
export function ZMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7 7 L41 7 L41 16 L21 32 L41 32 L41 41 L7 41 L7 32 L27 16 L7 16 Z"
        fill="currentColor"
      />
    </svg>
  );
}
