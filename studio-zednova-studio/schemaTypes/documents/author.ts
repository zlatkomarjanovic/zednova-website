import { defineField, defineType } from "sanity";
import { optionalEmail, optionalUrl, optionalUrlList } from "../shared/validation";

const profileUrlField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    type: "url",
    title,
    group: "content",
    fieldset: "social",
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
  ],
  fieldsets: [
    {
      name: "profile",
      title: "Profile",
      options: { collapsible: false, columns: 1 },
    },
    {
      name: "bioFields",
      title: "Bio",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "social",
      title: "Social links",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "content",
      fieldset: "profile",
      description: "Author full name shown publicly.",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      fieldset: "profile",
      options: { source: "name", maxLength: 96 },
      description: "Used to match insight articles. Keep in sync with post author references.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      group: "content",
      fieldset: "profile",
      description: "Public author role (e.g. Founder, Lead Developer).",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile image",
      group: "content",
      fieldset: "profile",
      description: "Shown on insight articles. Upload here — legacy Avatar fields are no longer used.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe the photo for accessibility and SEO.",
          validation: (rule) =>
            rule.custom((alt, context) => {
              const image = context.parent as { asset?: { _ref?: string } } | undefined;
              if (!image?.asset?._ref) return true;
              return alt?.trim() ? true : "Add alt text when a profile image is uploaded";
            }),
        }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({
      name: "shortBio",
      type: "text",
      rows: 2,
      group: "content",
      fieldset: "bioFields",
      description: "One-line bio for cards and author bylines.",
    }),
    defineField({
      name: "bio",
      type: "array",
      title: "Bio paragraphs",
      group: "content",
      fieldset: "bioFields",
      description: "Short paragraphs shown in the author box on insight articles.",
      of: [{ type: "string" }],
      options: { sortable: true },
    }),
    defineField({
      name: "fullBio",
      type: "array",
      title: "Full bio",
      group: "content",
      fieldset: "bioFields",
      description: "Full bio in rich text for the author page.",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "email",
      type: "string",
      group: "content",
      fieldset: "social",
      description: "Optional author email.",
      validation: optionalEmail,
    }),
    profileUrlField("website", "Website", "Author personal website."),
    profileUrlField("linkedin", "LinkedIn", "LinkedIn profile URL."),
    profileUrlField("twitter", "X / Twitter", "X/Twitter profile URL."),
    profileUrlField("github", "GitHub", "GitHub profile URL."),
    profileUrlField("upwork", "Upwork", "Upwork profile URL."),

    defineField({
      name: "expertise",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      fieldset: "social",
      description: "Expertise areas (e.g. Next.js, Shopify, AI).",
      options: { layout: "tags" },
    }),
    defineField({
      name: "credentials",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      fieldset: "social",
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
      initialValue: "ZedNova Studios",
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

    // Legacy fields kept for existing documents — hidden from editors.
    defineField({
      name: "avatar",
      type: "image",
      title: "Avatar (legacy)",
      group: "content",
      hidden: true,
    }),
    defineField({
      name: "avatarUrl",
      type: "url",
      title: "Avatar URL (legacy)",
      group: "content",
      hidden: true,
    }),
    defineField({
      name: "xTwitter",
      type: "url",
      title: "X / Twitter (alias)",
      group: "content",
      hidden: true,
    }),
    defineField({
      name: "seo",
      type: "seoFields",
      title: "SEO (legacy)",
      group: "content",
      hidden: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
