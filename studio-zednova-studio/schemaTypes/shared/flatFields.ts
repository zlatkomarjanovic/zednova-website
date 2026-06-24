import { defineField } from "sanity";

/** Flat SEO fields with helper text. Spread into document fields[]. */
export const flatSeoFields = [
  defineField({
    name: "seoTitle",
    type: "string",
    title: "SEO title",
    group: "seo",
    description: "Custom title for Google search results. Recommended 45–60 characters. Falls back to the document title.",
    validation: (r) => r.max(70).warning("May truncate in search results above ~60 chars"),
  }),
  defineField({
    name: "seoDescription",
    type: "text",
    rows: 3,
    title: "SEO description",
    group: "seo",
    description: "Meta description shown in search results. Recommended 140–160 characters. Falls back to excerpt/summary.",
    validation: (r) => r.max(170).warning("May truncate above ~160 chars"),
  }),
  defineField({
    name: "canonicalUrl",
    type: "url",
    title: "Canonical URL",
    group: "seo",
    description: "Optional override. Leave blank to use the default page URL (e.g. /services/ai-lead-site).",
  }),
  defineField({
    name: "focusKeyword",
    type: "string",
    title: "Focus keyword",
    group: "seo",
    description: "Primary keyword this page should rank for. Used in JSON-LD keywords.",
  }),
  defineField({
    name: "secondaryKeywords",
    type: "array",
    of: [{ type: "string" }],
    title: "Secondary keywords",
    group: "seo",
    description: "Supporting keywords. Added to JSON-LD keywords.",
    options: { layout: "tags" },
  }),
  defineField({
    name: "searchTags",
    type: "array",
    of: [{ type: "string" }],
    title: "Search tags",
    group: "seo",
    description: "Internal tags for site search, filtering, AEO entity mapping, and content clustering. Not shown publicly.",
    options: { layout: "tags" },
  }),
  defineField({
    name: "robotsIndex",
    type: "boolean",
    title: "Allow indexing",
    group: "seo",
    description: "When off, adds noindex to this page. Default: true.",
    initialValue: true,
  }),
  defineField({
    name: "robotsFollow",
    type: "boolean",
    title: "Allow following links",
    group: "seo",
    description: "When off, adds nofollow. Default: true.",
    initialValue: true,
  }),
];

/** Flat Open Graph / Twitter fields. */
export const flatOpenGraphFields = [
  defineField({
    name: "openGraphTitle",
    type: "string",
    title: "Open Graph title",
    group: "og",
    description: "Title shown when sharing on Facebook, LinkedIn, Slack. Falls back to SEO title.",
  }),
  defineField({
    name: "openGraphDescription",
    type: "text",
    rows: 3,
    title: "Open Graph description",
    group: "og",
    description: "Description for social share previews. Falls back to SEO description.",
  }),
  defineField({
    name: "openGraphImage",
    type: "image",
    title: "Open Graph image",
    group: "og",
    description: "Recommended 1200×630. Used for Facebook, LinkedIn, Slack previews. Falls back to cover image.",
    options: { hotspot: true },
    fields: [
      defineField({ name: "alt", type: "string", title: "Alt text", description: "Describe the image for accessibility." }),
      defineField({ name: "caption", type: "string", title: "Caption" }),
    ],
  }),
  defineField({
    name: "twitterTitle",
    type: "string",
    title: "Twitter / X title",
    group: "og",
    description: "Title for X/Twitter card. Falls back to OG title.",
  }),
  defineField({
    name: "twitterDescription",
    type: "text",
    rows: 3,
    title: "Twitter / X description",
    group: "og",
    description: "Description for X/Twitter card. Falls back to OG description.",
  }),
  defineField({
    name: "twitterImage",
    type: "image",
    title: "Twitter / X image",
    group: "og",
    description: "Image for X/Twitter card. Falls back to OG image.",
    options: { hotspot: true },
    fields: [
      defineField({ name: "alt", type: "string", title: "Alt text" }),
    ],
  }),
];

/** Flat primary CTA fields. */
export const flatPrimaryCtaFields = [
  defineField({
    name: "primaryCtaTitle",
    type: "string",
    title: "Primary CTA title",
    group: "conversion",
    description: "Headline for the main call-to-action section on this page.",
  }),
  defineField({
    name: "primaryCtaDescription",
    type: "text",
    rows: 3,
    title: "Primary CTA description",
    group: "conversion",
    description: "Supporting copy under the CTA title.",
  }),
  defineField({
    name: "primaryCtaLabel",
    type: "string",
    title: "Primary CTA button label",
    group: "conversion",
    description: 'Button text, e.g. "Start a project", "Book a call".',
  }),
  defineField({
    name: "primaryCtaHref",
    type: "string",
    title: "Primary CTA URL",
    group: "conversion",
    description: "Button destination. Relative path (/contact) or full URL.",
  }),
];

/** Flat secondary CTA fields. */
export const flatSecondaryCtaFields = [
  defineField({
    name: "secondaryCtaTitle",
    type: "string",
    title: "Secondary CTA title",
    group: "conversion",
  }),
  defineField({
    name: "secondaryCtaDescription",
    type: "text",
    rows: 3,
    title: "Secondary CTA description",
    group: "conversion",
  }),
  defineField({
    name: "secondaryCtaLabel",
    type: "string",
    title: "Secondary CTA button label",
    group: "conversion",
  }),
  defineField({
    name: "secondaryCtaHref",
    type: "string",
    title: "Secondary CTA URL",
    group: "conversion",
  }),
];

/** Flat consultation CTA fields (services, migrations). */
export const flatConsultationCtaFields = [
  defineField({
    name: "consultationCtaTitle",
    type: "string",
    title: "Consultation CTA title",
    group: "conversion",
  }),
  defineField({
    name: "consultationCtaDescription",
    type: "text",
    rows: 3,
    title: "Consultation CTA description",
    group: "conversion",
  }),
  defineField({
    name: "consultationCtaLabel",
    type: "string",
    title: "Consultation CTA button label",
    group: "conversion",
  }),
  defineField({
    name: "consultationCtaHref",
    type: "string",
    title: "Consultation CTA URL",
    group: "conversion",
  }),
];

/** Flat quick answer (AEO) fields. */
export const flatQuickAnswerFields = [
  defineField({
    name: "quickAnswerQuestion",
    type: "string",
    title: "Quick answer question",
    group: "aeo",
    description: "Direct search-style question this content answers. Used for AI search and featured snippets.",
  }),
  defineField({
    name: "quickAnswerShort",
    type: "text",
    rows: 4,
    title: "Quick answer (short)",
    group: "aeo",
    description: "40–80 word direct answer for Google snippets, ChatGPT, Perplexity, Claude, and AI Overviews.",
  }),
  defineField({
    name: "quickAnswerDetailed",
    type: "array",
    title: "Quick answer (detailed)",
    group: "aeo",
    description: "Longer answer section in rich text.",
    of: [{ type: "block" }],
  }),
];

/** Flat schema markup toggle fields. */
export const flatSchemaFields = [
  defineField({
    name: "schemaType",
    type: "string",
    title: "Schema type",
    group: "schema",
    description: "Selects the JSON-LD @type for this page.",
    options: {
      list: ["BlogPosting", "Article", "TechArticle", "HowTo", "FAQPage", "Service", "Product", "CollectionPage"],
    },
  }),
  defineField({
    name: "enableArticleSchema",
    type: "boolean",
    title: "Enable Article / BlogPosting schema",
    group: "schema",
    description: "Generates Article or BlogPosting JSON-LD.",
    initialValue: true,
  }),
  defineField({
    name: "enableFaqSchema",
    type: "boolean",
    title: "Enable FAQPage schema",
    group: "schema",
    description: "Generates FAQPage JSON-LD from referenced and inline FAQs.",
    initialValue: true,
  }),
  defineField({
    name: "enableBreadcrumbSchema",
    type: "boolean",
    title: "Enable BreadcrumbList schema",
    group: "schema",
    description: "Generates BreadcrumbList JSON-LD from the page breadcrumb trail.",
    initialValue: true,
  }),
  defineField({
    name: "enableServiceSchema",
    type: "boolean",
    title: "Enable Service schema",
    group: "schema",
    description: "Generates Service JSON-LD.",
    initialValue: true,
  }),
  defineField({
    name: "enableProductSchema",
    type: "boolean",
    title: "Enable Product schema",
    group: "schema",
    description: "Generates Product JSON-LD.",
    initialValue: true,
  }),
  defineField({
    name: "enableCollectionPageSchema",
    type: "boolean",
    title: "Enable CollectionPage schema",
    group: "schema",
    initialValue: true,
  }),
  defineField({
    name: "enableSoftwareApplicationSchema",
    type: "boolean",
    title: "Enable SoftwareApplication schema",
    group: "schema",
    initialValue: true,
  }),
  defineField({
    name: "schemaImage",
    type: "image",
    title: "Schema image",
    group: "schema",
    description: "Image used in JSON-LD. Falls back to cover/hero image.",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
  }),
];

/** Flat featured/priority settings fields. */
export const flatSettingsFields = [
  defineField({
    name: "featured",
    type: "boolean",
    title: "Featured",
    group: "settings",
    description: "Marks this item as featured for homepage and listing highlights.",
    initialValue: false,
  }),
  defineField({
    name: "priority",
    type: "number",
    title: "Priority",
    group: "settings",
    description: "Sort order. Lower numbers appear first.",
  }),
];
