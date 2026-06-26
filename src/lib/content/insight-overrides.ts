import type { ArticleBlock, ArticleFaq, ImplementationRow, ResourceLink, SourceReference } from "@/lib/types";
import { remainingInsightOverrides } from "./insight-overrides-remaining";

export type InsightOverride = {
  body: ArticleBlock[];
  takeaways: string[];
  faqs: ArticleFaq[];
  quickAnswer: { question: string; shortAnswer: string };
  sources?: SourceReference[];
  implementationTable?: ImplementationRow[];
  searchQuestions?: string[];
  relatedLinks?: ResourceLink[];
};

const SHOPIFY_SLUG = "shopify-conversion-fixes-that-actually-move-revenue";
const FIVE_MINUTE_SLUG = "five-minute-revenue-leak-audit";

const shopifyOverride: InsightOverride = {
  quickAnswer: {
    question: "How do I improve Shopify conversion rate?",
    shortAnswer:
      "Improve Shopify conversion by clarifying product pages, placing social proof beside the add-to-cart button, cutting mobile LCP below three seconds, simplifying checkout, and deploying Klaviyo browse/cart recovery plus post-purchase email flows. Track add-to-cart rate, checkout completion, and revenue per session before increasing ad spend.",
  },
  takeaways: [
    "Clarify the product page offer with one primary CTA before raising ad spend.",
    "Place reviews, UGC, or trust badges directly beside the add-to-cart button.",
    "Keep mobile LCP under three seconds by compressing hero media and trimming app bloat.",
    "Enable guest checkout and remove optional fields that add checkout friction.",
    "Deploy Klaviyo browse and cart abandonment flows to recover paid traffic.",
    "Use post-purchase email to drive upsells, reviews, and repeat orders.",
    "Instrument funnel events in Shopify Analytics before scaling campaigns.",
  ],
  faqs: [
    {
      id: "faq-shopify-traffic-no-sales",
      question: "Why is my Shopify store getting traffic but no sales?",
      answer:
        "Traffic without sales usually means the product page does not answer objections fast enough, mobile load is slow, or checkout adds friction. Audit one SKU page: is the offer clear in five seconds, is proof beside add-to-cart, and can someone check out as a guest quickly?",
    },
    {
      id: "faq-shopify-conversion-first",
      question: "What is the first Shopify conversion fix to implement?",
      answer:
        "Start with product page clarity: one primary CTA, scannable benefits above the fold, and social proof next to add-to-cart. Most stores try to fix checkout before fixing the page that sends people there.",
    },
    {
      id: "faq-shopify-before-ads",
      question: "What should I fix before spending more on ads?",
      answer:
        "Fix product page conversion, mobile speed, and cart recovery first. If add-to-cart rate and checkout completion are weak, more ad spend only amplifies the leak. Track revenue per session and checkout completion weekly.",
    },
    {
      id: "faq-shopify-speed",
      question: "Does Shopify site speed really affect conversion?",
      answer:
        "Yes. Google Core Web Vitals research links slower LCP to higher mobile bounce. Compress images, lazy-load galleries, and remove unused apps before you increase paid spend.",
    },
    {
      id: "faq-shopify-revenue-fixes",
      question: "What Shopify fixes increase revenue fastest?",
      answer:
        "Cart and browse abandonment email/SMS, post-purchase upsells, and clearer product pages typically move revenue within 30 days without new traffic. Speed and checkout simplification protect those gains on paid campaigns.",
    },
  ],
  searchQuestions: [
    "How do I improve Shopify conversion rate?",
    "Why is my Shopify store getting traffic but no sales?",
    "What Shopify fixes increase revenue?",
    "What should I fix before spending more on ads?",
  ],
  relatedLinks: [
    { href: "/industries/ecommerce-dtc", label: "E-commerce development" },
    { href: "/migrations/shopify-to-headless-shopify", label: "Shopify to Headless Shopify" },
    { href: "/services/seo-aeo-content", label: "SEO & AEO Content Systems" },
  ],
  implementationTable: [
    {
      fix: "1. Product page clarity",
      problem: "Offer buried; multiple competing CTAs",
      change: "One hero benefit line, single add-to-cart, scannable bullets above fold",
      metric: "Add-to-cart rate",
      tool: "Shopify theme editor",
    },
    {
      fix: "2. Social proof near CTA",
      problem: "Reviews and trust signals sit below the fold",
      change: "Place star rating, review count, or UGC beside add-to-cart",
      metric: "Product page conversion rate",
      tool: "Judge.me, Okendo, or Loox",
    },
    {
      fix: "3. Mobile speed",
      problem: "LCP above 4s on product templates",
      change: "Compress hero images, defer apps, lazy-load galleries",
      metric: "LCP (mobile)",
      tool: "Shopify Speed Report + PageSpeed Insights",
    },
    {
      fix: "4. Checkout simplification",
      problem: "Forced accounts or surprise shipping costs",
      change: "Guest checkout, early shipping display, fewer fields",
      metric: "Checkout completion rate",
      tool: "Shopify Checkout settings",
    },
    {
      fix: "5. Cart recovery flow",
      problem: "No follow-up after browse or cart drop-off",
      change: "Klaviyo browse + cart series with dynamic product blocks",
      metric: "Recovered revenue per flow",
      tool: "Klaviyo + Shopify",
    },
    {
      fix: "6. Post-purchase email flow",
      problem: "Single-order customers; no review pipeline",
      change: "Upsell offer + review request 7–14 days post-delivery",
      metric: "AOV + repeat purchase rate",
      tool: "Klaviyo post-purchase",
    },
    {
      fix: "7. Funnel metric tracking",
      problem: "Scaling ads without event-level data",
      change: "Shopify funnel events + server-side Meta/Google tracking",
      metric: "Revenue per session",
      tool: "Shopify Analytics + Elevar or Stape",
    },
  ],
  sources: [
    {
      title: "Checkout usability — cart abandonment benchmarks",
      url: "https://baymard.com/lists/cart-abandonment-rate",
      publisher: "Baymard Institute",
      note: "Checkout friction and abandonment benchmarks cited for Fix 4.",
    },
    {
      title: "Core Web Vitals",
      url: "https://web.dev/articles/vitals",
      publisher: "Google web.dev",
      note: "Mobile LCP guidance cited for Fix 3.",
    },
    {
      title: "Shopify Help — Optimize checkout",
      url: "https://help.shopify.com/en/manual/checkout-settings",
      publisher: "Shopify",
      note: "Guest checkout and checkout settings for Fix 4.",
    },
    {
      title: "Klaviyo — Ecommerce benchmark report",
      url: "https://www.klaviyo.com/marketing-resources/ecommerce-benchmarks",
      publisher: "Klaviyo",
      note: "Flow performance benchmarks for Fixes 5–6.",
    },
  ],
  body: [
    {
      type: "p",
      text: "Shopify makes launch easy; conversion is harder. Most stores we audit get traffic and add-to-carts, then leak revenue on unclear product pages, slow mobile load, checkout friction, and silent post-purchase follow-up. These seven fixes are the order we use on every [Shopify and ecommerce engagement](/industries/ecommerce-dtc) before touching ad creative.",
    },
    { type: "h2", text: "Fix 1: Product page clarity" },
    {
      type: "p",
      text: "If a shopper cannot state your offer in five seconds, paid traffic will not save the store. One primary CTA, a scannable benefit block, and a single conversion path beat another homepage redesign. We apply the same [conversion-focused product page structure](/industries/ecommerce-dtc) we use on Shopify builds — one page, one action.",
    },
    { type: "h2", text: "Fix 2: Social proof near the CTA" },
    {
      type: "p",
      text: "Reviews, star ratings, UGC, and trust badges belong beside the add-to-cart button — not three screens below it. Shoppers decide at the CTA moment; proof there reduces hesitation on cold traffic. Tools like Judge.me, Okendo, or Loox integrate cleanly with Shopify product templates.",
    },
    { type: "h2", text: "Fix 3: Mobile speed" },
    {
      type: "p",
      text: "Mobile product pages are where Meta and TikTok traffic lands. When LCP drifts above four seconds, bounce rises and CAC follows. Compress hero images to WebP/AVIF, audit app scripts in Shopify, and lazy-load galleries. Speed is a conversion feature, not a technical nice-to-have.",
    },
    { type: "h2", text: "Fix 4: Checkout simplification" },
    {
      type: "p",
      text: "Forced account creation, surprise shipping costs, and long forms kill cold traffic checkout. Enable guest checkout, show shipping thresholds early, and strip optional fields. Baymard’s checkout research ranks unexpected costs as a top abandonment driver — fix that before scaling [outbound or paid campaigns](/services/outbound-lead-gen).",
    },
    { type: "h2", text: "Fix 5: Cart recovery flow" },
    {
      type: "p",
      text: "Shoppers who viewed a product or reached cart already signaled intent. Klaviyo browse abandonment (24h) and cart abandonment (1h / 24h / 72h) with dynamic product blocks recover revenue you paid to acquire. SMS works for high-AOV SKUs when compliance is handled correctly.",
    },
    { type: "h2", text: "Fix 6: Post-purchase email flow" },
    {
      type: "p",
      text: "The thank-you page is not the end of the funnel. One relevant upsell and a timed review request (7–14 days post-delivery) lift AOV and social proof for the next visitor. Pair with [review and reputation systems](/services/review-reputation) if you run multi-location or high-trust categories.",
    },
    { type: "h2", text: "Fix 7: Funnel metric tracking" },
    {
      type: "p",
      text: "Track add-to-cart, begin checkout, and purchase in Shopify Analytics plus server-side events to ad platforms. If you cannot report revenue per session weekly, pausing scale is cheaper than guessing. [Ops and reporting dashboards](/services/reporting-dashboards) help when data lives across Shopify, Klaviyo, and ad accounts.",
    },
    {
      type: "quote",
      text: "The cheapest revenue in ecommerce is the shopper who already wanted to buy — and got stuck, distracted, or never heard from you again.",
    },
    {
      type: "h2",
      text: "What to measure each week",
    },
    {
      type: "ul",
      items: [
        "Add-to-cart rate on top 5 SKUs by spend",
        "Checkout completion rate (sessions → purchase)",
        "Recovered revenue from Klaviyo flows",
        "Mobile LCP on product template",
        "Revenue per session from Shopify Analytics",
      ],
    },
  ],
};

const fiveMinuteOverride: InsightOverride = {
  quickAnswer: {
    question: "How do I find revenue leaks in my business?",
    shortAnswer:
      "Run a five-minute revenue leak audit: call your business during and after hours, submit your contact form and time the reply, review your last twenty estimates for follow-up gaps, check CRM response times, and confirm every lead gets an automated first touch. Slow follow-up—not weak marketing—usually causes the leak.",
  },
  takeaways: [
    "Most businesses lose more revenue to slow follow-up than to any marketing problem.",
    "Call your own business during and after hours — every voicemail is a lost lead.",
    "Submit your own contact form and time the reply — over 5 minutes and you are losing leads daily.",
    "Check your last 20 estimates: how many got a second follow-up?",
    "The fix is rarely more leads — it is a system that catches the ones you already have.",
  ],
  faqs: [
    {
      id: "faq-revenue-leak",
      question: "What is a revenue leak?",
      answer:
        "A revenue leak is money you already paid to earn but never collect — usually because a lead raised their hand and no one responded fast enough, or no system chased them. It is rarely a marketing problem. It is a follow-up gap.",
    },
    {
      id: "faq-ideal-response-time",
      question: "How fast should a business respond to a lead?",
      answer:
        "Under five minutes. Studies consistently show that lead qualification drops sharply after the first five minutes. If your contact form replies take hours, faster competitors are taking your leads every day.",
    },
    {
      id: "faq-fix-leak",
      question: "How do I fix slow follow-up?",
      answer:
        "Connect every form to a CRM that notifies a human instantly and auto-sends a first reply. Add an after-hours call path and a sequence that chases every estimate with at least two follow-ups. The fix is a system, not more leads.",
    },
  ],
  searchQuestions: [
    "How do I find revenue leaks in my business?",
    "What is a revenue leak audit?",
    "How fast should a business respond to a lead?",
  ],
  implementationTable: [],
  sources: [],
  body: [
    {
      type: "p",
      text: "Before you spend another dollar on ads, run this five-minute audit. It usually finds money you already paid for and never collected — most often in [lead response and CRM gaps](/services/crm-pipeline-automation), not in your marketing creative.",
    },
    { type: "h2", text: "Audit 1: Call your own business" },
    {
      type: "p",
      text: "Call during business hours, then again after hours. Count how many rings before someone answers, or whether you hit voicemail. Every voicemail is a lead deciding whether to wait for you or call the next name on the list.",
    },
    { type: "h2", text: "Audit 2: Submit your own form" },
    {
      type: "p",
      text: "Fill out your website contact form and start a timer. How long until someone replies? If the answer is more than five minutes, you are losing leads to faster competitors every single day.",
    },
    { type: "h2", text: "Audit 3: Review your last 20 estimates" },
    {
      type: "ul",
      items: [
        "How many got a single follow-up?",
        "How many got a second?",
        "How many simply went quiet with no system chasing them?",
      ],
    },
    { type: "h2", text: "Audit 4: Check CRM response times" },
    {
      type: "p",
      text: "Pull the last two weeks of inbound leads from your CRM or inbox. Note average first-response time by channel — phone, form, chat, and social. Gaps here predict which channel leaks the most revenue.",
    },
    { type: "h2", text: "Audit 5: Confirm automated first touch" },
    {
      type: "p",
      text: "Every inbound lead should get an immediate acknowledgment — even when your team is busy. If that requires manual effort today, an [AI receptionist or intake flow](/services/ai-receptionist) closes the gap without adding headcount.",
    },
    {
      type: "quote",
      text: "Most businesses lose 40% of their leads to slow follow-up. The fix is rarely more leads. It is a system that catches the ones you already have.",
    },
  ],
};

const OVERRIDES: Record<string, InsightOverride> = {
  [SHOPIFY_SLUG]: shopifyOverride,
  [FIVE_MINUTE_SLUG]: fiveMinuteOverride,
  ...remainingInsightOverrides,
};

export function getInsightOverride(slug: string): InsightOverride | null {
  return OVERRIDES[slug] ?? null;
}

export function applyInsightOverride<T extends { slug: string }>(
  post: T & {
    body: ArticleBlock[];
    takeaways?: string[];
    faqs?: ArticleFaq[];
    quickAnswer?: { question?: string; shortAnswer?: string };
  },
): T & {
  body: ArticleBlock[];
  takeaways?: string[];
  faqs?: ArticleFaq[];
  sources?: SourceReference[];
  implementationTable?: ImplementationRow[];
  searchQuestions?: string[];
  quickAnswer?: { question?: string; shortAnswer?: string };
  relatedLinks?: ResourceLink[];
} {
  const override = getInsightOverride(post.slug);
  if (!override) return post;
  return {
    ...post,
    body: override.body,
    takeaways: override.takeaways,
    faqs: override.faqs,
    searchQuestions: override.searchQuestions,
    quickAnswer: override.quickAnswer,
    ...(override.sources?.length ? { sources: override.sources } : {}),
    ...(override.implementationTable?.length
      ? { implementationTable: override.implementationTable }
      : {}),
    ...(override.relatedLinks?.length ? { relatedLinks: override.relatedLinks } : {}),
  };
}
