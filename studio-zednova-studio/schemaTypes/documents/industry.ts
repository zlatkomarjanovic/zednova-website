import { defineField, defineType } from "sanity";

const industryCategories = [
  { title: "Healthcare Clinics", value: "Healthcare Clinics" },
  { title: "Ecommerce & Shopify", value: "Ecommerce & Shopify" },
  {
    title: "Small Business Custom Software",
    value: "Small Business Custom Software",
  },
];

const industryGroups = [
  { name: "content", title: "Content", default: true },
  { name: "nav", title: "Navigation" },
  { name: "relationships", title: "Relationships" },
  { name: "seo", title: "SEO & AEO" },
];

const industryFields = [
  defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
  defineField({
    name: "slug",
    type: "slug",
    group: "content",
    options: { source: "title", maxLength: 96 },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "category",
    type: "string",
    group: "content",
    options: { list: industryCategories },
    validation: (r) => r.required(),
  }),
  defineField({ name: "whoItIsFor", type: "text", rows: 3, group: "content" }),
  defineField({ name: "whatWeBuild", type: "text", rows: 3, group: "content" }),
  defineField({ name: "problemSolved", type: "text", rows: 3, group: "content" }),
  defineField({ name: "heroHeadline", type: "string", group: "content" }),
  defineField({ name: "hook", type: "text", rows: 2, group: "content" }),
  defineField({
    name: "shortDescription",
    type: "text",
    rows: 2,
    group: "content",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "painPoints",
    type: "array",
    group: "content",
    of: [{ type: "painPoint" }],
  }),
  defineField({
    name: "popularServices",
    type: "array",
    group: "content",
    of: [{ type: "popularServiceLink" }],
  }),
  defineField({
    name: "faqs",
    type: "array",
    title: "FAQ (industry-level)",
    group: "content",
    of: [{ type: "articleFaq" }],
  }),
  defineField({ name: "exampleProject", type: "string", group: "content" }),
  defineField({ name: "commonUseCase", type: "string", group: "content" }),
  defineField({ name: "icon", type: "string", title: "Icon key", group: "content" }),
  defineField({
    name: "coverImage",
    type: "image",
    group: "content",
    options: { hotspot: true },
  }),
  defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),

  defineField({
    name: "order",
    type: "number",
    group: "content",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "showInMainNav",
    type: "boolean",
    title: "Show in main navigation",
    group: "nav",
    initialValue: false,
  }),
  defineField({
    name: "navOrder",
    type: "number",
    title: "Navigation order",
    group: "nav",
  }),
  defineField({
    name: "navTitle",
    type: "string",
    title: "Navigation title (optional override)",
    group: "nav",
  }),
  defineField({
    name: "navShortDescription",
    type: "text",
    rows: 3,
    title: "Navigation description (optional override)",
    group: "nav",
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
];

export const industryParent = defineType({
  name: "industryParent",
  title: "Industry (parent)",
  type: "document",
  groups: industryGroups,
  fields: industryFields,
  preview: { select: { title: "title", subtitle: "category" } },
});

export const industry = defineType({
  name: "industry",
  title: "Industry (segment)",
  type: "document",
  groups: industryGroups,
  fields: [
    ...industryFields,
    defineField({
      name: "parent",
      type: "reference",
      to: [{ type: "industryParent" }],
      group: "content",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "parent.title" },
  },
});
