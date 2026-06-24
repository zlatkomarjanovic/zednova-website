import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string", group: "content" }),
    defineField({
      name: "bio",
      type: "array",
      of: [{ type: "text" }],
      title: "Bio paragraphs",
      group: "content",
    }),
    defineField({ name: "shortBio", type: "text", rows: 2, group: "content" }),
    defineField({ name: "linkedin", type: "url", group: "content" }),
    defineField({ name: "twitter", type: "url", group: "content" }),
    defineField({ name: "upwork", type: "url", group: "content" }),
    defineField({ name: "website", type: "url", group: "content" }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true }, group: "content" }),
    defineField({ name: "avatarUrl", type: "url", title: "Avatar URL (legacy)", group: "content" }),
    defineField({
      name: "seo",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
