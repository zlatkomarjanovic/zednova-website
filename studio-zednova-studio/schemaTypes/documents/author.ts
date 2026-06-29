import { defineField, defineType } from "sanity";
import { optionalUrl } from "../shared/validation";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({
      name: "shortBio",
      type: "text",
      rows: 2,
      title: "Short bio",
    }),
    defineField({
      name: "bio",
      type: "array",
      of: [{ type: "block" }],
      title: "Bio",
    }),
    defineField({ name: "linkedin", type: "url", validation: optionalUrl }),
    defineField({ name: "twitter", type: "url", validation: optionalUrl }),
    defineField({ name: "upwork", type: "url", validation: optionalUrl }),
    defineField({ name: "website", type: "url", validation: optionalUrl }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
