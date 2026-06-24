import { cn } from "@/lib/utils";

/** Shared Mac-style browser chrome frame used by the approach-section animations. */
export function BrowserChrome({
  children,
  className,
  urlLabel = "yourbusiness.com",
}: {
  children: React.ReactNode;
  className?: string;
  urlLabel?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-[0_10px_34px_-16px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-black/[0.06] bg-[#ececea] px-3">
        <span className="size-[7px] rounded-full bg-[#ec6a5e]" />
        <span className="size-[7px] rounded-full bg-[#f4bf4f]" />
        <span className="size-[7px] rounded-full bg-[#61c454]" />
        <div className="ml-2 flex h-4 flex-1 items-center justify-center rounded-full bg-white">
          <span className="truncate text-[8px] font-medium tracking-tight text-black/35">
            {urlLabel}
          </span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/** Small colored multiplayer-style cursor with a name tag, positioned via an external CSS animation class. */
export function CollabCursor({
  color,
  name,
  animationClass,
}: {
  color: string;
  name: string;
  animationClass: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-20 flex items-center gap-1",
        animationClass,
      )}
      style={{ "--zn-cursor-color": color } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="zn-cursor-ripple absolute -left-2 -top-2 size-6 rounded-full"
        style={{ backgroundColor: color }}
      />
      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" className="relative shrink-0 drop-shadow-sm">
        <path
          d="M1 1L12 9.5L7.2 10.5L9.4 15L7 16L4.6 11.1L1 14.4V1Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      <span
        className="relative rounded-full px-1.5 py-0.5 text-[8px] font-medium leading-none whitespace-nowrap text-white"
        style={{ backgroundColor: color }}
      >
        {name}
      </span>
    </div>
  );
}
