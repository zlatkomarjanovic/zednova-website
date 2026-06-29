import { defineField, defineType } from "sanity";

export const insightCategory = defineType({
  name: "insightCategory",
  title: "Insight category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon key",
    }),
    defineField({
      name: "colorLabel",
      type: "string",
      title: "Color label",
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Order",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      type: "seoFields",
      title: "SEO",
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title" } },
});
