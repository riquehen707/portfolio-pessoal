import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const batchNumber = Number(process.argv.find((value) => value.startsWith("--batch="))?.split("=")[1] ?? 1);
const batchSize = 20;
const reading = JSON.parse(await readFile(path.join(root, "exports/content/reading.v1.json"), "utf8"));
const audit = JSON.parse(await readFile(path.join(root, "exports/content/media-audit.v1.json"), "utf8"));
const missingIds = new Set(audit.issues.filter((item) => item.entityType === "reading" && item.status === "missing").map((item) => item.entityId));
const candidates = reading.works.filter((item) => missingIds.has(item.id));
const selectedBatch = candidates.slice((batchNumber - 1) * batchSize, batchNumber * batchSize);
const manifestPath = path.join(root, "src/content/reading/readingWorkCovers.ts");
const manifestSource = await readFile(manifestPath, "utf8");
const match = manifestSource.match(/export const readingWorkCovers: Record<string, ReadingWorkCover> = ([\s\S]+);/);
const manifest = match ? Function(`return (${match[1]})`)() : {};
const output = path.join(root, "public/images/reading/catalog");
const normalize = (value) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();
const titleOverrides = {
  read_work_poe_clan:"The Poe Clan", read_work_vampire_knight:"Vampire Knight", read_work_30_days_night:"30 Days of Night", read_work_american_vampire:"American Vampire", read_work_baltimore:"Baltimore", read_work_happiness_manga:"Happiness", read_work_call_night:"Call of the Night", read_work_unholy_blood:"Unholy Blood", read_work_drifting_classroom:"The Drifting Classroom", read_work_ptsd_radio:"PTSD Radio", read_work_homunculus:"Homunculus", read_work_sweet_home_webtoon:"Sweet Home", read_work_wotakoi:"Wotakoi", read_work_dress_up_darling:"My Dress-Up Darling", read_work_insomniacs:"Insomniacs After School", read_work_skip_loafer:"Skip and Loafer", read_work_sign_affection:"A Sign of Affection", read_work_sweat_soap:"Sweat and Soap", read_work_solanin:"Solanin", read_work_my_love_story:"My Love Story!!", read_work_nodame:"Nodame Cantabile",
  read_work_discipline_punish:"Discipline and Punish", read_work_history_sexuality_1:"The History of Sexuality Volume 1", read_work_history_madness:"Madness and Civilization", read_work_gender_trouble:"Gender Trouble", read_work_bodies_matter:"Bodies That Matter", read_work_precarious_life:"Precarious Life", read_work_freedom_will_schopenhauer:"On the Freedom of the Will", read_work_nicomachean_ethics:"Nicomachean Ethics", read_work_confessions_augustine:"Confessions", read_work_city_god_augustine:"City of God", read_work_art_statistics:"The Art of Statistics", read_work_demon_haunted_world:"The Demon-Haunted World", read_work_landscape_history:"The Landscape of History", read_work_style_clarity_grace:"Style Lessons in Clarity and Grace", read_work_economy_core:"The Economy", read_work_money_goldstein:"Money The True Story of a Made-Up Thing", read_work_return_depression_economics:"The Return of Depression Economics",
};
const authorOverrides = {
  read_work_poe_clan:"Moto Hagio", read_work_vampire_knight:"Matsuri Hino", read_work_30_days_night:"Steve Niles", read_work_american_vampire:"Scott Snyder", read_work_baltimore:"Mike Mignola", read_work_happiness_manga:"Shuzo Oshimi", read_work_unholy_blood:"Lina Im", read_work_drifting_classroom:"Kazuo Umezz", read_work_ptsd_radio:"Masaaki Nakayama", read_work_homunculus:"Hideo Yamamoto", read_work_sweet_home_webtoon:"Carnby Kim",
  read_work_discipline_punish:"Michel Foucault", read_work_history_sexuality_1:"Michel Foucault", read_work_history_madness:"Michel Foucault", read_work_gender_trouble:"Judith Butler", read_work_bodies_matter:"Judith Butler", read_work_precarious_life:"Judith Butler", read_work_freedom_will_schopenhauer:"Arthur Schopenhauer", read_work_nicomachean_ethics:"Aristotle", read_work_confessions_augustine:"Augustine", read_work_city_god_augustine:"Augustine", read_work_art_statistics:"David Spiegelhalter", read_work_demon_haunted_world:"Carl Sagan", read_work_landscape_history:"John Lewis Gaddis", read_work_style_clarity_grace:"Joseph M Williams", read_work_economy_core:"Samuel Bowles", read_work_money_goldstein:"Jacob Goldstein", read_work_return_depression_economics:"Paul Krugman",
};
await mkdir(output, { recursive:true });

for (const work of selectedBatch) {
  const queryTitle = titleOverrides[work.id] ?? work.originalTitle;
  const authorQuery = authorOverrides[work.id] ? `&author=${encodeURIComponent(authorOverrides[work.id])}` : "";
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(queryTitle)}${authorQuery}&limit=10&fields=key,title,author_name,cover_i,edition_key,isbn,publisher,language`;
  const response = await fetch(url, { headers:{ "user-agent":"henrique.dog editorial catalog" } });
  if (!response.ok) { console.warn(`Open Library ${response.status}: ${work.id}`); continue; }
  const docs = (await response.json()).docs.filter((doc) => doc.cover_i);
  const expected = normalize(queryTitle.replace(/vol(?:ume)?\.?\s*1$/i, ""));
  const doc = docs.find((item) => normalize(item.title ?? "") === expected)
    ?? docs.find((item) => normalize(item.title ?? "").includes(expected) || expected.includes(normalize(item.title ?? "")))
    ?? (authorOverrides[work.id] ? docs[0] : undefined);
  if (!doc) { console.warn(`Sem capa confirmada: ${work.id}`); continue; }
  let editionKey = doc.edition_key?.[0];
  try {
    const editions = await fetch(`https://openlibrary.org${doc.key}/editions.json?limit=50`, { headers:{ "user-agent":"henrique.dog editorial catalog" } }).then((item) => item.json());
    editionKey = editions.entries?.find((edition) => edition.covers?.includes(doc.cover_i))?.key?.split("/").at(-1) ?? editionKey;
  } catch {}
  const coverResponse = await fetch(`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`);
  if (!coverResponse.ok) { console.warn(`Capa ${coverResponse.status}: ${work.id}`); continue; }
  const written = await sharp(Buffer.from(await coverResponse.arrayBuffer())).jpeg({ quality:86, mozjpeg:true }).toFile(path.join(output, `${work.slug}.jpg`));
  manifest[work.id] = { src:`/images/reading/catalog/${work.slug}.jpg`, alt:`Capa de ${work.titleBr ?? work.originalTitle}`, sourceUrl:editionKey ? `https://openlibrary.org/books/${editionKey}` : `https://openlibrary.org${doc.key}`, credit:`${doc.publisher?.[0] ?? "Editora não identificada"} via Open Library`, rights:"permission-pending", width:written.width, height:written.height };
  console.log(`${work.id} ${written.width}x${written.height} <- ${editionKey ?? doc.key}`);
}

await writeFile(manifestPath, `import type { ReadingWork } from "./readingSchema";\n\ntype ReadingWorkCover = NonNullable<ReadingWork["image"]>;\n\nexport const readingWorkCovers: Record<string, ReadingWorkCover> = ${JSON.stringify(manifest, null, 2)};\n`, "utf8");
console.log(`Lote ${batchNumber}: ${selectedBatch.length} investigadas; ${Object.keys(manifest).length} capas registradas no total.`);
