/**
 * Content queries. These read the local typed content today and keep the exact
 * signatures the brief specifies, so they can be re-pointed at Sanity GROQ
 * queries later without changing a single page.
 */
import { services } from "@/lib/content/services";
import { ecommerceNavServices } from "@/lib/content/ecommerce-nav";
import { migrations } from "@/lib/content/migrations";
import { industryParents } from "@/lib/content/industry-parents";
import { industries } from "@/lib/content/industry-subs";
import { caseStudies } from "@/lib/content/case-studies";
import { posts } from "@/lib/content/posts";
import { products } from "@/lib/content/products";
import { testimonials } from "@/lib/content/testimonials";
import { team } from "@/lib/content/team";
import { siteSettings } from "@/lib/content/site";
import type {
  CaseStudy,
  Industry,
  IndustryCategory,
  IndustryParent,
  Post,
  Product,
  Service,
  ServiceGroup,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/lib/types";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

const CATEGORY_ORDER: IndustryCategory[] = [
  "Healthcare Clinics",
  "Ecommerce & Shopify",
  "Small Business Custom Software",
];

/* ----------------------------- Services ----------------------------- */

export async function getAllServices(): Promise<Service[]> {
  return [...services].sort(byOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getServicesBySlugs(slugs: string[]): Promise<Service[]> {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}

export async function getServiceGroups(): Promise<
  { group: ServiceGroup; services: Service[] }[]
> {
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
        : [...services].sort(byOrder).filter((s) => s.group === group),
  }));
}

export async function getAllMigrations() {
  return [...migrations].sort(byOrder);
}

/* ----------------------------- Industries ----------------------------- */

export async function getIndustryParents(): Promise<IndustryParent[]> {
  return [...industryParents].sort(byOrder);
}

export async function getAllIndustries(): Promise<Industry[]> {
  return [...industries].sort(byOrder);
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
  return industryParents.find((p) => p.slug === slug) ?? null;
}

export async function getIndustryBySlug(
  slug: string,
): Promise<Industry | null> {
  return industries.find((i) => i.slug === slug) ?? null;
}

export async function getIndustrySegmentBySlug(
  slug: string,
): Promise<IndustryParent | Industry | null> {
  return (
    (await getIndustryParentBySlug(slug)) ?? (await getIndustryBySlug(slug))
  );
}

export async function getIndustryTitle(slug: string): Promise<string> {
  return (
    industryParents.find((p) => p.slug === slug)?.title ??
    industries.find((i) => i.slug === slug)?.title ??
    slug
  );
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
  return caseStudies;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return caseStudies.find((c) => c.slug === slug) ?? null;
}

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudy[]> {
  return caseStudies.filter((c) => c.featured).slice(0, limit);
}

export async function getCaseStudiesByService(
  serviceSlug: string,
  limit = 2,
): Promise<CaseStudy[]> {
  return caseStudies
    .filter((c) => c.servicesUsed.includes(serviceSlug))
    .slice(0, limit);
}

export async function getCaseStudiesByIndustry(
  industrySlug: string,
  limit = 2,
): Promise<CaseStudy[]> {
  const subSlugs = industries
    .filter((i) => i.parentSlug === industrySlug)
    .map((i) => i.slug);

  return caseStudies
    .filter(
      (c) =>
        c.industry === industrySlug ||
        subSlugs.includes(c.industry) ||
        industries.find((i) => i.slug === c.industry)?.parentSlug ===
          industrySlug,
    )
    .slice(0, limit);
}

/* ----------------------------- Posts ----------------------------- */

export async function getAllPosts(): Promise<Post[]> {
  return [...posts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedPost(): Promise<Post> {
  return posts.find((p) => p.featured) ?? posts[0];
}

/** Previous and next posts in chronological order, for article nav. */
export async function getAdjacentPosts(
  slug: string,
): Promise<{ previous: Post | null; next: Post | null }> {
  const sorted = await getAllPosts(); // newest first
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };
  // newest-first: "previous" (older) is at index+1, "next" (newer) at index-1
  return {
    previous: index + 1 < sorted.length ? sorted[index + 1] : null,
    next: index - 1 >= 0 ? sorted[index - 1] : null,
  };
}

/** Related posts by shared category or tag, excluding the current one. */
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
    .sort((a, b) => b.score - a.score || +new Date(b.post.publishedAt) - +new Date(a.post.publishedAt));

  return scored.slice(0, limit).map((s) => s.post);
}

/* ----------------------------- Products ----------------------------- */

export async function getAllProducts(): Promise<Product[]> {
  return [...products].sort(byOrder);
}

/* ----------------------------- Testimonials ----------------------------- */

export async function getPlatformTestimonials(): Promise<Testimonial[]> {
  return testimonials.filter((t) => t.platform);
}

export async function getTestimonialById(
  id: string,
): Promise<Testimonial | null> {
  return testimonials.find((t) => t.id === id) ?? null;
}

/* ----------------------------- Team & settings ----------------------------- */

export async function getFounder(): Promise<TeamMember> {
  return team[0];
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  return team.find((m) => m.slug === slug) ?? null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

/* ----------------------------- FAQ ----------------------------- */

export async function getAllFaqs() {
  const { faqs } = await import("@/lib/content/faq");
  return [...faqs].sort(byOrder);
}
