import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDirectory = path.join(root, "public", "images", "reading", "byung-chul-han");
const sourceBase = "https://vozes.com.br";

const covers = [
  ["sociedade-da-transparencia", "https://covers.openlibrary.org/b/id/13112651-L.jpg"],
  ["a-agonia-do-eros", `${sourceBase}/storage/posts/24553/16183_6570af7530a10.jpg`],
  ["topologia-da-violencia", `${sourceBase}/storage/posts/24553/24564_6570af756eb90.jpg`],
  ["no-enxame", `${sourceBase}/storage/posts/24553/24565_6570af75da689.jpg`],
  ["favor-fechar-os-olhos", `${sourceBase}/storage/posts/24553/16210_6570af76c2596.jpg`],
  ["capitalismo-e-impulso-de-morte", `${sourceBase}/storage/posts/24553/7314_6570af773b5b8.png`],
  ["o-desaparecimento-dos-rituais", `${sourceBase}/storage/posts/24553/16217_6570af777cc3d.jpg`],
  ["infocracia", `${sourceBase}/storage/posts/24553/16811_6570af78ea258.jpg`],
  ["nao-coisas", `${sourceBase}/storage/posts/24553/24666_6570af7967a9f.jpg`],
  ["vita-contemplativa", `${sourceBase}/storage/posts/24553/23549_6570af79bb036.jpg`],
];

await mkdir(outputDirectory, { recursive: true });

for (const [slug, url] of covers) {
  const response = await fetch(url, { headers: { "user-agent": "henrique.dog editorial catalog" } });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status} em ${url}`);
  const image = sharp(Buffer.from(await response.arrayBuffer())).rotate();
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height || metadata.height <= metadata.width) {
    throw new Error(`${slug}: proporção inesperada ${metadata.width}x${metadata.height}`);
  }
  const written = await image.webp({ quality: 84 }).toFile(path.join(outputDirectory, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
}
