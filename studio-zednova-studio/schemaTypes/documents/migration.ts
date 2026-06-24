import { defineField, defineType } from "sanity";

export const migration = defineType({
  name: "migration",
  title: "Migration",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relationships", title: "Relationships" },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      title: "Hero description",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroHeadline", type: "string", group: "content" }),
    defineField({ name: "heroSubhead", type: "text", rows: 3, group: "content" }),
    defineField({
      name: "sourcePlatform",
      type: "string",
      title: "Source platform",
      group: "content",
      options: {
        list: ["Webflow", "WordPress", "Framer", "Wix", "Squarespace", "Shopify", "Custom", "Other"],
      },
    }),
    defineField({
      name: "targetPlatform",
      type: "string",
      title: "Target platform",
      group: "content",
      options: { list: ["Next.js", "Shopify", "Sanity", "Custom"] },
    }),
    defineField({
      name: "whatsIncluded",
      type: "array",
      title: "What's included",
      group: "content",
      of: [{ type: "featureBullet" }],
    }),
    defineField({
      name: "deliverables",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "processSteps",
      type: "array",
      group: "content",
      of: [{ type: "processStep" }],
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQ (migration-level)",
      group: "content",
      of: [{ type: "articleFaq" }],
    }),
    defineField({ name: "timeline", type: "string", group: "content" }),
    defineField({ name: "pricingSignal", type: "string", group: "content" }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),

    /* Relationships */
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
      name: "relatedInsights",
      type: "array",
      title: "Related insights / posts",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
    defineField({
      name: "relatedMigrations",
      type: "array",
      title: "Related migrations",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "migration" }] }],
    }),

    /* SEO / AEO */
    defineField({
      name: "tags",
      type: "array",
      group: "seo",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seo",
      type: "seoFields",
      group: "seo",
    }),

    defineField({
      name: "order",
      type: "number",
      group: "content",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "shortDescription" } },
});
