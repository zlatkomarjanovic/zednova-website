/**
 * Content queries. These read the local typed content today and keep the exact
 * signatures the brief specifies, so they can be re-pointed at Sanity GROQ
 * queries later without changing a single page.
 */
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { caseStudies } from "@/lib/content/case-studies";
import { posts } from "@/lib/content/posts";
import { products } from "@/lib/content/products";
import { testimonials } from "@/lib/content/testimonials";
import { team } from "@/lib/content/team";
import { siteSettings } from "@/lib/content/site";
import type {
  CaseStudy,
  Industry,
  Post,
  Product,
  Service,
  ServiceGroup,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/lib/types";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

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
    "Growth & Automation",
    "Infrastructure & Intelligence",
  ];
  return groups.map((group) => ({
    group,
    services: [...services].sort(byOrder).filter((s) => s.group === group),
  }));
}

/* ----------------------------- Industries ----------------------------- */

export async function getAllIndustries(): Promise<Industry[]> {
  return [...industries].sort(byOrder);
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  return industries.find((i) => i.slug === slug) ?? null;
}

export async function getIndustryTitle(slug: string): Promise<string> {
  return industries.find((i) => i.slug === slug)?.title ?? slug;
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
  return caseStudies
    .filter((c) => c.industry === industrySlug)
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

/* ----------------------------- Products ----------------------------- */

export async function getAllProducts(): Promise<Product[]> {
  return [...products].sort(byOrder);
}

/* ----------------------------- Testimonials ----------------------------- */

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return testimonials.filter((t) => t.featured);
}

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
