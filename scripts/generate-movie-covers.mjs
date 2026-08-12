import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sources = await Promise.all([
  "movies.ts",
  "ghibliMovies.ts",
  "laikaMovies.ts",
].map((file) => readFile(path.join(root, "src/content/movies", file), "utf8")));
const source = sources.join("\n");
const output = path.join(root, "public/images/movies");
const moviePattern = /\{[\s\S]*?slug: "([^"]+)",[\s\S]*?titleBr: "([^"]+)", originalTitle: "([^"]+)",[\s\S]*?year: (\d{4})/g;
const palettes = [
  ["#111116", "#ffd400", "#f7f3e8"],
  ["#15110f", "#ef5b36", "#f8e9d4"],
  ["#091817", "#54d6a5", "#eaf7f2"],
  ["#141126", "#a88cff", "#f0ebff"],
  ["#16130b", "#f2ae30", "#fff4d6"],
];

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
  })[character]);
}

function wrapTitle(title, max = 15) {
  const words = title.split(" ");
  const lines = [];
  for (const word of words) {
    const last = lines.at(-1);
    if (!last || `${last} ${word}`.length > max) lines.push(word);
    else lines[lines.length - 1] = `${last} ${word}`;
  }
  return lines.slice(0, 4);
}

function hash(value) {
  return [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7);
}

await mkdir(output, { recursive: true });
const movies = [...source.matchAll(moviePattern)];

if (!movies.length) throw new Error("Nenhum filme encontrado em movies.ts");

for (const [, slug, title, originalTitle, year] of movies) {
  const seed = hash(slug);
  const [background, accent, foreground] = palettes[seed % palettes.length];
  const lines = wrapTitle(title).map((line, index) =>
    `<text x="58" y="${420 + (index * 76)}" fill="${foreground}" font-family="Arial, sans-serif" font-size="64" font-weight="800">${escapeXml(line)}</text>`,
  ).join("");
  const canRenderOriginalTitle = !/[^\u0000-\u024f]/.test(originalTitle);
  const original = originalTitle !== title && canRenderOriginalTitle
    ? `<text x="60" y="${745}" fill="${foreground}" opacity="0.68" font-family="Arial, sans-serif" font-size="22">${escapeXml(originalTitle.slice(0, 42))}</text>`
    : "";
  const svg = `<svg width="600" height="900" viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="900" fill="${background}"/>
    <circle cx="${110 + (seed % 370)}" cy="${110 + (seed % 180)}" r="210" fill="${accent}" opacity="0.12"/>
    <path d="M0 ${220 + (seed % 180)} L600 ${80 + (seed % 240)} L600 ${300 + (seed % 160)} L0 ${520 + (seed % 120)} Z" fill="${accent}" opacity="0.2"/>
    <rect x="58" y="72" width="34" height="34" fill="${accent}" transform="rotate(45 75 89)"/>
    <text x="112" y="96" fill="${foreground}" opacity="0.72" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3">CINEMA · ACERVO</text>
    ${lines}${original}
    <line x1="58" y1="800" x2="542" y2="800" stroke="${foreground}" opacity="0.18"/>
    <text x="58" y="850" fill="${accent}" font-family="Arial, sans-serif" font-size="26" font-weight="800">${year}</text>
    <text x="542" y="850" text-anchor="end" fill="${foreground}" opacity="0.6" font-family="Arial, sans-serif" font-size="16">CAPA EDITORIAL</text>
  </svg>`;

  await sharp(Buffer.from(svg)).webp({ quality: 76, effort: 6 }).toFile(path.join(output, `${slug}.webp`));
}

console.log(`${movies.length} capas editoriais geradas em public/images/movies`);
