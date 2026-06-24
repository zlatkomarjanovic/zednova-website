import { defineField, defineType } from "sanity";

export const insightCategory = defineType({
  name: "insightCategory",
  title: "Insight category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "icon", type: "string", title: "Icon key" }),
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
  preview: { select: { title: "title", media: "coverImage" } },
});
