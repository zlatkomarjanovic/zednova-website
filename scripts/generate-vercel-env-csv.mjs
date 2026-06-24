import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");
const outPath = path.join(process.cwd(), "vercel-env-import.csv");

function parseEnvFile(file) {
  const vars = {};
  if (!fs.existsSync(file)) return vars;
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
    vars[key] = value;
  }
  return vars;
}

/** @type {{ key: string; type: string; target: string; comment: string; default?: string }[]} */
const defs = [
  {
    key: "NEXT_PUBLIC_SANITY_PROJECT_ID",
    type: "plain",
    target: "production,preview,development",
    comment: "Sanity project ID",
    default: "umo6y27o",
  },
  {
    key: "NEXT_PUBLIC_SANITY_DATASET",
    type: "plain",
    target: "production,preview,development",
    comment: "Sanity dataset",
    default: "production",
  },
  {
    key: "NEXT_PUBLIC_SANITY_API_VERSION",
    type: "plain",
    target: "production,preview,development",
    comment: "Sanity API version date",
    default: "2026-05-15",
  },
  {
    key: "NEXT_PUBLIC_SANITY_STUDIO_URL",
    type: "plain",
    target: "production,preview,development",
    comment: "Hosted Sanity Studio URL",
    default: "https://zednova-studio.sanity.studio",
  },
  {
    key: "SANITY_API_READ_TOKEN",
    type: "secret",
    target: "production,preview,development",
    comment: "Sanity read token for server-side CMS fetch",
    default: "",
  },
  {
    key: "SANITY_API_WRITE_TOKEN",
    type: "secret",
    target: "development",
    comment: "Sanity write token for npm run seed:sanity (optional on Vercel)",
    default: "",
  },
  {
    key: "RESEND_API_KEY",
    type: "secret",
    target: "production,preview,development",
    comment: "Resend API key for /api/contact",
    default: "",
  },
  {
    key: "RESEND_FROM_EMAIL",
    type: "plain",
    target: "production,preview,development",
    comment: "Verified Resend sender address",
    default: "ZedNova Contact <hello@zednova.com>",
  },
];

const local = parseEnvFile(envPath);

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const rows = [["key", "value", "type", "target", "comment"]];
for (const def of defs) {
  const value = local[def.key] ?? def.default ?? "";
  rows.push([def.key, value, def.type, def.target, def.comment]);
}

const csv = `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`;
fs.writeFileSync(outPath, csv, "utf8");
console.log(`Wrote ${outPath} (${defs.length} variables)`);
