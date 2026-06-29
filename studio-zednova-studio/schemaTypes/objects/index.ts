import { defineField, defineType } from "sanity";
import { optionalUrl } from "../shared/validation";

/* ----------------------------- SEO / OG / AEO ----------------------------- */

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO & Social",
  type: "object",
  groups: [
    { name: "meta", title: "Meta", default: true },
    { name: "og", title: "Open Graph" },
    { name: "twitter", title: "Twitter" },
    { name: "advanced", title: "Advanced" },
  ],
  fields: [
    defineField({
      name: "seoTitle",
      type: "string",
      title: "SEO title",
      group: "meta",
      description: "Overrides the document title in the <title> tag. ~60 chars.",
      validation: (r) => r.max(70).warning("May be truncated in search results"),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "Meta description",
      rows: 3,
      group: "meta",
      description: "~160 chars. Used by Google in search results.",
      validation: (r) => r.max(170).warning("May be truncated in search results"),
    }),
    defineField({
      name: "keywords",
      type: "array",
      of: [{ type: "string" }],
      title: "Keywords",
      group: "meta",
      description: "Topic keywords (used for AEO entities and JSON-LD).",
      options: { layout: "tags" },
    }),
    defineField({
      name: "focusKeyword",
      type: "string",
      title: "Focus keyword",
      group: "meta",
    }),
    defineField({
      name: "secondaryKeywords",
      type: "array",
      of: [{ type: "string" }],
      title: "Secondary keywords",
      group: "meta",
      options: { layout: "tags" },
    }),
    defineField({
      name: "searchTags",
      type: "array",
      of: [{ type: "string" }],
      title: "Search tags",
      group: "meta",
      description: "Internal search, AI retrieval, and content clustering.",
      options: { layout: "tags" },
    }),
    defineField({
      name: "seoCanonical",
      type: "url",
      title: "Canonical URL override",
      group: "advanced",
      description: "Optional. Leave blank to use the default canonical.",
      validation: optionalUrl,
    }),
    defineField({
      name: "seoNoIndex",
      type: "boolean",
      title: "No index",
      group: "advanced",
      description: "Excludes this page from search engine indices.",
      initialValue: false,
    }),
    defineField({
      name: "robotsIndex",
      type: "boolean",
      title: "Robots index",
      group: "advanced",
      initialValue: true,
    }),
    defineField({
      name: "robotsFollow",
      type: "boolean",
      title: "Robots follow",
      group: "advanced",
      initialValue: true,
    }),
    defineField({
      name: "structuredDataType",
      type: "string",
      title: "Structured data type",
      group: "advanced",
      options: {
        list: [
          "WebPage",
          "Article",
          "BlogPosting",
          "Service",
          "FAQPage",
          "Organization",
          "Product",
          "CollectionPage",
          "BreadcrumbList",
        ],
      },
    }),
    defineField({
      name: "seoHideFromLists",
      type: "boolean",
      title: "Hide from lists & sitemap",
      group: "advanced",
      description: "Excludes from internal listings, sitemap.xml, and sitemap.md.",
      initialValue: false,
    }),
    defineField({
      name: "ogTitle",
      type: "string",
      title: "Open Graph title",
      group: "og",
      description: "Overrides SEO/browser title for social shares.",
    }),
    defineField({
      name: "ogDescription",
      type: "text",
      title: "Open Graph description",
      rows: 3,
      group: "og",
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph image",
      group: "og",
      description: "Recommended 1200×630. Used for Facebook, LinkedIn, Slack previews.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({
      name: "ogType",
      type: "string",
      title: "Open Graph type",
      group: "og",
      options: {
        list: ["website", "article", "product", "profile"],
        layout: "radio",
      },
      initialValue: "website",
    }),
    defineField({
      name: "twitterCard",
      type: "string",
      title: "Twitter card type",
      group: "twitter",
      options: {
        list: ["summary", "summary_large_image"],
        layout: "radio",
      },
      initialValue: "summary_large_image",
    }),
    defineField({
      name: "twitterTitle",
      type: "string",
      title: "Twitter title",
      group: "twitter",
    }),
    defineField({
      name: "twitterDescription",
      type: "text",
      title: "Twitter description",
      rows: 3,
      group: "twitter",
    }),
    defineField({
      name: "twitterImage",
      type: "image",
      title: "Twitter image",
      group: "twitter",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({
      name: "jsonLdOverride",
      type: "text",
      title: "JSON-LD override (advanced)",
      rows: 6,
      group: "advanced",
      description: "Optional raw JSON-LD to override generated structured data. Must be valid JSON.",
    }),
  ],
});

/* ----------------------------- Reusable content objects ----------------------------- */

export const painPoint = defineType({
  name: "painPoint",
  title: "Pain point",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  fields: [
    defineField({ name: "step", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "deliverables",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "estimatedTime", type: "string" }),
  ],
});

export const articleFaq = defineType({
  name: "articleFaq",
  title: "FAQ item (inline)",
  type: "object",
  fields: [
    defineField({
      name: "id",
      type: "slug",
      title: "Anchor ID",
      description: "Used for #fragment anchors and FAQ JSON-LD @id.",
      options: { source: "question", maxLength: 60 },
    }),
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
});

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
});

export const workflowStep = defineType({
  name: "workflowStep",
  title: "Workflow step",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
});

export const timelinePhase = defineType({
  name: "timelinePhase",
  title: "Timeline phase",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "duration", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});

export const caseStudyScreenshot = defineType({
  name: "caseStudyScreenshot",
  title: "Screenshot",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      validation: (r) => r.required().min(1).warning("Alt text is required for accessibility and SEO"),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});

export const popularServiceLink = defineType({
  name: "popularServiceLink",
  title: "Popular service link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
});

export const portfolioLogo = defineType({
  name: "portfolioLogo",
  title: "Logo",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", title: "Logo image" }),
    defineField({ name: "alt", type: "string", title: "Alt text" }),
    defineField({
      name: "lightVariant",
      type: "boolean",
      title: "Light mark (tone down on light backgrounds)",
      initialValue: false,
    }),
  ],
});

export const featureBullet = defineType({
  name: "featureBullet",
  title: "Feature / What's included item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon key",
      description: "Optional icon key resolved by the front-end icon map.",
    }),
    defineField({ name: "priority", type: "number" }),
  ],
});

export const priceTier = defineType({
  name: "priceTier",
  title: "Price tier",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "amount",
      type: "number",
      title: "Price (USD)",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "currency",
      type: "string",
      initialValue: "USD",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "period",
      type: "string",
      title: "Billing period",
      options: { list: ["one-time", "monthly", "quarterly", "yearly"] },
    }),
    defineField({
      name: "features",
      type: "array",
      of: [{ type: "string" }],
      title: "Tier features",
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "ctaLabel", type: "string" }),
    defineField({ name: "ctaHref", type: "string" }),
  ],
});

export const mediaAsset = defineType({
  name: "mediaAsset",
  title: "Media asset",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageUrl",
      type: "url",
      title: "External image URL",
      description: "Used for inline images in Portable Text when no upload is attached.",
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      validation: (r) => r.warning("Alt text improves SEO and accessibility"),
    }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "credit", type: "string" }),
    defineField({ name: "sourceUrl", type: "url", title: "Source URL" }),
  ],
});

/** Uploadable icon with required alt text (migrations, custom software nav, etc.). */
export const migrationPlatformIcon = defineType({
  name: "migrationPlatformIcon",
  title: "Icon (image + alt)",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Logo",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description: "Platform name shown to screen readers (e.g. Webflow, Next.js).",
      validation: (r) => r.required().min(1).error("Alt text is required for each platform icon."),
    }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});

import { extendedObjectTypes } from "./extended";

export const objectTypes = [
  seoFields,
  painPoint,
  processStep,
  articleFaq,
  popularServiceLink,
  stat,
  workflowStep,
  timelinePhase,
  caseStudyScreenshot,
  portfolioLogo,
  featureBullet,
  priceTier,
  mediaAsset,
  migrationPlatformIcon,
  ...extendedObjectTypes,
];
