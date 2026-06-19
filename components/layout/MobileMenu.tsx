"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/shared/Button";
import { Icon } from "@/components/shared/Icon";
import type { Industry, Service } from "@/lib/types";

const DIRECT_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function MobileMenu({
  open,
  onClose,
  services,
  industries,
}: {
  open: boolean;
  onClose: () => void;
  services: Service[];
  industries: Industry[];
}) {
  const [section, setSection] = useState<"services" | "industries" | null>(null);

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
            <Logo variant="light" />
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
              title="Services"
              isOpen={section === "services"}
              onToggle={() =>
                setSection(section === "services" ? null : "services")
              }
            >
              <ul className="grid gap-1 pb-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 py-2.5 text-zn-inv-2 transition-colors hover:text-zn-inv"
                    >
                      <Icon name={service.icon} className="size-4" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion
              title="Industries"
              isOpen={section === "industries"}
              onToggle={() =>
                setSection(section === "industries" ? null : "industries")
              }
            >
              <ul className="grid gap-1 pb-2">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 py-2.5 text-zn-inv-2 transition-colors hover:text-zn-inv"
                    >
                      <Icon name={industry.icon} className="size-4" />
                      {industry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>

            {DIRECT_LINKS.map((link) => (
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

          <div className="px-6 pb-10 pt-4">
            <Button
              href="/contact"
              variant="inverted"
              size="lg"
              withArrow
              className="w-full"
              onClick={onClose}
            >
              Start a project
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Accordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-zn-border-dk">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-5 font-sans font-normal text-2xl text-zn-inv"
      >
        {title}
        {isOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
