import { cn } from "@/lib/utils";

/**
 * Eyebrow label: a short rule + uppercase text. Inherits color from a parent
 * (pass a text color class) so it works on both light and dark sections.
 */
export function SectionLabel({
  children,
  className,
  withRule = false,
}: {
  children: React.ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-zn-text-3", className)}>
      {withRule && (
        <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
      )}
      <span className="zn-label">{children}</span>
    </span>
  );
}
