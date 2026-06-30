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
          "Lead-Gen Websites & AI Search",
          "CRM & Follow-Up Automation",
          "AI Receptionist & Booking Automation",
          "Custom Portals & Dashboards",
          "Platform Migrations",
          "Monthly Support & Improvements",
          "Shopify & Ecommerce (Legacy)",
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
