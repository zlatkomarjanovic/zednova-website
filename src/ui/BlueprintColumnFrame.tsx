import { cn } from "@/lib/utils";
import { BlueprintCross } from "@/ui/BlueprintCross";

type BlueprintColumnFrameProps = {
  children: React.ReactNode;
  className?: string;
  /** Space below content, inside the frame — side rails run through this area. */
  bottomInset?: boolean;
  showTopCrosses?: boolean;
  showBottomCrosses?: boolean;
};

/**
 * Guide-column frame using explicit 1px rail elements instead of CSS borders.
 * Side rails and bottom rail are independent layers — both always render.
 */
export function BlueprintColumnFrame({
  children,
  className,
  bottomInset = true,
  showTopCrosses = true,
  showBottomCrosses = true,
}: BlueprintColumnFrameProps) {
  return (
    <div
      className={cn(
        "relative",
        bottomInset && "pb-[clamp(4rem,8vw,7rem)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[15]"
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-zn-border" />
        <div className="absolute inset-y-0 right-0 w-px bg-zn-border" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-zn-border" />
      </div>

      {showTopCrosses ? (
        <>
          <BlueprintCross anchor="left" className="top-0 z-20 -translate-y-1/2" />
          <BlueprintCross anchor="right" className="top-0 z-20 -translate-y-1/2" />
        </>
      ) : null}

      {children}

      {showBottomCrosses ? (
        <>
          <BlueprintCross anchor="left" className="bottom-0 z-20 translate-y-1/2" />
          <BlueprintCross anchor="right" className="bottom-0 z-20 translate-y-1/2" />
        </>
      ) : null}
    </div>
  );
}
