/**
 * Local QA checks for insight JSON-LD and Shopify article structure.
 * Usage: npx tsx scripts/qa-insight-jsonld.ts
 */
import { posts } from "../src/lib/content/posts";
import { team } from "../src/lib/content/team";
import { getInsightOverride } from "../src/lib/content/insight-overrides";
import { normalizeInsightPost } from "../src/lib/insights/normalize-post";
import {
  insightPageGraphJsonLd,
  SCHEMA_ORG_ID,
  SCHEMA_WEBSITE_ID,
} from "../src/lib/seo";
import { SITE_ORIGIN, absoluteUrl } from "../src/lib/site-url";

const SHOPIFY_SLUG = "shopify-conversion-fixes-that-actually-move-revenue";
const EXPECTED_FIXES = [
  "Fix 1: Product page clarity",
  "Fix 2: Social proof near the CTA",
  "Fix 3: Mobile speed",
  "Fix 4: Checkout simplification",
  "Fix 5: Cart recovery flow",
  "Fix 6: Post-purchase email flow",
  "Fix 7: Funnel metric tracking",
];

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function collectEmptyValues(node: unknown, path = "root"): string[] {
  if (node === null || node === undefined || node === "") {
    return [path];
  }
  if (Array.isArray(node)) {
    return node.flatMap((item, i) => collectEmptyValues(item, `${path}[${i}]`));
  }
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([key, val]) =>
      collectEmptyValues(val, `${path}.${key}`),
    );
  }
  return [];
}

function main() {
  let errors = 0;

  for (const raw of posts) {
    const post = normalizeInsightPost(raw as Parameters<typeof normalizeInsightPost>[0]);
    const author = team.find((m) => m.slug === post.author) ?? null;
    const graphDoc = insightPageGraphJsonLd({
      post,
      author,
      crumbs: [
        { label: "Home", href: "/" },
        { label: "Insights", href: "/insights" },
        { label: post.title },
      ],
      faqs: post.faqs,
      related: posts.filter((p) => p.slug !== post.slug).slice(0, 2) as typeof post[],
      includeToc: true,
      includeFaq: Boolean(post.faqs?.length),
    });

    const graph = graphDoc["@graph"] as Record<string, unknown>[];
    const types = graph.map((n) => n["@type"]);

    try {
      assert(graphDoc["@context"] === "https://schema.org", `${post.slug}: missing @context`);
      assert(!types.includes("Organization"), `${post.slug}: duplicate Organization node`);
      assert(!types.includes("WebSite"), `${post.slug}: duplicate WebSite node`);
      assert(types.includes("WebPage"), `${post.slug}: missing WebPage`);
      assert(types.includes("BlogPosting"), `${post.slug}: missing BlogPosting`);
      assert(types.includes("BreadcrumbList"), `${post.slug}: missing BreadcrumbList`);

      const blog = graph.find((n) => n["@type"] === "BlogPosting")!;
      assert(
        (blog.publisher as { "@id": string })["@id"] === SCHEMA_ORG_ID,
        `${post.slug}: publisher @id mismatch`,
      );
      assert(
        (blog.mainEntityOfPage as { "@id": string })["@id"].startsWith(SITE_ORIGIN),
        `${post.slug}: mainEntityOfPage not absolute`,
      );

      const empty = collectEmptyValues(graphDoc);
      assert(empty.length === 0, `${post.slug}: empty schema values at ${empty.join(", ")}`);

      const published = blog.datePublished as string;
      const modified = blog.dateModified as string;
      assert(!Number.isNaN(Date.parse(published)), `${post.slug}: invalid datePublished`);
      assert(!Number.isNaN(Date.parse(modified)), `${post.slug}: invalid dateModified`);
      assert(
        Date.parse(modified) >= Date.parse(published),
        `${post.slug}: dateModified before datePublished`,
      );

      const faqNode = graph.find((n) => n["@type"] === "FAQPage");
      if (post.faqs?.length) {
        assert(Boolean(faqNode), `${post.slug}: expected FAQPage`);
        const questions = (faqNode!.mainEntity as { name: string }[]).map((q) => q.name);
        const unique = new Set(questions.map((q) => q.trim().toLowerCase()));
        assert(unique.size === questions.length, `${post.slug}: duplicate FAQ in schema`);
      } else {
        assert(!faqNode, `${post.slug}: unexpected FAQPage`);
      }

      console.log(`✓ JSON-LD ${post.slug}`);
    } catch (err) {
      console.error(`✗ ${(err as Error).message}`);
      errors++;
    }
  }

  const shopify = normalizeInsightPost(
    posts.find((p) => p.slug === SHOPIFY_SLUG)! as Parameters<typeof normalizeInsightPost>[0],
  );
  const h2s = shopify.body.filter((b) => b.type === "h2").map((b) => b.text);
  const fixH2s = h2s.filter((t) => t.startsWith("Fix "));
  const answerWords = (shopify.quickAnswer?.shortAnswer ?? "").split(/\s+/).filter(Boolean).length;

  try {
    assert(h2s.filter((t) => t === shopify.title).length <= 0, "Shopify: H1 duplicated as H2");
    assert(fixH2s.length === 7, `Shopify: expected 7 fix H2s, got ${fixH2s.length}`);
    for (let i = 0; i < EXPECTED_FIXES.length; i++) {
      assert(fixH2s[i] === EXPECTED_FIXES[i], `Shopify: H2 mismatch at ${i + 1}: ${fixH2s[i]}`);
    }
    assert(
      shopify.implementationTable?.length === 7,
      `Shopify: expected 7 table rows, got ${shopify.implementationTable?.length}`,
    );
    assert(shopify.sources?.length === 4, `Shopify: expected 4 sources`);
    assert(answerWords >= 40 && answerWords <= 70, `Shopify: direct answer ${answerWords} words`);
    assert(
      Boolean(getInsightOverride(SHOPIFY_SLUG)),
      "Shopify override missing",
    );
    console.log("✓ Shopify article structure");
  } catch (err) {
    console.error(`✗ ${(err as Error).message}`);
    errors++;
  }

  console.log(`\nCanonical origin: ${SITE_ORIGIN}`);
  console.log(`Org @id: ${SCHEMA_ORG_ID}`);
  console.log(`WebSite @id: ${SCHEMA_WEBSITE_ID}`);
  console.log(`Sample article URL: ${absoluteUrl(`/insights/${SHOPIFY_SLUG}`)}`);

  if (errors > 0) {
    console.error(`\n${errors} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll QA checks passed.");
}

main();
