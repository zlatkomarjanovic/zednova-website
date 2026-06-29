import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { cn } from "@/lib/utils";

type TemplateSectionProps = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
  insetClassName?: string;
  withBlueprintGrid?: boolean;
  borderBottom?: boolean;
  /** Skip default vertical padding (e.g. hero uses custom inset). */
  noInsetPadding?: boolean;
};

/** Blueprint-aligned section with vertical guide borders on both sides. */
export function TemplateSection({
  children,
  theme = "light",
  className,
  insetClassName,
  withBlueprintGrid = false,
  borderBottom = true,
  noInsetPadding = false,
}: TemplateSectionProps) {
  const dark = theme === "dark";

  return (
    <section
      data-theme={theme}
      className={cn(
        "relative bg-zn-bg",
        dark && "bg-zn-dark text-zn-inv",
        className,
      )}
    >
      {withBlueprintGrid ? <BlueprintGrid /> : null}
      <div className="zn-container-guides relative">
        <div
          className={cn(
            "relative border-x border-zn-border",
            borderBottom && "border-b",
            dark && "border-zn-border-dk",
          )}
        >
          <div
            className={cn(
              !noInsetPadding && "zn-container-inset py-[clamp(3rem,6vw,5rem)]",
              insetClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
