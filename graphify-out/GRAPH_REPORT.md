# Graph Report - zednova-website  (2026-06-22)

## Corpus Check
- 120 files · ~116,567 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 552 nodes · 1324 edges · 31 communities (25 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `006b0db2`
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
- [[_COMMUNITY_Community 34|Community 34]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 108 edges
2. `Button()` - 16 edges
3. `compilerOptions` - 16 edges
4. `SectionLabel()` - 14 edges
5. `getAllIndustries()` - 14 edges
6. `Reveal()` - 13 edges
7. `BlueprintCross()` - 13 edges
8. `Icon()` - 13 edges
9. `Service` - 12 edges
10. `DarkCTA()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `IndustryDetailPage()` --calls--> `getAllIndustries()`  [INFERRED]
  app/industries/[slug]/page.tsx → lib/queries.ts
- `IndustryDetailPage()` --calls--> `getServicesBySlugs()`  [INFERRED]
  app/industries/[slug]/page.tsx → lib/queries.ts
- `generateStaticParams()` --calls--> `getAllPosts()`  [INFERRED]
  app/resources/[slug]/page.tsx → lib/queries.ts
- `generateStaticParams()` --calls--> `getAllServices()`  [INFERRED]
  app/services/[slug]/page.tsx → lib/queries.ts
- `generateStaticParams()` --calls--> `getAllCaseStudies()`  [INFERRED]
  app/work/[slug]/page.tsx → lib/queries.ts

## Import Cycles
- None detected.

## Communities (31 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (51): customSoftwareNavItems, industryNavItems, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards, serviceNavGroups, MegaMenu() (+43 more)

### Community 1 - "Community 1"
Cohesion: 0.24
Nodes (9): CountUp(), CountUpProps, generateMetadata(), getCaseStudyBySlug(), getIndustryTitle(), getServicesBySlugs(), getTestimonialById(), StatsRow() (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (49): AboutPage(), metadata, REMOTE_POINTS, VALUES, BlueprintGrid(), BlueprintGridProps, EASE, HERO_BUILD_ITEMS (+41 more)

### Community 4 - "Community 4"
Cohesion: 0.16
Nodes (16): generateMetadata(), generateStaticParams(), getAllPosts(), getPostBySlug(), getTeamMember(), ArticleBlock, formatDate(), slugify() (+8 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (36): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+28 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (28): CustomCursor(), LenisProvider(), PageTransition(), generateStaticParams(), geistMono, instrumentSerif, metadata, RootLayout() (+20 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.21
Nodes (8): agencyComparison, ComparisonColumn, ComparisonItem, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonColumnPanel(), ComparisonRow()

### Community 9 - "Community 9"
Cohesion: 0.50
Nodes (3): BUDGET_OPTIONS, ContactInput, contactSchema

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
Cohesion: 0.20
Nodes (11): byKey(), CRMAutomationAnimation(), edge(), EDGES, flowKeyframes, FOCUS, LINKS, NODE_GLOW (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.06
Nodes (34): caseStudies, ecommerceNavServices, industries, industryParents, b2bBuildItems, ecommerceBuildItems, healthcareBuildItems, industries (+26 more)

### Community 21 - "Community 21"
Cohesion: 0.24
Nodes (10): AI_SUMMARY_PROMPT, aiSummaryCopy, aiSummaryFabModels, AiSummaryModel, aiSummaryModels, summarizeWithLabel(), AiFabButton(), AiFabLogo() (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (9): ServiceGroup, FILTER_LABELS, FILTER_ORDER, FilterKey, GROUP_ORDER, PANEL_EASE, panelVariants, ServicesTabShowcase() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.14
Nodes (13): metadata, PILLARS, featuredHomepageIndustries, homepageIndustries, HomepageIndustry, moreHomepageIndustries, portfolioProjects, TechStackGroup (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.07
Nodes (34): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), MagneticButton(), MagneticButtonProps, CARDS, WebsiteBuilderAnimation() (+26 more)

### Community 27 - "Community 27"
Cohesion: 0.33
Nodes (3): BenefitItem, BenefitsGrid(), BlueprintGridCrosses()

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (8): COMPANY_LINKS, Footer(), BlueprintCross(), BlueprintCrossProps, BlueprintGuides(), BlueprintGuidesProps, BlueprintReveal, useBlueprintReveal()

### Community 29 - "Community 29"
Cohesion: 0.32
Nodes (5): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep()

### Community 34 - "Community 34"
Cohesion: 0.25
Nodes (6): ClientLogo, clientLogos, half, items, LOGOS, LogoTicker()

## Knowledge Gaps
- **179 isolated node(s):** `version`, `configurations`, `allow`, `metadata`, `VALUES` (+174 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 26` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 8`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 27`, `Community 28`, `Community 29`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 2` to `Community 0`, `Community 1`, `Community 17`, `Community 24`, `Community 26`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `getAllIndustries()` connect `Community 6` to `Community 24`, `Community 2`, `Community 20`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _179 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05220288781932617 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0670122176971492 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._