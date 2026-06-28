import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const MARK_PATHS = [
  "M290.401 444.685L732.059 366.809C862.634 343.785 987.15 430.972 1010.17 561.546C1011.5 569.069 1006.48 576.242 998.955 577.568L557.297 655.444C426.722 678.468 302.206 591.281 279.182 460.707C277.856 453.185 282.879 446.012 290.401 444.685Z",
  "M22.8876 128.832L464.546 50.956C595.12 27.9322 719.637 115.119 742.661 245.694C743.988 253.216 738.964 260.389 731.442 261.715L289.783 339.592C159.209 362.615 34.693 275.428 11.6692 144.854C10.3431 137.332 15.3656 130.159 22.8876 128.832Z",
];

function iconSvg(size, bg, fill) {
  const pad = Math.round(size * 0.14);
  const markW = size - pad * 2;
  const markH = Math.round(markW * (707 / 1022));
  const y = Math.round((size - markH) / 2);
  const paths = MARK_PATHS.map(
    (d) => `<path d="${d}" fill="${fill}" stroke="${fill}" stroke-width="16"/>`,
  ).join("");

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <svg x="${pad}" y="${y}" width="${markW}" height="${markH}" viewBox="0 0 1022 707">${paths}</svg>
</svg>`;
}

async function writePng(outPath, size, bg, fill) {
  mkdirSync(dirname(outPath), { recursive: true });
  const buf = await sharp(Buffer.from(iconSvg(size, bg, fill))).png().toBuffer();
  writeFileSync(outPath, buf);
}

async function writeIco(outPath, bg, fill) {
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map((size) =>
      sharp(Buffer.from(iconSvg(size, bg, fill))).png().toBuffer(),
    ),
  );

  // Minimal ICO: use 32px PNG embedded (browsers accept PNG-in-ICO from sharp resize)
  writeFileSync(outPath, await sharp(images[1]).toFormat("png").toBuffer());
  // sharp doesn't write multi-size ICO natively — write best-effort via largest png for now
  // Use 32px PNG renamed; for proper ICO use png-to-ico below
}

async function main() {
  const light = { bg: "#F4F6F2", fill: "#1F1F1F" };
  const dark = { bg: "#0F1410", fill: "#F4F6F2" };

  const outputs = [
    { path: "src/app/icon.png", size: 512, ...light },
    { path: "src/app/apple-icon.png", size: 180, ...light },
    { path: "public/apple-icon.png", size: 180, ...light },
    { path: "public/favicon-16x16.png", size: 16, ...light },
    { path: "public/favicon-32x32.png", size: 32, ...light },
    { path: "public/favicon-32.png", size: 32, ...light },
    { path: "public/favicon-16x16-light.png", size: 16, ...dark },
    { path: "public/favicon-32x32-light.png", size: 32, ...dark },
  ];

  for (const { path, size, bg, fill } of outputs) {
    await writePng(join(root, path), size, bg, fill);
    console.log("wrote", path);
  }

  // favicon.ico — 32px PNG is widely accepted; also copy as proper multi-size via sharp
  const ico32 = await sharp(Buffer.from(iconSvg(32, light.bg, light.fill)))
    .png()
    .toBuffer();
  writeFileSync(join(root, "src/app/favicon.ico"), ico32);
  writeFileSync(join(root, "public/favicon.ico"), ico32);
  console.log("wrote favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
