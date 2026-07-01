/**
 * Upload problem SVG icons + full problem cards into Sanity service documents.
 * Usage: npm run seed:service-problems
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

import { SECTION_COPY } from "../src/lib/content/service-detail-fallbacks";
import {
  SERVICE_PROBLEMS_BY_SLUG,
  SERVICE_PROBLEM_ICONS,
  type ServiceProblemSeed,
} from "../src/lib/content/service-problem-icons";

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

loadEnvLocal();

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token,
  useCdn: false,
});

const iconAssetCache = new Map<string, string>();

async function uploadSvgIcon(key: string) {
  const cached = iconAssetCache.get(key);
  if (cached) return cached;

  const icon = SERVICE_PROBLEM_ICONS[key as keyof typeof SERVICE_PROBLEM_ICONS];
  if (!icon) throw new Error(`Missing SVG for icon key "${key}"`);

  const buffer = Buffer.from(icon.svg, "utf8");
  const asset = await client.assets.upload("image", buffer, {
    filename: `${key}.svg`,
    contentType: "image/svg+xml",
  });

  iconAssetCache.set(key, asset._id);
  return asset._id;
}

async function mapProblemsForSanity(problems: ServiceProblemSeed[]) {
  return Promise.all(
    problems.map(async (problem, index) => {
      const assetId = await uploadSvgIcon(problem.iconKey);
      return {
        _type: "painPoint",
        _key: `problem-${index + 1}`,
        title: problem.title,
        subheading: problem.subheading,
        description: problem.description,
        icon: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
        },
      };
    }),
  );
}

const PROBLEMS_BY_SLUG = SERVICE_PROBLEMS_BY_SLUG;

const PARENT_SLUGS = [
  "ai-lead-site",
  "crm-pipeline-automation",
  "ai-receptionist",
  "custom-in-house-software-for-smbs",
  "platform-migrations",
  "ai-systems-retainer",
] as const;

async function main() {
  const docs = await client.fetch<
    {
      _id: string;
      slug?: { current?: string };
    }[]
  >(
    `*[_type == "service" && defined(slug.current)]{
      _id,
      slug
    }`,
  );

  let patched = 0;

  for (const slug of PARENT_SLUGS) {
    const doc = docs.find((entry) => entry.slug?.current === slug);
    if (!doc) {
      console.log(`– ${slug} skipped (no Sanity document)`);
      continue;
    }

    const seedProblems = PROBLEMS_BY_SLUG[slug];
    const sectionCopy = SECTION_COPY[slug];
    if (!seedProblems?.length) {
      console.log(`– ${slug} skipped (no seed data)`);
      continue;
    }

    const set: Record<string, unknown> = {
      problems: await mapProblemsForSanity(seedProblems),
    };

    if (sectionCopy?.problemsHeadline) {
      set.problemsHeadline = sectionCopy.problemsHeadline;
    }

    await client.patch(doc._id).set(set).commit();
    patched += 1;
    console.log(`✓ ${slug} → ${seedProblems.length} problem card(s), headline updated`);
  }

  console.log(`\nPatched ${patched} service document(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
