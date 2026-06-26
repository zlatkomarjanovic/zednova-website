# Graph Report - zednova-website  (2026-06-26)

## Corpus Check
- 210 files · ~320,034 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1110 nodes · 3138 edges · 68 communities (61 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 66 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b43b9cd8`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 113 edges
2. `breadcrumbJsonLd()` - 37 edges
3. `SectionLabel()` - 36 edges
4. `Reveal()` - 33 edges
5. `Button()` - 31 edges
6. `BlueprintCross()` - 28 edges
7. `TextReveal()` - 27 edges
8. `BlueprintGrid()` - 26 edges
9. `getAllPosts()` - 26 edges
10. `JsonLd()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllCustomSoftwareSlugs()`  [INFERRED]
  src/app/custom-software/[slug]/page.tsx → src/lib/queries.ts
- `generateMetadata()` --calls--> `getCustomSoftwareBySlug()`  [INFERRED]
  src/app/custom-software/[slug]/page.tsx → src/lib/queries.ts
- `CustomSoftwareDetailPage()` --calls--> `getAllPosts()`  [INFERRED]
  src/app/custom-software/[slug]/page.tsx → src/lib/queries.ts
- `CustomSoftwareDetailPage()` --calls--> `getCustomSoftwareBySlug()`  [INFERRED]
  src/app/custom-software/[slug]/page.tsx → src/lib/queries.ts
- `CustomSoftwareDetailPage()` --calls--> `getCustomSoftwareRelatedPortfolioProjects()`  [INFERRED]
  src/app/custom-software/[slug]/page.tsx → src/lib/queries.ts

## Import Cycles
- None detected.

## Communities (68 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.19
Nodes (17): isIndustryParentRecord(), isIndustrySegment(), isNonEmptyCmsValue(), mergeIndustryRecord(), getCaseStudiesByIndustry(), getIndustryPageData(), getIndustryParentBySlug(), getIndustryRelatedPortfolioProjects() (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (53): ContactPage(), caseStudies, ecommerceNavServices, portfolioProjects, posts, products, services, siteSettings (+45 more)

### Community 2 - "Community 2"
Cohesion: 0.28
Nodes (13): post, productStatuses, productTypes, serviceGroups, richTextMembers, flatConsultationCtaFields, flatOpenGraphFields, flatPrimaryCtaFields (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (18): author, caseStudy, customSoftware, faq, insightCategory, migration, page, portfolioProject (+10 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (45): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+37 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (4): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, CustomSoftware

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (34): POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel(), labelForIndustry() (+26 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.24
Nodes (9): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (23): BlueprintGrid(), BlueprintGridProps, metadata, PILLARS, agencyComparison, ComparisonRow, ComparisonSection, ClientLogo (+15 more)

### Community 19 - "Community 19"
Cohesion: 0.07
Nodes (36): CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, customSoftwareGroups, customSoftwareNavItems (+28 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (32): mapCaseStudy(), mapCustomSoftware(), mapFaqs(), mapFeatureBullets(), mapIndustry(), mapIndustryFaqs(), mapIndustryPainPoints(), mapIndustryParent() (+24 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.12
Nodes (26): CompareIndexPage(), metadata, cookiePolicyIntro, techStackGroups, CookieSettingsPage(), metadata, breadcrumbJsonLd(), collectionPageJsonLd() (+18 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.24
Nodes (9): bootstrapCalQueue(), CalBookingEmbed(), CalFn, CalGlobal, CalNamespace, ensureCalStub(), loadCalScript(), waitForCalScript() (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.29
Nodes (6): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, WebsiteBuilderAnimation()

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (16): extendedObjectTypes, articleBlock, articleFaq, caseResult, ctaFields, featureBullet, mediaAsset, objectTypes (+8 more)

### Community 28 - "Community 28"
Cohesion: 0.21
Nodes (5): CountUp(), CountUpProps, BenefitItem, BenefitsGrid(), BlueprintGridCrosses()

### Community 29 - "Community 29"
Cohesion: 0.32
Nodes (5): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep()

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.16
Nodes (14): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage(), ProjectShowcaseLogo(), ProjectShowcaseLogoProps (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (17): ArticleFaq(), ArticleFaqAccordion(), AeoAnswerBlock, ArticleFaq, CaseResult, CtaBlock, CtaFields, FeatureBullet (+9 more)

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (9): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, summarizeWithLabel(), AiFabButton(), AiFabLogo(), AiFabTooltip(), AiSummaryFab() (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.11
Nodes (20): CustomSoftwareGroupSection, IndustriesGroupSection, IndustriesPageGrids(), IndustryParentCard, IndustrySegmentEntry, IndustryCard(), IndustrySpecialtiesGrid(), ParentIndustryLink() (+12 more)

### Community 35 - "Community 35"
Cohesion: 0.13
Nodes (29): ProcessSteps(), Step, getAllCaseStudies(), getCaseStudiesByService(), getIndustryTitle(), getInsightsByService(), getServiceRelatedPortfolioProjects(), getServicesBySlugs() (+21 more)

### Community 36 - "Community 36"
Cohesion: 0.10
Nodes (12): allTags, caseStudiesByService, CATEGORY_ICONS, categoryTitles, client, LEGACY_PARENT_SLUGS, Mutation, mutations (+4 more)

### Community 37 - "Community 37"
Cohesion: 0.20
Nodes (8): ServiceGroup, FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants, ServicesTabShowcase(), ServicesTabShowcaseProps

### Community 38 - "Community 38"
Cohesion: 0.10
Nodes (22): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+14 more)

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): schemaTypes, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.22
Nodes (10): LegalDocument, LegalSection, privacyPolicyDocument, termsDocument, LegalPageContent(), LegalPageContentProps, metadata, PrivacyPolicyPage() (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (7): IndustryMegaMenuGrid(), MegaMenu(), MegaMenuProps, NavItemGrid(), NavMenuItemLink(), ServiceMegaCard(), useBlueprintReveal()

### Community 44 - "Community 44"
Cohesion: 0.14
Nodes (8): serviceMegaMenuCards, COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer(), FooterNavLink(), HoverFlip(), Logo(), LogoVariant

### Community 45 - "Community 45"
Cohesion: 0.15
Nodes (12): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, inlineFaq (+4 more)

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): industry, industryCategories, industryFields, industryGroups, industryParent, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.12
Nodes (32): RootLayout(), HomePage(), IndustriesPage(), applyTestimonialImageFallback(), fromSanity(), getAllFaqs(), getAllIndustries(), getAllTestimonials() (+24 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (9): ArticleCard(), ArticleCardShowcaseBody(), formatDate(), FilterPost, InsightsFilterableGrid(), ZMark(), Tag(), TagVariant (+1 more)

### Community 50 - "Community 50"
Cohesion: 0.19
Nodes (11): TechStackGroup, TechStackShowcase(), formatDate(), InsightsFeaturedArticle(), Navbar(), BEND_SPRING, HighlightRect, RubberHoverHighlightLayer() (+3 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.12
Nodes (19): megaMenuNavLinks, NavMenuItem, DIRECT_LINKS, LINKS_AFTER_INDUSTRIES, LINKS_BEFORE_ABOUT, MobileMenu(), LINKS, LINKS_AFTER_INDUSTRIES (+11 more)

### Community 53 - "Community 53"
Cohesion: 0.12
Nodes (30): Stagger(), TextReveal(), TextRevealProps, migrations, DarkCTA(), PRODUCT_SURFACES, ProductCard(), STATUS_LABEL (+22 more)

### Community 54 - "Community 54"
Cohesion: 0.40
Nodes (4): EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline(), LONGEST_PHRASE

### Community 55 - "Community 55"
Cohesion: 0.06
Nodes (48): sitemap(), STATIC_ROUTES, Comparison, comparisons, buildLlmsFullTxt(), buildLlmsTxt(), LlmsFullInput, Migration (+40 more)

### Community 57 - "Community 57"
Cohesion: 0.29
Nodes (7): FAQ_CATEGORY_ORDER, FaqItem, faqs, groupFaqsByCategory(), FaqAccordionItem(), FaqSection(), FaqItem

### Community 58 - "Community 58"
Cohesion: 0.27
Nodes (5): industries, formatDate(), MediaImage(), CaseStudyCard(), industryTitle()

### Community 59 - "Community 59"
Cohesion: 0.25
Nodes (5): CustomSoftwareGroupSection, industryNavItems, NavMenuGroup, ServiceMegaMenuCard, serviceNavGroups

### Community 60 - "Community 60"
Cohesion: 0.25
Nodes (5): caseStudyTestimonials, PLATFORM_PROFILES, platformTestimonials, rawPlatformTestimonials, testimonials

### Community 61 - "Community 61"
Cohesion: 0.38
Nodes (6): ArticleBlock, mapCalloutVariant(), PortableTextBlock, PortableTextChild, portableTextToArticleBlocks(), spanText()

### Community 62 - "Community 62"
Cohesion: 0.28
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 63 - "Community 63"
Cohesion: 0.33
Nodes (6): getAllProducts(), getProductsByIndustry(), getProductsByService(), getProductsByType(), ProductsPage(), ResourcesPage()

### Community 64 - "Community 64"
Cohesion: 0.40
Nodes (4): sanityClient, sanityFetch(), sanityFetchOptions, hasSanityReadToken()

### Community 66 - "Community 66"
Cohesion: 0.67
Nodes (3): getCaseStudyBySlug(), fetchCaseStudyBySlugFromSanity(), generateMetadata()

### Community 67 - "Community 67"
Cohesion: 0.67
Nodes (3): getServiceBySlug(), fetchServiceBySlugFromSanity(), generateMetadata()

## Knowledge Gaps
- **355 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+350 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 31` to `Community 9`, `Community 17`, `Community 18`, `Community 19`, `Community 22`, `Community 26`, `Community 28`, `Community 29`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 37`, `Community 38`, `Community 43`, `Community 44`, `Community 49`, `Community 50`, `Community 52`, `Community 53`, `Community 57`, `Community 58`, `Community 62`, `Community 65`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `breadcrumbJsonLd()` connect `Community 22` to `Community 0`, `Community 35`, `Community 38`, `Community 41`, `Community 47`, `Community 53`, `Community 55`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 53` to `Community 34`, `Community 37`, `Community 38`, `Community 43`, `Community 44`, `Community 18`, `Community 19`, `Community 52`, `Community 55`, `Community 28`, `Community 62`, `Community 31`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `breadcrumbJsonLd()` (e.g. with `ArticlePage()` and `CaseStudyPage()`) actually correct?**
  _`breadcrumbJsonLd()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _355 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.056051587301587304 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._