import { defineField, defineType } from "sanity";

const industryCategories = [
  { title: "Healthcare Clinics", value: "Healthcare Clinics" },
  { title: "Ecommerce & Shopify", value: "Ecommerce & Shopify" },
  {
    title: "Small Business Custom Software",
    value: "Small Business Custom Software",
  },
];

const industryFields = [
  defineField({ name: "title", type: "string", validation: (r) => r.required() }),
  defineField({
    name: "slug",
    type: "slug",
    options: { source: "title", maxLength: 96 },
    validation: (r) => r.required(),
  }),
  defineField({
    name: "category",
    type: "string",
    options: { list: industryCategories },
    validation: (r) => r.required(),
  }),
  defineField({ name: "whoItIsFor", type: "text", rows: 3 }),
  defineField({ name: "whatWeBuild", type: "text", rows: 3 }),
  defineField({ name: "problemSolved", type: "text", rows: 3 }),
  defineField({ name: "heroHeadline", type: "string" }),
  defineField({ name: "hook", type: "text", rows: 2 }),
  defineField({
    name: "shortDescription",
    type: "text",
    rows: 2,
    validation: (r) => r.required(),
  }),
  defineField({
    name: "painPoints",
    type: "array",
    of: [{ type: "painPoint" }],
  }),
  defineField({
    name: "popularServices",
    type: "array",
    of: [{ type: "popularServiceLink" }],
  }),
  defineField({ name: "exampleProject", type: "string" }),
  defineField({ name: "commonUseCase", type: "string" }),
  defineField({ name: "icon", type: "string", title: "Icon key" }),
  defineField({
    name: "order",
    type: "number",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "showInMainNav",
    type: "boolean",
    title: "Show in main navigation",
    initialValue: false,
  }),
  defineField({
    name: "navOrder",
    type: "number",
    title: "Navigation order",
  }),
  defineField({
    name: "navTitle",
    type: "string",
    title: "Navigation title (optional override)",
  }),
  defineField({
    name: "navShortDescription",
    type: "text",
    rows: 3,
    title: "Navigation description (optional override)",
  }),
];

export const industryParent = defineType({
  name: "industryParent",
  title: "Industry (parent)",
  type: "document",
  fields: industryFields,
  preview: { select: { title: "title", subtitle: "category" } },
});

export const industry = defineType({
  name: "industry",
  title: "Industry (segment)",
  type: "document",
  fields: [
    ...industryFields,
    defineField({
      name: "parent",
      type: "reference",
      to: [{ type: "industryParent" }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "parent.title" },
  },
});
