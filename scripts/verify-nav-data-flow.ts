import fs from "node:fs";
import path from "node:path";

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

async function main() {
  const { getCustomSoftwareNavItems, getAllMigrations } = await import(
    "../src/lib/queries"
  );

  const cs = await getCustomSoftwareNavItems();
  console.log(
    "Custom software icons:",
    cs.map((i) => ({ title: i.title, hasIcon: Boolean(i.icon?.src), src: i.icon?.src?.slice(0, 60) })),
  );

  const migrations = await getAllMigrations();
  console.log(
    "Migration platform icons:",
    migrations.slice(0, 3).map((m) => ({
      title: m.title,
      hasIcons: Boolean(m.platformIcons),
      from: m.platformIcons?.from?.length,
      to: m.platformIcons?.to?.length,
    })),
  );
}

main().catch(console.error);
