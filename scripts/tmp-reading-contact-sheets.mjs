import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const input = path.join(process.cwd(), "public/images/reading/catalog");
const output = path.join(process.cwd(), ".tmp-image-audit");
await mkdir(output, { recursive: true });
const files = (await readdir(input)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file)).sort();
for (let offset = 0; offset < files.length; offset += 25) {
  const batch = files.slice(offset, offset + 25);
  const tiles = [];
  for (let index = 0; index < batch.length; index++) {
    const file = batch[index];
    const cover = await sharp(path.join(input, file)).resize(150, 205, { fit: "contain", background: "#eee" }).png().toBuffer();
    const label = Buffer.from(`<svg width="180" height="35"><rect width="180" height="35" fill="#fff"/><text x="4" y="14" font-family="Arial" font-size="9" fill="#111">${file.replace(/&/g,"&amp;").slice(0,30)}</text><text x="4" y="27" font-family="Arial" font-size="9" fill="#555">${offset + index + 1}</text></svg>`);
    tiles.push({ input: cover, left: (index % 5) * 180 + 15, top: Math.floor(index / 5) * 250 + 5 });
    tiles.push({ input: label, left: (index % 5) * 180, top: Math.floor(index / 5) * 250 + 210 });
  }
  await sharp({ create: { width: 900, height: 1250, channels: 3, background: "#ddd" } }).composite(tiles).jpeg({ quality: 85 }).toFile(path.join(output, `reading-${offset / 25 + 1}.jpg`));
}
console.log(`${files.length} capas em ${Math.ceil(files.length / 25)} folhas.`);
