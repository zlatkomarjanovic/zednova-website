import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relationships", title: "Relationships" },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authorName",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({ name: "authorTitle", type: "string", group: "content" }),
    defineField({ name: "company", type: "string", group: "content" }),
    defineField({ name: "industry", type: "string", group: "content" }),
    defineField({ name: "avatar", type: "image", group: "content" }),
    defineField({ name: "avatarUrl", type: "url", title: "Avatar URL (legacy)", group: "content" }),
    defineField({
      name: "platform",
      type: "boolean",
      title: "Platform review (homepage carousel)",
      group: "content",
      initialValue: false,
    }),
    defineField({ name: "featured", type: "boolean", group: "content", initialValue: false }),
    defineField({
      name: "platformSource",
      type: "string",
      title: "Platform source",
      group: "content",
      options: { list: ["Upwork", "Clutch", "Google", "LinkedIn", "Direct", "Other"] },
    }),
    defineField({
      name: "platformUrl",
      type: "url",
      title: "Source URL",
      group: "content",
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating (1-5)",
      group: "content",
      validation: (r) => r.min(1).max(5),
    }),

    /* Relationships */
    defineField({
      name: "relatedServices",
      type: "array",
      title: "Related services",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      title: "Related case studies",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),

    /* SEO / AEO */
    defineField({
      name: "tags",
      type: "array",
      group: "seo",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seo",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "company", media: "avatar" },
  },
});
