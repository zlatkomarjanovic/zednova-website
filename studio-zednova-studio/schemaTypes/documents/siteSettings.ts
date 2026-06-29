import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "SEO" },
    { name: "schema", title: "Schema" },
    { name: "analytics", title: "Analytics" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Site name",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      rows: 3,
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteUrl",
      type: "url",
      title: "Production site URL",
      group: "general",
    }),
    defineField({ name: "announcementBar", type: "string", group: "general" }),
    defineField({
      name: "stats",
      type: "array",
      of: [{ type: "stat" }],
      group: "general",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "defaultOgImage",
      type: "image",
      title: "Default Open Graph image",
      group: "general",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "defaultTwitterImage",
      type: "image",
      title: "Default Twitter image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({ name: "logo", type: "mediaAsset", group: "general" }),
    defineField({ name: "favicon", type: "mediaAsset", group: "general" }),

    defineField({
      name: "contactEmail",
      type: "string",
      group: "contact",
      validation: (r) => r.required().email(),
    }),
    defineField({ name: "contactPhone", type: "string", group: "contact" }),
    defineField({ name: "responseTime", type: "string", group: "contact" }),
    defineField({ name: "address", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "officeHours", type: "string", group: "contact" }),

    defineField({
      name: "socialLinks",
      type: "object",
      group: "social",
      fields: [
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "twitter", type: "url" }),
        defineField({ name: "github", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "youtube", type: "url" }),
      ],
    }),
    defineField({
      name: "profileLinks",
      type: "object",
      title: "Directory & company profiles",
      group: "social",
      description: "Crunchbase, Clutch, GoodFirms, LinkedIn company page, etc.",
      fields: [
        defineField({ name: "crunchbase", type: "url", title: "Crunchbase" }),
        defineField({ name: "clutch", type: "url", title: "Clutch" }),
        defineField({ name: "goodfirms", type: "url", title: "GoodFirms" }),
        defineField({
          name: "linkedinCompany",
          type: "url",
          title: "LinkedIn company page",
        }),
      ],
    }),
    defineField({
      name: "socialLinksList",
      type: "array",
      title: "Social links (extended)",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        },
      ],
    }),

    defineField({
      name: "primaryNavigation",
      type: "array",
      of: [{ type: "internalLink" }],
      group: "navigation",
    }),
    defineField({
      name: "footerNavigation",
      type: "array",
      of: [{ type: "internalLink" }],
      group: "navigation",
    }),
    defineField({ name: "defaultCta", type: "ctaBlock", group: "navigation" }),
    defineField({ name: "newsletterCta", type: "ctaBlock", group: "navigation" }),

    defineField({
      name: "defaultSeoTitle",
      type: "string",
      title: "Default SEO title",
      group: "seo",
    }),
    defineField({
      name: "defaultSeoDescription",
      type: "text",
      rows: 3,
      title: "Default SEO description",
      group: "seo",
    }),
    defineField({
      name: "globalSearchTags",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
      options: { layout: "tags" },
    }),
    defineField({
      name: "twitterCreator",
      type: "string",
      title: "Twitter @handle",
      group: "seo",
    }),
    defineField({
      name: "defaultSeo",
      type: "seoFields",
      title: "Default SEO (fallback)",
      group: "seo",
    }),
    defineField({
      name: "robots",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "defaultIndex", type: "boolean", initialValue: true }),
        defineField({ name: "defaultFollow", type: "boolean", initialValue: true }),
      ],
    }),
    defineField({
      name: "headerScripts",
      type: "text",
      title: "Header scripts",
      rows: 6,
      group: "analytics",
    }),
    defineField({
      name: "analytics",
      type: "object",
      group: "analytics",
      fields: [
        defineField({ name: "googleTagManagerId", type: "string" }),
        defineField({ name: "googleAnalyticsId", type: "string" }),
        defineField({ name: "searchConsoleVerification", type: "string" }),
      ],
    }),

    defineField({
      name: "organization",
      type: "object",
      title: "Organization (schema.org)",
      group: "schema",
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "legalName", type: "string" }),
        defineField({ name: "url", type: "url" }),
        defineField({ name: "logo", type: "mediaAsset" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "text", rows: 3 }),
        defineField({
          name: "sameAs",
          type: "array",
          of: [{ type: "url" }],
        }),
        defineField({ name: "foundingDate", type: "string" }),
        defineField({ name: "founder", type: "string" }),
      ],
    }),
    defineField({
      name: "schema",
      type: "object",
      group: "schema",
      fields: [
        defineField({
          name: "enableOrganizationSchema",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "enableWebsiteSchema", type: "boolean", initialValue: true }),
        defineField({
          name: "enableBreadcrumbSchema",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
