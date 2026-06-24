import { industryParents } from "@/lib/content/industry-parents";

export type HomepageIndustry = {
  title: string;
  shortDescription: string;
  href: string;
  icon: string;
  popularServices: string[];
  featured: boolean;
};

export const homepageIndustries: HomepageIndustry[] = industryParents.map((parent) => ({
  title: parent.title,
  shortDescription: parent.shortDescription,
  href: `/industries/${parent.slug}`,
  icon: parent.icon,
  popularServices: parent.popularServices.map((link) => link.label).slice(0, 4),
  featured: true,
}));

export const featuredHomepageIndustries = homepageIndustries.filter((item) => item.featured);
export const moreHomepageIndustries = homepageIndustries.filter((item) => !item.featured);
