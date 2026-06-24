import { defineField, defineType } from "sanity";

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Portfolio project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "client", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "summary",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", type: "url", title: "Live project URL" }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)" }),
    defineField({ name: "imageAlt", type: "string", title: "Cover alt text" }),
    defineField({ name: "videoUrl", type: "url", title: "Hover video URL" }),
    defineField({
      name: "accent",
      type: "string",
      initialValue: "#1c1917",
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Websites", "SaaS", "Real estate", "Nonprofit"],
      },
    }),
    defineField({ name: "logo", type: "portfolioLogo" }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
