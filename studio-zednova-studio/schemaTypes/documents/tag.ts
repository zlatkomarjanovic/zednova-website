import { defineField, defineType } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Tag",
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
    defineField({
      name: "seo",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: { select: { title: "title" } },
});
