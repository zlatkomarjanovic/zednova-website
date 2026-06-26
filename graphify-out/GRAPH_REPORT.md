# Graph Report - zednova-website  (2026-06-26)

## Corpus Check
- 212 files · ~320,439 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1119 nodes · 3167 edges · 61 communities (55 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 66 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `47337e95`
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
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 64|Community 64]]

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

## Communities (61 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.20
Nodes (17): isIndustryParentRecord(), isIndustrySegment(), isNonEmptyCmsValue(), mergeIndustryRecord(), getCaseStudiesByIndustry(), getIndustryBySlug(), getIndustryPageData(), getIndustryParentBySlug() (+9 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (23): ContactPage(), posts, products, siteSettings, CATEGORY_ORDER, getAllProducts(), getContactIndustryOptions(), getContactServiceOptions() (+15 more)

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
Cohesion: 0.14
Nodes (14): ecommerceSegments, fitnessSegments, healthcareSegments, industries, parentServices(), professionalSegments, realEstateSegments, saasSegments (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (15): POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel(), labelForIndustry() (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.24
Nodes (9): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.24
Nodes (5): agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonTableRow()

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (15): CookieConsentContext, CookieConsentContextValue, useCookieConsent(), buildConsent(), isRecord(), parseStoredConsent(), readStoredConsent(), writeStoredConsent() (+7 more)

### Community 20 - "Community 20"
Cohesion: 0.06
Nodes (60): getMigrationBySlug(), Author, CaseStudy, Testimonial, fetchAllCaseStudiesFromSanity(), fetchAllFaqsFromSanity(), fetchAllMigrationsFromSanity(), fetchAllPostsFromSanity() (+52 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

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
Cohesion: 0.15
Nodes (14): AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, ArticleShare(), IndustryMegaMenuGrid(), MegaTrigger(), cn() (+6 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (16): extendedObjectTypes, articleBlock, articleFaq, caseResult, ctaFields, featureBullet, mediaAsset, objectTypes (+8 more)

### Community 28 - "Community 28"
Cohesion: 0.24
Nodes (4): CountUp(), CountUpProps, StatsRow(), BlueprintGridCrosses()

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (13): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+5 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.16
Nodes (9): PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage(), ProjectShowcaseLogo(), ProjectShowcaseLogoProps, BlueprintGuidesProps, BlueprintReveal (+1 more)

### Community 32 - "Community 32"
Cohesion: 0.12
Nodes (18): Migration, ArticleFaq(), ArticleFaqAccordion(), AeoAnswerBlock, ArticleFaq, CaseResult, CtaBlock, CtaFields (+10 more)

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (9): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, summarizeWithLabel(), AiFabButton(), AiFabLogo(), AiFabTooltip(), AiSummaryFab() (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.09
Nodes (24): HomepageIndustry, CustomSoftwareGroupSection, CustomSoftwarePageGrids(), IndustriesGroupSection, IndustriesPageGrids(), IndustryParentCard, IndustrySegmentEntry, IndustryCard() (+16 more)

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (6): featuredHomepageIndustries, homepageIndustries, moreHomepageIndustries, CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, IndustryParent

### Community 36 - "Community 36"
Cohesion: 0.05
Nodes (29): caseStudies, customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, FAQ_CATEGORY_ORDER, FaqItem, faqs, groupFaqsByCategory() (+21 more)

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (7): FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants, ServicesTabShowcase(), ServicesTabShowcaseProps

### Community 38 - "Community 38"
Cohesion: 0.33
Nodes (5): HOMEPAGE_PRICING_BADGES, HOMEPAGE_PRICING_SLUGS, HomepagePricingPackage, homepagePricingPackages, HomepagePricingSlug

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): schemaTypes, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.33
Nodes (5): PRODUCT_SURFACES, ProductCard(), STATUS_LABEL, STATUS_STYLE, ProductStatus

### Community 43 - "Community 43"
Cohesion: 0.12
Nodes (15): MegaMenu(), MegaMenuProps, NavItemGrid(), NavMenuItemLink(), ServiceMegaCard(), Navbar(), ServiceGroup, BlueprintGuides() (+7 more)

### Community 44 - "Community 44"
Cohesion: 0.14
Nodes (7): ecommerceNavServices, COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, FooterNavLink(), Service, HoverFlip(), Logo()

### Community 45 - "Community 45"
Cohesion: 0.15
Nodes (12): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, inlineFaq (+4 more)

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): industry, industryCategories, industryFields, industryGroups, industryParent, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.13
Nodes (26): HomePage(), IndustriesPage(), applyTestimonialImageFallback(), fromSanity(), getAllCaseStudies(), getAllFaqs(), getAllIndustries(), getAllTestimonials() (+18 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 49 - "Community 49"
Cohesion: 0.18
Nodes (13): ArticleCard(), ArticleCardShowcaseBody(), formatDate(), formatDate(), InsightsFeaturedArticle(), FilterPost, InsightsFilterableGrid(), Post (+5 more)

### Community 50 - "Community 50"
Cohesion: 0.19
Nodes (10): AIChatbotAnimation(), WebsiteBuilderAnimation(), metadata, PILLARS, portfolioProjects, TechStackGroup, techStackGroups, PricingCardsSection() (+2 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.11
Nodes (23): CustomSoftwareGroupSection, customSoftwareNavItems, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards, DIRECT_LINKS (+15 more)

### Community 53 - "Community 53"
Cohesion: 0.06
Nodes (104): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+96 more)

### Community 54 - "Community 54"
Cohesion: 0.53
Nodes (4): CookieBanner(), CookiePreferencesForm(), CookiePreferencesFormProps, preferencesFromConsent()

### Community 55 - "Community 55"
Cohesion: 0.06
Nodes (43): CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), sitemap() (+35 more)

### Community 58 - "Community 58"
Cohesion: 0.60
Nodes (3): MediaImage(), CaseStudyCard(), industryTitle()

### Community 61 - "Community 61"
Cohesion: 0.08
Nodes (36): BenefitItem, BenefitsGrid(), ArticleInlineCta(), ArticleQuickAnswer(), ArticleBody(), ArticleTakeaways(), InsightsPage(), getAdjacentPosts() (+28 more)

### Community 62 - "Community 62"
Cohesion: 0.28
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 64 - "Community 64"
Cohesion: 0.13
Nodes (19): getAuthor(), getCaseStudyBySlug(), getCustomSoftwareBySlug(), getPostBySlug(), getServiceBySlug(), mergeCustomSoftware(), sanityClient, sanityFetch() (+11 more)

## Knowledge Gaps
- **356 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+351 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 26` to `Community 9`, `Community 17`, `Community 18`, `Community 28`, `Community 29`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 36`, `Community 37`, `Community 41`, `Community 43`, `Community 44`, `Community 49`, `Community 50`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 58`, `Community 61`, `Community 62`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `breadcrumbJsonLd()` connect `Community 53` to `Community 0`, `Community 61`, `Community 55`, `Community 47`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 53` to `Community 34`, `Community 37`, `Community 43`, `Community 44`, `Community 61`, `Community 52`, `Community 22`, `Community 26`, `Community 28`, `Community 29`, `Community 62`, `Community 31`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `breadcrumbJsonLd()` (e.g. with `ArticlePage()` and `CaseStudyPage()`) actually correct?**
  _`breadcrumbJsonLd()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _356 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11330049261083744 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._