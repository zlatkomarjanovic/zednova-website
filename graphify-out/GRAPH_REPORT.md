# Graph Report - zednova-website  (2026-06-23)

## Corpus Check
- 138 files · ~125,350 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 629 nodes · 1679 edges · 38 communities (31 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a9296919`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 122 edges
2. `BlueprintCross()` - 23 edges
3. `Reveal()` - 21 edges
4. `Button()` - 20 edges
5. `SectionLabel()` - 19 edges
6. `BlueprintGrid()` - 17 edges
7. `TextReveal()` - 17 edges
8. `compilerOptions` - 16 edges
9. `useRubberHoverHighlight()` - 15 edges
10. `getAllIndustries()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `IndustryDetailPage()` --calls--> `getAllIndustries()`  [INFERRED]
  app/industries/[slug]/page.tsx → lib/queries.ts
- `IndustryDetailPage()` --calls--> `getServicesBySlugs()`  [INFERRED]
  app/industries/[slug]/page.tsx → lib/queries.ts
- `IndustryDetailPage()` --calls--> `breadcrumbJsonLd()`  [INFERRED]
  app/industries/[slug]/page.tsx → lib/seo.ts
- `MigrationDetailPage()` --calls--> `breadcrumbJsonLd()`  [INFERRED]
  app/migrations/[slug]/page.tsx → lib/seo.ts
- `generateStaticParams()` --calls--> `getAllPosts()`  [INFERRED]
  app/resources/[slug]/page.tsx → lib/queries.ts

## Import Cycles
- None detected.

## Communities (38 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (29): NavMenuItem, TechStackGroup, techStackGroups, Navbar(), Post, IndustryNavShowcaseGrid(), SLIDE_EASE, IndustryShowcaseGrid() (+21 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (37): CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), generateStaticParams() (+29 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (47): metadata, REMOTE_POINTS, VALUES, BlueprintGrid(), BlueprintGridProps, EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+39 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (38): generateMetadata(), generateStaticParams(), generateMetadata(), generateStaticParams(), getAdjacentPosts(), getAllCaseStudies(), getAllPosts(), getCaseStudyBySlug() (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (36): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+28 more)

### Community 6 - "Community 6"
Cohesion: 0.23
Nodes (11): AI_SUMMARY_PROMPT, aiSummaryCopy, aiSummaryFabModels, AiSummaryModel, aiSummaryModels, summarizeWithLabel(), AiFabButton(), AiFabLogo() (+3 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.40
Nodes (4): FaqItem, faqs, FaqAccordionItem(), FaqSection()

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (19): ContactPage(), POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel() (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (11): ProductStatus, ProductSlider(), ProductSliderProps, ProductsShowcase(), ProductsShowcaseProps, SLIDE_EASE, slideVariants, PRODUCT_SURFACES (+3 more)

### Community 18 - "Community 18"
Cohesion: 0.38
Nodes (3): TestimonialCarousel(), initials(), TestimonialAvatar()

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (17): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), byKey(), CRMAutomationAnimation(), edge(), EDGES (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (8): b2bBuildItems, ecommerceBuildItems, healthcareBuildItems, parentServices(), sub(), SubIndustryInput, IndustryCategory, PopularServiceLink

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (9): ecommerceNavServices, posts, products, siteSettings, team, CATEGORY_ORDER, Product, SiteSettings (+1 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (9): ServiceGroup, FILTER_LABELS, FILTER_ORDER, FilterKey, GROUP_ORDER, PANEL_EASE, panelVariants, ServicesTabShowcase() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.25
Nodes (10): AboutPage(), HomePage(), metadata, PILLARS, getAllFaqs(), getAllProducts(), getFounder(), getPlatformTestimonials() (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.05
Nodes (47): MagneticButton(), MagneticButtonProps, agencyComparison, ComparisonColumn, ComparisonItem, ComparisonRow, ComparisonSection, MegaMenu() (+39 more)

### Community 27 - "Community 27"
Cohesion: 0.19
Nodes (11): caseStudies, ArticleBlock, CaseResult, CaseStudy, IndustryParent, PainPoint, CaseStudiesShowcaseGrid(), CaseStudiesShowcaseGridProps (+3 more)

### Community 28 - "Community 28"
Cohesion: 0.40
Nodes (3): CountUp(), CountUpProps, StatsRow()

### Community 29 - "Community 29"
Cohesion: 0.32
Nodes (5): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep()

### Community 30 - "Community 30"
Cohesion: 0.19
Nodes (10): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), half, items (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.20
Nodes (6): caseStudyTestimonials, platformTestimonials, rawPlatformTestimonials, testimonials, Testimonial, TestimonialCard()

### Community 32 - "Community 32"
Cohesion: 0.31
Nodes (7): industries, industryParents, industries, WorkGrid(), CaseStudyCard(), industryTitle(), SectionHeading()

### Community 33 - "Community 33"
Cohesion: 0.35
Nodes (10): generateMetadata(), getCaseStudiesByIndustry(), getIndustryBySlug(), getIndustryParentBySlug(), getIndustrySegmentBySlug(), industryJsonLd(), Industry, IndustryCard() (+2 more)

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (5): portfolioProjects, PortfolioProject, PortfolioShowcaseCard(), PortfolioWorkGrid(), PortfolioWorkGridProps

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (3): BenefitItem, BenefitsGrid(), BlueprintGridCrosses()

### Community 36 - "Community 36"
Cohesion: 0.53
Nodes (6): generateStaticParams(), IndustriesPage(), getAllIndustries(), getAllIndustrySlugs(), getIndustryGroups(), getIndustryParents()

## Knowledge Gaps
- **185 isolated node(s):** `version`, `configurations`, `allow`, `metadata`, `VALUES` (+180 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 26` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 6`, `Community 8`, `Community 9`, `Community 17`, `Community 18`, `Community 19`, `Community 22`, `Community 27`, `Community 28`, `Community 29`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 2` to `Community 1`, `Community 35`, `Community 17`, `Community 18`, `Community 22`, `Community 26`, `Community 30`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 2` to `Community 33`, `Community 1`, `Community 4`, `Community 9`, `Community 17`, `Community 24`, `Community 26`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _185 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08084163898117387 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05827067669172932 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09215291750503019 - nodes in this community are weakly interconnected._