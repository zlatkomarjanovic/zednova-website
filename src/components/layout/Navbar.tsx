"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { LogoHomeLink } from "@/ui/LogoHomeLink";
import { BlueprintCross } from "@/ui/BlueprintCross";
import { Button } from "@/ui/Button";
import { HoverFlip } from "@/ui/HoverFlip";
import {
  RubberHoverHighlightLayer,
  useRubberHoverHighlight,
} from "@/ui/HoverHighlight";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNavPanel } from "@/components/layout/MobileMenu";
import type { NavMenuItem, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import { megaMenuNavLinks } from "@/lib/types/content-nav";
import type { InsightsNavPosts } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { NAVBAR_SCROLL_EVENT } from "@/lib/navbar-scroll";

function resolveNavbarTheme(probeY: number): "light" | "dark" {
  const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
  let match: HTMLElement | null = null;
  let matchTop = -Infinity;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom > probeY && rect.top > matchTop) {
      matchTop = rect.top;
      match = section;
    }
  }

  if (!match) return "light";
  return match.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

type NavbarProps = {
  industryNavItems: NavMenuItem[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  insightsNavPosts: InsightsNavPosts | null;
};

type MegaMenuType = "services" | "industries" | "insights";

const MENU_ORDER: MegaMenuType[] = [
  "services",
  "industries",
  "insights",
];

const LINKS_AFTER_INDUSTRIES = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const MENU_EASE = [0.22, 1, 0.36, 1] as const;
const MENU_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const NAV_HIGHLIGHT_LIGHT_FILL = "var(--color-zn-bg-3)";
const NAV_HIGHLIGHT_LIGHT_FILL_OPACITY = 0.75;
const NAV_HIGHLIGHT_DARK_FILL = "var(--color-zn-dark-2)";
const NAV_HIGHLIGHT_DARK_FILL_OPACITY = 0.9;

const panelFade = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: MENU_EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.28, ease: MENU_EASE },
  },
};

function MegaMenuPanel({
  menu,
  slideDirection,
  children,
}: {
  menu: MegaMenuType;
  slideDirection: number;
  children: React.ReactNode;
}) {
  const panelVariants = {
    initial: {
      opacity: 0,
      x: slideDirection === 0 ? 0 : slideDirection > 0 ? 48 : -48,
      y: slideDirection === 0 ? -8 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.38, ease: MENU_EASE },
    },
    exit: {
      opacity: 0,
      x: slideDirection === 0 ? 0 : slideDirection > 0 ? -48 : 48,
      y: slideDirection === 0 ? -6 : 0,
      transition: { duration: 0.28, ease: MENU_EASE },
    },
  };

  return (
    <AnimatePresence initial={false} mode="popLayout" custom={slideDirection}>
      <motion.div
        key={menu}
        custom={slideDirection}
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full will-change-[transform,opacity]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function Navbar({
  industryNavItems,
  serviceMegaMenuCards,
  insightsNavPosts,
}: NavbarProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuType | null>(null);
  const [renderMenu, setRenderMenu] = useState<MegaMenuType | null>(null);
  const [megaExpanded, setMegaExpanded] = useState(false);
  const [megaPanelVisible, setMegaPanelVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandRaf = useRef<number | null>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const navHighlight = useRubberHoverHighlight<HTMLElement>({
    bendScale: 0.45,
    cornerRadius: 4,
  });

  const clearExpandRaf = useCallback(() => {
    if (expandRaf.current !== null) {
      cancelAnimationFrame(expandRaf.current);
      expandRaf.current = null;
    }
  }, []);

  const beginMegaExpand = useCallback(() => {
    clearExpandRaf();
    setMegaExpanded(false);
    expandRaf.current = requestAnimationFrame(() => {
      expandRaf.current = requestAnimationFrame(() => {
        setMegaExpanded(true);
        expandRaf.current = null;
      });
    });
  }, [clearExpandRaf]);

  const finishMegaPanelClose = useCallback(() => {
    setRenderMenu(null);
    setMegaPanelVisible(false);
    setSlideDirection(0);
  }, []);

  useEffect(() => {
    return () => clearExpandRaf();
  }, [clearExpandRaf]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (openMenu || mobileOpen) {
        setHidden(false);
      } else if (y > 100 && y > last + 10) {
        setHidden(true);
      } else if (y < last - 10) {
        setHidden(false);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu, mobileOpen]);

  useEffect(() => {
    clearExpandRaf();
    setOpenMenu(null);
    setRenderMenu(null);
    setMegaExpanded(false);
    setMegaPanelVisible(false);
    setSlideDirection(0);
    setMobileOpen(false);

    let raf = 0;
    const updateTheme = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const bar = navBarRef.current?.getBoundingClientRect();
        const probeY = bar ? bar.top + bar.height * 0.5 : 32;
        setTheme(resolveNavbarTheme(probeY));
      });
    };

    updateTheme();
    const delayed = window.setTimeout(updateTheme, 150);

    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener(NAVBAR_SCROLL_EVENT, updateTheme);
    window.addEventListener("resize", updateTheme);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(delayed);
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener(NAVBAR_SCROLL_EVENT, updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, [pathname, clearExpandRaf]);

  const closePanel = useCallback(() => {
    setSlideDirection(0);
    setOpenMenu(null);
    setMegaExpanded(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) closePanel();
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu, mobileOpen, closePanel]);

  useEffect(() => {
    if (!mobileOpen) return;
    setHidden(false);
    setSlideDirection(0);
    setMegaExpanded(false);
    setOpenMenu(null);
    setRenderMenu(null);
    setMegaPanelVisible(false);
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((open) => {
      if (!open) {
        setSlideDirection(0);
        closePanel();
      }
      return !open;
    });
  }, [closePanel]);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(closePanel, 220);
  }, [closePanel]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const openPanel = (menu: MegaMenuType) => {
    cancelClose();
    const wasOpen = openMenu !== null;

    if (wasOpen && openMenu) {
      const currentIndex = MENU_ORDER.indexOf(openMenu);
      const nextIndex = MENU_ORDER.indexOf(menu);
      if (nextIndex > currentIndex) setSlideDirection(1);
      else if (nextIndex < currentIndex) setSlideDirection(-1);
      else setSlideDirection(0);
    } else {
      setSlideDirection(0);
    }

    setRenderMenu(menu);
    setOpenMenu(menu);
    setMegaPanelVisible(true);

    if (!wasOpen) {
      beginMegaExpand();
    }
  };

  const togglePanel = (menu: MegaMenuType) => {
    cancelClose();
    if (openMenu === menu) {
      closePanel();
      return;
    }
    openPanel(menu);
  };

  const handleMegaTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "grid-template-rows") return;
    if (!megaExpanded && !openMenu) {
      finishMegaPanelClose();
    }
  };

  const isDark = mobileOpen ? true : theme === "dark";

  return (
    <>
      <motion.header
        onMouseLeave={scheduleClose}
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex flex-col border-b max-lg:overflow-hidden will-change-transform",
          (openMenu || megaPanelVisible || mobileOpen) && "z-[80]",
          mobileOpen
            ? "max-lg:max-h-[100dvh] max-lg:bg-zn-dark max-lg:text-zn-inv max-lg:border-zn-border-dk"
            : "max-lg:max-h-[calc(4.5rem+env(safe-area-inset-top,0px))]",
          "transition-[background-color,border-color,max-height] duration-[400ms] ease-out",
          isDark
            ? "border-zn-border-dk/60 text-zn-inv"
            : "border-zn-border/60 text-zn-text",
          !mobileOpen &&
            (megaPanelVisible
              ? isDark
                ? "bg-zn-dark"
                : "bg-zn-bg"
              : scrolled
                ? isDark
                  ? "bg-zn-dark/80 backdrop-blur-xl"
                  : "bg-zn-bg/80 backdrop-blur-xl"
                : "bg-transparent"),
        )}
      >
        <div
          ref={navBarRef}
          className="zn-container relative flex h-16 shrink-0 items-center justify-between pt-[env(safe-area-inset-top,0px)] lg:h-18"
        >
          <BlueprintCross anchor="left" className="bottom-0 translate-y-1/2 max-lg:hidden" />
          <BlueprintCross anchor="right" className="bottom-0 translate-y-1/2 max-lg:hidden" />
          <LogoHomeLink
            variant={isDark ? "light" : "dark"}
            onNavigate={mobileOpen ? closeMobile : undefined}
          />

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
              label={megaMenuNavLinks.insights.label}
              href={megaMenuNavLinks.insights.href}
              isOpen={openMenu === "insights"}
              onEnter={() => openPanel("insights")}
              onToggle={() => togglePanel("insights")}
              onHighlight={navHighlight.snapTo}
            />
            {LINKS_AFTER_INDUSTRIES.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                data-hover-cell
                onMouseEnter={(e) => {
                  scheduleClose();
                  navHighlight.snapTo(e.currentTarget);
                }}
                className="group/flip relative z-[1] rounded-[4px] px-3 py-2 text-sm font-normal"
              >
                <HoverFlip decorative>{link.label}</HoverFlip>
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
              type="button"
              onClick={toggleMobile}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={cn(
                "flex size-10 items-center justify-center rounded-[2px] transition-colors lg:hidden",
                mobileOpen && "border border-zn-border-dk",
              )}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              key="mobile-panel"
              variants={panelFade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex min-h-0 flex-1 flex-col lg:hidden"
            >
              <MobileNavPanel
                onClose={closeMobile}
                industryNavItems={industryNavItems}
                serviceMegaMenuCards={serviceMegaMenuCards}
                insightsNavPosts={insightsNavPosts}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {renderMenu && !mobileOpen && (
          <div
            onTransitionEnd={handleMegaTransitionEnd}
            onMouseEnter={cancelClose}
            className={cn(
              "hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 lg:grid",
              megaExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
            style={{ transitionTimingFunction: MENU_EASE_CSS }}
          >
            <div className="min-h-0 overflow-hidden">
              <MegaMenuPanel menu={renderMenu} slideDirection={slideDirection}>
                <MegaMenu
                  type={renderMenu}
                  industryNavItems={industryNavItems}
                  serviceMegaMenuCards={serviceMegaMenuCards}
                  insightsNavPosts={insightsNavPosts}
                  theme={isDark ? "dark" : "light"}
                  onNavigate={closePanel}
                />
              </MegaMenuPanel>
            </div>
          </div>
        )}
      </motion.header>
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
      <Link href={href} aria-label={label} className="group/flip px-3 py-2">
        <HoverFlip decorative>{label}</HoverFlip>
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
            "size-3.5 transition-transform duration-300 ease-out",
            isOpen && "rotate-180",
          )}
        />
      </button>
    </div>
  );
}
