/**
 * Push service FAQ items + section copy into Sanity (only when FAQ list is empty).
 * Usage: npm run seed:service-faqs
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { FAQ_SECTION_COPY } from "../src/lib/content/service-detail-fallbacks";
import { serviceFaqsBySlug } from "../src/lib/content/service-faqs";
import { services } from "../src/lib/content/services";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token,
  useCdn: false,
});

const servicesBySlug = new Map(services.map((service) => [service.slug, service]));

type SanityService = {
  _id: string;
  slug?: { current?: string };
  faqs?: unknown[];
  faqEyebrow?: string;
  faqHeadline?: string;
  faqSubtext?: string;
};

function mapFaqsForSanity(faqs: { question: string; answer: string }[]) {
  return faqs.map((faq, index) => {
    const anchor = slugify(faq.question).slice(0, 60) || `faq-${index + 1}`;
    return {
      _type: "articleFaq",
      _key: anchor.slice(0, 20),
      id: { _type: "slug", current: anchor },
      question: faq.question,
      answer: faq.answer,
    };
  });
}

async function main() {
  const docs = await client.fetch<SanityService[]>(
    `*[_type == "service" && defined(slug.current)]{
      _id,
      slug,
      faqs,
      faqEyebrow,
      faqHeadline,
      faqSubtext
    }`,
  );

  let patched = 0;
  let skipped = 0;

  for (const doc of docs) {
    const slug = doc.slug?.current;
    if (!slug) continue;

    const source = servicesBySlug.get(slug);
    const sectionCopy = FAQ_SECTION_COPY[slug];
    const sourceFaqs = serviceFaqsBySlug[slug] ?? source?.faqs ?? [];

    if (sourceFaqs.length === 0 && !sectionCopy) {
      skipped += 1;
      continue;
    }

    const hasFaqs = Array.isArray(doc.faqs) && doc.faqs.length > 0;
    const hasSectionCopy = Boolean(
      doc.faqEyebrow?.trim() && doc.faqHeadline?.trim() && doc.faqSubtext?.trim(),
    );

    if (hasFaqs && hasSectionCopy) {
      console.log(`– ${slug} already has FAQ content, skipped`);
      skipped += 1;
      continue;
    }

    const set: Record<string, unknown> = {};

    if (!hasFaqs && sourceFaqs.length > 0) {
      set.faqs = mapFaqsForSanity(sourceFaqs);
    }

    if (sectionCopy) {
      if (!doc.faqEyebrow?.trim()) set.faqEyebrow = sectionCopy.eyebrow;
      if (!doc.faqHeadline?.trim()) set.faqHeadline = sectionCopy.headline;
      if (!doc.faqSubtext?.trim()) set.faqSubtext = sectionCopy.subtext;
    }

    if (Object.keys(set).length === 0) {
      skipped += 1;
      continue;
    }

    await client.patch(doc._id).set(set).commit();
    patched += 1;
    console.log(
      `✓ ${slug} → ${set.faqs ? `${(set.faqs as unknown[]).length} FAQ item(s)` : "no FAQ items"}, section copy ${sectionCopy ? "set" : "unchanged"}`,
    );
  }

  console.log(`\nPatched ${patched} service document(s), skipped ${skipped}.`);
  console.log(
    "Redeploy Studio if FAQ eyebrow/headline/subtext fields are missing: cd studio-zednova-studio && npm run deploy",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
