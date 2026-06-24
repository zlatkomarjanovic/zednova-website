import { defineField, defineType } from "sanity";
import {
  flatOpenGraphFields,
  flatSeoFields,
} from "../shared/flatFields";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
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
      name: "name",
      type: "string",
      group: "content",
      description: "Team member full name.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      group: "content",
      description: "Public role/title (e.g. Founder, Lead Developer).",
    }),
    defineField({
      name: "shortRole",
      type: "string",
      title: "Short role (for cards)",
      group: "content",
      description: "Abbreviated role for compact cards.",
    }),
    defineField({
      name: "shortBio",
      type: "text",
      rows: 2,
      group: "content",
      description: "One-line bio for cards.",
    }),
    defineField({
      name: "bio",
      type: "array",
      of: [{ type: "text" }],
      title: "Bio paragraphs (legacy)",
      group: "content",
    }),
    defineField({
      name: "fullBio",
      type: "array",
      title: "Full bio",
      group: "content",
      description: "Full bio in rich text.",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile image",
      group: "content",
      description: "Profile photo with alt text and caption.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({ name: "avatar", type: "image", title: "Avatar (legacy)", group: "content" }),
    defineField({ name: "avatarUrl", type: "url", title: "Avatar URL (legacy)", group: "content" }),
    defineField({ name: "email", type: "string", group: "content", description: "Optional email." }),
    defineField({ name: "linkedin", type: "url", group: "content", description: "LinkedIn profile URL." }),
    defineField({ name: "twitter", type: "url", title: "X / Twitter", group: "content" }),
    defineField({ name: "xTwitter", type: "url", title: "X / Twitter (alias)", group: "content" }),
    defineField({ name: "github", type: "url", group: "content" }),
    defineField({ name: "website", type: "url", group: "content" }),
    defineField({
      name: "expertise",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      description: "Expertise areas.",
      options: { layout: "tags" },
    }),
    defineField({
      name: "credentials",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      description: "Credentials, certifications, or trust signals.",
      options: { layout: "tags" },
    }),

    defineField({
      name: "services",
      type: "array",
      title: "Services",
      group: "relationships",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),

    ...flatSeoFields,
    ...flatOpenGraphFields,

    defineField({
      name: "featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "priority",
      type: "number",
      group: "settings",
    }),
    defineField({
      name: "order",
      type: "number",
      group: "settings",
      description: "Sort order on the team page.",
    }),
    defineField({ name: "seo", type: "seoFields", title: "SEO (grouped)", group: "seo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
