# Graph Report - zednova-website  (2026-06-21)

## Corpus Check
- 115 files · ~86,020 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 519 nodes · 1253 edges · 21 communities (15 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d45987e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
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
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 31|Community 31]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 98 edges
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

## Communities (21 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (42): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), byKey(), CRMAutomationAnimation(), edge(), EDGES (+34 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (41): AboutPage(), metadata, REMOTE_POINTS, VALUES, EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline(), Reveal() (+33 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (56): BlueprintGrid(), BlueprintGridProps, computeTargetX(), HeroLineWave(), HeroLineWaveProps, hoverStrength(), smoothstep(), MagneticButton() (+48 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (36): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+28 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (24): CustomCursor(), LenisProvider(), PageTransition(), generateStaticParams(), geistMono, instrumentSerif, metadata, RootLayout() (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.06
Nodes (44): Migration, customSoftwareNavItems, industryNavItems, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard, serviceMegaMenuCards, serviceNavGroups (+36 more)

### Community 9 - "Community 9"
Cohesion: 0.50
Nodes (3): BUDGET_OPTIONS, ContactInput, contactSchema

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 20 - "Community 20"
Cohesion: 0.05
Nodes (44): caseStudies, ecommerceNavServices, industries, industryParents, b2bBuildItems, ecommerceBuildItems, healthcareBuildItems, industries (+36 more)

### Community 22 - "Community 22"
Cohesion: 0.06
Nodes (23): COMPANY_LINKS, Footer(), ServiceGroup, BenefitItem, BenefitsGrid(), FILTER_LABELS, FILTER_ORDER, FilterKey (+15 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 31 - "Community 31"
Cohesion: 0.22
Nodes (11): CountUp(), CountUpProps, generateMetadata(), generateStaticParams(), getAllCaseStudies(), getCaseStudyBySlug(), getIndustryTitle(), getServicesBySlugs() (+3 more)

## Knowledge Gaps
- **173 isolated node(s):** `version`, `configurations`, `allow`, `metadata`, `VALUES` (+168 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 4` to `Community 0`, `Community 2`, `Community 8`, `Community 20`, `Community 22`, `Community 31`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 2` to `Community 0`, `Community 8`, `Community 4`, `Community 31`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `getAllIndustries()` connect `Community 6` to `Community 0`, `Community 2`, `Community 20`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `getAllIndustries()` (e.g. with `generateStaticParams()` and `IndustryDetailPage()`) actually correct?**
  _`getAllIndustries()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _173 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05117845117845118 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07759562841530054 - nodes in this community are weakly interconnected._