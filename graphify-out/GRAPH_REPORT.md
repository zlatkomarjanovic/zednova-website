# Graph Report - zednova-website  (2026-06-24)

## Corpus Check
- 127 files · ~123,911 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 573 nodes · 1482 edges · 33 communities (27 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a0def5d3`
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
- [[_COMMUNITY_Community 34|Community 34]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 101 edges
2. `BlueprintCross()` - 22 edges
3. `SectionLabel()` - 20 edges
4. `Button()` - 19 edges
5. `Reveal()` - 18 edges
6. `BlueprintGrid()` - 17 edges
7. `TextReveal()` - 16 edges
8. `compilerOptions` - 16 edges
9. `DarkCTA()` - 13 edges
10. `getAllIndustries()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllIndustrySlugs()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `generateMetadata()` --calls--> `getIndustrySegmentBySlug()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `IndustryDetailPage()` --calls--> `getAllIndustries()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `generateStaticParams()` --calls--> `getAllPosts()`  [INFERRED]
  src/app/insights/[slug]/page.tsx → src/lib/queries.ts
- `MigrationDetailPage()` --calls--> `breadcrumbJsonLd()`  [INFERRED]
  src/app/migrations/[slug]/page.tsx → src/lib/seo.ts

## Import Cycles
- None detected.

## Communities (33 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.23
Nodes (9): formatDate(), InsightsFeaturedArticle(), Navbar(), BEND_SPRING, HighlightRect, RubberHoverHighlightLayer(), RubberHoverOptions, SNAP_SPRING (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (47): AboutPage(), CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout() (+39 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (48): metadata, REMOTE_POINTS, VALUES, BlueprintGrid(), BlueprintGridProps, Reveal(), RevealProps, Stagger() (+40 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (39): ArticleFaq(), ArticleFaqAccordion(), ArticleTakeaways(), getAdjacentPosts(), getAllCaseStudies(), getAllPosts(), getCaseStudiesByIndustry(), getCaseStudyBySlug() (+31 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (36): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+28 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (9): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, summarizeWithLabel(), AiFabButton(), AiFabLogo(), AiFabTooltip(), AiSummaryFab() (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (14): featuredHomepageIndustries, homepageIndustries, HomepageIndustry, moreHomepageIndustries, IndustryCard(), IndustryNavShowcaseGrid(), SLIDE_EASE, BlueprintTableGrid() (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (16): ContactPage(), POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel() (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (11): PRODUCT_SURFACES, ProductCard(), STATUS_LABEL, STATUS_STYLE, ProductSlider(), ProductSliderProps, ProductsShowcase(), ProductsShowcaseProps (+3 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (11): ComparisonTableRow(), ProcessSteps(), Step, ArticleShare(), NavItemGrid(), NavMenuItemLink(), ServiceMegaCard(), MegaTrigger() (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.05
Nodes (36): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+28 more)

### Community 20 - "Community 20"
Cohesion: 0.24
Nodes (12): industryParents, industries, parentServices(), sub(), CaseResult, Industry, IndustryCategory, IndustryParent (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.18
Nodes (11): ArticleCard(), ArticleCardShowcaseBody(), formatDate(), FilterPost, InsightsFilterableGrid(), Logo(), LogoVariant, ZMark() (+3 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (6): COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer(), FooterNavLink(), Service, HoverFlip()

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.29
Nodes (6): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, WebsiteBuilderAnimation()

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (19): Migration, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards, MegaMenu(), MegaMenuProps (+11 more)

### Community 27 - "Community 27"
Cohesion: 0.29
Nodes (4): ArticleBody(), ArticleBlock, formatDate(), slugify()

### Community 28 - "Community 28"
Cohesion: 0.19
Nodes (6): CountUp(), CountUpProps, BenefitItem, BenefitsGrid(), StatsRow(), BlueprintGridCrosses()

### Community 29 - "Community 29"
Cohesion: 0.17
Nodes (10): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 31 - "Community 31"
Cohesion: 0.28
Nodes (5): HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage()

### Community 34 - "Community 34"
Cohesion: 0.31
Nodes (6): ProjectShowcaseLogo(), ProjectShowcaseLogoProps, PortfolioProject, PortfolioShowcaseCard(), PortfolioShowcaseCardProps, PortfolioWorkGridProps

## Knowledge Gaps
- **167 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+162 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 18` to `Community 0`, `Community 2`, `Community 34`, `Community 4`, `Community 6`, `Community 8`, `Community 9`, `Community 17`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 24`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 31`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 2` to `Community 4`, `Community 8`, `Community 18`, `Community 19`, `Community 22`, `Community 26`, `Community 28`, `Community 30`, `Community 31`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 2` to `Community 4`, `Community 9`, `Community 17`, `Community 18`, `Community 19`, `Community 26`, `Community 29`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _167 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05499735589635114 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08140350877192983 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09397163120567376 - nodes in this community are weakly interconnected._