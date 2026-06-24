import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
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
    defineField({ name: "shortRole", type: "string", title: "Short role (for cards)", group: "content" }),
    defineField({
      name: "bio",
      type: "array",
      of: [{ type: "text" }],
      group: "content",
    }),
    defineField({ name: "shortBio", type: "text", rows: 2, group: "content" }),
    defineField({ name: "linkedin", type: "url", group: "content" }),
    defineField({ name: "twitter", type: "url", group: "content" }),
    defineField({ name: "upwork", type: "url", group: "content" }),
    defineField({ name: "website", type: "url", group: "content" }),
    defineField({ name: "avatar", type: "image", group: "content" }),
    defineField({ name: "avatarUrl", type: "url", title: "Avatar URL (legacy)", group: "content" }),
    defineField({
      name: "order",
      type: "number",
      group: "content",
    }),
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
