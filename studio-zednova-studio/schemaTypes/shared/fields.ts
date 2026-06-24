/** Shared optional field definitions for document schemas. */
import { defineField } from "sanity";

export const seoField = defineField({ name: "seo", type: "seoFields", group: "seo" });
export const openGraphField = defineField({
  name: "openGraph",
  type: "openGraphFields",
  group: "og",
});
export const schemaMarkupField = defineField({
  name: "schemaMarkup",
  type: "schemaMarkupFields",
  group: "schema",
});
export const searchTagsField = defineField({
  name: "searchTags",
  type: "array",
  of: [{ type: "string" }],
  group: "seo",
  options: { layout: "tags" },
});
export const faqReferencesField = defineField({
  name: "faqReferences",
  type: "array",
  title: "FAQ references",
  of: [{ type: "reference", to: [{ type: "faq" }] }],
});
export const aiSummaryField = defineField({
  name: "aiSummary",
  type: "text",
  rows: 4,
  group: "aeo",
});
export const llmSnippetField = defineField({
  name: "llmSnippet",
  type: "text",
  rows: 4,
  title: "LLM snippet",
  group: "aeo",
});
export const quickAnswerField = defineField({
  name: "quickAnswer",
  type: "aeoAnswerBlock",
  group: "aeo",
});
export const primaryCtaField = defineField({
  name: "primaryCta",
  type: "ctaBlock",
  group: "conversion",
});
export const featuredField = defineField({
  name: "featured",
  type: "boolean",
  group: "settings",
  initialValue: false,
});
export const priorityField = defineField({
  name: "priority",
  type: "number",
  group: "settings",
});
