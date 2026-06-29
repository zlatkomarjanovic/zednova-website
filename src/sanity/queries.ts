/** GROQ query fragments and strings for Sanity fetches. */

/** Shared SEO fragment projected into a flat object. */
const SEO_PROJECTION = /* groq */ `{
  "seoTitle": coalesce(seoTitle, ""),
  "seoDescription": coalesce(seoDescription, ""),
  "keywords": keywords,
  "focusKeyword": focusKeyword,
  "secondaryKeywords": secondaryKeywords,
  "searchTags": searchTags,
  "seoCanonical": seoCanonical,
  "seoNoIndex": coalesce(seoNoIndex, robotsIndex == false, false),
  "seoHideFromLists": coalesce(seoHideFromLists, false),
  "robotsIndex": coalesce(robotsIndex, !seoNoIndex, true),
  "robotsFollow": coalesce(robotsFollow, true),
  "structuredDataType": structuredDataType,
  "jsonLdOverride": jsonLdOverride,
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

/** Inline articleFaq items on posts, services, migrations, etc. */
const INLINE_ARTICLE_FAQS_FIELD = /* groq */ `
  "faqs": faqs[]{
    "id": coalesce(id.current, id),
    question,
    answer
  }
`;

export const POST_LIST_FIELDS = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  oneSentenceSummary,
  "category": coalesce(category->title, category),
  "categorySlug": category->slug.current,
  "author": author->slug.current,
  publishedAt,
  updatedAt,
  readTime,
  featured,
  pinned,
  contentType,
  difficulty,
  accent,
  "image": coverImage.asset->url,
  "imageAlt": coalesce(coverImage.alt, title),
  "imageCaption": coalesce(coverImage.caption, ""),
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
  oneSentenceSummary,
  "category": coalesce(category->title, category),
  "categorySlug": category->slug.current,
  "author": author->slug.current,
  publishedAt,
  updatedAt,
  readTime,
  featured,
  pinned,
  contentType,
  difficulty,
  accent,
  "image": coverImage.asset->url,
  "imageAlt": coalesce(coverImage.alt, title),
  "imageCaption": coalesce(coverImage.caption, ""),
  "tags": tags[]->title,
  "relatedServices": relatedServices[]->slug.current,
  "relatedIndustries": relatedIndustries[]->slug.current,
  "relatedMigrations": relatedMigrations[]->slug.current,
  "relatedCustomSoftware": relatedCustomSoftware[]->slug.current,
  "relatedProducts": relatedProducts[]->slug.current,
  "relatedCaseStudies": relatedCaseStudies[]->slug.current,
  "relatedPortfolioProjects": relatedPortfolioProjects[]->slug.current,
  "relatedPosts": relatedPosts[]->slug.current,
  takeaways,
  "faqReferences": faqReferences[]->${FAQ_REF_PROJECTION},
  "inlineFaqs": inlineFaqs[]{
    "id": _key,
    question,
    "answer": coalesce(shortAnswer, pt::text(answer))
  },
  aiSummary,
  llmSnippet,
  quickAnswer,
  searchIntent,
  targetAudience,
  painPoints,
  searchQuestions,
  entitiesMentioned,
  lastReviewedAt,
  "sources": sources[]{ title, url, publisher, note },
  "implementationTable": implementationTable[]{ fix, problem, change, metric, tool },
  tableOfContentsEnabled,
  "openGraph": coalesce(openGraph, {})${OPEN_GRAPH_PROJECTION},
  "schemaMarkup": coalesce(schemaMarkup, {})${SCHEMA_MARKUP_PROJECTION},
  body[]{
    ...,
    _type == "mediaAsset" => {
      ...,
      "imageUrl": coalesce(image.asset->url, imageUrl),
      alt,
      caption
    },
    _type == "calloutBlock" => { type, title, body },
    _type == "codeBlock" => { language, code }
  },
  "seo": coalesce(seo, {})${SEO_PROJECTION},
  "mergedSeo": {
    "seoTitle": coalesce(seo.seoTitle, ""),
    "seoDescription": coalesce(seo.seoDescription, ""),
    "keywords": seo.keywords,
    "focusKeyword": seo.focusKeyword,
    "secondaryKeywords": seo.secondaryKeywords,
    "searchTags": seo.searchTags,
    "seoCanonical": seo.seoCanonical,
    "seoNoIndex": coalesce(noIndex, seo.seoNoIndex, seo.robotsIndex == false, false),
    "seoHideFromLists": coalesce(seo.seoHideFromLists, false),
    "robotsIndex": coalesce(seo.robotsIndex, !noIndex, !seo.seoNoIndex, true),
    "robotsFollow": coalesce(seo.robotsFollow, true),
    "structuredDataType": coalesce(schemaMarkup.schemaType, seo.structuredDataType),
    "jsonLdOverride": seo.jsonLdOverride,
    "ogTitle": coalesce(openGraph.ogTitle, seo.ogTitle),
    "ogDescription": coalesce(openGraph.ogDescription, seo.ogDescription),
    "ogImage": coalesce(openGraph.ogImage.asset->url, seo.ogImage.asset->url, coverImage.asset->url),
    "ogType": coalesce(openGraph.ogType, seo.ogType, "article"),
    "twitterCard": coalesce(openGraph.twitterCardType, seo.twitterCard, "summary_large_image"),
    "twitterTitle": coalesce(openGraph.twitterTitle, seo.twitterTitle),
    "twitterDescription": coalesce(openGraph.twitterDescription, seo.twitterDescription),
    "twitterImage": coalesce(openGraph.twitterImage.asset->url, seo.twitterImage.asset->url)
  },
  primaryCtaTitle,
  primaryCtaDescription,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaTitle,
  secondaryCtaDescription,
  secondaryCtaLabel,
  secondaryCtaHref,
}`;

export const AUTHOR_BY_SLUG_QUERY = /* groq */ `
  *[_type == "author" && slug.current in $slugs][0] {
    "slug": slug.current,
    name,
    role,
    bio,
    shortBio,
    linkedin,
    twitter,
    upwork,
    website,
    "avatar": image.asset->url
  }
`;

const POST_LIST_VISIBILITY_FILTER = /* groq */ `
  coalesce(seoHideFromLists, seo.seoHideFromLists, false) == false
`;

export const POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current) && coalesce(status, "Published") == "Published" && ${POST_LIST_VISIBILITY_FILTER}] | order(publishedAt desc) ${POST_LIST_FIELDS}
`;

export const INSIGHT_CATEGORIES_QUERY = /* groq */ `
  *[_type == "insightCategory"] | order(order asc) {
    title,
    "slug": slug.current,
    description,
    icon,
    colorLabel,
    order,
    featured,
    "postCount": count(*[
      _type == "post"
      && references(^._id)
      && defined(slug.current)
      && coalesce(status, "Published") == "Published"
      && ${POST_LIST_VISIBILITY_FILTER}
    ])
  }
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
    ${INLINE_ARTICLE_FAQS_FIELD},
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    featured,
    accent,
    "image": coverImage.asset->url,
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
    "image": coverImage.asset->url,
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
      "src": image.asset->url,
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
    ${INLINE_ARTICLE_FAQS_FIELD},
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
    "image": coverImage.asset->url,
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
    ${INLINE_ARTICLE_FAQS_FIELD},
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
    "image": coverImage.asset->url,
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
    ${INLINE_ARTICLE_FAQS_FIELD},
    "faqReferences": faqReferences[]->${FAQ_REF_PROJECTION},
    order,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedPortfolioProjects": relatedPortfolioProjects[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "image": coverImage.asset->url,
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
    ${INLINE_ARTICLE_FAQS_FIELD},
    href,
    order,
    sectionId,
    sectionLabel,
    sectionHeadline,
    sectionDescription,
    sectionOrder,
    showInNav,
    "navIcon": navIcon{
      "url": image.asset->url,
      "alt": coalesce(alt, title)
    },
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "image": coverImage.asset->url,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;

/** Migration platform icon galleries (supports legacy single fromIcon + raw image arrays). */
const MIGRATION_PLATFORM_ICONS_PROJECTION = /* groq */ `
  "fromIcons": coalesce(
    fromIcons[]{
      "url": image.asset->url,
      "alt": alt
    },
    select(
      defined(fromIcon.asset->url) => [{"url": fromIcon.asset->url, "alt": coalesce(fromIcon.alt, "")}],
      []
    )
  ),
  "toIcons": coalesce(
    toIcons[]{
      "url": coalesce(image.asset->url, asset->url),
      "alt": coalesce(alt, "")
    },
    []
  ),
  "sourcePlatform": coalesce(
    sourcePlatform,
    array::join(fromIcons[].alt, " + "),
    fromIcon.alt,
    fromPlatform
  ),
  "targetPlatform": coalesce(
    targetPlatform,
    array::join(toIcons[].alt, " + "),
    toPlatform
  )
`;

export const MIGRATIONS_QUERY = /* groq */ `
  *[_type == "migration" && defined(slug.current) && coalesce(seo.seoHideFromLists, false) == false] | order(order asc) {
    "slug": slug.current,
    title,
    shortDescription,
    description,
    heroHeadline,
    heroSubhead,
    ${MIGRATION_PLATFORM_ICONS_PROJECTION},
    whatsIncluded,
    deliverables,
    processSteps,
    ${INLINE_ARTICLE_FAQS_FIELD},
    timeline,
    pricingSignal,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "relatedMigrations": relatedMigrations[]->slug.current,
    "tags": tags[]->title,
    order,
    "image": coverImage.asset->url,
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
    ${MIGRATION_PLATFORM_ICONS_PROJECTION},
    whatsIncluded,
    deliverables,
    processSteps,
    ${INLINE_ARTICLE_FAQS_FIELD},
    timeline,
    pricingSignal,
    "relatedServices": relatedServices[]->slug.current,
    "relatedIndustries": relatedIndustries[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    "relatedMigrations": relatedMigrations[]->slug.current,
    "tags": tags[]->title,
    order,
    "image": coverImage.asset->url,
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
  "recommendedServiceLinks": servicesForThisIndustry[]->{ "label": title, "href": "/services/" + slug.current },
  ${INLINE_ARTICLE_FAQS_FIELD},
  "faqReferences": faqReferences[]->${FAQ_REF_PROJECTION},
  exampleProject,
  commonUseCase,
  icon,
  "image": coalesce(coverImage.asset->url, heroImage.asset->url),
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
    profileLinks,
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
    "image": coverImage.asset->url,
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
    "authorName": coalesce(clientName, authorName),
    "authorTitle": coalesce(clientRole, authorTitle),
    "company": coalesce(clientCompany, company),
    industry,
    "image": coalesce(clientImage.asset->url, avatar.asset->url),
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
    ${INLINE_ARTICLE_FAQS_FIELD},
    "relatedCaseStudies": relatedCaseStudies[]->slug.current,
    "relatedInsights": relatedInsights[]->slug.current,
    featured,
    accent,
    "image": coverImage.asset->url,
    "seo": coalesce(seo, {})${SEO_PROJECTION}
  }
`;
