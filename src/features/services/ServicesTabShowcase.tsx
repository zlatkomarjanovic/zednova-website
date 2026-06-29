"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { BlueprintCross } from "@/ui/BlueprintCross";
import { CmsImage } from "@/ui/CmsImage";
import { MigrationPlatformPill } from "@/ui/MigrationPlatformPill";
import type { Migration } from "@/lib/types/content-nav";
import type { CustomSoftware } from "@/lib/types/custom-software";
import type { Service, ServiceGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type ServiceFilter = ServiceGroup;
type ShowcaseFilter = ServiceFilter | "custom-software" | "migrations";

type ShowcaseItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  href: string;
  image?: string;
  imageClassName?: string;
  ctaLabel: string;
  platformIcons?: Migration["platformIcons"];
  meta: { label: string; value: string }[];
};

const SERVICE_IMAGE_CLASS: Record<string, string> = {
  "ops-automation":
    "object-contain object-center p-4 md:p-6 transition-transform duration-[900ms] ease-out group-hover:scale-[1.01] motion-reduce:transition-none",
};

const SERVICE_FILTER_ORDER: ServiceFilter[] = ["Websites", "Automation", "AI Tools"];

const FILTER_LABELS: Record<ShowcaseFilter, string> = {
  Websites: "Marketing websites",
  Automation: "Automation",
  "AI Tools": "AI tools",
  Ecommerce: "E-commerce",
  "custom-software": "Custom software",
  migrations: "Migrations",
};

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

type ServicesTabShowcaseProps = {
  services: Service[];
  customSoftware: CustomSoftware[];
  migrations: Migration[];
  className?: string;
};

function formatPrice(amount?: number): string | undefined {
  if (amount == null) return undefined;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function toServiceItems(services: Service[], group: ServiceFilter): ShowcaseItem[] {
  return services
    .filter((service) => service.group === group)
    .sort((a, b) => a.order - b.order)
    .map((service) => ({
      id: `service-${service.slug}`,
      slug: service.slug,
      title: service.title,
      category: service.category,
      description: service.whatItIs,
      href: `/services/${service.slug}`,
      image: service.image || undefined,
      imageClassName: SERVICE_IMAGE_CLASS[service.slug],
      ctaLabel: "See this service",
      meta: [
        { label: "Starting at", value: service.pricingSignal },
        { label: "Timeline", value: service.timeline },
        { label: "Best for", value: service.idealClients[0] ?? "Growing businesses" },
      ],
    }));
}

function toCustomSoftwareItems(items: CustomSoftware[]): ShowcaseItem[] {
  return [...items]
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: `custom-software-${item.slug}`,
      slug: item.slug,
      title: item.title,
      category: item.softwareType ?? "Custom software",
      description: item.whatItIs ?? item.shortDescription,
      href: `/custom-software/${item.slug}`,
      image: item.image,
      ctaLabel: "View custom software",
      meta: [
        {
          label: "Starting at",
          value: formatPrice(item.startingPrice) ?? "Scoped after discovery",
        },
        {
          label: "Timeline",
          value: item.timeline ?? "MVP in 5–10 business days",
        },
        {
          label: "Best for",
          value: item.targetAudience?.[0] ?? "Teams outgrowing spreadsheets",
        },
      ],
    }));
}

function toMigrationItems(items: Migration[]): ShowcaseItem[] {
  return [...items]
    .sort((a, b) => a.order - b.order)
    .map((item) => {
      const platformLabel =
        item.sourcePlatform && item.targetPlatform
          ? `${item.sourcePlatform} → ${item.targetPlatform}`
          : "Platform migration";

      return {
        id: `migration-${item.slug}`,
        slug: item.slug,
        title: item.title,
        category: platformLabel,
        description: item.description,
        href: `/migrations/${item.slug}`,
        image: item.image ?? item.coverImage?.url,
        ctaLabel: "View migration",
        platformIcons: item.platformIcons,
        meta: [
          {
            label: "Starting at",
            value: item.pricingSignal ?? "Scoped after audit",
          },
          {
            label: "Timeline",
            value: item.timeline ?? "Typical cutover in 4–8 weeks",
          },
          {
            label: "Best for",
            value: item.shortDescription,
          },
        ],
      };
    });
}

function ShowcasePanel({ item }: { item: ShowcaseItem }) {
  return (
    <Link
      href={item.href}
      className="group flex min-h-[28rem] w-full flex-col items-stretch gap-6 px-6 md:min-h-0 md:h-[72vh] md:flex-row md:gap-8 md:px-8"
    >
      <div className="flex w-full min-w-0 flex-col justify-between rounded-[8px] bg-white p-6 md:w-1/2 md:p-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            {item.platformIcons ? (
              <MigrationPlatformPill
                from={item.platformIcons.from}
                to={item.platformIcons.to}
              />
            ) : (
              <span className="zn-pill-tag text-zn-text-2">{item.category}</span>
            )}
            <span
              className="relative flex size-4 shrink-0 items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <ArrowUpRight className="size-4 text-zn-text-3 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0" />
              <ArrowUpRight className="absolute size-4 text-zn-text-3 -translate-x-full translate-y-full opacity-0 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-zn-text motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0" />
            </span>
          </div>
          <h3 className="mt-3 font-sans text-xl font-normal tracking-tight text-zn-text md:text-[1.35rem]">
            {item.title}
          </h3>
          <p className="zn-prose mt-4 max-w-xl text-[0.9rem] leading-relaxed md:text-[0.9375rem]">
            {item.description}
          </p>
        </div>

        <div className="mt-8">
          <div className="border border-zn-border">
            <div className="grid grid-cols-1 divide-y divide-zn-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {item.meta.map((entry) => (
                <div key={entry.label} className="px-4 py-3.5 md:px-5 md:py-4">
                  <p className="zn-label text-zn-text-3">{entry.label}</p>
                  <p className="mt-2 text-sm leading-snug text-zn-text">{entry.value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 font-sans text-sm text-zn-text transition-colors group-hover:text-zn-text-2">
            {item.ctaLabel}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </p>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] bg-zn-bg-3 md:aspect-auto md:h-full md:w-1/2">
        {item.image ? (
          <CmsImage
            src={item.image}
            alt={item.title}
            fill
            preset="showcase"
            sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 960px"
            className={cn(
              item.imageClassName ??
                "object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none",
            )}
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-zn-bg-2 via-zn-bg-3 to-zn-sage/40"
            aria-hidden="true"
          />
        )}
      </div>
    </Link>
  );
}

export function ServicesTabShowcase({
  services,
  customSoftware,
  migrations,
  className,
}: ServicesTabShowcaseProps) {
  const filters = useMemo(() => {
    const serviceFilters = SERVICE_FILTER_ORDER.filter((group) =>
      services.some((service) => service.group === group),
    ).map((group) => ({
      filter: group as ShowcaseFilter,
      items: toServiceItems(services, group),
    }));

    const extraFilters: { filter: ShowcaseFilter; items: ShowcaseItem[] }[] = [];

    const customSoftwareItems = toCustomSoftwareItems(customSoftware);
    if (customSoftwareItems.length > 0) {
      extraFilters.push({ filter: "custom-software", items: customSoftwareItems });
    }

    const migrationItems = toMigrationItems(migrations);
    if (migrationItems.length > 0) {
      extraFilters.push({ filter: "migrations", items: migrationItems });
    }

    return [...serviceFilters, ...extraFilters];
  }, [customSoftware, migrations, services]);

  const defaultFilter: ShowcaseFilter = filters.some((entry) => entry.filter === "Websites")
    ? "Websites"
    : (filters[0]?.filter ?? "Websites");

  const defaultItems =
    filters.find((entry) => entry.filter === defaultFilter)?.items ?? filters[0]?.items ?? [];

  const [activeFilter, setActiveFilter] = useState<ShowcaseFilter>(defaultFilter);
  const [activeId, setActiveId] = useState(() => defaultItems[0]?.id ?? "");

  const filterItems = useMemo(() => {
    return filters.find((entry) => entry.filter === activeFilter)?.items ?? [];
  }, [activeFilter, filters]);

  const activeIndex = filterItems.findIndex((item) => item.id === activeId);
  const active = filterItems[activeIndex >= 0 ? activeIndex : 0];

  useEffect(() => {
    if (!filters.some((entry) => entry.filter === activeFilter)) {
      setActiveFilter(defaultFilter);
    }
  }, [activeFilter, defaultFilter, filters]);

  useEffect(() => {
    if (!filterItems.some((item) => item.id === activeId)) {
      setActiveId(filterItems[0]?.id ?? "");
    }
  }, [activeId, filterItems]);

  const selectFilter = useCallback(
    (filter: ShowcaseFilter) => {
      setActiveFilter(filter);
      const nextItems = filters.find((entry) => entry.filter === filter)?.items ?? [];
      if (nextItems[0]) setActiveId(nextItems[0].id);
    },
    [filters],
  );

  const goPrev = useCallback(() => {
    if (filterItems.length === 0) return;
    const index = activeIndex >= 0 ? activeIndex : 0;
    setActiveId(filterItems[(index - 1 + filterItems.length) % filterItems.length].id);
  }, [activeIndex, filterItems]);

  const goNext = useCallback(() => {
    if (filterItems.length === 0) return;
    const index = activeIndex >= 0 ? activeIndex : 0;
    setActiveId(filterItems[(index + 1) % filterItems.length].id);
  }, [activeIndex, filterItems]);

  if (!active) return null;

  return (
    <div className={cn("relative mt-14 w-full min-w-0", className)}>
      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

      <div className="border-t border-zn-border" />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zn-border px-6 py-4 md:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2">
          {filters.map(({ filter }) => {
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
            aria-label="Previous item in category"
            className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next item in category"
            className="flex size-8 items-center justify-center border border-zn-border bg-white text-zn-text transition-colors hover:border-zn-text"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="border-b border-zn-border">
        <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filterItems.map((item) => {
            const isActive = item.id === active.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 border-r border-zn-border px-5 py-4 text-left transition-colors last:border-r-0 md:px-6",
                  isActive
                    ? "bg-white text-zn-text"
                    : "text-zn-text-3 hover:bg-white/60 hover:text-zn-text",
                )}
              >
                <span className="block max-w-[12rem] font-sans text-sm font-normal leading-snug tracking-tight whitespace-normal md:max-w-[14rem] md:text-[0.875rem]">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden pt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: PANEL_EASE }}
          >
            <ShowcasePanel item={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
