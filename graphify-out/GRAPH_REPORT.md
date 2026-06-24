# Graph Report - zednova-website  (2026-06-24)

## Corpus Check
- 173 files · ~144,178 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 852 nodes · 2243 edges · 53 communities (42 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d97c7ab`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 107 edges
2. `BlueprintCross()` - 25 edges
3. `SectionLabel()` - 24 edges
4. `Button()` - 21 edges
5. `Reveal()` - 20 edges
6. `fromSanity()` - 19 edges
7. `BlueprintGrid()` - 18 edges
8. `TextReveal()` - 18 edges
9. `getAllPosts()` - 17 edges
10. `getAllIndustries()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllIndustrySlugs()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `generateMetadata()` --calls--> `getIndustrySegmentBySlug()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `IndustryDetailPage()` --calls--> `getAllIndustries()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `IndustryDetailPage()` --calls--> `getIndustryBySlug()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `IndustryDetailPage()` --calls--> `getIndustryParentBySlug()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts

## Import Cycles
- None detected.

## Communities (53 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (12): ComparisonTableRow(), ProcessSteps(), Step, ArticleShare(), NavItemGrid(), NavMenuItemLink(), ServiceMegaCard(), MegaTrigger() (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (48): CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), HomePage() (+40 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (16): CustomSoftwareGroupSection, CustomSoftwarePageGrids(), IndustriesGroupSection, IndustriesPageGrids(), MigrationsPageGrids(), ServiceGridEntry, ServicesFilterableGrids(), ServicesFilterableGridsProps (+8 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (12): author, caseStudy, customSoftware, faq, migration, page, post, serviceMegaMenuCard (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (43): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+35 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (38): ArticleBody(), ArticleCard(), ArticleCardShowcaseBody(), formatDate(), ArticleFaq(), ArticleFaqAccordion(), ArticleTakeaways(), FilterPost (+30 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (23): POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel(), labelForIndustry() (+15 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.18
Nodes (10): PRODUCT_SURFACES, ProductCard(), STATUS_LABEL, STATUS_STYLE, ProductSlider(), ProductSliderProps, ProductsShowcase(), ProductsShowcaseProps (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.29
Nodes (6): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, WebsiteBuilderAnimation()

### Community 19 - "Community 19"
Cohesion: 0.24
Nodes (9): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (28): caseStudies, ecommerceNavServices, posts, products, services, CATEGORY_ORDER, Author, CaseStudy (+20 more)

### Community 21 - "Community 21"
Cohesion: 0.32
Nodes (8): sanityClient, sanityFetch(), sanityFetchOptions, hasSanityReadToken(), isSanityConfigured(), imageUrl(), { projectId, dataset }, urlFor()

### Community 22 - "Community 22"
Cohesion: 0.29
Nodes (9): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, summarizeWithLabel(), AiFabButton(), AiFabLogo(), AiFabTooltip(), AiSummaryFab() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (26): Testimonial, mapCaseStudy(), mapFaq(), mapFaqs(), mapFeatureBullets(), mapIndustry(), mapIndustryNavItem(), mapIndustryParent() (+18 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.05
Nodes (55): Migration, CustomSoftwareGroupSection, customSoftwareNavItems, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards (+47 more)

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (15): articleBlock, articleFaq, caseResult, ctaFields, featureBullet, mediaAsset, objectTypes, painPoint (+7 more)

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
Cohesion: 0.15
Nodes (13): getAuthor(), getIndustryBySlug(), getIndustryParentBySlug(), getPostBySlug(), getServiceBySlug(), fetchAuthorBySlugFromSanity(), fetchIndustryBySlugFromSanity(), fetchIndustryParentBySlugFromSanity() (+5 more)

### Community 32 - "Community 32"
Cohesion: 0.17
Nodes (11): metadata, PILLARS, agencyComparison, ComparisonRow, ComparisonSection, portfolioProjects, TechStackGroup, techStackGroups (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.38
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

### Community 34 - "Community 34"
Cohesion: 0.33
Nodes (5): industry, industryCategories, industryFields, industryGroups, industryParent

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 36 - "Community 36"
Cohesion: 0.06
Nodes (29): FaqItem, faqs, industryParents, industries, parentServices(), sub(), customSoftwareGroups, team (+21 more)

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (7): FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants, ServicesTabShowcase(), ServicesTabShowcaseProps

### Community 38 - "Community 38"
Cohesion: 0.12
Nodes (16): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage(), ProjectShowcaseLogo(), ProjectShowcaseLogoProps (+8 more)

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): schemaTypes, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.07
Nodes (66): metadata, REMOTE_POINTS, VALUES, BlueprintGrid(), BlueprintGridProps, EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+58 more)

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (12): AboutPage(), ContactPage(), siteSettings, getContactIndustryOptions(), getContactServiceOptions(), getFounder(), getSiteSettings(), labelForIndustry() (+4 more)

### Community 44 - "Community 44"
Cohesion: 0.50
Nodes (3): product, productStatuses, productTypes

### Community 47 - "Community 47"
Cohesion: 0.67
Nodes (3): getCaseStudyBySlug(), fetchCaseStudyBySlugFromSanity(), generateMetadata()

### Community 48 - "Community 48"
Cohesion: 0.67
Nodes (3): getMigrationBySlug(), fetchMigrationBySlugFromSanity(), generateMetadata()

## Knowledge Gaps
- **262 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+257 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 33`, `Community 1`, `Community 2`, `Community 36`, `Community 37`, `Community 38`, `Community 6`, `Community 41`, `Community 9`, `Community 17`, `Community 18`, `Community 19`, `Community 22`, `Community 26`, `Community 28`, `Community 29`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 41` to `Community 0`, `Community 33`, `Community 2`, `Community 35`, `Community 37`, `Community 38`, `Community 6`, `Community 26`, `Community 28`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 41` to `Community 32`, `Community 0`, `Community 6`, `Community 9`, `Community 17`, `Community 26`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _262 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07764876632801161 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14130434782608695 - nodes in this community are weakly interconnected._