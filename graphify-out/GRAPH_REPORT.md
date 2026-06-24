# Graph Report - zednova-website  (2026-06-24)

## Corpus Check
- 163 files · ~132,197 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 757 nodes · 1915 edges · 47 communities (41 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3752bdec`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 107 edges
2. `BlueprintCross()` - 24 edges
3. `SectionLabel()` - 23 edges
4. `Button()` - 20 edges
5. `Reveal()` - 19 edges
6. `BlueprintGrid()` - 17 edges
7. `TextReveal()` - 17 edges
8. `compilerOptions` - 16 edges
9. `getAllIndustries()` - 15 edges
10. `DarkCTA()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllMigrations()`  [INFERRED]
  src/app/migrations/[slug]/page.tsx → src/lib/queries.ts
- `generateStaticParams()` --calls--> `getAllServices()`  [INFERRED]
  src/app/services/[slug]/page.tsx → src/lib/queries.ts
- `generateStaticParams()` --calls--> `getAllIndustrySlugs()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `generateMetadata()` --calls--> `getIndustrySegmentBySlug()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `IndustryDetailPage()` --calls--> `getAllIndustries()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts

## Import Cycles
- None detected.

## Communities (47 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (13): BenefitItem, BenefitsGrid(), initials(), TestimonialAvatar(), TestimonialCarousel(), NavItemGrid(), NavMenuItemLink(), ServiceMegaCard() (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (25): CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), industryNavItems (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.19
Nodes (15): CustomSoftwareGroupSection, IndustriesGroupSection, IndustriesPageGrids(), GROUP_TAGLINES, metadata, navGroupItems(), ServiceGridEntry, ServicesFilterableGrids() (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (31): caseStudy, customSoftware, industry, industryCategories, industryFields, industryParent, migration, portfolioProject (+23 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (43): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+35 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (65): ProcessSteps(), Step, ArticleBody(), ArticleCard(), ArticleCardShowcaseBody(), formatDate(), ArticleFaq(), ArticleFaqAccordion() (+57 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (24): ContactPage(), POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel() (+16 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (7): ProductCard(), ProductSlider(), ProductSliderProps, ProductsShowcase(), ProductsShowcaseProps, SLIDE_EASE, slideVariants

### Community 18 - "Community 18"
Cohesion: 0.29
Nodes (6): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, WebsiteBuilderAnimation()

### Community 19 - "Community 19"
Cohesion: 0.24
Nodes (9): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (23): caseStudies, ecommerceNavServices, posts, products, services, siteSettings, team, CATEGORY_ORDER (+15 more)

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
Nodes (26): ServiceGroup, fetchAllIndustriesFromSanity(), fetchAllServicesFromSanity(), fetchCustomSoftwareGroupsFromSanity(), fetchIndustryBySlugFromSanity(), fetchIndustryParentBySlugFromSanity(), fetchMigrationBySlugFromSanity(), fetchServiceBySlugFromSanity() (+18 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.11
Nodes (24): Migration, migrations, CustomSoftwareGroupSection, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards (+16 more)

### Community 27 - "Community 27"
Cohesion: 0.16
Nodes (6): COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer(), FooterNavLink(), HoverFlip(), Logo()

### Community 28 - "Community 28"
Cohesion: 0.40
Nodes (3): CountUp(), CountUpProps, StatsRow()

### Community 29 - "Community 29"
Cohesion: 0.19
Nodes (9): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+1 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.13
Nodes (18): customSoftwareNavItems, CustomSoftwarePageGrids(), metadata, DarkCTA(), PRODUCT_SURFACES, STATUS_LABEL, STATUS_STYLE, getAllProducts() (+10 more)

### Community 32 - "Community 32"
Cohesion: 0.15
Nodes (14): TechStackGroup, techStackGroups, TechStackShowcase(), formatDate(), InsightsFeaturedArticle(), Navbar(), BEND_SPRING, HighlightRect (+6 more)

### Community 33 - "Community 33"
Cohesion: 0.24
Nodes (5): agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonTableRow()

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (5): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 36 - "Community 36"
Cohesion: 0.13
Nodes (15): industryParents, industries, parentServices(), sub(), customSoftwareGroups, serviceNavGroups, Industry, client (+7 more)

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (7): FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants, ServicesTabShowcase(), ServicesTabShowcaseProps

### Community 38 - "Community 38"
Cohesion: 0.16
Nodes (11): PortfolioImage(), ProjectShowcaseLogo(), ProjectShowcaseLogoProps, PortfolioProject, formatDate(), PortfolioShowcaseCard(), PortfolioShowcaseCardProps, PortfolioWorkGrid() (+3 more)

### Community 39 - "Community 39"
Cohesion: 0.20
Nodes (11): HomePage(), metadata, PILLARS, FaqItem, faqs, portfolioProjects, FaqAccordionItem(), FaqSection() (+3 more)

### Community 40 - "Community 40"
Cohesion: 0.22
Nodes (8): Commands, CORS (if fetch fails from browser), Environment variables, Next steps (Phase 2), Repo layout, Sanity CMS — ZedNova Studio, Schemas, Vision (test GROQ)

### Community 41 - "Community 41"
Cohesion: 0.16
Nodes (13): Reveal(), RevealProps, StaggerProps, TextReveal(), TextRevealProps, metadata, STEPS, PageHero() (+5 more)

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (12): AboutPage(), metadata, REMOTE_POINTS, VALUES, BlueprintGrid(), BlueprintGridProps, getFounder(), getSiteSettings() (+4 more)

### Community 44 - "Community 44"
Cohesion: 0.21
Nodes (7): BlueprintColumnFrame(), BlueprintColumnFrameProps, BlueprintCross(), BlueprintCrossProps, metadata, Filter, WorkGrid()

### Community 45 - "Community 45"
Cohesion: 0.25
Nodes (5): caseStudyTestimonials, platformTestimonials, rawPlatformTestimonials, testimonials, Testimonial

### Community 46 - "Community 46"
Cohesion: 0.40
Nodes (4): Stagger(), MigrationsPageGrids(), metadata, MigrationsPage()

## Knowledge Gaps
- **236 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+231 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 2`, `Community 6`, `Community 9`, `Community 17`, `Community 18`, `Community 19`, `Community 22`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 41`, `Community 43`, `Community 44`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 44` to `Community 0`, `Community 1`, `Community 34`, `Community 35`, `Community 2`, `Community 37`, `Community 6`, `Community 41`, `Community 43`, `Community 46`, `Community 26`, `Community 27`, `Community 31`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 31` to `Community 0`, `Community 1`, `Community 2`, `Community 6`, `Community 39`, `Community 9`, `Community 43`, `Community 44`, `Community 46`, `Community 26`, `Community 29`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _236 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14022988505747128 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.05673758865248227 - nodes in this community are weakly interconnected._