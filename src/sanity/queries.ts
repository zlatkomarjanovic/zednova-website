/** GROQ query fragments and strings for Sanity fetches. */

/** Shared SEO fragment projected into a flat object. */
const SEO_PROJECTION = /* groq */ `{
  "seoTitle": coalesce(seoTitle, ""),
  "seoDescription": coalesce(seoDescription, ""),
  "keywords": keywords,
  "focusKeyword": focusKeyword,
  "secondaryKeywords": secondaryKeywords,
  "searchTags": searchTags,
  "seoCanonical": coalesce(seoCanonical, canonicalUrl),
  "canonicalUrl": coalesce(canonicalUrl, seoCanonical),
  "seoNoIndex": coalesce(seoNoIndex, robotsIndex == false, false),
  "seoHideFromLists": coalesce(seoHideFromLists, false),
  "robotsIndex": coalesce(robotsIndex, !seoNoIndex, true),
  "robotsFollow": coalesce(robotsFollow, true),
  "structuredDataType": structuredDataType,
  "jsonLdOverride": coalesce(jsonLdOverride, customJsonLd),
  "customJsonLd": coalesce(customJsonLd, jsonLdOverride),
  "ogTitle": ogTitle,
  "ogDescription": ogDescription,
  "ogImage": ogImage.asset->url,
  "ogType": ogType,
  "twitterCard": twitterCard,
  "twitterTitle": twitterTitle,
  "twitterDescription": twitterDescription,
  "twitterImage": twitterImage.asset->url
}`;

const OPEN_GRAPH_PROJECTION = /* groq */ `{
  "ogTitle": ogTitle,
  "ogDescription": ogDescription,
  "ogImage": ogImage.asset->url,
  "ogType": ogType,
  "twitterTitle": twitterTitle,
  "twitterDescription": twitterDescription,
  "twitterImage": twitterImage.asset->url,
  "twitterCardType": twitterCardType
}`;

const SCHEMA_MARKUP_PROJECTION = /* groq */ `{
  schemaType,
  enableArticleSchema,
  enableFaqSchema,
  enableBreadcrumbSchema,
  enableServiceSchema,
  enableProductSchema,
  enableOrganizationSchema,
  enableCollectionPageSchema,
  serviceType,
  areaServed,
  providerName,
  priceRange
}`;

const FAQ_REF_PROJECTION = /* groq */ `{
  "id": coalesce(slug.current, _id),
  "question": question,
  "answer": coalesce(shortAnswer, answer)
}`;

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
  "relatedServices": relatedServices[]->slug.current,
  "relatedIndustries": relatedIndustries[]->slug.current,
  "relatedMigrations": relatedMigrations[]->slug.current,
  "relatedPosts": relatedPosts[]->slug.current,
  "seo": coalesce(seo, {})${SEO_PROJECTION}
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
  "relatedServices": relatedServices[]->slug.current,
  "relatedIndustries": relatedIndustries[]->slug.current,
  "relatedMigrations": relatedMigrations[]->slug.current,
  "relatedCustomSoftware": relatedCustomSoftware[]->slug.current,
  "relatedProducts": relatedProducts[]->slug.current,
  "relatedCaseStudies": relatedCaseStudies[]->slug.current,
  "relatedPosts": relatedPosts[]->slug.current,
  takeaways,
  faqs,
  "faqReferences": faqReferences[]->${FAQ_REF_PROJECTION},
  "inlineFaqs": inlineFaqs[]{
    "id": _key,
    question,
    "answer": coalesce(shortAnswer, pt::text(answer))
  },
  oneSentenceSummary,
  aiSummary,
  llmSnippet,
  quickAnswer,
  "openGraph": coalesce(openGraph, {})${OPEN_GRAPH_PROJECTION},
  "schemaMarkup": coalesce(schemaMarkup, {})${SCHEMA_MARKUP_PROJECTION},
  articleBlocks,
  body,
  "seo": coalesce(seo, {})${SEO_PROJECTION},
  "mergedSeo": {
    "seoTitle": coalesce(seoTitle, seo.seoTitle, ""),
    "seoDescription": coalesce(seoDescription, seo.seoDescription, ""),
    "keywords": coalesce(seo.keywords, secondaryKeywords),
    "focusKeyword": coalesce(focusKeyword, seo.focusKeyword),
    "secondaryKeywords": coalesce(secondaryKeywords, seo.secondaryKeywords),
    "searchTags": coalesce(searchTags, seo.searchTags),
    "seoCanonical": coalesce(canonicalUrl, seo.seoCanonical, seo.canonicalUrl),
    "canonicalUrl": coalesce(canonicalUrl, seo.canonicalUrl, seo.seoCanonical),
    "seoNoIndex": coalesce(noIndex, seo.seoNoIndex, seo.robotsIndex == false, false),
    "seoHideFromLists": coalesce(seo.seoHideFromLists, false),
    "robotsIndex": coalesce(robotsIndex, seo.robotsIndex, !noIndex, !seo.seoNoIndex, true),
    "robotsFollow": coalesce(robotsFollow, seo.robotsFollow, true),
    "structuredDataType": coalesce(schemaType, seo.structuredDataType),
    "ogTitle": coalesce(openGraphTitle, openGraph.ogTitle, seo.ogTitle),
    "ogDescription": coalesce(openGraphDescription, openGraph.ogDescription, seo.ogDescription),
    "ogImage": coalesce(openGraphImage.asset->url, openGraph.ogImage.asset->url, schemaImage.asset->url, seo.ogImage.asset->url, coverImage.asset->url, coverImageUrl),
    "ogType": coalesce(openGraph.ogType, seo.ogType, "article"),
    "twitterCard": coalesce(openGraph.twitterCardType, seo.twitterCard, "summary_large_image"),
    "twitterTitle": coalesce(twitterTitle, openGraph.twitterTitle, seo.twitterTitle),
    "twitterDescription": coalesce(twitterDescription, openGraph.twitterDescription, seo.twitterDescription),
    "twitterImage": coalesce(twitterImage.asset->url, openGraph.twitterImage.asset->url, seo.twitterImage.asset->url)
  },
  quickAnswerQuestion,
  quickAnswerShort,
  enableArticleSchema,
  enableFaqSchema,
  enableBreadcrumbSchema,
  primaryCtaTitle,
  primaryCtaDescription,
  primaryCtaLabel,
  primaryCtaHref,
}`;

export const AUTHOR_BY_SLUG_QUERY = /* groq */ `
  *[_type == "author" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    role,
    bio,
    shortBio,
    linkedin,
    twitter,
    upwork,
    website,
    "avatar": coalesce(avatar.asset->url, avatarUrl)
  }
`;

export const POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(publishedAt desc) ${POST_LIST_FIELDS}
`;

export const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] ${POST_DETAIL_FIELDS}
`;

export const CASE_STUDIES_QUERY = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(_createdAt desc) {
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
    faqs,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    featured,
    accent,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const PORTFOLIO_PROJECTS_QUERY = /* groq */ `
  *[_type == "portfolioProject" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(order asc) {
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
    year,
    "servicesUsed": servicesUsed[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    order,
    logo {
      "src": coalesce(image.asset->url, imageUrl),
      alt,
      lightVariant
    },
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const SERVICES_QUERY = /* groq */ `
  *[_type == "service" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(order asc) {
    "slug": slug.current,
    number,
    title,
    group,
    category,
    icon,
    shortDescription,
    whatItIs,
    heroHeadline,
    heroSubhead,
    deliverables,
    whatsIncluded,
    idealClients,
    processSteps,
    results,
    faqs,
    pricingSignal,
    pricingTiers,
    startingPrice,
    timeline,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "relatedMigrations": relatedMigrations[]->slug.current,
    "tags": tags[]->title,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    order,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
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
    heroHeadline,
    heroSubhead,
    deliverables,
    whatsIncluded,
    idealClients,
    processSteps,
    results,
    faqs,
    pricingSignal,
    pricingTiers,
    startingPrice,
    timeline,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "relatedMigrations": relatedMigrations[]->slug.current,
    "tags": tags[]->title,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    order,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
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

export const CUSTOM_SOFTWARE_BY_SLUG_QUERY = /* groq */ `
  *[_type == "customSoftware" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    shortDescription,
    whatItIs,
    problemSolved,
    targetAudience,
    keyFeatures,
    whatsIncluded,
    deliverables,
    technologies,
    integrations,
    process,
    timeline,
    startingPrice,
    softwareType,
    faqs,
    "faqReferences": faqReferences[]->${FAQ_REF_PROJECTION},
    order,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedPortfolioProjects": relatedPortfolioProjects[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const CUSTOM_SOFTWARE_QUERY = /* groq */ `
  *[_type == "customSoftware"] | order(order asc) {
    "slug": coalesce(slug.current, ""),
    title,
    shortDescription,
    whatItIs,
    whatsIncluded,
    deliverables,
    faqs,
    href,
    order,
    sectionId,
    sectionLabel,
    sectionHeadline,
    sectionDescription,
    sectionOrder,
    showInNav,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const MIGRATIONS_QUERY = /* groq */ `
  *[_type == "migration" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(order asc) {
    "slug": slug.current,
    title,
    shortDescription,
    description,
    heroHeadline,
    heroSubhead,
    sourcePlatform,
    targetPlatform,
    whatsIncluded,
    deliverables,
    processSteps,
    faqs,
    timeline,
    pricingSignal,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "relatedMigrations": relatedMigrations[]->slug.current,
    "tags": tags[]->title,
    order,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const MIGRATION_BY_SLUG_QUERY = /* groq */ `
  *[_type == "migration" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    shortDescription,
    description,
    heroHeadline,
    heroSubhead,
    sourcePlatform,
    targetPlatform,
    whatsIncluded,
    deliverables,
    processSteps,
    faqs,
    timeline,
    pricingSignal,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "relatedMigrations": relatedMigrations[]->slug.current,
    "tags": tags[]->title,
    order,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

const INDUSTRY_FIELDS_PROJECTION = /* groq */ `{
  "slug": slug.current,
  title,
  category,
  whoItIsFor,
  whatWeBuild,
  problemSolved,
  heroHeadline,
  hook,
  shortDescription,
  industryOverview,
  painPoints,
  "commonProblems": commonProblems[]{ title, description },
  "segmentSpecificProblems": segmentSpecificProblems[]{ title, description },
  popularServices,
  "recommendedServiceLinks": coalesce(
    servicesForThisIndustry[]->{ "label": title, "href": "/services/" + slug.current },
    recommendedServices[]->{ "label": title, "href": "/services/" + slug.current }
  ),
  faqs,
  "faqReferences": faqReferences[]->${FAQ_REF_PROJECTION},
  exampleProject,
  commonUseCase,
  icon,
  "image": coalesce(coverImage.asset->url, heroImage.asset->url, coverImageUrl),
  order,
  showInMainNav,
  navOrder,
  "relatedServices": relatedServices[]->slug.current,
  "relatedCaseStudies": relatedCaseStudies[]->slug.current,
  "relatedInsights": relatedInsights[]->slug.current,
  "tags": tags[]->title,
  "seo": coalesce(seo, {})${SEO_PROJECTION}
}`;

export const INDUSTRY_PARENTS_QUERY = /* groq */ `
  *[
    _type == "industryParent" &&
    defined(slug.current) &&
    coalesce(seo.seoHideFromLists, false) == false &&
    slug.current in [
      "healthcare-wellness",
      "ecommerce-dtc",
      "fitness-coaching-performance",
      "professional-services",
      "b2b-saas-technology",
      "real-estate-property"
    ]
  ] | order(order asc) ${INDUSTRY_FIELDS_PROJECTION}
`;

export const INDUSTRIES_QUERY = /* groq */ `
  *[
    _type == "industry" &&
    defined(slug.current) &&
    coalesce(seo.seoHideFromLists, false) == false &&
    parent->slug.current in [
      "healthcare-wellness",
      "ecommerce-dtc",
      "fitness-coaching-performance",
      "professional-services",
      "b2b-saas-technology",
      "real-estate-property"
    ]
  ] | order(order asc) {
    ...${INDUSTRY_FIELDS_PROJECTION},
    "parentSlug": parent->slug.current
  }
`;

export const INDUSTRY_PARENT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "industryParent" && slug.current == $slug][0] ${INDUSTRY_FIELDS_PROJECTION}
`;

export const INDUSTRY_BY_SLUG_QUERY = /* groq */ `
  *[_type == "industry" && slug.current == $slug][0] {
    ...${INDUSTRY_FIELDS_PROJECTION},
    "parentSlug": parent->slug.current
  }
`;

export const INDUSTRY_NAV_QUERY = /* groq */ `
  *[
    _type == "industryParent" &&
    showInMainNav == true &&
    defined(slug.current) &&
    slug.current in [
      "healthcare-wellness",
      "ecommerce-dtc",
      "fitness-coaching-performance",
      "professional-services",
      "b2b-saas-technology",
      "real-estate-property"
    ]
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
    siteUrl,
    announcementBar,
    contactEmail,
    contactPhone,
    responseTime,
    address,
    officeHours,
    socialLinks,
    stats,
    twitterCreator,
    "defaultOgImage": defaultOgImage.asset->url,
    "defaultSeo": coalesce(defaultSeo, {})${SEO_PROJECTION},
    headerScripts
  }
`;

export const PRODUCTS_QUERY = /* groq */ `
  *[_type == "product" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(order asc) {
    "slug": slug.current,
    title,
    type,
    tagline,
    description,
    features,
    featureList,
    status,
    pricingTiers,
    startingPrice,
    ctaLabel,
    ctaHref,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    "resourceFile": resourceFile.asset->url,
    externalUrl,
    order,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial"] | order(_createdAt asc) {
    "id": _id,
    quote,
    authorName,
    authorTitle,
    company,
    industry,
    "image": coalesce(avatar.asset->url, avatarUrl),
    platform,
    platformSource,
    platformUrl,
    rating,
    "relatedServices": relatedServices[]->slug.current,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    featured
  }
`;

export const FAQS_QUERY = /* groq */ `
  *[_type == "faq"] | order(order asc) {
    "id": _id,
    question,
    answer,
    category,
    "scopeServices": scopeServices[]->slug.current,
    "scopeIndustries": scopeIndustries[]->slug.current,
    "scopeMigrations": scopeMigrations[]->slug.current,
    "tags": tags[]->title,
    order
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = /* groq */ `
  *[_type == "caseStudy" && slug.current == $slug][0] {
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
    faqs,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    featured,
    accent,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const PAGES_QUERY = /* groq */ `
  *[_type == "page" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(title asc) {
    "slug": slug.current,
    title,
    path,
    heroHeadline,
    heroSubhead,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const PAGE_BY_PATH_QUERY = /* groq */ `
  *[_type == "page" && path == $path][0] {
    "slug": slug.current,
    title,
    path,
    heroHeadline,
    heroSubhead,
    body,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

export const REDIRECTS_QUERY = /* groq */ `
  *[_type == "redirect"] {
    "from": from,
    "to": to,
    "statusCode": statusCode,
    "permanent": permanent
  }
`;
