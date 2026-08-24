import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.join(process.cwd(), "public", "images", "reading", "byung-chul-han");
const covers = [
  ["psicopolitica", "https://www.ayine.com.br/cdn/shop/files/TRZ-14-Psicopolitica-Capa.png?v=1743006689&width=1000"],
  ["o-aroma-do-tempo", "https://martinsfontespaulista.vteximg.com.br/arquivos/ids/331526-1000-1000/834667_ampliada.jpg?v=637251506560730000", true],
  ["a-expulsao-do-outro", "https://covers.openlibrary.org/b/isbn/9786557133507-L.jpg"],
  ["a-crise-da-narracao", "https://covers.openlibrary.org/b/isbn/9788532665690-L.jpg", true],
];

await mkdir(outputDirectory, { recursive: true });

for (const [slug, url, trim = false] of covers) {
  const response = await fetch(url, { headers: { "user-agent": "henrique.dog editorial catalog" } });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status} em ${url}`);
  let image = sharp(Buffer.from(await response.arrayBuffer())).rotate();
  if (trim) image = image.trim();
  const rendered = await image.toBuffer({ resolveWithObject: true });
  if (!rendered.info.width || !rendered.info.height || rendered.info.width < 200 || rendered.info.height <= rendered.info.width * 1.1) {
    throw new Error(`${slug}: imagem inválida ou proporção inesperada ${rendered.info.width}x${rendered.info.height}`);
  }
  const written = await sharp(rendered.data).webp({ quality: 84 }).toFile(path.join(outputDirectory, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
}
