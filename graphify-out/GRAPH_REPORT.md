# Graph Report - zednova-website  (2026-06-30)

## Corpus Check
- 276 files · ~360,245 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1549 nodes · 4247 edges · 95 communities (84 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `07165cfb`
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
- [[_COMMUNITY_Community 98|Community 98]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 145 edges
2. `breadcrumbJsonLd()` - 43 edges
3. `SectionLabel()` - 43 edges
4. `getAllPosts()` - 40 edges
5. `Reveal()` - 39 edges
6. `Button()` - 35 edges
7. `TextReveal()` - 31 edges
8. `BlueprintCross()` - 30 edges
9. `BlueprintGrid()` - 29 edges
10. `JsonLd()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `getAllPosts()`  [EXTRACTED]
  scripts/patch-cover-captions.ts → src/lib/queries.ts
- `main()` --calls--> `getAllMigrations()`  [INFERRED]
  scripts/verify-nav-data-flow.ts → src/lib/queries.ts
- `main()` --calls--> `getAllPosts()`  [INFERRED]
  scripts/verify-post-images.ts → src/lib/queries.ts
- `buildPostEnrichment()` --calls--> `bodyCharCount()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts
- `buildPostEnrichment()` --calls--> `articleBlocksToPortableText()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/sanity/blocks-to-portable-text.ts

## Import Cycles
- None detected.

## Communities (95 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (14): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage(), ProjectShowcaseLogo(), ProjectShowcaseLogoProps (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (10): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+2 more)

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
Cohesion: 0.07
Nodes (32): ecommerceNavServices, buildLlmsTxt(), LlmsFullInput, Migration, products, PRODUCT_SURFACES, STATUS_LABEL, STATUS_STYLE (+24 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (40): ContactPage(), metadata, STEPS, POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel() (+32 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (22): scripts, audit:cms-images, build, dev, download:logos, download:portfolio, enrich:insights-posts, fix:insights-data (+14 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (9): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, assetCache, client, getOrUploadIconAsset(), ICON_MAP, main() (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (46): InsightCategory, PriceTier, ProductType, mapIconRows(), MigrationIconRow, MigrationPlatformIconSet, migrationPlatformLabel(), PlatformIcon (+38 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (14): Reveal(), RevealProps, StaggerProps, TextReveal(), TextRevealProps, TechStackGroup, techStackGroups, PageHero() (+6 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.20
Nodes (11): cookiePolicyIntro, LegalDocument, LegalSection, privacyPolicyDocument, termsDocument, LegalPageContent(), LegalPageContentProps, metadata (+3 more)

### Community 27 - "Community 27"
Cohesion: 0.10
Nodes (19): articleBlock, articleFaq, caseResult, caseStudyScreenshot, ctaFields, featureBullet, mediaAsset, migrationPlatformIcon (+11 more)

### Community 28 - "Community 28"
Cohesion: 0.10
Nodes (28): PricingCardsSection(), TechStackShowcase(), FeaturedInsightLink(), formatInsightDate(), IndustryMegaMenuGrid(), InsightsMegaMenuGrid(), LatestInsightLink(), MegaMenu() (+20 more)

### Community 29 - "Community 29"
Cohesion: 0.15
Nodes (14): applyInsightOverride(), fiveMinuteOverride, InsightOverride, OVERRIDES, remainingInsightOverrides, shopifyOverride, INSIGHT_POST_EXPANSIONS, InsightExpansion (+6 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.23
Nodes (16): applyIndustryDetailOverride(), isIndustryParentRecord(), isIndustrySegment(), isNonEmptyCmsValue(), mergeIndustryRecord(), getCaseStudiesByIndustry(), getIndustryBySlug(), getIndustryPageData() (+8 more)

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (13): CustomCursor(), PageTransition(), geistMono, instrumentSerif, metadata, customSoftwareNavItems, industryNavItems, serviceNavGroups (+5 more)

### Community 34 - "Community 34"
Cohesion: 0.06
Nodes (33): HomepageIndustry, aestheticClinics, dentalClinics, IndustryOverride, medspas, overrides, skincareBrands, skincareClinics (+25 more)

### Community 35 - "Community 35"
Cohesion: 0.11
Nodes (25): groupFaqsByCategory(), FaqAccordionItem(), FaqSection(), ArticleCard(), ArticleCardShowcaseBody(), formatDate(), ArticleContinueReading(), buildIntro() (+17 more)

### Community 36 - "Community 36"
Cohesion: 0.06
Nodes (21): caseStudies, posts, services, CaseStudy, client, main(), allTags, caseStudiesByService (+13 more)

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (11): client, isDirectRun, main(), mapArticleBlocksForSanity(), mapFaqsForSanity(), needsArticleBlockFix(), needsFaqFix(), normalizeInlineFaqs() (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (5): CountUp(), CountUpProps, StatsRow(), SiteSettings, BlueprintGridCrosses()

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): schemaTypes, GROUPED_TYPES, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.19
Nodes (13): AlternativesIndexPage(), CompareIndexPage(), metadata, Comparison, comparisons, breadcrumbJsonLd(), collectionPageJsonLd(), metadata (+5 more)

### Community 43 - "Community 43"
Cohesion: 0.14
Nodes (15): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), byKey(), CRMAutomationAnimation(), edge(), flowKeyframes (+7 more)

### Community 44 - "Community 44"
Cohesion: 0.12
Nodes (28): aboutPageJsonLd(), ArticleJsonLdInput, articlePageGraphJsonLd(), articleTocJsonLd(), caseStudyJsonLd(), estimateWordCount(), HomepageGraphCaseStudy, HomepageGraphComparison (+20 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (13): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, extendedObjectTypes (+5 more)

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): industry, industryCategories, industryFields, industryGroups, industryParent, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.10
Nodes (33): CATEGORY_ORDER, IndustryPageData, staticCustomSoftwareItems, staticTestimonialImages, Author, fetchAllCaseStudiesFromSanity(), fetchAllCustomSoftwareFromSanity(), fetchAllFaqsFromSanity() (+25 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.21
Nodes (16): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, AiSummaryPromptKey, aiSummaryPrompts, buildAiSummaryPrompt(), defaultAiSummaryPageUrl(), PROMPT_KEY_BY_MODEL_ID (+8 more)

### Community 50 - "Community 50"
Cohesion: 0.13
Nodes (13): Accordion(), DIRECT_LINKS, LINKS_AFTER_INDUSTRIES, LINKS_BEFORE_ABOUT, MENU_EASE, MobileMenu(), mobileNav, mobileNavItem (+5 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.32
Nodes (3): FooterNavLink(), HoverFlip(), useMobileTouchUi()

### Community 53 - "Community 53"
Cohesion: 0.17
Nodes (15): industries, BenefitItem, BenefitsGrid(), AuthorAvatar(), SIZE, buildCmsImageUrl(), CMS_IMAGE_WIDTHS, CmsImagePreset (+7 more)

### Community 54 - "Community 54"
Cohesion: 0.13
Nodes (28): HomePage(), sitemap(), STATIC_ROUTES, buildLlmsFullTxt(), getAllCaseStudies(), getAllCustomSoftwareSlugs(), getAllIndustrySlugs(), getAllMigrations() (+20 more)

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): name, overrides, uuid, private, version

### Community 56 - "Community 56"
Cohesion: 0.16
Nodes (17): articleBlocksToPortableText(), sanityKey(), textBlock(), client, deleteRemovedTypes(), DOC_LEGACY_UNSET, DRY_RUN, LegacyPost (+9 more)

### Community 57 - "Community 57"
Cohesion: 0.28
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 58 - "Community 58"
Cohesion: 0.16
Nodes (16): enrichMigration(), getCaseStudiesByService(), getCustomSoftwareRelatedPortfolioProjects(), getInsightsByMigration(), getInsightsByService(), getMigrationBySlug(), getPortfolioProjects(), getServiceRelatedPortfolioProjects() (+8 more)

### Community 59 - "Community 59"
Cohesion: 0.18
Nodes (6): agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonIconCell(), ComparisonTableRow()

### Community 60 - "Community 60"
Cohesion: 0.23
Nodes (11): assetCache, buildIconGallery(), client, getOrUploadPlatformAsset(), iconKey(), main(), migrateLegacyFields(), MIGRATION_ICON_MAP (+3 more)

### Community 61 - "Community 61"
Cohesion: 0.08
Nodes (18): CATEGORY_LABELS, CATEGORY_ORDER, enrichNavItem(), FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants (+10 more)

### Community 62 - "Community 62"
Cohesion: 0.17
Nodes (10): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+2 more)

### Community 63 - "Community 63"
Cohesion: 0.07
Nodes (39): AnalyticsEvent, AnalyticsEventProps, TrackProps, OutboundLinkTracker(), analyticsAllowed(), trackConversion(), trackLinkClick(), rec() (+31 more)

### Community 64 - "Community 64"
Cohesion: 0.13
Nodes (23): getInsightOverride(), expandPostBody(), expansionSections(), EXTENDED_POST_TAGS, extendedTagsForPost(), paragraphFromTakeaways(), AUDIENCE_BY_CATEGORY, buildPostEnrichment() (+15 more)

### Community 66 - "Community 66"
Cohesion: 0.50
Nodes (4): AUTHOR_SLUG_ALIASES, resolveAuthorSlugs(), fetchAuthorBySlugFromSanity(), mapAuthor()

### Community 67 - "Community 67"
Cohesion: 0.12
Nodes (17): customSoftwareGroups, CustomSoftwareGroupSection, megaMenuNavLinks, NavMenuGroup, NavMenuItem, PRIMARY_SERVICE_GROUPS, PRIMARY_SERVICE_TAB_LABELS, PRIMARY_SERVICE_TAGLINES (+9 more)

### Community 68 - "Community 68"
Cohesion: 0.15
Nodes (7): serviceMegaMenuCards, COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer(), LEGACY_LINKS, SECONDARY_TECH_LINKS, NavMenuItem

### Community 69 - "Community 69"
Cohesion: 0.09
Nodes (23): ArticleInlineCta(), ArticleQuickAnswer(), ArticleAudienceLine(), ArticleBody(), ArticleShare(), ArticleMobileToc(), ArticleSidebar(), ArticleSidebarProps (+15 more)

### Community 70 - "Community 70"
Cohesion: 0.16
Nodes (12): ecommerceSegments, fitnessSegments, healthcareSegments, parentServices(), professionalSegments, realEstateSegments, saasSegments, segment() (+4 more)

### Community 71 - "Community 71"
Cohesion: 0.19
Nodes (22): RootLayout(), IndustriesPage(), fromSanity(), getAllCustomSoftware(), getAllIndustries(), getCaseStudyBySlug(), getCustomSoftwareBySlug(), getFeaturedHomepageIndustries() (+14 more)

### Community 72 - "Community 72"
Cohesion: 0.50
Nodes (3): product, productStatuses, productTypes

### Community 73 - "Community 73"
Cohesion: 0.16
Nodes (19): getServiceQuickAnswer(), SERVICE_QUICK_ANSWERS, ServiceQuickAnswer, ProcessSteps(), Step, getIndustryTitle(), faqPageJsonLd(), FaqSection() (+11 more)

### Community 74 - "Community 74"
Cohesion: 0.27
Nodes (6): LenisProvider(), dispatchNavbarScrollUpdate(), registerLenis(), scrollToTop(), LogoHomeLink(), LogoHomeLinkProps

### Community 75 - "Community 75"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 76 - "Community 76"
Cohesion: 0.27
Nodes (8): bodyCharCount(), mapCalloutVariant(), PortableTextBlock, PortableTextChild, portableTextToArticleBlocks(), spanText(), client, main()

### Community 78 - "Community 78"
Cohesion: 0.43
Nodes (5): iconSvg(), main(), MARK_PATHS, root, writePng()

### Community 79 - "Community 79"
Cohesion: 0.15
Nodes (10): LINKS, LINKS_AFTER_INDUSTRIES, LINKS_BEFORE_ABOUT, MegaMenuType, MegaTrigger(), MENU_EASE, MENU_ORDER, NavbarProps (+2 more)

### Community 80 - "Community 80"
Cohesion: 0.43
Nodes (4): author, optionalEmail(), optionalUrl(), optionalUrlList()

### Community 81 - "Community 81"
Cohesion: 0.33
Nodes (5): brandWordmark, HomePreloader(), Logo(), LogoVariant, Z_MARK_PATHS

### Community 82 - "Community 82"
Cohesion: 0.32
Nodes (15): absoluteUrl(), assertDirectAnswer(), assertMetadataBasics(), bodyHasGenericFiller(), bodyHasInternalLinks(), buildGraphForPost(), collectEmptyValues(), countMajorSections() (+7 more)

### Community 83 - "Community 83"
Cohesion: 0.17
Nodes (9): SITE_ORIGIN, checkHtml(), checkRobots(), DUPLICATE_LABEL_PATTERNS, LIVE, main(), PAGES, SPLIT_PATTERNS (+1 more)

### Community 84 - "Community 84"
Cohesion: 0.12
Nodes (17): metadata, PILLARS, FAQ_CATEGORY_ORDER, FaqItem, faqs, homepageFaqs, homepageIndustries, HOMEPAGE_PRICING_BADGES (+9 more)

### Community 85 - "Community 85"
Cohesion: 0.32
Nodes (8): ArticleTakeaways(), uniqueFaqs(), uniqueTakeaways(), ensureArticleCta(), ensureDirectAnswer(), joinWordRange(), words(), normalizeInsightPost()

### Community 86 - "Community 86"
Cohesion: 0.22
Nodes (6): caseStudyTestimonials, PLATFORM_PROFILES, platformTestimonials, rawPlatformTestimonials, testimonials, Testimonial

### Community 88 - "Community 88"
Cohesion: 0.12
Nodes (30): BlueprintGrid(), BlueprintGridProps, Stagger(), migrations, metadata, DarkCTA(), ProductCard(), metadata (+22 more)

### Community 89 - "Community 89"
Cohesion: 0.20
Nodes (8): CustomSoftwarePage(), getCustomSoftwareGroups(), getCustomSoftwareNavItems(), getServiceGroups(), getServiceNavGroups(), main(), navGroupItems(), ServicesPage()

### Community 90 - "Community 90"
Cohesion: 0.33
Nodes (5): featuredHomepageIndustries, moreHomepageIndustries, CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, IndustryParent

### Community 91 - "Community 91"
Cohesion: 0.33
Nodes (6): applyTestimonialImageFallback(), getAllTestimonials(), getPlatformTestimonials(), getPostsBySlugs(), getTestimonialById(), CaseStudyPage()

### Community 92 - "Community 92"
Cohesion: 0.15
Nodes (14): metadata, AlternativeGuide, alternatives, CookieSettingsPage(), metadata, metadata, SitemapGroup, BestForNotBestFor() (+6 more)

### Community 93 - "Community 93"
Cohesion: 0.40
Nodes (4): sanityClient, sanityFetch(), sanityFetchOptions, hasSanityReadToken()

### Community 98 - "Community 98"
Cohesion: 0.40
Nodes (3): client, DOC_TYPES, Row

## Knowledge Gaps
- **489 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+484 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 28` to `Community 0`, `Community 6`, `Community 9`, `Community 22`, `Community 34`, `Community 35`, `Community 38`, `Community 43`, `Community 49`, `Community 50`, `Community 52`, `Community 53`, `Community 57`, `Community 59`, `Community 61`, `Community 62`, `Community 63`, `Community 68`, `Community 69`, `Community 73`, `Community 79`, `Community 81`, `Community 88`, `Community 92`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 88` to `Community 1`, `Community 35`, `Community 69`, `Community 6`, `Community 41`, `Community 9`, `Community 73`, `Community 28`, `Community 79`, `Community 50`, `Community 84`, `Community 22`, `Community 92`, `Community 62`, `Community 63`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `customSoftwareItems` connect `Community 19` to `Community 36`, `Community 47`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `breadcrumbJsonLd()` (e.g. with `AlternativeGuidePage()` and `ArticlePage()`) actually correct?**
  _`breadcrumbJsonLd()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `getAllPosts()` (e.g. with `main()` and `ArticlePage()`) actually correct?**
  _`getAllPosts()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _489 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12666666666666668 - nodes in this community are weakly interconnected._