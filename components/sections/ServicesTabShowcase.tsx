"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { BlueprintCross } from "@/components/shared/BlueprintCross";
import type { Service, ServiceGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type FilterKey = "All" | ServiceGroup;

const FILTER_ORDER: FilterKey[] = ["All", "Websites", "Automation", "AI Tools"];

const FILTER_LABELS: Record<FilterKey, string> = {
  All: "All",
  Websites: "Marketing websites",
  Automation: "Automation",
  "AI Tools": "AI tools",
  Ecommerce: "E-commerce",
};

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

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
      className="group flex min-h-[28rem] w-full flex-col items-stretch gap-6 px-6 md:min-h-0 md:h-[72vh] md:flex-row md:gap-8 md:px-8"
    >
      <div className="flex w-full min-w-0 flex-col justify-between rounded-[8px] bg-white p-6 md:w-1/2 md:p-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <span className="zn-pill-tag text-zn-text-2">{service.category}</span>
            <span
              className="relative flex size-4 shrink-0 items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <ArrowUpRight className="size-4 text-zn-text-3 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0" />
              <ArrowUpRight className="absolute size-4 text-zn-text-3 -translate-x-full translate-y-full opacity-0 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-zn-text motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0" />
            </span>
          </div>
          <h3 className="mt-3 font-sans text-xl font-normal tracking-tight text-zn-text md:text-[1.35rem]">
            {service.title}
          </h3>
          <p className="zn-prose mt-4 max-w-xl text-[0.9rem] leading-relaxed md:text-[0.9375rem]">
            {service.whatItIs}
          </p>
        </div>

        <div className="mt-8">
          <div className="border border-zn-border">
            <div className="grid grid-cols-1 divide-y divide-zn-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {meta.map((item) => (
                <div key={item.label} className="px-4 py-3.5 md:px-5 md:py-4">
                  <p className="zn-label text-zn-text-3">{item.label}</p>
                  <p className="mt-2 text-sm leading-snug text-zn-text">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 font-sans text-sm text-zn-text transition-colors group-hover:text-zn-text-2">
            See this service
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </p>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] bg-zn-bg-3 md:aspect-auto md:h-full md:w-1/2">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 36rem"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>
    </Link>
  );
}

export function ServicesTabShowcase({ services, className }: ServicesTabShowcaseProps) {
  const grouped = useMemo(
    () =>
      FILTER_ORDER.filter((key): key is ServiceGroup => key !== "All").map((group) => ({
        group,
        services: services
          .filter((s) => s.group === group)
          .sort((a, b) => a.order - b.order),
      })).filter((entry) => entry.services.length > 0),
    [services],
  );

  const allServices = useMemo(
    () =>
      services
        .filter((service) => service.group !== "Ecommerce")
        .sort((a, b) => a.order - b.order),
    [services],
  );

  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [activeSlug, setActiveSlug] = useState(() => allServices[0]?.slug ?? "");

  const groupServices = useMemo(() => {
    if (activeFilter === "All") return allServices;
    return grouped.find((entry) => entry.group === activeFilter)?.services ?? [];
  }, [activeFilter, allServices, grouped]);

  const activeIndex = groupServices.findIndex((service) => service.slug === activeSlug);
  const active = groupServices[activeIndex >= 0 ? activeIndex : 0];

  useEffect(() => {
    if (!groupServices.some((service) => service.slug === activeSlug)) {
      setActiveSlug(groupServices[0]?.slug ?? "");
    }
  }, [activeSlug, groupServices]);

  const selectFilter = useCallback(
    (filter: FilterKey) => {
      setActiveFilter(filter);
      const nextServices =
        filter === "All"
          ? allServices
          : grouped.find((entry) => entry.group === filter)?.services ?? [];
      if (nextServices[0]) setActiveSlug(nextServices[0].slug);
    },
    [allServices, grouped],
  );

  const goPrev = useCallback(() => {
    if (groupServices.length === 0) return;
    const index = activeIndex >= 0 ? activeIndex : 0;
    setActiveSlug(groupServices[(index - 1 + groupServices.length) % groupServices.length].slug);
  }, [activeIndex, groupServices]);

  const goNext = useCallback(() => {
    if (groupServices.length === 0) return;
    const index = activeIndex >= 0 ? activeIndex : 0;
    setActiveSlug(groupServices[(index + 1) % groupServices.length].slug);
  }, [activeIndex, groupServices]);

  const visibleFilters = useMemo(
    () =>
      FILTER_ORDER.filter(
        (filter) =>
          filter === "All" ||
          grouped.some((entry) => entry.group === filter && entry.services.length > 0),
      ),
    [grouped],
  );

  if (!active) return null;

  return (
    <div className={cn("relative mt-14 w-full min-w-0", className)}>
      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

      <div className="border-t border-zn-border" />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zn-border px-6 py-4 md:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2">
          {visibleFilters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => selectFilter(filter)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 font-sans text-sm transition-colors",
                  isActive
                    ? "border-zn-text bg-zn-text text-zn-bg"
                    : "border-zn-border bg-white text-zn-text-2 hover:border-zn-text hover:text-zn-text",
                )}
              >
                {FILTER_LABELS[filter]}
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous service in category"
            className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next service in category"
            className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="border-b border-zn-border">
        <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groupServices.map((service) => {
            const isActive = service.slug === active.slug;

            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => setActiveSlug(service.slug)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 border-r border-zn-border px-5 py-4 text-left transition-colors last:border-r-0 md:px-6",
                  isActive
                    ? "bg-white text-zn-text"
                    : "text-zn-text-3 hover:bg-white/60 hover:text-zn-text",
                )}
              >
                <span className="block max-w-[12rem] font-sans text-sm font-normal leading-snug tracking-tight whitespace-normal md:max-w-[14rem] md:text-[0.875rem]">
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden pt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: PANEL_EASE }}
          >
            <ServicePanel service={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
