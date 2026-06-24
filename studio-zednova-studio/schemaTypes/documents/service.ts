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
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "number", type: "string", title: "Number (01, 02…)" }),
    defineField({
      name: "group",
      type: "string",
      options: { list: serviceGroups },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string", title: "Category tag" }),
    defineField({ name: "icon", type: "string", title: "Icon key" }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({ name: "whatItIs", type: "text", rows: 4 }),
    defineField({
      name: "deliverables",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "idealClients",
      type: "array",
      of: [{ type: "string" }],
      title: "Who it's for",
    }),
    defineField({
      name: "processSteps",
      type: "array",
      of: [{ type: "processStep" }],
    }),
    defineField({
      name: "results",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "pricingSignal", type: "string" }),
    defineField({ name: "timeline", type: "string" }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)" }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "group", media: "coverImage" },
  },
});
