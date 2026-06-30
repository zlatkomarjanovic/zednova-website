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
      name: "startingPrice",
      type: "string",
      title: "Starting price label (e.g. 'From $3,500')",
    }),
    defineField({
      name: "isFeatured",
      type: "boolean",
      title: "Featured card (show on homepage)",
      initialValue: true,
    }),
    defineField({
      name: "isLegacy",
      type: "boolean",
      title: "Legacy / hidden from primary surfaces",
      initialValue: false,
    }),
    defineField({
      name: "parentService",
      type: "string",
      title: "Parent service",
      options: {
        list: [
          { title: "Lead-Gen Websites & AI Search", value: "lead-gen-websites" },
          { title: "CRM & Follow-Up Automation", value: "crm-automation" },
          { title: "AI Receptionist & Booking Automation", value: "ai-receptionist" },
          { title: "Custom Portals & Dashboards", value: "portals-dashboards" },
          { title: "Monthly Support & Improvements", value: "monthly-support" },
        ],
      },
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "includes" } },
});
