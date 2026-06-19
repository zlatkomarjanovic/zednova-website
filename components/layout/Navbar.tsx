"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { Button } from "@/components/shared/Button";
import { HoverFlip } from "@/components/shared/HoverFlip";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import type { CaseStudy, Industry, Service, ServiceGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type NavbarProps = {
  serviceGroups: { group: ServiceGroup; services: Service[] }[];
  industries: Industry[];
  featured: CaseStudy | null;
};

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function Navbar({ serviceGroups, industries, featured }: NavbarProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "industries" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const services = serviceGroups.flatMap((g) => g.services);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (openMenu) {
        setHidden(false);
      } else if (y > 100 && y > last + 4) {
        setHidden(true);
      } else if (y < last - 4) {
        setHidden(false);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu]);

  // Invert over sections marked data-theme="dark".
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    const id = requestAnimationFrame(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-theme]"),
      );
      if (!sections.length) {
        setTheme("light");
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTheme(
                entry.target.getAttribute("data-theme") === "dark"
                  ? "dark"
                  : "light",
              );
            }
          });
        },
        {
          rootMargin: `-73px 0px -${Math.max(0, window.innerHeight - 75)}px 0px`,
          threshold: 0,
        },
      );
      sections.forEach((s) => io.observe(s));
      observerRef.current = io;
    });
    return () => {
      cancelAnimationFrame(id);
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  // Close menus on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const openPanel = (menu: "services" | "industries") => {
    cancelClose();
    setOpenMenu(menu);
  };

  const isDark = theme === "dark";

  return (
    <>
      <header
        onMouseLeave={scheduleClose}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out",
          hidden ? "-translate-y-full" : "translate-y-0",
          isDark
            ? "border-zn-border-dk/60 text-zn-inv"
            : "border-zn-border/60 text-zn-text",
          openMenu
            ? isDark
              ? "bg-zn-dark"
              : "bg-zn-bg"
            : scrolled
              ? isDark
                ? "bg-zn-dark/80 backdrop-blur-xl"
                : "bg-zn-bg/80 backdrop-blur-xl"
              : "bg-transparent",
        )}
      >
        <div className="zn-container relative flex h-16 items-center justify-between lg:h-18">
          <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2" />
          <BlueprintCross anchor="right" className="bottom-0 translate-y-1/2" />
          <Link href="/" aria-label="ZedNova Studios home">
            <Logo variant={isDark ? "light" : "dark"} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <MegaTrigger
              label="Services"
              isOpen={openMenu === "services"}
              onEnter={() => openPanel("services")}
              onClick={() =>
                setOpenMenu(openMenu === "services" ? null : "services")
              }
            />
            <MegaTrigger
              label="Industries"
              isOpen={openMenu === "industries"}
              onEnter={() => openPanel("industries")}
              onClick={() =>
                setOpenMenu(openMenu === "industries" ? null : "industries")
              }
            />
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={scheduleClose}
                className="group/flip rounded-[2px] px-3 py-2 text-sm font-medium"
              >
                <HoverFlip>{link.label}</HoverFlip>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button
                href="/contact"
                variant={isDark ? "inverted" : "primary"}
                size="sm"
              >
                Contact
              </Button>
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-[2px] lg:hidden"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            openMenu ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
          onMouseEnter={cancelClose}
        >
          <div className="overflow-hidden">
            {openMenu && (
              <MegaMenu
                type={openMenu}
                serviceGroups={serviceGroups}
                industries={industries}
                featured={featured}
                onNavigate={() => setOpenMenu(null)}
              />
            )}
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        services={services}
        industries={industries}
      />
    </>
  );
}

function MegaTrigger({
  label,
  isOpen,
  onEnter,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  onEnter: () => void;
  onClick: () => void;
}) {
  return (
    <button
      onMouseEnter={onEnter}
      onClick={onClick}
      aria-expanded={isOpen}
      className="group/flip flex items-center gap-1 rounded-[2px] px-3 py-2 text-sm font-medium"
    >
      <HoverFlip>{label}</HoverFlip>
      <ChevronDown
        className={cn(
          "size-3.5 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
}
