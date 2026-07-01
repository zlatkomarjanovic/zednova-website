"use client";

import { useMemo } from "react";

import type { IndustryPageContent } from "@/lib/types/industry-page";
import type { CustomSoftware } from "@/lib/types/custom-software";
import type { Migration, NavMenuGroup, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import type { Service } from "@/lib/types";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintGrid } from "@/components/animations/BlueprintGrid";
import { SectionLabel } from "@/ui/SectionLabel";
import { ServicesTabShowcase } from "@/features/services/ServicesTabShowcase";
import {
  PRIMARY_SERVICE_GROUPS,
  type PrimaryServiceGroup,
} from "@/lib/content/nav-menu";
import {
  getParentSlugForServiceSlug,
  getParentGroup,
  isParentServiceSlug,
} from "@/lib/content/service-routes";

function resolveGroupsForServiceSlugs(slugs: string[]): PrimaryServiceGroup[] {
  const groups = new Set<PrimaryServiceGroup>();

  for (const slug of slugs) {
    const parentSlug = getParentSlugForServiceSlug(slug);
    if (parentSlug && isParentServiceSlug(parentSlug)) {
      groups.add(getParentGroup(parentSlug));
      continue;
    }
    if (isParentServiceSlug(slug)) {
      groups.add(getParentGroup(slug));
    }
  }

  return PRIMARY_SERVICE_GROUPS.filter((group) => groups.has(group));
}

export function IndustryServicesShowcase({
  section,
  serviceNavGroups,
  serviceMegaMenuCards,
  services,
  customSoftware,
  migrations,
  linkedServiceSlugs = [],
}: {
  section: IndustryPageContent["services"];
  serviceNavGroups: NavMenuGroup[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  services: Service[];
  customSoftware: CustomSoftware[];
  migrations: Migration[];
  linkedServiceSlugs?: string[];
}) {
  const visibleGroups = useMemo(
    () => (linkedServiceSlugs.length > 0 ? resolveGroupsForServiceSlugs(linkedServiceSlugs) : undefined),
    [linkedServiceSlugs],
  );

  if (!section.heading) return null;

  return (
    <section
      data-theme="light"
      className="relative zn-section overflow-hidden bg-gradient-to-b from-zn-sage-mid via-zn-sage-mid to-zn-sage"
    >
      <div className="zn-sage-grain absolute inset-0" aria-hidden="true" />
      <BlueprintGrid />
      <div className="zn-container relative">
        <div className="max-w-2xl">
          <Reveal>
            {section.eyebrow ? (
              <SectionLabel withRule={false}>{section.eyebrow}</SectionLabel>
            ) : null}
          </Reveal>
          <TextReveal
            as="h2"
            text={section.heading}
            className="mt-6 zn-h2 font-sans font-normal"
          />
          {section.subheading ? (
            <Reveal delay={0.08}>
              <p className="zn-prose mt-5 max-w-lg">{section.subheading}</p>
            </Reveal>
          ) : null}
        </div>
      </div>
      <div className="zn-container-guides relative">
        <ServicesTabShowcase
          serviceNavGroups={serviceNavGroups}
          serviceMegaMenuCards={serviceMegaMenuCards}
          services={services}
          customSoftware={customSoftware}
          migrations={migrations}
          visibleGroups={visibleGroups}
        />
      </div>
    </section>
  );
}
