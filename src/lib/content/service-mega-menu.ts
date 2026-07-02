import type { ServiceMegaMenuCard } from "@/lib/types/content-nav";
import type { Service } from "@/lib/types";

import { getServicePublicPath } from "@/lib/content/service-routes";

/** Services that belong in primary surfaces (mega menu, footer, /services grid). */
export function isPrimaryNavService(service: Service): boolean {
  return service.isLegacy !== true && service.showInPrimaryServices !== false;
}

/**
 * Build nav/footer mega menu cards from the Service documents in Sanity.
 * Whatever is published (and not hidden via flags) shows up, ordered by `order` —
 * adding, deleting, or reordering services in the CMS updates every surface.
 */
export function buildMegaMenuCardsFromServices(services: Service[]): ServiceMegaMenuCard[] {
  return services
    .filter(isPrimaryNavService)
    .sort((a, b) => a.order - b.order)
    .map((service) => ({
      title: service.category || service.title,
      shortDescription: service.shortDescription,
      includes: service.deliverables?.slice(0, 4).join(", ") ?? "",
      href: getServicePublicPath(service.slug),
      startingPrice: service.pricingSignal || undefined,
      isFeatured: service.isFeatured ?? true,
      isLegacy: false,
    }));
}
