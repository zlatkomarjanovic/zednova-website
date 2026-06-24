import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "siteDescription",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({ name: "responseTime", type: "string" }),
    defineField({ name: "announcementBar", type: "string" }),
    defineField({
      name: "socialLinks",
      type: "object",
      fields: [
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "twitter", type: "url" }),
        defineField({ name: "github", type: "url" }),
      ],
    }),
    defineField({
      name: "stats",
      type: "array",
      of: [{ type: "stat" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
