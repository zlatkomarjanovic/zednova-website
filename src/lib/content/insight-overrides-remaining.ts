import type { InsightOverride } from "./insight-overrides";

export const remainingInsightOverrides: Record<string, InsightOverride> = {
  "ai-overviews-are-the-new-seo": {
    quickAnswer: {
      question: "How do I get cited in AI Overviews?",
      shortAnswer:
        "Get cited in AI Overviews by adding schema markup, publishing an llms.txt file, leading articles with a direct answer block, and writing specific numbered claims answer engines can quote. Pair structured content with external mentions so Google, ChatGPT, and Perplexity trust your pages as primary sources.",
    },
    takeaways: [
      "Search is shifting from ranking in ten blue links to being cited by one synthesized answer.",
      "Answer engines reward clean structure, clear claims, and machine-readable markup — not keyword density.",
      "Add schema markup, publish an llms.txt file, and lead every article with the conclusion.",
      "Earn citations with specific, numbered claims models can lift verbatim.",
    ],
    faqs: [
      {
        id: "faq-what-are-ai-overviews",
        question: "What are AI Overviews?",
        answer:
          "AI Overviews are Google's synthesized answers shown above traditional search results. They read the web, generate a direct answer, and cite a handful of sources. Most users never scroll past them.",
      },
      {
        id: "faq-aeo-vs-seo",
        question: "What is the difference between SEO and AEO?",
        answer:
          "SEO optimizes to rank in the ten blue links. AEO optimizes to be cited by AI answer engines like Google AI Overviews, ChatGPT, and Perplexity. AEO rewards clean structure, schema markup, and answer-first content over keyword density.",
      },
      {
        id: "faq-llms-txt",
        question: "What is an llms.txt file and do I need one?",
        answer:
          "An llms.txt file tells language models what your site covers and which pages matter most. It is the machine-readable equivalent of a sitemap for answer engines. If you want AI search to cite your business, you need one.",
      },
      {
        id: "faq-how-to-get-cited",
        question: "How do I get my business cited in AI Overviews?",
        answer:
          "Lead with a clear answer, add schema markup so engines understand each page, publish an llms.txt file, and write specific numbered claims models can lift verbatim. Then earn external mentions — citation is part trust signal.",
      },
    ],
    searchQuestions: [
      "How do I get cited in AI Overviews?",
      "What is the difference between SEO and AEO?",
      "What is an llms.txt file?",
    ],
    relatedLinks: [
      { href: "/services/seo-aeo-content", label: "SEO & AEO Content Systems" },
      { href: "/services/ai-lead-site", label: "AI-Cited Lead Gen Site" },
    ],
    sources: [
      {
        title: "Google Search — AI Overviews",
        url: "https://developers.google.com/search/docs/appearance/ai-overviews",
        publisher: "Google",
        note: "How Google surfaces synthesized answers and citations.",
      },
    ],
    implementationTable: [],
    body: [
      {
        type: "p",
        text: "For twenty years, SEO meant ranking in ten blue links. AI Overviews, ChatGPT, and Perplexity now answer the query directly — and most users never scroll to a traditional result. Your goal is to be cited, not merely ranked.",
      },
      { type: "h2", text: "Step 1: Add schema markup" },
      {
        type: "p",
        text: "BlogPosting, FAQPage, Organization, and BreadcrumbList JSON-LD help answer engines understand what each page claims. We wire this into every [SEO and AEO content system](/services/seo-aeo-content) we ship so citations map to real entities, not vague paragraphs.",
      },
      { type: "h2", text: "Step 2: Publish llms.txt" },
      {
        type: "p",
        text: "An llms.txt file lists the pages you want models to prioritize — services, industries, migrations, and insights. It is the machine-readable map for ChatGPT, Perplexity, and other crawlers that skip traditional sitemaps.",
      },
      { type: "h2", text: "Step 3: Lead with the answer" },
      {
        type: "p",
        text: "Every insight and service page should open with a 40–70 word direct answer block that names the problem, the fix, and the metric. Answer engines lift concise claims verbatim; burying the conclusion in paragraph three hides you from AI Overviews.",
      },
      { type: "h2", text: "Step 4: Earn external citations" },
      {
        type: "p",
        text: "Structured markup gets you considered; external mentions get you chosen. Publish specific numbered frameworks, link to primary sources, and earn mentions from directories, partners, and industry pages so models see corroboration beyond your own domain.",
      },
      {
        type: "quote",
        text: "The businesses that win the next five years of search will be the ones AI engines quote, not the ones that merely rank.",
      },
    ],
  },

  "why-your-website-is-losing-clients": {
    quickAnswer: {
      question: "Why is my website not converting visitors?",
      shortAnswer:
        "Websites lose clients when every page asks for five actions at once, mobile load exceeds three seconds, or leads submit a form and nobody follows up within minutes. Fix one primary CTA per page, cut LCP below three seconds, and connect every form to a CRM that notifies a human instantly.",
    },
    takeaways: [
      "When a site doesn't convert, owners blame the design — but the design is rarely the problem.",
      "Every page should drive a single action. Five choices means people choose none.",
      "If your site takes 4 seconds to load on mobile, paid traffic is gone before it sees a word.",
      "A beautiful site with no capture system is a leak — leads must hit your CRM in seconds.",
    ],
    faqs: [
      {
        id: "faq-website-not-converting",
        question: "Why is my website not converting visitors?",
        answer:
          "Usually because the page asks visitors to do five things at once, loads too slowly on mobile, or has no system to capture and follow up with leads. The design is almost never the root cause.",
      },
      {
        id: "faq-ideal-page-load",
        question: "How fast should a website load to convert?",
        answer:
          "Aim for under 2 seconds on mobile. At 4 seconds a large share of paid traffic leaves before seeing any content. Page speed is a conversion feature, not a technical nicety.",
      },
      {
        id: "faq-capture-system",
        question: "What is a website capture system?",
        answer:
          "A capture system connects every form, call button, and chat to your CRM the instant a lead submits — and notifies a human to respond. It turns a brochure website into the front end of a sales system.",
      },
    ],
    searchQuestions: [
      "Why is my website not converting?",
      "How fast should a website load?",
      "What is a website capture system?",
    ],
    relatedLinks: [
      { href: "/services/ai-lead-site", label: "AI-Cited Lead Gen Site" },
      { href: "/services/crm-pipeline-automation", label: "CRM & Pipeline Automation" },
    ],
    sources: [],
    implementationTable: [],
    body: [
      {
        type: "p",
        text: "When a site does not convert, owners usually blame the design. They redesign, the numbers do not move, and they conclude the web does not work. The design was rarely the problem — the conversion system was missing.",
      },
      { type: "h2", text: "Reason 1: No single action per page" },
      {
        type: "p",
        text: "Most underperforming sites ask visitors to call, email, download, follow, and read the blog on the same screen. Faced with five choices, people choose none. Every [conversion-focused lead gen page](/services/ai-lead-site) should drive one primary action above the fold.",
      },
      { type: "h2", text: "Reason 2: Mobile speed kills paid traffic" },
      {
        type: "p",
        text: "If your site takes four seconds to load on a phone, a large share of paid traffic leaves before reading a word. Target LCP under three seconds on mobile before you increase ad spend — speed is the first conversion step, not a technical nicety.",
      },
      { type: "h2", text: "Reason 3: No capture or follow-up system" },
      {
        type: "p",
        text: "A beautiful site with no connected CRM is a leak. The moment someone submits a form, that lead should notify a human and enter a [CRM automation workflow](/services/crm-pipeline-automation). Seconds matter; hours hand the deal to a faster competitor.",
      },
      {
        type: "quote",
        text: "A website is not a brochure. It is the front end of a system. Build the system, and the site finally starts paying for itself.",
      },
    ],
  },

  "when-to-rebuild-vs-migrate": {
    quickAnswer: {
      question: "Should I rebuild or migrate my website?",
      shortAnswer:
        "Migrate when your offer and brand are solid but the platform slows you down — WordPress plugin chaos, Webflow limits, or slow hosting. Rebuild when positioning changed, there is no single conversion path, or you would not send paid traffic to the current site. Match the scope to what is actually broken.",
    },
    takeaways: [
      "A full rebuild is not always the answer — the real problem may be content, speed, or CMS friction.",
      "Migrate when the brand and offer are solid but the platform fights you (WordPress plugins, Webflow limits).",
      "Rebuild when positioning changed or the site has no single conversion path.",
      "The right question is whether the current site still matches how you sell today.",
    ],
    faqs: [
      {
        id: "faq-when-to-migrate",
        question: "When should I migrate my website instead of rebuild?",
        answer:
          "Migrate when the offer is clear, the brand is solid, and the pain is the platform — slow hosting, WordPress plugin chaos, or Webflow limits. A migration to Next.js and Sanity often delivers 80% of the value at half the cost of a rebuild.",
      },
      {
        id: "faq-when-to-rebuild",
        question: "When does a website need a full rebuild?",
        answer:
          "Rebuild when your positioning has changed, the site has no single conversion path, or you are embarrassed to send paid traffic to it. A rebuild fixes structure and copy together instead of patching a broken funnel.",
      },
      {
        id: "faq-migration-cost",
        question: "How much does a website migration cost vs a rebuild?",
        answer:
          "A migration is typically 40–60% of a rebuild because it preserves existing structure and content. A rebuild costs more but lets you fix the strategy, copy, and conversion path at the same time.",
      },
    ],
    searchQuestions: [
      "Should I rebuild or migrate my website?",
      "When should I migrate my website?",
      "When does a website need a full rebuild?",
    ],
    relatedLinks: [
      { href: "/migrations/webflow-to-nextjs-sanity", label: "Webflow to Next.js + Sanity" },
      { href: "/migrations/wordpress-to-nextjs-sanity", label: "WordPress to Next.js + Sanity" },
      { href: "/services/ai-lead-site", label: "AI-Cited Lead Gen Site" },
    ],
    sources: [],
    implementationTable: [],
    body: [
      {
        type: "p",
        text: "Teams often jump to a full rebuild when the real problem is content structure, speed, or a CMS that fights them daily. The right call depends on what is broken — platform, positioning, or conversion path.",
      },
      { type: "h2", text: "Migrate when the bones are fine" },
      {
        type: "p",
        text: "If the offer is clear and the pain is WordPress plugins, Webflow limits, or slow hosting, a [Webflow to Next.js migration](/migrations/webflow-to-nextjs-sanity) or [WordPress to Next.js migration](/migrations/wordpress-to-nextjs-sanity) often delivers most of the value at lower cost than a rebuild.",
      },
      { type: "h2", text: "Rebuild when the strategy moved" },
      {
        type: "p",
        text: "Rebuild when positioning changed, the site has no single conversion path, or you would not send paid traffic to it today. A rebuild fixes structure, copy, and [lead gen architecture](/services/ai-lead-site) together instead of patching a broken funnel.",
      },
      { type: "h2", text: "Decision checklist" },
      {
        type: "ul",
        items: [
          "Can you state one primary action per core page in one sentence?",
          "Does the CMS let marketing publish without a developer ticket?",
          "Are Core Web Vitals and redirect maps acceptable for SEO?",
          "Would you send this year's ad budget to the current homepage?",
        ],
      },
      {
        type: "quote",
        text: "The question is not WordPress or Next.js. It is whether the current site still matches how you sell today.",
      },
      {
        type: "p",
        text: "Scope the project in one working session: list every page that must convert, every CMS pain point, and every integration the new stack must support. That list tells you whether you are migrating content or rebuilding the funnel.",
      },
    ],
  },

  "crm-automation-for-clinics-without-extra-hires": {
    quickAnswer: {
      question: "How do clinics automate CRM without hiring staff?",
      shortAnswer:
        "Clinics automate CRM by wiring online booking, digital intake, SMS reminders, and post-visit review requests into one pipeline — so no inquiry waits for front-desk availability. HubSpot or GoHighLevel plus an AI receptionist for overflow handles intake without adding headcount.",
    },
    takeaways: [
      "Missed calls and slow follow-up are scheduling problems, not staffing problems.",
      "Online booking plus automated reminders cut no-shows without more phone time.",
      "Intake forms should flow into the CRM before the patient arrives.",
      "Review requests should trigger after the visit, not when someone remembers to ask.",
    ],
    faqs: [
      {
        id: "faq-clinic-crm-tools",
        question: "Which CRM tools work for clinics?",
        answer:
          "HubSpot, GoHighLevel, and clinic-specific stacks all work if booking, SMS, and forms connect cleanly. We pick based on your call volume, locations, and what your team already uses.",
      },
    ],
    searchQuestions: [
      "How do clinics automate CRM?",
      "Which CRM tools work for clinics?",
    ],
    relatedLinks: [
      { href: "/services/ai-receptionist", label: "AI Receptionist" },
      { href: "/services/crm-pipeline-automation", label: "CRM & Pipeline Automation" },
      { href: "/industries/healthcare-wellness", label: "Healthcare & Wellness" },
    ],
    sources: [],
    implementationTable: [],
    body: [
      {
        type: "p",
        text: "Every clinic owner knows the pattern: phones ring during patient hours, voicemails stack up, and new inquiries book with whoever answers first — often a competitor. The fix is not another front-desk hire. It is [CRM and intake automation](/services/crm-pipeline-automation).",
      },
      { type: "h2", text: "Automate online booking" },
      {
        type: "p",
        text: "Let patients self-schedule from Google, your site, and recall emails. Booking should write directly to your CRM with service type, location, and source so staff see context before the call back.",
      },
      { type: "h2", text: "Digitize intake before the visit" },
      {
        type: "p",
        text: "Send intake links after booking confirmation. Data should land in the CRM — not a PDF inbox — so clinicians walk in with history, insurance flags, and consent already captured.",
      },
      { type: "h2", text: "Run SMS reminders and recall" },
      {
        type: "p",
        text: "Timed SMS reminders cut no-shows. Recall sequences bring hygiene and follow-up appointments back without manual phone tag. Measure no-show rate weekly; it is the fastest ROI metric for automation.",
      },
      { type: "h2", text: "Trigger reviews and overflow coverage" },
      {
        type: "p",
        text: "Review requests should fire after the visit via [reputation automation](/services/review-reputation), not when someone remembers to ask. Pair with an [AI receptionist](/services/ai-receptionist) for after-hours and overflow calls so inquiries never hit voicemail.",
      },
      {
        type: "p",
        text: "Measure booking rate, no-show rate, and average response time weekly. Clinics that automate these three metrics typically recover capacity without adding front-desk headcount within the first month.",
      },
    ],
  },

  "sanity-cms-for-marketing-teams-who-hate-developer-tickets": {
    quickAnswer: {
      question: "Why should marketing teams use Sanity CMS?",
      shortAnswer:
        "Sanity lets marketing teams edit structured content — services, industries, insights, and landing pages — without opening developer tickets. Collections, references, preview URLs, and guardrailed fields keep SEO and layout intact while editors publish copy changes in minutes instead of waiting on React deploys.",
    },
    takeaways: [
      "Separate page copy from layout components so editors change words, not React files.",
      "Use collections for services, industries, and insights — not one-off hardcoded pages.",
      "Preview URLs let marketing review before publish without staging gymnastics.",
      "Structured content beats a WYSIWYG free-for-all when you care about SEO and consistency.",
    ],
    faqs: [
      {
        id: "faq-sanity-vs-webflow-cms",
        question: "When is Sanity better than Webflow CMS?",
        answer:
          "When you need custom software features, multi-collection content, or a Next.js front end with room to grow. Webflow is great for marketing sites alone; Sanity wins when content feeds multiple surfaces.",
      },
    ],
    searchQuestions: [
      "Why should marketing teams use Sanity CMS?",
      "When is Sanity better than Webflow CMS?",
    ],
    relatedLinks: [
      { href: "/migrations/webflow-to-nextjs-sanity", label: "Webflow to Next.js + Sanity" },
      { href: "/services/ai-lead-site", label: "AI-Cited Lead Gen Site" },
    ],
    sources: [],
    implementationTable: [],
    body: [
      {
        type: "p",
        text: "The goal is not a CMS your developers love. It is a CMS your marketing team actually uses — without breaking layout, SEO, or performance. Sanity on Next.js is how we ship [marketing sites that scale](/services/ai-lead-site) without a ticket queue for every headline.",
      },
      { type: "h2", text: "Use collections, not page blobs" },
      {
        type: "p",
        text: "Services, industries, migrations, and insights each get their own collection. Editors update entries once; the site pulls them into nav, listing pages, and detail templates automatically — no duplicate copy across Webflow pages.",
      },
      { type: "h2", text: "Separate copy from layout" },
      {
        type: "p",
        text: "React components own layout and performance; Sanity owns words, references, SEO fields, and AEO blocks. Marketing changes copy in Studio; developers are not in the loop for routine updates.",
      },
      { type: "h2", text: "Preview before publish" },
      {
        type: "p",
        text: "Preview URLs let editors review on the real Next.js template before go-live. That removes staging gymnastics and cuts the 'looks different in prod' surprises that kill marketing velocity.",
      },
      { type: "h2", text: "Guardrails for SEO and AEO" },
      {
        type: "p",
        text: "Required SEO titles, direct answer blocks, FAQ arrays, and schema toggles live in dedicated Studio groups so editors know what affects search and AI citations. Structured beats a WYSIWYG free-for-all when you care about consistency.",
      },
      {
        type: "p",
        text: "When marketing can publish a new service page, insight, or landing section without a developer ticket, campaign velocity goes up and SEO drift goes down. That is the operational win Sanity is built for.",
      },
    ],
  },
};
