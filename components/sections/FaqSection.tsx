"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
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
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-zn-bg md:px-7 md:py-6"
      >
        <span className="font-sans text-[0.95rem] leading-snug text-zn-text md:text-base">
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
      className="relative zn-section overflow-hidden zn-sage-surface"
    >
      <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
      <BlueprintGrid />

      <div className="zn-container relative grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <SectionLabel withRule={false}>FAQ</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-md zn-h2 font-sans font-normal">
              Answers before you reach out
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="zn-prose mt-5 max-w-sm">
              The questions we hear on almost every first call — scope, timeline,
              ownership, and how we work with your existing stack.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="overflow-hidden border border-zn-border bg-zn-bg-2">
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
        </Reveal>
      </div>
    </section>
  );
}
