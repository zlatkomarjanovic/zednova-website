"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  AI_SUMMARY_FAB_GAP_REM,
  AI_SUMMARY_TRIGGER_ID,
  aiSummaryFabModels,
  buildAiSummaryPrompt,
  summarizeWithLabel,
  type AiSummaryModel,
} from "@/lib/content/ai-summary-models";
import { useAiSummaryPage } from "@/lib/use-ai-summary-page";
import { cn } from "@/lib/utils";

function useTouchUi() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouch;
}

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
  pageUrl,
  pageTitle,
  isTouch,
  onExpand,
}: {
  model: AiSummaryModel;
  stackIndex: number;
  isTrigger: boolean;
  open: boolean;
  tooltipVisible: boolean;
  stackRef: React.RefObject<HTMLDivElement | null>;
  onHover: (id: string) => void;
  pageUrl: string;
  pageTitle: string;
  isTouch: boolean;
  onExpand: () => void;
}) {
  const url = model.buildUrl(buildAiSummaryPrompt(model.id, pageUrl, pageTitle));
  const label = summarizeWithLabel(model.name);
  const expandOnly = isTouch && isTrigger && !open;

  const handleLeave = (
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>,
  ) => {
    const related = e.relatedTarget;
    if (related instanceof Node && stackRef.current?.contains(related)) return;
    onHover("");
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isTouch) return;

    if (expandOnly) {
      e.preventDefault();
      e.stopPropagation();
      onExpand();
      return;
    }

    if (!open && !isTrigger) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={expandOnly ? "Show AI summary options" : label}
      aria-expanded={isTrigger ? open : undefined}
      onClick={handleClick}
      onMouseEnter={() => !isTouch && onHover(model.id)}
      onMouseLeave={handleLeave}
      onFocus={() => !isTouch && onHover(model.id)}
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
      <AiFabTooltip label={label} visible={!isTouch && tooltipVisible} />
      <AiFabLogo model={model} />
    </a>
  );
}

export function AiSummaryFab() {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = aiSummaryFabModels.length;
  const { pageUrl, pageTitle } = useAiSummaryPage();
  const isTouch = useTouchUi();

  const handleEnter = useCallback(() => {
    if (isTouch) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, [isTouch]);

  const handleLeave = useCallback(() => {
    if (isTouch) return;
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setHoveredId("");
    }, 120);
  }, [isTouch]);

  const handleExpand = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!isTouch || !open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || rootRef.current?.contains(target)) return;
      setOpen(false);
      setHoveredId("");
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isTouch, open]);

  const stackHeight = `calc(2.75rem + ${(count - 1) * AI_SUMMARY_FAB_GAP_REM}rem)`;

  return (
    <div
      ref={rootRef}
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
              pageUrl={pageUrl}
              pageTitle={pageTitle}
              isTouch={isTouch}
              onExpand={handleExpand}
            />
          );
        })}
      </div>
    </div>
  );
}
