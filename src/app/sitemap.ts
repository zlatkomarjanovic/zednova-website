import type { MetadataRoute } from "next";
import {
  getAllCustomSoftwareSlugs,
  getAllIndustrySlugs,
  getAllPosts,
  getAllServices,
  getAllCaseStudies,
  getAllMigrations,
} from "@/lib/queries";

const SITE_ORIGIN = "https://zednova.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, services, industries, caseStudies, migrations, customSoftwareSlugs] =
    await Promise.all([
      getAllPosts(),
      getAllServices(),
      getAllIndustrySlugs(),
      getAllCaseStudies(),
      getAllMigrations(),
      getAllCustomSoftwareSlugs(),
    ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_ORIGIN}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_ORIGIN}/industries`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_ORIGIN}/custom-software`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_ORIGIN}/migrations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_ORIGIN}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_ORIGIN}/insights`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_ORIGIN}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_ORIGIN}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

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

  return [
    ...staticRoutes,
    ...postRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...caseStudyRoutes,
    ...migrationRoutes,
    ...customSoftwareRoutes,
  ];
}
