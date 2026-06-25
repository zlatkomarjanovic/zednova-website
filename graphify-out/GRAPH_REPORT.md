# Graph Report - zednova-website  (2026-06-25)

## Corpus Check
- 190 files · ~624,056 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1005 nodes · 2701 edges · 60 communities (53 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cdf5d98c`
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
- [[_COMMUNITY_Community 62|Community 62]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 115 edges
2. `BlueprintCross()` - 28 edges
3. `SectionLabel()` - 27 edges
4. `Button()` - 24 edges
5. `Reveal()` - 23 edges
6. `getAllPosts()` - 22 edges
7. `BlueprintGrid()` - 21 edges
8. `TextReveal()` - 21 edges
9. `isSanityConfigured()` - 21 edges
10. `fromSanity()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllCustomSoftwareSlugs()`  [INFERRED]
  src/app/custom-software/[slug]/page.tsx → src/lib/queries.ts
- `generateMetadata()` --calls--> `getCustomSoftwareBySlug()`  [INFERRED]
  src/app/custom-software/[slug]/page.tsx → src/lib/queries.ts
- `generateStaticParams()` --calls--> `getAllIndustrySlugs()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `generateMetadata()` --calls--> `getIndustrySegmentBySlug()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts
- `IndustryDetailPage()` --calls--> `getServicesBySlugs()`  [INFERRED]
  src/app/industries/[slug]/page.tsx → src/lib/queries.ts

## Import Cycles
- None detected.

## Communities (60 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (16): CANONICAL_INDUSTRY_PARENT_SLUGS, industryParents, ecommerceSegments, fitnessSegments, healthcareSegments, industries, parentServices(), professionalSegments (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (30): ecommerceNavServices, products, CATEGORY_ORDER, IndustryPageData, staticCustomSoftwareItems, staticTestimonialImages, Product, Service (+22 more)

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
Cohesion: 0.05
Nodes (79): CustomCursor(), LenisProvider(), PageTransition(), geistMono, instrumentSerif, metadata, RootLayout(), HomePage() (+71 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): dependencies, react, react-dom, sanity, @sanity/vision, styled-components, devDependencies, @types/react (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (20): ContactPage(), POST(), CONTACT_INDUSTRY_OPTIONS, CONTACT_SERVICE_OPTIONS, ContactPrefill, findIndustryLabel(), findProductLabel(), findServiceLabel() (+12 more)

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 17 - "Community 17"
Cohesion: 0.24
Nodes (9): byKey(), CRMAutomationAnimation(), edge(), flowKeyframes, FOCUS, LINKS, NodeDef, NODES (+1 more)

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (10): customSoftwareBySlug, customSoftwareItems, DEFAULT_PROCESS, migrations, ResolveMetadataInput, ArticleFaq, FeatureBullet, OpenGraphFields (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (26): Stagger(), TextReveal(), TextRevealProps, metadata, CalBookingEmbed(), DarkCTA(), PRODUCT_SURFACES, ProductCard() (+18 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (41): fetchCaseStudyBySlugFromSanity(), fetchCustomSoftwareBySlugFromSanity(), fetchIndustryBySlugFromSanity(), fetchIndustryParentBySlugFromSanity(), fetchMigrationBySlugFromSanity(), fetchPostBySlugFromSanity(), fetchServiceBySlugFromSanity(), mapCaseStudy() (+33 more)

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (5): defs, envPath, local, outPath, rows

### Community 22 - "Community 22"
Cohesion: 0.29
Nodes (9): AI_SUMMARY_PROMPT, aiSummaryFabModels, AiSummaryModel, summarizeWithLabel(), AiFabButton(), AiFabLogo(), AiFabTooltip(), AiSummaryFab() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 24 - "Community 24"
Cohesion: 0.16
Nodes (15): BlueprintGrid(), BlueprintGridProps, EASE, HERO_BUILD_ITEMS, HeroRotatingHeadline(), metadata, PILLARS, HOMEPAGE_PRICING_BADGES (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (5): ASSETS, baseUrl, __dirname, outDir, root

### Community 26 - "Community 26"
Cohesion: 0.12
Nodes (18): FaqAccordionItem(), IndustryMegaMenuGrid(), MegaMenu(), MegaMenuProps, NavItemGrid(), NavMenuItemLink(), ServiceMegaCard(), cn() (+10 more)

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
Cohesion: 0.15
Nodes (10): HeroWorkGallery(), HeroWorkGalleryProps, PortfolioHoverMedia(), PortfolioHoverMediaProps, REVEAL_SPRING, PortfolioImage(), ProjectShowcaseLogo(), ProjectShowcaseLogoProps (+2 more)

### Community 32 - "Community 32"
Cohesion: 0.10
Nodes (19): portfolioProjects, posts, AeoAnswerBlock, ArticleBlock, Author, CaseResult, CtaBlock, CtaFields (+11 more)

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (4): FaqItem, faqs, getAllFaqs(), FaqItem

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (20): CustomSoftwareGroupSection, CustomSoftwarePageGrids(), IndustriesGroupSection, IndustriesPageGrids(), IndustryParentCard, IndustrySegmentEntry, MigrationsPageGrids(), GROUP_TAGLINES (+12 more)

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (7): ClientLogo, clientLogos, assertLogoTickerDirection(), LOGO_TICKER_SCROLL_DIRECTION, LogoTickerScrollDirection, applyLogoTickerScroll(), LogoTicker()

### Community 36 - "Community 36"
Cohesion: 0.07
Nodes (19): caseStudies, services, siteSettings, team, CaseStudy, SiteSettings, TeamMember, allTags (+11 more)

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (7): FILTER_LABELS, FILTER_ORDER, FilterKey, PANEL_EASE, panelVariants, ServicesTabShowcase(), ServicesTabShowcaseProps

### Community 38 - "Community 38"
Cohesion: 0.25
Nodes (5): caseStudyTestimonials, platformTestimonials, rawPlatformTestimonials, testimonials, Testimonial

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): schemaTypes, SINGLETONS, structure()

### Community 40 - "Community 40"
Cohesion: 0.15
Nodes (12): CMS collections (live on frontend), Commands, CORS (if fetch fails from browser), Environment variables, Next steps, Next steps (Phase 2), Re-seed after editing static source, Repo layout (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.13
Nodes (13): FOUNDER_BIO, FounderSection(), ABOUT_STATS, AboutPage(), FOUNDER_BIO, metadata, REMOTE_POINTS, REMOTE_STEPS (+5 more)

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (12): TechStackGroup, techStackGroups, TechStackShowcase(), formatDate(), InsightsFeaturedArticle(), Navbar(), BEND_SPRING, HighlightRect (+4 more)

### Community 44 - "Community 44"
Cohesion: 0.16
Nodes (6): Migration, COMPANY_LINKS, CUSTOM_SOFTWARE_FOOTER, Footer(), FooterNavLink(), HoverFlip()

### Community 45 - "Community 45"
Cohesion: 0.15
Nodes (12): aeoAnswerBlock, bulletItem, calloutBlock, codeBlock, contentSection, ctaBlock, deliverableItem, inlineFaq (+4 more)

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (6): industry, industryCategories, industryFields, industryGroups, industryParent, sharedIndustryFields

### Community 47 - "Community 47"
Cohesion: 0.18
Nodes (8): featuredHomepageIndustries, homepageIndustries, HomepageIndustry, moreHomepageIndustries, IndustryNavShowcaseGrid(), SLIDE_EASE, Icon(), ICONS

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (11): aiSummaryField, faqReferencesField, featuredField, llmSnippetField, openGraphField, primaryCtaField, priorityField, quickAnswerField (+3 more)

### Community 50 - "Community 50"
Cohesion: 0.17
Nodes (9): LINKS, LINKS_AFTER_INDUSTRIES, LINKS_BEFORE_ABOUT, MegaMenuType, MegaTrigger(), MENU_EASE, MENU_ORDER, NavbarProps (+1 more)

### Community 51 - "Community 51"
Cohesion: 0.18
Nodes (10): aeoGroup, contentGroup, conversionGroup, editorialGroup, ogGroup, relationshipsGroup, schemaGroup, seoGroup (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.13
Nodes (15): customSoftwareGroups, CustomSoftwareGroupSection, customSoftwareNavItems, industryNavItems, megaMenuNavLinks, NavMenuGroup, NavMenuItem, ServiceMegaMenuCard (+7 more)

### Community 53 - "Community 53"
Cohesion: 0.06
Nodes (67): ProcessSteps(), Step, ArticleBody(), ArticleCard(), ArticleCardShowcaseBody(), formatDate(), ArticleFaq(), ArticleFaqAccordion() (+59 more)

### Community 54 - "Community 54"
Cohesion: 0.31
Nodes (7): Reveal(), RevealProps, StaggerProps, metadata, STEPS, PageHero(), metadata

### Community 56 - "Community 56"
Cohesion: 0.29
Nodes (6): AIChatbotAnimation(), AnimationBackdrop(), BrowserChrome(), CollabCursor(), CARDS, WebsiteBuilderAnimation()

### Community 57 - "Community 57"
Cohesion: 0.29
Nodes (5): FilterPost, InsightsFilterableGrid(), Logo(), LogoVariant, ZMark()

### Community 58 - "Community 58"
Cohesion: 0.24
Nodes (5): agencyComparison, ComparisonRow, ComparisonSection, AgencyComparisonSection(), ComparisonTableRow()

### Community 62 - "Community 62"
Cohesion: 0.38
Nodes (3): initials(), TestimonialAvatar(), TestimonialCarousel()

## Knowledge Gaps
- **328 isolated node(s):** `version`, `configurations`, `allow`, `eslintConfig`, `nextConfig` (+323 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 26` to `Community 0`, `Community 6`, `Community 9`, `Community 17`, `Community 19`, `Community 22`, `Community 24`, `Community 28`, `Community 29`, `Community 31`, `Community 34`, `Community 37`, `Community 41`, `Community 43`, `Community 44`, `Community 47`, `Community 50`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 62`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `BlueprintCross()` connect `Community 19` to `Community 34`, `Community 35`, `Community 37`, `Community 6`, `Community 41`, `Community 44`, `Community 50`, `Community 53`, `Community 54`, `Community 24`, `Community 26`, `Community 28`, `Community 62`, `Community 31`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `SectionLabel()` connect `Community 34` to `Community 26`, `Community 6`, `Community 41`, `Community 19`, `Community 53`, `Community 54`, `Community 24`, `Community 58`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `allow` to the rest of the system?**
  _328 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10420168067226891 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._