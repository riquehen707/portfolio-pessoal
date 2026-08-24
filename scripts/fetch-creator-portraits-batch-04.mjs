import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.join(process.cwd(), "public", "images", "creators");
const commons = "https://upload.wikimedia.org/wikipedia/commons";
const files = [
  ["alex-de-campi", `${commons}/2/21/10.14.12AlexdeCampiByLuigiNovi1.jpg`],
  ["erica-henderson", `${commons}/6/60/3.20.19EricaHendersonByLuigiNovi6.jpg`],
  ["pornsak-pichetshote", `${commons}/3/38/Pornsak_Pichetshote_by_Gage_Skidmore_2.jpg`],
  ["rodney-barnes", `${commons}/5/55/Rodney_Barnes_by_Gage_Skidmore.jpg`],
  ["jacqueline-carey", `${commons}/7/79/Jacqueline_Carey_%28novelist_born_1964%29.jpg`],
  ["juliet-marillier", `${commons}/b/b4/Juliet_Marillier.jpg`],
  ["brandon-sanderson", `${commons}/6/6b/Brandon_Sanderson_at_MCM_Comic_Con_London_22_May_2026_02.jpg`],
  ["naomi-novik", `${commons}/f/f1/Naomi_Novik_July08.jpg`],
  ["tasha-suri", `${commons}/e/e0/Tasha_suri_2024_3.jpg`],
  ["erin-morgenstern", `${commons}/1/15/Erin_morgenstern_2011.jpg`],
  ["rebecca-yarros", `${commons}/2/2f/NBF2024-rebecca-yarros.jpg`],
  ["alastair-reynolds", `${commons}/8/88/Alastair_Reynolds.jpg`],
  ["adrian-tchaikovsky", `${commons}/b/b0/Adrian_Tchaikovsky_at_MCM_Comic_Con_London%2C_May_2025_01.jpg`],
  ["peter-watts", `${commons}/f/f7/Peter_Watts_fulbeskuren.png`],
  ["ann-leckie", `${commons}/6/61/AnnLeckie.jpeg`],
  ["william-gibson", `${commons}/d/df/William_Gibson_60th_birthday_portrait_%283x4_cropped%29.jpg`],
  ["cixin-liu", `${commons}/0/09/Cixin_Liu_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards.jpg`],
  ["joe-abercrombie", `${commons}/4/4d/Joe_Abercrombie_1110791.jpg`],
  ["china-mieville", `${commons}/c/c0/China_Mieville.jpg`],
  ["ken-akamatsu", `${commons}/2/23/Ken_Akamatsu%2C_Parliamentary_Vice-Minister_for_Education%2C_Culture%2C_Sports%2C_Science_and_Technology.jpg`],
];

await mkdir(outputDirectory, { recursive: true });
for (const [slug, sourceUrl] of files) {
  const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(sourceUrl)}&w=1200`;
  let response;
  for (const delay of [0, 1500, 4000]) {
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    response = await fetch(proxyUrl, { headers: { "user-agent": "henrique.dog editorial catalog" } });
    if (response.ok) break;
  }
  if (!response?.ok) response = await fetch(sourceUrl, { headers: { "user-agent": "henrique.dog editorial catalog" } });
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`);
  const written = await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize(640, 800, { fit: "cover", position: "attention" })
    .webp({ quality: 84 })
    .toFile(path.join(outputDirectory, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
}
