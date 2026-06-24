import { defineField, defineType } from "sanity";

export const insightCategory = defineType({
  name: "insightCategory",
  title: "Insight category",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 3, group: "content" }),
    defineField({ name: "icon", type: "string", title: "Icon key", group: "content" }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),
    defineField({
      name: "order",
      type: "number",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seo",
      type: "seoFields",
      group: "seo",
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", media: "coverImage" } },
});
