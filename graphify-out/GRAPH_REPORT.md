# Graph Report - zednova-website  (2026-07-02)

## Corpus Check
- 330 files · ~408,476 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1948 nodes · 5501 edges · 110 communities (99 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 108 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cf05aff1`
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
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 96|Community 96]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 98|Community 98]]
- [[_COMMUNITY_Community 99|Community 99]]
- [[_COMMUNITY_Community 100|Community 100]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 102|Community 102]]
- [[_COMMUNITY_Community 103|Community 103]]
- [[_COMMUNITY_Community 104|Community 104]]
- [[_COMMUNITY_Community 105|Community 105]]
- [[_COMMUNITY_Community 106|Community 106]]
- [[_COMMUNITY_Community 107|Community 107]]
- [[_COMMUNITY_Community 108|Community 108]]
- [[_COMMUNITY_Community 109|Community 109]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 176 edges
2. `SectionLabel()` - 58 edges
3. `Reveal()` - 50 edges
4. `breadcrumbJsonLd()` - 49 edges
5. `TextReveal()` - 47 edges
6. `getAllPosts()` - 46 edges
7. `Button()` - 43 edges
8. `scripts` - 39 edges
9. `BlueprintGrid()` - 38 edges
10. `BlueprintCross()` - 38 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `getAllPosts()`  [EXTRACTED]
  scripts/patch-cover-captions.ts → src/lib/queries.ts
- `main()` --calls--> `getAllMigrations()`  [INFERRED]
  scripts/verify-nav-data-flow.ts → src/lib/queries.ts
- `buildPostEnrichment()` --calls--> `bodyCharCount()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts
- `buildPostEnrichment()` --calls--> `articleBlocksToPortableText()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/sanity/blocks-to-portable-text.ts
- `main()` --calls--> `getAllPosts()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/queries.ts

## Import Cycles
- None detected.

## Communities (110 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (16): articleBlocksToPortableText(), sanityKey(), textBlock(), client, deleteRemovedTypes(), DOC_LEGACY_UNSET, DRY_RUN, LegacyPost (+8 more)

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
Cohesion: 0.09
Nodes (26): AGENCY_VALUES, AeoAnswerBlock, CaseResult, CaseStudyScreenshot, CtaBlock, CtaFields, OpenGraphFields, PriceTier (+18 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (27): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, AiSummaryPromptKey, aiSummaryPrompts, buildAiSummaryPrompt(), defaultAiSummaryPageUrl(), PROMPT_KEY_BY_MODEL_ID (+19 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "Community 14"
Cohesion: 0.50
Nodes (3): INDUSTRY_SUB_REDIRECTS, nextConfig, SERVICE_NESTED_REDIRECTS

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (40): AlternativesIndexPage(), metadata, CompareIndexPage(), metadata, Comparison, comparisons, cookiePolicyIntro, LegalDocument (+32 more)

### Community 18 - "Community 18"
Cohesion: 0.05
Nodes (39): scripts, audit:cms-images, audit:industry-categories, build, cleanup:duplicate-industries, dev, download:logos, download:portfolio (+31 more)

### Community 19 - "Community 19"
Cohesion: 0.16
Nodes (10): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, assetCache, client, getOrUploadIconAsset(), ICON_MAP, main() (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.08
Nodes (17): BENTO_LAST_IN_ROW, BENTO_SPANS, IndustryParentShowcaseGrid(), ParentShowcaseCard, showcaseCellBorderClass(), getNavbarOffsetPx(), ServicesPageCard, ServicesPageShowcase() (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.27
Nodes (7): client, ensureServiceDocumentId(), iconAssetCache, main(), mapProcessStepsForSanity(), PARENT_SLUGS, stepsForSlug()

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (18): assignIndustryBuildSpans(), isDeliverableTag(), assetCache, BuildCardDoc, client, imageField(), INDUSTRY_IMAGES, main() (+10 more)

### Community 27 - "Community 27"
Cohesion: 0.07
Nodes (29): articleBlock, articleFaq, caseResult, caseStudyScreenshot, ctaFields, featureBullet, mediaAsset, migrationPlatformIcon (+21 more)

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (13): customSoftwareGroups, CustomSoftwareGroupSection, legacyEcommerceNavGroup, megaMenuNavLinks, PRIMARY_SERVICE_TAB_LABELS, PRIMARY_SERVICE_TAGLINES, ServiceMegaMenuCard, PRIMARY_SERVICE_GROUPS (+5 more)

### Community 29 - "Community 29"
Cohesion: 0.23
Nodes (9): SECTION_COPY, SERVICE_SUB_SERVICES_BY_SLUG, SubServiceCard, client, ensureServiceDocumentId(), main(), mapSubServicesForSanity(), migrateServiceSlug() (+1 more)

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
Cohesion: 0.06
Nodes (63): applyInsightOverride(), ArticleTakeaways(), uniqueFaqs(), uniqueTakeaways(), ensureArticleCta(), ensureDirectAnswer(), joinWordRange(), words() (+55 more)

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (13): ArticleCoverProps, AuthorAvatar(), SIZE, buildCmsImageUrl(), CMS_IMAGE_WIDTHS, CmsImagePreset, cmsImageSrc(), shouldUseCdnDelivery() (+5 more)

### Community 35 - "Community 35"
Cohesion: 0.12
Nodes (25): resolveHref(), subServicesFromNavGroup(), buildServiceNavGroups(), CANONICAL_NESTED_PATH_BY_SERVICE_SLUG, getLegacyServiceRedirect(), getParentServiceLabel(), getParentServiceTagline(), getParentSlugForServiceSlug() (+17 more)

### Community 36 - "Community 36"
Cohesion: 0.06
Nodes (17): allTags, caseStudiesByService, CATEGORY_ICONS, categoryTitles, client, INDUSTRY_BENTO_SPANS, LEGACY_PARENT_SLUGS, LEGACY_SERVICE_GROUPS (+9 more)

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (11): client, isDirectRun, main(), mapArticleBlocksForSanity(), mapFaqsForSanity(), needsArticleBlockFix(), needsFaqFix(), normalizeInlineFaqs() (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.10
Nodes (19): FeaturedInsightLink(), formatInsightDate(), IndustryMegaMenuGrid(), InsightsMegaMenuGrid(), LatestInsightLink(), MegaMenu(), MegaMenuProps, MigrationNavMenuItemLink() (+11 more)

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): schemaTypes, GROUPED_TYPES, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.14
Nodes (13): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Industry parent landing pages, Next steps, Next steps (Phase 2), Re-seed after editing static source (+5 more)

### Community 41 - "Community 41"
Cohesion: 0.10
Nodes (19): metadata, PILLARS, FAQ_CATEGORY_ORDER, FaqItem, faqs, homepageFaqs, homepageIndustries, HOMEPAGE_PILLARS (+11 more)

### Community 43 - "Community 43"
Cohesion: 0.05
Nodes (73): AUTHOR_SLUG_ALIASES, resolveAuthorSlugs(), getServiceNavGroups(), Author, InsightCategory, ServiceGroup, SiteSettings, Testimonial (+65 more)

### Community 44 - "Community 44"
Cohesion: 0.25
Nodes (7): client, LEGACY_GROUPS, main(), metaDescription(), PARENT_SERVICE_REF_BY_GROUP, SanityService, servicesBySlug

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (13): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, extendedObjectTypes (+5 more)

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (7): industry, industryCategories, industryFields, industryGroups, industryParent, parentLandingFields, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.15
Nodes (14): CustomSoftwareGroupSection, CustomSoftwarePageGrids(), PILLAR_VISUALS, MigrationsPageGrids(), ServicesGroupSection, ServicesPageGrids(), BlueprintTableGrid(), chunkRows() (+6 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.07
Nodes (44): ContactPage(), caseStudies, ecommerceNavServices, applyIndustryDetailOverride(), products, CustomSoftwarePage(), InsightsPage(), applyTestimonialImageFallback() (+36 more)

### Community 50 - "Community 50"
Cohesion: 0.21
Nodes (10): TechStackShowcase(), formatDate(), InsightsFeaturedArticle(), Navbar(), BEND_SPRING, HighlightRect, RubberHoverHighlightLayer(), RubberHoverOptions (+2 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.07
Nodes (27): CountUp(), CountUpProps, BenefitItem, BenefitsGrid(), HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps (+19 more)

### Community 53 - "Community 53"
Cohesion: 0.15
Nodes (10): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+2 more)

### Community 54 - "Community 54"
Cohesion: 0.14
Nodes (14): ecommerceSegments, fitnessSegments, healthcareSegments, industries, parentServices(), professionalSegments, realEstateSegments, saasSegments (+6 more)

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): name, overrides, uuid, private, version

### Community 56 - "Community 56"
Cohesion: 0.12
Nodes (24): BlueprintGrid(), BlueprintGridProps, groupFaqsByCategory(), hasSectionContent(), FaqAccordionItem(), FaqSection(), FaqSectionItem, normalizeFaqItems() (+16 more)

### Community 57 - "Community 57"
Cohesion: 0.14
Nodes (19): getAuthor(), getCaseStudyBySlug(), getCustomSoftwareBySlug(), getPostBySlug(), getSiteSettings(), mergeCustomSoftware(), sanityClient, sanityFetch() (+11 more)

### Community 58 - "Community 58"
Cohesion: 0.18
Nodes (6): agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonIconCell(), ComparisonTableRow()

### Community 59 - "Community 59"
Cohesion: 0.38
Nodes (4): LenisProvider(), dispatchNavbarScrollUpdate(), registerLenis(), scrollToTop()

### Community 60 - "Community 60"
Cohesion: 0.21
Nodes (12): migrations, assetCache, buildIconGallery(), client, getOrUploadPlatformAsset(), iconKey(), main(), migrateLegacyFields() (+4 more)

### Community 61 - "Community 61"
Cohesion: 0.07
Nodes (23): buildParentShowcase(), CATEGORY_LABELS, CATEGORY_ORDER, enrichNavItem(), FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE (+15 more)

### Community 62 - "Community 62"
Cohesion: 0.17
Nodes (10): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+2 more)

### Community 63 - "Community 63"
Cohesion: 0.19
Nodes (23): getParentSlugForSubIndustry(), isParentIndustrySlug(), IndustryCard(), IndustrySpecialtiesGrid(), ParentIndustryLink(), isIndustryParentRecord(), isIndustrySegment(), isNonEmptyCmsValue() (+15 more)

### Community 64 - "Community 64"
Cohesion: 0.13
Nodes (23): getInsightOverride(), expandPostBody(), expansionSections(), EXTENDED_POST_TAGS, extendedTagsForPost(), paragraphFromTakeaways(), AUDIENCE_BY_CATEGORY, buildPostEnrichment() (+15 more)

### Community 66 - "Community 66"
Cohesion: 0.19
Nodes (14): POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel(), labelForIndustry() (+6 more)

### Community 67 - "Community 67"
Cohesion: 0.08
Nodes (31): sub(), ArticleInlineCta(), ArticleQuickAnswer(), ArticleAudienceLine(), ArticleBody(), ArticleCard(), ArticleCardShowcaseBody(), formatDate() (+23 more)

### Community 68 - "Community 68"
Cohesion: 0.53
Nodes (4): buildLlmsFullTxt(), buildLlmsTxt(), LlmsFullInput, GET()

### Community 69 - "Community 69"
Cohesion: 0.40
Nodes (3): posts, client, main()

### Community 70 - "Community 70"
Cohesion: 0.24
Nodes (9): bodyCharCount(), mapCalloutVariant(), PortableTextBlock, PortableTextChild, portableTextToArticleBlocks(), spanText(), resolveBody(), client (+1 more)

### Community 71 - "Community 71"
Cohesion: 0.10
Nodes (39): Reveal(), RevealProps, Stagger(), StaggerProps, TextReveal(), TextRevealProps, metadata, STEPS (+31 more)

### Community 72 - "Community 72"
Cohesion: 0.14
Nodes (15): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), byKey(), CRMAutomationAnimation(), edge(), flowKeyframes (+7 more)

### Community 73 - "Community 73"
Cohesion: 0.15
Nodes (13): fiveMinuteOverride, InsightOverride, OVERRIDES, remainingInsightOverrides, shopifyOverride, INSIGHT_POST_EXPANSIONS, InsightExpansion, mergeInsightExpansion() (+5 more)

### Community 74 - "Community 74"
Cohesion: 0.15
Nodes (16): APPLY, CANONICAL_PARENT_IDS, CANONICAL_SEGMENT_IDS, client, countReferences(), discardAllDrafts(), discardDraftsReferencing(), draftClient (+8 more)

### Community 75 - "Community 75"
Cohesion: 0.15
Nodes (12): IndustryAiPressuresSection(), filterFeaturedSubIndustries(), IndustryDetailContext, loadIndustryDetailContext(), IndustryOverviewSection(), IndustrySubIndustriesSection(), getPostsBySlugs(), PainPoint (+4 more)

### Community 76 - "Community 76"
Cohesion: 0.20
Nodes (8): FAQ_SECTION_COPY, getServiceFaqs(), serviceFaqsBySlug, client, main(), mapFaqsForSanity(), SanityService, servicesBySlug

### Community 78 - "Community 78"
Cohesion: 0.43
Nodes (5): iconSvg(), main(), MARK_PATHS, root, writePng()

### Community 79 - "Community 79"
Cohesion: 0.29
Nodes (10): getIndustryLandingCopy(), IndustryLandingCopy, LANDING_COPY, mergeIndustryLandingCopy(), mergeIndustryLandingFaqs(), mergeIndustryParentWithStaticFallback(), resolveIndustryFaqs(), INDUSTRY_FAQ_FALLBACKS (+2 more)

### Community 80 - "Community 80"
Cohesion: 0.43
Nodes (4): author, optionalEmail(), optionalUrl(), optionalUrlList()

### Community 81 - "Community 81"
Cohesion: 0.23
Nodes (9): defaultProfileLinks, siteSettings, client, deepPatch(), main(), patchString(), SanityDoc, shouldSkipString() (+1 more)

### Community 82 - "Community 82"
Cohesion: 0.26
Nodes (11): BENTO_SPANS, buildsFromPopular(), DEFAULT_PROCESS, DEFAULT_TRUST_STATS, defaultGlance(), defaultSystemSteps(), GLANCE_ICON_DEFAULTS, mapProcessSteps() (+3 more)

### Community 83 - "Community 83"
Cohesion: 0.24
Nodes (7): mergeServiceWithStaticFallback(), SERVICE_PORTFOLIO_HIGHLIGHTS, SERVICE_SLUG_BY_PARENT, getServiceBySlug(), fetchServiceBySlugFromSanity(), client, main()

### Community 84 - "Community 84"
Cohesion: 0.24
Nodes (4): CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, SUB_INDUSTRY_TO_PARENT, client

### Community 86 - "Community 86"
Cohesion: 0.11
Nodes (23): CustomCursor(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), customSoftwareNavItems, industryNavItems (+15 more)

### Community 88 - "Community 88"
Cohesion: 0.32
Nodes (3): FooterNavLink(), HoverFlip(), useMobileTouchUi()

### Community 89 - "Community 89"
Cohesion: 0.06
Nodes (33): NavMenuGroup, NavMenuItem, brandWordmark, HomePreloader(), Accordion(), DIRECT_LINKS, LINKS_AFTER_INDUSTRIES, LINKS_BEFORE_ABOUT (+25 more)

### Community 90 - "Community 90"
Cohesion: 0.25
Nodes (6): Migration, ArticleFaq(), ArticleFaqAccordion(), ArticleFaq, FeatureBullet, SeoFields

### Community 91 - "Community 91"
Cohesion: 0.24
Nodes (10): PRIMARY_SERVICE_GROUPS, PrimaryServiceGroup, getParentGroup(), getSubService(), getSubServicesForParent(), isParentServiceSlug(), serviceRefsFromPopularLinks(), IndustryServicesShowcase() (+2 more)

### Community 92 - "Community 92"
Cohesion: 0.12
Nodes (33): getServiceFaqSectionCopy(), getServiceProblemsHeadline(), getServiceSectionCopy(), getServiceQuickAnswer(), SERVICE_QUICK_ANSWERS, ServiceQuickAnswer, ProcessSteps(), Step (+25 more)

### Community 93 - "Community 93"
Cohesion: 0.24
Nodes (9): DEFAULT_FAQ_SECTION_COPY, enrichProcessSteps(), ServiceFaqSectionCopy, ServiceSectionCopy, processIconDataUri(), resolveProcessStepIcon(), SERVICE_PROCESS_ICONS, ServiceProcessIconKey (+1 more)

### Community 94 - "Community 94"
Cohesion: 0.28
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 95 - "Community 95"
Cohesion: 0.22
Nodes (9): CATEGORY_MAP, client, FIX, main(), needsCategoryFix(), resolveCategory(), Row, SCHEMA_CATEGORIES (+1 more)

### Community 96 - "Community 96"
Cohesion: 0.11
Nodes (31): HomePage(), sitemap(), STATIC_ROUTES, AlternativeGuide, alternatives, getAllParentIndustrySlugs(), getAllNestedServiceParams(), getAllParentServiceParams() (+23 more)

### Community 97 - "Community 97"
Cohesion: 0.25
Nodes (5): caseStudyTestimonials, PLATFORM_PROFILES, platformTestimonials, rawPlatformTestimonials, testimonials

### Community 98 - "Community 98"
Cohesion: 0.40
Nodes (3): client, DOC_TYPES, Row

### Community 99 - "Community 99"
Cohesion: 0.25
Nodes (7): aestheticClinics, dentalClinics, IndustryOverride, medspas, overrides, skincareBrands, skincareClinics

### Community 100 - "Community 100"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 101 - "Community 101"
Cohesion: 0.24
Nodes (9): enrichMigration(), getMigrationBySlug(), mapIconRows(), MigrationIconRow, MigrationPlatformIconSet, resolveMigrationPlatformIcons(), fetchMigrationBySlugFromSanity(), mapMigration() (+1 more)

### Community 103 - "Community 103"
Cohesion: 0.24
Nodes (8): CATEGORY_MAP, client, main(), normalizeKeywords(), resolveCategory(), Row, SCHEMA_CATEGORIES, STATIC_CATEGORY_BY_SLUG

### Community 104 - "Community 104"
Cohesion: 0.36
Nodes (6): PROFILE_LINK_DEFINITIONS, ProfileLinkDefinition, ProfileLinkKey, FooterProfileLinks(), ProfileLinkItem(), ProfileLinks

### Community 105 - "Community 105"
Cohesion: 0.33
Nodes (3): services, client, PARENT_SLUGS

### Community 106 - "Community 106"
Cohesion: 0.33
Nodes (3): serviceMegaMenuCards, client, LEGACY_HREFS

### Community 108 - "Community 108"
Cohesion: 0.40
Nodes (4): PRODUCT_SURFACES, STATUS_LABEL, STATUS_STYLE, ProductStatus

### Community 109 - "Community 109"
Cohesion: 0.40
Nodes (3): ArticleRelatedLinks(), ResourceLink, InternalLinkGrid()

## Knowledge Gaps
- **622 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `SERVICE_NESTED_REDIRECTS` (+617 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 52` to `Community 9`, `Community 17`, `Community 20`, `Community 26`, `Community 31`, `Community 34`, `Community 38`, `Community 47`, `Community 50`, `Community 56`, `Community 58`, `Community 61`, `Community 62`, `Community 63`, `Community 66`, `Community 67`, `Community 71`, `Community 72`, `Community 75`, `Community 79`, `Community 88`, `Community 89`, `Community 90`, `Community 91`, `Community 92`, `Community 94`, `Community 96`, `Community 104`, `Community 108`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `industries` connect `Community 54` to `Community 66`, `Community 34`, `Community 36`, `Community 103`, `Community 74`, `Community 49`, `Community 84`, `Community 95`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `services` connect `Community 105` to `Community 64`, `Community 1`, `Community 66`, `Community 36`, `Community 44`, `Community 76`, `Community 49`, `Community 29`, `Community 22`, `Community 93`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `breadcrumbJsonLd()` (e.g. with `AlternativeGuidePage()` and `ArticlePage()`) actually correct?**
  _`breadcrumbJsonLd()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _622 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.12631578947368421 - nodes in this community are weakly interconnected._