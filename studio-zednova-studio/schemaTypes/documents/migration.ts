import { defineField, defineType } from "sanity";

export const migration = defineType({
  name: "migration",
  title: "Migration",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      title: "Hero description",
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroSubhead", type: "text", rows: 3 }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "shortDescription" } },
});
