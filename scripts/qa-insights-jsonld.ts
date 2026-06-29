/**
 * JSON-LD QA for all insight posts.
 * Usage: npm run qa:insights-jsonld
 */
import {
  buildGraphForPost,
  collectEmptyValues,
  getNormalizedPosts,
  parseListCountFromTitle,
  countMajorSections,
  SCHEMA_ORG_ID,
  SCHEMA_WEBSITE_ID,
  SITE_ORIGIN,
  absoluteUrl,
} from "./qa/insights-shared";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

async function main() {
  let errors = 0;
  const posts = await getNormalizedPosts();

  for (const post of posts) {
    try {
      const graphDoc = await buildGraphForPost(post);
      const graph = graphDoc["@graph"] as Record<string, unknown>[];
      const types = graph.map((n) => n["@type"]);

      assert(graphDoc["@context"] === "https://schema.org", "missing @context");
      assert(!types.includes("Organization"), "duplicate Organization node");
      assert(!types.includes("WebSite"), "duplicate WebSite node");
      assert(types.includes("WebPage"), "missing WebPage");
      assert(types.includes("BlogPosting"), "missing BlogPosting");
      assert(types.includes("BreadcrumbList"), "missing BreadcrumbList");

      const blog = graph.find((n) => n["@type"] === "BlogPosting")!;
      assert(
        (blog.publisher as { "@id": string })["@id"] === SCHEMA_ORG_ID,
        "publisher @id mismatch",
      );
      assert(
        (blog.mainEntityOfPage as { "@id": string })["@id"].startsWith(SITE_ORIGIN),
        "mainEntityOfPage not absolute",
      );
      assert(Boolean(blog.headline), "missing headline");
      assert(Boolean(blog.description), "missing description");
      assert(Boolean(blog.url), "missing url");
      assert(Boolean(blog.datePublished), "missing datePublished");
      assert(Boolean(blog.dateModified), "missing dateModified");

      const empty = collectEmptyValues(graphDoc);
      assert(empty.length === 0, `empty schema values at ${empty.join(", ")}`);

      const published = blog.datePublished as string;
      const modified = blog.dateModified as string;
      assert(Date.parse(modified) >= Date.parse(published), "dateModified before datePublished");

      if (post.image) {
        assert(types.includes("ImageObject"), "missing ImageObject when image exists");
      }

      const faqNode = graph.find((n) => n["@type"] === "FAQPage");
      if (post.faqs?.length) {
        assert(Boolean(faqNode), "expected FAQPage");
        const questions = (faqNode!.mainEntity as { name: string }[]).map((q) => q.name);
        const unique = new Set(questions.map((q) => q.trim().toLowerCase()));
        assert(unique.size === questions.length, "duplicate FAQ in schema");
      } else {
        assert(!faqNode, "unexpected FAQPage");
      }

      const listCount = parseListCountFromTitle(post.title);
      if (listCount) {
        const sections = countMajorSections(post.body);
        assert(
          sections >= listCount,
          `title implies ${listCount} sections but found ${sections}`,
        );
      }

      console.log(`✓ JSON-LD ${post.slug}`);
    } catch (err) {
      console.error(`✗ ${post.slug}: ${(err as Error).message}`);
      errors++;
    }
  }

  console.log(`\nCanonical: ${SITE_ORIGIN}`);
  console.log(`Org @id: ${SCHEMA_ORG_ID}`);
  console.log(`WebSite @id: ${SCHEMA_WEBSITE_ID}`);
  console.log(`Sample: ${absoluteUrl("/insights/shopify-conversion-fixes-that-actually-move-revenue")}`);

  if (errors) {
    console.error(`\n${errors} JSON-LD check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll JSON-LD checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
