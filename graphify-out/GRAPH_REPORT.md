# Graph Report - zednova-website  (2026-06-20)

## Corpus Check
- 109 files · ~81,955 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 492 nodes · 1204 edges · 20 communities (15 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a9e36688`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
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
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 91 edges
2. `Button()` - 16 edges
3. `compilerOptions` - 16 edges
4. `getAllIndustries()` - 14 edges
5. `Icon()` - 13 edges
6. `SectionLabel()` - 13 edges
7. `Reveal()` - 12 edges
8. `BlueprintCross()` - 12 edges
9. `Service` - 12 edges
10. `DarkCTA()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllPosts()`  [INFERRED]
  app/resources/[slug]/page.tsx → lib/queries.ts
- `generateStaticParams()` --calls--> `getAllServices()`  [INFERRED]
  app/services/[slug]/page.tsx → lib/queries.ts
- `generateStaticParams()` --calls--> `getAllCaseStudies()`  [INFERRED]
  app/work/[slug]/page.tsx → lib/queries.ts
- `NavMenuItemLink()` --calls--> `cn()`  [EXTRACTED]
  components/layout/MegaMenu.tsx → lib/utils.ts
- `ServiceMegaCard()` --calls--> `cn()`  [EXTRACTED]
  components/layout/MegaMenu.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (20 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (37): CountUp(), CountUpProps, metadata, PILLARS, ClientLogo, clientLogos, portfolioProjects, ProductStatus (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (33): caseStudies, industries, industryParents, b2bBuildItems, ecommerceBuildItems, healthcareBuildItems, industries, parentServices() (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (40): AboutPage(), metadata, REMOTE_POINTS, VALUES, BlueprintGrid(), EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline() (+32 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (40): computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), MagneticButton(), MagneticButtonProps, generateMetadata() (+32 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (36): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+28 more)

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (8): BlueprintGridProps, COMPANY_LINKS, Footer(), MegaMenu(), BlueprintGuides(), BlueprintGuidesProps, BlueprintReveal, useBlueprintReveal()

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (47): featuredHomepageIndustries, homepageIndustries, HomepageIndustry, moreHomepageIndustries, Migration, customSoftwareNavItems, industryNavItems, NavMenuGroup (+39 more)

### Community 9 - "Community 9"
Cohesion: 0.50
Nodes (3): BUDGET_OPTIONS, ContactInput, contactSchema

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (51): CustomCursor(), LenisProvider(), PageTransition(), generateMetadata(), generateStaticParams(), geistMono, instrumentSerif, metadata (+43 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.13
Nodes (10): ecommerceNavServices, services, Service, ServiceShowcaseCard(), ServiceShowcaseCardProps, ServicesShowcaseGridProps, Icon(), ICONS (+2 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

## Knowledge Gaps
- **162 isolated node(s):** `version`, `configurations`, `metadata`, `VALUES`, `REMOTE_POINTS` (+157 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 4` to `Community 0`, `Community 1`, `Community 2`, `Community 6`, `Community 8`, `Community 24`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 2` to `Community 0`, `Community 8`, `Community 20`, `Community 4`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `getAllIndustries()` connect `Community 20` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `getAllIndustries()` (e.g. with `generateStaticParams()` and `IndustryDetailPage()`) actually correct?**
  _`getAllIndustries()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `metadata` to the rest of the system?**
  _162 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05325814536340852 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06802721088435375 - nodes in this community are weakly interconnected._