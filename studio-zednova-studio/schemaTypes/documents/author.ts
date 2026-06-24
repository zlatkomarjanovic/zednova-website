import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "bio",
      type: "array",
      of: [{ type: "text" }],
      title: "Bio paragraphs",
    }),
    defineField({ name: "linkedin", type: "url" }),
    defineField({ name: "twitter", type: "url" }),
    defineField({ name: "upwork", type: "url" }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "avatarUrl", type: "url", title: "Avatar URL (legacy)" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
