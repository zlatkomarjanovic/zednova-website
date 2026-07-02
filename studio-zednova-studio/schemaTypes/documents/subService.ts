import { defineField, defineType } from "sanity";

export const subService = defineType({
  name: "subService",
  title: "Sub service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "parentService",
      type: "reference",
      title: "Parent service",
      to: [{ type: "service" }],
      options: { disableNew: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      title: "Description",
      description:
        "Shown in the service detail bento grid and as the tooltip on homepage chips.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon key",
      description: "Optional icon key resolved by the front-end icon map.",
    }),
    defineField({
      name: "span",
      type: "string",
      title: "Bento span",
      description: "Card size in the service detail bento grid.",
      options: { list: ["1x1", "2x1", "1x2", "2x2"], layout: "radio" },
      initialValue: "1x1",
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "parentService.title" },
  },
});
