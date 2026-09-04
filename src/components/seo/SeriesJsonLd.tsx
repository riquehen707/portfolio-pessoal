import type { Series } from "@/content/series/seriesSchema";
import { baseURL } from "@/resources";

export function SeriesJsonLd({ series }: { series: Series }) {
  if(series.status!=="published") return null;
  const data={
    "@context":"https://schema.org","@type":"TVSeries",name:series.titleBr,alternateName:series.originalTitle,
    url:`${baseURL}/series/${series.slug}`,description:series.shortDescription,genre:series.genres,
    countryOfOrigin:series.countries.map((name)=>({"@type":"Country",name})),
    creator:series.creators.map((name)=>({"@type":"Person",name})),
    numberOfSeasons:series.seasons,numberOfEpisodes:series.episodes,
    datePublished:String(series.startYear),endDate:series.endYear?String(series.endYear):undefined,
    image:series.image?`${baseURL}${series.image.src}`:undefined,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>;
}
