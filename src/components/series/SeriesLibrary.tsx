"use client";

import { useMemo, useState } from "react";
import type { Series } from "@/content/series/seriesSchema";
import type { SeriesOffer } from "@/content/series/seriesOffers";
import { CatalogControls, CatalogEmpty, CatalogLoadMore } from "@/components/entertainment/CatalogControls";
import { normalizeCatalogText, uniqueCatalogValues, useProgressiveCatalog } from "@/components/entertainment/catalog";
import { SeriesCard } from "./SeriesCard";
import styles from "./SeriesLibrary.module.scss";

type SortMode = "title" | "release" | "created";
const formatLabels:Record<Series["format"],string>={"live-action":"Live-action",animation:"Animação",anime:"Anime","web-series":"Websérie"};

export function SeriesLibrary({ series, offers }: { series: readonly Series[]; offers: readonly SeriesOffer[] }) {
  const [query,setQuery]=useState("");
  const [genre,setGenre]=useState("all");
  const [country,setCountry]=useState("all");
  const [period,setPeriod]=useState("all");
  const [format,setFormat]=useState("all");
  const [availability,setAvailability]=useState("all");
  const [sort,setSort]=useState<SortMode>("title");
  const offersBySeries=useMemo(()=>new Map(series.map((item)=>[item.id,offers.filter((offer)=>offer.seriesId===item.id)])),[offers,series]);
  const facets=useMemo(()=>({
    genres:uniqueCatalogValues(series.flatMap((item)=>item.genres)),
    countries:uniqueCatalogValues(series.flatMap((item)=>item.countries)),
    periods:uniqueCatalogValues(series.map((item)=>String(Math.floor(item.startYear/10)*10))).reverse(),
    formats:uniqueCatalogValues(series.map((item)=>item.format)),
    providers:uniqueCatalogValues(offers.map((offer)=>offer.provider)),
  }),[offers,series]);

  const filtered=useMemo(()=>series.filter((item)=>{
    const tokens=normalizeCatalogText(query).split(/\s+/).filter(Boolean);
    const searchable=normalizeCatalogText(`${item.titleBr} ${item.originalTitle}`);
    const itemOffers=offersBySeries.get(item.id)??[];
    return tokens.every((token)=>searchable.includes(token))
      && (genre==="all"||item.genres.includes(genre))
      && (country==="all"||item.countries.includes(country))
      && (period==="all"||Math.floor(item.startYear/10)*10===Number(period))
      && (format==="all"||item.format===format)
      && (availability==="all"||(availability==="available"&&itemOffers.length>0)||(availability==="unavailable"&&itemOffers.length===0)||(availability.startsWith("provider:")&&itemOffers.some((offer)=>offer.provider===availability.slice(9))));
  }).sort((a,b)=>{
    if(sort==="release") return b.startYear-a.startYear||a.titleBr.localeCompare(b.titleBr,"pt-BR");
    if(sort==="created") return b.createdAt.localeCompare(a.createdAt)||a.titleBr.localeCompare(b.titleBr,"pt-BR");
    return a.titleBr.localeCompare(b.titleBr,"pt-BR");
  }),[availability,country,format,genre,offersBySeries,period,query,series,sort]);

  const resetKey=[query,genre,country,period,format,availability,sort].join("|");
  const progressive=useProgressiveCatalog(resetKey,filtered.length);
  const hasFilters=Boolean(query||genre!=="all"||country!=="all"||period!=="all"||format!=="all"||availability!=="all"||sort!=="title");
  const clear=()=>{setQuery("");setGenre("all");setCountry("all");setPeriod("all");setFormat("all");setAvailability("all");setSort("title");};

  return <>
    <CatalogControls query={query} onQueryChange={setQuery} placeholder="Título ou título original" filters={[
      {id:"genre",label:"Gênero",value:genre,allLabel:"Todos",options:facets.genres.map((value)=>({value,label:value})),onChange:setGenre},
      {id:"country",label:"País",value:country,allLabel:"Todos",options:facets.countries.map((value)=>({value,label:value})),onChange:setCountry},
      {id:"period",label:"Período",value:period,allLabel:"Todos",options:facets.periods.map((value)=>({value,label:`Anos ${value}`})),onChange:setPeriod},
      {id:"format",label:"Formato",value:format,allLabel:"Todos",options:facets.formats.map((value)=>({value,label:formatLabels[value as Series["format"]]})),onChange:setFormat},
      {id:"availability",label:"Disponibilidade",value:availability,allLabel:"Todas",options:[{value:"available",label:"Com opção confirmada"},{value:"unavailable",label:"Sem opção confirmada"},...facets.providers.map((provider)=>({value:`provider:${provider}`,label:provider}))],onChange:setAvailability},
    ]} sort={sort} sortOptions={[{value:"title",label:"Título A–Z"},{value:"release",label:"Lançamento mais recente"},{value:"created",label:"Cadastro mais recente"}]} onSortChange={(value)=>setSort(value as SortMode)} resultCount={filtered.length} singular="série encontrada" plural="séries encontradas" hasFilters={hasFilters} onClear={clear}/>
    {filtered.length?<div className={styles.grid}>{filtered.slice(0,progressive.visibleCount).map((item,index)=><SeriesCard key={item.id} seriesId={item.id} variant="library" priority={index<2}/>)}</div>:<CatalogEmpty noun="série" onClear={clear}/>}
    {progressive.hasMore?<CatalogLoadMore onLoadMore={progressive.loadMore}/>:null}
  </>;
}
