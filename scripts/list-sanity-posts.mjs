import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: env.SANITY_API_READ_TOKEN,
});

const posts = await client.fetch(
  `*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, title, status }`,
);
console.log(JSON.stringify(posts, null, 2));
