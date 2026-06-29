import { defineField, defineType } from "sanity";

const productTypes = [
  { title: "Software", value: "software" },
  { title: "Tool", value: "tool" },
  { title: "PDF", value: "pdf" },
  { title: "Guide", value: "guide" },
  { title: "Checklist", value: "checklist" },
  { title: "Template", value: "template" },
  { title: "Freebie", value: "freebie" },
  { title: "Lead magnet", value: "lead-magnet" },
];

const productStatuses = [
  { title: "Live", value: "live" },
  { title: "Available", value: "available" },
  { title: "Coming soon", value: "coming-soon" },
  { title: "In development", value: "in-development" },
  { title: "Free", value: "free" },
];

export const product = defineType({
  name: "product",
  title: "Product / Resource",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "pricing", title: "Pricing" },
    { name: "relationships", title: "Relationships" },
    { name: "seo", title: "SEO" },
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
      name: "type",
      type: "string",
      title: "Resource type",
      group: "content",
      options: { list: productTypes },
      initialValue: "software",
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", type: "string", group: "content" }),
    defineField({ name: "description", type: "text", rows: 4, group: "content" }),
    defineField({
      name: "features",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featureList",
      type: "array",
      group: "content",
      of: [{ type: "featureBullet" }],
    }),
    defineField({
      name: "status",
      type: "string",
      group: "content",
      options: { list: productStatuses },
      initialValue: "live",
    }),
    defineField({
      name: "pricingTiers",
      type: "array",
      group: "pricing",
      of: [{ type: "priceTier" }],
    }),
    defineField({ name: "startingPrice", type: "number", group: "pricing" }),
    defineField({ name: "ctaLabel", type: "string", group: "content" }),
    defineField({ name: "ctaHref", type: "string", group: "content" }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "resourceFile",
      type: "file",
      title: "Downloadable file",
      group: "content",
    }),
    defineField({ name: "externalUrl", type: "url", group: "content" }),
    defineField({
      name: "relatedServices",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "industry" }, { type: "industryParent" }] }],
    }),
    defineField({
      name: "relatedInsights",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
    defineField({ name: "seo", type: "seoFields", group: "seo" }),
    defineField({
      name: "order",
      type: "number",
      group: "content",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "type", media: "coverImage" } },
});
