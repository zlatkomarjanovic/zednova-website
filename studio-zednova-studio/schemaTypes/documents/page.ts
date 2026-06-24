import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Static page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
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
      name: "path",
      type: "string",
      title: "Frontend path",
      group: "content",
      description: "e.g. /about, /contact, /services",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroHeadline",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "heroSubhead",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "seo",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: { select: { title: "title", subtitle: "path" } },
});
