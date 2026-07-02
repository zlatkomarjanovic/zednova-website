import { objectTypes } from "./objects";
import { post } from "./documents/post";
import { service } from "./documents/service";
import { subService } from "./documents/subService";
import { industry, industryParent } from "./documents/industry";
import { portfolioCaseStudy } from "./documents/portfolioCaseStudy";
import { product } from "./documents/product";
import { testimonial } from "./documents/testimonial";
import { siteSettings } from "./documents/siteSettings";
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
  industryParent,
  industry,
  portfolioCaseStudy,
  product,
  testimonial,
  siteSettings,
];
