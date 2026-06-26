"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { LogoHomeLink } from "@/ui/LogoHomeLink";
import { Button } from "@/ui/Button";
import type { Migration, NavMenuItem, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import { megaMenuNavLinks } from "@/lib/types/content-nav";
import { MigrationPlatformPill } from "@/ui/MigrationPlatformPill";
import { NavMenuIcon } from "@/ui/NavMenuIcon";

const LINKS_BEFORE_ABOUT = [{ label: "Work", href: "/work" }];

const LINKS_AFTER_INDUSTRIES = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function MobileMenu({
  open,
  onClose,
  industryNavItems,
  customSoftwareNavItems,
  migrations,
  serviceMegaMenuCards,
}: {
  open: boolean;
  onClose: () => void;
  industryNavItems: NavMenuItem[];
  customSoftwareNavItems: NavMenuItem[];
  migrations: Migration[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
}) {
  const [section, setSection] = useState<
    "services" | "industries" | "custom-software" | "migrations" | null
  >(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-zn-dark text-zn-inv lg:hidden"
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

          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-6 py-6"
          >
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
                      <span className="mt-1 block text-xs leading-relaxed text-zn-inv-2">
                        {card.shortDescription}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>

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

            {LINKS_BEFORE_ABOUT.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block border-b border-zn-border-dk py-5 font-sans font-normal text-2xl text-zn-inv"
              >
                {link.label}
              </Link>
            ))}

            {LINKS_AFTER_INDUSTRIES.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block border-b border-zn-border-dk py-5 font-sans font-normal text-2xl text-zn-inv"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-zn-border-dk px-6 py-6">
            <Button href="/contact" variant="inverted" size="md" className="w-full">
              Tell us what you need
            </Button>
          </div>
        </motion.div>
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
