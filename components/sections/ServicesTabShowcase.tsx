"use client";

import { useCallback, useMemo, useState } from "react";
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
            <span
              className="relative flex size-4 shrink-0 items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <ArrowUpRight className="size-4 text-zn-text-3 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0" />
              <ArrowUpRight className="absolute size-4 text-zn-text-3 -translate-x-full translate-y-full opacity-0 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-zn-text motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0" />
            </span>
          </div>
          <h3 className="mt-1 font-sans text-xl font-normal tracking-tight text-zn-text md:text-[1.35rem]">
            {service.title}
          </h3>
          <p className="zn-prose mt-4 max-w-xl text-[0.9rem] leading-relaxed md:text-[0.9375rem]">
            {service.whatItIs}
          </p>
        </div>

        <div className="mt-8 border border-zn-border">
          <div className="grid grid-cols-1 divide-y divide-zn-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {meta.map((item) => (
              <div key={item.label} className="px-4 py-3.5 md:px-5 md:py-4">
                <p className="zn-label text-zn-text-3">{item.label}</p>
                <p className="mt-2 text-sm leading-snug text-zn-text">{item.value}</p>
              </div>
            ))}
          </div>
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

  const active = flat[activeIndex];

  const selectTab = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + flat.length) % flat.length);
  }, [flat.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % flat.length);
  }, [flat.length]);

  if (!active) return null;

  return (
    <div className={cn("relative mt-14 w-full", className)}>
      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

      <div className="border-t border-zn-border" />

      <div className="relative flex items-stretch border-b border-zn-border">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous service"
          className="hidden shrink-0 items-center justify-center border-r border-zn-border bg-white px-3 text-zn-text transition-opacity hover:opacity-70 sm:flex"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>

        <div
          role="tablist"
          aria-label="Services"
          className="flex min-w-0 flex-1"
        >
          {grouped.map(({ group, services: groupServices }, groupIndex) => (
            <div key={group} className="flex min-w-0 flex-1">
              <div
                className={cn(
                  "zn-label flex max-w-[8rem] shrink-0 items-center border-r border-zn-border bg-white px-3 py-3 text-[0.625rem] leading-snug text-zn-text md:max-w-[9.5rem] md:px-4",
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
                    type="button"
                    role="tab"
                    id={`service-tab-${service.slug}`}
                    aria-selected={isActive}
                    aria-controls={`service-panel-${service.slug}`}
                    onClick={() => selectTab(index)}
                    className={cn(
                      "min-w-0 flex-1 border-r border-zn-border px-3 py-3 text-left transition-colors last:border-r-0 md:px-4",
                      isActive
                        ? "bg-white text-zn-text"
                        : "text-zn-text-3 hover:bg-white/50 hover:text-zn-text",
                    )}
                  >
                    <span className="block font-mono text-[9px] uppercase tracking-[0.12em]">
                      {service.number}
                    </span>
                    <span className="mt-0.5 block truncate font-sans text-xs font-normal tracking-tight md:text-[0.8125rem]">
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
          onClick={goNext}
          aria-label="Next service"
          className="hidden shrink-0 items-center justify-center border-l border-zn-border bg-white px-3 text-zn-text transition-opacity hover:opacity-70 sm:flex"
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
