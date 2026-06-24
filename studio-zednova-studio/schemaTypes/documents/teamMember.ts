import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
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
    }),
    defineField({ name: "linkedin", type: "url" }),
    defineField({ name: "twitter", type: "url" }),
    defineField({ name: "upwork", type: "url" }),
    defineField({ name: "avatar", type: "image" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
