import { defineField, defineType } from "sanity";

export const serviceMegaMenuCard = defineType({
  name: "serviceMegaMenuCard",
  title: "Service mega menu card",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "includes", type: "string", title: "Includes line", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", title: "URL", validation: (r) => r.required() }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "includes" } },
});
