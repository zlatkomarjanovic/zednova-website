import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relationships", title: "Relationships" },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "client", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "industry",
      type: "reference",
      to: [{ type: "industry" }, { type: "industryParent" }],
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "servicesUsed",
      type: "array",
      title: "Services used",
      group: "content",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({ name: "timeline", type: "string", group: "content" }),
    defineField({
      name: "resultHeadline",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({ name: "challenge", type: "text", rows: 5, group: "content" }),
    defineField({
      name: "solution",
      type: "array",
      group: "content",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "results",
      type: "array",
      group: "content",
      of: [{ type: "caseResult" }],
    }),
    defineField({
      name: "techStack",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      group: "content",
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQ (case-study-level)",
      group: "content",
      of: [{ type: "articleFaq" }],
    }),
    defineField({ name: "featured", type: "boolean", group: "content", initialValue: false }),
    defineField({
      name: "accent",
      type: "string",
      title: "Accent color (hex)",
      group: "content",
      initialValue: "#1c1917",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),

    /* Relationships */
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      title: "Related case studies",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "relatedInsights",
      type: "array",
      title: "Related insights / posts",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "post" }] }],
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
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
