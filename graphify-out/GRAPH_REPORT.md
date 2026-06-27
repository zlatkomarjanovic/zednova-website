# Graph Report - zednova-website  (2026-06-27)

## Corpus Check
- 253 files · ~340,742 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1380 nodes · 3804 edges · 78 communities (68 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 77 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4c8f149c`
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
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 134 edges
2. `SectionLabel()` - 38 edges
3. `breadcrumbJsonLd()` - 37 edges
4. `Reveal()` - 34 edges
5. `Button()` - 33 edges
6. `getAllPosts()` - 30 edges
7. `BlueprintCross()` - 30 edges
8. `TextReveal()` - 28 edges
9. `BlueprintGrid()` - 26 edges
10. `JsonLd()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `getAllMigrations()`  [INFERRED]
  scripts/verify-nav-data-flow.ts → src/lib/queries.ts
- `buildPostEnrichment()` --calls--> `getInsightOverride()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/insight-overrides.ts
- `buildPostEnrichment()` --calls--> `bodyCharCount()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts
- `buildPostEnrichment()` --calls--> `expandPostBody()`  [EXTRACTED]
  scripts/enrich-insights-posts.ts → src/lib/content/post-extensions.ts
- `main()` --calls--> `getCustomSoftwareNavItems()`  [INFERRED]
  scripts/verify-nav-data-flow.ts → src/lib/queries.ts

## Import Cycles
- None detected.

## Communities (78 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (27): sitemap(), STATIC_ROUTES, buildLlmsFullTxt(), buildLlmsTxt(), LlmsFullInput, InsightsPage(), getAllCaseStudies(), getAllCustomSoftwareSlugs() (+19 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (35): CustomCursor(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), HomePage(), CustomSoftwarePage() (+27 more)

### Community 2 - "Community 2"
Cohesion: 0.36
Nodes (10): serviceGroups, richTextMembers, flatConsultationCtaFields, flatOpenGraphFields, flatPrimaryCtaFields, flatQuickAnswerFields, flatSchemaFields, flatSecondaryCtaFields (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (17): caseStudy, customSoftware, faq, insightCategory, migration, page, portfolioProject, post (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (20): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (24): PRODUCT_SURFACES, STATUS_LABEL, STATUS_STYLE, ArticleFaq(), ArticleFaqAccordion(), ArticleImplementationTable(), ArticleRelatedLinks(), ArticleSources() (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (26): POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel(), labelForIndustry() (+18 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (12): TechStackShowcase(), ArticleCover(), formatDate(), InsightsFeaturedArticle(), MegaMenu(), Navbar(), BEND_SPRING, HighlightRect (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (20): scripts, build, dev, download:logos, download:portfolio, enrich:insights-posts, fix:insights-data, lint (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.14
Nodes (20): CookieConsentContext, CookieConsentContextValue, CookieConsentProvider(), useCookieConsent(), buildConsent(), isRecord(), parseStoredConsent(), readStoredConsent() (+12 more)

### Community 20 - "Community 20"
Cohesion: 0.06
Nodes (59): Author, FaqItem, ServiceGroup, Testimonial, fetchAllCaseStudiesFromSanity(), fetchAllFaqsFromSanity(), fetchAllMigrationsFromSanity(), fetchAllPostsFromSanity() (+51 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (6): COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer(), FooterNavLink(), Service, HoverFlip()

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (9): bootstrapCalQueue(), CalFn, CalGlobal, CalNamespace, CalTheme, ensureCalStub(), loadCalScript(), waitForCalScript() (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (14): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage(), ProjectShowcaseLogo(), ProjectShowcaseLogoProps (+6 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (16): articleBlock, articleFaq, caseResult, ctaFields, featureBullet, mediaAsset, migrationPlatformIcon, objectTypes (+8 more)

### Community 28 - "Community 28"
Cohesion: 0.16
Nodes (10): LenisProvider(), HomePreloader(), dispatchNavbarScrollUpdate(), registerLenis(), scrollToTop(), Logo(), LogoVariant, ZMark() (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.05
Nodes (109): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+101 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.07
Nodes (56): applyInsightOverride(), team, ArticleTakeaways(), uniqueFaqs(), uniqueTakeaways(), ensureArticleCta(), ensureDirectAnswer(), joinWordRange() (+48 more)

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.16
Nodes (9): featuredHomepageIndustries, homepageIndustries, HomepageIndustry, moreHomepageIndustries, CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, IndustryNavShowcaseGrid(), SLIDE_EASE (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.11
Nodes (20): CustomSoftwareGroupSection, CustomSoftwarePageGrids(), IndustriesGroupSection, IndustriesPageGrids(), IndustryParentCard, IndustrySegmentEntry, IndustryCard(), IndustrySpecialtiesGrid() (+12 more)

### Community 35 - "Community 35"
Cohesion: 0.19
Nodes (9): client, isDirectRun, main(), mapArticleBlocksForSanity(), mapFaqsForSanity(), needsArticleBlockFix(), needsFaqFix(), RawArticleBlock (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.08
Nodes (16): customSoftwareGroups, industryNavItems, serviceNavGroups, portfolioProjects, allTags, caseStudiesByService, CATEGORY_ICONS, categoryTitles (+8 more)

### Community 37 - "Community 37"
Cohesion: 0.09
Nodes (30): AUTHOR_SLUG_ALIASES, resolveAuthorSlugs(), enrichMigration(), getAdjacentPosts(), getAllCustomSoftware(), getAuthor(), getCaseStudyBySlug(), getCustomSoftwareBySlug() (+22 more)

### Community 38 - "Community 38"
Cohesion: 0.19
Nodes (6): CountUp(), CountUpProps, BenefitItem, BenefitsGrid(), StatsRow(), BlueprintGridCrosses()

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): schemaTypes, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.29
Nodes (8): getInsightOverride(), bodyCharCount(), expandPostBody(), expansionSections(), EXTENDED_POST_TAGS, paragraphFromTakeaways(), client, main()

### Community 43 - "Community 43"
Cohesion: 0.29
Nodes (6): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, WebsiteBuilderAnimation()

### Community 44 - "Community 44"
Cohesion: 0.29
Nodes (9): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, summarizeWithLabel(), AiFabButton(), AiFabLogo(), AiFabTooltip(), AiSummaryFab() (+1 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (13): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, extendedObjectTypes (+5 more)

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): industry, industryCategories, industryFields, industryGroups, industryParent, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.10
Nodes (25): ContactPage(), caseStudies, ecommerceNavServices, products, siteSettings, CATEGORY_ORDER, getAllProducts(), getContactIndustryOptions() (+17 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.32
Nodes (7): checkHtml(), checkRobots(), DUPLICATE_LABEL_PATTERNS, LIVE, main(), PAGES, SPLIT_PATTERNS

### Community 50 - "Community 50"
Cohesion: 0.09
Nodes (28): Migration, CustomSoftwareGroupSection, customSoftwareNavItems, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards (+20 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.10
Nodes (20): ArticleInlineCta(), ArticleQuickAnswer(), ArticleAudienceLine(), ArticleCard(), ArticleCardShowcaseBody(), formatDate(), ArticleContinueReading(), buildIntro() (+12 more)

### Community 53 - "Community 53"
Cohesion: 0.17
Nodes (19): isIndustryParentRecord(), isIndustrySegment(), isNonEmptyCmsValue(), mergeIndustryRecord(), getCaseStudiesByIndustry(), getIndustryBySlug(), getIndustryPageData(), getIndustryParentBySlug() (+11 more)

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (5): name, overrides, uuid, private, version

### Community 57 - "Community 57"
Cohesion: 0.25
Nodes (5): caseStudyTestimonials, PLATFORM_PROFILES, platformTestimonials, rawPlatformTestimonials, testimonials

### Community 58 - "Community 58"
Cohesion: 0.20
Nodes (7): ArticleBody(), ArticleMobileToc(), ArticleSidebar(), ArticleSidebarProps, TocHeading, parseInlineLinks(), slugify()

### Community 60 - "Community 60"
Cohesion: 0.23
Nodes (11): assetCache, buildIconGallery(), client, getOrUploadPlatformAsset(), iconKey(), main(), migrateLegacyFields(), MIGRATION_ICON_MAP (+3 more)

### Community 61 - "Community 61"
Cohesion: 0.06
Nodes (26): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, assetCache, client, getOrUploadIconAsset(), ICON_MAP, main() (+18 more)

### Community 62 - "Community 62"
Cohesion: 0.17
Nodes (10): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+2 more)

### Community 63 - "Community 63"
Cohesion: 0.27
Nodes (7): FAQ_CATEGORY_ORDER, FaqItem, faqs, groupFaqsByCategory(), homepageFaqs, FaqAccordionItem(), FaqSection()

### Community 64 - "Community 64"
Cohesion: 0.16
Nodes (18): extendedTagsForPost(), AUDIENCE_BY_CATEGORY, buildPostEnrichment(), client, coverCache, difficultyFor(), ensureTagDocuments(), ENTITIES_BY_SLUG (+10 more)

### Community 66 - "Community 66"
Cohesion: 0.12
Nodes (23): FeaturedInsightLink(), formatInsightDate(), IndustryMegaMenuGrid(), InsightsMegaMenuGrid(), LatestInsightLink(), MegaMenuProps, MigrationNavMenuItemLink(), NavItemGrid() (+15 more)

### Community 68 - "Community 68"
Cohesion: 0.19
Nodes (14): industries, ArticleCoverProps, AuthorAvatar(), SIZE, buildCmsImageUrl(), CMS_IMAGE_WIDTHS, CmsImagePreset, cmsImageSrc() (+6 more)

### Community 69 - "Community 69"
Cohesion: 0.24
Nodes (9): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+1 more)

### Community 72 - "Community 72"
Cohesion: 0.50
Nodes (3): product, productStatuses, productTypes

### Community 73 - "Community 73"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 74 - "Community 74"
Cohesion: 0.24
Nodes (5): agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonTableRow()

### Community 79 - "Community 79"
Cohesion: 0.19
Nodes (10): metadata, PILLARS, HOMEPAGE_PRICING_BADGES, HOMEPAGE_PRICING_SLUGS, HomepagePricingPackage, homepagePricingPackages, HomepagePricingSlug, TechStackGroup (+2 more)

### Community 80 - "Community 80"
Cohesion: 0.43
Nodes (4): author, optionalEmail(), optionalUrl(), optionalUrlList()

### Community 81 - "Community 81"
Cohesion: 0.28
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 85 - "Community 85"
Cohesion: 0.50
Nodes (4): mapIconRows(), MigrationIconRow, MigrationPlatformIconSet, resolveMigrationPlatformIcons()

### Community 86 - "Community 86"
Cohesion: 0.19
Nodes (11): fiveMinuteOverride, InsightOverride, OVERRIDES, remainingInsightOverrides, shopifyOverride, ArticleBlock, mapCalloutVariant(), PortableTextBlock (+3 more)

## Knowledge Gaps
- **429 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+424 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 66` to `Community 6`, `Community 9`, `Community 17`, `Community 19`, `Community 22`, `Community 24`, `Community 26`, `Community 28`, `Community 29`, `Community 33`, `Community 34`, `Community 38`, `Community 43`, `Community 44`, `Community 50`, `Community 52`, `Community 61`, `Community 62`, `Community 63`, `Community 68`, `Community 69`, `Community 74`, `Community 79`, `Community 81`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `Post` connect `Community 52` to `Community 0`, `Community 66`, `Community 68`, `Community 6`, `Community 41`, `Community 47`, `Community 17`, `Community 83`, `Community 20`, `Community 58`, `Community 31`, `Community 63`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `posts` connect `Community 83` to `Community 64`, `Community 36`, `Community 47`, `Community 49`, `Community 31`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `breadcrumbJsonLd()` (e.g. with `ArticlePage()` and `CaseStudyPage()`) actually correct?**
  _`breadcrumbJsonLd()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _429 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11174242424242424 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09102564102564102 - nodes in this community are weakly interconnected._