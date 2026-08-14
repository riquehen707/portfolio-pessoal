import { seriesBySlug } from "@/content/series/series";
import { getSeriesOffers } from "@/content/series/seriesOffers";

export function SeriesAvailabilityIndex({ slugs }:{slugs:string}) {
 const items=slugs.split(",").map((slug)=>seriesBySlug.get(slug.trim())).filter(Boolean);
 const groups=new Map<string,string[]>();
 for(const item of items){if(!item)continue;const offers=getSeriesOffers(item.id);if(!offers.length){groups.set("Sem streaming confirmado",[...(groups.get("Sem streaming confirmado")??[]),item.titleBr]);continue;}for(const offer of offers)groups.set(offer.provider,[...(groups.get(offer.provider)??[]),`${item.titleBr} (T${offer.seasonFrom}${offer.seasonTo!==offer.seasonFrom?`–T${offer.seasonTo}`:""})`]);}
 return <div><h2>Onde assistir: visão rápida</h2>{[...groups].map(([provider,titles])=><p key={provider}><strong>{provider}:</strong> {titles.join("; ")}.</p>)}</div>;
}
