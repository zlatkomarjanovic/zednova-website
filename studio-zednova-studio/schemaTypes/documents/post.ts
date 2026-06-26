import { defineField, defineType } from "sanity";
import { richTextMembers } from "../objects/extended";
import {
  flatOpenGraphFields,
  flatPrimaryCtaFields,
  flatQuickAnswerFields,
  flatSchemaFields,
  flatSecondaryCtaFields,
  flatSeoFields,
} from "../shared/flatFields";

export const post = defineType({
  name: "post",
  title: "Insight / Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "body", title: "Body" },
    { name: "aeo", title: "AEO" },
    { name: "relationships", title: "Relationships" },
    { name: "references", title: "References" },
    { name: "conversion", title: "Conversion" },
    { name: "editorial", title: "Editorial" },
    { name: "seo", title: "SEO" },
    { name: "og", title: "Social" },
    { name: "schema", title: "Schema" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    /* ---- Core content ---- */
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "oneSentenceSummary",
      type: "string",
      title: "One-sentence summary",
      group: "aeo",
      description: "Direct AEO-friendly summary for AI search.",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "insightCategory" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "updatedAt", type: "datetime", group: "content" }),
    defineField({
      name: "readTime",
      type: "number",
      title: "Reading time (minutes)",
      group: "content",
      description: "Estimated read time shown on cards and article header.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "status",
      type: "string",
      group: "settings",
      options: {
        list: ["Draft", "Published", "Needs Review", "Archived"],
        layout: "radio",
      },
      initialValue: "Published",
    }),
    defineField({
      name: "difficulty",
      type: "string",
      group: "content",
      options: { list: ["Beginner", "Intermediate", "Advanced"] },
    }),
    defineField({
      name: "contentType",
      type: "string",
      group: "content",
      options: {
        list: [
          "Insight",
          "Guide",
          "Checklist",
          "Comparison",
          "Case breakdown",
          "Opinion",
          "Tutorial",
          "Resource",
        ],
      },
      initialValue: "Insight",
    }),
    defineField({ name: "featured", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "pinned", type: "boolean", group: "settings", initialValue: false }),
    defineField({
      name: "accent",
      type: "string",
      title: "Accent color (hex)",
      group: "content",
      initialValue: "#1c1917",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Featured image",
      description: "Main post image used on cards, hero, Open Graph, and schema.",
      options: { hotspot: true },
      group: "content",
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", description: "Describe the image for SEO and accessibility." }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
        defineField({ name: "credit", type: "string", title: "Photo credit" }),
      ],
    }),
    defineField({
      name: "coverImageUrl",
      type: "url",
      title: "Cover image URL (legacy / external)",
      group: "content",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      group: "seo",
      options: { layout: "tags" },
    }),

    /* ---- Body ---- */
    defineField({
      name: "articleBlocks",
      type: "array",
      of: [{ type: "articleBlock" }],
      title: "Article body (structured blocks — legacy)",
      group: "body",
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Body (Portable Text)",
      group: "body",
      of: richTextMembers,
    }),
    defineField({
      name: "tableOfContentsEnabled",
      type: "boolean",
      group: "body",
      initialValue: true,
    }),
    defineField({
      name: "takeaways",
      type: "array",
      of: [{ type: "string" }],
      title: "Key takeaways (plain)",
      group: "aeo",
    }),
    defineField({
      name: "keyTakeaways",
      type: "array",
      of: [{ type: "bulletItem" }],
      title: "Key takeaways (rich)",
      group: "aeo",
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [{ type: "contentSection" }],
      group: "body",
    }),

    /* ---- FAQ ---- */
    defineField({
      name: "faqs",
      type: "array",
      of: [{ type: "articleFaq" }],
      title: "Inline FAQ (legacy)",
      group: "aeo",
      description: "Inline FAQ items. Also see FAQ references below.",
    }),
    defineField({
      name: "inlineFaqs",
      type: "array",
      of: [{ type: "inlineFaq" }],
      title: "Inline FAQ (rich)",
      group: "aeo",
    }),
    defineField({
      name: "faqReferences",
      type: "array",
      title: "FAQ references",
      group: "aeo",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
      description: "Link to reusable FAQ documents.",
    }),

    /* ---- AEO ---- */
    defineField({ name: "quickAnswer", type: "aeoAnswerBlock", group: "aeo" }),
    defineField({
      name: "searchIntent",
      type: "string",
      group: "aeo",
      options: {
        list: ["Informational", "Commercial", "Transactional", "Navigational"],
      },
    }),
    defineField({
      name: "targetAudience",
      type: "array",
      of: [{ type: "string" }],
      group: "aeo",
      options: { layout: "tags" },
    }),
    defineField({
      name: "painPoints",
      type: "array",
      of: [{ type: "string" }],
      group: "aeo",
      options: { layout: "tags" },
    }),
    defineField({
      name: "searchQuestions",
      type: "array",
      of: [{ type: "string" }],
      title: "Search questions",
      group: "aeo",
    }),
    defineField({
      name: "entitiesMentioned",
      type: "array",
      of: [{ type: "string" }],
      group: "aeo",
      options: { layout: "tags" },
    }),
    defineField({
      name: "aiSummary",
      type: "text",
      rows: 4,
      group: "aeo",
    }),
    defineField({
      name: "llmSnippet",
      type: "text",
      rows: 4,
      title: "LLM snippet",
      group: "aeo",
    }),
    defineField({
      name: "glossaryTerms",
      type: "array",
      group: "aeo",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "term", type: "string" }),
            defineField({ name: "definition", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "sources",
      title: "Sources & references",
      type: "array",
      group: "references",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", type: "url", validation: (r) => r.required() }),
            defineField({ name: "publisher", type: "string" }),
            defineField({ name: "note", type: "string", title: "Optional note" }),
          ],
        },
      ],
    }),
    defineField({
      name: "implementationTable",
      title: "Implementation table",
      type: "array",
      group: "aeo",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "fix", type: "string", title: "Fix" }),
            defineField({ name: "problem", type: "string", title: "Problem" }),
            defineField({ name: "change", type: "string", title: "What to change" }),
            defineField({ name: "metric", type: "string", title: "Metric" }),
            defineField({ name: "tool", type: "string", title: "Tool" }),
          ],
        },
      ],
    }),
    defineField({
      name: "checklists",
      type: "array",
      group: "aeo",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({
              name: "items",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),

    /* ---- Relationships ---- */
    defineField({
      name: "relatedServices",
      type: "array",
      title: "Related services",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      title: "Related industries",
      group: "relationships",
      of: [
        { type: "reference", to: [{ type: "industry" }, { type: "industryParent" }] },
      ],
    }),
    defineField({
      name: "relatedMigrations",
      type: "array",
      title: "Related migrations",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "migration" }] }],
    }),
    defineField({
      name: "relatedCustomSoftware",
      type: "array",
      title: "Related custom software",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "customSoftware" }] }],
    }),
    defineField({
      name: "relatedProducts",
      type: "array",
      title: "Related products",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      title: "Related case studies",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "relatedPortfolioProjects",
      type: "array",
      title: "Related portfolio projects",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "portfolioProject" }] }],
    }),
    defineField({
      name: "relatedPosts",
      type: "array",
      title: "Related posts (manual)",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),

    /* ---- Conversion ---- */
    defineField({ name: "primaryCta", type: "ctaBlock", group: "conversion" }),
    defineField({ name: "secondaryCta", type: "ctaBlock", group: "conversion" }),
    defineField({ name: "recommendedNextStep", type: "ctaBlock", group: "conversion" }),
    defineField({
      name: "leadMagnet",
      type: "object",
      group: "conversion",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "buttonLabel", type: "string" }),
        defineField({ name: "href", type: "string" }),
      ],
    }),
    defineField({
      name: "newsletterCta",
      type: "object",
      group: "conversion",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "buttonLabel", type: "string" }),
      ],
    }),

    /* ---- Editorial ---- */
    defineField({
      name: "reviewedBy",
      type: "reference",
      to: [{ type: "author" }, { type: "teamMember" }],
      group: "editorial",
    }),
    defineField({ name: "factChecked", type: "boolean", group: "editorial" }),
    defineField({ name: "lastReviewedAt", type: "datetime", group: "editorial" }),
    defineField({ name: "notes", type: "text", rows: 4, title: "Editorial notes", group: "editorial", description: "Internal only — not shown on the website." }),
    defineField({ name: "editorialNotes", type: "text", rows: 4, title: "Editorial notes (alias)", group: "editorial" }),
    defineField({ name: "noIndex", type: "boolean", title: "No index override", group: "editorial" }),
    defineField({ name: "oldUrl", type: "url", group: "editorial" }),
    defineField({
      name: "redirectFrom",
      type: "array",
      of: [{ type: "string" }],
      group: "editorial",
    }),

    /* Flat SEO / OG / Schema / AEO / CTA fields */
    ...flatSeoFields,
    ...flatOpenGraphFields,
    ...flatQuickAnswerFields,
    ...flatSchemaFields,
    ...flatPrimaryCtaFields,
    ...flatSecondaryCtaFields,
    defineField({ name: "leadMagnetTitle", type: "string", title: "Lead magnet title", group: "conversion" }),
    defineField({ name: "leadMagnetDescription", type: "text", rows: 3, group: "conversion" }),
    defineField({ name: "leadMagnetButtonLabel", type: "string", group: "conversion" }),
    defineField({ name: "leadMagnetHref", type: "string", group: "conversion" }),

    /* Nested SEO / OG / Schema */
    defineField({ name: "seo", type: "seoFields", group: "seo" }),
    defineField({ name: "openGraph", type: "openGraphFields", group: "og" }),
    defineField({
      name: "schemaMarkup",
      type: "schemaMarkupFields",
      group: "schema",
    }),
    defineField({
      name: "primaryImage",
      type: "mediaAsset",
      title: "Primary image (schema)",
      group: "schema",
    }),
  ],
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      status: "status",
      media: "coverImage",
    },
    prepare({ title, subtitle, status, media }) {
      return {
        title,
        subtitle: [subtitle, status].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
