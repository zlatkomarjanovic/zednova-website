import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authorName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "authorTitle", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "industry", type: "string" }),
    defineField({ name: "avatar", type: "image" }),
    defineField({
      name: "platform",
      type: "boolean",
      title: "Platform review (homepage carousel)",
      initialValue: false,
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "company", media: "avatar" },
  },
});
