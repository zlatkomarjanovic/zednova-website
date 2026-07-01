"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { scrollToTop } from "@/lib/scroll";
import { Logo } from "@/ui/Logo";

type LogoHomeLinkProps = {
  variant?: "light" | "dark";
  className?: string;
  markClassName?: string;
  onNavigate?: () => void;
};

/** Logo link — navigates home or scrolls to the hero when already on `/`. */
export function LogoHomeLink({
  variant = "dark",
  className,
  markClassName,
  onNavigate,
}: LogoHomeLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    onNavigate?.();
    scrollToTop();
  };

  return (
    <Link
      href="/"
      aria-label="ZedNova Studio home"
      className={className}
      onClick={handleClick}
    >
      <Logo variant={variant} markClassName={markClassName} />
    </Link>
  );
}
