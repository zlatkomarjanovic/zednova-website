import { defineField, defineType } from "sanity";

const parentGroups = [
  "Lead-Gen Websites & AI Search",
  "CRM & Follow-Up Automation",
  "AI Receptionist & Booking Automation",
  "Custom In-House Software for SMBs",
  "Platform Migrations",
  "Monthly Support & Improvements",
  "Shopify & Ecommerce (Legacy)",
];

export const subService = defineType({
  name: "subService",
  title: "Sub service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", title: "URL", validation: (r) => r.required() }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "navGroup",
      type: "string",
      title: "Parent service group",
      options: { list: parentGroups, layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image (optional)",
      description: "Optional hero image for this sub service. Leave blank to use the parent service image on the site.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "navGroup", media: "image" } },
});
