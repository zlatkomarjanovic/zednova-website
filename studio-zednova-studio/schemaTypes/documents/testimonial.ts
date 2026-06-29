import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relationships", title: "Relationships" },
  ],
  fields: [
    defineField({ name: "clientName", type: "string", title: "Name", group: "content", validation: (r) => r.required() }),
    defineField({ name: "clientRole", type: "string", title: "Role", group: "content" }),
    defineField({ name: "clientCompany", type: "string", title: "Company", group: "content" }),
    defineField({
      name: "clientImage",
      type: "image",
      title: "Photo",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "quote", type: "text", rows: 4, group: "content", validation: (r) => r.required() }),
    defineField({ name: "industry", type: "string", group: "content" }),
    defineField({
      name: "platform",
      type: "string",
      group: "content",
      options: { list: ["Google", "Clutch", "Upwork", "Direct", "Other"] },
    }),
    defineField({ name: "platformSource", type: "string", title: "Platform label", group: "content" }),
    defineField({ name: "platformUrl", type: "url", title: "Source URL", group: "content" }),
    defineField({ name: "rating", type: "number", group: "content" }),
    defineField({ name: "featured", type: "boolean", group: "content", initialValue: false }),
    defineField({
      name: "relatedServices",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
  ],
  preview: { select: { title: "clientName", subtitle: "clientCompany", media: "clientImage" } },
});
