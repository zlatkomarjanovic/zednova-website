/**
 * Sanity fetch helpers for services, migrations, industries, and nav content.
 */

import { sanityFetch } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  buildCustomSoftwareGroups,
  groupServiceNavItems,
  mapAuthor,
  mapCaseStudy,
  mapFaq,
  mapIndustry,
  mapIndustryNavItem,
  mapIndustryParent,
  mapMegaMenuCard,
  mapMigration,
  mapCustomSoftware,
  mapCustomSoftwareNavItem,
  mapPortfolioProject,
  mapPost,
  mapProduct,
  mapService,
  mapSiteSettings,
  mapTestimonial,
} from "@/sanity/mappers";
import {
  AUTHOR_BY_SLUG_QUERY,
  CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CUSTOM_SOFTWARE_BY_SLUG_QUERY,
  CUSTOM_SOFTWARE_QUERY,
  FAQS_QUERY,
  INDUSTRIES_QUERY,
  INDUSTRY_BY_SLUG_QUERY,
  INDUSTRY_NAV_QUERY,
  INDUSTRY_PARENT_BY_SLUG_QUERY,
  INDUSTRY_PARENTS_QUERY,
  MIGRATION_BY_SLUG_QUERY,
  MIGRATIONS_QUERY,
  PORTFOLIO_PROJECTS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_QUERY,
  PRODUCTS_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_MEGA_MENU_CARDS_QUERY,
  SERVICE_NAV_ITEMS_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries";
import type {
  CustomSoftwareGroupSection,
  Migration,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
import type { Author, CaseStudy, Industry, IndustryParent, PortfolioProject, Post, Product, Service, SiteSettings, Testimonial } from "@/lib/types";
import type { FaqItem } from "@/lib/content/faq";

export async function sanityHasContent(type: string): Promise<boolean> {
  if (!isSanityConfigured()) return false;
  try {
    const count = await sanityFetch<number>({
      query: `count(*[_type == $type])`,
      params: { type },
      revalidate: 60,
    });
    return count > 0;
  } catch {
    return false;
  }
}

export async function fetchAllServicesFromSanity(): Promise<Service[]> {
  const docs = await sanityFetch<Awaited<ReturnType<typeof mapService>>[]>({
    query: SERVICES_QUERY,
  });
  return docs.map(mapService);
}

export async function fetchServiceBySlugFromSanity(
  slug: string,
): Promise<Service | null> {
  const doc = await sanityFetch<Parameters<typeof mapService>[0] | null>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { slug },
  });
  return doc ? mapService(doc) : null;
}

export async function fetchServiceNavGroupsFromSanity(): Promise<NavMenuGroup[]> {
  const items = await sanityFetch<
    (NavMenuItem & { navGroup: string; order: number })[]
  >({ query: SERVICE_NAV_ITEMS_QUERY });
  return groupServiceNavItems(items);
}

export async function fetchServiceMegaMenuCardsFromSanity(): Promise<
  ServiceMegaMenuCard[]
> {
  const docs = await sanityFetch<
    (ServiceMegaMenuCard & { order: number })[]
  >({ query: SERVICE_MEGA_MENU_CARDS_QUERY });
  return docs.map(mapMegaMenuCard);
}

export async function fetchCustomSoftwareNavFromSanity(): Promise<NavMenuItem[]> {
  const docs = await sanityFetch<
    (Parameters<typeof mapCustomSoftwareNavItem>[0] & {
      showInNav?: boolean;
      order: number;
    })[]
  >({ query: CUSTOM_SOFTWARE_QUERY });
  return docs
    .filter((d) => d.showInNav !== false)
    .map(mapCustomSoftwareNavItem);
}

export async function fetchCustomSoftwareBySlugFromSanity(
  slug: string,
): Promise<import("@/lib/types/custom-software").CustomSoftware | null> {
  const doc = await sanityFetch<Parameters<typeof mapCustomSoftware>[0] | null>({
    query: CUSTOM_SOFTWARE_BY_SLUG_QUERY,
    params: { slug },
  });
  return doc ? mapCustomSoftware(doc) : null;
}

export async function fetchAllCustomSoftwareFromSanity(): Promise<
  import("@/lib/types/custom-software").CustomSoftware[]
> {
  const docs = await sanityFetch<Parameters<typeof mapCustomSoftware>[0][]>({
    query: CUSTOM_SOFTWARE_QUERY,
  });
  return docs.filter((doc) => doc.slug).map(mapCustomSoftware);
}

export async function fetchCustomSoftwareGroupsFromSanity(): Promise<
  CustomSoftwareGroupSection[]
> {
  const docs = await sanityFetch<
    Parameters<typeof buildCustomSoftwareGroups>[0]
  >({ query: CUSTOM_SOFTWARE_QUERY });
  return buildCustomSoftwareGroups(docs.filter((d) => d.sectionId));
}

export async function fetchAllMigrationsFromSanity(): Promise<Migration[]> {
  const docs = await sanityFetch<Parameters<typeof mapMigration>[0][]>({
    query: MIGRATIONS_QUERY,
  });
  return docs.map(mapMigration);
}

export async function fetchMigrationBySlugFromSanity(
  slug: string,
): Promise<Migration | null> {
  const doc = await sanityFetch<Parameters<typeof mapMigration>[0] | null>({
    query: MIGRATION_BY_SLUG_QUERY,
    params: { slug },
  });
  return doc ? mapMigration(doc) : null;
}

export async function fetchIndustryParentsFromSanity(): Promise<IndustryParent[]> {
  const docs = await sanityFetch<Parameters<typeof mapIndustryParent>[0][]>({
    query: INDUSTRY_PARENTS_QUERY,
  });
  return docs.map(mapIndustryParent);
}

export async function fetchAllIndustriesFromSanity(): Promise<Industry[]> {
  const docs = await sanityFetch<Parameters<typeof mapIndustry>[0][]>({
    query: INDUSTRIES_QUERY,
  });
  return docs.map(mapIndustry);
}

export async function fetchIndustryParentBySlugFromSanity(
  slug: string,
): Promise<IndustryParent | null> {
  const doc = await sanityFetch<Parameters<typeof mapIndustryParent>[0] | null>(
    {
      query: INDUSTRY_PARENT_BY_SLUG_QUERY,
      params: { slug },
    },
  );
  return doc ? mapIndustryParent(doc) : null;
}

export async function fetchIndustryBySlugFromSanity(
  slug: string,
): Promise<Industry | null> {
  const doc = await sanityFetch<Parameters<typeof mapIndustry>[0] | null>({
    query: INDUSTRY_BY_SLUG_QUERY,
    params: { slug },
  });
  return doc ? mapIndustry(doc) : null;
}

export async function fetchIndustryNavItemsFromSanity(): Promise<NavMenuItem[]> {
  const docs = await sanityFetch<
    Parameters<typeof mapIndustryNavItem>[0][]
  >({ query: INDUSTRY_NAV_QUERY });
  return [...docs]
    .sort((a, b) => (a.navOrder ?? 999) - (b.navOrder ?? 999))
    .map((doc) => {
      const item = mapIndustryNavItem(doc);
      return {
        title: item.title,
        shortDescription: item.shortDescription,
        href: item.href,
      };
    });
}

export async function fetchAllPostsFromSanity(): Promise<Post[]> {
  const docs = await sanityFetch<Parameters<typeof mapPost>[0][]>({
    query: POSTS_QUERY,
  });
  return docs.map(mapPost);
}

export async function fetchPostBySlugFromSanity(
  slug: string,
): Promise<Post | null> {
  const doc = await sanityFetch<Parameters<typeof mapPost>[0] | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });
  return doc ? mapPost(doc) : null;
}

export async function fetchAuthorBySlugFromSanity(
  slug: string,
): Promise<Author | null> {
  const doc = await sanityFetch<Parameters<typeof mapAuthor>[0] | null>({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug },
  });
  return doc ? mapAuthor(doc) : null;
}

export async function fetchSiteSettingsFromSanity(): Promise<SiteSettings | null> {
  const doc = await sanityFetch<Parameters<typeof mapSiteSettings>[0] | null>({
    query: SITE_SETTINGS_QUERY,
  });
  return doc ? mapSiteSettings(doc) : null;
}

export async function fetchAllCaseStudiesFromSanity(): Promise<CaseStudy[]> {
  const docs = await sanityFetch<Parameters<typeof mapCaseStudy>[0][]>({
    query: CASE_STUDIES_QUERY,
  });
  return docs.map(mapCaseStudy);
}

export async function fetchCaseStudyBySlugFromSanity(
  slug: string,
): Promise<CaseStudy | null> {
  const doc = await sanityFetch<Parameters<typeof mapCaseStudy>[0] | null>({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
  });
  return doc ? mapCaseStudy(doc) : null;
}

export async function fetchPortfolioProjectsFromSanity(): Promise<PortfolioProject[]> {
  const docs = await sanityFetch<Parameters<typeof mapPortfolioProject>[0][]>({
    query: PORTFOLIO_PROJECTS_QUERY,
  });
  return docs.map(mapPortfolioProject);
}

export async function fetchAllProductsFromSanity(): Promise<Product[]> {
  const docs = await sanityFetch<Parameters<typeof mapProduct>[0][]>({
    query: PRODUCTS_QUERY,
  });
  return docs.map(mapProduct);
}

export async function fetchTestimonialsFromSanity(): Promise<Testimonial[]> {
  const docs = await sanityFetch<Parameters<typeof mapTestimonial>[0][]>({
    query: TESTIMONIALS_QUERY,
  });
  return docs.map(mapTestimonial);
}

export async function fetchAllFaqsFromSanity(): Promise<FaqItem[]> {
  const docs = await sanityFetch<Parameters<typeof mapFaq>[0][]>({
    query: FAQS_QUERY,
  });
  return docs.map(mapFaq);
}
