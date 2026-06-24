"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import {
  AI_SUMMARY_PROMPT,
  AI_SUMMARY_FAB_GAP_REM,
  AI_SUMMARY_TRIGGER_ID,
  aiSummaryFabModels,
  summarizeWithLabel,
  type AiSummaryModel,
} from "@/lib/content/ai-summary-models";
import { cn } from "@/lib/utils";

function AiFabTooltip({
  label,
  visible,
}: {
  label: string;
  visible: boolean;
}) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2",
        "whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[0.8125rem] text-zn-text",
        "border border-zn-border/80 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.12)]",
        "transition-[opacity,transform] duration-150 ease-out",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-1 opacity-0",
      )}
    >
      {label}
      <span
        className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-zn-border/80 bg-white"
        aria-hidden="true"
      />
    </span>
  );
}

function AiFabLogo({ model }: { model: AiSummaryModel }) {
  return (
    <Image
      src={model.logo}
      alt=""
      width={20}
      height={20}
      className={cn("size-5 object-contain", model.logoClassName)}
      unoptimized
    />
  );
}

function AiFabButton({
  model,
  stackIndex,
  isTrigger,
  open,
  tooltipVisible,
  stackRef,
  onHover,
}: {
  model: AiSummaryModel;
  stackIndex: number;
  isTrigger: boolean;
  open: boolean;
  tooltipVisible: boolean;
  stackRef: React.RefObject<HTMLDivElement | null>;
  onHover: (id: string) => void;
}) {
  const url = model.buildUrl(AI_SUMMARY_PROMPT);
  const label = summarizeWithLabel(model.name);

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) => {
    const related = e.relatedTarget as Node | null;
    if (stackRef.current?.contains(related)) return;
    onHover("");
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => onHover(model.id)}
      onMouseLeave={handleLeave}
      onFocus={() => onHover(model.id)}
      onBlur={handleLeave}
      style={
        {
          "--fab-index": stackIndex,
          zIndex: isTrigger ? 20 : stackIndex + 1,
          transform: open
            ? `translateY(calc(var(--fab-index) * -1 * var(--fab-gap)))`
            : "translateY(0)",
          opacity: open || isTrigger ? 1 : 0,
          transitionDelay: open ? `${stackIndex * 45}ms` : "0ms",
        } as React.CSSProperties
      }
      className={cn(
        "absolute bottom-0 right-0 flex size-11 items-center justify-center rounded-full",
        "border border-zn-border/70 bg-white",
        "transition-[transform,opacity] duration-[380ms] ease-[var(--ease-zn)]",
        "hover:border-zn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zn-text",
        open || isTrigger ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <AiFabTooltip label={label} visible={tooltipVisible} />
      <AiFabLogo model={model} />
    </a>
  );
}

export function AiSummaryFab() {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const count = aiSummaryFabModels.length;

  const handleEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setHoveredId("");
    }, 120);
  }, []);

  const stackHeight = `calc(2.75rem + ${(count - 1) * AI_SUMMARY_FAB_GAP_REM}rem)`;

  return (
    <div
      className="fixed bottom-6 right-3 z-[60] sm:bottom-8 sm:right-5"
      aria-label="Ask AI to summarize this site"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        ref={stackRef}
        className="relative w-11 transition-[height] duration-[380ms] ease-[var(--ease-zn)]"
        style={
          {
            height: open ? stackHeight : "2.75rem",
            "--fab-gap": `${AI_SUMMARY_FAB_GAP_REM}rem`,
          } as React.CSSProperties
        }
      >
        {aiSummaryFabModels.map((model, index) => {
          const isTrigger = model.id === AI_SUMMARY_TRIGGER_ID;

          return (
            <AiFabButton
              key={model.id}
              model={model}
              stackIndex={index}
              isTrigger={isTrigger}
              open={open}
              tooltipVisible={hoveredId === model.id}
              stackRef={stackRef}
              onHover={setHoveredId}
            />
          );
        })}
      </div>
    </div>
  );
}
