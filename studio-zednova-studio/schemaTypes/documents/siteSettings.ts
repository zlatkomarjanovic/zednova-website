import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "seo", title: "SEO & AEO" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
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
      description: "Used for canonical URLs, JSON-LD, and sitemap.",
    }),
    defineField({
      name: "announcementBar",
      type: "string",
      group: "general",
    }),
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
    }),

    defineField({
      name: "contactEmail",
      type: "string",
      group: "contact",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "contactPhone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "responseTime",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "officeHours",
      type: "string",
      group: "contact",
    }),

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
      name: "twitterCreator",
      type: "string",
      title: "Twitter @handle (for twitter:creator)",
      group: "seo",
    }),
    defineField({
      name: "defaultSeo",
      type: "seoFields",
      title: "Default SEO (fallback for pages without SEO)",
      group: "seo",
    }),
    defineField({
      name: "headerScripts",
      type: "text",
      title: "Header scripts (Analytics, GTM…)",
      rows: 6,
      group: "seo",
      description: "Optional raw HTML to inject into <head>.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
