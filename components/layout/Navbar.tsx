"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { BlueprintCross } from "@/components/shared/BlueprintCross";
import { Button } from "@/components/shared/Button";
import { HoverFlip } from "@/components/shared/HoverFlip";
import {
  RubberHoverHighlightLayer,
  useRubberHoverHighlight,
} from "@/components/shared/HoverHighlight";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import type { Migration } from "@/lib/content/migrations";
import type { NavMenuItem } from "@/lib/content/nav-menu";
import { megaMenuNavLinks } from "@/lib/content/nav-menu";
import { cn } from "@/lib/utils";

type NavbarProps = {
  industryNavItems: NavMenuItem[];
  customSoftwareNavItems: NavMenuItem[];
  migrations: Migration[];
};

type MegaMenuType = "services" | "industries" | "custom-software" | "migrations";

const MENU_ORDER: MegaMenuType[] = [
  "services",
  "industries",
  "custom-software",
  "migrations",
];

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/resources" },
];

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

const NAV_HIGHLIGHT_LIGHT_FILL = "var(--color-zn-bg-3)";
const NAV_HIGHLIGHT_LIGHT_FILL_OPACITY = 0.75;
const NAV_HIGHLIGHT_DARK_FILL = "var(--color-zn-dark-2)";
const NAV_HIGHLIGHT_DARK_FILL_OPACITY = 0.9;

const panelSlide = {
  initial: (direction: number) => ({
    x: direction === 0 ? "0%" : direction > 0 ? "100%" : "-100%",
    opacity: direction === 0 ? 1 : 0,
  }),
  animate: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.48, ease: MENU_EASE },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : direction < 0 ? "100%" : "0%",
    opacity: 0,
    transition: { duration: 0.44, ease: MENU_EASE },
  }),
};

function MegaMenuShell({
  openMenu,
  slideDirection,
  shellHeight,
  onHeightChange,
  children,
}: {
  openMenu: MegaMenuType;
  slideDirection: number;
  shellHeight: number;
  onHeightChange: (height: number) => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    onHeightChange(el.offsetHeight);
  }, [onHeightChange]);

  useLayoutEffect(() => {
    measure();
    const el = panelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [openMenu, measure]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: shellHeight > 0 ? shellHeight : undefined }}
    >
      <AnimatePresence initial={false} custom={slideDirection}>
        <motion.div
          key={openMenu}
          ref={panelRef}
          custom={slideDirection}
          variants={panelSlide}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-x-0 top-0 w-full will-change-transform"
          onAnimationComplete={measure}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Navbar({
  industryNavItems,
  customSoftwareNavItems,
  migrations,
}: NavbarProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuType | null>(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const [panelHeight, setPanelHeight] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navHighlight = useRubberHoverHighlight<HTMLElement>({
    bendScale: 0.45,
    cornerRadius: 4,
  });

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

  useEffect(() => {
    setOpenMenu(null);
    setSlideDirection(0);
    setPanelHeight(0);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSlideDirection(0);
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closePanel = useCallback(() => {
    setSlideDirection(0);
    setOpenMenu(null);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(closePanel, 140);
  }, [closePanel]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const openPanel = (menu: MegaMenuType) => {
    cancelClose();
    if (openMenu) {
      const currentIndex = MENU_ORDER.indexOf(openMenu);
      const nextIndex = MENU_ORDER.indexOf(menu);
      if (nextIndex > currentIndex) setSlideDirection(1);
      else if (nextIndex < currentIndex) setSlideDirection(-1);
      else setSlideDirection(0);
    } else {
      setSlideDirection(0);
    }
    setOpenMenu(menu);
  };

  const togglePanel = (menu: MegaMenuType) => {
    cancelClose();
    if (openMenu === menu) {
      closePanel();
      return;
    }
    openPanel(menu);
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

          <nav
            ref={navHighlight.rootRef}
            aria-label="Main"
            className="relative hidden items-center gap-0.5 lg:flex"
            {...navHighlight.pointerHandlers}
          >
            <RubberHoverHighlightLayer
              pathD={navHighlight.pathD}
              opacity={navHighlight.opacity}
              fill={isDark ? NAV_HIGHLIGHT_DARK_FILL : NAV_HIGHLIGHT_LIGHT_FILL}
              fillOpacity={
                isDark ? NAV_HIGHLIGHT_DARK_FILL_OPACITY : NAV_HIGHLIGHT_LIGHT_FILL_OPACITY
              }
            />

            <MegaTrigger
              label={megaMenuNavLinks.services.label}
              href={megaMenuNavLinks.services.href}
              isOpen={openMenu === "services"}
              onEnter={() => openPanel("services")}
              onToggle={() => togglePanel("services")}
              onHighlight={navHighlight.snapTo}
            />
            <MegaTrigger
              label={megaMenuNavLinks.industries.label}
              href={megaMenuNavLinks.industries.href}
              isOpen={openMenu === "industries"}
              onEnter={() => openPanel("industries")}
              onToggle={() => togglePanel("industries")}
              onHighlight={navHighlight.snapTo}
            />
            <MegaTrigger
              label={megaMenuNavLinks["custom-software"].label}
              href={megaMenuNavLinks["custom-software"].href}
              isOpen={openMenu === "custom-software"}
              onEnter={() => openPanel("custom-software")}
              onToggle={() => togglePanel("custom-software")}
              onHighlight={navHighlight.snapTo}
            />
            <MegaTrigger
              label={megaMenuNavLinks.migrations.label}
              href={megaMenuNavLinks.migrations.href}
              isOpen={openMenu === "migrations"}
              onEnter={() => openPanel("migrations")}
              onToggle={() => togglePanel("migrations")}
              onHighlight={navHighlight.snapTo}
            />
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-hover-cell
                onMouseEnter={(e) => {
                  scheduleClose();
                  navHighlight.snapTo(e.currentTarget);
                }}
                className="group/flip relative z-[1] rounded-[4px] px-3 py-2 text-sm font-normal"
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
                Tell us what you need
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

        <AnimatePresence
          initial={false}
          onExitComplete={() => {
            setSlideDirection(0);
            setPanelHeight(0);
          }}
        >
          {openMenu && (
            <motion.div
              key="mega-shell"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: panelHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.44, ease: MENU_EASE }}
              className="overflow-hidden"
              onMouseEnter={cancelClose}
            >
              <MegaMenuShell
                openMenu={openMenu}
                slideDirection={slideDirection}
                shellHeight={panelHeight}
                onHeightChange={setPanelHeight}
              >
                <MegaMenu
                  type={openMenu}
                  industryNavItems={industryNavItems}
                  customSoftwareNavItems={customSoftwareNavItems}
                  migrations={migrations}
                  theme={isDark ? "dark" : "light"}
                  onNavigate={closePanel}
                />
              </MegaMenuShell>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        industryNavItems={industryNavItems}
        customSoftwareNavItems={customSoftwareNavItems}
        migrations={migrations}
      />
    </>
  );
}

function MegaTrigger({
  label,
  href,
  isOpen,
  onEnter,
  onToggle,
  onHighlight,
}: {
  label: string;
  href: string;
  isOpen: boolean;
  onEnter: () => void;
  onToggle: () => void;
  onHighlight: (target: HTMLElement) => void;
}) {
  return (
    <div
      data-hover-cell
      onMouseEnter={(e) => {
        onEnter();
        onHighlight(e.currentTarget);
      }}
      className="relative z-[1] flex items-center rounded-[4px] text-sm font-normal"
    >
      <Link href={href} className="group/flip px-3 py-2">
        <HoverFlip>{label}</HoverFlip>
      </Link>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`Open ${label} menu`}
        className="px-1.5 py-2"
      >
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
    </div>
  );
}
