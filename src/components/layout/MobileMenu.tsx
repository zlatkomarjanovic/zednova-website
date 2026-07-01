"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/ui/Button";
import type { NavMenuItem, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import { megaMenuNavLinks } from "@/lib/types/content-nav";
import type { InsightsNavPosts } from "@/lib/queries";
import { ArticleCover } from "@/features/insights/ArticleCover";
import { cn } from "@/lib/utils";

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

export const mobileNavStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
};

export const mobileNavItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: MENU_EASE },
  },
};

const MOBILE_NAV_MAIN = "text-[1.1rem] font-normal leading-snug";
const MOBILE_NAV_SUB = "text-xs leading-snug";

const PLAIN_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

function formatInsightDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MobileNavPanel({
  onClose,
  industryNavItems,
  serviceMegaMenuCards,
  insightsNavPosts,
}: {
  onClose: () => void;
  industryNavItems: NavMenuItem[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  insightsNavPosts: InsightsNavPosts | null;
}) {
  const [section, setSection] = useState<
    "services" | "industries" | "insights" | null
  >(null);

  useEffect(() => {
    return () => setSection(null);
  }, []);

  return (
    <>
      <motion.nav
        variants={mobileNavStagger}
        initial="hidden"
        animate="show"
        aria-label="Mobile"
        className="min-h-0 flex-1 overflow-y-auto px-5 pb-4"
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
                    className="block rounded-[2px] border border-zn-border-dk px-3 py-2.5 transition-colors hover:border-zn-inv"
                  >
                    <span className={cn("block text-zn-inv", MOBILE_NAV_SUB)}>
                      {card.title}
                    </span>
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
                    className="block py-2 text-zn-inv-2 transition-colors hover:text-zn-inv"
                  >
                    <span className={MOBILE_NAV_SUB}>{item.title}</span>
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
                        <span className="mt-1 block text-sm text-zn-inv">
                          {post.title}
                        </span>
                        {post.excerpt && (
                          <span className="mt-1.5 block text-xs leading-relaxed text-zn-inv-2 line-clamp-2">
                            {post.excerpt}
                          </span>
                        )}
                        <span className="mt-1 block text-xs text-zn-inv-2">
                          {formatInsightDate(post.publishedAt)} · {post.readTime}{" "}
                          min read
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

        {PLAIN_LINKS.map((link) => (
          <motion.div key={link.href} variants={mobileNavItem}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block border-b border-zn-border-dk py-4 font-sans text-zn-inv"
            >
              <span className={MOBILE_NAV_MAIN}>{link.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      <motion.div
        variants={mobileNavItem}
        initial="hidden"
        animate="show"
        className="shrink-0 border-t border-zn-border-dk px-5 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
      >
        <Button
          href="/contact"
          variant="inverted"
          size="md"
          className="w-full"
          onClick={onClose}
        >
          Tell us what you need
        </Button>
      </motion.div>
    </>
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
      <div className="flex items-center justify-between py-3.5">
        <Link
          href={href}
          onClick={onNavigate}
          className={cn("font-sans text-zn-inv", MOBILE_NAV_MAIN)}
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
            transition={{ duration: 0.36, ease: MENU_EASE }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
