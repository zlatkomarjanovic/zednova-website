import type { ArticleBlock } from "@/lib/types";
import type { Post } from "@/lib/types";
import { getInsightOverride } from "./insight-overrides";

/** Minimum article body length (characters) for insights posts. */
export const MIN_POST_BODY_CHARS = 6000;

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

export function bodyCharCount(blocks: ArticleBlock[]): number {
  return blocks.reduce((total, block) => {
    if (block.type === "ul") return total + block.items.join(" ").length;
    if (block.type === "table") {
      return total + block.rows.flat().join(" ").length;
    }
    return total + (block.text?.length ?? 0);
  }, 0);
}

/** Merge base body with expansion sections until minimum length is met (Sanity enrich only). */
export function expandPostBody(
  base: ArticleBlock[],
  post: Pick<Post, "slug" | "title" | "takeaways" | "category" | "tags">,
): ArticleBlock[] {
  const override = getInsightOverride(post.slug);
  if (override?.body) return override.body;

  return [...base];
}

export function extendedTagsForPost(slug: string, existing: string[] = []): string[] {
  const extended = EXTENDED_POST_TAGS[slug] ?? existing;
  return [...new Set([...existing, ...extended])].slice(0, 20);
}
