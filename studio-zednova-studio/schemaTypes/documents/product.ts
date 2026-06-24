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
      name: "longDescription",
      type: "array",
      title: "Long description (Portable Text)",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "features",
      type: "array",
      group: "content",
      of: [{ type: "featureBullet" }],
      title: "Features (rich)",
    }),
    defineField({
      name: "featureList",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      title: "Features (plain bullets)",
    }),
    defineField({
      name: "status",
      type: "string",
      group: "content",
      options: { list: productStatuses },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),
    defineField({
      name: "resourceFile",
      type: "file",
      title: "Resource file (PDF, zip…)",
      group: "content",
      description: "For downloadable freebies / lead magnets.",
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      title: "External URL",
      group: "content",
      description: "For SaaS products that live on their own domain.",
    }),

    /* Pricing */
    defineField({
      name: "pricingTiers",
      type: "array",
      title: "Price tiers",
      group: "pricing",
      of: [{ type: "priceTier" }],
    }),
    defineField({
      name: "startingPrice",
      type: "number",
      title: "Starting price (USD)",
      group: "pricing",
    }),
    defineField({ name: "ctaLabel", type: "string", group: "pricing" }),
    defineField({ name: "ctaHref", type: "string", title: "CTA link", group: "pricing" }),

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
  preview: {
    select: { title: "title", subtitle: "type", media: "coverImage" },
  },
});
