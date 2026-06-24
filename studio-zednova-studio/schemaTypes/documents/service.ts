import { defineField, defineType } from "sanity";

const serviceGroups = [
  { title: "Websites", value: "Websites" },
  { title: "Automation", value: "Automation" },
  { title: "AI Tools", value: "AI Tools" },
  { title: "Ecommerce", value: "Ecommerce" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "deliverables", title: "Deliverables & Pricing" },
    { name: "process", title: "Process & Results" },
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
    defineField({ name: "number", type: "string", title: "Number (01, 02…)", group: "content" }),
    defineField({
      name: "group",
      type: "string",
      group: "content",
      options: { list: serviceGroups },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string", title: "Category tag", group: "content" }),
    defineField({ name: "icon", type: "string", title: "Icon key", group: "content" }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({ name: "whatItIs", type: "text", rows: 4, group: "content" }),
    defineField({ name: "heroHeadline", type: "string", group: "content" }),
    defineField({ name: "heroSubhead", type: "text", rows: 3, group: "content" }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),

    /* Deliverables & pricing */
    defineField({
      name: "whatsIncluded",
      type: "array",
      title: "What's included (rich)",
      group: "deliverables",
      of: [{ type: "featureBullet" }],
      description: "Used by the service detail page 'What's included' grid.",
    }),
    defineField({
      name: "deliverables",
      type: "array",
      group: "deliverables",
      of: [{ type: "string" }],
      title: "Deliverables (plain bullets)",
    }),
    defineField({
      name: "idealClients",
      type: "array",
      group: "deliverables",
      of: [{ type: "string" }],
      title: "Who it's for",
    }),
    defineField({
      name: "pricingSignal",
      type: "string",
      group: "deliverables",
      title: "Pricing signal (one-line)",
    }),
    defineField({
      name: "pricingTiers",
      type: "array",
      title: "Price tiers",
      group: "deliverables",
      of: [{ type: "priceTier" }],
      description: "Optional structured pricing tiers.",
    }),
    defineField({
      name: "startingPrice",
      type: "number",
      title: "Starting price (USD)",
      group: "deliverables",
    }),
    defineField({
      name: "timeline",
      type: "string",
      group: "deliverables",
      title: "Typical timeline",
    }),

    /* Process & results */
    defineField({
      name: "processSteps",
      type: "array",
      group: "process",
      of: [{ type: "processStep" }],
    }),
    defineField({
      name: "results",
      type: "array",
      group: "process",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQ (service-level)",
      group: "process",
      of: [{ type: "articleFaq" }],
      description: "Renders with FAQPage JSON-LD on the service detail page.",
    }),

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
      name: "relatedCaseStudies",
      type: "array",
      title: "Related case studies",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
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
  preview: {
    select: { title: "title", subtitle: "group", media: "coverImage" },
  },
});
