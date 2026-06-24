import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "from",
      type: "string",
      title: "From (path)",
      description: "e.g. /old-page",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "to",
      type: "string",
      title: "To (path or URL)",
      description: "e.g. /new-page or https://example.com",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statusCode",
      type: "number",
      title: "HTTP status code",
      options: { list: [301, 302, 307, 308] },
      initialValue: 301,
      validation: (r) => r.required(),
    }),
    defineField({ name: "permanent", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "from", subtitle: "to" },
  },
});
