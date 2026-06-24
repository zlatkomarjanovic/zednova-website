/**
 * Content queries — Sanity CMS with static fallback when CMS is empty or unavailable.
 */
import { services } from "@/lib/content/services";
import { ecommerceNavServices } from "@/lib/content/ecommerce-nav";
import { migrations as staticMigrations } from "@/lib/content/migrations";
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
  customSoftwareGroups as staticCustomSoftwareGroups,
  customSoftwareNavItems as staticCustomSoftwareNavItems,
  industryNavItems as staticIndustryNavItems,
  serviceMegaMenuCards as staticServiceMegaMenuCards,
  serviceNavGroups as staticServiceNavGroups,
} from "@/lib/content/nav-menu";
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

const CATEGORY_ORDER: IndustryCategory[] = [
  "Healthcare Clinics",
  "Ecommerce & Shopify",
  "Small Business Custom Software",
];

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

/* ----------------------------- Migrations ----------------------------- */

export async function getAllMigrations(): Promise<Migration[]> {
  return fromSanity("migration", fetchAllMigrationsFromSanity, () =>
    [...staticMigrations].sort(byOrder),
  );
}

export async function getMigrationBySlug(
  slug: string,
): Promise<Migration | null> {
  if (!isSanityConfigured()) {
    return staticMigrations.find((m) => m.slug === slug) ?? null;
  }
  try {
    const has = await sanityHasContent("migration");
    if (!has) return staticMigrations.find((m) => m.slug === slug) ?? null;
    return (await fetchMigrationBySlugFromSanity(slug)) ?? null;
  } catch {
    return staticMigrations.find((m) => m.slug === slug) ?? null;
  }
}

/* ----------------------------- Industries ----------------------------- */

export async function getIndustryNavItems(): Promise<NavMenuItem[]> {
  return fromSanity("industry", fetchIndustryNavItemsFromSanity, () =>
    staticIndustryNavItems,
  );
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
  return fromSanity("industryParent", fetchIndustryParentsFromSanity, () =>
    [...industryParents].sort(byOrder),
  );
}

export async function getAllIndustries(): Promise<Industry[]> {
  return fromSanity("industry", fetchAllIndustriesFromSanity, () =>
    [...industries].sort(byOrder),
  );
}

export async function getIndustryGroups(): Promise<
  { category: IndustryCategory; parent: IndustryParent; industries: Industry[] }[]
> {
  const parents = await getIndustryParents();
  const subs = await getAllIndustries();

  return CATEGORY_ORDER.map((category) => {
    const parent = parents.find((p) => p.category === category)!;
    return {
      category,
      parent,
      industries: subs.filter((i) => i.category === category).sort(byOrder),
    };
  });
}

export async function getIndustryParentBySlug(
  slug: string,
): Promise<IndustryParent | null> {
  if (!isSanityConfigured()) {
    return industryParents.find((p) => p.slug === slug) ?? null;
  }
  try {
    const has = await sanityHasContent("industryParent");
    if (!has) return industryParents.find((p) => p.slug === slug) ?? null;
    return (await fetchIndustryParentBySlugFromSanity(slug)) ?? null;
  } catch {
    return industryParents.find((p) => p.slug === slug) ?? null;
  }
}

export async function getIndustryBySlug(
  slug: string,
): Promise<Industry | null> {
  if (!isSanityConfigured()) {
    return industries.find((i) => i.slug === slug) ?? null;
  }
  try {
    const has = await sanityHasContent("industry");
    if (!has) return industries.find((i) => i.slug === slug) ?? null;
    return (await fetchIndustryBySlugFromSanity(slug)) ?? null;
  } catch {
    return industries.find((i) => i.slug === slug) ?? null;
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
  if (!isSanityConfigured()) {
    return postsStatic.find((p) => p.slug === slug) ?? null;
  }
  try {
    const has = await sanityHasContent("post");
    if (!has) return postsStatic.find((p) => p.slug === slug) ?? null;
    return (await fetchPostBySlugFromSanity(slug)) ?? null;
  } catch {
    return postsStatic.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeaturedPost(): Promise<Post> {
  const all = await getAllPosts();
  return all.find((p) => p.featured) ?? all[0];
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
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.filter((p) => p.slug !== slug).slice(0, limit);

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 2;
      score += p.tags.filter((t) => current.tags.includes(t)).length;
      return { post: p, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        +new Date(b.post.publishedAt) - +new Date(a.post.publishedAt),
    );

  return scored.slice(0, limit).map((s) => s.post);
}

/* ----------------------------- Products ----------------------------- */

export async function getAllProducts(): Promise<Product[]> {
  return fromSanity("product", fetchAllProductsFromSanity, () =>
    [...staticProducts].sort(byOrder),
  );
}

/* ----------------------------- Testimonials ----------------------------- */

export async function getPlatformTestimonials(): Promise<Testimonial[]> {
  const all = await fromSanity("testimonial", fetchTestimonialsFromSanity, () =>
    staticTestimonials,
  );
  return all.filter((t) => t.platform);
}

export async function getTestimonialById(
  id: string,
): Promise<Testimonial | null> {
  const all = await fromSanity("testimonial", fetchTestimonialsFromSanity, () =>
    staticTestimonials,
  );
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
