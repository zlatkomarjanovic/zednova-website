import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverFlip } from "@/ui/HoverFlip";

type Variant =
  | "primary" // dark fill, light text (light sections)
  | "inverted" // light fill, dark text (dark sections)
  | "outline" // bordered (light sections)
  | "outline-inverted" // bordered (dark sections)
  | "link"; // text link with subtle underline

type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "bg-zn-text text-zn-inv hover:bg-zn-text/90 rounded-[2px]",
  inverted: "bg-zn-inv text-zn-text hover:bg-white rounded-[2px]",
  outline:
    "border border-zn-border text-zn-text hover:border-zn-text hover:bg-zn-bg-2 rounded-[2px]",
  "outline-inverted":
    "border border-zn-border-dk text-zn-inv hover:border-zn-inv hover:bg-zn-dark-2 rounded-[2px]",
  link: "text-current p-0 h-auto",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

const ARROW_FLIP =
  "block size-4 transition-[translate,opacity] duration-500 ease-[var(--ease-flip)] will-change-[translate,opacity] motion-reduce:transition-none";

function FlipArrow({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="relative inline-block size-4 shrink-0 overflow-hidden align-middle">
      <Icon
        className={cn(ARROW_FLIP, "group-hover/flip:translate-x-full")}
        strokeWidth={2}
        aria-hidden="true"
      />
      <Icon
        className={cn(
          ARROW_FLIP,
          "absolute inset-0 -translate-x-full group-hover/flip:translate-x-0 motion-reduce:hidden",
        )}
        strokeWidth={2}
        aria-hidden="true"
      />
    </span>
  );
}

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    withArrow,
    className,
    ...rest
  } = props;

  const isLink = variant === "link";
  const base = cn(
    "group/flip inline-flex items-center justify-center gap-2 font-medium leading-none tracking-tight transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2",
    !isLink && SIZE[size],
    VARIANT[variant],
    className,
  );

  const external = "href" in props && props.href?.startsWith("http");
  const Arrow = isLink || external ? ArrowUpRight : ArrowRight;

  const inner = (
    <>
      <HoverFlip>{children}</HoverFlip>
      {withArrow && <FlipArrow Icon={Arrow} />}
    </>
  );

  let el: React.ReactNode;
  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    el = external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        {...anchorRest}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={base} {...anchorRest}>
        {inner}
      </Link>
    );
  } else {
    el = (
      <button className={base} {...(rest as ButtonAsButton)}>
        {inner}
      </button>
    );
  }

  return el;
}
