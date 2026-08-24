import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.join(process.cwd(), "public", "images", "reading", "manga");
const covers = [
  ["happiness-01", "https://cdn.awsli.com.br/2500x2500/54/54752/produto/29150887/2bda9b1f5b.jpg", true],
  ["call-of-the-night-01", "https://books.google.com.br/books/content?id=tcHyzwEACAAJ&printsec=frontcover&img=1&zoom=2"],
  ["solanin-volume-unico", "https://www.lpm.com.br/livros/imagens/solanin_vol_unico_15x21_9786556663395_hd.jpg"],
];

await mkdir(outputDirectory, { recursive: true });

for (const [slug, url, trim = false] of covers) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (compatible; henrique.dog editorial catalog)" } });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status} em ${url}`);
  let image = sharp(Buffer.from(await response.arrayBuffer())).rotate();
  if (trim) image = image.trim();
  const rendered = await image.toBuffer({ resolveWithObject: true });
  if (!rendered.info.width || !rendered.info.height || rendered.info.width < 200 || rendered.info.height <= rendered.info.width * 1.1) {
    throw new Error(`${slug}: imagem inválida ou proporção inesperada ${rendered.info.width}x${rendered.info.height}`);
  }
  const written = await sharp(rendered.data).resize({ width: 800, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(outputDirectory, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
}
