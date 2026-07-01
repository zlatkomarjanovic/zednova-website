import { defineField, defineType } from "sanity";

export const industryGlanceItem = defineType({
  name: "industryGlanceItem",
  title: "At-a-glance item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      type: "image",
      title: "Icon (SVG)",
      options: { accept: "image/svg+xml" },
    }),
    defineField({
      name: "iconKey",
      type: "string",
      title: "Icon fallback key",
      description: "Used when no icon image is uploaded. e.g. glance-audience, glance-build, glance-outcome",
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "subtitle" } },
});

export const industrySystemStep = defineType({
  name: "industrySystemStep",
  title: "System flow step",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Step label" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "label" } },
});

export const industryBuildCard = defineType({
  name: "industryBuildCard",
  title: "Deliverable (bento card)",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({ name: "bestFor", type: "string", title: "Best for" }),
    defineField({
      name: "image",
      type: "image",
      title: "Card image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "icon", type: "string", title: "Icon key (optional)" }),
    defineField({
      name: "span",
      type: "string",
      title: "Bento span",
      options: { list: ["1x1", "2x1", "1x2", "2x2"], layout: "radio" },
      initialValue: "1x1",
    }),
    defineField({
      name: "serviceHref",
      type: "string",
      title: "Related service link",
      description: "Optional path, e.g. /services/lead-gen-websites",
    }),
  ],
  preview: { select: { title: "title", subtitle: "bestFor", media: "image" } },
});

export const industrySegmentCard = defineType({
  name: "industrySegmentCard",
  title: "Segment card",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
    defineField({ name: "commonBuild", type: "string", title: "Common build" }),
    defineField({ name: "href", type: "string", title: "Optional link" }),
    defineField({ name: "statusLabel", type: "string", title: "Status label" }),
  ],
  preview: { select: { title: "title", subtitle: "commonBuild" } },
});

export const industryProjectStack = defineType({
  name: "industryProjectStack",
  title: "Example project stack",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bestFor", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "includes",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: "title", subtitle: "bestFor" } },
});

export const industryRelatedServiceCard = defineType({
  name: "industryRelatedServiceCard",
  title: "Related service card",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const industryPageObjects = [
  industryGlanceItem,
  industrySystemStep,
  industryBuildCard,
  industrySegmentCard,
  industryProjectStack,
  industryRelatedServiceCard,
];
