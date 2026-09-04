import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const batchNumber = Number(process.argv.find((value) => value.startsWith("--batch="))?.split("=")[1] ?? 1);
const reading = JSON.parse(await readFile(path.join(root, "exports/content/reading.v1.json"), "utf8"));
const audit = JSON.parse(await readFile(path.join(root, "exports/content/media-audit.v1.json"), "utf8"));
const missingIds = new Set(audit.issues.filter((item) => item.entityType === "reading" && item.status === "missing").map((item) => item.entityId));
const authors = {
  read_work_30_days_night:"Steve Niles", read_work_american_vampire:"Scott Snyder", read_work_baltimore:"Mike Mignola",
  read_work_dracula_motherfucker:"Alex de Campi", read_work_killadelphia:"Rodney Barnes", read_work_happiness_manga:"Shuzo Oshimi",
  read_work_unholy_blood:"Lina Im", read_work_drifting_classroom:"Kazuo Umezz", read_work_ptsd_radio:"Masaaki Nakayama",
  read_work_homunculus:"Hideo Yamamoto", read_work_sweet_home_webtoon:"Carnby Kim", read_work_wotakoi:"Fujita",
  read_work_dress_up_darling:"Shinichi Fukuda", read_work_insomniacs:"Makoto Ojiro", read_work_skip_loafer:"Misaki Takamatsu",
  read_work_sweat_soap:"Kintetsu Yamada", read_work_solanin:"Inio Asano", read_work_nodame:"Tomoko Ninomiya",
};
const titles = {
  read_work_30_days_night:"30 Days of Night, Vol. 1", read_work_american_vampire:"American Vampire Vol. 1",
  read_work_baltimore:"Baltimore Vol. 1", read_work_happiness_manga:"Happiness 1", read_work_unholy_blood:"Unholy Blood Vol. 1",
  read_work_drifting_classroom:"The Drifting Classroom Vol. 1", read_work_ptsd_radio:"PTSD Radio Vol. 1",
  read_work_homunculus:"Homunculus Vol. 1", read_work_sweet_home_webtoon:"Sweet Home Vol. 1", read_work_wotakoi:"Wotakoi Vol. 1",
  read_work_dress_up_darling:"My Dress-Up Darling Vol. 1", read_work_insomniacs:"Insomniacs After School Vol. 1",
  read_work_skip_loafer:"Skip and Loafer Vol. 1", read_work_sweat_soap:"Sweat and Soap Vol. 1", read_work_nodame:"Nodame Cantabile Vol. 1",
};
const excluded = new Set(["read_work_carnica_blindagem","read_work_lua_negra","read_work_propria_carne","read_work_tres_buracos"]);
const candidates = reading.works.filter((item) => missingIds.has(item.id) && authors[item.id] && !excluded.has(item.id));
const selectedBatch = candidates.slice((batchNumber - 1) * 20, batchNumber * 20);
const manifestPath = path.join(root, "src/content/reading/readingWorkCovers.ts");
const source = await readFile(manifestPath, "utf8");
const start = source.indexOf("{", source.indexOf("readingWorkCovers"));
const end = source.lastIndexOf("};");
const manifest = JSON.parse(source.slice(start, end + 1));
const output = path.join(root, "public/images/reading/catalog");
await mkdir(output, { recursive:true });

for (const work of selectedBatch) {
  const title = titles[work.id] ?? work.originalTitle;
  const query = `intitle:${title} inauthor:${authors[work.id]}`;
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&printType=books`);
  if (!response.ok) { console.warn(`Google Books ${response.status}: ${work.id}`); continue; }
  const items = (await response.json()).items ?? [];
  const expectedAuthor = authors[work.id].toLowerCase();
  const selected = items.find((item) => item.volumeInfo.imageLinks?.thumbnail && item.volumeInfo.authors?.some((author) => author.toLowerCase().includes(expectedAuthor) || expectedAuthor.includes(author.toLowerCase())));
  if (!selected) { console.warn(`Sem capa confirmada: ${work.id}`); continue; }
  const info = selected.volumeInfo;
  const imageUrl = info.imageLinks.extraLarge ?? info.imageLinks.large ?? info.imageLinks.medium ?? info.imageLinks.thumbnail;
  const coverResponse = await fetch(imageUrl.replace("http://", "https://"));
  if (!coverResponse.ok) { console.warn(`Capa ${coverResponse.status}: ${work.id}`); continue; }
  const written = await sharp(Buffer.from(await coverResponse.arrayBuffer())).jpeg({ quality:86, mozjpeg:true }).toFile(path.join(output, `${work.slug}.jpg`));
  const isbn = info.industryIdentifiers?.find((item) => item.type === "ISBN_13")?.identifier ?? info.industryIdentifiers?.[0]?.identifier;
  manifest[work.id] = { src:`/images/reading/catalog/${work.slug}.jpg`, alt:`Capa de ${work.titleBr ?? work.originalTitle}${isbn ? `, edição ISBN ${isbn}` : ""}`, sourceUrl:`https://books.google.com/books?id=${selected.id}`, credit:`${info.publisher ?? "Editora não identificada"} via Google Books`, rights:"permission-pending", width:written.width, height:written.height };
  console.log(`${work.id} ${written.width}x${written.height} ${info.title} — ${info.authors?.join(", ")} <- ${selected.id}`);
}
await writeFile(manifestPath, `import type { ReadingWork } from "./readingSchema";\n\ntype ReadingWorkCover = NonNullable<ReadingWork["image"]>;\n\nexport const readingWorkCovers: Record<string, ReadingWorkCover> = ${JSON.stringify(manifest, null, 2)};\n`, "utf8");
console.log(`Google Books lote ${batchNumber}: ${selectedBatch.length} investigadas; ${Object.keys(manifest).length} capas no catálogo.`);
