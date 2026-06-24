import { defineField, defineType } from "sanity";

export const customSoftware = defineType({
  name: "customSoftware",
  title: "Custom software",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "section", title: "Section" },
    { name: "relationships", title: "Relationships" },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whatItIs",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "whatsIncluded",
      type: "array",
      title: "What's included",
      group: "content",
      of: [{ type: "featureBullet" }],
    }),
    defineField({
      name: "deliverables",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQ",
      group: "content",
      of: [{ type: "articleFaq" }],
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({ name: "coverImageUrl", type: "url", title: "Cover URL (legacy)", group: "content" }),
    defineField({ name: "href", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "order",
      type: "number",
      group: "content",
      validation: (r) => r.required(),
    }),

    /* Section grouping on custom-software landing page */
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID (portals, systems…)",
      group: "section",
    }),
    defineField({ name: "sectionLabel", type: "string", title: "Section label", group: "section" }),
    defineField({ name: "sectionHeadline", type: "string", title: "Section headline", group: "section" }),
    defineField({
      name: "sectionDescription",
      type: "text",
      rows: 3,
      title: "Section description",
      group: "section",
    }),
    defineField({
      name: "sectionOrder",
      type: "number",
      title: "Section order on page",
      group: "section",
    }),
    defineField({
      name: "showInNav",
      type: "boolean",
      title: "Show in main navigation",
      group: "section",
      initialValue: true,
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
      name: "relatedIndustries",
      type: "array",
      title: "Related industries",
      group: "relationships",
      of: [
        { type: "reference", to: [{ type: "industry" }, { type: "industryParent" }] },
      ],
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
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "sectionLabel" } },
});
