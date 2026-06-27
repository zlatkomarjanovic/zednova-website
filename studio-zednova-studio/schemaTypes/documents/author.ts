import { defineField, defineType } from "sanity";
import {
  flatOpenGraphFields,
  flatSeoFields,
} from "../shared/flatFields";
import { optionalEmail, optionalUrl, optionalUrlList } from "../shared/validation";

const profileUrlField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    type: "url",
    title,
    group: "content",
    description,
    validation: optionalUrl,
  });

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "relationships", title: "Relationships" },
    { name: "schema", title: "Schema" },
    { name: "seo", title: "SEO" },
    { name: "og", title: "Open Graph" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "content",
      description: "Author full name shown publicly.",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      group: "content",
      description: "Public author role (e.g. Founder, Lead Developer).",
      validation: (rule) => rule.required().warning("Add a role so author bylines render correctly"),
    }),
    defineField({
      name: "shortBio",
      type: "text",
      rows: 2,
      group: "content",
      description: "One-line bio for cards and author bylines.",
    }),
    defineField({
      name: "bio",
      type: "array",
      title: "Bio paragraphs",
      group: "content",
      description: "Short paragraphs shown in the author box on insight articles.",
      of: [{ type: "string" }],
      options: { sortable: true },
    }),
    defineField({
      name: "fullBio",
      type: "array",
      title: "Full bio",
      group: "content",
      description: "Full bio in rich text for the author page.",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile image",
      group: "content",
      description: "Author profile photo used on insight articles and schema.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe the photo for accessibility and SEO.",
        }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
      validation: (rule) =>
        rule
          .custom((image) =>
            image?.asset ? true : "Add a profile image for insight author bylines",
          )
          .warning(),
    }),
    defineField({
      name: "avatar",
      type: "image",
      title: "Avatar (legacy)",
      group: "content",
      options: { hotspot: true },
      hidden: true,
    }),
    defineField({
      name: "avatarUrl",
      type: "url",
      title: "Avatar URL (legacy)",
      group: "content",
      hidden: true,
      validation: optionalUrl,
    }),
    defineField({
      name: "email",
      type: "string",
      group: "content",
      description: "Optional author email.",
      validation: optionalEmail,
    }),
    profileUrlField("website", "Website", "Author personal website."),
    profileUrlField("linkedin", "LinkedIn", "LinkedIn profile URL."),
    profileUrlField("twitter", "X / Twitter", "X/Twitter profile URL."),
    defineField({
      name: "xTwitter",
      type: "url",
      title: "X / Twitter (alias)",
      group: "content",
      hidden: true,
      validation: optionalUrl,
    }),
    profileUrlField("github", "GitHub", "GitHub profile URL."),
    profileUrlField("upwork", "Upwork", "Upwork profile URL."),
    defineField({
      name: "expertise",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      description: "Expertise areas (e.g. Next.js, Shopify, AI).",
      options: { layout: "tags" },
    }),
    defineField({
      name: "credentials",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      description: "Credentials, experience, or trust signals.",
      options: { layout: "tags" },
    }),

    defineField({
      name: "relatedServices",
      type: "array",
      title: "Related services",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),

    defineField({
      name: "sameAs",
      type: "array",
      of: [{ type: "string" }],
      title: "sameAs (Person schema)",
      group: "schema",
      description: "Profile URLs used for schema.org Person sameAs.",
      options: { layout: "tags" },
      validation: optionalUrlList,
    }),
    defineField({
      name: "jobTitle",
      type: "string",
      title: "Job title (schema)",
      group: "schema",
      description: "Job title for Person schema.",
    }),
    defineField({
      name: "worksFor",
      type: "string",
      title: "Works for (schema)",
      group: "schema",
      description: "Company or organization name.",
    }),
    defineField({
      name: "knowsAbout",
      type: "array",
      of: [{ type: "string" }],
      title: "Knows about (schema)",
      group: "schema",
      description: "Topics the author knows about.",
      options: { layout: "tags" },
    }),

    ...flatSeoFields.map((field) =>
      field.name === "canonicalUrl" ? { ...field, validation: optionalUrl } : field,
    ),
    ...flatOpenGraphFields,

    defineField({
      name: "seo",
      type: "seoFields",
      title: "SEO (grouped)",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
