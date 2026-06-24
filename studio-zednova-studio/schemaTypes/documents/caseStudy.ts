import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
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
      name: "industry",
      type: "reference",
      to: [{ type: "industry" }, { type: "industryParent" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "servicesUsed",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({ name: "timeline", type: "string" }),
    defineField({
      name: "resultHeadline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "challenge", type: "text", rows: 5 }),
    defineField({
      name: "solution",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "results",
      type: "array",
      of: [{ type: "caseResult" }],
    }),
    defineField({
      name: "techStack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "accent",
      type: "string",
      title: "Accent color (hex)",
      initialValue: "#1c1917",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)" }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
