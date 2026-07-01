import { objectTypes } from "./objects";
import { post } from "./documents/post";
import { service } from "./documents/service";
import { industry, industryParent } from "./documents/industry";
import { caseStudy } from "./documents/caseStudy";
import { portfolioProject } from "./documents/portfolioProject";
import { product } from "./documents/product";
import { testimonial } from "./documents/testimonial";
import { migration } from "./documents/migration";
import { siteSettings } from "./documents/siteSettings";
import { customSoftware } from "./documents/customSoftware";
import { subService } from "./documents/subService";
import { serviceMegaMenuCard } from "./documents/serviceMegaMenuCard";
import { insightCategory } from "./documents/insightCategory";
import { tag } from "./documents/tag";
import { author } from "./documents/author";
import { faq } from "./documents/faq";

export const schemaTypes = [
  ...objectTypes,
  post,
  insightCategory,
  tag,
  author,
  faq,
  service,
  subService,
  serviceMegaMenuCard,
  customSoftware,
  industryParent,
  industry,
  caseStudy,
  portfolioProject,
  product,
  testimonial,
  migration,
  siteSettings,
];
