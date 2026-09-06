import { games } from "../src/content/games/games";
import { productCatalog } from "../src/content/products/products";
import { creators } from "../src/content/creators/creators";
import { organizations } from "../src/content/organizations/organizations";
import { readingWorks } from "../src/content/reading/reading";
import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

function summarize(name: string, items: readonly any[], field = "image") {
  const published = items.filter((item) => item.status === "published");
  const missing = published.filter((item) => !item[field]);
  console.log(JSON.stringify({
    name,
    total: items.length,
    published: published.length,
    withImage: published.length - missing.length,
    missing: missing.map((item) => ({ id: item.id, slug: item.slug, title: item.title ?? item.name })),
  }, null, 2));
}

summarize("games", games, "cover");
summarize("products", productCatalog.products, "mainImage");
summarize("creators", creators);
summarize("organizations", organizations);

const audit = JSON.parse(readFileSync("exports/content/media-audit.v1.json", "utf8"));
const missingReading = new Set(audit.issues.filter((item: any) => item.entityType === "reading" && item.status === "missing").map((item: any) => item.entityId));
const creatorNames = new Map(creators.map((creator) => [creator.id, creator.name]));
console.log(JSON.stringify(readingWorks.filter((work) => missingReading.has(work.id)).map((work) => ({
  id: work.id,
  slug: work.slug,
  title: work.titleBr,
  originalTitle: work.originalTitle,
  authors: work.credits.map((credit) => creatorNames.get(credit.personId)),
  sources: work.sources,
})), null, 2));

async function validateLocalImages() {
  const refs = [
    ...games.flatMap((item) => [item.cover, item.heroImage, ...item.screenshots].filter(Boolean).map((image) => ({ type: "game", id: item.id, image }))),
    ...productCatalog.products.map((item) => ({ type: "product", id: item.id, image: item.mainImage })),
    ...creators.filter((item) => item.image).map((item) => ({ type: "creator", id: item.id, image: item.image! })),
    ...organizations.filter((item) => item.image).map((item) => ({ type: "organization", id: item.id, image: item.image! })),
  ];
  const issues = [];
  for (const ref of refs) {
    if (!ref.image) continue;
    const file = ref.image.src.startsWith("/") ? path.join(process.cwd(), "public", ref.image.src.slice(1)) : undefined;
    if (!file || !existsSync(file)) { issues.push({ ...ref, status: "broken" }); continue; }
    const metadata = await sharp(file).metadata();
    if ((metadata.width ?? 0) < 200 || (metadata.height ?? 0) < 200 || file.endsWith(".svg")) issues.push({ type: ref.type, id: ref.id, src: ref.image.src, width: metadata.width, height: metadata.height, status: file.endsWith(".svg") ? "svg" : "low-resolution" });
  }
  console.log(JSON.stringify({ checkedLocalImages: refs.length, issues }, null, 2));
}

validateLocalImages().catch((error) => { console.error(error); process.exitCode = 1; });
