import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

function loadEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
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

const desc =
  "Full-stack web development, custom software, and AI automations for businesses that want one team from website and product build through CRM workflows, integrations, and AI tools.";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

async function main() {
  await client
    .patch("siteSettings")
    .set({
      siteDescription: desc,
      seo: {
        seoTitle: "ZedNova Studio | Web Development, Software & AI Automations",
        seoDescription: desc,
      },
    })
    .commit();

  console.log("siteSettings SEO updated");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
