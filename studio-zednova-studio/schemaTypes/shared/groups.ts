/** Reusable Sanity Studio field groups for document schemas. */
export const contentGroup = { name: "content", title: "Content", default: true as const };
export const seoGroup = { name: "seo", title: "SEO" };
export const ogGroup = { name: "og", title: "Open Graph" };
export const aeoGroup = { name: "aeo", title: "AEO" };
export const schemaGroup = { name: "schema", title: "Schema" };
export const relationshipsGroup = { name: "relationships", title: "Relationships" };
export const conversionGroup = { name: "conversion", title: "Conversion" };
export const editorialGroup = { name: "editorial", title: "Editorial" };
export const settingsGroup = { name: "settings", title: "Settings" };

export const standardContentGroups = [
  contentGroup,
  seoGroup,
  ogGroup,
  aeoGroup,
  schemaGroup,
  relationshipsGroup,
  conversionGroup,
  editorialGroup,
  settingsGroup,
];
