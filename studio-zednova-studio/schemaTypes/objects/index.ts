import { defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "seoTitle", type: "string", title: "SEO title" }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO description",
      rows: 3,
    }),
    defineField({
      name: "keywords",
      type: "array",
      of: [{ type: "string" }],
      title: "Keywords",
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph image",
      options: { hotspot: true },
    }),
  ],
});

export const painPoint = defineType({
  name: "painPoint",
  title: "Pain point",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const caseResult = defineType({
  name: "caseResult",
  title: "Result metric",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
});

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  fields: [
    defineField({ name: "step", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const articleFaq = defineType({
  name: "articleFaq",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({ name: "id", type: "string", title: "ID (for anchors)" }),
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
});

export const articleBlock = defineType({
  name: "articleBlock",
  title: "Article block",
  type: "object",
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Paragraph", value: "p" },
          { title: "Heading 2", value: "h2" },
          { title: "Heading 3", value: "h3" },
          { title: "List", value: "ul" },
          { title: "Quote", value: "quote" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "text", type: "text", rows: 4 }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "string" }],
      title: "List items",
    }),
  ],
});

export const popularServiceLink = defineType({
  name: "popularServiceLink",
  title: "Popular service link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
});

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
});

export const portfolioLogo = defineType({
  name: "portfolioLogo",
  title: "Logo",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", title: "Logo image" }),
    defineField({ name: "alt", type: "string", title: "Alt text" }),
    defineField({
      name: "lightVariant",
      type: "boolean",
      title: "Light mark (tone down on light backgrounds)",
      initialValue: false,
    }),
  ],
});

export const objectTypes = [
  seoFields,
  painPoint,
  caseResult,
  processStep,
  articleFaq,
  articleBlock,
  popularServiceLink,
  stat,
  portfolioLogo,
];
