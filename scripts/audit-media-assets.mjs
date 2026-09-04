import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(readFileSync(join(root, "exports", "content", name), "utf8"));
const movies = readJson("movies.v1.json").records;
const series = readJson("series.v1.json").records;
const reading = readJson("reading.v1.json");
const products = readJson("products.v1.json").products;
const entities = readJson("entities.v1.json");
const trustedSource = /(themoviedb\.org|tmdb|wikipedia\.org|wikimedia\.org|openlibrary\.org|books\.google\.|google books|penguinrandomhouse\.com|hachettebookgroup\.com|macmillan\.com|darksidebooks\.com|companhiadasletras\.com|intrinseca\.com|editorajbc\.com|panini\.|pipocaenanquim\.com\.br|inkr\.com|entangledpublishing\.com|aleph\.com\.br|fondodeculturaeconomica\.com|tapas\.io|webtoons\.com|kakao|naver|tappytoon|manta\.net|viz\.com|kodansha|yenpress|sevenseasentertainment|dc\.com|marvel\.com)/i;

const volumeByWork = new Map();
for (const volume of reading.volumes) {
  const values = volumeByWork.get(volume.workId) ?? [];
  values.push(volume.id);
  volumeByWork.set(volume.workId, values);
}
const editionsByWork = new Map();
for (const edition of reading.editions) {
  if (edition.workId) {
    const values = editionsByWork.get(edition.workId) ?? [];
    values.push(edition);
    editionsByWork.set(edition.workId, values);
  }
  if (edition.volumeId) {
    const volume = reading.volumes.find((item) => item.id === edition.volumeId);
    if (volume) {
      const values = editionsByWork.get(volume.workId) ?? [];
      values.push(edition);
      editionsByWork.set(volume.workId, values);
    }
  }
}

const refs = [
  ...movies.map((item) => ({entityType:"movie",entityId:item.id,title:item.titleBr,image:item.poster,editorialStatus:item.status})),
  ...series.map((item) => ({entityType:"series",entityId:item.id,title:item.titleBr,image:item.image,editorialStatus:item.status})),
  ...reading.works.map((item) => {
    const editions = editionsByWork.get(item.id) ?? [];
    const edition = editions.find((value) => value.country === "Brasil" && value.status === "published") ?? editions.find((value) => value.status === "published") ?? editions[0];
    return {entityType:"reading",entityId:item.id,title:item.titleBr ?? item.originalTitle,image:item.image ?? edition?.cover,editionId:item.image ? undefined : edition?.id,editorialStatus:item.status};
  }),
  ...entities.games.map((item) => ({entityType:"game",entityId:item.id,title:item.title,image:item.cover,editorialStatus:item.status})),
  ...entities.creators.map((item) => ({entityType:"person",entityId:item.id,title:item.name,image:item.image,editorialStatus:item.status})),
  ...entities.organizations.map((item) => ({entityType:"organization",entityId:item.id,title:item.name,image:item.image,editorialStatus:item.status})),
  ...products.map((item) => ({entityType:"product",entityId:item.id,title:item.name,image:item.mainImage,editorialStatus:item.status})),
];

const audited = [];
for (const ref of refs) {
  if (!ref.image) {
    audited.push({...ref,status:"missing"});
    continue;
  }
  const src = ref.image.src;
  const isLocal = src?.startsWith("/");
  const path = isLocal ? join(root,"public",src.replace(/^\//,"")) : undefined;
  if (isLocal && !existsSync(path)) {
    audited.push({...ref,src,status:"broken-local-reference"});
    continue;
  }
  let actualWidth;
  let actualHeight;
  let bytes;
  let hash;
  if (path) {
    const metadata = await sharp(path).metadata();
    actualWidth=metadata.width;
    actualHeight=metadata.height;
    bytes=statSync(path).size;
    hash=createHash("sha256").update(readFileSync(path)).digest("hex");
  }
  const extension=extname(src ?? "").toLowerCase();
  const declaredDimensions=Boolean(ref.image.width && ref.image.height);
  const requiresDimensions=!['person','organization'].includes(ref.entityType);
  const sourceRecorded=Boolean(ref.image.sourceUrl && ref.image.credit);
  const minimum = ref.entityType === "organization" ? { width: 300, height: 100 }
    : ref.entityType === "product" ? { width: 300, height: 300 }
    : ref.entityType === "person" ? { width: 200, height: 200 }
    : { width: 200, height: 300 };
  const small=Boolean(actualWidth && actualHeight && (actualWidth < minimum.width || actualHeight < minimum.height));
  const artificialFormat=extension === ".svg";
  const trusted=trustedSource.test(`${ref.image.sourceUrl ?? ""} ${ref.image.credit ?? ""}`);
  const status=artificialFormat?"review-svg":small?"low-resolution":requiresDimensions&&!declaredDimensions?"missing-dimensions":!sourceRecorded?"missing-source":!trusted?"review-source":"verified-structure";
  audited.push({...ref,src,sourceUrl:ref.image.sourceUrl,credit:ref.image.credit,rights:ref.image.rights ?? ref.image.license,declaredWidth:ref.image.width,declaredHeight:ref.image.height,actualWidth,actualHeight,bytes,hash,status});
}

const hashes = new Map();
for (const item of audited.filter((value) => value.hash)) {
  const values=hashes.get(item.hash) ?? [];
  values.push({entityType:item.entityType,entityId:item.entityId,title:item.title,src:item.src});
  hashes.set(item.hash,values);
}
const duplicates=[...hashes.entries()].filter(([,items])=>new Set(items.map((item)=>item.entityId)).size>1).map(([hash,items])=>({hash,items}));
const remoteChecks=[];
if (process.argv.includes("--check-remote")) {
  const urls=[...new Set(audited.map((item)=>item.sourceUrl).filter(Boolean))];
  let cursor=0;
  const worker=async()=>{while(cursor<urls.length){const url=urls[cursor++];try{const response=await fetch(url,{method:"HEAD",redirect:"follow",signal:AbortSignal.timeout(8000),headers:{"user-agent":"henrique.dog media audit"}});remoteChecks.push({url,status:response.status,result:response.status===404||response.status===410?"broken":response.ok?"reachable":"blocked-or-error"});}catch(error){remoteChecks.push({url,result:"indeterminate",error:error.name});}}};
  await Promise.all(Array.from({length:8},worker));
}
const counts=Object.fromEntries([...new Set(audited.map((item)=>item.status))].sort().map((status)=>[status,audited.filter((item)=>item.status===status).length]));
const entityTypes=[...new Set(audited.map((item)=>item.entityType))];
const byType=Object.fromEntries(entityTypes.map((type)=>[type,{total:audited.filter((item)=>item.entityType===type).length,withImage:audited.filter((item)=>item.entityType===type&&item.status!=="missing").length,missing:audited.filter((item)=>item.entityType===type&&item.status==="missing").length,publishedMissing:audited.filter((item)=>item.entityType===type&&item.status==="missing"&&item.editorialStatus==="published").length}]));
const report={schemaVersion:1,generatedAt:new Date().toISOString(),scope:{totalEntities:audited.length,...byType},counts,duplicateFiles:duplicates,remoteChecks:{total:remoteChecks.length,reachable:remoteChecks.filter((item)=>item.result==="reachable").length,broken:remoteChecks.filter((item)=>item.result==="broken"),blockedOrIndeterminate:remoteChecks.filter((item)=>!["reachable","broken"].includes(item.result))},issues:audited.filter((item)=>item.status!=="verified-structure"),verified:audited.filter((item)=>item.status==="verified-structure")};
writeFileSync(join(root,"exports","content","media-audit.v1.json"),`${JSON.stringify(report,null,2)}\n`);
console.log(`Auditadas ${audited.length} entidades: ${audited.length-(counts.missing??0)} com imagem efetiva e ${counts.missing??0} sem imagem.`);
console.log(JSON.stringify({counts,byType,duplicateGroups:duplicates.length},null,2));
