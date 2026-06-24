import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "scope", title: "Scope" },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({
      name: "question",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      rows: 5,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "FAQ category",
      group: "scope",
      description: "Optional grouping (e.g. Services, Pricing, Process).",
      options: {
        list: [
          "Services",
          "Pricing",
          "Process",
          "Industries",
          "Migrations",
          "Custom Software",
          "Products",
          "Company",
          "General",
        ],
      },
    }),
    defineField({
      name: "scopeServices",
      type: "array",
      title: "Applies to services",
      group: "scope",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "scopeIndustries",
      type: "array",
      title: "Applies to industries",
      group: "scope",
      of: [
        { type: "reference", to: [{ type: "industry" }, { type: "industryParent" }] },
      ],
    }),
    defineField({
      name: "scopeMigrations",
      type: "array",
      title: "Applies to migrations",
      group: "scope",
      of: [{ type: "reference", to: [{ type: "migration" }] }],
    }),
    defineField({
      name: "tags",
      type: "array",
      group: "seo",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "order",
      type: "number",
      group: "content",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "category" } },
});
