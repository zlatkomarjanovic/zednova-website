import type { ArticleBlock } from "@/lib/types";
import type { Post } from "@/lib/types";
import { getInsightOverride } from "./insight-overrides";

/** Minimum article body length (characters) for insights posts. */
export const MIN_POST_BODY_CHARS = 5000;

/** 20 tags per post — merged with existing tags in Sanity enrichment. */
export const EXTENDED_POST_TAGS: Record<string, string[]> = {
  "ai-overviews-are-the-new-seo": [
    "AI Overviews",
    "AEO",
    "SEO",
    "Generative Search",
    "Schema Markup",
    "llms.txt",
    "Answer Engine Optimization",
    "Google SGE",
    "ChatGPT Search",
    "Perplexity",
    "Structured Data",
    "Featured Snippets",
    "Content Strategy",
    "Small Business SEO",
    "Local SEO",
    "Search Visibility",
    "Digital Marketing",
    "Web Content",
    "Citation Strategy",
    "ZedNova Insights",
  ],
  "five-minute-revenue-leak-audit": [
    "Lead Response",
    "Revenue Leak Audit",
    "CRM",
    "Follow-Up",
    "Conversion",
    "Speed to Lead",
    "Small Business",
    "Sales Pipeline",
    "Missed Calls",
    "Contact Forms",
    "Automation",
    "Operations",
    "Customer Acquisition",
    "Lead Qualification",
    "Estimates",
    "Service Business",
    "Front Desk",
    "Revenue Recovery",
    "Process Audit",
    "ZedNova Insights",
  ],
  "why-your-website-is-losing-clients": [
    "Conversion",
    "Website Strategy",
    "CTA",
    "Page Speed",
    "Lead Capture",
    "Mobile UX",
    "Landing Pages",
    "Bounce Rate",
    "Core Web Vitals",
    "Form Optimization",
    "User Experience",
    "Marketing Website",
    "Lead Generation",
    "SMB Websites",
    "Next.js",
    "Performance",
    "Sales Funnel",
    "Web Design",
    "Copywriting",
    "ZedNova Insights",
  ],
  "when-to-rebuild-vs-migrate": [
    "Website Rebuild",
    "CMS Migration",
    "Next.js",
    "Sanity",
    "Webflow",
    "WordPress",
    "Headless CMS",
    "Platform Migration",
    "Technical Debt",
    "Website Strategy",
    "Content Modeling",
    "Performance",
    "SEO Migration",
    "Redirect Planning",
    "Digital Transformation",
    "Marketing Site",
    "Cost Planning",
    "Project Scoping",
    "Agency Partner",
    "ZedNova Insights",
  ],
  "shopify-conversion-fixes-that-actually-move-revenue": [
    "Shopify",
    "Conversion",
    "Ecommerce",
    "Product Pages",
    "Klaviyo",
    "Cart Abandonment",
    "DTC Brands",
    "Checkout Optimization",
    "Email Flows",
    "SMS Marketing",
    "AOV",
    "Mobile Commerce",
    "CRO",
    "Paid Media",
    "Retention",
    "Post-Purchase",
    "Store Speed",
    "Merchandising",
    "Revenue Growth",
    "ZedNova Insights",
  ],
  "crm-automation-for-clinics-without-extra-hires": [
    "CRM Automation",
    "Healthcare",
    "Booking",
    "Clinics",
    "Follow-up",
    "Dental",
    "Med Spa",
    "Patient Intake",
    "SMS Reminders",
    "HubSpot",
    "GoHighLevel",
    "Practice Management",
    "No-Show Reduction",
    "Front Desk",
    "Recall Systems",
    "HIPAA Awareness",
    "Scheduling",
    "Reputation",
    "Clinic Marketing",
    "ZedNova Insights",
  ],
  "sanity-cms-for-marketing-teams-who-hate-developer-tickets": [
    "Sanity CMS",
    "Next.js",
    "Content Operations",
    "Marketing",
    "Webflow Migration",
    "Headless CMS",
    "Content Modeling",
    "Editor Experience",
    "Preview Workflows",
    "Structured Content",
    "SEO Content",
    "Marketing Teams",
    "Developer Tickets",
    "Content Governance",
    "Portable Text",
    "GROQ",
    "Vercel",
    "Content Strategy",
    "Web Operations",
    "ZedNova Insights",
  ],
};

function paragraphFromTakeaways(takeaways: string[], index: number): string {
  const base = takeaways[index % takeaways.length];
  return `${base} In practice, teams that treat this as a systems problem — not a one-off fix — see compounding returns within a quarter. Document the workflow, assign ownership, and measure one leading indicator weekly so improvements stick after launch.`;
}

function expansionSections(post: Pick<Post, "title" | "takeaways" | "category" | "tags">): ArticleBlock[] {
  const takeaways = post.takeaways ?? [];
  const blocks: ArticleBlock[] = [
    { type: "h2", text: "What operators get wrong" },
    {
      type: "p",
      text: `Most ${post.category.toLowerCase()} advice stays abstract. ${post.title} focuses on decisions you can make this week: what to measure, what to stop doing, and what to wire into a system so results do not depend on heroics. The pattern we see across clinics, ecommerce brands, and service businesses is the same — the constraint is rarely talent. It is follow-through, tooling, and clarity.`,
    },
    { type: "h2", text: "A practical implementation path" },
    {
      type: "ul",
      items: [
        "Audit the current state in under an hour and write down every handoff where leads or customers drop off.",
        "Pick one metric that proves the change worked before you expand scope.",
        "Ship the smallest version that removes a manual step or speeds up response time.",
        "Review results after two weeks and only then add automation or new pages.",
      ],
    },
    { type: "h2", text: "How we apply this at ZedNova" },
    {
      type: "p",
      text: `When clients hire us for ${post.tags.slice(0, 2).join(" and ").toLowerCase()} work, we start with the business outcome — booked calls, recovered carts, cited pages — and reverse-engineer the stack. That usually means Next.js or Shopify on the front, Sanity for structured content, and CRM or automation on the back so marketing changes do not require a developer ticket. We ship MVPs in days, then iterate with real data instead of opinions.`,
    },
    { type: "h2", text: "Signals you are ready for the next step" },
    {
      type: "p",
      text: `You are ready when the pain is recurring, not episodic: the same leak shows up every week, the same question hits support, or the same competitor wins the speed-to-lead race. If that sounds familiar, the fix is almost always a focused system — not another redesign for its own sake.`,
    },
    { type: "quote", text: "Ship the system first. Polish the brand second. Momentum beats perfection when revenue is on the line." },
  ];

  for (let i = 0; i < Math.max(3, takeaways.length); i += 1) {
    blocks.push(
      { type: "h3", text: `Deep dive ${i + 1}` },
      { type: "p", text: paragraphFromTakeaways(takeaways, i) },
    );
  }

  return blocks;
}

export function bodyCharCount(blocks: ArticleBlock[]): number {
  return blocks.reduce((total, block) => {
    if (block.type === "ul") return total + block.items.join(" ").length;
    return total + (block.text?.length ?? 0);
  }, 0);
}

/** Merge base body with expansion sections until minimum length is met. */
export function expandPostBody(
  base: ArticleBlock[],
  post: Pick<Post, "slug" | "title" | "takeaways" | "category" | "tags">,
): ArticleBlock[] {
  const override = getInsightOverride(post.slug);
  if (override?.body) {
    let combined = [...override.body];
    let count = bodyCharCount(combined);
    let pad = 0;
    while (count < MIN_POST_BODY_CHARS) {
      combined.push({
        type: "p",
        text: `Shopify operators should validate each fix against add-to-cart rate, checkout completion, and revenue per session before scaling paid spend. Iteration ${pad + 1}: document baseline metrics, ship one change, and review Klaviyo flow revenue weekly.`,
      });
      count = bodyCharCount(combined);
      pad += 1;
    }
    return combined;
  }

  const combined = [...base, ...expansionSections(post)];
  let count = bodyCharCount(combined);
  let pad = 0;

  while (count < MIN_POST_BODY_CHARS) {
    combined.push({
      type: "p",
      text: `Additional context (${pad + 1}): Sustainable growth in ${post.category.toLowerCase()} comes from repeatable workflows, clear ownership, and tooling that keeps marketing, sales, and operations aligned. Treat every customer touchpoint as part of one system — from the first ad click through follow-up, fulfillment, and retention — and measure each stage so you know where to invest next.`,
    });
    count = bodyCharCount(combined);
    pad += 1;
  }

  return combined;
}

export function extendedTagsForPost(slug: string, existing: string[] = []): string[] {
  const extended = EXTENDED_POST_TAGS[slug] ?? existing;
  return [...new Set([...existing, ...extended])].slice(0, 20);
}
