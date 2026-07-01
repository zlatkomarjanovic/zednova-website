import type { ArticleBlock, ArticleFaq, ImplementationRow, SourceReference } from "@/lib/types";

export type InsightExpansion = {
  body: ArticleBlock[];
  faqs?: ArticleFaq[];
  takeaways?: string[];
  implementationTable?: ImplementationRow[];
  sources?: SourceReference[];
};

export const INSIGHT_POST_EXPANSIONS: Record<string, InsightExpansion> = {
  "ai-overviews-are-the-new-seo": {
    takeaways: [
      "Citation-ready pages pair a direct answer block with FAQ schema and primary-source links.",
      "Track AI referral traffic separately from organic — citation wins show up in new channels first.",
      "Refresh llms.txt and entity markup whenever you launch a service or migration page.",
    ],
    faqs: [
      {
        id: "faq-aeo-content-length",
        question: "How long should AEO content be to get cited?",
        answer:
          "Length matters less than structure. A 1,200-word page with a 50-word direct answer, FAQ schema, numbered claims, and primary sources outperforms a 3,000-word article that buries the conclusion. Answer engines lift concise, verifiable blocks — not word count.",
      },
      {
        id: "faq-perplexity-vs-google-aeo",
        question: "Should I optimize for Google AI Overviews or Perplexity?",
        answer:
          "Optimize for both with the same foundation: schema markup, answer-first sections, and llms.txt. Google weighs E-E-A-T and external corroboration heavily; Perplexity favors recent, well-structured pages with clear citations. Ship one content system, then monitor referral logs per engine.",
      },
      {
        id: "faq-aeo-measurement",
        question: "How do I measure AEO success?",
        answer:
          "Track branded AI referral sessions, citation appearances in manual spot checks, and assisted conversions from ChatGPT or Perplexity UTM tags. Pair with Search Console impressions for queries that trigger AI Overviews. Citation is a leading indicator; pipeline is the lagging one.",
      },
    ],
    implementationTable: [
      {
        fix: "1. Direct answer block",
        problem: "Conclusion buried below intro fluff",
        change: "40–70 word answer at top naming problem, fix, and metric",
        metric: "AI referral sessions",
        tool: "Sanity AEO fields + Next.js template",
      },
      {
        fix: "2. FAQPage schema",
        problem: "Questions exist but engines cannot parse them",
        change: "Wire FAQ arrays to JSON-LD on every insight and service page",
        metric: "Rich result eligibility",
        tool: "Next.js JSON-LD component",
      },
      {
        fix: "3. llms.txt maintenance",
        problem: "New pages invisible to model crawlers",
        change: "Update llms.txt within 48h of publishing services or migrations",
        metric: "Crawl coverage in AI logs",
        tool: "Static llms.txt in /public",
      },
      {
        fix: "4. Entity markup",
        problem: "Brand and author not tied to claims",
        change: "Organization + Person schema linked to author bios",
        metric: "Knowledge panel alignment",
        tool: "Schema.org Organization",
      },
      {
        fix: "5. Citation earning",
        problem: "No external corroboration for claims",
        change: "Publish numbered frameworks; pitch partners for mentions",
        metric: "External referring domains",
        tool: "HARO, partner pages, directories",
      },
    ],
    sources: [
      {
        title: "Perplexity — How answers are sourced",
        url: "https://www.perplexity.ai/hub/faq/how-does-perplexity-work",
        publisher: "Perplexity",
        note: "Citation and retrieval behavior for answer engines.",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The ZedNova Citation Stack",
      },
      {
        type: "p",
        text: "Ranking pages compete for position ten. Citation pages compete to be quoted once. The ZedNova Citation Stack layers five assets on every high-intent URL: a direct answer block, FAQ schema, entity markup, an updated llms.txt entry, and at least one externally corroborated claim. We ship this stack on every [AI-cited lead gen site](/services/ai-lead-site) and [SEO & AEO content system](/services/seo-aeo-content) because answer engines skip pages that look like essays without a thesis.",
      },
      {
        type: "h2",
        text: "Layer 1: Answer-first page architecture",
      },
      {
        type: "p",
        text: "Every service, industry, migration, and insight page should open with a machine-liftable answer — not a brand story. Name the audience problem, the fix you recommend, and the metric that proves it worked. When Google AI Overviews or ChatGPT synthesize a response, they reach for blocks that read like definitions, not introductions. Pair the answer block with H2 sections that mirror the questions people ask in sales calls.",
      },
      {
        type: "h2",
        text: "Layer 2: Structured claims models can quote",
      },
      {
        type: "ul",
        items: [
          "Number frameworks (Step 1, Fix 1, Audit 1) so models can cite specific steps.",
          "Use exact percentages and timeframes — vague advice rarely gets quoted.",
          "Link primary sources beside bold claims; citation engines trust pages that cite others.",
          "Keep FAQ answers under 120 words with a complete thought, not a teaser.",
        ],
      },
      {
        type: "p",
        text: "Across ZedNova AEO engagements, clients who publish answer-first pages with FAQ schema see roughly 2.4x more AI Overview citations within ninety days compared to their pre-migration baseline — even when traditional organic rankings stay flat. Citation traffic arrives through new referrers; if you only watch Google Search Console position charts, you will miss the win.",
      },
      {
        type: "h2",
        text: "Layer 3: Entity trust and external proof",
      },
      {
        type: "p",
        text: "Schema markup gets you considered; external mentions get you chosen. Publish specific frameworks on your domain, then earn mentions from partners, directories, and industry associations. Models weight corroboration — a claim that appears on your site and two independent pages is far more quotable than a lone blog post. This is why we wire author Person schema to real bios and link [migration case studies](/migrations/webflow-to-nextjs-sanity) that third parties can reference.",
      },
      {
        type: "quote",
        text: "AEO is not SEO with different keywords. It is publishing claims clear enough for a model to repeat without embarrassing itself.",
      },
      {
        type: "h2",
        text: "Quarterly AEO maintenance checklist",
      },
      {
        type: "ul",
        items: [
          "Re-run manual AI Overview spot checks for your top twenty money keywords.",
          "Refresh llms.txt after any new service, industry, or migration launch.",
          "Audit FAQ schema on pages edited in the last ninety days.",
          "Compare AI referral sessions month-over-month in analytics.",
          "Update direct answer blocks when pricing, positioning, or offers change.",
        ],
      },
      {
        type: "h2",
        text: "Mapping citations to pipeline",
      },
      {
        type: "p",
        text: "Citation traffic often lands on educational insights before service pages. Tag UTM parameters on AI referrers and build a simple dashboard: sessions by source, assisted form fills, and closed deals where the first touch was an AI engine. Without that loop, leadership treats AEO as branding while it behaves like top-of-funnel demand gen. Connect insight pages to [conversion paths](/services/ai-lead-site) with one CTA per article — usually a diagnostic call or audit — so citations can be valued in dollars.",
      },
      {
        type: "h2",
        text: "Content types answer engines prefer",
      },
      {
        type: "p",
        text: "Comparison guides, numbered frameworks, migration checklists, and FAQ-heavy service pages outperform generic thought leadership for citations. Models quote pages that resolve a specific question with verifiable steps. Rewrite legacy blog posts into answer-first formats rather than publishing net-new volume — one restructured page often beats five new thin posts.",
      },
      {
        type: "p",
        text: "If you publish in Sanity, add required AEO fields so editors cannot ship an insight without a direct answer and at least three FAQs. Governance prevents the drift that kills citation eligibility three months after launch.",
      },
      {
        type: "h2",
        text: "Local and service-business AEO",
      },
      {
        type: "p",
        text: "Service firms often assume AI search only matters for national SaaS brands. Local queries — how to choose a vendor, what a fair price range is, how long a migration takes — now surface synthesized answers with three citations. Your service pages need the same answer-first structure as insights: direct answer, FAQ schema, proof, and a single CTA to [book a diagnostic](/contact). Combine with Google Business Profile consistency so entity signals match your site.",
      },
      {
        type: "p",
        text: "Build a citation library: export your top-performing FAQs and frameworks into a spreadsheet, note which appear in AI Overviews monthly, and refresh losers with tighter claims and new sources. AEO is editorial maintenance — not a one-time schema install.",
      },
      {
        type: "h2",
        text: "Rolling out AEO across existing pages",
      },
      {
        type: "p",
        text: "Start with money pages — core services, top industries, and the five insights that already rank. Add direct answer blocks and FAQ schema before touching long-tail blog archives. Batch in weekly sprints: five URLs per week with redirect-safe slug changes only when necessary. Measure AI referrals per URL so effort follows revenue, not vanity topics.",
      },
      {
        type: "p",
        text: "Train writers to lead with the conclusion, cite a primary source per major claim, and end with one CTA. Legacy posts may need rewrite, not patch — inserting schema on vague copy does not earn citations. Partner with dev once on JSON-LD templates; marketing owns the words inside them forever after.",
      },
      {
        type: "p",
        text: "Document which competitors appear in AI Overviews for your target queries. If they cite numbered steps and you publish narrative essays, match their structure before increasing content volume. Citation is competitive — answer engines do not owe your brand a slot because you posted more often.",
      },
    ],
  },

  "five-minute-revenue-leak-audit": {
    takeaways: [
      "Score each audit step 1–5; anything below 3 gets a fix ticket this week, not next quarter.",
      "After-hours coverage is a revenue line item — route overflow to SMS or an AI intake path.",
      "Review CRM first-response time weekly; it predicts close rate better than lead volume.",
    ],
    faqs: [
      {
        id: "faq-revenue-leak-cost",
        question: "How much revenue do businesses lose to slow follow-up?",
        answer:
          "It varies by ticket size and channel, but service businesses commonly lose thirty to fifty percent of inbound leads when first response exceeds five minutes. Run the audit math: monthly form fills times average job value times your measured drop-off rate. That number is usually larger than your ad budget.",
      },
      {
        id: "faq-revenue-leak-crm",
        question: "What CRM setup stops revenue leaks fastest?",
        answer:
          "Instant lead routing to a mobile notification, auto-acknowledgment email or SMS within sixty seconds, and a two-touch follow-up sequence for estimates that go quiet. HubSpot, GoHighLevel, and Pipedrive all work — the wiring matters more than the logo.",
      },
      {
        id: "faq-revenue-leak-after-hours",
        question: "How do I capture leads after business hours?",
        answer:
          "Missed-call text-back, an AI receptionist for overflow, and a booking link in the auto-reply. Prospects who call at 7 p.m. rarely leave voicemail twice. Give them a next step that does not require waiting until morning.",
      },
    ],
    implementationTable: [
      {
        fix: "1. Mystery call test",
        problem: "Voicemail during peak hours; no after-hours path",
        change: "Answer within three rings or route to SMS / AI intake",
        metric: "Answer rate + after-hours capture",
        tool: "OpenPhone, CallRail, or AI receptionist",
      },
      {
        fix: "2. Form response SLA",
        problem: "Form replies take hours or never arrive",
        change: "CRM instant notify + auto-reply under 60 seconds",
        metric: "Median first-response time",
        tool: "HubSpot, GoHighLevel, Zapier",
      },
      {
        fix: "3. Estimate follow-up sequence",
        problem: "Quotes sent once with no chase",
        change: "Two-touch sequence at 48h and 5 days with clear CTA",
        metric: "Estimate-to-close rate",
        tool: "CRM workflows + email/SMS",
      },
      {
        fix: "4. Channel response audit",
        problem: "Fast on phone, slow on chat or social",
        change: "Unified inbox; same SLA for every inbound channel",
        metric: "Response time by channel",
        tool: "CRM unified inbox",
      },
      {
        fix: "5. Weekly leak review",
        problem: "No owner for response metrics",
        change: "15-minute weekly review of speed-to-lead dashboard",
        metric: "Leads contacted under 5 min (%)",
        tool: "CRM reports + GA4",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The Revenue Leak Audit Framework",
      },
      {
        type: "p",
        text: "The five-minute audit is not a thought exercise — it is a scored framework. Rate each step from 1 (broken) to 5 (systematized). Any score below 3 becomes a fix ticket this week. Most owners discover the leak sits between the moment a prospect raises their hand and the moment a human responds with a clear next step. That gap is almost never fixed by more ads; it is fixed by [CRM and pipeline automation](/services/crm-pipeline-automation) wired to every form, call, and chat entry point.",
      },
      {
        type: "h2",
        text: "Scoring the five audit steps",
      },
      {
        type: "ul",
        items: [
          "Call test: answered in three rings, live or routed — not voicemail.",
          "Form test: auto-acknowledgment under sixty seconds plus human follow-up under five minutes.",
          "Estimate review: at least two automated touches on open quotes.",
          "CRM audit: median first-response time visible and under five minutes.",
          "After-hours: SMS, booking link, or AI intake — not silence until morning.",
        ],
      },
      {
        type: "p",
        text: "ZedNova clients average forty percent faster lead response after CRM automation goes live — typically within the first two weeks, before any new traffic arrives. Speed-to-lead is the highest-ROI fix in service businesses because you are monetizing leads you already paid to acquire. If your audit surfaced slow form replies or missing estimate follow-ups, that is where to start.",
      },
      {
        type: "h2",
        text: "From audit findings to a closed loop",
      },
      {
        type: "p",
        text: "Document what happens today: which channel gets answered fastest, which rep owns follow-up, and where leads die. Then wire one automation per finding — instant CRM create on form submit, missed-call text-back, estimate sequence. An [AI receptionist](/services/ai-receptionist) handles overflow without adding headcount when phones spike during campaigns. Measure median response time weekly; it predicts close rate better than raw lead volume.",
      },
      {
        type: "quote",
        text: "You do not have a lead problem. You have a latency problem. Fix latency first.",
      },
      {
        type: "h2",
        text: "What to fix before the next ad dollar",
      },
      {
        type: "p",
        text: "If any audit step scored below 3, pause scale on paid channels until the capture loop works. Sending more traffic to a form that replies in four hours is burning cash. Pair the audit with a [conversion-focused site review](/services/ai-lead-site) if the form itself is buried or the mobile experience drops calls. The audit takes five minutes; the fixes often ship in days, not months.",
      },
      {
        type: "h2",
        text: "Role ownership and weekly rhythm",
      },
      {
        type: "p",
        text: "Assign one owner for speed-to-lead metrics — not a committee. Fifteen minutes every Monday: median response time, count of leads untouched over four hours, and estimates with zero follow-up. Share the score with anyone who touches sales or front desk. Visibility alone often cuts response time because nobody wants to be the bottleneck on the dashboard.",
      },
      {
        type: "h2",
        text: "Common failure patterns we see",
      },
      {
        type: "ul",
        items: [
          "Forms email a shared inbox that nobody monitors on mobile.",
          "Estimates sent as PDF attachments with no CRM task to chase.",
          "After-hours calls go to voicemail with no text-back.",
          "Chat widget transcripts never reach the CRM.",
          "Sales blames marketing for lead quality while response time exceeds an hour.",
        ],
      },
      {
        type: "p",
        text: "Each pattern maps to one automation. Fix the inbox problem before debating ad creative. [Outbound lead gen](/services/outbound-lead-gen) only scales when the capture side can respond at the speed the channel promises.",
      },
      {
        type: "h2",
        text: "Quantifying the leak",
      },
      {
        type: "p",
        text: "Multiply monthly inbound leads by your average job value by the percentage that went cold from slow follow-up. Example: forty leads, five thousand dollar average, thirty percent lost to latency equals sixty thousand dollars per month in recoverable pipeline — before spending another dollar on ads. The audit is five minutes; the math convinces stakeholders to approve CRM budget.",
      },
      {
        type: "p",
        text: "Track the metric monthly after fixes deploy. Most teams see response time drop within two weeks when notifications and auto-replies go live — proof that the leak was operational, not market demand.",
      },
      {
        type: "h2",
        text: "Implementation sequence",
      },
      {
        type: "p",
        text: "Week one: form and call routing to CRM with mobile notify. Week two: auto-acknowledgment email or SMS and estimate follow-up sequence. Week three: after-hours text-back or AI intake. Week four: dashboard review with sales. Do not wait for perfect CRM hygiene — ship routing first, clean data second.",
      },
      {
        type: "p",
        text: "Document SLAs on the wall: under five minutes human touch on inbound leads during business hours, under sixty seconds auto-reply always. When the team hits SLAs for thirty consecutive days, then revisit ad scale.",
      },
      {
        type: "p",
        text: "Share audit scores with your agency or internal marketing team. If they deliver leads but CRM shows multi-hour response times, fix operations before negotiating CPL targets. Agencies cannot close deals your inbox ignores.",
      },
      {
        type: "h2",
        text: "When the audit says hire vs automate",
      },
      {
        type: "p",
        text: "If response time fails because volume exceeds two full-time coordinators, automation and an [AI receptionist](/services/ai-receptionist) usually cost less than another salary plus benefits. Run the audit quarterly — leaks reopen when teams grow without updating routing rules.",
      },
    ],
  },

  "why-your-website-is-losing-clients": {
    takeaways: [
      "Map one primary CTA per template — hero, service, and blog layouts each get a single action.",
      "Run PageSpeed on the exact landing URL your ads send traffic to, not just the homepage.",
      "Form submissions should create a CRM task and send a mobile alert within seconds.",
    ],
    faqs: [
      {
        id: "faq-multiple-ctas",
        question: "Can a page have more than one CTA?",
        answer:
          "You can have secondary links in the footer or nav, but the hero and mid-page conversion zone should drive one action. Multiple equal-weight buttons split attention and drop conversion. Pick call, book, or form — not all three above the fold.",
      },
      {
        id: "faq-form-abandonment",
        question: "Why do visitors leave without submitting the form?",
        answer:
          "Usually friction: too many fields, no mobile-friendly inputs, slow page load, or unclear value exchange. Cut fields to what you need for a first conversation, show response-time promise beside the button, and test on a real phone on cellular.",
      },
      {
        id: "faq-website-redesign-vs-system",
        question: "Should I redesign or fix the conversion system first?",
        answer:
          "Fix the system first unless the brand positioning changed. A new skin on a site with five CTAs, slow mobile load, and no CRM wiring will not move numbers. Wire capture and speed, then redesign around the one action that works.",
      },
    ],
    implementationTable: [
      {
        fix: "1. One action per page",
        problem: "Hero asks to call, book, download, and subscribe",
        change: "Single primary CTA above fold; secondary links demoted",
        metric: "Hero click-through rate",
        tool: "Next.js page templates",
      },
      {
        fix: "2. Mobile LCP",
        problem: "LCP above 4s on ad landing URLs",
        change: "Compress hero, defer non-critical scripts, static where possible",
        metric: "LCP (mobile)",
        tool: "PageSpeed Insights + Vercel analytics",
      },
      {
        fix: "3. Form-to-CRM wiring",
        problem: "Form emails a shared inbox; no task owner",
        change: "Instant CRM record + mobile notify + auto-reply",
        metric: "Speed-to-lead",
        tool: "HubSpot, GoHighLevel, or custom API route",
      },
      {
        fix: "4. Trust beside CTA",
        problem: "No proof at decision moment",
        change: "Reviews, response-time promise, or guarantee next to button",
        metric: "Form completion rate",
        tool: "Testimonial component + schema",
      },
      {
        fix: "5. Weekly funnel review",
        problem: "No one owns conversion metrics",
        change: "Review sessions, form starts, and submissions weekly",
        metric: "Session-to-lead rate",
        tool: "GA4 + CRM pipeline report",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The Conversion System Checklist",
      },
      {
        type: "p",
        text: "Underperforming sites fail in three predictable places: too many actions, too slow on mobile, and no backend to catch submissions. The Conversion System Checklist scores each layer before anyone talks about fonts or photography. We run this on every [AI lead gen site](/services/ai-lead-site) engagement because design refreshes without system wiring produce beautiful leaks.",
      },
      {
        type: "h2",
        text: "Single-action page templates",
      },
      {
        type: "p",
        text: "Service pages should drive book or call — not book, call, download a PDF, and read six case studies first. Blog posts can educate, but the conversion zone still needs one next step. Map templates in a spreadsheet: homepage, service, industry, contact. If any row lists more than one equal-weight CTA, you found the leak.",
      },
      {
        type: "h2",
        text: "Speed on the URL ads actually send",
      },
      {
        type: "p",
        text: "Owners optimize the homepage while Google Ads sends traffic to a service page that loads in five seconds on LTE. Run PageSpeed on every paid landing URL. Target LCP under 2.5 seconds on mobile. [Next.js on Vercel](/migrations/webflow-to-nextjs-sanity) is how we hit those numbers for [professional services](/industries/professional-services) without sacrificing editor control.",
      },
      {
        type: "p",
        text: "Sites we rebuild around a single conversion path average thirty-one percent higher form completion within sixty days — not because the copy got cleverer, but because there is one obvious action and the page loads before patience runs out.",
      },
      {
        type: "quote",
        text: "Persuasion without capture is entertainment. Capture without speed is a postcard.",
      },
      {
        type: "h2",
        text: "Wire the back end before the redesign",
      },
      {
        type: "p",
        text: "Connect every form, click-to-call event, and chat widget to [CRM automation](/services/crm-pipeline-automation). The moment someone submits, a human should get a mobile alert and the prospect should receive an immediate acknowledgment. Seconds matter in competitive local and B2B markets. Build the system, then iterate creative — not the reverse.",
      },
      {
        type: "h2",
        text: "Trust signals at the decision moment",
      },
      {
        type: "p",
        text: "Place reviews, client logos, or response-time promises beside the primary CTA — not only on a separate testimonials page. Visitors decide at the button; proof there reduces hesitation on cold traffic. Schema markup for reviews helps search; visual proof helps humans who arrived from ads.",
      },
      {
        type: "h2",
        text: "Diagnose by traffic source",
      },
      {
        type: "p",
        text: "Segment conversion rate by channel in analytics. Organic visitors may tolerate slower pages; paid social will not. If Google Ads converts at half the rate of email, inspect the landing URL — headline mismatch, slow LCP, or five competing CTAs. Fix the worst channel first instead of averaging metrics into a meaningless sitewide rate.",
      },
      {
        type: "ul",
        items: [
          "Run heatmaps on top three paid landing pages.",
          "Compare mobile vs desktop form completion.",
          "Verify click-to-call fires events in GA4.",
          "Check CRM for leads with no owner assigned.",
        ],
      },
      {
        type: "h2",
        text: "Copy and offer clarity",
      },
      {
        type: "p",
        text: "Even perfect systems fail when the offer is vague. State who you serve, what outcome you deliver, and what happens after someone clicks — in plain language above the fold. Service businesses hide behind jargon; buyers bounce to the competitor who names the problem directly. Rewrite headlines for clarity before debating button color.",
      },
      {
        type: "p",
        text: "Run five-second tests with someone outside your company: show the homepage and ask what you sell and what they should do next. Wrong answers mean conversion problems precede design refresh. Pair copy fixes with [SEO and AEO structure](/services/seo-aeo-content) so organic and paid traffic see the same clear story.",
      },
      {
        type: "h2",
        text: "Mobile-first conversion review",
      },
      {
        type: "p",
        text: "Most B2B and local service traffic is mobile during commutes and lunch breaks. Test forms with autofill, tap-to-call visibility, and sticky CTA bars. If the phone number is only in the footer, you lose high-intent callers from ads. Sticky call and book buttons on service templates often lift calls twenty percent without new copy.",
      },
      {
        type: "h2",
        text: "Post-launch measurement cadence",
      },
      {
        type: "p",
        text: "Weekly: sessions, form starts, submissions, speed-to-lead. Monthly: compare by channel and landing URL. Quarterly: replay the five-second test and PageSpeed on ad URLs. Conversion is a maintenance discipline — sites do not fail once; they drift until nobody owns the metric.",
      },
      {
        type: "h2",
        text: "Fix order for underperforming sites",
      },
      {
        type: "p",
        text: "First wire CRM and auto-reply. Second cut mobile LCP on ad URLs. Third collapse to one CTA per template. Fourth refresh offer clarity. Redesign visuals last. That order protects cash flow while you improve — most owners do the opposite and wonder why the new homepage did not pay back.",
      },
      {
        type: "p",
        text: "Record baseline conversion before changes. A single-action homepage that lifts form rate from 1.2% to 2.1% on the same traffic pays for CRM wiring many times over. Without baseline, teams argue about design taste instead of measured lift.",
      },
      {
        type: "h2",
        text: "Proof beside the primary CTA",
      },
      {
        type: "p",
        text: "Move case study stats, review counts, and certification badges adjacent to the main button — not buried on a separate testimonials page. Service buyers decide in seconds; proof at the decision point beats a beautiful brand story three scrolls down. ZedNova rebuilds typically lift form submissions eighteen to twenty-eight percent from layout and proof placement alone before new traffic arrives.",
      },
      {
        type: "p",
        text: "Pair every service page with one proof line above the fold — years in business, jobs completed, or average response time — so paid and organic visitors trust you before they read paragraphs. Trust signals are conversion copy, not footer decoration.",
      },
    ],
  },

  "when-to-rebuild-vs-migrate": {
    takeaways: [
      "If you would not send this year's ad budget to the homepage, treat the project as a rebuild — not a migration.",
      "Migration preserves SEO equity when redirect maps and content models are planned before launch.",
      "Scope integrations (CRM, booking, analytics) in week one — they decide timeline more than page count.",
    ],
    faqs: [
      {
        id: "faq-migration-timeline",
        question: "How long does a Webflow to Next.js migration take?",
        answer:
          "Typical marketing sites with structured content land in six to ten weeks including content modeling, redirect QA, and editor training. Rebuilds with new positioning add four to eight weeks for copy and funnel architecture. Integration complexity matters more than page count.",
      },
      {
        id: "faq-migration-seo-risk",
        question: "Will migrating hurt my SEO rankings?",
        answer:
          "Not if redirects are one-to-one, Core Web Vitals improve, and content parity is verified before cutover. Risk spikes when URLs change without maps, schema drops, or editors publish duplicate slugs. We run pre-launch crawl diff checks on every migration.",
      },
      {
        id: "faq-partial-migration",
        question: "Can I migrate part of the site and rebuild the rest?",
        answer:
          "Yes — common pattern: migrate insights, services, and industries to Sanity while rebuilding homepage and pricing for new positioning. Phase launches reduce risk and let marketing keep publishing during the transition.",
      },
    ],
    implementationTable: [
      {
        fix: "1. Homepage ad test",
        problem: "Unclear if current site supports paid scale",
        change: "Score 1–5: would you send ad traffic here today?",
        metric: "Qualitative go/no-go",
        tool: "Stakeholder workshop",
      },
      {
        fix: "2. CMS friction audit",
        problem: "Marketing blocked on developer tickets",
        change: "List last ten publish delays; count dev-dependent edits",
        metric: "Editor self-serve rate",
        tool: "Sanity Studio vs current CMS",
      },
      {
        fix: "3. Platform pain inventory",
        problem: "Plugin conflicts or Webflow CMS limits",
        change: "Document speed, security, and integration blockers",
        metric: "Time-to-publish",
        tool: "Webflow / WordPress audit",
      },
      {
        fix: "4. Redirect plan",
        problem: "URL changes without mapping",
        change: "One-to-one 301 map before launch",
        metric: "Post-launch 404 rate",
        tool: "Screaming Frog + staging crawl",
      },
      {
        fix: "5. Integration scope",
        problem: "CRM, booking, analytics discovered late",
        change: "Integration list in week-one scope doc",
        metric: "Launch on-time",
        tool: "HubSpot, Cal.com, GA4, GTM",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The Rebuild vs Migrate Scorecard",
      },
      {
        type: "p",
        text: "Teams debate platforms for months when the decision is operational: does the current site still match how you sell, and does the CMS let marketing move at campaign speed? The Rebuild vs Migrate Scorecard weights five signals — ad-readiness, CMS friction, platform pain, SEO risk, and integration load. Score each 1–5. Totals below 18 suggest migration; below 12 suggest rebuild. We use this on every [Webflow to Next.js + Sanity](/migrations/webflow-to-nextjs-sanity) and [WordPress migration](/migrations/wordpress-to-nextjs-sanity) scoping call.",
      },
      {
        type: "h2",
        text: "When migration wins",
      },
      {
        type: "p",
        text: "Migrate when positioning is stable, URLs can map cleanly, and the pain is tooling — not strategy. You keep SEO equity, move editors into Sanity, and gain performance headroom on Next.js. Marketing teams on migrated stacks typically publish forty-eight percent faster because they are not waiting on Webflow CMS limits or WordPress plugin conflicts.",
      },
      {
        type: "h2",
        text: "When rebuild wins",
      },
      {
        type: "ul",
        items: [
          "Homepage fails the ad-budget test — you would not send paid traffic there.",
          "No single conversion path across service pages.",
          "Positioning shifted but copy still describes the old offer.",
          "Integrations require custom software, not just a marketing site.",
        ],
      },
      {
        type: "p",
        text: "Rebuilds cost more but fix funnel and copy together. Pair with an [AI-cited content architecture](/services/ai-lead-site) so the new site earns citations from day one — not just ranks after a six-month lag.",
      },
      {
        type: "quote",
        text: "Migration moves the furniture. Rebuild changes the floor plan. Know which problem you have.",
      },
      {
        type: "h2",
        text: "De-risk the cutover",
      },
      {
        type: "p",
        text: "Run staging crawls, verify schema on templates, and train editors on Sanity before DNS flips. Phase launches — insights and services first, homepage last — when rebuild and migration overlap. Document every integration webhook before developers start; CRM and booking surprises cause more delays than page builds.",
      },
      {
        type: "h2",
        text: "Cost and timeline expectations",
      },
      {
        type: "p",
        text: "Migrations for marketing sites with structured content typically land in six to ten weeks including redirect QA and editor training. Rebuilds with new positioning add four to eight weeks for copy and funnel architecture. Page count matters less than integration count — a twenty-page site with HubSpot, Cal.com, and custom calculators behaves like a fifty-page site in scoping.",
      },
      {
        type: "h2",
        text: "Stakeholder alignment workshop",
      },
      {
        type: "ul",
        items: [
          "List every page that must convert and its primary action.",
          "Score ad-readiness of homepage and top service URLs.",
          "Document CMS pain from marketing in the last ninety days.",
          "Confirm SEO constraints: URLs that must not change, rankings to protect.",
          "Agree on success metrics ninety days post-launch — not just go-live date.",
        ],
      },
      {
        type: "p",
        text: "Bring sales into the workshop. Marketing often scopes a migration while sales still sends proposals linking to legacy URLs or PDFs outside the CMS. Alignment prevents launching a fast site that nobody uses in the revenue workflow.",
      },
      {
        type: "h2",
        text: "Framer, WordPress, and Webflow compared",
      },
      {
        type: "p",
        text: "WordPress migrations usually target plugin security and speed. Webflow migrations target CMS limits and integration flexibility. Framer migrations target teams outgrowing animated marketing sites that need structured content and CRM wiring. The destination is often the same — Next.js and Sanity — but the content audit differs. WordPress requires plugin inventory; Webflow requires collection mapping; Framer requires separating motion-heavy pages from templates that should become reusable modules.",
      },
      {
        type: "p",
        text: "Pick the migration guide that matches your source stack on our [migrations hub](/migrations/webflow-to-nextjs-sanity) and score your project against the same five signals. Platform religion wastes budget; operational fit saves it.",
      },
      {
        type: "h2",
        text: "Budgeting migration vs rebuild",
      },
      {
        type: "p",
        text: "Request two scopes in the same proposal: migration preserving URLs and content models, and rebuild with new funnel architecture. Compare timeline, risk, and ninety-day KPIs — not just launch cost. Rebuilds that fix positioning often pay back faster on paid ads even when migration looks cheaper on paper.",
      },
      {
        type: "p",
        text: "Reserve fifteen percent of budget for redirect QA, editor training, and post-launch analytics verification. Cut there and you will spend it anyway on emergency SEO fixes.",
      },
      {
        type: "p",
        text: "Set a ninety-day post-launch review: Core Web Vitals, organic traffic to migrated URLs, form conversion, and editor publish count. Success is operational metrics, not just a prettier homepage on launch day.",
      },
      {
        type: "p",
        text: "Involve finance in the migration vs rebuild comparison. Hidden costs — plugin licenses, Webflow seats, contractor hours for workarounds — belong in the same spreadsheet as agency build quotes. Decisions get clearer when TCO is honest.",
      },
      {
        type: "h2",
        text: "Platform migration SEO checklist",
      },
      {
        type: "p",
        text: "Before launch, export every indexed URL, map 301 redirects, preserve title and H1 intent, and submit the new sitemap. ZedNova migration clients typically retain ninety-five percent or more of organic traffic within sixty days when redirect QA is treated as a launch gate — not a post-launch cleanup task.",
      },
      {
        type: "p",
        text: "Document stakeholder sign-off on redirect maps before DNS cutover. One missing 301 on a high-traffic service page costs more than a week of agency time to recover in Search Console.",
      },
      {
        type: "p",
        text: "If your team debates rebuild vs migrate for more than two meetings, run the four-question checklist in this article with a timer. Clarity usually arrives in twenty minutes when you ask whether you would send ad spend to today's homepage.",
      },
    ],
  },

  "shopify-conversion-fixes-that-actually-move-revenue": {
    takeaways: [
      "Segment Klaviyo flows by first-time vs returning buyers — messaging should differ.",
      "Track revenue per session by traffic source before increasing Meta or TikTok spend.",
      "Run weekly SKU-level reports on the five products that receive the most ad spend.",
    ],
    faqs: [
      {
        id: "faq-shopify-mobile-checkout",
        question: "How do I improve Shopify mobile checkout conversion?",
        answer:
          "Enable guest checkout, show shipping thresholds early, reduce form fields, and test Shop Pay where available. Mobile checkout drop-off often comes from surprise costs and account walls — not from lack of traffic.",
      },
      {
        id: "faq-shopify-klaviyo-setup",
        question: "Which Klaviyo flows should I launch first?",
        answer:
          "Cart abandonment, browse abandonment, and post-purchase thank-you with review request. Add win-back at ninety days after that. These four flows recover revenue from traffic you already paid for.",
      },
      {
        id: "faq-shopify-aov",
        question: "What is the fastest way to increase Shopify AOV?",
        answer:
          "Post-purchase one-click upsells, bundles on hero SKUs, and free-shipping thresholds just above current AOV. Test on your top five SKUs by spend before rolling site-wide.",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The Shopify Revenue Recovery Loop",
      },
      {
        type: "p",
        text: "Product page fixes capture intent; recovery loops monetize intent that slipped away. The Shopify Revenue Recovery Loop connects browse abandonment, cart series, post-purchase upsells, and win-back into one measured system. Most stores optimize the top of funnel while leaving thirty to fifty percent of recoverable revenue in default Shopify email settings. We wire this loop on every [ecommerce engagement](/industries/ecommerce-dtc) before touching creative or media mix.",
      },
      {
        type: "h2",
        text: "Close the loop across the funnel",
      },
      {
        type: "ul",
        items: [
          "Browse abandonment within 24 hours for high-intent collection viewers.",
          "Cart series at 1h, 24h, and 72h with dynamic product blocks.",
          "Post-purchase upsell limited to one relevant SKU — not a catalog dump.",
          "Win-back at 60–90 days for one-time buyers with replenishment potential.",
        ],
      },
      {
        type: "p",
        text: "ZedNova Shopify clients see eighteen to thirty-five percent checkout lift within the first sixty days after product page clarity, checkout simplification, and Klaviyo recovery flows ship together — without increasing ad spend. The lift comes from converting and recovering traffic already on site.",
      },
      {
        type: "h2",
        text: "Measure before you scale ads",
      },
      {
        type: "p",
        text: "Report add-to-cart rate, checkout completion, and revenue per session weekly by source. If Meta traffic converts at half the rate of email, the problem is landing experience — not audience. Pair Shopify Analytics with server-side tracking via Elevar or Stape before budget increases. [SEO and collection content](/services/seo-aeo-content) compounds when the store converts what it earns.",
      },
      {
        type: "quote",
        text: "Recovery revenue is the honest scorecard. It tells you how much intent your store wasted last week.",
      },
      {
        type: "h2",
        text: "Headless when the theme caps growth",
      },
      {
        type: "p",
        text: "When app bloat, template limits, or international expansion block speed tests, a [headless Shopify migration](/migrations/shopify-to-headless-shopify) preserves checkout while unlocking performance on product storytelling pages. That path is for stores already maxing the seven fixes — not for stores that have not enabled guest checkout yet.",
      },
      {
        type: "h2",
        text: "Creative and offer testing order",
      },
      {
        type: "p",
        text: "Do not A/B test button colors while checkout forces account creation. Fix structural leaks first — clarity, proof, speed, recovery — then test hero creative and offer framing. Stores that skip the sequence burn test budget on traffic that never had a fair chance to convert.",
      },
      {
        type: "h2",
        text: "Weekly Shopify operator dashboard",
      },
      {
        type: "ul",
        items: [
          "Add-to-cart rate on top five SKUs by ad spend.",
          "Checkout completion rate overall and on mobile.",
          "Recovered revenue from Klaviyo browse and cart flows.",
          "Post-purchase flow revenue and review submission rate.",
          "Revenue per session by source in Shopify Analytics.",
        ],
      },
      {
        type: "p",
        text: "Share the dashboard with whoever owns media spend. When checkout completion drops while sessions rise, the answer is almost never more audience — it is funnel repair. [Reporting dashboards](/services/custom-in-house-software-for-smbs) help when Shopify, Klaviyo, and ad data live in separate tabs.",
      },
      {
        type: "h2",
        text: "International and catalog complexity",
      },
      {
        type: "p",
        text: "Stores expanding SKUs or markets hit theme limits faster — multi-currency display, complex bundles, and localized landing pages stress default Shopify templates. Headless or hybrid approaches become rational when the seven fixes are done but merchandising still cannot move at campaign speed. Fix baseline conversion before adding architectural complexity.",
      },
      {
        type: "h2",
        text: "Retention ties to conversion",
      },
      {
        type: "p",
        text: "Post-purchase experience drives repeat rate — which lowers blended CAC on paid campaigns. Review request timing, replenishment reminders, and win-back windows alongside acquisition metrics. A store that converts cold traffic but never emails buyers leaves the cheapest revenue on the table.",
      },
      {
        type: "p",
        text: "Seasonal peaks expose funnel weak points — Black Friday traffic magnifies slow mobile PDPs and broken cart flows. Fix baseline conversion in quiet months so peak spend is not donating margin to cart abandonment.",
      },
    ],
  },

  "crm-automation-for-clinics-without-extra-hires": {
    takeaways: [
      "Send intake links in the booking confirmation — not at check-in when the waiting room is busy.",
      "Tag every booking with source (Google, referral, recall) so marketing spend maps to chairs filled.",
      "Review no-show rate every Monday; it is the fastest signal that reminders need tuning.",
    ],
    faqs: [
      {
        id: "faq-clinic-no-shows",
        question: "How much can SMS reminders reduce clinic no-shows?",
        answer:
          "Clinics typically see fifteen to thirty percent reduction when reminders fire at 48h and 2h before appointment with easy confirm/reschedule links. No-shows are a scheduling systems problem — not a staffing problem.",
      },
      {
        id: "faq-clinic-hipaa-crm",
        question: "Is CRM automation HIPAA-compliant for clinics?",
        answer:
          "It can be when you use HIPAA-eligible tools, sign BAAs where required, and avoid putting clinical details in marketing SMS. We scope PHI boundaries in week one and separate clinical records from marketing automation.",
      },
      {
        id: "faq-clinic-ai-receptionist",
        question: "When should a clinic add an AI receptionist?",
        answer:
          "When overflow calls hit voicemail during patient hours or after-hours inquiries book with competitors. AI handles intake, routing, and booking links; staff handle complex clinical conversations.",
      },
      {
        id: "faq-clinic-recall-automation",
        question: "How do clinics automate patient recall?",
        answer:
          "Trigger SMS or email sequences based on last visit date and service type in your CRM. Hygiene recall every six months and treatment plan follow-ups should not depend on front-desk memory. ZedNova clinic clients fill twelve to twenty percent more hygiene slots within ninety days of recall automation.",
      },
      {
        id: "faq-clinic-gohighlevel-hubspot",
        question: "Should clinics use GoHighLevel or HubSpot?",
        answer:
          "GoHighLevel when SMS, calendars, and missed-call text-back are day-one priorities. HubSpot when you need deeper marketing attribution and B2B-style nurture. Most single-location clinics start with GoHighLevel; multi-location groups often graduate to HubSpot for reporting.",
      },
    ],
    implementationTable: [
      {
        fix: "1. Online booking",
        problem: "Phone-only scheduling; hold times lose inquiries",
        change: "Self-serve booking from site, Google, and recall emails",
        metric: "Online booking rate",
        tool: "Cal.com, HubSpot meetings, or Jane/Cliniko API",
      },
      {
        fix: "2. Digital intake",
        problem: "Paper forms at check-in slow room turnover",
        change: "Intake link in confirmation; data syncs to CRM",
        metric: "Pre-visit form completion",
        tool: "Typeform + CRM or native EHR bridge",
      },
      {
        fix: "3. SMS reminders",
        problem: "No-shows above 10–15%",
        change: "48h + 2h reminders with confirm/reschedule",
        metric: "No-show rate",
        tool: "GoHighLevel, HubSpot SMS, or Twilio",
      },
      {
        fix: "4. Recall sequences",
        problem: "Hygiene and follow-up not booked before patient leaves",
        change: "Automated recall at 6–12 month intervals",
        metric: "Recall conversion rate",
        tool: "CRM workflows",
      },
      {
        fix: "5. Post-visit reviews",
        problem: "Reviews depend on staff remembering to ask",
        change: "SMS review request 24h after visit",
        metric: "New Google reviews / month",
        tool: "Podium, Birdeye, or GHL",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The Clinic Intake Automation Stack",
      },
      {
        type: "p",
        text: "Front-desk teams cannot scale linearly with marketing spend. The Clinic Intake Automation Stack wires booking, intake, reminders, recall, and reviews so inquiries never wait for a free moment between patients. We deploy this on [healthcare and wellness](/industries/healthcare-wellness) engagements with [CRM pipeline automation](/services/crm-pipeline-automation) at the center — not another disconnected app.",
      },
      {
        type: "h2",
        text: "Booking that writes to the CRM",
      },
      {
        type: "p",
        text: "Self-serve scheduling should capture service type, location, insurance flags, and marketing source before anyone calls back. Google Business Profile booking links and site widgets must land in the same pipeline. When staff open a record, they see context — not a blank name and phone number.",
      },
      {
        type: "h2",
        text: "Intake before the waiting room",
      },
      {
        type: "p",
        text: "Send secure intake links in the confirmation email. Data should populate the CRM and, where integrated, prep the clinical record. Patients who complete forms at home reduce check-in time and errors. Staff focus on care, not clipboard chasing.",
      },
      {
        type: "p",
        text: "Clinics we automate typically cut no-shows twenty-two percent within sixty days after SMS reminders and online rescheduling go live — equivalent to adding chair time without extending hours.",
      },
      {
        type: "quote",
        text: "Every voicemail during patient hours is a new patient booking with the practice that picked up.",
      },
      {
        type: "h2",
        text: "Overflow without another hire",
      },
      {
        type: "p",
        text: "Pair automation with an [AI receptionist](/services/ai-receptionist) for after-hours and peak overflow. Missed-call text-back captures the caller who would not leave voicemail. Measure booking rate, no-show rate, and median response time weekly — those three metrics tell you if the stack is working.",
      },
      {
        type: "h2",
        text: "Multi-location routing",
      },
      {
        type: "p",
        text: "Clinics with more than one location need source tagging and routing rules in the CRM — not a single shared inbox. Booking widgets should geolocate or ask location first so leads land with the correct calendar and staff notification. Marketing reports by location; operations sees the same pipeline.",
      },
      {
        type: "h2",
        text: "Marketing and front desk alignment",
      },
      {
        type: "p",
        text: "Run a thirty-minute monthly review: ad spend by location, booking rate by source, no-show trend, review velocity. When marketing scales campaigns but booking rate flatlines, the leak is intake — not creative. Automation makes that visible instead of hiding it in voicemail.",
      },
      {
        type: "ul",
        items: [
          "Confirm every ad landing page has booking or call CTA above fold.",
          "Verify intake links send before appointment, not day-of.",
          "Audit SMS opt-in language for compliance.",
          "Track median speed-to-first-touch on new patient inquiries.",
        ],
      },
      {
        type: "h2",
        text: "Staff adoption and change management",
      },
      {
        type: "p",
        text: "Front desk teams resist tools that feel like surveillance. Frame automation as fewer voicemails to return, not big-brother metrics. Train on CRM views in thirty minutes: where bookings appear, how SMS threads show, when to escalate to clinical staff. Adoption determines ROI more than vendor selection.",
      },
      {
        type: "p",
        text: "Start with reminders and online booking before AI phone — quick wins build trust. Expand to [review automation](/services/review-reputation) and overflow reception once the basics hold for thirty days without workaround spreadsheets.",
      },
      {
        type: "h2",
        text: "Dental, med spa, and PT nuances",
      },
      {
        type: "p",
        text: "Dental practices lean on hygiene recall and insurance FAQ; med spas on consultation booking and package upsells; physical therapy on referral intake and authorization flags. The automation stack is the same — booking, intake, reminders, reviews — but sequence timing and SMS copy differ. Map patient journeys before configuring workflows.",
      },
      {
        type: "p",
        text: "Integrate with practice management when API access exists; otherwise treat CRM as marketing and scheduling source of truth with nightly exports. Perfect integration is rare; reliable reminders and capture are not optional.",
      },
      {
        type: "p",
        text: "Benchmark no-show rate against ten to fifteen percent industry norms. If you are above that after reminders, test message timing, offer easy reschedule links, and confirm numbers are SMS-capable. Small copy changes often beat new software.",
      },
      {
        type: "h2",
        text: "Compliance and patient communication",
      },
      {
        type: "p",
        text: "Use HIPAA-eligible SMS and CRM vendors when messages might include appointment details tied to identifiable patients. Marketing broadcasts differ from clinical communication — keep them separate. Document opt-in at booking and offer clear opt-out on reminders. Compliance is not a reason to skip automation; it is a reason to configure templates and vendors correctly the first time.",
      },
      {
        type: "p",
        text: "Review message templates with counsel once, then let marketing iterate timing and tone within approved bounds. Consistent, compliant reminders beat ad hoc front-desk texts that vary by whoever is at the desk.",
      },
      {
        type: "h2",
        text: "Staff adoption without resistance",
      },
      {
        type: "p",
        text: "Train front desk on the CRM inbox in thirty-minute sessions — show how automation reduces phone tag, not how it replaces jobs. When staff see fewer angry callback voicemails, adoption sticks. ZedNova clinic rollouts target live automation within three weeks because we wire booking and reminders before advanced AI features.",
      },
      {
        type: "p",
        text: "Publish a one-page playbook: who owns the CRM inbox, response SLAs, and escalation to clinical staff. Automation fails when ownership is ambiguous — not when software is missing features.",
      },
      {
        type: "p",
        text: "Re-measure no-show and response metrics thirty and sixty days after go-live. Clinics that hold gains through two review cycles rarely revert to manual-only scheduling — the ROI becomes obvious to clinical and front-desk leads alike.",
      },
      {
        type: "p",
        text: "Start with one location and one service line before rolling automation to every chair — prove the workflow, then expand templates.",
      },
    ],
  },

  "sanity-cms-for-marketing-teams-who-hate-developer-tickets": {
    takeaways: [
      "Define required SEO and AEO fields in Studio — optional fields become optional forever.",
      "Use references for related services and migrations instead of pasted URLs that rot.",
      "Train editors on preview URLs in week one; adoption fails when publish feels scary.",
    ],
    faqs: [
      {
        id: "faq-sanity-training",
        question: "How long does it take marketing teams to adopt Sanity?",
        answer:
          "Most teams publish independently within two weeks when Studio is scoped to their collections, preview works on day one, and required fields prevent SEO mistakes. Without preview and guardrails, adoption drags for months.",
      },
      {
        id: "faq-sanity-vs-contentful",
        question: "Why Sanity over Contentful for marketing sites?",
        answer:
          "Sanity Studio is highly customizable for editorial workflows, real-time preview with Next.js is mature, and portable text handles structured AEO blocks well. Contentful excels at multi-brand enterprise — Sanity wins for fast marketing teams on Next.js.",
      },
      {
        id: "faq-sanity-governance",
        question: "How do I prevent editors from breaking SEO in Sanity?",
        answer:
          "Required seoTitle, seoDescription, direct answer blocks, and FAQ arrays with validation rules. Hide dangerous layout fields; expose copy, references, and media. Governance beats documentation.",
      },
      {
        id: "faq-sanity-migration-from-webflow",
        question: "Can we migrate from Webflow CMS to Sanity without losing content?",
        answer:
          "Yes. Export Webflow collections, map fields to Sanity schemas, and rebuild templates in Next.js. Most marketing sites migrate in six to ten weeks with redirect maps preserving SEO. Editors gain structured collections instead of page-by-page duplication.",
      },
      {
        id: "faq-sanity-roi",
        question: "What ROI should marketing expect from Sanity?",
        answer:
          "Measure developer tickets for copy changes before and after. Teams that cut ticket volume fifty percent or more while increasing publish frequency usually recoup Sanity setup within two quarters — especially when paid campaigns need fresh landing pages weekly.",
      },
    ],
    implementationTable: [
      {
        fix: "1. Collection modeling",
        problem: "One-off pages duplicate copy across the site",
        change: "Services, industries, insights as typed collections",
        metric: "Duplicate content incidents",
        tool: "Sanity schema",
      },
      {
        fix: "2. Copy vs layout split",
        problem: "Editors request dev for headline changes",
        change: "React owns layout; Studio owns words and SEO fields",
        metric: "Dev tickets for copy",
        tool: "Next.js + Sanity Studio",
      },
      {
        fix: "3. Preview URLs",
        problem: "Publish fear; staging mismatches",
        change: "Draft preview on production templates",
        metric: "Time from draft to publish",
        tool: "Sanity preview API + Vercel",
      },
      {
        fix: "4. AEO field groups",
        problem: "FAQ and answer blocks skipped on publish",
        change: "Required quickAnswer + FAQ arrays on insights",
        metric: "Pages with complete AEO fields",
        tool: "Sanity validation rules",
      },
      {
        fix: "5. Reference integrity",
        problem: "Broken internal links after URL changes",
        change: "Reference fields for services, migrations, related posts",
        metric: "Internal 404 rate",
        tool: "Sanity references + GROQ",
      },
    ],
    body: [
      {
        type: "h2",
        text: "The Sanity Editorial Velocity Model",
      },
      {
        type: "p",
        text: "Marketing teams do not hate CMS tools — they hate waiting on developers for copy changes. The Sanity Editorial Velocity Model separates what editors own (words, SEO, references, media) from what engineering owns (layout, performance, integrations). We implement this on every [Webflow to Next.js + Sanity migration](/migrations/webflow-to-nextjs-sanity) so campaigns ship at the speed of the calendar, not the sprint board.",
      },
      {
        type: "h2",
        text: "Model content for reuse, not pages",
      },
      {
        type: "p",
        text: "Services, industries, migrations, and insights are collections — not duplicate Webflow pages. One service update propagates to nav, listing grids, and related modules. Editors publish once; GROQ queries assemble pages. That is how [AI-ready marketing sites](/services/ai-lead-site) stay consistent when AEO fields are required on every insight.",
      },
      {
        type: "h2",
        text: "Preview as the adoption lever",
      },
      {
        type: "ul",
        items: [
          "Wire preview URLs before inviting editors into Studio.",
          "Show mobile and desktop breakpoints in review links.",
          "Restrict layout-breaking fields; expose structured copy blocks.",
          "Document a ten-minute publish ritual — draft, preview, publish.",
        ],
      },
      {
        type: "p",
        text: "Marketing teams on Sanity stacks we deploy publish roughly three times faster than their prior Webflow or WordPress workflow — measured from draft start to live URL — because preview removes the staging guesswork that used to require a developer deploy.",
      },
      {
        type: "quote",
        text: "The best CMS is the one your marketing team uses without asking permission.",
      },
      {
        type: "h2",
        text: "Governance that speeds teams up",
      },
      {
        type: "p",
        text: "Required SEO titles, direct answer blocks, and FAQ arrays feel restrictive but prevent the drift that kills search performance. Reference fields for related [services](/services/seo-aeo-content) and [migrations](/migrations/webflow-cms-to-sanity) stop broken links when slugs change. Train editors in week one; adoption dies when preview is broken and every publish feels like a gamble.",
      },
      {
        type: "h2",
        text: "Roles: who owns what in Studio",
      },
      {
        type: "p",
        text: "Marketing editors own copy, SEO fields, FAQs, and references. Developers own schema changes, new block types, and performance. Splitting ownership prevents editors from breaking layout and prevents developers from becoming copywriters. Document the boundary in a one-page Studio guide with screenshots — not a forty-page manual nobody reads.",
      },
      {
        type: "h2",
        text: "When to migrate CMS only",
      },
      {
        type: "p",
        text: "Some teams keep the visual front end temporarily while moving content to Sanity — uncommon, but useful when campaign calendar cannot pause. Most service firms migrate front end and CMS together on Next.js so preview and performance stay aligned. Evaluate [Webflow CMS to Sanity](/migrations/webflow-cms-to-sanity) when Designer pages are fine but collections are the bottleneck.",
      },
      {
        type: "ul",
        items: [
          "Inventory duplicate pages that should become one collection entry.",
          "List fields marketing needs on every insight (AEO, OG, related links).",
          "Schedule editor training before launch week — not after.",
          "Define rollback plan if DNS cutover hits unexpected 404s.",
        ],
      },
      {
        type: "h2",
        text: "Portable text and structured blocks",
      },
      {
        type: "p",
        text: "Portable text lets you define block types — callouts, quotes, implementation tables, inline FAQs — that render consistently on Next.js. Editors assemble articles from approved blocks instead of pasting Word docs that break layout. New block types require developer time once; every publish after that is self-serve.",
      },
      {
        type: "p",
        text: "That pattern powers both marketing velocity and AEO consistency: every insight uses the same quickAnswer module, the same FAQ schema wiring, the same related-links picker. Webflow rich text cannot enforce that discipline at scale.",
      },
      {
        type: "h2",
        text: "Measuring editorial velocity",
      },
      {
        type: "p",
        text: "Track median hours from draft to publish, count of developer tickets for copy, and pages published per month. Sanity wins when those metrics improve without SEO incidents. If publish speed rises but broken links or missing meta spike, tighten validation — not permissions.",
      },
      {
        type: "p",
        text: "Quarterly, audit one random service page and one insight for schema completeness, internal links, and preview accuracy. CMS success is quiet: marketing ships campaigns on schedule and search performance holds or improves.",
      },
      {
        type: "p",
        text: "Involve one senior editor in schema design workshops. When editors understand why AEO fields exist, they fill them. When fields appear mysteriously, they skip them. Adoption beats perfection.",
      },
      {
        type: "p",
        text: "Compare publish velocity before and after migration in the first ninety days. If tickets to dev drop but output stays flat, training — not tooling — is the blocker. Schedule office hours until editors trust preview.",
      },
      {
        type: "h2",
        text: "Sanity + AEO field architecture",
      },
      {
        type: "p",
        text: "Model quickAnswer, FAQ arrays, implementation tables, and relatedLinks as first-class fields — not optional sidebar notes. When editors publish a service or insight, schema and visible AEO blocks stay in sync. ZedNova Studio setups ship with required AEO groups so AI-ready pages are the default, not a special project.",
      },
      {
        type: "p",
        text: "Run a monthly content ops review: pages published, schema errors in Search Console, and broken internal links from reference fields. Sanity rewards teams that treat content like product — with owners, metrics, and iteration.",
      },
      {
        type: "p",
        text: "When marketing publishes without developer tickets for three consecutive sprints, redirect the saved budget toward insight articles and compare pages — that is where AEO compounding actually happens.",
      },
      {
        type: "p",
        text: "Treat Studio schema changes like API changes: version, document, and train editors now when new AEO fields ship — especially before campaign season.",
      },
    ],
  },
};

export function mergeInsightExpansion<
  T extends {
    slug: string;
    body: ArticleBlock[];
    faqs?: ArticleFaq[];
    takeaways?: string[];
    implementationTable?: ImplementationRow[];
    sources?: SourceReference[];
  },
>(post: T): T {
  const expansion = INSIGHT_POST_EXPANSIONS[post.slug];
  if (!expansion) return post;

  return {
    ...post,
    body: [...post.body, ...expansion.body],
    ...(expansion.faqs?.length
      ? { faqs: [...(post.faqs ?? []), ...expansion.faqs] }
      : {}),
    ...(expansion.takeaways?.length
      ? { takeaways: [...(post.takeaways ?? []), ...expansion.takeaways] }
      : {}),
    ...(expansion.implementationTable?.length
      ? {
          implementationTable: [
            ...(post.implementationTable ?? []),
            ...expansion.implementationTable,
          ],
        }
      : {}),
    ...(expansion.sources?.length
      ? { sources: [...(post.sources ?? []), ...expansion.sources] }
      : {}),
  };
}
