import { defineArrayMember, defineField, defineType } from "sanity";

/** Standalone Open Graph / Twitter fields (optional override alongside seoFields). */
export const openGraphFields = defineType({
  name: "openGraphFields",
  title: "Open Graph & Social",
  type: "object",
  fields: [
    defineField({ name: "ogTitle", type: "string", title: "OG title" }),
    defineField({ name: "ogDescription", type: "text", rows: 3, title: "OG description" }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "OG image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({
      name: "ogType",
      type: "string",
      options: { list: ["website", "article", "product"], layout: "radio" },
      initialValue: "website",
    }),
    defineField({ name: "twitterTitle", type: "string", title: "Twitter title" }),
    defineField({ name: "twitterDescription", type: "text", rows: 3, title: "Twitter description" }),
    defineField({
      name: "twitterImage",
      type: "image",
      title: "Twitter image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({
      name: "twitterCardType",
      type: "string",
      title: "Twitter card type",
      options: { list: ["summary", "summary_large_image"], layout: "radio" },
      initialValue: "summary_large_image",
    }),
  ],
});

export const bulletItem = defineType({
  name: "bulletItem",
  title: "Bullet item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "icon", type: "string", title: "Icon key" }),
    defineField({ name: "priority", type: "number" }),
  ],
});

export const aeoAnswerBlock = defineType({
  name: "aeoAnswerBlock",
  title: "AEO answer block",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string" }),
    defineField({
      name: "shortAnswer",
      type: "text",
      rows: 4,
      description: "40–80 word direct answer for AI search and featured snippets.",
    }),
    defineField({
      name: "detailedAnswer",
      type: "array",
      title: "Detailed answer",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "relatedFaqs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({
      name: "relatedServices",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      of: [{ type: "reference", to: [{ type: "industry" }, { type: "industryParent" }] }],
    }),
  ],
});

export const inlineFaq = defineType({
  name: "inlineFaq",
  title: "Inline FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "shortAnswer", type: "text", rows: 3 }),
    defineField({
      name: "answer",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "schemaEnabled", type: "boolean", initialValue: true }),
  ],
});

export const schemaMarkupFields = defineType({
  name: "schemaMarkupFields",
  title: "Schema markup",
  type: "object",
  fields: [
    defineField({
      name: "schemaType",
      type: "string",
      options: {
        list: [
          "BlogPosting",
          "Article",
          "TechArticle",
          "HowTo",
          "FAQPage",
          "Service",
          "Product",
          "CollectionPage",
        ],
      },
    }),
    defineField({ name: "enableArticleSchema", type: "boolean", initialValue: true }),
    defineField({ name: "enableFaqSchema", type: "boolean", initialValue: true }),
    defineField({ name: "enableBreadcrumbSchema", type: "boolean", initialValue: true }),
    defineField({ name: "enableServiceSchema", type: "boolean", initialValue: true }),
    defineField({ name: "enableProductSchema", type: "boolean", initialValue: true }),
    defineField({ name: "enableOrganizationSchema", type: "boolean", initialValue: true }),
    defineField({ name: "enableCollectionPageSchema", type: "boolean", initialValue: true }),
    defineField({ name: "serviceType", type: "string" }),
    defineField({
      name: "areaServed",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "providerName", type: "string" }),
    defineField({ name: "priceRange", type: "string" }),
    defineField({ name: "applicationCategory", type: "string" }),
    defineField({ name: "operatingSystem", type: "string" }),
    defineField({ name: "brand", type: "string" }),
    defineField({ name: "sku", type: "string" }),
    defineField({ name: "priceCurrency", type: "string", initialValue: "USD" }),
    defineField({
      name: "availability",
      type: "string",
      options: { list: ["InStock", "PreOrder", "OutOfStock"] },
    }),
  ],
});

export const calloutBlock = defineType({
  name: "calloutBlock",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: { list: ["info", "warning", "tip", "note"] },
      initialValue: "info",
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "body", type: "text", rows: 4 }),
  ],
});

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code block",
  type: "object",
  fields: [
    defineField({ name: "language", type: "string" }),
    defineField({ name: "code", type: "text", rows: 8 }),
  ],
});

export const tableBlock = defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({ name: "caption", type: "string", title: "Caption" }),
    defineField({
      name: "hasHeaderRow",
      type: "boolean",
      title: "First row is header",
      initialValue: true,
    }),
    defineField({
      name: "rows",
      type: "array",
      title: "Rows",
      of: [
        {
          type: "object",
          name: "tableRow",
          fields: [
            defineField({
              name: "cells",
              type: "array",
              of: [{ type: "string" }],
              validation: (r) => r.required().min(1),
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }: { cells?: string[] }) {
              return { title: (cells ?? []).join(" · ") || "Empty row" };
            },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { caption: "caption", rows: "rows" },
    prepare({ caption, rows }: { caption?: string; rows?: unknown[] }) {
      return {
        title: caption || "Table",
        subtitle: `${rows?.length ?? 0} row(s)`,
      };
    },
  },
});

export const richTextMembers = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
        { title: "Underline", value: "underline" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "External link",
          fields: [
            defineField({ name: "href", type: "url", validation: (r) => r.required() }),
            defineField({ name: "openInNewTab", type: "boolean", initialValue: false }),
            defineField({ name: "rel", type: "string" }),
          ],
        },
        {
          name: "internalLink",
          type: "object",
          title: "Internal link",
          fields: [
            defineField({
              name: "reference",
              type: "reference",
              to: [
                { type: "post" },
                { type: "service" },
                { type: "industry" },
                { type: "industryParent" },
                { type: "caseStudy" },
                { type: "product" },
                { type: "migration" },
              ],
            }),
          ],
        },
      ],
    },
  }),
  defineArrayMember({ type: "mediaAsset" }),
  defineArrayMember({ type: "calloutBlock" }),
  defineArrayMember({ type: "codeBlock" }),
  defineArrayMember({ type: "tableBlock" }),
  defineArrayMember({ type: "inlineFaq" }),
];

export const extendedObjectTypes = [
  openGraphFields,
  bulletItem,
  aeoAnswerBlock,
  inlineFaq,
  schemaMarkupFields,
  calloutBlock,
  codeBlock,
  tableBlock,
];
