import type { Series } from "@/content/series/seriesSchema";
import { baseURL } from "@/resources";

export function SeriesLibraryJsonLd({ series }: { series: readonly Series[] }) {
  if(!series.length) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
    "@context":"https://schema.org","@type":"CollectionPage",name:"Biblioteca de séries",url:`${baseURL}/series`,
    mainEntity:{"@type":"ItemList",numberOfItems:series.length,itemListElement:series.map((item,index)=>({"@type":"ListItem",position:index+1,item:{"@type":"TVSeries",name:item.titleBr,alternateName:item.originalTitle,datePublished:String(item.startYear),url:`${baseURL}/series/${item.slug}`,image:item.image?`${baseURL}${item.image.src}`:undefined}}))},
  })}}/>;
}
