"use client";

import Link from "next/link";

import { HoverFlip } from "@/ui/HoverFlip";

export function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        aria-label={label}
        className="group/flip inline-block text-sm leading-snug text-zn-inv-2 transition-colors hover:text-zn-inv"
      >
        <HoverFlip decorative>{label}</HoverFlip>
      </Link>
    </li>
  );
}
