import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const audit = JSON.parse(await readFile(path.join(process.cwd(), "exports/content/media-audit.v1.json"), "utf8"));
const items = audit.issues.filter((item) => item.status === "low-resolution" && item.sourceUrl?.includes("openlibrary.org/books/"));
for (const item of items) {
  const editionKey = item.sourceUrl.split("/").at(-1);
  try {
    const edition = await fetch(`https://openlibrary.org/books/${editionKey}.json`).then((response) => response.json());
    const workKey = edition.works?.[0]?.key;
    if (!workKey) { console.warn(`${item.entityId}: sem work key`); continue; }
    const editions = await fetch(`https://openlibrary.org${workKey}/editions.json?limit=100`).then((response) => response.json());
    const coverIds = [...new Set((editions.entries ?? []).flatMap((entry) => entry.covers ?? []).filter((id) => id > 0))].slice(0, 40);
    let best;
    for (const coverId of coverIds) {
      const response = await fetch(`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`);
      if (!response.ok) continue;
      const buffer = Buffer.from(await response.arrayBuffer());
      const metadata = await sharp(buffer).metadata();
      const area = (metadata.width ?? 0) * (metadata.height ?? 0);
      if (!best || area > best.area) best = { coverId, width: metadata.width, height: metadata.height, area };
      if ((metadata.width ?? 0) >= 300 && (metadata.height ?? 0) >= 450) break;
    }
    console.log(JSON.stringify({ id: item.entityId, src: item.src, workKey, best }));
  } catch (error) { console.warn(`${item.entityId}: ${error.message}`); }
}
