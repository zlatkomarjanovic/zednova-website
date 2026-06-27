import type { MetadataRoute } from "next";
import {
  getAllCustomSoftwareSlugs,
  getAllIndustrySlugs,
  getAllPosts,
  getAllServices,
  getAllCaseStudies,
  getAllMigrations,
} from "@/lib/queries";
import { comparisons } from "@/lib/content/comparisons";
import { alternatives } from "@/lib/content/alternatives";
import { SITE_ORIGIN } from "@/lib/site-url";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${SITE_ORIGIN}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_ORIGIN}/services`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/industries`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/custom-software`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/migrations`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/work`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_ORIGIN}/insights`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_ORIGIN}/about`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_ORIGIN}/contact`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_ORIGIN}/legal/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_ORIGIN}/legal/terms`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_ORIGIN}/legal/cookie-settings`, changeFrequency: "monthly", priority: 0.3 },
  { url: `${SITE_ORIGIN}/sitemap`, changeFrequency: "monthly", priority: 0.4 },
  { url: `${SITE_ORIGIN}/stack`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_ORIGIN}/service-areas`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_ORIGIN}/compare`, changeFrequency: "weekly", priority: 0.6 },
  { url: `${SITE_ORIGIN}/alternatives`, changeFrequency: "weekly", priority: 0.6 },
  { url: `${SITE_ORIGIN}/llms.txt`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_ORIGIN}/llms-full.txt`, changeFrequency: "weekly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  try {
    const [posts, services, industries, caseStudies, migrations, customSoftwareSlugs] =
      await Promise.all([
        getAllPosts(),
        getAllServices(),
        getAllIndustrySlugs(),
        getAllCaseStudies(),
        getAllMigrations(),
        getAllCustomSoftwareSlugs(),
      ]);

    const staticRoutes = STATIC_ROUTES.map((route) => ({
      ...route,
      lastModified: now,
    }));

    const postRoutes: MetadataRoute.Sitemap = posts
      .filter((p) => !p.seo?.seoNoIndex && !p.seo?.seoHideFromLists)
      .map((p) => ({
        url: `${SITE_ORIGIN}/insights/${p.slug}`,
        lastModified: new Date(p.updatedAt ?? p.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    const serviceRoutes: MetadataRoute.Sitemap = services
      .filter((s) => !s.seo?.seoNoIndex && !s.seo?.seoHideFromLists)
      .map((s) => ({
        url: `${SITE_ORIGIN}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    const industryRoutes: MetadataRoute.Sitemap = industries.map((slug) => ({
      url: `${SITE_ORIGIN}/industries/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies
      .filter((c) => !c.seo?.seoNoIndex && !c.seo?.seoHideFromLists)
      .map((c) => ({
        url: `${SITE_ORIGIN}/work/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    const migrationRoutes: MetadataRoute.Sitemap = migrations
      .filter((m) => !m.seo?.seoNoIndex && !m.seo?.seoHideFromLists)
      .map((m) => ({
        url: `${SITE_ORIGIN}/migrations/${m.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    const customSoftwareRoutes: MetadataRoute.Sitemap = customSoftwareSlugs.map((slug) => ({
      url: `${SITE_ORIGIN}/custom-software/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
      url: `${SITE_ORIGIN}/compare/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const alternativeRoutes: MetadataRoute.Sitemap = alternatives.map((guide) => ({
      url: `${SITE_ORIGIN}/alternatives/${guide.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...postRoutes,
      ...serviceRoutes,
      ...industryRoutes,
      ...caseStudyRoutes,
      ...migrationRoutes,
      ...customSoftwareRoutes,
      ...comparisonRoutes,
      ...alternativeRoutes,
    ];
  } catch {
    return STATIC_ROUTES.map((route) => ({ ...route, lastModified: now }));
  }
}
