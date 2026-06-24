import { defineField, defineType } from "sanity";

export const customSoftware = defineType({
  name: "customSoftware",
  title: "Custom software",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID (portals, systems…)",
    }),
    defineField({ name: "sectionLabel", type: "string", title: "Section label" }),
    defineField({ name: "sectionHeadline", type: "string", title: "Section headline" }),
    defineField({
      name: "sectionDescription",
      type: "text",
      rows: 3,
      title: "Section description",
    }),
    defineField({
      name: "sectionOrder",
      type: "number",
      title: "Section order on page",
    }),
    defineField({
      name: "showInNav",
      type: "boolean",
      title: "Show in main navigation",
      initialValue: true,
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "sectionLabel" } },
});
