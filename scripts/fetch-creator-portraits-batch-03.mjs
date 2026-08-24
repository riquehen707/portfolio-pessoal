import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.join(process.cwd(), "public", "images", "creators");
const commons = "https://upload.wikimedia.org/wikipedia/commons";
const files = [
  ["tomm-moore", `${commons}/4/4d/Tomm_moore_headshot_%28cropped%29.jpg`],
  ["nora-twomey", `${commons}/d/dc/Nora_Twomey.jpg`],
  ["isao-takahata", `${commons}/b/b6/Isao_Takahata.jpg`],
  ["toshio-suzuki", `${commons}/9/97/Toshio_Suzuki%2C_Howl%27s_Moving_Castle_premiere.jpg`],
  ["travis-knight", `${commons}/5/52/Travis_Knight_%2830000495292%29.jpg`],
  ["peter-lord", `${commons}/8/88/Peter_Lord_making_Morph_June_2014.jpg`],
  ["david-sproxton", `${commons}/4/4f/David_Sproxton%2C_Annecy_International_Animation_Film_Festival_2016.jpg`],
  ["nick-park", `${commons}/0/04/Nick_Park%2C_BBC_Radio_2_Folk_Awards_2007.jpg`],
  ["masaaki-yuasa", `${commons}/2/28/Yuasa_Masaaki_from_%22The_World_of_Masaaki_Yuasa%22_at_Opening_Ceremony_of_the_Tokyo_International_Film_Festival_2018_%2830678155317%29.jpg`],
  ["suzy-mckee-charnas", `${commons}/a/a2/Suzy_McKee_Charnas.jpg`],
  ["jewelle-gomez", `${commons}/5/50/Kim_shuck_jewell_gomez_l_frank_reid_gomez_%28cropped%29.jpg`],
  ["robin-mckinley", `${commons}/c/c2/Robin_McKinley_%282023%29.jpg`],
  ["elizabeth-kostova", `${commons}/1/16/E.Kostova.jpg`],
  ["agustina-bazterrica", `${commons}/1/16/Agustina_Bazterrica_2018_%C2%A9_Pablo_Jose_Rey.jpg`],
  ["bora-chung", `${commons}/4/4b/Bora_Chung.jpg`],
  ["fabio-moon", `${commons}/3/36/10.10.10FabioMoonByLuigiNovi1.jpg`],
  ["jessica-abel", `${commons}/3/38/JessicaAbel4-29-11.jpg`],
  ["stephen-chbosky", `${commons}/9/94/Stephen_Chbosky%2C_Jericho_Panel_at_Comic_Con_SD_2006_cropped.jpg`],
  ["paul-tremblay", `${commons}/f/fa/Paul_Tremblay_2024_Texas_Book_Festival.jpg`],
  ["joe-hill", `${commons}/8/81/Joe_Hill_2025.jpg`],
];

await mkdir(outputDirectory, { recursive: true });
for (const [slug, sourceUrl] of files) {
  const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(sourceUrl)}&w=1200`;
  let response = await fetch(proxyUrl, { headers: { "user-agent": "henrique.dog editorial catalog" } });
  if (!response.ok) {
    response = await fetch(sourceUrl, { headers: { "user-agent": "henrique.dog editorial catalog" } });
  }
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`);
  const written = await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize(640, 800, { fit: "cover", position: "attention" })
    .webp({ quality: 84 })
    .toFile(path.join(outputDirectory, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
}
