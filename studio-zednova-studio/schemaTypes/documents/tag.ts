import { defineField, defineType } from "sanity";
import {
  flatOpenGraphFields,
  flatSeoFields,
} from "../shared/flatFields";

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relationships", title: "Relationships" },
    { name: "seo", title: "SEO" },
    { name: "og", title: "Open Graph" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      description: "Tag name shown publicly.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "URL slug auto-generated from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short description of what this tag covers.",
    }),
    defineField({
      name: "tagType",
      type: "string",
      title: "Tag type",
      group: "content",
      description: "Classifies the tag for filtering and clustering.",
      options: {
        list: ["Topic", "Tool", "Industry", "Service", "Technology", "Search Intent"],
      },
    }),
    defineField({
      name: "relatedTags",
      type: "array",
      title: "Related tags",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "searchAliases",
      type: "array",
      of: [{ type: "string" }],
      title: "Search aliases",
      group: "content",
      description: "Alternate names, synonyms, and common misspellings for search matching.",
      options: { layout: "tags" },
    }),

    ...flatSeoFields,
    ...flatOpenGraphFields,

    defineField({
      name: "priority",
      type: "number",
      group: "settings",
    }),
    defineField({
      name: "seo",
      type: "seoFields",
      title: "SEO (grouped)",
      group: "seo",
    }),
  ],
  preview: { select: { title: "title", subtitle: "tagType" } },
});
