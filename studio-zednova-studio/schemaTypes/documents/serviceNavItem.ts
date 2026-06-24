import { defineField, defineType } from "sanity";

const navGroups = [
  { title: "Websites", value: "Websites" },
  { title: "Shopify & Ecommerce", value: "Shopify & Ecommerce" },
  { title: "Custom Software", value: "Custom Software" },
  { title: "Automation", value: "Automation" },
  { title: "AI Tools", value: "AI Tools" },
];

export const serviceNavItem = defineType({
  name: "serviceNavItem",
  title: "Service nav item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "navGroup",
      type: "string",
      options: { list: navGroups },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "navGroup" } },
});
