import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnvLocal();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "umo6y27o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-05-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const counts = await client.fetch(
    `{"subService": count(*[_type == "subService"]), "serviceNavItem": count(*[_type == "serviceNavItem"])}`,
  );
  console.log(counts);
  if (process.argv.includes("--purge")) {
    const ids = await client.fetch<string[]>(`*[_type in ["subService", "serviceNavItem"]]._id`);
    for (const id of ids) {
      try {
        await client.delete(id);
        console.log(`deleted ${id}`);
      } catch (e) {
        console.warn(`skip ${id}:`, e instanceof Error ? e.message : e);
      }
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
