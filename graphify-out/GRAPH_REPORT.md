# Graph Report - zednova-website  (2026-06-20)

## Corpus Check
- 90 files · ~33,191 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 386 nodes · 943 edges · 19 communities (14 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70414f7e`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 76 edges
2. `compilerOptions` - 16 edges
3. `Button()` - 14 edges
4. `Reveal()` - 12 edges
5. `BlueprintCross()` - 12 edges
6. `SectionLabel()` - 12 edges
7. `Icon()` - 11 edges
8. `getAllIndustries()` - 11 edges
9. `Service` - 11 edges
10. `CaseStudy` - 11 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllIndustries()`  [INFERRED]
  app/industries/[slug]/page.tsx → lib/queries.ts
- `IndustryDetailPage()` --calls--> `getServicesBySlugs()`  [INFERRED]
  app/industries/[slug]/page.tsx → lib/queries.ts
- `IndustriesPage()` --calls--> `getAllIndustries()`  [EXTRACTED]
  app/industries/page.tsx → lib/queries.ts
- `ProductsPage()` --calls--> `getAllProducts()`  [EXTRACTED]
  app/products/page.tsx → lib/queries.ts
- `generateStaticParams()` --calls--> `getAllPosts()`  [INFERRED]
  app/resources/[slug]/page.tsx → lib/queries.ts

## Import Cycles
- None detected.

## Communities (19 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (42): MagneticButton(), MagneticButtonProps, generateMetadata(), getPostBySlug(), getTeamMember(), ArticleBlock, CaseStudy, ServiceGroup (+34 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (30): BlueprintGrid(), BlueprintGridProps, CustomCursor(), LenisProvider(), PageTransition(), generateStaticParams(), geistMono, instrumentSerif (+22 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (40): AboutPage(), metadata, REMOTE_POINTS, VALUES, Reveal(), RevealProps, Stagger(), StaggerProps (+32 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (33): CountUp(), CountUpProps, generateMetadata(), generateStaticParams(), caseStudies, industries, posts, products (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.17
Nodes (11): ProductStatus, ProductSlider(), ProductSliderProps, ProductsShowcase(), ProductsShowcaseProps, SLIDE_EASE, slideVariants, PRODUCT_SURFACES (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (34): dependencies, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, @hookform/resolvers, lenis (+26 more)

### Community 6 - "Community 6"
Cohesion: 0.40
Nodes (4): computeTargetX(), HeroLineWave(), HeroLineWaveProps, smoothstep()

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (26): TechStackGroup, techStackGroups, MegaMenu(), MegaMenuProps, LINKS, MegaMenuType, MegaTrigger(), MENU_EASE (+18 more)

### Community 9 - "Community 9"
Cohesion: 0.50
Nodes (3): BUDGET_OPTIONS, ContactInput, contactSchema

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (14): COMPANY_LINKS, DIRECT_LINKS, MobileMenu(), Service, ServiceShowcaseCard(), ServiceShowcaseCardProps, ServicesShowcaseGridProps, Icon() (+6 more)

### Community 18 - "Community 18"
Cohesion: 0.38
Nodes (3): TestimonialCarousel(), initials(), TestimonialAvatar()

## Knowledge Gaps
- **129 isolated node(s):** `version`, `configurations`, `metadata`, `VALUES`, `REMOTE_POINTS` (+124 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 6`, `Community 8`, `Community 17`, `Community 18`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 4`, `Community 8`, `Community 17`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `getAllIndustries()` connect `Community 1` to `Community 2`, `Community 3`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `metadata` to the rest of the system?**
  _129 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0636523266022827 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08502024291497975 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09014675052410902 - nodes in this community are weakly interconnected._