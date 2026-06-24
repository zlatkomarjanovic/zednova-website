import { cn } from "@/lib/utils";

/** Shared dotted-grid backdrop so every "Our approach" animation reads as one family. */
export function AnimationBackdrop({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-[#fbfbfa]", className)}>
      <div className="zn-anim-dotgrid absolute inset-0" aria-hidden="true" />
      {children}
      <style>{`
        .zn-anim-dotgrid {
          background-image: radial-gradient(circle, color-mix(in srgb, var(--color-zn-text) 16%, transparent) 1px, transparent 1px);
          background-size: 14px 14px;
          background-position: 7px 7px;
        }
      `}</style>
    </div>
  );
}
