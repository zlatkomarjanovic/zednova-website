"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { ArticleFaq } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ArticleFaqAccordion({ faqs }: { faqs: ArticleFaq[] }) {
  const [openId, setOpenId] = useState<string>(faqs[0]?.id ?? "");

  return (
    <div className="divide-y divide-zn-border">
      {faqs.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() =>
                setOpenId((current) => (current === item.id ? "" : item.id ?? ""))
              }
              aria-expanded={open}
              className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-zn-bg md:px-7"
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
      })}
    </div>
  );
}
