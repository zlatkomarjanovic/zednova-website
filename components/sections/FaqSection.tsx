"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { SectionLabel } from "@/components/shared/SectionLabel";
import type { FaqItem } from "@/lib/content/faq";
import { cn } from "@/lib/utils";

function FaqAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full min-w-0 items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-zn-bg md:px-7 md:py-5"
      >
        <span className="min-w-0 font-sans text-[0.95rem] leading-snug text-zn-text md:text-base">
          {item.question}
        </span>
        <span className="mt-0.5 shrink-0 text-zn-text-3" aria-hidden="true">
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="zn-prose px-6 pb-5 md:px-7 md:pb-6">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? "");

  return (
    <section
      data-theme="light"
      className="relative zn-section zn-sage-surface"
    >
      <div className="zn-sage-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <BlueprintGrid />

      <div className="zn-container relative min-w-0">
        <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <SectionLabel withRule={false}>FAQ</SectionLabel>
            <h2 className="mt-6 max-w-[25rem] zn-h2 font-sans font-normal">
              Answers before you reach out
            </h2>
            <p className="zn-prose mt-5 max-w-[25rem]">
              Websites, Shopify, automations, migrations, AI tools, pricing,
              ownership, and support — the questions we hear most before a
              project starts.
            </p>
          </aside>

          <div className="min-w-0">
            <div className="min-w-0 overflow-hidden border border-zn-border bg-zn-bg-2">
              <div className="divide-y divide-zn-border">
                {faqs.map((item) => (
                  <FaqAccordionItem
                    key={item.id}
                    item={item}
                    open={openId === item.id}
                    onToggle={() =>
                      setOpenId((current) => (current === item.id ? "" : item.id))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
