/**
 * Inspect the shapes of fields flagged by `sanity documents validate`
 * so we can decide whether to fix the schema or the data.
 */
import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const caseStudy = await client.fetch(
    `*[_type == "caseStudy"][0]{ _id, solution, results }`,
  );
  console.log("--- caseStudy sample ---");
  console.log(JSON.stringify(caseStudy, null, 2));

  const product = await client.fetch(
    `*[_type == "product"][0]{ _id, features, featureList }`,
  );
  console.log("--- product sample ---");
  console.log(JSON.stringify(product, null, 2));

  const portfolio = await client.fetch(
    `*[_type == "portfolioProject"]{ _id, videoUrl, year }`,
  );
  console.log("--- portfolioProject videoUrl/year ---");
  console.log(JSON.stringify(portfolio, null, 2));

  const testimonial = await client.fetch(
    `*[_type == "testimonial"][0]{ _id, clientName, authorName, authorTitle, company, platform, platformSource }`,
  );
  console.log("--- testimonial sample ---");
  console.log(JSON.stringify(testimonial, null, 2));

  const author = await client.fetch(
    `*[_type == "author"]{ _id, "slug": slug.current, bio, email, github }`,
  );
  console.log("--- authors ---");
  console.log(JSON.stringify(author, null, 2));

  const tag = await client.fetch(
    `*[_type == "tag"][0]{ _id, title, description, seo }`,
  );
  console.log("--- tag sample ---");
  console.log(JSON.stringify(tag, null, 2));

  const cat = await client.fetch(
    `*[_type == "insightCategory"][0]`,
  );
  console.log("--- insightCategory sample ---");
  console.log(JSON.stringify(cat, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
