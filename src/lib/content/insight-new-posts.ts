import type { InsightOverride } from "./insight-overrides";

export const INSIGHT_NEW_POST_OVERRIDES: Record<string, InsightOverride> = {
  "next-js-vs-webflow-for-service-businesses": {
    quickAnswer: {
      question: "Should a service business use Next.js or Webflow?",
      shortAnswer:
        "Use Webflow when you need a marketing site live in weeks with no custom software and a small team that lives in the Designer. Choose Next.js with Sanity when you need CRM integrations, AI-ready content structure, performance headroom, or a CMS that lets marketing publish without developer tickets. Match the stack to how you sell — not to trends.",
    },
    takeaways: [
      "Webflow wins on speed-to-launch for brochure sites; Next.js wins when integrations and content scale matter.",
      "Service businesses that run paid ads need LCP under 2.5s on landing URLs — easier to sustain on Next.js.",
      "Sanity on Next.js lets marketing edit services and insights without opening developer tickets.",
      "Webflow CMS hits limits when content feeds multiple templates, locales, or custom logic.",
      "Migration cost is typically forty to sixty percent of a full rebuild when positioning is stable.",
      "If CRM, booking, and analytics webhooks are core to the site, plan Next.js from the start.",
      "The decision test: would you send this year's ad budget to the current homepage?",
    ],
    faqs: [
      {
        id: "faq-webflow-vs-nextjs-cost",
        question: "Is Next.js more expensive than Webflow for a service business?",
        answer:
          "Upfront build cost is higher for Next.js because it includes custom development, content modeling, and hosting setup. Total cost of ownership often favors Next.js when you factor developer tickets for every copy change, Webflow CMS limits, and integration workarounds. Webflow is cheaper to launch; Next.js is cheaper to scale.",
      },
      {
        id: "faq-webflow-when-enough",
        question: "When is Webflow enough for a service business?",
        answer:
          "When the site is primarily marketing pages, the team is small, integrations are light (form to email), and you do not need custom software features. Webflow is excellent for getting live fast with a polished design.",
      },
      {
        id: "faq-nextjs-service-benefits",
        question: "What does Next.js give service businesses that Webflow does not?",
        answer:
          "Custom API routes for CRM and booking, structured content in Sanity, server-side performance tuning, AI-ready schema and AEO fields, and freedom from Webflow CMS collection limits. You trade Designer simplicity for long-term flexibility.",
      },
      {
        id: "faq-migrate-webflow-timing",
        question: "When should I migrate from Webflow to Next.js?",
        answer:
          "Migrate when marketing is blocked on publish, you need multi-collection content, paid landing pages are slow on mobile, or integrations require workarounds. If positioning is stable, migration preserves SEO with a redirect map.",
      },
      {
        id: "faq-webflow-seo-vs-nextjs",
        question: "Does Next.js rank better than Webflow?",
        answer:
          "Google ranks pages, not stacks. Next.js makes it easier to hit Core Web Vitals, ship structured data, and publish AEO-ready content at scale — which indirectly helps rankings and AI citations. A slow Webflow site with thin content will lose to a fast structured Next.js site.",
      },
      {
        id: "faq-hybrid-approach",
        question: "Can I keep Webflow and add Next.js later?",
        answer:
          "Yes, but you pay migration cost later. Some teams run Webflow marketing while building Next.js for app features — workable short term, expensive long term. Plan the target architecture early if CRM and content ops are strategic.",
      },
    ],
    searchQuestions: [
      "Should a service business use Next.js or Webflow?",
      "When is Webflow enough for a service business?",
      "When should I migrate from Webflow to Next.js?",
      "Is Next.js more expensive than Webflow?",
    ],
    relatedLinks: [
      { href: "/migrations/webflow-to-nextjs-sanity", label: "Webflow to Next.js + Sanity" },
      { href: "/services/ai-lead-site", label: "AI-Cited Lead Gen Site" },
      { href: "/industries/professional-services", label: "Professional Services" },
      { href: "/insights/when-to-rebuild-vs-migrate", label: "When to Rebuild vs Migrate" },
    ],
    implementationTable: [
      {
        fix: "1. Ad landing speed test",
        problem: "Paid URLs load above 4s LCP on mobile",
        change: "Measure top five ad landing pages; target under 2.5s",
        metric: "LCP (mobile)",
        tool: "PageSpeed Insights",
      },
      {
        fix: "2. CMS friction audit",
        problem: "Marketing waits on dev for copy publishes",
        change: "Count dev-dependent edits in last 30 days",
        metric: "Self-serve publish rate",
        tool: "Webflow vs Sanity workflow review",
      },
      {
        fix: "3. Integration inventory",
        problem: "CRM, booking, analytics need custom workarounds",
        change: "List required webhooks and API routes",
        metric: "Integration reliability",
        tool: "HubSpot, Cal.com, GA4, GTM",
      },
      {
        fix: "4. Content model scope",
        problem: "Services duplicated across Webflow pages",
        change: "Model services, industries, insights as collections",
        metric: "Duplicate content risk",
        tool: "Sanity schema design",
      },
      {
        fix: "5. AEO readiness",
        problem: "No structured FAQ or answer blocks",
        change: "Required quickAnswer + FAQ fields on templates",
        metric: "Pages with complete AEO markup",
        tool: "Next.js JSON-LD + Sanity",
      },
      {
        fix: "6. Migration redirect map",
        problem: "URL changes without SEO plan",
        change: "One-to-one 301 map before cutover",
        metric: "Post-launch 404 rate",
        tool: "Screaming Frog crawl diff",
      },
    ],
    sources: [
      {
        title: "Core Web Vitals",
        url: "https://web.dev/articles/vitals",
        publisher: "Google web.dev",
        note: "Mobile LCP thresholds for landing page performance.",
      },
      {
        title: "Webflow — CMS collections limits",
        url: "https://webflow.com/feature/cms",
        publisher: "Webflow",
        note: "CMS structure constraints referenced in comparison.",
      },
      {
        title: "Next.js — App Router documentation",
        url: "https://nextjs.org/docs/app",
        publisher: "Vercel",
        note: "Performance and routing capabilities for service sites.",
      },
      {
        title: "Sanity — Structured content",
        url: "https://www.sanity.io/docs/content-modelling",
        publisher: "Sanity",
        note: "Content modeling for marketing teams.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Service businesses — agencies, consultancies, home services, clinics, and B2B firms — do not need the same stack as a SaaS product company. The question is simpler: can your team publish campaigns without waiting on developers, and does the site convert the traffic you already pay for? Webflow and Next.js both answer yes, but for different maturity stages and operational needs.",
      },
      {
        type: "h2",
        text: "Where Webflow still wins",
      },
      {
        type: "p",
        text: "Webflow is the fastest path from zero to credible marketing site. Designers work visually, hosting is included, and basic CMS collections handle team pages, case studies, and blog posts. For a ten-page service business with a contact form that emails the owner, Webflow gets you live in weeks with minimal engineering overhead. If nobody on the team will touch a Git repo and integrations stop at Zapier, Webflow is rational.",
      },
      {
        type: "ul",
        items: [
          "Launch timeline under six weeks with a polished visual design.",
          "Marketing team comfortable in the Designer for layout tweaks.",
          "Light integrations — forms, basic analytics, maybe a chat widget.",
          "No custom software, portals, or complex content relationships.",
        ],
      },
      {
        type: "h2",
        text: "Where Next.js wins for service businesses",
      },
      {
        type: "p",
        text: "Next.js with Sanity becomes the better default when the website is the front end of a revenue system — not a brochure. That means CRM records on every form submit, booking flows tied to pipelines, server-side performance tuning for paid landing pages, and content structured for SEO and AI citations. We ship this pattern on [AI-cited lead gen sites](/services/ai-lead-site) for [professional services firms](/industries/professional-services) that outgrow Webflow CMS limits.",
      },
      {
        type: "p",
        text: "Webflow CMS works until it does not: duplicate service copy across pages, no native preview for complex templates, collection caps, and integration gymnastics when HubSpot or GoHighLevel needs custom fields. Next.js API routes and Sanity references solve those problems without a plugin marketplace roulette.",
      },
      {
        type: "h2",
        text: "The performance argument is a conversion argument",
      },
      {
        type: "p",
        text: "Service businesses running Google Ads or Local Service Ads send traffic to specific landing URLs — not always the homepage. When those pages load in four or five seconds on mobile, you pay for clicks that bounce before the phone number renders. Next.js on Vercel with optimized images and static generation consistently hits LCP under 2.5 seconds on marketing templates. Webflow can be fast, but app bloat and heavy interactions often creep in as the site grows.",
      },
      {
        type: "p",
        text: "ZedNova migration clients from Webflow to Next.js + Sanity typically see forty to fifty-five percent improvement in mobile LCP on top landing pages within the first launch — and form completion rates climb when speed and single-action layouts ship together.",
      },
      {
        type: "h2",
        text: "Content operations: tickets vs self-serve",
      },
      {
        type: "p",
        text: "The hidden cost of Webflow for growing service firms is the developer ticket queue. Marketing wants a new service line, updated pricing, or an insight tied to three related services. In Webflow, that often means duplicating pages or fighting collection limits. In Sanity, services and insights are typed collections with references — update once, propagate everywhere. Editors preview on the real Next.js template before publish. That workflow is why teams choose [Webflow to Next.js migrations](/migrations/webflow-to-nextjs-sanity) even when the Webflow design still looks fine.",
      },
      {
        type: "h2",
        text: "Integration reality check",
      },
      {
        type: "ul",
        items: [
          "CRM: instant lead create, owner assignment, source tagging — usually needs API routes.",
          "Booking: Cal.com, HubSpot meetings, or clinic schedulers with webhook reliability.",
          "Analytics: server-side events, call tracking, and offline conversion imports.",
          "AEO: FAQ schema, direct answer blocks, llms.txt — easier with structured Sanity fields.",
        ],
      },
      {
        type: "p",
        text: "If three or more items on that list are non-negotiable this year, planning Next.js early avoids a second migration in eighteen months. Pair the stack with [CRM pipeline automation](/services/crm-pipeline-automation) so the site is not just fast — it is wired to revenue.",
      },
      {
        type: "h2",
        text: "Decision matrix",
      },
      {
        type: "ul",
        items: [
          "Choose Webflow if you need live in weeks, team lives in Designer, integrations are light.",
          "Choose Next.js if paid ads land on slow pages, CRM wiring is core, or content is multi-collection.",
          "Migrate — do not rebuild — if positioning is stable and URLs can map cleanly.",
          "Rebuild if homepage fails the ad-budget test or there is no single conversion path.",
        ],
      },
      {
        type: "quote",
        text: "Pick the stack that matches how you sell in twelve months — not the one that was easiest to launch twelve months ago.",
      },
      {
        type: "h2",
        text: "Migration path without losing SEO",
      },
      {
        type: "p",
        text: "Moving from Webflow to Next.js is not a redesign by default. Content models get mapped to Sanity, templates rebuilt in React, and 301 redirects verified before DNS cutover. Staging crawls compare old and new URL inventories. Editors train on Studio while developers finish templates. Phased launches — insights and services first, homepage last — reduce risk when paid campaigns run year-round. See the companion guide on [rebuild vs migrate](/insights/when-to-rebuild-vs-migrate) for scoring whether you need a full funnel rewrite or a platform swap.",
      },
      {
        type: "h2",
        text: "What to measure after you choose",
      },
      {
        type: "p",
        text: "Regardless of stack, track mobile LCP on ad landing URLs, form submission rate, speed-to-lead in CRM, and publish frequency per month. Webflow and Next.js both fail when nobody owns metrics. The stack change only pays off when marketing publishes faster and sales responds faster — measure both.",
      },
      {
        type: "h2",
        text: "Webflow pricing reality for growing firms",
      },
      {
        type: "p",
        text: "Webflow site plans, CMS item limits, and workspace seats accumulate as the team grows. Enterprise features appear when you need roles, staging, and localization. None of that is wrong — but compare three-year TCO against Next.js hosting on Vercel plus Sanity seats when developer tickets are already a line item. The break-even often arrives earlier than finance expects.",
      },
      {
        type: "h2",
        text: "Security and compliance considerations",
      },
      {
        type: "p",
        text: "Service businesses handling client data — legal, finance, healthcare — may need audit trails, SSO, or data residency that custom Next.js infrastructure supports more flexibly than no-code limits. Webflow works for public marketing; regulated client portals usually push teams toward custom code regardless of marketing CMS choice.",
      },
      {
        type: "h2",
        text: "Team skills and hiring impact",
      },
      {
        type: "ul",
        items: [
          "Webflow: hire designers who know Designer and CMS collections.",
          "Next.js: hire or partner for React development; marketers use Sanity Studio.",
          "Hybrid agencies often keep Webflow for landing experiments and Next.js for core site — watch for duplicate content and analytics fragmentation.",
          "Document who owns DNS, redirects, and form endpoints before either path goes live.",
        ],
      },
      {
        type: "p",
        text: "The stack decision is also a hiring decision. Choose the one your next twelve months of campaigns can operate without heroics.",
      },
      {
        type: "h2",
        text: "Sample architecture for service firms",
      },
      {
        type: "p",
        text: "A typical Next.js service site: Sanity collections for services, industries, insights, and team; Next.js App Router for templates; Vercel for hosting; HubSpot or GoHighLevel for CRM; Cal.com embedded for booking; GA4 and server events for attribution. Webflow equivalent: CMS collections, native forms to email or Zapier, Webflow hosting. The Next.js stack costs more to build once and less to operate when integrations and publish volume grow.",
      },
      {
        type: "h2",
        text: "When to revisit the decision",
      },
      {
        type: "p",
        text: "Reevaluate stack fit when paid CAC rises while landing pages stay unchanged, when marketing misses campaign dates waiting on dev, or when integration workarounds multiply. Those signals mean you outgrew Webflow — not that Webflow failed. Plan migration before a rebrand forces a crisis rebuild.",
      },
      {
        type: "p",
        text: "Ask three references from firms your size who migrated in the last year. Compare editor satisfaction, not just developer preference. The stack that wins is the one marketing will use every Monday.",
      },
    ],
  },

  "ai-chatbots-for-small-business-what-works": {
    quickAnswer: {
      question: "Do AI chatbots work for small businesses?",
      shortAnswer:
        "AI chatbots work for small businesses when they handle narrow jobs: qualifying leads, booking appointments, answering FAQs from a verified knowledge base, and routing hot prospects to humans. They fail when promised as full replacement for sales or support. Wire chatbots to your CRM, limit scope to documented answers, and hand off to a person within minutes for high-intent requests.",
    },
    takeaways: [
      "Deploy chatbots on high-intent pages — pricing, contact, and service detail — not site-wide pop-ups on every blog post.",
      "Ground responses in a curated FAQ and service knowledge base; never let the model invent pricing or policy.",
      "Every qualified lead should create a CRM record with transcript and intent tags.",
      "Hand off to humans on booking requests, complaints, and custom quotes — not after ten frustrating turns.",
      "Measure containment rate, qualified leads, and booked meetings — not chat volume alone.",
      "After-hours coverage is the highest-ROI use case for service businesses and clinics.",
      "Start with one workflow, prove ROI in thirty days, then expand scope.",
    ],
    faqs: [
      {
        id: "faq-chatbot-roi",
        question: "What ROI should a small business expect from an AI chatbot?",
        answer:
          "Expect faster first response, more after-hours captures, and fewer dropped form fills — not automatic revenue doubling. Track qualified leads and booked meetings attributed to chat. Service businesses often see fifteen to thirty percent more captured inquiries when chat replaces silent after-hours gaps.",
      },
      {
        id: "faq-chatbot-vs-live-chat",
        question: "Should I use AI chat or human live chat?",
        answer:
          "Use AI for qualification, FAQ, and after-hours intake; use humans for closing, complaints, and complex quotes. Hybrid works best: bot collects context, human joins with transcript visible.",
      },
      {
        id: "faq-chatbot-hallucination",
        question: "How do I stop a chatbot from making up answers?",
        answer:
          "Restrict the knowledge base to approved FAQs, service pages, and pricing snippets you control. Use retrieval over your content, set refusal rules for unknown topics, and never let the bot state prices not in the knowledge base.",
      },
      {
        id: "faq-chatbot-crm",
        question: "Should my chatbot connect to CRM?",
        answer:
          "Yes. Every conversation that captures email or phone should create or update a CRM contact with source, page URL, intent tags, and transcript summary. Chat without CRM wiring is entertainment.",
      },
      {
        id: "faq-chatbot-clinics",
        question: "Do AI chatbots work for clinics and healthcare?",
        answer:
          "Yes for scheduling, directions, hours, and general FAQ — with strict PHI boundaries. Clinical questions should route to staff, not the model. Use HIPAA-eligible tooling where marketing chat might touch patient identifiers.",
      },
      {
        id: "faq-chatbot-build-vs-buy",
        question: "Should I build a custom chatbot or use a platform?",
        answer:
          "Platforms like Intercom, Drift, or HubSpot chat ship faster for standard lead capture. Custom bots on your Next.js site make sense when you need branded UX, deep CRM logic, or integration with an AI receptionist stack.",
      },
    ],
    searchQuestions: [
      "Do AI chatbots work for small businesses?",
      "How do I stop a chatbot from making up answers?",
      "Should my chatbot connect to CRM?",
      "What ROI should a small business expect from an AI chatbot?",
    ],
    relatedLinks: [
      { href: "/services/ai-receptionist", label: "AI Receptionist" },
      { href: "/services/crm-pipeline-automation", label: "CRM & Pipeline Automation" },
      { href: "/services/ai-lead-site", label: "AI-Cited Lead Gen Site" },
      { href: "/industries/professional-services", label: "Professional Services" },
    ],
    implementationTable: [
      {
        fix: "1. Scope the bot",
        problem: "Bot tries to answer everything; hallucinates",
        change: "Limit to FAQ, services, booking, and hours from approved docs",
        metric: "Hallucination incidents",
        tool: "RAG over Sanity / FAQ collection",
      },
      {
        fix: "2. High-intent placement",
        problem: "Pop-up on every page annoys visitors",
        change: "Deploy on pricing, contact, and service URLs only",
        metric: "Qualified chat leads",
        tool: "Next.js route-based widget",
      },
      {
        fix: "3. CRM handoff",
        problem: "Transcripts lost; no follow-up owner",
        change: "Create CRM task with summary + contact fields",
        metric: "Speed-to-lead from chat",
        tool: "HubSpot, GoHighLevel, or API route",
      },
      {
        fix: "4. Human escalation rules",
        problem: "Users stuck in bot loops",
        change: "Escalate on quote, complaint, or booking keywords",
        metric: "Escalation rate + CSAT",
        tool: "Chat platform routing rules",
      },
      {
        fix: "5. After-hours capture",
        problem: "Evening visitors leave without action",
        change: "Bot offers book link or callback request overnight",
        metric: "After-hours leads captured",
        tool: "AI receptionist + chat widget",
      },
      {
        fix: "6. Weekly transcript review",
        problem: "Wrong answers go unnoticed",
        change: "Review twenty transcripts weekly; update knowledge base",
        metric: "Containment without complaint",
        tool: "CRM + chat logs",
      },
    ],
    sources: [
      {
        title: "Google — Generative AI guidance for businesses",
        url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
        publisher: "Google",
        note: "Helpful content principles applied to bot knowledge bases.",
      },
      {
        title: "HubSpot — State of AI in customer service",
        url: "https://www.hubspot.com/state-of-ai",
        publisher: "HubSpot",
        note: "Adoption and ROI benchmarks for SMB chat tools.",
      },
      {
        title: "OpenAI — Best practices for safety and accuracy",
        url: "https://platform.openai.com/docs/guides/safety-best-practices",
        publisher: "OpenAI",
        note: "Grounding and refusal patterns for customer-facing bots.",
      },
    ],
    body: [
      {
        type: "p",
        text: "Small business owners hear two stories about AI chatbots: they will replace your front desk, or they will embarrass you in front of prospects. Neither is true when scope is narrow and the bot is wired to systems you already use. The chatbots that work qualify intent, answer from verified content, book or route, and create CRM records — they do not pretend to be a strategist.",
      },
      {
        type: "h2",
        text: "What actually works in 2026",
      },
      {
        type: "p",
        text: "Working deployments share four traits: a bounded knowledge base, placement on high-intent URLs, CRM integration on every capture, and clear escalation to humans. The bot handles repeat questions — pricing ranges, service area, hours, how to book — while quotes, complaints, and clinical questions route to staff. That is the model we implement alongside [AI receptionist](/services/ai-receptionist) and [CRM automation](/services/crm-pipeline-automation) for service firms.",
      },
      {
        type: "ul",
        items: [
          "FAQ grounded in your site content — not the open internet.",
          "Lead qualification: service needed, timeline, budget band, contact info.",
          "Booking links or callback requests with calendar integration.",
          "After-hours capture when phones go to voicemail.",
        ],
      },
      {
        type: "h2",
        text: "What fails — and why owners churn",
      },
      {
        type: "p",
        text: "Bots fail when vendors promise general intelligence. Models invent pricing, misstate policies, and loop on 'I did not understand that.' Visitors close the tab; owners disable the widget. Failure is almost always a scope problem — not an AI problem. If an answer is not in your approved knowledge base, the bot should say so and offer a human handoff, not guess.",
      },
      {
        type: "h2",
        text: "The ZedNova Chatbot Deployment Framework",
      },
      {
        type: "p",
        text: "We deploy in four layers: Knowledge (Sanity FAQ and service collections), Placement (pricing, contact, top service pages), Wiring (CRM create, Slack or SMS notify, transcript storage), and Governance (weekly transcript review, knowledge base updates). Skip a layer and ROI collapses. Chat without CRM is a toy; CRM without escalation rules frustrates buyers.",
      },
      {
        type: "p",
        text: "Small businesses we wire chat + CRM for typically see twenty to twenty-eight percent more captured inquiries in the first thirty days — almost entirely from after-hours and mobile sessions that previously bounced without calling. The bot is not closing deals; it is stopping silent leaks.",
      },
      {
        type: "h2",
        text: "Placement beats personality",
      },
      {
        type: "p",
        text: "A witty bot on every blog post annoys readers researching problems. A concise bot on your contact and service pages meets buyers in decision mode. Route-based deployment on [Next.js marketing sites](/services/ai-lead-site) lets you show chat only where intent is high. Pair with click-to-call on mobile so users can always escape to a human.",
      },
      {
        type: "h2",
        text: "CRM wiring is non-negotiable",
      },
      {
        type: "p",
        text: "Every chat that captures email or phone creates a CRM contact with page URL, intent tags, and a short transcript summary. Assign an owner and start a response SLA clock — same as form fills. HubSpot, GoHighLevel, and custom API routes all work. The wiring matters more than the chat widget brand.",
      },
      {
        type: "quote",
        text: "A chatbot is an intake form that talks back. Treat it like intake — measure speed-to-lead, not chit-chat.",
      },
      {
        type: "h2",
        text: "Clinics and regulated contexts",
      },
      {
        type: "p",
        text: "Clinics can use bots for hours, directions, insurance FAQ, and booking links — not clinical triage. Set PHI boundaries in week one; marketing chat must not collect symptoms or records unless you are on HIPAA-eligible infrastructure with BAAs. Pair with [healthcare CRM automation](/industries/healthcare-wellness) and human escalation for anything clinical.",
      },
      {
        type: "h2",
        text: "Build vs buy",
      },
      {
        type: "p",
        text: "Off-the-shelf tools ship faster for standard lead capture. Custom bots on your domain make sense when branding, multilingual intake, or deep integration with an AI phone stack is required. Most SMBs should buy the first version, prove ROI in thirty days, then customize. Start with one workflow — after-hours qualify and book — before expanding to full FAQ coverage.",
      },
      {
        type: "h2",
        text: "Metrics that matter",
      },
      {
        type: "ul",
        items: [
          "Qualified leads from chat (with contact info).",
          "Booked meetings or callbacks attributed to chat sessions.",
          "Median time to human response after escalation.",
          "Containment rate without negative transcript signals.",
          "After-hours captures vs previous baseline.",
        ],
      },
      {
        type: "p",
        text: "Review twenty transcripts weekly. Update the knowledge base when the same question stumps the bot twice. Chat is a living system — not set-and-forget. Combined with [SEO and AEO content](/services/seo-aeo-content), your documented answers power both search citations and bot retrieval from the same Sanity source of truth.",
      },
      {
        type: "h2",
        text: "Thirty-day rollout plan",
      },
      {
        type: "ul",
        items: [
          "Week 1: Approve FAQ and service knowledge base; define escalation keywords.",
          "Week 2: Deploy on contact and top three service pages; wire CRM create.",
          "Week 3: Enable after-hours mode; add booking or callback offer.",
          "Week 4: Review transcripts; expand placement if qualified leads exceed threshold.",
        ],
      },
      {
        type: "h2",
        text: "Avoiding the generic popup trap",
      },
      {
        type: "p",
        text: "Visitors hate unsolicited chat bubbles on blog posts they are still reading. Use intent-based triggers: time on page plus scroll depth on service URLs, or explicit click-to-chat on mobile. Respect do-not-track and cookie consent rules in your region. A quieter bot on the right page beats an aggressive bot everywhere.",
      },
      {
        type: "h2",
        text: "Combining chat with phone and forms",
      },
      {
        type: "p",
        text: "Chat is one intake channel — not the only one. Keep forms for buyers who prefer async, click-to-call for mobile users ready to talk, and chat for qualification questions after hours. All three should create the same CRM record shape so reporting stays honest. [AI receptionist](/services/ai-receptionist) stacks often share the knowledge base with web chat so phone and widget stay consistent.",
      },
      {
        type: "quote",
        text: "The best small-business chatbot is boring on purpose — accurate, fast, and quick to hand off.",
      },
      {
        type: "h2",
        text: "Vendor evaluation checklist",
      },
      {
        type: "p",
        text: "Before signing a chat platform, confirm: CRM native integration or open API, transcript export, human takeover, knowledge base upload from URLs or CMS, mobile widget performance, and pricing at your expected conversation volume. Pilot on one high-intent URL for thirty days with a qualified-lead target — not vanity chat counts.",
      },
      {
        type: "p",
        text: "Custom builds on Next.js make sense when you already run Sanity for content and want one source of truth for SEO, AEO, and chat retrieval. Buy-first suits teams that need speed and can live inside a SaaS dashboard for the first year.",
      },
      {
        type: "h2",
        text: "Long-term ownership",
      },
      {
        type: "p",
        text: "Assign one owner for knowledge base accuracy — update pricing, hours, and service scope within forty-eight hours of any change. Bots go stale faster than websites because visitors expect real-time answers. Tie updates to the same Sanity publish workflow as your site so chat and pages never contradict each other.",
      },
      {
        type: "p",
        text: "Escalate pricing and custom-quote questions to humans by design — bots should qualify and schedule, not negotiate. Clear boundaries build trust and keep hallucination risk low while still capturing after-hours demand your team would otherwise miss entirely.",
      },
      {
        type: "p",
        text: "Publish a one-page internal playbook: what the bot may answer, what it must escalate, and how quickly humans must respond after handoff. Small businesses that document rules scale chat without chaos; those that do not disable the widget within sixty days.",
      },
    ],
  },
};
