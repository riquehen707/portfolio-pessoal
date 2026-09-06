import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { readingWorks } from "../src/content/reading/reading";
import { creators } from "../src/content/creators/creators";

async function main() {
const root = process.cwd();
const manifestPath = path.join(root, "src/content/reading/readingWorkCovers.ts");
const manifestSource = await readFile(manifestPath, "utf8");
const match = manifestSource.match(/export const readingWorkCovers: Record<string, ReadingWorkCover> = ([\s\S]+);/);
if (!match) throw new Error("Manifesto de capas não reconhecido.");
const manifest = Function(`return (${match[1]})`)() as Record<string, any>;
const names = new Map(creators.map((creator) => [creator.id, creator.name]));
const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();
const audit = JSON.parse(await readFile(path.join(root, "exports/content/media-audit.v1.json"), "utf8"));
const targetIds = new Set(audit.issues.filter((item: any) => item.entityType === "reading" && ["missing", "low-resolution"].includes(item.status)).map((item: any) => item.entityId));
const missing = readingWorks.filter((work) => targetIds.has(work.id));
const output = path.join(root, "public/images/reading/catalog");
await mkdir(output, { recursive: true });

for (const work of missing) {
  await new Promise((resolve) => setTimeout(resolve, 1600));
  const author = work.credits.map((credit) => names.get(credit.personId)).find(Boolean);
  const title = work.originalTitle;
  const query = [`intitle:${title}`, author ? `inauthor:${author}` : ""].filter(Boolean).join(" ");
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&printType=books`, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) { console.warn(`${work.id}: Google Books HTTP ${response.status}`); continue; }
  const items = ((await response.json()) as any).items ?? [];
  const expectedTitle = normalize(title);
  const expectedAuthor = normalize(author ?? "");
  const selected = items.find((item: any) => {
    const foundTitle = normalize(item.volumeInfo?.title ?? "");
    const foundAuthors = (item.volumeInfo?.authors ?? []).map(normalize);
    const titleMatches = foundTitle === expectedTitle || foundTitle.startsWith(`${expectedTitle} `);
    const authorMatches = !expectedAuthor || foundAuthors.some((value: string) => value.includes(expectedAuthor) || expectedAuthor.includes(value));
    return titleMatches && authorMatches && item.volumeInfo?.imageLinks?.thumbnail;
  });
  if (!selected) { console.warn(`${work.id}: sem correspondência exata para ${title} — ${author ?? "autor desconhecido"}`); continue; }
  const info = selected.volumeInfo;
  const imageUrl = (info.imageLinks.extraLarge ?? info.imageLinks.large ?? info.imageLinks.medium ?? info.imageLinks.small ?? info.imageLinks.thumbnail).replace("http://", "https://").replace(/&zoom=\d/, "&zoom=3");
  const coverResponse = await fetch(imageUrl, { signal: AbortSignal.timeout(15000) });
  if (!coverResponse.ok) { console.warn(`${work.id}: capa HTTP ${coverResponse.status}`); continue; }
  const input = Buffer.from(await coverResponse.arrayBuffer());
  const metadata = await sharp(input).metadata();
  if ((metadata.width ?? 0) < 180 || (metadata.height ?? 0) < 250) { console.warn(`${work.id}: capa pequena ${metadata.width}x${metadata.height}`); continue; }
  const written = await sharp(input).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(output, `${work.slug}.jpg`));
  manifest[work.id] = {
    src: `/images/reading/catalog/${work.slug}.jpg`,
    alt: `Capa de ${work.titleBr ?? work.originalTitle}`,
    sourceUrl: `https://books.google.com/books?id=${selected.id}`,
    credit: `${info.publisher ?? "Editora não identificada"} via Google Books`,
    rights: "permission-pending",
    width: written.width,
    height: written.height,
  };
  console.log(`${work.id}: ${written.width}x${written.height} — ${info.title} / ${(info.authors ?? []).join(", ")}`);
}

await writeFile(manifestPath, `import type { ReadingWork } from "./readingSchema";\n\ntype ReadingWorkCover = NonNullable<ReadingWork["image"]>;\n\nexport const readingWorkCovers: Record<string, ReadingWorkCover> = ${JSON.stringify(manifest, null, 2)};\n`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
