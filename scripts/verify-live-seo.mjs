#!/usr/bin/env node
/** Production smoke test for AEO/SEO fixes. Usage: node scripts/verify-live-seo.mjs */

const ORIGIN = process.env.SITE_ORIGIN ?? "https://www.zednova.studio";
const SHOPIFY = `${ORIGIN}/insights/shopify-conversion-fixes-that-actually-move-revenue`;

async function main() {
  let failed = 0;

  const robotsRes = await fetch(`${ORIGIN}/robots.txt`);
  const robots = await robotsRes.text();
  const robotLines = robots.split(/\r?\n/).filter((l) => l.length > 0 || robots.includes("\n"));
  if (!robots.includes("\n") && !robots.includes("\r")) {
    console.error("FAIL robots.txt: no newline characters");
    failed++;
  } else {
    console.log(`OK robots.txt: ${robots.split(/\r?\n/).length} lines`);
  }

  const htmlRes = await fetch(SHOPIFY);
  const html = await htmlRes.text();

  if (/S S e e r r v v/.test(html)) {
    console.error("FAIL nav: split-letter pattern found in HTML");
    failed++;
  } else {
    console.log("OK nav: no split-letter pattern in HTML");
  }

  if (!html.includes("data-char")) {
    console.error("FAIL nav: data-char HoverFlip not in HTML");
    failed++;
  } else {
    console.log("OK nav: data-char present");
  }

  const linkMatch = html.match(
    /href="(\/[^"]*)"[^>]*>Shopify and ecommerce engagement<\/a>/,
  );
  if (!linkMatch || linkMatch[1] !== "/industries/ecommerce-dtc") {
    console.error(
      `FAIL body link: expected /industries/ecommerce-dtc, got ${linkMatch?.[1] ?? "missing"}`,
    );
    failed++;
  } else {
    console.log("OK body link: /industries/ecommerce-dtc");
  }

  if (!html.includes("E-commerce development")) {
    console.error("FAIL related: E-commerce development missing");
    failed++;
  } else {
    console.log("OK related: E-commerce development");
  }

  if (!html.includes("Shopify to Headless Shopify")) {
    console.error("FAIL related: Shopify to Headless Shopify missing");
    failed++;
  } else {
    console.log("OK related: Shopify to Headless Shopify");
  }

  if (failed) {
    process.exit(1);
  }
  console.log("\nAll live checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
