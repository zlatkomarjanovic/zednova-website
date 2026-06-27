/**
 * Content queries — Sanity CMS with static fallback when CMS is empty or unavailable.
 */
import { services } from "@/lib/content/services";
import { ecommerceNavServices } from "@/lib/content/ecommerce-nav";
import { migrations as staticMigrations } from "@/lib/content/migrations";
import { resolveMigrationPlatformIcons } from "@/lib/migrations/platform-icons";
import { industryParents } from "@/lib/content/industry-parents";
import { industries } from "@/lib/content/industry-subs";
import { caseStudies as staticCaseStudies } from "@/lib/content/case-studies";
import { portfolioProjects as staticPortfolioProjects } from "@/lib/content/portfolio-projects";
import { posts as postsStatic } from "@/lib/content/posts";
import { products as staticProducts } from "@/lib/content/products";
import { testimonials as staticTestimonials } from "@/lib/content/testimonials";
import { siteSettings as staticSiteSettings } from "@/lib/content/site";
import { team } from "@/lib/content/team";
import { homepageIndustries as staticHomepageIndustries } from "@/lib/content/homepage-industries";
import type { HomepageIndustry } from "@/lib/content/homepage-industries";
import {
  isIndustryParentRecord,
  isIndustrySegment,
  mergeIndustryRecord,
} from "@/lib/industry-content";
import { customSoftwareItems, customSoftwareBySlug } from "@/lib/content/custom-software-items";
import {
  customSoftwareGroups as staticCustomSoftwareGroups,
  customSoftwareNavItems as staticCustomSoftwareNavItems,
  serviceMegaMenuCards as staticServiceMegaMenuCards,
  serviceNavGroups as staticServiceNavGroups,
} from "@/lib/content/nav-menu";
import type { CustomSoftware } from "@/lib/types/custom-software";
import type {
  CustomSoftwareGroupSection,
  Migration,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
import type {
  CaseStudy,
  Industry,
  IndustryCategory,
  IndustryParent,
  Post,
  Product,
  PortfolioProject,
  Author,
  Service,
  ServiceGroup,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/lib/types";
import {
  fetchAllIndustriesFromSanity,
  fetchAllMigrationsFromSanity,
  fetchAllServicesFromSanity,
  fetchCustomSoftwareGroupsFromSanity,
  fetchCustomSoftwareNavFromSanity,
  fetchCustomSoftwareBySlugFromSanity,
  fetchAllCustomSoftwareFromSanity,
  fetchIndustryBySlugFromSanity,
  fetchIndustryNavItemsFromSanity,
  fetchIndustryParentBySlugFromSanity,
  fetchIndustryParentsFromSanity,
  fetchMigrationBySlugFromSanity,
  fetchAllPostsFromSanity,
  fetchAllCaseStudiesFromSanity,
  fetchAllFaqsFromSanity,
  fetchAllProductsFromSanity,
  fetchAuthorBySlugFromSanity,
  fetchCaseStudyBySlugFromSanity,
  fetchPortfolioProjectsFromSanity,
  fetchPostBySlugFromSanity,
  fetchSiteSettingsFromSanity,
  fetchTestimonialsFromSanity,
  fetchServiceBySlugFromSanity,
  fetchServiceMegaMenuCardsFromSanity,
  fetchServiceNavGroupsFromSanity,
  sanityHasContent,
} from "@/sanity/fetchers";
import { isSanityConfigured } from "@/sanity/env";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

function enrichMigration(migration: Migration): Migration {
  return {
    ...migration,
    platformIcons:
      migration.platformIcons ??
      resolveMigrationPlatformIcons({
        fromIcons: migration.fromIcons,
        toIcons: migration.toIcons,
      }) ??
      undefined,
  };
}

async function fromSanity<T>(
  type: string,
  fetcher: () => Promise<T>,
  fallback: () => T,
): Promise<T> {
  if (!isSanityConfigured()) return fallback();
  try {
    const has = await sanityHasContent(type);
    if (!has) return fallback();
    return await fetcher();
  } catch {
    return fallback();
  }
}

/* ----------------------------- Services ----------------------------- */

export async function getAllServices(): Promise<Service[]> {
  return fromSanity("service", fetchAllServicesFromSanity, () =>
    [...services].sort(byOrder),
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!isSanityConfigured()) {
    return services.find((s) => s.slug === slug) ?? null;
  }
  try {
    const has = await sanityHasContent("service");
    if (!has) return services.find((s) => s.slug === slug) ?? null;
    return (await fetchServiceBySlugFromSanity(slug)) ?? null;
  } catch {
    return services.find((s) => s.slug === slug) ?? null;
  }
}

export async function getServicesBySlugs(slugs: string[]): Promise<Service[]> {
  const all = await getAllServices();
  return slugs
    .map((slug) => all.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}

export async function getServiceGroups(): Promise<
  { group: ServiceGroup; services: Service[] }[]
> {
  const allServices = await getAllServices();
  const groups: ServiceGroup[] = [
    "Websites",
    "Automation",
    "AI Tools",
    "Ecommerce",
  ];
  return groups.map((group) => ({
    group,
    services:
      group === "Ecommerce"
        ? [...ecommerceNavServices].sort(byOrder)
        : [...allServices].sort(byOrder).filter((s) => s.group === group),
  }));
}

export async function getServiceNavGroups(): Promise<NavMenuGroup[]> {
  return fromSanity("serviceNavItem", fetchServiceNavGroupsFromSanity, () =>
    staticServiceNavGroups,
  );
}

export async function getServiceMegaMenuCards(): Promise<ServiceMegaMenuCard[]> {
  return fromSanity(
    "serviceMegaMenuCard",
    fetchServiceMegaMenuCardsFromSanity,
    () => staticServiceMegaMenuCards,
  );
}

/* ----------------------------- Custom software ----------------------------- */

export async function getCustomSoftwareNavItems(): Promise<NavMenuItem[]> {
  return fromSanity("customSoftware", fetchCustomSoftwareNavFromSanity, () =>
    staticCustomSoftwareNavItems,
  );
}

export async function getCustomSoftwareGroups(): Promise<
  CustomSoftwareGroupSection[]
> {
  return fromSanity(
    "customSoftware",
    fetchCustomSoftwareGroupsFromSanity,
    () => staticCustomSoftwareGroups,
  );
}

const staticCustomSoftwareItems: CustomSoftware[] = customSoftwareItems;

function mergeCustomSoftware(
  staticItem: CustomSoftware | null,
  cms: CustomSoftware | null,
): CustomSoftware | null {
  if (!staticItem && !cms) return null;
  if (!cms) return staticItem;
  if (!staticItem) return cms;
  return {
    ...staticItem,
    ...cms,
    slug: cms.slug || staticItem.slug,
    title: cms.title || staticItem.title,
    shortDescription: cms.shortDescription || staticItem.shortDescription,
    whatItIs: cms.whatItIs || staticItem.whatItIs,
    problemSolved: cms.problemSolved || staticItem.problemSolved,
    targetAudience: cms.targetAudience?.length
      ? cms.targetAudience
      : staticItem.targetAudience,
    keyFeatures: cms.keyFeatures?.length ? cms.keyFeatures : staticItem.keyFeatures,
    whatsIncluded: cms.whatsIncluded?.length ? cms.whatsIncluded : staticItem.whatsIncluded,
    deliverables: cms.deliverables?.length ? cms.deliverables : staticItem.deliverables,
    technologies: cms.technologies?.length ? cms.technologies : staticItem.technologies,
    integrations: cms.integrations?.length ? cms.integrations : staticItem.integrations,
    processSteps: cms.processSteps?.length ? cms.processSteps : staticItem.processSteps,
    timeline: cms.timeline || staticItem.timeline,
    startingPrice: cms.startingPrice ?? staticItem.startingPrice,
    faqs: cms.faqs?.length ? cms.faqs : staticItem.faqs,
    relatedServices: cms.relatedServices?.length
      ? cms.relatedServices
      : staticItem.relatedServices,
    relatedIndustries: cms.relatedIndustries?.length
      ? cms.relatedIndustries
      : staticItem.relatedIndustries,
    relatedCaseStudies: cms.relatedCaseStudies?.length
      ? cms.relatedCaseStudies
      : staticItem.relatedCaseStudies,
    relatedPortfolioProjects: cms.relatedPortfolioProjects?.length
      ? cms.relatedPortfolioProjects
      : staticItem.relatedPortfolioProjects,
    relatedInsights: cms.relatedInsights?.length
      ? cms.relatedInsights
      : staticItem.relatedInsights,
    image: cms.image || staticItem.image,
    seo: cms.seo ?? staticItem.seo,
  };
}

export async function getAllCustomSoftwareSlugs(): Promise<string[]> {
  const items = await getAllCustomSoftware();
  return items.map((item) => item.slug);
}

export async function getAllCustomSoftware(): Promise<CustomSoftware[]> {
  const staticItems = staticCustomSoftwareItems;
  if (!isSanityConfigured()) return [...staticItems].sort(byOrder);

  try {
    const has = await sanityHasContent("customSoftware");
    if (!has) return [...staticItems].sort(byOrder);

    const cmsItems = await fetchAllCustomSoftwareFromSanity();
    const merged = new Map<string, CustomSoftware>();

    for (const item of staticItems) merged.set(item.slug, item);
    for (const cms of cmsItems) {
      const existing = merged.get(cms.slug);
      merged.set(cms.slug, existing ? mergeCustomSoftware(existing, cms)! : cms);
    }

    return [...merged.values()].sort(byOrder);
  } catch {
    return [...staticItems].sort(byOrder);
  }
}

export async function getCustomSoftwareBySlug(
  slug: string,
): Promise<CustomSoftware | null> {
  const staticItem = customSoftwareBySlug.get(slug) ?? null;
  if (!isSanityConfigured()) return staticItem;
  try {
    const has = await sanityHasContent("customSoftware");
    if (!has) return staticItem;
    const cms = await fetchCustomSoftwareBySlugFromSanity(slug);
    return mergeCustomSoftware(staticItem, cms);
  } catch {
    return staticItem;
  }
}

export async function getCustomSoftwareRelatedPortfolioProjects(
  item: Pick<
    CustomSoftware,
    "slug" | "relatedCaseStudies" | "relatedPortfolioProjects" | "relatedServices"
  >,
  limit = 4,
): Promise<PortfolioProject[]> {
  const allPortfolio = await getPortfolioProjects();
  const ordered: PortfolioProject[] = [];
  const seen = new Set<string>();

  const push = (projects: PortfolioProject[]) => {
    for (const project of projects) {
      if (seen.has(project.slug)) continue;
      seen.add(project.slug);
      ordered.push(project);
    }
  };

  if (item.relatedPortfolioProjects?.length) {
    const slugs = new Set(item.relatedPortfolioProjects);
    push(allPortfolio.filter((project) => slugs.has(project.slug)));
  }

  if (item.relatedCaseStudies?.length) {
    const caseSlugs = new Set(item.relatedCaseStudies);
    push(
      allPortfolio.filter((project) =>
        project.relatedCaseStudies?.some((slug) => caseSlugs.has(slug)),
      ),
    );
  }

  push(allPortfolio.filter((project) => project.servicesUsed?.includes(item.slug)));

  if (ordered.length === 0 && item.relatedServices?.length) {
    push(
      allPortfolio.filter((project) =>
        project.servicesUsed?.some((slug) => item.relatedServices!.includes(slug)),
      ),
    );
  }

  return ordered.slice(0, limit);
}

/* ----------------------------- Migrations ----------------------------- */

export async function getAllMigrations(): Promise<Migration[]> {
  const items = await fromSanity("migration", fetchAllMigrationsFromSanity, () =>
    [...staticMigrations].sort(byOrder),
  );
  return items.map(enrichMigration);
}

export async function getMigrationBySlug(
  slug: string,
): Promise<Migration | null> {
  if (!isSanityConfigured()) {
    const item = staticMigrations.find((m) => m.slug === slug) ?? null;
    return item ? enrichMigration(item) : null;
  }
  try {
    const has = await sanityHasContent("migration");
    if (!has) {
      const item = staticMigrations.find((m) => m.slug === slug) ?? null;
      return item ? enrichMigration(item) : null;
    }
    const item = (await fetchMigrationBySlugFromSanity(slug)) ?? null;
    return item ? enrichMigration(item) : null;
  } catch {
    const item = staticMigrations.find((m) => m.slug === slug) ?? null;
    return item ? enrichMigration(item) : null;
  }
}

/* ----------------------------- Industries ----------------------------- */

export async function getIndustryNavItems(): Promise<NavMenuItem[]> {
  const staticParentNavItems: NavMenuItem[] = industryParents.map((parent) => ({
    title: parent.title,
    shortDescription: parent.shortDescription,
    href: `/industries/${parent.slug}`,
  }));

  if (!isSanityConfigured()) return staticParentNavItems;

  try {
    const has = await sanityHasContent("industryParent");
    if (!has) return staticParentNavItems;

    const fromCms = await fetchIndustryNavItemsFromSanity();
    const cmsBySlug = new Map(
      fromCms.map((item) => [
        item.href.replace(/^\/industries\//, ""),
        item,
      ]),
    );

    return industryParents.map((parent) => {
      const cms = cmsBySlug.get(parent.slug);
      return {
        title: cms?.title ?? parent.title,
        shortDescription: cms?.shortDescription ?? parent.shortDescription,
        href: `/industries/${parent.slug}`,
      };
    });
  } catch {
    return staticParentNavItems;
  }
}

export async function getHomepageIndustries(): Promise<HomepageIndustry[]> {
  const [navItems, parents, subs] = await Promise.all([
    getIndustryNavItems(),
    getIndustryParents(),
    getAllIndustries(),
  ]);

  const featuredSlugs = new Set(
    staticHomepageIndustries
      .filter((item) => item.featured)
      .map((item) => item.href.replace(/^\/industries\//, "")),
  );

  return navItems.map((item) => {
    const slug = item.href.replace(/^\/industries\//, "");
    const segment =
      subs.find((industry) => industry.slug === slug) ??
      parents.find((parent) => parent.slug === slug);
    const staticMatch = staticHomepageIndustries.find(
      (entry) => entry.href === item.href,
    );

    return {
      title: item.title,
      shortDescription: item.shortDescription,
      href: item.href,
      icon: segment?.icon ?? staticMatch?.icon ?? "business",
      popularServices: segment
        ? segment.popularServices.map((link) => link.label).slice(0, 4)
        : (staticMatch?.popularServices ?? []),
      featured: featuredSlugs.has(slug),
    };
  });
}

export async function getFeaturedHomepageIndustries(): Promise<HomepageIndustry[]> {
  const industries = await getHomepageIndustries();
  return industries.filter((item) => item.featured);
}

export async function getContactServiceOptions(): Promise<
  { value: string; label: string }[]
> {
  const allServices = await getAllServices();
  return [
    ...allServices.map((service) => ({
      value: service.slug,
      label: service.title,
    })),
    { value: "multiple", label: "Multiple services" },
    { value: "not-sure", label: "Not sure yet" },
  ];
}

export async function getContactIndustryOptions(): Promise<
  { value: string; label: string }[]
> {
  const navItems = await getIndustryNavItems();
  return [
    ...navItems.map((item) => ({
      value: item.href.replace(/^\/industries\//, ""),
      label: item.title,
    })),
    { value: "other", label: "Other / not listed" },
  ];
}

export async function labelForService(value: string): Promise<string> {
  const options = await getContactServiceOptions();
  return options.find((option) => option.value === value)?.label ?? value;
}

export async function labelForIndustry(value: string): Promise<string> {
  const options = await getContactIndustryOptions();
  return options.find((option) => option.value === value)?.label ?? value;
}

export async function getIndustryParents(): Promise<IndustryParent[]> {
  const staticSorted = [...industryParents].sort(byOrder);
  if (!isSanityConfigured()) return staticSorted;
  try {
    const has = await sanityHasContent("industryParent");
    if (!has) return staticSorted;
    const fromCms = await fetchIndustryParentsFromSanity();
    const cmsBySlug = new Map(fromCms.map((parent) => [parent.slug, parent]));
    return staticSorted.map((parent) =>
      mergeIndustryRecord(parent, cmsBySlug.get(parent.slug)),
    );
  } catch {
    return staticSorted;
  }
}

export async function getAllIndustries(): Promise<Industry[]> {
  const parentSlugs = new Set(industryParents.map((parent) => parent.slug));
  const staticSorted = industries
    .filter((industry) => parentSlugs.has(industry.parentSlug))
    .sort(byOrder);
  if (!isSanityConfigured()) return staticSorted;
  try {
    const has = await sanityHasContent("industry");
    if (!has) return staticSorted;
    const fromCms = await fetchAllIndustriesFromSanity();
    const cmsBySlug = new Map(
      fromCms
        .filter((industry) => parentSlugs.has(industry.parentSlug))
        .map((industry) => [industry.slug, industry]),
    );
    return staticSorted.map((industry) =>
      mergeIndustryRecord(industry, cmsBySlug.get(industry.slug)),
    );
  } catch {
    return staticSorted;
  }
}

export async function getIndustryGroups(): Promise<
  { parent: IndustryParent; industries: Industry[] }[]
> {
  const parents = await getIndustryParents();
  const subs = await getAllIndustries();

  return parents.sort(byOrder).map((parent) => ({
    parent,
    industries: subs
      .filter((i) => i.parentSlug === parent.slug)
      .sort(byOrder),
  }));
}

export async function getIndustryParentBySlug(
  slug: string,
): Promise<IndustryParent | null> {
  const staticParent = industryParents.find((p) => p.slug === slug) ?? null;
  if (!isSanityConfigured()) return staticParent;
  try {
    const has = await sanityHasContent("industryParent");
    if (!has) return staticParent;
    const cms = await fetchIndustryParentBySlugFromSanity(slug);
    if (!staticParent) return cms;
    return mergeIndustryRecord(staticParent, cms);
  } catch {
    return staticParent;
  }
}

export async function getIndustryBySlug(
  slug: string,
): Promise<Industry | null> {
  const staticIndustry = industries.find((i) => i.slug === slug) ?? null;
  if (!isSanityConfigured()) return staticIndustry;
  try {
    const has = await sanityHasContent("industry");
    if (!has) return staticIndustry;
    const cms = await fetchIndustryBySlugFromSanity(slug);
    if (!staticIndustry) return cms;
    return mergeIndustryRecord(staticIndustry, cms);
  } catch {
    return staticIndustry;
  }
}

export async function getIndustrySegmentBySlug(
  slug: string,
): Promise<IndustryParent | Industry | null> {
  return (
    (await getIndustryParentBySlug(slug)) ?? (await getIndustryBySlug(slug))
  );
}

export async function getIndustryTitle(slug: string): Promise<string> {
  const segment = await getIndustrySegmentBySlug(slug);
  return segment?.title ?? slug;
}

export async function getAllIndustrySlugs(): Promise<string[]> {
  const [parents, subs] = await Promise.all([
    getIndustryParents(),
    getAllIndustries(),
  ]);
  return [...parents.map((p) => p.slug), ...subs.map((i) => i.slug)];
}

export type IndustryPageData = {
  industry: IndustryParent | Industry;
  isParent: boolean;
  parent: IndustryParent | null;
  subIndustries: Industry[];
  siblingIndustries: Industry[];
  relatedCaseStudies: CaseStudy[];
  relatedInsights: Post[];
};

export async function getIndustryPageData(
  slug: string,
): Promise<IndustryPageData | null> {
  const industry = await getIndustrySegmentBySlug(slug);
  if (!industry) return null;

  const isParent = isIndustryParentRecord(industry);
  const isSub = isIndustrySegment(industry);
  const parent = isSub
    ? await getIndustryParentBySlug(industry.parentSlug)
    : industry;

  const allSegments = await getAllIndustries();
  const subIndustries = isParent
    ? allSegments.filter((item) => item.parentSlug === slug)
    : [];
  const siblingIndustries = isSub
    ? allSegments.filter(
        (item) => item.parentSlug === industry.parentSlug && item.slug !== slug,
      )
    : [];

  const allCaseStudies = await getAllCaseStudies();
  const relatedCaseStudies =
    industry.relatedCaseStudies && industry.relatedCaseStudies.length > 0
      ? allCaseStudies.filter((study) =>
          industry.relatedCaseStudies!.includes(study.slug),
        )
      : await getCaseStudiesByIndustry(slug);

  const allPosts = await getAllPosts();
  const relatedInsights =
    industry.relatedInsights && industry.relatedInsights.length > 0
      ? allPosts.filter((post) => industry.relatedInsights!.includes(post.slug))
      : await getInsightsByIndustry(slug, 3);

  return {
    industry,
    isParent,
    parent,
    subIndustries,
    siblingIndustries,
    relatedCaseStudies,
    relatedInsights,
  };
}

/* ----------------------------- Case studies ----------------------------- */

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return fromSanity("caseStudy", fetchAllCaseStudiesFromSanity, () => staticCaseStudies);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isSanityConfigured()) {
    return staticCaseStudies.find((c) => c.slug === slug) ?? null;
  }
  try {
    const has = await sanityHasContent("caseStudy");
    if (!has) return staticCaseStudies.find((c) => c.slug === slug) ?? null;
    return (await fetchCaseStudyBySlugFromSanity(slug)) ?? null;
  } catch {
    return staticCaseStudies.find((c) => c.slug === slug) ?? null;
  }
}

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudy[]> {
  const all = await getAllCaseStudies();
  return all.filter((c) => c.featured).slice(0, limit);
}

export async function getCaseStudiesByService(
  serviceSlug: string,
  limit = 2,
): Promise<CaseStudy[]> {
  const all = await getAllCaseStudies();
  return all.filter((c) => c.servicesUsed.includes(serviceSlug)).slice(0, limit);
}

export async function getServiceRelatedPortfolioProjects(
  service: Pick<Service, "slug" | "relatedCaseStudies">,
  limit = 4,
): Promise<PortfolioProject[]> {
  const allPortfolio = await getPortfolioProjects();
  const ordered: PortfolioProject[] = [];
  const seen = new Set<string>();

  const push = (items: PortfolioProject[]) => {
    for (const project of items) {
      if (seen.has(project.slug)) continue;
      seen.add(project.slug);
      ordered.push(project);
    }
  };

  if (service.relatedCaseStudies?.length) {
    const caseSlugs = new Set(service.relatedCaseStudies);
    push(
      allPortfolio.filter((project) =>
        project.relatedCaseStudies?.some((slug) => caseSlugs.has(slug)),
      ),
    );
  }

  push(allPortfolio.filter((project) => project.servicesUsed?.includes(service.slug)));

  if (ordered.length === 0) {
    const relatedCases = await getCaseStudiesByService(service.slug, limit);
    const caseSlugs = new Set(relatedCases.map((study) => study.slug));
    push(
      allPortfolio.filter((project) =>
        project.relatedCaseStudies?.some((slug) => caseSlugs.has(slug)),
      ),
    );
  }

  return ordered.slice(0, limit);
}

export async function getIndustryRelatedPortfolioProjects(
  industry: Pick<IndustryParent | Industry, "slug" | "relatedCaseStudies">,
  limit = 4,
): Promise<PortfolioProject[]> {
  const allPortfolio = await getPortfolioProjects();
  const ordered: PortfolioProject[] = [];
  const seen = new Set<string>();

  const push = (items: PortfolioProject[]) => {
    for (const project of items) {
      if (seen.has(project.slug)) continue;
      seen.add(project.slug);
      ordered.push(project);
    }
  };

  if (industry.relatedCaseStudies?.length) {
    const caseSlugs = new Set(industry.relatedCaseStudies);
    push(
      allPortfolio.filter((project) =>
        project.relatedCaseStudies?.some((slug) => caseSlugs.has(slug)),
      ),
    );
  }

  push(
    allPortfolio.filter((project) =>
      project.relatedIndustries?.includes(industry.slug),
    ),
  );

  if (ordered.length === 0) {
    const relatedCases = await getCaseStudiesByIndustry(industry.slug, limit);
    const caseSlugs = new Set(relatedCases.map((study) => study.slug));
    push(
      allPortfolio.filter((project) =>
        project.relatedCaseStudies?.some((slug) => caseSlugs.has(slug)),
      ),
    );
  }

  return ordered.slice(0, limit);
}

export async function getCaseStudiesByIndustry(
  industrySlug: string,
  limit = 2,
): Promise<CaseStudy[]> {
  const subs = await getAllIndustries();
  const subSlugs = subs
    .filter((i) => i.parentSlug === industrySlug)
    .map((i) => i.slug);
  const all = await getAllCaseStudies();

  return all
    .filter(
      (c) =>
        c.industry === industrySlug ||
        subSlugs.includes(c.industry) ||
        subs.find((i) => i.slug === c.industry)?.parentSlug === industrySlug,
    )
    .slice(0, limit);
}

/* ----------------------------- Portfolio ----------------------------- */

export async function getPortfolioProjects() {
  return fromSanity(
    "portfolioProject",
    fetchPortfolioProjectsFromSanity,
    () => staticPortfolioProjects,
  );
}

/* ----------------------------- Posts ----------------------------- */

export async function getAllPosts(): Promise<Post[]> {
  const all = await fromSanity("post", fetchAllPostsFromSanity, () => postsStatic);
  return [...all].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  let post: Post | null = null;
  if (!isSanityConfigured()) {
    post = postsStatic.find((p) => p.slug === slug) ?? null;
  } else {
    try {
      const has = await sanityHasContent("post");
      if (!has) post = postsStatic.find((p) => p.slug === slug) ?? null;
      else post = (await fetchPostBySlugFromSanity(slug)) ?? null;
    } catch {
      post = postsStatic.find((p) => p.slug === slug) ?? null;
    }
  }
  if (!post) return null;
  const { normalizeInsightPost } = await import("@/lib/insights/normalize-post");
  return normalizeInsightPost(post);
}

export async function getFeaturedPost(): Promise<Post> {
  const all = await getAllPosts();
  return all.find((p) => p.pinned) ?? all.find((p) => p.featured) ?? all[0];
}

export type InsightsNavPosts = {
  featured: Post;
  latest: Post[];
};

export async function getInsightsNavPosts(): Promise<InsightsNavPosts | null> {
  const all = await getAllPosts();
  if (all.length === 0) return null;

  const featured =
    all.find((p) => p.pinned) ?? all.find((p) => p.featured) ?? all[0];
  const latest = all.filter((p) => p.slug !== featured.slug).slice(0, 4);

  return { featured, latest };
}

export async function getAuthor(slug: string): Promise<Author | null> {
  if (!isSanityConfigured()) {
    const member = team.find((m) => m.slug === slug);
    return member ?? null;
  }
  try {
    const has = await sanityHasContent("author");
    if (!has) return team.find((m) => m.slug === slug) ?? null;
    return (await fetchAuthorBySlugFromSanity(slug)) ?? team.find((m) => m.slug === slug) ?? null;
  } catch {
    return team.find((m) => m.slug === slug) ?? null;
  }
}

export async function getAdjacentPosts(
  slug: string,
): Promise<{ previous: Post | null; next: Post | null }> {
  const sorted = await getAllPosts();
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index + 1 < sorted.length ? sorted[index + 1] : null,
    next: index - 1 >= 0 ? sorted[index - 1] : null,
  };
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  return getRelatedInsights(slug, limit);
}

/* ----------------------------- Products ----------------------------- */

export async function getAllProducts(): Promise<Product[]> {
  return fromSanity("product", fetchAllProductsFromSanity, () =>
    [...staticProducts].sort(byOrder),
  );
}

export async function getProductsByType(
  type: string,
): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => (p.type ?? "software") === type);
}

export async function getProductsByService(
  serviceSlug: string,
  limit?: number,
): Promise<Product[]> {
  const all = await getAllProducts();
  const filtered = all.filter((p) => p.relatedServices?.includes(serviceSlug));
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getProductsByIndustry(
  industrySlug: string,
  limit?: number,
): Promise<Product[]> {
  const all = await getAllProducts();
  const filtered = all.filter((p) => p.relatedIndustries?.includes(industrySlug));
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getInsightsByService(
  serviceSlug: string,
  limit?: number,
): Promise<Post[]> {
  const all = await getAllPosts();
  const filtered = all.filter((p) => p.relatedServices?.includes(serviceSlug));
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getInsightsByIndustry(
  industrySlug: string,
  limit?: number,
): Promise<Post[]> {
  const all = await getAllPosts();
  const filtered = all.filter((p) => p.relatedIndustries?.includes(industrySlug));
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getInsightsByMigration(
  migrationSlug: string,
  limit?: number,
): Promise<Post[]> {
  const all = await getAllPosts();
  const filtered = all.filter((p) => p.relatedMigrations?.includes(migrationSlug));
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getInsightsByProduct(
  productSlug: string,
  limit?: number,
): Promise<Post[]> {
  const all = await getAllPosts();
  const filtered = all.filter((p) => p.relatedProducts?.includes(productSlug));
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getRelatedInsights(
  slug: string,
  limit = 3,
): Promise<Post[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.filter((p) => p.slug !== slug).slice(0, limit);

  // First, use explicit multirefs (relatedPosts)
  const explicit = current.relatedPosts
    ? current.relatedPosts
        .map((s) => all.find((p) => p.slug === s))
        .filter((p): p is Post => Boolean(p))
    : [];

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Then, score by shared services/industries/migrations/category/tags
  const scored = all
    .filter((p) => p.slug !== slug && !explicit.includes(p))
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 2;
      score += p.tags.filter((t) => current.tags.includes(t)).length;
      if (p.relatedServices && current.relatedServices)
        score += p.relatedServices.filter((s) => current.relatedServices!.includes(s)).length * 2;
      if (p.relatedIndustries && current.relatedIndustries)
        score += p.relatedIndustries.filter((s) => current.relatedIndustries!.includes(s)).length * 2;
      if (p.relatedMigrations && current.relatedMigrations)
        score += p.relatedMigrations.filter((s) => current.relatedMigrations!.includes(s)).length;
      if (p.relatedCaseStudies && current.relatedCaseStudies)
        score += p.relatedCaseStudies.filter((s) => current.relatedCaseStudies!.includes(s)).length * 2;
      if (p.relatedCustomSoftware && current.relatedCustomSoftware)
        score += p.relatedCustomSoftware.filter((s) => current.relatedCustomSoftware!.includes(s)).length * 2;
      if (p.relatedProducts && current.relatedProducts)
        score += p.relatedProducts.filter((s) => current.relatedProducts!.includes(s)).length;
      if (p.relatedPortfolioProjects && current.relatedPortfolioProjects)
        score += p.relatedPortfolioProjects.filter((s) =>
          current.relatedPortfolioProjects!.includes(s),
        ).length;
      return { post: p, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        +new Date(b.post.publishedAt) - +new Date(a.post.publishedAt),
    );

  return [...explicit, ...scored.map((s) => s.post)].slice(0, limit);
}

/* ----------------------------- Testimonials ----------------------------- */

const staticTestimonialImages = (() => {
  const byId = new Map<string, string>();
  const byAuthor = new Map<string, string>();

  for (const testimonial of staticTestimonials) {
    if (!testimonial.image) continue;
    byId.set(testimonial.id, testimonial.image);
    byId.set(`testimonial-${testimonial.id}`, testimonial.image);
    byAuthor.set(testimonial.authorName.toLowerCase(), testimonial.image);
  }

  return { byId, byAuthor };
})();

function applyTestimonialImageFallback(items: Testimonial[]): Testimonial[] {
  return items.map((testimonial) => {
    if (testimonial.image) return testimonial;

    const image =
      staticTestimonialImages.byId.get(testimonial.id) ??
      staticTestimonialImages.byId.get(testimonial.id.replace(/^testimonial-/, "")) ??
      staticTestimonialImages.byAuthor.get(testimonial.authorName.toLowerCase());

    return image ? { ...testimonial, image } : testimonial;
  });
}

async function getAllTestimonials(): Promise<Testimonial[]> {
  const all = await fromSanity("testimonial", fetchTestimonialsFromSanity, () =>
    staticTestimonials,
  );
  return applyTestimonialImageFallback(all);
}

export async function getPlatformTestimonials(): Promise<Testimonial[]> {
  const all = await getAllTestimonials();
  return all.filter((t) => t.platform);
}

export async function getTestimonialById(
  id: string,
): Promise<Testimonial | null> {
  const all = await getAllTestimonials();
  return all.find((t) => t.id === id || t.id === `testimonial-${id}`) ?? null;
}

/* ----------------------------- Team & settings ----------------------------- */

export async function getFounder(): Promise<TeamMember> {
  return team[0];
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  return team.find((m) => m.slug === slug) ?? null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured()) return staticSiteSettings;
  try {
    const has = await sanityHasContent("siteSettings");
    if (!has) return staticSiteSettings;
    return (await fetchSiteSettingsFromSanity()) ?? staticSiteSettings;
  } catch {
    return staticSiteSettings;
  }
}

/* ----------------------------- FAQ ----------------------------- */

export async function getAllFaqs() {
  const { faqs: staticFaqs } = await import("@/lib/content/faq");
  return fromSanity("faq", fetchAllFaqsFromSanity, () => [...staticFaqs].sort(byOrder));
}

export type {
  CustomSoftwareGroupSection,
  Migration,
  NavMenuGroup,
  NavMenuItem,
  ServiceMegaMenuCard,
} from "@/lib/types/content-nav";
