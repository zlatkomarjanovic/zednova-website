"use client";

import Link from "next/link";
import { forwardRef, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Button } from "@/ui/Button";
import { CmsImage } from "@/ui/CmsImage";
import { Icon } from "@/ui/Icon";
import { cn } from "@/lib/utils";
import { getNavbarOffsetPx } from "@/lib/navbar-scroll";
import type { ServicesPageCard } from "@/features/services/ServicesPageShowcase";

/** Scroll runway between cards so the next one can slide over the stack. */
const CARD_SCROLL_GAP_VH = 40;
/** Minimal release room before the CTA — no decorative crosses in this gap. */
const STACK_RELEASE_VH = 12;

const STICKY_CARD_MIN_H_CLASS =
  "min-h-[calc(100dvh-4rem-env(safe-area-inset-top,0px))] lg:min-h-[calc(100dvh-4.5rem-env(safe-area-inset-top,0px))]";

const ServiceStackRow = forwardRef<
  HTMLElement,
  { card: ServicesPageCard; index: number; total: number }
>(function ServiceStackRow({ card, index, total }, ref) {
  const imageFirst = index % 2 === 0;
  const isLast = index === total - 1;

  return (
    <article
      ref={ref}
      className={cn(
        "group/row relative border-b border-zn-border bg-zn-bg",
        STICKY_CARD_MIN_H_CLASS,
        isLast && "border-b-0",
      )}
      style={{
        zIndex: index + 1,
        marginBottom: isLast ? undefined : `${CARD_SCROLL_GAP_VH}vh`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-zn-border lg:block"
        aria-hidden="true"
      />

      <div className={cn("grid items-stretch lg:grid-cols-2", STICKY_CARD_MIN_H_CLASS)}>
        <div
          className={cn(
            "relative w-full min-h-[14rem] sm:min-h-[18rem]",
            imageFirst ? "lg:order-1" : "lg:order-2",
          )}
        >
          <Link
            href={card.href}
            className={cn(
              "relative block h-full min-h-[14rem] w-full overflow-hidden bg-zn-bg-3 sm:min-h-[18rem]",
              "lg:min-h-[calc(100dvh-4.5rem-env(safe-area-inset-top,0px))]",
            )}
          >
            <CmsImage
              src={card.image}
              alt={card.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover/row:scale-[1.03] motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zn-text/25 via-transparent to-transparent opacity-80 lg:bg-gradient-to-r lg:from-zn-text/10 lg:via-transparent lg:to-transparent" />
            <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-zn-border bg-zn-bg/85 backdrop-blur-sm transition-colors group-hover/row:border-zn-text group-hover/row:bg-zn-text">
              <ArrowUpRight
                className="size-4 text-zn-text transition-colors group-hover/row:text-zn-bg"
                aria-hidden="true"
              />
            </div>
            <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-zn-inv/90 lg:hidden">
              0{index + 1}
            </span>
          </Link>
        </div>

        <div
          className={cn(
            "relative flex flex-col justify-center border-t border-zn-border bg-zn-bg px-6 py-6 md:px-8 md:py-8 lg:border-t-0 lg:px-10 lg:py-10 xl:px-12",
            imageFirst ? "lg:order-2" : "lg:order-1",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {card.icon ? (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[2px] border border-zn-border bg-zn-bg-3">
                  <Icon name={card.icon} className="size-5 text-zn-text" />
                </span>
              ) : null}
              <div>
                <span className="hidden font-mono text-xs uppercase tracking-[0.12em] text-zn-text-3 lg:block">
                  0{index + 1}
                </span>
                <p className="zn-label text-zn-text-3">{card.label}</p>
              </div>
            </div>
          </div>

          <h2 className="mt-5 max-w-xl zn-h2 font-sans font-normal text-zn-text">
            {card.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-zn-text-2 md:text-lg">
            {card.shortDescription}
          </p>

          <dl className="mt-7 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-zn-border bg-zn-border">
            {card.startingPrice ? (
              <div className="bg-zn-bg px-4 py-3.5">
                <dt className="zn-label text-zn-text-3">Starting at</dt>
                <dd className="mt-1.5 font-mono text-sm text-zn-text">
                  {card.startingPrice}
                </dd>
              </div>
            ) : null}
            <div
              className={cn(
                "bg-zn-bg px-4 py-3.5",
                !card.startingPrice && "col-span-2",
              )}
            >
              <dt className="zn-label text-zn-text-3">Timeline</dt>
              <dd className="mt-1.5 font-mono text-sm leading-snug text-zn-text">
                {card.timeline}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={card.href} withArrow>
              Explore {card.label}
            </Button>
            <Link
              href={card.href}
              className="inline-flex items-center gap-1.5 text-sm text-zn-text-2 transition-colors hover:text-zn-text"
            >
              <span className="zn-underline">View service page</span>
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
});

export function ServicesStickyStack({ cards }: { cards: ServicesPageCard[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = rootRef.current;
      if (reduce || !root) return;

      const triggers: ScrollTrigger[] = [];

      cards.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: () => `top top+=${getNavbarOffsetPx()}`,
            endTrigger: root,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }),
        );
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("resize", onResize);
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: rootRef, dependencies: [cards.length] },
  );

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ paddingBottom: `${STACK_RELEASE_VH}vh` }}
    >
      {cards.map((card, index) => (
        <ServiceStackRow
          key={card.slug}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          card={card}
          index={index}
          total={cards.length}
        />
      ))}
    </div>
  );
}
