import { defineField, defineType } from "sanity";

export const serviceNavItem = defineType({
  name: "serviceNavItem",
  title: "Service nav item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", title: "URL", validation: (r) => r.required() }),
    defineField({ name: "shortDescription", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({
      name: "navGroup",
      type: "string",
      title: "Nav group",
      options: {
        list: [
          "Websites",
          "Shopify & Ecommerce",
          "Custom Software",
          "Automation",
          "AI Tools",
        ],
      },
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
