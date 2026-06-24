/** GROQ query fragments and strings for Sanity fetches. */

export const POST_LIST_FIELDS = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "category": category->title,
  "author": author->slug.current,
  publishedAt,
  updatedAt,
  readTime,
  featured,
  accent,
  "image": coalesce(coverImage.asset->url, coverImageUrl),
  "tags": tags[]->title,
  "seoTitle": seo.seoTitle,
  "seoDescription": seo.seoDescription,
  "keywords": seo.keywords,
  "ogImage": coalesce(seo.ogImage.asset->url, coverImage.asset->url, coverImageUrl),
  takeaways,
  faqs,
  articleBlocks
}`;

export const POST_DETAIL_FIELDS = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "category": category->title,
  "author": author->slug.current,
  publishedAt,
  updatedAt,
  readTime,
  featured,
  accent,
  "image": coalesce(coverImage.asset->url, coverImageUrl),
  "tags": tags[]->title,
  "seoTitle": seo.seoTitle,
  "seoDescription": seo.seoDescription,
  "keywords": seo.keywords,
  "ogImage": coalesce(seo.ogImage.asset->url, coverImage.asset->url, coverImageUrl),
  takeaways,
  faqs,
  articleBlocks,
  body
}`;

export const AUTHOR_BY_SLUG_QUERY = /* groq */ `
  *[_type == "author" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    role,
    bio,
    linkedin,
    twitter,
    upwork,
    "avatar": coalesce(avatar.asset->url, avatarUrl)
  }
`;

export const POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${POST_LIST_FIELDS}
`;

export const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] ${POST_DETAIL_FIELDS}
`;

export const CASE_STUDIES_QUERY = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    "industry": industry->slug.current,
    "servicesUsed": servicesUsed[]->slug.current,
    timeline,
    resultHeadline,
    challenge,
    solution,
    results,
    techStack,
    "testimonialId": testimonial->_id,
    featured,
    accent,
    "image": coalesce(coverImage.asset->url, coverImageUrl)
  }
`;

export const PORTFOLIO_PROJECTS_QUERY = /* groq */ `
  *[_type == "portfolioProject" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    summary,
    href,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    imageAlt,
    "video": videoUrl,
    accent,
    category,
    order,
    logo {
      "src": coalesce(image.asset->url, imageUrl),
      alt,
      lightVariant
    }
  }
`;

export const SERVICES_QUERY = /* groq */ `
  *[_type == "service" && defined(slug.current)] | order(order asc) {
    "slug": slug.current,
    number,
    title,
    group,
    category,
    icon,
    shortDescription,
    whatItIs,
    deliverables,
    idealClients,
    processSteps,
    results,
    pricingSignal,
    timeline,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    order
  }
`;

export const SERVICE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    "slug": slug.current,
    number,
    title,
    group,
    category,
    icon,
    shortDescription,
    whatItIs,
    deliverables,
    idealClients,
    processSteps,
    results,
    pricingSignal,
    timeline,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    order
  }
`;

export const SERVICE_NAV_ITEMS_QUERY = /* groq */ `
  *[_type == "serviceNavItem"] | order(order asc) {
    title,
    shortDescription,
    href,
    navGroup,
    order
  }
`;

export const SERVICE_MEGA_MENU_CARDS_QUERY = /* groq */ `
  *[_type == "serviceMegaMenuCard"] | order(order asc) {
    title,
    shortDescription,
    includes,
    href,
    order
  }
`;

export const CUSTOM_SOFTWARE_QUERY = /* groq */ `
  *[_type == "customSoftware"] | order(order asc) {
    title,
    shortDescription,
    href,
    order,
    sectionId,
    sectionLabel,
    sectionHeadline,
    sectionDescription,
    sectionOrder,
    showInNav
  }
`;

export const MIGRATIONS_QUERY = /* groq */ `
  *[_type == "migration" && defined(slug.current)] | order(order asc) {
    "slug": slug.current,
    title,
    shortDescription,
    description,
    order
  }
`;

export const MIGRATION_BY_SLUG_QUERY = /* groq */ `
  *[_type == "migration" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    shortDescription,
    description,
    order
  }
`;

export const INDUSTRY_PARENTS_QUERY = /* groq */ `
  *[_type == "industryParent" && defined(slug.current)] | order(order asc) {
    "slug": slug.current,
    title,
    category,
    whoItIsFor,
    whatWeBuild,
    problemSolved,
    heroHeadline,
    hook,
    shortDescription,
    painPoints,
    popularServices,
    exampleProject,
    commonUseCase,
    icon,
    order,
    showInMainNav,
    navOrder
  }
`;

export const INDUSTRIES_QUERY = /* groq */ `
  *[_type == "industry" && defined(slug.current)] | order(order asc) {
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    title,
    category,
    whoItIsFor,
    whatWeBuild,
    problemSolved,
    heroHeadline,
    hook,
    shortDescription,
    painPoints,
    popularServices,
    exampleProject,
    commonUseCase,
    icon,
    order,
    showInMainNav,
    navOrder
  }
`;

export const INDUSTRY_PARENT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "industryParent" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    category,
    whoItIsFor,
    whatWeBuild,
    problemSolved,
    heroHeadline,
    hook,
    shortDescription,
    painPoints,
    popularServices,
    exampleProject,
    commonUseCase,
    icon,
    order
  }
`;

export const INDUSTRY_BY_SLUG_QUERY = /* groq */ `
  *[_type == "industry" && slug.current == $slug][0] {
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    title,
    category,
    whoItIsFor,
    whatWeBuild,
    problemSolved,
    heroHeadline,
    hook,
    shortDescription,
    painPoints,
    popularServices,
    exampleProject,
    commonUseCase,
    icon,
    order
  }
`;

export const INDUSTRY_NAV_QUERY = /* groq */ `
  *[
    (_type == "industryParent" || _type == "industry") &&
    showInMainNav == true &&
    defined(slug.current)
  ] | order(navOrder asc) {
    "title": coalesce(navTitle, title),
    "shortDescription": coalesce(navShortDescription, shortDescription),
    "slug": slug.current,
    "docType": _type,
    navOrder
  }
`;

export const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    contactEmail,
    responseTime,
    announcementBar,
    socialLinks,
    stats
  }
`;

