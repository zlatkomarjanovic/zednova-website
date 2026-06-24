# Graph Report - zednova-website  (2026-06-24)

## Corpus Check
- 184 files · ~443,546 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 972 nodes · 2613 edges · 61 communities (54 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `53e6ce7c`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 111 edges
2. `BlueprintCross()` - 26 edges
3. `SectionLabel()` - 25 edges
4. `Button()` - 23 edges
5. `getAllPosts()` - 22 edges
6. `Reveal()` - 21 edges
7. `isSanityConfigured()` - 21 edges
8. `BlueprintGrid()` - 20 edges
9. `getAllIndustries()` - 20 edges
10. `TextReveal()` - 19 edges

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

## Communities (61 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (18): CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, ecommerceSegments, fitnessSegments, healthcareSegments, industries, parentServices(), professionalSegments (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (21): isNonEmptyCmsValue(), mergeIndustryRecord(), getAuthor(), getCaseStudyBySlug(), getIndustryBySlug(), getIndustryParentBySlug(), getIndustrySegmentBySlug(), getIndustryTitle() (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.28
Nodes (13): post, productStatuses, productTypes, serviceGroups, richTextMembers, flatConsultationCtaFields, flatOpenGraphFields, flatPrimaryCtaFields (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (18): author, caseStudy, customSoftware, faq, insightCategory, migration, page, portfolioProject (+10 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (43): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+35 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (27): CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), customSoftwareNavItems (+19 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.19
Nodes (14): POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel(), labelForIndustry() (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.24
Nodes (9): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.23
Nodes (13): ArticleBody(), ArticleTakeaways(), InsightsPage(), getAdjacentPosts(), getAllPosts(), getFeaturedPost(), getInsightsByProduct(), getRelatedInsights() (+5 more)

### Community 20 - "Community 20"
Cohesion: 0.08
Nodes (42): Author, fetchAllCaseStudiesFromSanity(), fetchAllFaqsFromSanity(), fetchAllMigrationsFromSanity(), fetchAllPostsFromSanity(), fetchAllProductsFromSanity(), fetchAllServicesFromSanity(), fetchAuthorBySlugFromSanity() (+34 more)

### Community 21 - "Community 21"
Cohesion: 0.32
Nodes (7): sanityClient, sanityFetch(), sanityFetchOptions, hasSanityReadToken(), imageUrl(), { projectId, dataset }, urlFor()

### Community 22 - "Community 22"
Cohesion: 0.33
Nodes (8): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, summarizeWithLabel(), AiFabButton(), AiFabLogo(), AiFabTooltip(), AiSummaryFab()

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.17
Nodes (14): sitemap(), getAllCaseStudies(), getAllCustomSoftwareSlugs(), getAllIndustrySlugs(), getAllProducts(), getProductsByIndustry(), getProductsByService(), getProductsByType() (+6 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.18
Nodes (12): TechStackGroup, techStackGroups, TechStackShowcase(), formatDate(), InsightsFeaturedArticle(), Navbar(), BEND_SPRING, HighlightRect (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (16): extendedObjectTypes, articleBlock, articleFaq, caseResult, ctaFields, featureBullet, mediaAsset, objectTypes (+8 more)

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (11): CountUp(), CountUpProps, BenefitItem, BenefitsGrid(), ProductSlider(), ProductSliderProps, ProductsShowcase(), ProductsShowcaseProps (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.32
Nodes (5): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep()

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (9): ProjectShowcaseLogo(), ProjectShowcaseLogoProps, PortfolioProject, formatDate(), PortfolioShowcaseCard(), PortfolioShowcaseCardProps, PortfolioWorkGridProps, CATEGORY_ORDER (+1 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (13): ResolveMetadataInput, AeoAnswerBlock, ArticleFaq, CaseResult, CtaBlock, CtaFields, FeatureBullet, OpenGraphFields (+5 more)

### Community 33 - "Community 33"
Cohesion: 0.32
Nodes (4): initials(), TestimonialAvatar(), TestimonialCarousel(), Testimonial

### Community 34 - "Community 34"
Cohesion: 0.10
Nodes (22): CustomSoftwareGroupSection, CustomSoftwarePageGrids(), IndustriesGroupSection, IndustriesPageGrids(), IndustryParentCard, IndustrySegmentEntry, IndustryCard(), IndustrySpecialtiesGrid() (+14 more)

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 36 - "Community 36"
Cohesion: 0.05
Nodes (26): caseStudies, FaqItem, faqs, customSoftwareGroups, portfolioProjects, team, caseStudyTestimonials, platformTestimonials (+18 more)

### Community 37 - "Community 37"
Cohesion: 0.20
Nodes (8): ServiceGroup, FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants, ServicesTabShowcase(), ServicesTabShowcaseProps

### Community 38 - "Community 38"
Cohesion: 0.14
Nodes (8): COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer(), FooterAiSummaryLinks(), FooterNavLink(), HoverFlip(), Logo(), LogoVariant

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): schemaTypes, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.21
Nodes (8): ArticleCard(), ArticleCardShowcaseBody(), formatDate(), FilterPost, InsightsFilterableGrid(), ZMark(), TagVariant, VARIANTS

### Community 43 - "Community 43"
Cohesion: 0.24
Nodes (6): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage()

### Community 44 - "Community 44"
Cohesion: 0.11
Nodes (21): ContactPage(), ecommerceNavServices, posts, products, services, siteSettings, CATEGORY_ORDER, getContactIndustryOptions() (+13 more)

### Community 45 - "Community 45"
Cohesion: 0.15
Nodes (12): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, inlineFaq (+4 more)

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): industry, industryCategories, industryFields, industryGroups, industryParent, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.33
Nodes (4): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, CustomSoftware

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 50 - "Community 50"
Cohesion: 0.13
Nodes (14): ArticleBlock, PriceTier, ProductType, mapFaq(), mapIndustryNavItem(), mapMegaMenuCard(), mapNavItem(), mapTestimonial() (+6 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.09
Nodes (31): Migration, CustomSoftwareGroupSection, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards, IndustryMegaMenuGrid() (+23 more)

### Community 53 - "Community 53"
Cohesion: 0.06
Nodes (77): ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, VALUES, BlueprintGrid(), BlueprintGridProps (+69 more)

### Community 54 - "Community 54"
Cohesion: 0.28
Nodes (8): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, cn(), NewsletterSignup(), FlipArrow()

### Community 55 - "Community 55"
Cohesion: 0.22
Nodes (6): featuredHomepageIndustries, homepageIndustries, HomepageIndustry, moreHomepageIndustries, IndustryNavShowcaseGrid(), SLIDE_EASE

### Community 56 - "Community 56"
Cohesion: 0.14
Nodes (14): WebsiteBuilderAnimation(), metadata, PILLARS, agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonTableRow() (+6 more)

### Community 57 - "Community 57"
Cohesion: 0.17
Nodes (21): HomePage(), IndustriesPage(), isIndustryParentRecord(), isIndustrySegment(), getAllIndustries(), getCaseStudiesByIndustry(), getCustomSoftwareRelatedPortfolioProjects(), getHomepageIndustries() (+13 more)

### Community 58 - "Community 58"
Cohesion: 0.24
Nodes (7): articleJsonLd(), ArticleJsonLdInput, articleUrl(), caseStudyJsonLd(), estimateWordCount(), industryJsonLd(), generateMetadata()

### Community 59 - "Community 59"
Cohesion: 0.60
Nodes (3): ArticleFaq(), ArticleFaqAccordion(), faqPageJsonLd()

### Community 60 - "Community 60"
Cohesion: 0.50
Nodes (3): CaseStudy, Filter, WorkGrid()

## Knowledge Gaps
- **319 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+314 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 54` to `Community 0`, `Community 9`, `Community 17`, `Community 19`, `Community 22`, `Community 26`, `Community 28`, `Community 29`, `Community 31`, `Community 33`, `Community 34`, `Community 36`, `Community 37`, `Community 38`, `Community 41`, `Community 43`, `Community 52`, `Community 53`, `Community 55`, `Community 56`, `Community 59`, `Community 60`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 53` to `Community 33`, `Community 34`, `Community 35`, `Community 37`, `Community 38`, `Community 43`, `Community 18`, `Community 52`, `Community 54`, `Community 56`, `Community 28`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 53` to `Community 9`, `Community 18`, `Community 52`, `Community 54`, `Community 56`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `getAllPosts()` (e.g. with `ArticlePage()` and `CustomSoftwareDetailPage()`) actually correct?**
  _`getAllPosts()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _319 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12318840579710146 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._