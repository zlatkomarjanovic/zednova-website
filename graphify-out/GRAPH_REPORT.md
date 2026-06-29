# Graph Report - zednova-website  (2026-06-29)

## Corpus Check
- 264 files · ~352,328 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1455 nodes · 4029 edges · 94 communities (84 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `63e0523f`
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
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 139 edges
2. `breadcrumbJsonLd()` - 41 edges
3. `SectionLabel()` - 40 edges
4. `getAllPosts()` - 39 edges
5. `Reveal()` - 36 edges
6. `Button()` - 34 edges
7. `TextReveal()` - 30 edges
8. `BlueprintCross()` - 30 edges
9. `BlueprintGrid()` - 28 edges
10. `JsonLd()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `getAllPosts()`  [EXTRACTED]
  scripts/patch-cover-captions.ts → src/lib/queries.ts
- `main()` --calls--> `getAllMigrations()`  [INFERRED]
  scripts/verify-nav-data-flow.ts → src/lib/queries.ts
- `buildPostEnrichment()` --calls--> `getInsightOverride()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/insight-overrides.ts
- `buildPostEnrichment()` --calls--> `bodyCharCount()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts
- `buildPostEnrichment()` --calls--> `expandPostBody()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts

## Import Cycles
- None detected.

## Communities (94 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.21
Nodes (8): CustomCursor(), PageTransition(), geistMono, instrumentSerif, metadata, industryNavItems, team, getSiteSettings()

### Community 1 - "Community 1"
Cohesion: 0.27
Nodes (11): sitemap(), STATIC_ROUTES, buildLlmsFullTxt(), getAllCaseStudies(), getAllIndustrySlugs(), getAllMigrations(), getFeaturedCaseStudies(), GET() (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.36
Nodes (10): serviceGroups, richTextMembers, flatConsultationCtaFields, flatOpenGraphFields, flatPrimaryCtaFields, flatQuickAnswerFields, flatSchemaFields, flatSecondaryCtaFields (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (14): caseStudy, customSoftware, faq, insightCategory, migration, portfolioProject, post, service (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (20): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (28): ecommerceNavServices, defaultProfileLinks, PROFILE_LINK_DEFINITIONS, ProfileLinkDefinition, ProfileLinkKey, services, siteSettings, FooterProfileLinks() (+20 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.22
Nodes (9): bootstrapCalQueue(), CalFn, CalGlobal, CalNamespace, CalTheme, ensureCalStub(), loadCalScript(), waitForCalScript() (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (10): ArticleBody(), ArticleMobileToc(), ArticleSidebar(), ArticleSidebarProps, SidebarAccordionSection(), TocHeading, parseInlineLinks(), staticInsightCategories() (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (21): scripts, build, dev, download:logos, download:portfolio, enrich:insights-posts, fix:insights-data, lint (+13 more)

### Community 19 - "Community 19"
Cohesion: 0.14
Nodes (20): CookieConsentContext, CookieConsentContextValue, CookieConsentProvider(), useCookieConsent(), buildConsent(), isRecord(), parseStoredConsent(), readStoredConsent() (+12 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (39): fetchIndustryBySlugFromSanity(), fetchIndustryParentBySlugFromSanity(), fetchPostBySlugFromSanity(), mapCaseStudy(), mapCustomSoftware(), mapFaq(), mapFaqs(), mapFeatureBullets() (+31 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.22
Nodes (6): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, FeatureBullet, SeoFields, CustomSoftware

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.12
Nodes (20): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage(), PricingCardsSection(), ProjectShowcaseLogo() (+12 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (16): articleBlock, articleFaq, caseResult, ctaFields, featureBullet, mediaAsset, migrationPlatformIcon, objectTypes (+8 more)

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (14): FeaturedInsightLink(), formatInsightDate(), IndustryMegaMenuGrid(), InsightsMegaMenuGrid(), LatestInsightLink(), MegaMenu(), MegaMenuProps, MigrationNavMenuItemLink() (+6 more)

### Community 29 - "Community 29"
Cohesion: 0.15
Nodes (13): fiveMinuteOverride, InsightOverride, OVERRIDES, remainingInsightOverrides, shopifyOverride, INSIGHT_POST_EXPANSIONS, InsightExpansion, mergeInsightExpansion() (+5 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.05
Nodes (64): applyInsightOverride(), posts, ArticleTakeaways(), uniqueFaqs(), uniqueTakeaways(), ensureArticleCta(), ensureDirectAnswer(), joinWordRange() (+56 more)

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.11
Nodes (31): AlternativesIndexPage(), metadata, Reveal(), CompareIndexPage(), metadata, AlternativeGuide, alternatives, Comparison (+23 more)

### Community 34 - "Community 34"
Cohesion: 0.09
Nodes (21): HomepageIndustry, CustomSoftwareGroupSection, CustomSoftwarePageGrids(), IndustriesGroupSection, IndustriesPageGrids(), IndustryParentCard, IndustrySegmentEntry, IndustryNavShowcaseGrid() (+13 more)

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (7): ArticleCard(), ArticleCardShowcaseBody(), formatDate(), ArticleTags(), Tag(), TagVariant, VARIANTS

### Community 36 - "Community 36"
Cohesion: 0.10
Nodes (12): allTags, caseStudiesByService, CATEGORY_ICONS, categoryTitles, client, LEGACY_PARENT_SLUGS, Mutation, mutations (+4 more)

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (11): client, isDirectRun, main(), mapArticleBlocksForSanity(), mapFaqsForSanity(), needsArticleBlockFix(), needsFaqFix(), normalizeInlineFaqs() (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.24
Nodes (4): CountUp(), CountUpProps, StatsRow(), BlueprintGridCrosses()

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): schemaTypes, GROUPED_TYPES, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.11
Nodes (27): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+19 more)

### Community 43 - "Community 43"
Cohesion: 0.14
Nodes (15): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), byKey(), CRMAutomationAnimation(), edge(), flowKeyframes (+7 more)

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (15): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, AiSummaryPromptKey, aiSummaryPrompts, buildAiSummaryPrompt(), defaultAiSummaryPageUrl(), PROMPT_KEY_BY_MODEL_ID (+7 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (13): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, extendedObjectTypes (+5 more)

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): industry, industryCategories, industryFields, industryGroups, industryParent, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.09
Nodes (35): caseStudies, portfolioProjects, products, CATEGORY_ORDER, IndustryPageData, staticCustomSoftwareItems, staticTestimonialImages, CaseStudy (+27 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.27
Nodes (7): CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, BUDGET_OPTIONS, ContactInput, contactSchema, ContactForm()

### Community 50 - "Community 50"
Cohesion: 0.08
Nodes (24): customSoftwareGroups, CustomSoftwareGroupSection, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceNavGroups, DIRECT_LINKS (+16 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.18
Nodes (22): IndustryCard(), IndustrySpecialtiesGrid(), ParentIndustryLink(), isIndustryParentRecord(), isIndustrySegment(), isNonEmptyCmsValue(), mergeIndustryRecord(), getCaseStudiesByIndustry() (+14 more)

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (13): BenefitItem, BenefitsGrid(), ArticleCoverProps, AuthorAvatar(), SIZE, buildCmsImageUrl(), CMS_IMAGE_WIDTHS, CmsImagePreset (+5 more)

### Community 54 - "Community 54"
Cohesion: 0.15
Nodes (17): CustomSoftwarePage(), applyTestimonialImageFallback(), fromSanity(), getAllServices(), getAllTestimonials(), getCustomSoftwareGroups(), getCustomSoftwareNavItems(), getPlatformTestimonials() (+9 more)

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): name, overrides, uuid, private, version

### Community 56 - "Community 56"
Cohesion: 0.16
Nodes (17): articleBlocksToPortableText(), sanityKey(), textBlock(), client, deleteRemovedTypes(), DOC_LEGACY_UNSET, DRY_RUN, LegacyPost (+9 more)

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (13): ContactPage(), POST(), findIndustryLabel(), findProductLabel(), findServiceLabel(), labelForIndustry(), labelForService(), resolveContactPrefill() (+5 more)

### Community 58 - "Community 58"
Cohesion: 0.12
Nodes (11): buildLlmsTxt(), LlmsFullInput, Migration, customSoftwareNavItems, serviceMegaMenuCards, COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer() (+3 more)

### Community 59 - "Community 59"
Cohesion: 0.20
Nodes (11): TechStackShowcase(), TechStackShowcaseProps, formatDate(), InsightsFeaturedArticle(), Navbar(), BEND_SPRING, HighlightRect, RubberHoverHighlightLayer() (+3 more)

### Community 60 - "Community 60"
Cohesion: 0.23
Nodes (11): assetCache, buildIconGallery(), client, getOrUploadPlatformAsset(), iconKey(), main(), migrateLegacyFields(), MIGRATION_ICON_MAP (+3 more)

### Community 61 - "Community 61"
Cohesion: 0.09
Nodes (16): CATEGORY_LABELS, CATEGORY_ORDER, FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants, SERVICE_FILTER_ORDER (+8 more)

### Community 62 - "Community 62"
Cohesion: 0.32
Nodes (5): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep()

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (5): caseStudyTestimonials, PLATFORM_PROFILES, platformTestimonials, rawPlatformTestimonials, testimonials

### Community 64 - "Community 64"
Cohesion: 0.16
Nodes (18): extendedTagsForPost(), AUDIENCE_BY_CATEGORY, buildPostEnrichment(), client, coverCache, difficultyFor(), ensureTagDocuments(), ENTITIES_BY_SLUG (+10 more)

### Community 66 - "Community 66"
Cohesion: 0.15
Nodes (13): FAQ_CATEGORY_ORDER, FaqItem, faqs, groupFaqsByCategory(), homepageFaqs, FaqAccordionItem(), FaqSection(), ArticleContinueReading() (+5 more)

### Community 67 - "Community 67"
Cohesion: 0.17
Nodes (12): cookiePolicyIntro, LegalDocument, LegalSection, privacyPolicyDocument, termsDocument, metadata, LegalPageContent(), metadata (+4 more)

### Community 68 - "Community 68"
Cohesion: 0.28
Nodes (6): assetCache, client, getOrUploadIconAsset(), ICON_MAP, main(), navIconField()

### Community 69 - "Community 69"
Cohesion: 0.14
Nodes (13): ArticleInlineCta(), ArticleQuickAnswer(), ArticleAudienceLine(), ArticleRelatedLinks(), ArticleShare(), getAdjacentPosts(), getRelatedInsights(), getRelatedPosts() (+5 more)

### Community 70 - "Community 70"
Cohesion: 0.18
Nodes (11): ecommerceSegments, fitnessSegments, healthcareSegments, parentServices(), professionalSegments, realEstateSegments, saasSegments, segment() (+3 more)

### Community 71 - "Community 71"
Cohesion: 0.12
Nodes (24): getAllCustomSoftware(), getAllCustomSoftwareSlugs(), getAuthor(), getCaseStudyBySlug(), getCustomSoftwareBySlug(), getPostBySlug(), getServiceBySlug(), mergeCustomSoftware() (+16 more)

### Community 72 - "Community 72"
Cohesion: 0.50
Nodes (3): product, productStatuses, productTypes

### Community 73 - "Community 73"
Cohesion: 0.12
Nodes (28): getServiceQuickAnswer(), SERVICE_QUICK_ANSWERS, ServiceQuickAnswer, ProcessSteps(), Step, getCaseStudiesByService(), getCustomSoftwareRelatedPortfolioProjects(), getIndustryTitle() (+20 more)

### Community 74 - "Community 74"
Cohesion: 0.38
Nodes (4): LenisProvider(), dispatchNavbarScrollUpdate(), registerLenis(), scrollToTop()

### Community 75 - "Community 75"
Cohesion: 0.10
Nodes (24): BlueprintGrid(), BlueprintGridProps, RevealProps, Stagger(), StaggerProps, metadata, STEPS, CalBookingEmbed() (+16 more)

### Community 76 - "Community 76"
Cohesion: 0.27
Nodes (8): bodyCharCount(), mapCalloutVariant(), PortableTextBlock, PortableTextChild, portableTextToArticleBlocks(), spanText(), client, main()

### Community 78 - "Community 78"
Cohesion: 0.43
Nodes (5): iconSvg(), main(), MARK_PATHS, root, writePng()

### Community 79 - "Community 79"
Cohesion: 0.12
Nodes (15): metadata, PILLARS, agencyComparison, ComparisonRow, ComparisonSection, HOMEPAGE_PRICING_BADGES, HOMEPAGE_PRICING_SLUGS, HomepagePricingPackage (+7 more)

### Community 80 - "Community 80"
Cohesion: 0.43
Nodes (4): author, optionalEmail(), optionalUrl(), optionalUrlList()

### Community 81 - "Community 81"
Cohesion: 0.28
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 82 - "Community 82"
Cohesion: 0.19
Nodes (9): brandWordmark, HomePreloader(), ArticleCover(), FilterPost, InsightsFilterableGrid(), Logo(), LogoVariant, Z_MARK_PATHS (+1 more)

### Community 83 - "Community 83"
Cohesion: 0.32
Nodes (12): RootLayout(), HomePage(), IndustriesPage(), getAllIndustries(), getFeaturedHomepageIndustries(), getHomepageIndustries(), getIndustryGroups(), getIndustryNavItems() (+4 more)

### Community 84 - "Community 84"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 85 - "Community 85"
Cohesion: 0.22
Nodes (9): enrichMigration(), getMigrationBySlug(), mapIconRows(), MigrationIconRow, MigrationPlatformIconSet, PlatformIcon, resolveMigrationPlatformIcons(), fetchMigrationBySlugFromSanity() (+1 more)

### Community 86 - "Community 86"
Cohesion: 0.24
Nodes (8): featuredHomepageIndustries, homepageIndustries, moreHomepageIndustries, CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, industries, CaseStudyCard(), industryTitle()

### Community 88 - "Community 88"
Cohesion: 0.33
Nodes (6): getAllProducts(), getProductsByIndustry(), getProductsByService(), getProductsByType(), ProductsPage(), ResourcesPage()

### Community 89 - "Community 89"
Cohesion: 0.40
Nodes (4): EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline(), LONGEST_PHRASE

### Community 90 - "Community 90"
Cohesion: 0.53
Nodes (5): getInsightOverride(), expandPostBody(), expansionSections(), EXTENDED_POST_TAGS, paragraphFromTakeaways()

### Community 91 - "Community 91"
Cohesion: 0.50
Nodes (4): AUTHOR_SLUG_ALIASES, resolveAuthorSlugs(), fetchAuthorBySlugFromSanity(), mapAuthor()

### Community 92 - "Community 92"
Cohesion: 0.22
Nodes (8): InsightsPage(), getAllFaqs(), getAllInsightCategories(), getAllPosts(), getFeaturedPost(), getInsightsByProduct(), getInsightsNavPosts(), main()

### Community 93 - "Community 93"
Cohesion: 0.60
Nodes (3): ArticleFaq(), ArticleFaqAccordion(), ArticleFaq

## Knowledge Gaps
- **454 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+449 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 26` to `Community 6`, `Community 9`, `Community 17`, `Community 19`, `Community 28`, `Community 33`, `Community 34`, `Community 35`, `Community 38`, `Community 41`, `Community 43`, `Community 44`, `Community 49`, `Community 50`, `Community 52`, `Community 53`, `Community 58`, `Community 59`, `Community 61`, `Community 62`, `Community 66`, `Community 69`, `Community 73`, `Community 75`, `Community 79`, `Community 81`, `Community 82`, `Community 86`, `Community 93`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `breadcrumbJsonLd()` connect `Community 33` to `Community 67`, `Community 69`, `Community 41`, `Community 73`, `Community 83`, `Community 52`, `Community 54`, `Community 31`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `getAllPosts()` connect `Community 92` to `Community 64`, `Community 1`, `Community 33`, `Community 69`, `Community 41`, `Community 73`, `Community 47`, `Community 79`, `Community 83`, `Community 52`, `Community 54`, `Community 31`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `breadcrumbJsonLd()` (e.g. with `AlternativeGuidePage()` and `ArticlePage()`) actually correct?**
  _`breadcrumbJsonLd()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `getAllPosts()` (e.g. with `main()` and `ArticlePage()`) actually correct?**
  _`getAllPosts()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _454 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.12631578947368421 - nodes in this community are weakly interconnected._