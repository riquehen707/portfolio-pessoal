import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import * as cheerio from "cheerio";

const root = process.cwd();
const catalog = JSON.parse(await readFile(path.join(root, "exports/content/series.v1.json"), "utf8")).records;
const output = path.join(root, "public/images/series");
const manifestPath = path.join(root, "src/content/series/posters.ts");
const existingSource = await readFile(manifestPath, "utf8");
const existingMatch = existingSource.match(/export const seriesPosterCatalog = ([\s\S]+) as const;/);
const manifest = existingMatch ? Function(`return (${existingMatch[1]})`)() : {};
const normalize = (value) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();
const titleOverrides = { "sirius-the-jaeger":"Sirius the Jaeger", "imortais-serie-turca":"Immortals", "30-moedas":"30 Coins", desalma:"Unsoul" };
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, attempts = 4) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": "henrique.dog editorial catalog" } });
    if (response.status !== 429 || attempt === attempts) return response;
    await wait(attempt * 1500);
  }
}

await mkdir(output, { recursive: true });
for (const series of catalog) {
  if (manifest[series.slug]) {
    try { await access(path.join(root, "public", manifest[series.slug].src.replace(/^\//, ""))); continue; } catch {}
  }
  await wait(1200);
  const searchTitle = titleOverrides[series.slug] ?? series.originalTitle;
  const query = encodeURIComponent(`${searchTitle} y:${series.startYear}`);
  const searchUrl = `https://www.themoviedb.org/search/tv?query=${query}&language=en-US`;
  const response = await fetchWithRetry(searchUrl);
  if (!response.ok) { console.warn(`TMDB ${response.status}: ${series.slug}`); continue; }
  const $ = cheerio.load(await response.text());
  const candidates = $('[class*="comp:media-card"]').map((_, element) => {
    const card = $(element);
    const href = card.find('a[data-media-type="tv"]').first().attr("href")?.split("?")[0];
    const image = card.find("img.poster").first();
    return { href, title:image.attr("alt"), imagePath:image.attr("src")?.split("/").at(-1), year:Number(card.find(".release_date").first().text().match(/\d{4}/)?.[0]) };
  }).get().filter((item) => item.href && item.imagePath);
  const expected = normalize(searchTitle);
  const selected = candidates.find((item) => normalize(item.title ?? "") === expected && item.year === series.startYear)
    ?? candidates.find((item) => item.year === series.startYear && (normalize(item.title ?? "").includes(expected) || expected.includes(normalize(item.title ?? ""))))
    ?? candidates.find((item) => normalize(item.title ?? "") === expected);
  if (!selected) { console.warn(`Sem pôster confirmado: ${series.slug}`); continue; }
  const imageUrl = `https://media.themoviedb.org/t/p/w500/${selected.imagePath}`;
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) { console.warn(`Imagem TMDB ${imageResponse.status}: ${series.slug}`); continue; }
  const written = await sharp(Buffer.from(await imageResponse.arrayBuffer())).resize({ width:500, withoutEnlargement:true }).webp({ quality:78, effort:6 }).toFile(path.join(output, `${series.slug}.webp`));
  manifest[series.slug] = { src:`/images/series/${series.slug}.webp`, alt:`Pôster de ${series.titleBr} (${series.startYear})`, sourceUrl:`https://www.themoviedb.org${selected.href}`, credit:"Pôster promocional via The Movie Database (TMDB); direitos dos respectivos titulares", rights:"permission-pending", width:written.width, height:written.height };
  console.log(`${series.slug} ${written.width}x${written.height} <- ${selected.href}`);
}
for (const [slug, poster] of Object.entries(manifest)) {
  try {
    const metadata = await sharp(path.join(root, "public", poster.src.replace(/^\//, ""))).metadata();
    manifest[slug] = { ...poster, width:metadata.width, height:metadata.height };
  } catch {}
}
await writeFile(manifestPath, `export const seriesPosterCatalog = ${JSON.stringify(manifest, null, 2)} as const;\n`, "utf8");
console.log(`${Object.keys(manifest).length}/${catalog.length} pôsteres de séries registrados.`);
