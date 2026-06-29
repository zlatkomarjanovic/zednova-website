"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { LogoHomeLink } from "@/ui/LogoHomeLink";
import { Button } from "@/ui/Button";
import type { Migration, NavMenuItem, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import { megaMenuNavLinks } from "@/lib/types/content-nav";
import type { InsightsNavPosts } from "@/lib/queries";
import { ArticleCover } from "@/features/insights/ArticleCover";
import { MigrationPlatformPill } from "@/ui/MigrationPlatformPill";
import { NavMenuIcon } from "@/ui/NavMenuIcon";

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

const mobilePanel = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: { duration: 0.38, ease: MENU_EASE },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.28, ease: MENU_EASE },
  },
};

const mobileNav = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.12 },
  },
};

const mobileNavItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: MENU_EASE },
  },
};

const LINKS_AFTER_INDUSTRIES = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

function formatInsightDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MobileMenu({
  open,
  onClose,
  industryNavItems,
  customSoftwareNavItems,
  migrations,
  serviceMegaMenuCards,
  insightsNavPosts,
}: {
  open: boolean;
  onClose: () => void;
  industryNavItems: NavMenuItem[];
  customSoftwareNavItems: NavMenuItem[];
  migrations: Migration[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  insightsNavPosts: InsightsNavPosts | null;
}) {
  const [section, setSection] = useState<
    "services" | "industries" | "custom-software" | "migrations" | "insights" | null
  >(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setSection(null);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-zn-dark/40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            variants={mobilePanel}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-zn-dark text-zn-inv shadow-2xl lg:hidden"
          >
          <div className="flex h-16 items-center justify-between px-6">
            <LogoHomeLink variant="light" onNavigate={onClose} />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-[2px] border border-zn-border-dk"
            >
              <X className="size-5" />
            </button>
          </div>

          <motion.nav
            variants={mobileNav}
            initial="hidden"
            animate="show"
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-6 py-6"
          >
            <motion.div variants={mobileNavItem}>
            <Accordion
              title={megaMenuNavLinks.services.label}
              href={megaMenuNavLinks.services.href}
              isOpen={section === "services"}
              onToggle={() =>
                setSection(section === "services" ? null : "services")
              }
              onNavigate={onClose}
            >
              <ul className="grid gap-3 pb-2">
                {serviceMegaMenuCards.map((card) => (
                  <li key={card.title}>
                    <Link
                      href={card.href}
                      onClick={onClose}
                      className="block rounded-[2px] border border-zn-border-dk px-4 py-3 transition-colors hover:border-zn-inv"
                    >
                      <span className="block text-sm text-zn-inv">{card.title}</span>
                      <span className="mt-1 hidden text-xs leading-relaxed text-zn-inv-2 sm:block">
                        {card.shortDescription}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>
            </motion.div>

            <motion.div variants={mobileNavItem}>
            <Accordion
              title={megaMenuNavLinks["custom-software"].label}
              href={megaMenuNavLinks["custom-software"].href}
              isOpen={section === "custom-software"}
              onToggle={() =>
                setSection(section === "custom-software" ? null : "custom-software")
              }
              onNavigate={onClose}
            >
              <ul className="grid gap-1 pb-2">
                {customSoftwareNavItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-start gap-3 py-2.5 text-sm text-zn-inv-2 transition-colors hover:text-zn-inv"
                    >
                      {item.icon && (
                        <NavMenuIcon
                          src={item.icon.src}
                          alt={item.icon.alt}
                          theme="dark"
                          className="mt-0.5"
                        />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>
            </motion.div>

            <motion.div variants={mobileNavItem}>
            <Accordion
              title={megaMenuNavLinks.migrations.label}
              href={megaMenuNavLinks.migrations.href}
              isOpen={section === "migrations"}
              onToggle={() =>
                setSection(section === "migrations" ? null : "migrations")
              }
              onNavigate={onClose}
            >
              <ul className="grid gap-1 pb-2">
                {migrations.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/migrations/${item.slug}`}
                      onClick={onClose}
                      className="block py-2.5 text-sm text-zn-inv-2 transition-colors hover:text-zn-inv"
                    >
                      {item.platformIcons && (
                        <MigrationPlatformPill
                          from={item.platformIcons.from}
                          to={item.platformIcons.to}
                          theme="dark"
                          className="mb-2"
                        />
                      )}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>
            </motion.div>

            <motion.div variants={mobileNavItem}>
            <Accordion
              title={megaMenuNavLinks.industries.label}
              href={megaMenuNavLinks.industries.href}
              isOpen={section === "industries"}
              onToggle={() =>
                setSection(section === "industries" ? null : "industries")
              }
              onNavigate={onClose}
            >
              <ul className="grid gap-1 pb-2">
                {industryNavItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-2.5 text-sm text-zn-inv-2 transition-colors hover:text-zn-inv"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>
            </motion.div>

            <motion.div variants={mobileNavItem}>
            <Accordion
              title={megaMenuNavLinks.insights.label}
              href={megaMenuNavLinks.insights.href}
              isOpen={section === "insights"}
              onToggle={() =>
                setSection(section === "insights" ? null : "insights")
              }
              onNavigate={onClose}
            >
              {insightsNavPosts ? (
                <div className="grid gap-4 pb-4">
                  <ul className="grid gap-2">
                    {insightsNavPosts.latest.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/insights/${post.slug}`}
                          onClick={onClose}
                          className="block rounded-[2px] border border-zn-border-dk px-4 py-3 transition-colors hover:border-zn-inv"
                        >
                          <span className="block text-xs uppercase tracking-wide text-zn-inv-2">
                            {post.category}
                          </span>
                          <span className="mt-1 block text-sm text-zn-inv">{post.title}</span>
                          {post.excerpt && (
                            <span className="mt-1.5 block text-xs leading-relaxed text-zn-inv-2 line-clamp-2">
                              {post.excerpt}
                            </span>
                          )}
                          <span className="mt-1 block text-xs text-zn-inv-2">
                            {formatInsightDate(post.publishedAt)} · {post.readTime} min read
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/insights/${insightsNavPosts.featured.slug}`}
                    onClick={onClose}
                    className="block overflow-hidden rounded-[2px] border border-zn-border-dk transition-colors hover:border-zn-inv"
                  >
                    <ArticleCover
                      post={insightsNavPosts.featured}
                      preset="card"
                      className="aspect-[16/10] w-full rounded-none"
                      sizes="100vw"
                    />
                    <div className="px-4 py-3">
                      <span className="block text-xs uppercase tracking-wide text-zn-inv-2">
                        Featured · {insightsNavPosts.featured.category}
                      </span>
                      <span className="mt-1 block text-sm text-zn-inv">
                        {insightsNavPosts.featured.title}
                      </span>
                      {insightsNavPosts.featured.excerpt && (
                        <span className="mt-1.5 block text-xs leading-relaxed text-zn-inv-2 line-clamp-2">
                          {insightsNavPosts.featured.excerpt}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              ) : (
                <p className="pb-4 text-sm text-zn-inv-2">No articles yet.</p>
              )}
            </Accordion>
            </motion.div>

            {LINKS_AFTER_INDUSTRIES.map((link) => (
              <motion.div key={link.href} variants={mobileNavItem}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block border-b border-zn-border-dk py-5 font-sans font-normal text-2xl text-zn-inv"
              >
                {link.label}
              </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="border-t border-zn-border-dk px-6 py-6">
            <Button href="/contact" variant="inverted" size="md" className="w-full" onClick={onClose}>
              Tell us what you need
            </Button>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Accordion({
  title,
  href,
  isOpen,
  onToggle,
  onNavigate,
  children,
}: {
  title: string;
  href: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-zn-border-dk">
      <div className="flex items-center justify-between py-5">
        <Link
          href={href}
          onClick={onNavigate}
          className="font-sans text-2xl font-normal text-zn-inv"
        >
          {title}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={`Expand ${title} menu`}
          className="flex size-10 items-center justify-center"
        >
          {isOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
