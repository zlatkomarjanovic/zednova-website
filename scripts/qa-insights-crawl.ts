/**
 * Crawlability QA — static checks locally; production HTML with --live.
 * Usage: npx tsx scripts/qa-insights-crawl.ts [--live]
 */
import fs from "node:fs";
import { posts } from "./qa/insights-shared";

const LIVE = process.argv.includes("--live");
const ORIGIN = process.env.SITE_ORIGIN ?? "https://www.zednova.studio";

const SPLIT_PATTERNS = [
  /S S e e r r v v/i,
  /C C u u s s t t o o m/i,
  /M M i i g g r r a a t t i i o o n n s s/i,
];

const PAGES = [
  `${ORIGIN}/robots.txt`,
  `${ORIGIN}/sitemap.xml`,
  `${ORIGIN}/services/ai-lead-site`,
  `${ORIGIN}/migrations/shopify-to-headless-shopify`,
  `${ORIGIN}/industries/ecommerce-dtc`,
  ...posts.map((p) => `${ORIGIN}/insights/${p.slug}`),
];

async function checkRobots(url: string): Promise<string[]> {
  const errors: string[] = [];
  const res = await fetch(url);
  const text = await res.text();
  if (!text.includes("\n") && !text.includes("\r")) {
    errors.push("robots.txt has no newline characters");
  }
  if (text.includes("User-Agent:") && !text.includes("User-agent:")) {
    errors.push("robots.txt appears to use old MetadataRoute format");
  }
  if (!text.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) {
    errors.push("robots.txt missing sitemap directive");
  }
  return errors;
}

async function checkHtml(url: string): Promise<string[]> {
  const errors: string[] = [];
  const res = await fetch(url);
  const html = await res.text();

  for (const pattern of SPLIT_PATTERNS) {
    if (pattern.test(html)) {
      errors.push(`split-letter pattern matched: ${pattern}`);
    }
  }

  if (!html.includes("data-char") && !url.includes("robots") && !url.includes("sitemap")) {
    errors.push("data-char HoverFlip not found in HTML");
  }

  if (url.includes("shopify-conversion")) {
    const link = html.match(
      /href="(\/[^"]*)"[^>]*>Shopify and ecommerce engagement<\/a>/,
    );
    if (!link || link[1] !== "/industries/ecommerce-dtc") {
      errors.push(`Shopify body link wrong: ${link?.[1] ?? "missing"}`);
    }
    if (!html.includes("E-commerce development")) {
      errors.push("missing E-commerce development related link");
    }
    if (!html.includes("Shopify to Headless Shopify")) {
      errors.push("missing Shopify to Headless Shopify related link");
    }
  }

  if (!html.includes("application/ld+json") && url.includes("/insights/")) {
    errors.push("missing JSON-LD script");
  }

  return errors;
}

async function main() {
  if (!LIVE) {
    console.log("Local mode: validating HoverFlip + robots route (static).");
    const hoverFlip = fs.readFileSync("src/ui/HoverFlip.tsx", "utf8");
    const robotsRoute = fs.readFileSync("src/app/robots.txt/route.ts", "utf8");
    let errors = 0;
    if (!hoverFlip.includes("data-char")) {
      console.error("✗ HoverFlip missing data-char rendering");
      errors++;
    } else {
      console.log("✓ HoverFlip uses data-char");
    }
    if (!hoverFlip.includes('className="hover-flip-char"')) {
      console.error("✗ HoverFlip missing hover-flip-char elements");
      errors++;
    } else {
      console.log("✓ HoverFlip uses self-closing data-char elements");
    }
    if (robotsRoute.includes('join("\\n")')) {
      console.log("✓ robots route joins with newline");
    } else {
      console.error("✗ robots route missing newline join");
      errors++;
    }
    try {
      fs.accessSync("src/app/robots.ts");
      console.error("✗ app/robots.ts still exists — remove it");
      errors++;
    } catch {
      console.log("✓ app/robots.ts absent");
    }
    if (errors) process.exit(1);
    console.log("\nLocal crawl checks passed. Run with --live for production HTML.");
    return;
  }

  let errors = 0;
  for (const url of PAGES) {
    try {
      const pageErrors = url.endsWith("robots.txt")
        ? await checkRobots(url)
        : await checkHtml(url);
      if (pageErrors.length) {
        console.error(`✗ ${url}`);
        for (const err of pageErrors) console.error(`    - ${err}`);
        errors++;
      } else {
        console.log(`✓ ${url.replace(ORIGIN, "")}`);
      }
    } catch (err) {
      console.error(`✗ ${url}: ${(err as Error).message}`);
      errors++;
    }
  }

  if (errors) {
    console.error(`\n${errors} crawl check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll live crawl checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
