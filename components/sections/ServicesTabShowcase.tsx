"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { BlueprintCross } from "@/components/shared/BlueprintCross";
import type { Service, ServiceGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

const GROUP_ORDER: ServiceGroup[] = [
  "Growth & Automation",
  "Infrastructure & Intelligence",
];

type ServicesTabShowcaseProps = {
  services: Service[];
  className?: string;
};

function ServicePanel({ service }: { service: Service }) {
  const meta = [
    { label: "Starting at", value: service.pricingSignal },
    { label: "Timeline", value: service.timeline },
    { label: "Best for", value: service.idealClients[0] },
  ];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-[80vh] w-full items-stretch gap-8 px-8"
    >
      <div className="flex w-1/2 min-w-0 flex-col justify-between rounded-[8px] bg-white p-6 md:p-8">
        <div>
          <div className="flex items-start justify-end gap-4">
            <ArrowUpRight
              className="size-4 shrink-0 text-zn-text-3 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zn-text"
              aria-hidden="true"
            />
          </div>
          <h3 className="mt-1 font-sans text-xl font-normal tracking-tight text-zn-text md:text-[1.35rem]">
            {service.title}
          </h3>
          <p className="zn-prose mt-4 max-w-xl text-[0.9rem] leading-relaxed md:text-[0.9375rem]">
            {service.whatItIs}
          </p>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-3 sm:gap-3">
          {meta.map((item) => (
            <div
              key={item.label}
              className="rounded-[6px] bg-zn-bg px-4 py-3.5"
            >
              <p className="zn-label text-zn-text-3">{item.label}</p>
              <p className="mt-2 text-sm leading-snug text-zn-text">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-full w-1/2 shrink-0 overflow-hidden rounded-[8px] bg-zn-bg-3">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 46vw, 36rem"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>
    </Link>
  );
}

export function ServicesTabShowcase({ services, className }: ServicesTabShowcaseProps) {
  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        services: services
          .filter((s) => s.group === group)
          .sort((a, b) => a.order - b.order),
      })),
    [services],
  );

  const flat = useMemo(() => grouped.flatMap((g) => g.services), [grouped]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const active = flat[activeIndex];

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  const scrollTabs = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -el.clientWidth * 0.55 : el.clientWidth * 0.55,
      behavior: "smooth",
    });
  }, []);

  const selectTab = useCallback(
    (index: number, slug: string) => {
      setActiveIndex(index);
      tabRefs.current.get(slug)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    },
    [],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const onScroll = () => updateScrollState();
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, flat.length]);

  if (!active) return null;

  return (
    <div className={cn("relative mt-14 w-full", className)}>
      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

      <div className="border-t border-zn-border" />

      <div className="relative flex items-stretch border-b border-zn-border">
        <button
          type="button"
          onClick={() => scrollTabs("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll services tabs left"
          className={cn(
            "hidden shrink-0 items-center justify-center border-r border-zn-border bg-white px-3 transition-opacity sm:flex",
            canScrollLeft
              ? "text-zn-text hover:opacity-70"
              : "cursor-default opacity-40",
          )}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>

        <div
          ref={scrollRef}
          role="tablist"
          aria-label="Services"
          className="flex min-w-0 flex-1 overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zn-border"
        >
          {grouped.map(({ group, services: groupServices }, groupIndex) => (
            <div key={group} className="flex shrink-0">
              <div
                className={cn(
                  "zn-label flex max-w-[9rem] shrink-0 items-center border-r border-zn-border bg-white px-4 py-3.5 leading-snug text-zn-text md:max-w-[11rem] md:px-5",
                  groupIndex > 0 && "border-l border-zn-border",
                )}
              >
                {group}
              </div>

              {groupServices.map((service) => {
                const index = flat.findIndex((s) => s.slug === service.slug);
                const isActive = index === activeIndex;

                return (
                  <button
                    key={service.slug}
                    ref={(node) => {
                      if (node) tabRefs.current.set(service.slug, node);
                      else tabRefs.current.delete(service.slug);
                    }}
                    type="button"
                    role="tab"
                    id={`service-tab-${service.slug}`}
                    aria-selected={isActive}
                    aria-controls={`service-panel-${service.slug}`}
                    onClick={() => selectTab(index, service.slug)}
                    className={cn(
                      "shrink-0 border-r border-zn-border px-5 py-3.5 text-left transition-colors last:border-r-0 md:px-6",
                      isActive
                        ? "bg-white text-zn-text"
                        : "text-zn-text-3 hover:bg-white/50 hover:text-zn-text",
                    )}
                  >
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em]">
                      {service.number}
                    </span>
                    <span className="mt-1 block max-w-[11rem] font-sans text-sm font-normal tracking-tight md:max-w-[14rem] md:text-[0.95rem]">
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollTabs("right")}
          disabled={!canScrollRight}
          aria-label="Scroll services tabs right"
          className={cn(
            "hidden shrink-0 items-center justify-center border-l border-zn-border bg-white px-3 transition-opacity sm:flex",
            canScrollRight
              ? "text-zn-text hover:opacity-70"
              : "cursor-default opacity-40",
          )}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div
        role="tabpanel"
        id={`service-panel-${active.slug}`}
        aria-labelledby={`service-tab-${active.slug}`}
        className="pt-8"
      >
        <ServicePanel key={active.slug} service={active} />
      </div>
    </div>
  );
}
