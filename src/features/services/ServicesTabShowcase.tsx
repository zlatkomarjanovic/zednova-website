"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { BlueprintCross } from "@/ui/BlueprintCross";
import { CmsImage } from "@/ui/CmsImage";
import { MigrationPlatformPill } from "@/ui/MigrationPlatformPill";
import type { Migration, NavMenuGroup, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import type { CustomSoftware } from "@/lib/types/custom-software";
import type { Service } from "@/lib/types";
import {
  PRIMARY_SERVICE_GROUPS,
  PRIMARY_SERVICE_TAB_LABELS,
  PRIMARY_SERVICE_TAGLINES,
  serviceNavGroups as staticServiceNavGroups,
  type PrimaryServiceGroup,
} from "@/lib/content/nav-menu";
import { getParentSlug, parentServicePath } from "@/lib/content/service-routes";
import { cn } from "@/lib/utils";

const SERVICE_IMAGE_CLASS: Record<string, string> = {
  "ops-automation":
    "object-contain object-center p-4 md:p-6 transition-transform duration-[900ms] ease-out group-hover:scale-[1.01] motion-reduce:transition-none",
};

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PARENT_PRIMARY_HREF: Record<PrimaryServiceGroup, string> = Object.fromEntries(
  PRIMARY_SERVICE_GROUPS.map((group) => [group, parentServicePath(getParentSlug(group))]),
) as Record<PrimaryServiceGroup, string>;

type ParentShowcase = {
  filter: PrimaryServiceGroup;
  tabLabel: string;
  headline: string;
  description: string;
  href: string;
  ctaLabel: string;
  image?: string;
  imageClassName?: string;
  platformIcons?: Migration["platformIcons"];
  subServices: { title: string; href: string; shortDescription: string }[];
  meta: { label: string; value: string }[];
};

type ServicesTabShowcaseProps = {
  serviceNavGroups: NavMenuGroup[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  services: Service[];
  customSoftware: CustomSoftware[];
  migrations: Migration[];
  className?: string;
  /** When set, only show tabs for these parent service groups (e.g. industry-linked services). */
  visibleGroups?: PrimaryServiceGroup[];
};

function resolveParentImage(
  group: PrimaryServiceGroup,
  services: Service[],
  customSoftware: CustomSoftware[],
  migrations: Migration[],
): { image?: string; imageClassName?: string; platformIcons?: Migration["platformIcons"] } {
  const groupService = services.find((entry) => entry.group === group && entry.image);
  if (groupService?.image) {
    return {
      image: groupService.image,
      imageClassName: SERVICE_IMAGE_CLASS[groupService.slug],
    };
  }

  if (group === "Custom In-House Software for SMBs") {
    const cs = customSoftware.find((entry) => entry.image);
    if (cs?.image) return { image: cs.image };
  }

  if (group === "Platform Migrations") {
    const migration = migrations.find((entry) => entry.image ?? entry.coverImage?.url);
    if (migration) {
      return {
        image: migration.image ?? migration.coverImage?.url,
        platformIcons: migration.platformIcons,
      };
    }
  }

  return {};
}

function resolveParentMeta(
  group: PrimaryServiceGroup,
  href: string,
  services: Service[],
  megaMenuCards: ServiceMegaMenuCard[],
): { label: string; value: string }[] {
  const card = megaMenuCards.find((entry) => entry.href === href);
  const service = services.find((entry) => entry.group === group);

  return [
    {
      label: "Starting at",
      value: card?.startingPrice ?? service?.pricingSignal ?? "Scoped after discovery",
    },
    {
      label: "Timeline",
      value: service?.timeline ?? "Typical launch in 1–3 weeks",
    },
    {
      label: "Best for",
      value: service?.idealClients[0] ?? "Small businesses ready to fix lead leaks",
    },
  ];
}

function buildParentShowcase(
  group: PrimaryServiceGroup,
  items: NavMenuGroup["items"],
  services: Service[],
  customSoftware: CustomSoftware[],
  migrations: Migration[],
  megaMenuCards: ServiceMegaMenuCard[],
): ParentShowcase {
  const tabLabel = PRIMARY_SERVICE_TAB_LABELS[group];
  const href = PARENT_PRIMARY_HREF[group];
  const card = megaMenuCards.find((entry) => entry.href === href);
  const visual = resolveParentImage(group, services, customSoftware, migrations);

  return {
    filter: group,
    tabLabel,
    headline: tabLabel,
    description: card?.shortDescription ?? PRIMARY_SERVICE_TAGLINES[group],
    href,
    ctaLabel: group === "Custom In-House Software for SMBs" ? "View custom software" : "See this service",
    image: visual.image,
    imageClassName: visual.imageClassName,
    platformIcons: visual.platformIcons,
    subServices: items.map((item) => ({
      title: item.title,
      href: item.href,
      shortDescription: item.shortDescription,
    })),
    meta: resolveParentMeta(group, href, services, megaMenuCards),
  };
}

function ParentShowcasePanel({ panel }: { panel: ParentShowcase }) {
  return (
    <div className="group flex min-h-[28rem] w-full min-w-0 flex-col items-stretch gap-6 px-6 md:h-[min(72vh,52rem)] md:min-h-[28rem] md:flex-row md:gap-8 md:px-8">
      <div className="flex h-auto w-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[8px] bg-white p-6 md:h-full md:w-1/2 md:p-8">
        <div className="shrink-0">
          <div className="flex items-start justify-between gap-4">
            {panel.platformIcons ? (
              <MigrationPlatformPill
                from={panel.platformIcons.from}
                to={panel.platformIcons.to}
              />
            ) : (
              <span className="zn-pill-tag text-zn-text-2">{panel.tabLabel}</span>
            )}
            <Link
              href={panel.href}
              aria-label={`Open ${panel.headline}`}
              className="relative flex size-4 shrink-0 items-center justify-center overflow-hidden"
            >
              <ArrowUpRight className="size-4 text-zn-text-3 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0" />
              <ArrowUpRight className="absolute size-4 text-zn-text-3 -translate-x-full translate-y-full opacity-0 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-zn-text motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0" />
            </Link>
          </div>

          <h3 className="mt-3 font-sans text-xl font-normal tracking-tight text-zn-text md:text-[1.35rem]">
            {panel.headline}
          </h3>
          <p className="zn-prose mt-4 line-clamp-3 text-[0.9rem] leading-relaxed md:text-[0.9375rem]">
            {panel.description}
          </p>
        </div>

        {panel.subServices.length > 0 ? (
          <div className="mt-5 flex min-h-0 flex-1 flex-col">
            <p className="zn-label shrink-0 text-zn-text-3">What&apos;s included</p>
            <ul
              className={cn(
                "mt-3 flex min-h-0 flex-1 flex-wrap content-start gap-2 overflow-y-auto overscroll-contain",
                "[scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.15)_transparent]",
              )}
            >
              {panel.subServices.map((item) => (
                <li key={`${item.href}::${item.title}`} className="max-w-full">
                  <Link
                    href={item.href}
                    title={item.shortDescription}
                    className="group/item inline-flex max-w-full items-center gap-1.5 rounded-full border border-zn-border bg-zn-bg-2/50 px-3 py-1.5 text-[0.8125rem] leading-none text-zn-text transition-[border-color,background-color,color] hover:border-zn-text hover:bg-white hover:text-zn-text"
                  >
                    <span className="truncate">{item.title}</span>
                    <ArrowUpRight
                      className="size-3 shrink-0 text-zn-text-3 transition-transform group-hover/item:-translate-y-px group-hover/item:translate-x-px group-hover/item:text-zn-text"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="min-h-0 flex-1" aria-hidden="true" />
        )}

        <div className="mt-5 shrink-0">
          <div className="border border-zn-border">
            <div className="grid grid-cols-1 divide-y divide-zn-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {panel.meta.map((entry) => (
                <div key={entry.label} className="min-w-0 px-4 py-3.5 md:px-5 md:py-4">
                  <p className="zn-label text-zn-text-3">{entry.label}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-snug text-zn-text">{entry.value}</p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href={panel.href}
            className="mt-5 inline-flex items-center gap-2 font-sans text-sm text-zn-text transition-colors hover:text-zn-text-2"
          >
            {panel.ctaLabel}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full min-w-0 overflow-hidden rounded-[8px] bg-zn-bg-3 md:aspect-auto md:h-full md:w-1/2 md:shrink-0">
        {panel.image ? (
          <CmsImage
            src={panel.image}
            alt={panel.headline}
            fill
            preset="showcase"
            sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 960px"
            className={cn(
              panel.imageClassName ??
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
    </div>
  );
}

export function ServicesTabShowcase({
  serviceNavGroups,
  serviceMegaMenuCards,
  services,
  customSoftware,
  migrations,
  className,
  visibleGroups,
}: ServicesTabShowcaseProps) {
  const resolvedNavGroups = useMemo(() => {
    const hasPrimaryItems = PRIMARY_SERVICE_GROUPS.some((group) =>
      serviceNavGroups.some((entry) => entry.group === group && entry.items.length > 0),
    );
    return hasPrimaryItems ? serviceNavGroups : staticServiceNavGroups;
  }, [serviceNavGroups]);

  const panels = useMemo(() => {
    return PRIMARY_SERVICE_GROUPS.map((group) => {
      const navGroup = resolvedNavGroups.find((entry) => entry.group === group);
      const items = navGroup?.items ?? [];
      return buildParentShowcase(
        group,
        items,
        services,
        customSoftware,
        migrations,
        serviceMegaMenuCards,
      );
    }).filter((panel) => panel.subServices.length > 0)
      .filter((panel) => !visibleGroups?.length || visibleGroups.includes(panel.filter));
  }, [customSoftware, migrations, resolvedNavGroups, serviceMegaMenuCards, services, visibleGroups]);

  const defaultFilter: PrimaryServiceGroup = panels.some(
    (panel) => panel.filter === "Lead-Gen Websites & AI Search",
  )
    ? "Lead-Gen Websites & AI Search"
    : (panels[0]?.filter ?? "Lead-Gen Websites & AI Search");

  const [activeFilter, setActiveFilter] = useState<PrimaryServiceGroup>(defaultFilter);

  const activePanel =
    panels.find((panel) => panel.filter === activeFilter) ?? panels[0];

  useEffect(() => {
    if (!panels.some((panel) => panel.filter === activeFilter)) {
      setActiveFilter(defaultFilter);
    }
  }, [activeFilter, defaultFilter, panels]);

  const selectFilter = useCallback((filter: PrimaryServiceGroup) => {
    setActiveFilter(filter);
  }, []);

  if (!activePanel) {
    return (
      <div className={cn("relative mt-14 w-full min-w-0 px-6 py-12 text-center md:px-8", className)}>
        <p className="text-sm text-zn-text-2">Services are loading. Refresh or visit the services page.</p>
      </div>
    );
  }

  return (
    <div className={cn("relative mt-14 w-full min-w-0", className)}>
      <BlueprintCross anchor="left" className="top-0 -translate-y-1/2" />
      <BlueprintCross anchor="right" className="top-0 -translate-y-1/2" />

      <div className="border-t border-zn-border" />

      <div className="flex flex-wrap items-center gap-3 border-b border-zn-border px-6 py-4 md:px-8">
        {panels.map(({ filter }) => {
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
              {PRIMARY_SERVICE_TAB_LABELS[filter]}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden border-b border-zn-border pt-8 pb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePanel.filter}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: PANEL_EASE }}
          >
            <ParentShowcasePanel panel={activePanel} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
