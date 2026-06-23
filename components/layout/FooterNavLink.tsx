"use client";

import Link from "next/link";

import { HoverFlip } from "@/components/shared/HoverFlip";

export function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group/flip inline-block text-sm leading-snug text-zn-inv-2 transition-colors hover:text-zn-inv"
      >
        <HoverFlip>{label}</HoverFlip>
      </Link>
    </li>
  );
}
