import { cn } from "@/lib/utils";

type TagVariant = "light" | "dark" | "outline" | "outline-inverted";

const VARIANTS: Record<TagVariant, string> = {
  light: "bg-zn-bg-2 text-zn-text-2 border border-transparent",
  dark: "bg-zn-dark-2 text-zn-inv-2 border border-transparent",
  outline: "border border-zn-border text-zn-text-2",
  "outline-inverted": "border border-zn-border-dk text-zn-inv-2",
};

export function Tag({
  children,
  variant = "light",
  className,
}: {
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
