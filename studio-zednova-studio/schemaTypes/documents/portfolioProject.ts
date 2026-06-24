import { defineField, defineType } from "sanity";

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Portfolio project",
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
      name: "summary",
      type: "text",
      rows: 4,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", type: "url", title: "Live project URL", group: "content" }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),
    defineField({ name: "imageAlt", type: "string", title: "Cover alt text", group: "content" }),
    defineField({ name: "videoUrl", type: "url", title: "Hover video URL", group: "content" }),
    defineField({
      name: "accent",
      type: "string",
      group: "content",
      initialValue: "#1c1917",
    }),
    defineField({
      name: "category",
      type: "string",
      group: "content",
      options: {
        list: ["Websites", "SaaS", "Real estate", "Nonprofit", "Ecommerce", "Healthcare", "Automation"],
      },
    }),
    defineField({ name: "logo", type: "portfolioLogo", group: "content" }),
    defineField({
      name: "year",
      type: "number",
      group: "content",
    }),
    defineField({
      name: "servicesUsed",
      type: "array",
      title: "Services used",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      title: "Related industries",
      group: "relationships",
      of: [
        { type: "reference", to: [{ type: "industry" }, { type: "industryParent" }] },
      ],
    }),
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      title: "Related case studies",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
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
    defineField({
      name: "order",
      type: "number",
      group: "content",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
