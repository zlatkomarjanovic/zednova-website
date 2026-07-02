import type { ServiceMegaMenuCard } from "@/lib/types/content-nav";
import type { Service } from "@/lib/types";

import { serviceMegaMenuCards as staticMegaMenuCards } from "@/lib/content/nav-menu";
import {
  PRIMARY_SERVICE_GROUPS,
  PRIMARY_SERVICE_TAB_LABELS,
  PRIMARY_SERVICE_TAGLINES,
} from "@/lib/content/service-groups";
import {
  PARENT_SLUG_BY_GROUP,
  SERVICE_SLUG_BY_PARENT,
  parentServicePath,
  type ParentServiceSlug,
} from "@/lib/content/service-routes";

function includesLine(service: Service | undefined, fallback: string): string {
  if (service?.deliverables?.length) {
    return service.deliverables.slice(0, 4).join(", ");
  }
  return fallback;
}

/** Build homepage/nav mega menu cards from the 6 parent Service documents. */
export function buildMegaMenuCardsFromServices(services: Service[]): ServiceMegaMenuCard[] {
  const bySlug = new Map(services.map((service) => [service.slug, service]));

  return PRIMARY_SERVICE_GROUPS.map((group, index) => {
    const parentSlug = PARENT_SLUG_BY_GROUP[group] as ParentServiceSlug;
    const cmsSlug = SERVICE_SLUG_BY_PARENT[parentSlug];
    const service = bySlug.get(cmsSlug);
    const fallback = staticMegaMenuCards[index];

    return {
      title: service?.title || PRIMARY_SERVICE_TAB_LABELS[group],
      shortDescription:
        service?.shortDescription ||
        PRIMARY_SERVICE_TAGLINES[group] ||
        fallback?.shortDescription ||
        "",
      includes: includesLine(service, fallback?.includes ?? ""),
      href: parentServicePath(parentSlug),
      startingPrice: service?.pricingSignal || fallback?.startingPrice,
      isFeatured: fallback?.isFeatured ?? true,
      isLegacy: false,
    };
  });
}
