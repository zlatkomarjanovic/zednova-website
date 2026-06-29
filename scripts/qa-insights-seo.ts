/**
 * SEO/AEO content QA for all insight posts (local normalized data).
 * Usage: npm run qa:insights-seo
 */
import { uniqueFaqs, uniqueTakeaways } from "../src/lib/insights/dedupe-aeo";
import {
  assertDirectAnswer,
  assertMetadataBasics,
  bodyHasGenericFiller,
  bodyHasInternalLinks,
  countMajorSections,
  getNormalizedPosts,
  parseListCountFromTitle,
  SITE_ORIGIN,
  absoluteUrl,
  wordCount,
} from "./qa/insights-shared";

async function main() {
  let errors = 0;
  const posts = await getNormalizedPosts();

  for (const post of posts) {
    const slugErrors: string[] = [
      ...assertMetadataBasics(post),
      ...assertDirectAnswer(post),
    ];

    const canonical = absoluteUrl(`/insights/${post.slug}`);
    if (!canonical.startsWith(SITE_ORIGIN)) {
      slugErrors.push("canonical not absolute on SITE_ORIGIN");
    }

    if (!post.excerpt?.trim()) slugErrors.push("missing excerpt");
    if (!post.author?.trim()) slugErrors.push("missing author slug");

    const faqs = uniqueFaqs(post.faqs);
    if (faqs.length !== (post.faqs?.length ?? 0)) {
      slugErrors.push("duplicate FAQs after dedupe");
    }

    const takeaways = uniqueTakeaways(post.takeaways);
    if (takeaways.length !== (post.takeaways?.length ?? 0)) {
      slugErrors.push("duplicate takeaways after dedupe");
    }

    const filler = bodyHasGenericFiller(post.body);
    if (filler.length) {
      slugErrors.push(`generic filler detected: ${filler.join(", ")}`);
    }

    if (!bodyHasInternalLinks(post.body)) {
      slugErrors.push("body missing internal markdown links");
    }

    const listCount = parseListCountFromTitle(post.title);
    if (listCount) {
      const sections = countMajorSections(post.body);
      if (sections < listCount) {
        slugErrors.push(`list title ${listCount} but only ${sections} major sections`);
      }
    }

    const bodyText = post.body
      .map((b) => (b.type === "ul" ? b.items.join(" ") : (b.text ?? "")))
      .join(" ");
    if (wordCount(bodyText) < 1000) {
      slugErrors.push(`body content too short (${wordCount(bodyText)} words, expected 1000+)`);
    }

    if ((post.faqs?.length ?? 0) < 5) {
      slugErrors.push(`expected at least 5 FAQs, got ${post.faqs?.length ?? 0}`);
    }

    if ((post.takeaways?.length ?? 0) < 5) {
      slugErrors.push(`expected at least 5 takeaways, got ${post.takeaways?.length ?? 0}`);
    }

    if (!post.quickAnswer?.shortAnswer?.includes("article-direct-answer")) {
      // class is in component, not post — skip
    }

    if (slugErrors.length) {
      console.error(`✗ ${post.slug}:`);
      for (const err of slugErrors) console.error(`    - ${err}`);
      errors++;
    } else {
      console.log(`✓ SEO ${post.slug}`);
    }
  }

  if (errors) {
    console.error(`\n${errors} SEO check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll SEO/AEO checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
