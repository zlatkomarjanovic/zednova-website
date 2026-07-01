# Graph Report - zednova-website  (2026-07-01)

## Corpus Check
- 325 files · ~403,656 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1897 nodes · 5410 edges · 104 communities (91 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 108 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2613ace7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 96|Community 96]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 98|Community 98]]
- [[_COMMUNITY_Community 99|Community 99]]
- [[_COMMUNITY_Community 100|Community 100]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 102|Community 102]]
- [[_COMMUNITY_Community 105|Community 105]]
- [[_COMMUNITY_Community 107|Community 107]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 175 edges
2. `SectionLabel()` - 58 edges
3. `Reveal()` - 50 edges
4. `breadcrumbJsonLd()` - 49 edges
5. `TextReveal()` - 47 edges
6. `getAllPosts()` - 46 edges
7. `Button()` - 43 edges
8. `BlueprintGrid()` - 38 edges
9. `BlueprintCross()` - 38 edges
10. `scripts` - 35 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `getAllPosts()`  [EXTRACTED]
  scripts/patch-cover-captions.ts → src/lib/queries.ts
- `serviceRefsFromPopularLinks()` --calls--> `isParentServiceSlug()`  [EXTRACTED]
  scripts/seed-sanity.ts → src/lib/content/service-routes.ts
- `buildPostEnrichment()` --calls--> `getInsightOverride()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/insight-overrides.ts
- `buildPostEnrichment()` --calls--> `bodyCharCount()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts
- `buildPostEnrichment()` --calls--> `expandPostBody()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts

## Import Cycles
- None detected.

## Communities (104 total, 13 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.17
Nodes (14): client, deleteRemovedTypes(), DOC_LEGACY_UNSET, DRY_RUN, LegacyPost, main(), mergeInlineFaqs(), mergeTakeaways() (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (17): AI_RECEPTIONIST_PROBLEMS, CRM_SERVICE_PROBLEMS, DASHBOARDS_SERVICE_PROBLEMS, LEAD_GEN_SERVICE_PROBLEMS, MIGRATIONS_SERVICE_PROBLEMS, RETAINER_SERVICE_PROBLEMS, SERVICE_PROBLEM_ICONS, SERVICE_PROBLEMS_BY_SLUG (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.26
Nodes (14): product, productStatuses, productTypes, serviceGroups, serviceGroupValues, richTextMembers, flatConsultationCtaFields, flatOpenGraphFields (+6 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (14): caseStudy, customSoftware, faq, insightCategory, migration, portfolioProject, post, service (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (20): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (29): buildLlmsTxt(), LlmsFullInput, Migration, PRODUCT_SURFACES, STATUS_LABEL, STATUS_STYLE, ArticleFaqAccordion(), AeoAnswerBlock (+21 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.21
Nodes (16): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, AiSummaryPromptKey, aiSummaryPrompts, buildAiSummaryPrompt(), defaultAiSummaryPageUrl(), PROMPT_KEY_BY_MODEL_ID (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "Community 14"
Cohesion: 0.50
Nodes (3): INDUSTRY_SUB_REDIRECTS, nextConfig, SERVICE_NESTED_REDIRECTS

### Community 17 - "Community 17"
Cohesion: 0.06
Nodes (51): AlternativesIndexPage(), metadata, CompareIndexPage(), metadata, Comparison, comparisons, cookiePolicyIntro, LegalDocument (+43 more)

### Community 18 - "Community 18"
Cohesion: 0.06
Nodes (35): scripts, audit:cms-images, build, dev, download:logos, download:portfolio, enrich:insights-posts, fix:insights-data (+27 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (9): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, assetCache, client, getOrUploadIconAsset(), ICON_MAP, main() (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.20
Nodes (12): DEFAULT_FAQ_SECTION_COPY, enrichProcessSteps(), getServiceProblemsHeadline(), mergeServiceWithStaticFallback(), SECTION_COPY, ServiceFaqSectionCopy, ServiceSectionCopy, subServicesFromNavGroup() (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (12): processIconDataUri(), resolveProcessStepIcon(), SERVICE_PROCESS_ICONS, ServiceProcessIconKey, ProcessStep, client, ensureServiceDocumentId(), iconAssetCache (+4 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.07
Nodes (41): assignIndustryBuildSpans(), isDeliverableTag(), mergeIndustryLandingCopy(), BENTO_SPANS, buildsFromPopular(), DEFAULT_PROCESS, DEFAULT_TRUST_STATS, defaultGlance() (+33 more)

### Community 27 - "Community 27"
Cohesion: 0.07
Nodes (29): articleBlock, articleFaq, caseResult, caseStudyScreenshot, ctaFields, featureBullet, mediaAsset, migrationPlatformIcon (+21 more)

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (16): customSoftwareGroups, CustomSoftwareGroupSection, legacyEcommerceNavGroup, PRIMARY_SERVICE_GROUPS, PRIMARY_SERVICE_TAB_LABELS, PRIMARY_SERVICE_TAGLINES, PrimaryServiceGroup, ServiceMegaMenuCard (+8 more)

### Community 29 - "Community 29"
Cohesion: 0.25
Nodes (8): SERVICE_SUB_SERVICES_BY_SLUG, SubServiceCard, client, ensureServiceDocumentId(), main(), mapSubServicesForSanity(), migrateServiceSlug(), PARENT_SLUGS

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.05
Nodes (48): AnalyticsEvent, AnalyticsEventProps, TrackProps, OutboundLinkTracker(), analyticsAllowed(), trackConversion(), trackLinkClick(), rec() (+40 more)

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.21
Nodes (16): absoluteUrl(), SITE_ORIGIN, assertDirectAnswer(), assertMetadataBasics(), bodyHasGenericFiller(), bodyHasInternalLinks(), buildGraphForPost(), collectEmptyValues() (+8 more)

### Community 34 - "Community 34"
Cohesion: 0.07
Nodes (26): CountUp(), CountUpProps, LenisProvider(), BenefitItem, StatsRow(), AuthorAvatar(), SIZE, dispatchNavbarScrollUpdate() (+18 more)

### Community 35 - "Community 35"
Cohesion: 0.12
Nodes (29): resolveHref(), CANONICAL_NESTED_PATH_BY_SERVICE_SLUG, getAllParentServiceParams(), getLegacyServiceRedirect(), getParentGroup(), getParentServiceLabel(), getParentServiceTagline(), getParentSlugForServiceSlug() (+21 more)

### Community 36 - "Community 36"
Cohesion: 0.06
Nodes (19): caseStudies, allTags, caseStudiesByService, CATEGORY_ICONS, categoryTitles, client, INDUSTRY_BENTO_SPANS, LEGACY_PARENT_SLUGS (+11 more)

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (11): client, isDirectRun, main(), mapArticleBlocksForSanity(), mapFaqsForSanity(), needsArticleBlockFix(), needsFaqFix(), normalizeInlineFaqs() (+3 more)

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): schemaTypes, GROUPED_TYPES, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.14
Nodes (13): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Industry parent landing pages, Next steps, Next steps (Phase 2), Re-seed after editing static source (+5 more)

### Community 41 - "Community 41"
Cohesion: 0.11
Nodes (22): AIChatbotAnimation(), CRMAutomationAnimation(), WebsiteBuilderAnimation(), metadata, PILLARS, FAQ_CATEGORY_ORDER, FaqItem, faqs (+14 more)

### Community 43 - "Community 43"
Cohesion: 0.09
Nodes (42): enrichMigration(), InsightCategory, PriceTier, ProductType, resolveMigrationPlatformIcons(), mapCaseStudy(), mapCustomSoftware(), mapFaq() (+34 more)

### Community 44 - "Community 44"
Cohesion: 0.15
Nodes (10): services, client, LEGACY_GROUPS, main(), metaDescription(), PARENT_SERVICE_REF_BY_GROUP, SanityService, servicesBySlug (+2 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (13): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, extendedObjectTypes (+5 more)

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (7): industry, industryCategories, industryFields, industryGroups, industryParent, parentLandingFields, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.09
Nodes (20): IndustryCard(), IndustrySpecialtiesGrid(), ParentIndustryLink(), BENTO_LAST_IN_ROW, BENTO_SPANS, IndustryParentShowcaseGrid(), ParentShowcaseCard, IndustrySubIndustriesSection() (+12 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.07
Nodes (44): ecommerceNavServices, portfolioProjects, products, CATEGORY_ORDER, IndustryPageData, staticCustomSoftwareItems, staticTestimonialImages, Author (+36 more)

### Community 50 - "Community 50"
Cohesion: 0.05
Nodes (55): megaMenuNavLinks, NavMenuGroup, NavMenuItem, FeaturedInsightLink(), formatInsightDate(), IndustryMegaMenuGrid(), InsightsMegaMenuGrid(), LatestInsightLink() (+47 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.12
Nodes (21): AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, FaqAccordionItem(), HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia() (+13 more)

### Community 53 - "Community 53"
Cohesion: 0.14
Nodes (11): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+3 more)

### Community 54 - "Community 54"
Cohesion: 0.12
Nodes (16): CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, SUB_INDUSTRY_TO_PARENT, ecommerceSegments, fitnessSegments, healthcareSegments, industries, parentServices() (+8 more)

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): name, overrides, uuid, private, version

### Community 56 - "Community 56"
Cohesion: 0.11
Nodes (30): BlueprintGrid(), BlueprintGridProps, groupFaqsByCategory(), hasSectionContent(), FaqSection(), FaqSectionItem, normalizeFaqItems(), IndustryPageTemplate() (+22 more)

### Community 57 - "Community 57"
Cohesion: 0.15
Nodes (10): sub(), ArticleBody(), ArticleMobileToc(), ArticleSidebar(), ArticleSidebarProps, SidebarAccordionSection(), TocHeading, parseInlineLinks() (+2 more)

### Community 58 - "Community 58"
Cohesion: 0.18
Nodes (6): agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonIconCell(), ComparisonTableRow()

### Community 59 - "Community 59"
Cohesion: 0.09
Nodes (15): serviceMegaMenuCards, defaultProfileLinks, PROFILE_LINK_DEFINITIONS, ProfileLinkDefinition, ProfileLinkKey, COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, LEGACY_LINKS (+7 more)

### Community 60 - "Community 60"
Cohesion: 0.21
Nodes (12): migrations, assetCache, buildIconGallery(), client, getOrUploadPlatformAsset(), iconKey(), main(), migrateLegacyFields() (+4 more)

### Community 61 - "Community 61"
Cohesion: 0.07
Nodes (23): buildParentShowcase(), CATEGORY_LABELS, CATEGORY_ORDER, enrichNavItem(), FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE (+15 more)

### Community 62 - "Community 62"
Cohesion: 0.32
Nodes (5): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep()

### Community 63 - "Community 63"
Cohesion: 0.20
Nodes (23): getParentSlugForSubIndustry(), isParentIndustrySlug(), filterFeaturedSubIndustries(), loadIndustryDetailContext(), isIndustryParentRecord(), isIndustrySegment(), isNonEmptyCmsValue(), mergeIndustryRecord() (+15 more)

### Community 64 - "Community 64"
Cohesion: 0.16
Nodes (18): extendedTagsForPost(), AUDIENCE_BY_CATEGORY, buildPostEnrichment(), client, coverCache, difficultyFor(), ensureTagDocuments(), ENTITIES_BY_SLUG (+10 more)

### Community 66 - "Community 66"
Cohesion: 0.16
Nodes (18): ContactPage(), POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel() (+10 more)

### Community 67 - "Community 67"
Cohesion: 0.11
Nodes (25): brandWordmark, ArticleCard(), ArticleCardShowcaseBody(), formatDate(), ArticleContinueReading(), buildIntro(), ContinueReadingCard(), InsightsContinueReadingBlock() (+17 more)

### Community 68 - "Community 68"
Cohesion: 0.17
Nodes (13): CustomSoftwareGroupSection, CustomSoftwarePageGrids(), metadata, getIndustryTitle(), caseStudyJsonLd(), normalizeSchemaImageUrl(), MigrationsPageGrids(), ServicesGroupSection (+5 more)

### Community 69 - "Community 69"
Cohesion: 0.16
Nodes (11): posts, client, main(), checkHtml(), checkRobots(), DUPLICATE_LABEL_PATTERNS, LIVE, main() (+3 more)

### Community 70 - "Community 70"
Cohesion: 0.26
Nodes (9): bodyCharCount(), ArticleBlock, mapCalloutVariant(), PortableTextBlock, PortableTextChild, portableTextToArticleBlocks(), spanText(), client (+1 more)

### Community 71 - "Community 71"
Cohesion: 0.11
Nodes (28): Reveal(), RevealProps, Stagger(), StaggerProps, TextReveal(), TextRevealProps, metadata, STEPS (+20 more)

### Community 72 - "Community 72"
Cohesion: 0.28
Nodes (10): applyInsightOverride(), ArticleTakeaways(), uniqueFaqs(), uniqueTakeaways(), ensureArticleCta(), ensureDirectAnswer(), joinWordRange(), words() (+2 more)

### Community 73 - "Community 73"
Cohesion: 0.15
Nodes (12): fiveMinuteOverride, InsightOverride, OVERRIDES, remainingInsightOverrides, shopifyOverride, INSIGHT_POST_EXPANSIONS, InsightExpansion, mergeInsightExpansion() (+4 more)

### Community 74 - "Community 74"
Cohesion: 0.18
Nodes (12): InsightsPage(), getAllFaqs(), getAllInsightCategories(), getAllPosts(), getFeaturedPost(), getInsightsByProduct(), getInsightsNavPosts(), getPostsBySlugs() (+4 more)

### Community 75 - "Community 75"
Cohesion: 0.28
Nodes (8): byKey(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES, sy()

### Community 76 - "Community 76"
Cohesion: 0.25
Nodes (6): FAQ_SECTION_COPY, client, main(), mapFaqsForSanity(), SanityService, servicesBySlug

### Community 78 - "Community 78"
Cohesion: 0.43
Nodes (5): iconSvg(), main(), MARK_PATHS, root, writePng()

### Community 79 - "Community 79"
Cohesion: 0.53
Nodes (5): getInsightOverride(), expandPostBody(), expansionSections(), EXTENDED_POST_TAGS, paragraphFromTakeaways()

### Community 80 - "Community 80"
Cohesion: 0.43
Nodes (4): author, optionalEmail(), optionalUrl(), optionalUrlList()

### Community 81 - "Community 81"
Cohesion: 0.25
Nodes (8): siteSettings, client, deepPatch(), main(), patchString(), SanityDoc, shouldSkipString(), SKIP_STRING_PATTERNS

### Community 82 - "Community 82"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 83 - "Community 83"
Cohesion: 0.32
Nodes (5): SERVICE_PORTFOLIO_HIGHLIGHTS, SERVICE_SLUG_BY_PARENT, getServiceBySlug(), client, main()

### Community 84 - "Community 84"
Cohesion: 0.13
Nodes (17): getIndustryLandingCopy(), IndustryLandingCopy, LANDING_COPY, mergeIndustryLandingFaqs(), mergeIndustryParentWithStaticFallback(), ParentIndustrySlug, IndustryAiPressuresSection(), IndustryDetailContext (+9 more)

### Community 86 - "Community 86"
Cohesion: 0.15
Nodes (12): CustomCursor(), PageTransition(), geistMono, instrumentSerif, metadata, customSoftwareNavItems, industryNavItems, serviceNavGroups (+4 more)

### Community 88 - "Community 88"
Cohesion: 0.40
Nodes (4): EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline(), LONGEST_PHRASE

### Community 89 - "Community 89"
Cohesion: 0.25
Nodes (7): mapIconRows(), MigrationIconRow, MigrationPlatformIconSet, PlatformIcon, MigrationPlatformPill(), MigrationPlatformPillProps, PlatformLogo()

### Community 91 - "Community 91"
Cohesion: 0.16
Nodes (7): featuredHomepageIndustries, homepageIndustries, HomepageIndustry, moreHomepageIndustries, IndustryNavShowcaseGrid(), SLIDE_EASE, usePerSlideSize()

### Community 92 - "Community 92"
Cohesion: 0.10
Nodes (37): AGENCY_VALUES, getServiceFaqSectionCopy(), getServiceSectionCopy(), getServiceQuickAnswer(), SERVICE_QUICK_ANSWERS, ServiceQuickAnswer, ProcessSteps(), Step (+29 more)

### Community 93 - "Community 93"
Cohesion: 1.00
Nodes (3): articleBlocksToPortableText(), sanityKey(), textBlock()

### Community 94 - "Community 94"
Cohesion: 0.28
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 96 - "Community 96"
Cohesion: 0.08
Nodes (50): RootLayout(), HomePage(), sitemap(), STATIC_ROUTES, getAllParentIndustrySlugs(), buildLlmsFullTxt(), getAllNestedServiceParams(), CustomSoftwarePage() (+42 more)

### Community 97 - "Community 97"
Cohesion: 0.25
Nodes (5): caseStudyTestimonials, PLATFORM_PROFILES, platformTestimonials, rawPlatformTestimonials, testimonials

### Community 98 - "Community 98"
Cohesion: 0.40
Nodes (3): client, DOC_TYPES, Row

### Community 99 - "Community 99"
Cohesion: 0.22
Nodes (8): aestheticClinics, applyIndustryDetailOverride(), dentalClinics, IndustryOverride, medspas, overrides, skincareBrands, skincareClinics

### Community 100 - "Community 100"
Cohesion: 0.21
Nodes (13): articlePageGraphJsonLd(), articleTocJsonLd(), homepageGraphJsonLd(), homepageItemList(), homepageServiceGraphJsonLd(), insightPageGraphJsonLd(), personJsonLd(), relatedArticlesJsonLd() (+5 more)

### Community 101 - "Community 101"
Cohesion: 0.12
Nodes (22): AUTHOR_SLUG_ALIASES, resolveAuthorSlugs(), getAllCustomSoftware(), getAuthor(), getCaseStudyBySlug(), getContactIndustryOptions(), getCustomSoftwareBySlug(), getIndustryNavItems() (+14 more)

### Community 105 - "Community 105"
Cohesion: 0.13
Nodes (15): ArticleInlineCta(), ArticleQuickAnswer(), ArticleAudienceLine(), ArticleFaq(), ArticleRelatedLinks(), ArticleShare(), ArticleTags(), getAdjacentPosts() (+7 more)

## Knowledge Gaps
- **597 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `SERVICE_NESTED_REDIRECTS` (+592 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 52` to `Community 6`, `Community 9`, `Community 17`, `Community 26`, `Community 28`, `Community 31`, `Community 34`, `Community 41`, `Community 47`, `Community 50`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 61`, `Community 62`, `Community 66`, `Community 67`, `Community 68`, `Community 71`, `Community 75`, `Community 84`, `Community 86`, `Community 89`, `Community 91`, `Community 92`, `Community 94`, `Community 105`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `getAllPosts()` connect `Community 74` to `Community 96`, `Community 33`, `Community 64`, `Community 69`, `Community 71`, `Community 41`, `Community 105`, `Community 49`, `Community 17`, `Community 84`, `Community 56`, `Community 92`, `Community 63`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `services` connect `Community 44` to `Community 64`, `Community 1`, `Community 66`, `Community 36`, `Community 76`, `Community 49`, `Community 20`, `Community 22`, `Community 29`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `breadcrumbJsonLd()` (e.g. with `AlternativeGuidePage()` and `ArticlePage()`) actually correct?**
  _`breadcrumbJsonLd()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _597 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.12631578947368421 - nodes in this community are weakly interconnected._