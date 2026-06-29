import { defineField, defineType } from "sanity";

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Portfolio project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relationships", title: "Relationships" },
    { name: "seo", title: "SEO" },
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
    defineField({ name: "href", type: "url", title: "Live URL", group: "content" }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({ name: "imageAlt", type: "string", title: "Image alt override", group: "content" }),
    defineField({ name: "videoUrl", type: "url", title: "Video URL", group: "content" }),
    defineField({ name: "accent", type: "string", group: "content", initialValue: "#1c1917" }),
    defineField({
      name: "category",
      type: "string",
      group: "content",
      options: {
        list: ["Websites", "SaaS", "Real estate", "Nonprofit", "Ecommerce", "Healthcare", "Automation"],
      },
    }),
    defineField({ name: "year", type: "string", group: "content" }),
    defineField({
      name: "servicesUsed",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "industry" }, { type: "industryParent" }] }],
    }),
    defineField({
      name: "relatedCaseStudies",
      type: "array",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({ name: "logo", type: "portfolioLogo", group: "content" }),
    defineField({ name: "seo", type: "seoFields", group: "seo" }),
    defineField({
      name: "order",
      type: "number",
      group: "content",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "client", media: "coverImage" } },
});
