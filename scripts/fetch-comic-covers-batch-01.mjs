import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.join(process.cwd(), "public", "images", "reading", "comics");
const covers = [
  ["baltimore-omnibus-volume-1", "https://images2.penguinrandomhouse.com/cover/9781506735696"],
  ["carnica-e-a-blindagem-mistica-parte-1", "https://acdn-us.mitiendanube.com/stores/025/918/products/carnica-e-a-blindagem-mistica-parte-011-4ac7ac70277a3258a516098270923738-640-0.webp"],
  ["lua-negra", "https://reddragonpublisher.com/wp-content/uploads/2023/10/Lua-Negra-Gigante-capa.webp"],
  ["a-propria-carne-escrito-com-sangue", "https://pipocaenanquim.com.br/media/catalog/product/cache/a71aea54aaaa85b910cda2569c1085f4/7/0/700x1000-a-propriacarne-mockup01.webp"],
  ["tres-buracos", "https://martinsfontespaulista.vteximg.com.br/arquivos/ids/226098-1000-1000/879254_ampliada.jpg?v=637249808693030000", true],
];

await mkdir(outputDirectory, { recursive: true });

for (const [slug, url, trim = false] of covers) {
  const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (compatible; henrique.dog editorial catalog)", referer: "https://www.itaucultural.org.br/" } });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status} em ${url}`);
  let image = sharp(Buffer.from(await response.arrayBuffer())).rotate();
  if (trim) image = image.trim();
  const rendered = await image.toBuffer({ resolveWithObject: true });
  const permitsSquareProductImage = slug === "carnica-e-a-blindagem-mistica-parte-1";
  if (!rendered.info.width || !rendered.info.height || rendered.info.width < 200 || (!permitsSquareProductImage && rendered.info.height <= rendered.info.width * 1.1)) {
    throw new Error(`${slug}: imagem inválida ou proporção inesperada ${rendered.info.width}x${rendered.info.height}`);
  }
  const written = await sharp(rendered.data).resize({ width: 800, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(outputDirectory, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
}
