import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = [
  ["team-cherry", "https://upload.wikimedia.org/wikipedia/commons/0/0e/Team_Cherry_Logo.png"],
  ["cartoon-saloon", "https://upload.wikimedia.org/wikipedia/commons/7/75/Cartoon_Saloon_2018_logo.png"],
  ["aardman", "https://upload.wikimedia.org/wikipedia/commons/f/ff/Aardman_Animations_2022.svg"],
  ["science-saru", "https://upload.wikimedia.org/wikipedia/commons/f/f6/Science_Saru_Logo.png"],
  ["kyoto-animation", "https://upload.wikimedia.org/wikipedia/commons/b/bf/Kyoto_Animation_logo.svg"],
  ["laika", "https://upload.wikimedia.org/wikipedia/commons/5/58/Laika_logo.svg"],
  ["studio-ghibli", "https://upload.wikimedia.org/wikipedia/commons/a/a6/Studio_Ghibli.svg"],
];
const output = path.join(process.cwd(), "public/images/studios");
await mkdir(output, { recursive: true });
for (const [slug, url] of assets) {
  if (slug !== assets[0][0]) await new Promise((resolve) => setTimeout(resolve, 1200));
  const response = await fetch(url, { headers: { "user-agent": "henrique.dog/1.0 (contact: henrique.dog)" }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) { console.warn(`${slug}: HTTP ${response.status}`); continue; }
  const written = await sharp(Buffer.from(await response.arrayBuffer()), { density: 240 })
    .resize({ width: 800, height: 450, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(path.join(output, `${slug}.webp`));
  console.log(`${slug}: ${written.width}x${written.height}`);
}
