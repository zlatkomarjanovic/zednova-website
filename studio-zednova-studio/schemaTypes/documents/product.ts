import { defineField, defineType } from "sanity";

const productStatuses = [
  { title: "Live", value: "live" },
  { title: "Available", value: "available" },
  { title: "Coming soon", value: "coming-soon" },
  { title: "In development", value: "in-development" },
  { title: "Free", value: "free" },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "status",
      type: "string",
      options: { list: productStatuses },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "ctaLabel", type: "string" }),
    defineField({ name: "ctaHref", type: "url" }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "status" } },
});
