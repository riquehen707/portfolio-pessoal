import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.join(process.cwd(), "public", "images", "reading", "manga");
const covers = [
  ["insomniacs-after-school-01", "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974736577/insomniacs-after-school-vol-1-9781974736577_hr.jpg"],
  ["nodame-cantabile-01", "https://covers.openlibrary.org/b/isbn/9784063259681-L.jpg"],
];

await mkdir(outputDirectory, { recursive: true });

for (const [slug, url] of covers) {
  const response = await fetch(url, { headers: { "user-agent": "henrique.dog editorial catalog" } });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status} em ${url}`);
  const image = sharp(Buffer.from(await response.arrayBuffer())).rotate();
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height || metadata.width < 200 || metadata.height <= metadata.width) {
    throw new Error(`${slug}: imagem inválida ou proporção inesperada ${metadata.width}x${metadata.height}`);
  }
  const written = await image.webp({ quality: 84 }).toFile(path.join(outputDirectory, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
}
