import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const output = path.join(root, "public/images/reading/catalog");
const manifestPath = path.join(root, "src/content/reading/readingWorkCovers.ts");
const entries = [
  ["read_work_unholy_blood", "unholy-blood", "White Blood", "https://yenpress.com/titles/9798400901126-unholy-blood-vol-1", "https://images.yenpress.com/imgs/9798400901126.jpg?w=285&h=422&type=books&s=3f37730be0cc529b7e4a3734589b5a1d", "Ize Press"],
  ["read_work_dracula_motherfucker", "dracula-motherfucker", "Dracula, Motherf**ker!", "https://imagecomics.com/comics/series/dracula-motherf-ker", "https://cdn.imagecomics.com/assets/i/releases/575509/dracula-motherf-ker-hc_30cfc72562.jpg", "Image Comics"],
  ["read_work_killadelphia", "killadelphia", "Killadelphia", "https://imagecomics.com/comics/releases/killadelphia-book-one", "https://cdn.imagecomics.com/assets/i/releases/892318/killadelphia-book-one_f6a8522892.jpg", "Image Comics"],
  ["read_work_baltimore", "baltimore", "Baltimore", "https://digital.darkhorse.com/books/0ef2bbe6b8a146dfa9f2f4bdc97a6d49/baltimore-omnibus-volume-1", "https://covers.openlibrary.org/b/isbn/9781506724686-L.jpg", "Dark Horse Comics via Open Library"],
  ["read_work_sweet_home_webtoon", "sweet-home-webtoon", "Sweet Home", "https://www.normaeditorial.com/ficha/manga/sweet-home/sweet-home-1", "https://www.normaeditorial.com/upload/media/albumes/0001/40/thumb_39356_albumes_big.jpeg", "Norma Editorial"],
  ["read_work_dress_up_darling", "my-dress-up-darling", "Minha Adorável Cosplayer", "https://squareenixmangaandbooks.square-enix-games.com/en-us/product/9781646090327", "https://fyre.cdn.sewest.net/manga-books/610a98293b7287001317db44/cover-img-247x350-my-dress-up-darling-01-cover-final-re-76111013720733822.jpg?quality=85&width=768", "Square Enix Manga & Books"],
  ["read_work_nana", "nana", "Nana", "https://www.viz.com/manga-books/manga/nana-25th-anniversary-edition-volume-1-0/product/8543", "https://dw9to29mmj727.cloudfront.net/products/1974758281.png", "VIZ Media"],
  ["read_work_bloom_into_you", "bloom-into-you", "Bloom Into You", "https://sevenseasentertainment.com/books/bloom-into-you-vol-1/", "https://sevenseasentertainment.com/wp-content/uploads/2017/01/bloomintoyou1.jpg", "Seven Seas Entertainment"],
  ["read_work_solanin", "solanin", "Solanin", "https://www.viz.com/manga-books/manga/solanin/product/1889", "https://dw9to29mmj727.cloudfront.net/products/1421523213.jpg", "VIZ Media"],
  ["read_work_my_love_story", "ore-monogatari", "My Love Story!!", "https://www.viz.com/manga-books/manga/my-love-story-volume-1/product/3458", "https://dw9to29mmj727.cloudfront.net/products/1421571447.jpg", "VIZ Media"],
  ["read_work_given", "given", "Given", "https://www.sublimemanga.com/read/manga/iven-1/product/788", "https://d2f8ulgr03l7cf.cloudfront.net/manga-yaoi/thumbs/thumb-1854-Given_V1%20Cover.jpg", "SuBLime"],
  ["read_work_nodame", "nodame-cantabile", "Nodame Cantabile", "https://kodansha.us/book/nodame-cantabile/", "https://production.image.azuki.co/82e43860-eb08-4021-a4ed-726e779b40a5/800.webp", "Kodansha via Azuki"],
];

const source = await readFile(manifestPath, "utf8");
const match = source.match(/export const readingWorkCovers: Record<string, ReadingWorkCover> = ([\s\S]+);/);
if (!match) throw new Error("Manifesto de capas não reconhecido.");
const manifest = Function(`return (${match[1]})`)();
await mkdir(output, { recursive: true });

for (const [id, slug, title, sourceUrl, imageUrl, credit] of entries) {
  let response;
  try {
    response = await fetch(imageUrl, { headers: { "user-agent": "Mozilla/5.0 henrique.dog editorial catalog" }, signal: AbortSignal.timeout(15000) });
  } catch (error) {
    console.warn(`${id}: falha de rede (${error.cause?.code ?? error.name})`);
    continue;
  }
  if (!response.ok) {
    console.warn(`${id}: HTTP ${response.status}`);
    continue;
  }
  const input = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(input).metadata();
  if ((metadata.width ?? 0) < 200 || (metadata.height ?? 0) < 250) {
    console.warn(`${id}: imagem recusada (${metadata.width}x${metadata.height})`);
    continue;
  }
  const written = await sharp(input).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(output, `${slug}.jpg`));
  manifest[id] = {
    src: `/images/reading/catalog/${slug}.jpg`,
    alt: `Capa de ${title}`,
    sourceUrl,
    credit,
    rights: "permission-pending",
    width: written.width,
    height: written.height,
  };
  console.log(`${id}: ${written.width}x${written.height}`);
}

await writeFile(manifestPath, `import type { ReadingWork } from "./readingSchema";\n\ntype ReadingWorkCover = NonNullable<ReadingWork["image"]>;\n\nexport const readingWorkCovers: Record<string, ReadingWorkCover> = ${JSON.stringify(manifest, null, 2)};\n`, "utf8");
