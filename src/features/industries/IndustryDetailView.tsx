import {
  getAllPosts,
  getAllServices,
  getAllCustomSoftware,
  getAllMigrations,
  getPlatformTestimonials,
  getIndustryRelatedPortfolioProjects,
  getIndustryPageData,
  getPostsBySlugs,
  getServiceMegaMenuCards,
  getServiceNavGroups,
} from "@/lib/queries";
import type { Industry, IndustryParent } from "@/lib/types";
import type { PortfolioProject, Post, Testimonial } from "@/lib/types";
import type { CustomSoftware } from "@/lib/types/custom-software";
import type { Migration, NavMenuGroup, ServiceMegaMenuCard } from "@/lib/types/content-nav";
import type { Service } from "@/lib/types";
import { resolveIndustryPageContent } from "@/lib/content/resolve-industry-page";
import { IndustryPageTemplate } from "@/features/industries/IndustryPageTemplate";

export type IndustryDetailContext = {
  relatedWork: PortfolioProject[];
  relatedPosts: Post[];
  platformTestimonials: Testimonial[];
  subIndustries: Industry[];
  serviceNavGroups: NavMenuGroup[];
  serviceMegaMenuCards: ServiceMegaMenuCard[];
  services: Service[];
  customSoftware: CustomSoftware[];
  migrations: Migration[];
  linkedServiceSlugs: string[];
};

export async function loadIndustryDetailContext(
  parent: IndustryParent,
): Promise<IndustryDetailContext> {
  const [
    relatedWork,
    platformTestimonials,
    page,
    serviceNavGroups,
    serviceMegaMenuCards,
    services,
    customSoftware,
    migrations,
  ] = await Promise.all([
    getIndustryRelatedPortfolioProjects(parent),
    getPlatformTestimonials(),
    getIndustryPageData(parent.slug),
    getServiceNavGroups(),
    getServiceMegaMenuCards(),
    getAllServices(),
    getAllCustomSoftware(),
    getAllMigrations(),
  ]);

  const relatedPosts = parent.relatedInsights?.length
    ? await getPostsBySlugs(parent.relatedInsights)
    : (await getAllPosts()).slice(0, 3);

  return {
    relatedWork,
    relatedPosts,
    platformTestimonials,
    subIndustries: filterFeaturedSubIndustries(
      page?.subIndustries ?? [],
      parent.featuredSubIndustrySlugs,
    ),
    serviceNavGroups,
    serviceMegaMenuCards,
    services,
    customSoftware,
    migrations,
    linkedServiceSlugs: parent.servicesForThisIndustrySlugs ?? [],
  };
}

function filterFeaturedSubIndustries(
  allSubs: Industry[],
  featuredSlugs?: string[],
): Industry[] {
  if (!featuredSlugs?.length) return allSubs;
  const ordered = featuredSlugs
    .map((slug) => allSubs.find((item) => item.slug === slug))
    .filter((item): item is Industry => Boolean(item));
  return ordered.length > 0 ? ordered : allSubs;
}

export function IndustryDetailView({
  parent,
  context,
}: {
  parent: IndustryParent;
  context: IndustryDetailContext;
}) {
  const page = resolveIndustryPageContent(parent, context.subIndustries);

  return (
    <IndustryPageTemplate
      page={page}
      context={{
        relatedWork: context.relatedWork,
        relatedPosts: context.relatedPosts,
        platformTestimonials: context.platformTestimonials,
        serviceNavGroups: context.serviceNavGroups,
        serviceMegaMenuCards: context.serviceMegaMenuCards,
        services: context.services,
        customSoftware: context.customSoftware,
        migrations: context.migrations,
        linkedServiceSlugs: context.linkedServiceSlugs,
      }}
    />
  );
}
