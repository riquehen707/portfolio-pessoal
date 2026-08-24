import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import * as cheerio from "cheerio";

const root = process.cwd();
const normalizeExistingOnly = process.argv.includes("--normalize-existing");
const sourceFiles = ["movies.ts", "ghibliMovies.ts", "laikaMovies.ts", "scienceFictionMovies.ts", "monsterMovies.ts", "naturalDisasterMovies.ts"];
const source = (await Promise.all(sourceFiles.map((file) =>
  readFile(path.join(root, "src/content/movies", file), "utf8"),
))).join("\n");
const moviePattern = /\{[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?titleBr:\s*"([^"]+)",\s*originalTitle:\s*"([^"]+)",(?:\s*internationalTitle:\s*"([^"]+)",)?[\s\S]*?year:\s*(\d{4})/g;
const movies = [...source.matchAll(moviePattern)].map(([, slug, titleBr, originalTitle, internationalTitle, year]) => ({
  slug, titleBr, originalTitle, internationalTitle, year: Number(year),
}));
const output = path.join(root, "public/images/movies");
const posterSourcePath = path.join(root, "src/content/movies/posters.ts");
const posterSource = await readFile(posterSourcePath, "utf8");
const manifestMatch = posterSource.match(/export const posterCatalog = ([\s\S]+) as const;/);
const wikipediaPoster = (src, alt, sourceUrl) => ({
  src,
  alt,
  sourceUrl,
  credit: "Pôster promocional reproduzido na Wikipedia; direitos dos respectivos titulares",
  rights: "permission-pending",
});
const manifest = manifestMatch
  ? Function("wikipediaPoster", `return (${manifestMatch[1]})`)(wikipediaPoster)
  : {};
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const titleOverrides = {
  "a-bruxa": "The Witch", "deixe-ela-entrar": "Let the Right One In",
  "o-orfanato": "The Orphanage", "a-pele-que-habito": "The Skin I Live In",
  "atividade-paranormal": "Paranormal Activity",
  "o-lamento": "The Wailing", "o-hospedeiro": "The Host", "invasao-zumbi": "Train to Busan",
  "kairo": "Pulse", "medo": "A Tale of Two Sisters", "grave": "Raw",
  "quando-o-mal-espreita": "When Evil Lurks", "as-boas-maneiras": "Good Manners",
  "one-cut-of-the-dead": "One Cut of the Dead",
  "homem-com-h": "Latin Blood The Ballad of Ney Matogrosso",
  "a-sociedade-da-neve": "Society of the Snow",
  "apocalipse-nos-tropicos": "Apocalypse in the Tropics",
  "edificio-master": "Master, a Building in Copacabana",
  "rua-do-medo-1994": "Fear Street: 1994",
  "rua-do-medo-1978": "Fear Street: 1978",
  "rua-do-medo-1666": "Fear Street: 1666",
  "apollo-10-e-meio": "Apollo 10½: A Space Age Childhood",
  "nausicaa-do-vale-do-vento": "Warriors of the Wind",
  "o-castelo-no-ceu": "Castle in the Sky", "meu-amigo-totoro": "My Neighbor Totoro",
  "o-servico-de-entregas-da-kiki": "Kiki's Delivery Service", "memorias-de-ontem": "Only Yesterday",
  "porco-rosso": "Porco Rosso", "eu-posso-ouvir-o-oceano": "Ocean Waves", "pom-poko": "Pom Poko",
  "sussurros-do-coracao": "Whisper of the Heart", "princesa-mononoke": "Princess Mononoke",
  "meus-vizinhos-os-yamadas": "My Neighbors the Yamadas", "ponyo": "Ponyo",
  "o-mundo-dos-pequeninos": "The Secret World of Arrietty", "da-colina-kokuriko": "From Up on Poppy Hill",
  "o-conto-da-princesa-kaguya": "The Tale of the Princess Kaguya",
  "o-cacador-de-troll": "Troll Hunter",
  "japao-submerso-1973": "Submersion of Japan",
};
const normalize = (value) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();

async function fetchWithRetry(url, attempts = 4) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": "henrique.dog editorial catalog" } });
    if (response.status !== 429 || attempt === attempts) return response;
    await wait(attempt * 1500);
  }
}

await mkdir(output, { recursive: true });

for (const movie of movies) {
  if (manifest[movie.slug]) {
    try {
      const existingPath = path.join(root, "public", manifest[movie.slug].src.replace(/^\//, ""));
      await access(existingPath);
      const metadata = await sharp(existingPath).metadata();
      manifest[movie.slug] = { ...manifest[movie.slug], width: metadata.width, height: metadata.height };
      continue;
    } catch {
      // O registro existe, mas o arquivo sumiu: buscar novamente.
    }
  }
  if (normalizeExistingOnly) continue;
  await wait(1200);
  const searchTitle = titleOverrides[movie.slug] ?? movie.internationalTitle ?? movie.originalTitle;
  const query = encodeURIComponent(`${searchTitle} y:${movie.year}`);
  const searchUrl = `https://www.themoviedb.org/search/movie?query=${query}&language=en-US`;
  const html = await fetchWithRetry(searchUrl).then((response) => {
    if (!response.ok) throw new Error(`TMDB ${response.status}: ${movie.slug}`);
    return response.text();
  });
  const $ = cheerio.load(html);
  const candidates = $('[class*="comp:media-card"]').map((_, element) => {
    const card = $(element);
    const href = card.find('a[data-media-type="movie"]').first().attr("href")?.split("?")[0];
    const image = card.find("img.poster").first();
    const title = image.attr("alt");
    const imagePath = image.attr("src")?.split("/").at(-1);
    const releaseYear = Number(card.find(".release_date").first().text().match(/\d{4}/)?.[0]);
    return { href, title, imagePath, releaseYear };
  }).get().filter((candidate) => candidate.href && candidate.imagePath);
  const expected = normalize(searchTitle);
  const selected = candidates.find((candidate) => {
    const actual = normalize(candidate.title ?? "");
    return actual === expected;
  }) ?? candidates.find((candidate) => {
    const actual = normalize(candidate.title ?? "");
    return candidate.releaseYear === movie.year && (actual.includes(expected) || expected.includes(actual));
  });
  if (!selected) {
    console.warn(`Sem pôster confirmado: ${movie.slug}`);
    continue;
  }
  const imageUrl = `https://media.themoviedb.org/t/p/w500/${selected.imagePath}`;
  const image = await fetch(imageUrl).then(async (response) => {
    if (!response.ok) throw new Error(`Imagem TMDB ${response.status}: ${movie.slug}`);
    return Buffer.from(await response.arrayBuffer());
  });
  const written = await sharp(image).resize({ width: 500, withoutEnlargement: true }).webp({ quality: 78, effort: 6 })
    .toFile(path.join(output, `${movie.slug}.webp`));
  manifest[movie.slug] = {
    src: `/images/movies/${movie.slug}.webp`,
    alt: `Pôster de ${movie.titleBr} (${movie.year})`,
    sourceUrl: `https://www.themoviedb.org${selected.href}`,
    credit: "Pôster promocional via The Movie Database (TMDB); direitos dos respectivos titulares",
    rights: "permission-pending",
    width: written.width,
    height: written.height,
  };
  console.log(`${movie.slug} <- ${selected.href}`);
}

for (const [slug, poster] of Object.entries(manifest)) {
  try {
    const existingPath = path.join(root, "public", poster.src.replace(/^\//, ""));
    const metadata = await sharp(existingPath).metadata();
    manifest[slug] = { ...poster, width: metadata.width, height: metadata.height };
  } catch {
    // A auditoria de mídia registrará referências locais ausentes ou ilegíveis.
  }
}

await writeFile(
  path.join(root, "src/content/movies/posters.ts"),
  `export const posterCatalog = ${JSON.stringify(manifest, null, 2)} as const;\n`,
  "utf8",
);
console.log(`${Object.keys(manifest).length}/${movies.length} pôsteres existentes registrados.`);
