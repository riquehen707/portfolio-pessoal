"use client";

import { useMemo, useState } from "react";
import type { ReadingWork } from "@/content/reading/readingSchema";
import { creators } from "@/content/creators/creators";
import { organizations } from "@/content/organizations/organizations";
import { readingSeries } from "@/content/reading/reading";
import { ReadingCard } from "./ReadingCard";
import styles from "./ReadingLibrary.module.scss";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const labels: Record<string,string> = { "light-novel":"Light novel", fiction:"Ficção", "non-fiction":"Não ficção", philosophy:"Filosofia", science:"Ciência", business:"Negócios", marketing:"Marketing", biography:"Biografia", essay:"Ensaio", poetry:"Poesia", "short-stories":"Contos" };
const people=new Map(creators.map((item)=>[item.id,item.name]));
const orgs=new Map(organizations.map((item)=>[item.id,item.name]));
const series=new Map(readingSeries.map((item)=>[item.id,item.title]));

export function ReadingLibrary({ works }: { works: ReadingWork[] }) {
  const [query,setQuery]=useState(""); const [category,setCategory]=useState(""); const [genre,setGenre]=useState(""); const [country,setCountry]=useState("");
  const [tradition,setTradition]=useState(""); const [comicFormat,setComicFormat]=useState(""); const [demographic,setDemographic]=useState(""); const [publicationStatus,setPublicationStatus]=useState("");
  const values=(select:(work:ReadingWork)=>string[])=>[...new Set(works.flatMap(select))].sort((a,b)=>a.localeCompare(b,"pt-BR"));
  const categories=values((work)=>work.categories), genres=values((work)=>work.genres), countries=values((work)=>work.originCountries);
  const traditions=values((work)=>work.comicTradition?[work.comicTradition]:[]), comicFormats=values((work)=>work.comicFormat?[work.comicFormat]:[]), demographics=values((work)=>work.demographics), statuses=values((work)=>[work.publicationStatus]);
  const results=useMemo(()=>works.filter((work)=>{
    const authors=work.credits.map((credit)=>people.get(credit.personId)??""); const publishers=work.organizationRelationships.map((relation)=>orgs.get(relation.organizationId)??""); const workSeries=work.seriesMemberships.map((membership)=>series.get(membership.seriesId)??"");
    const haystack=normalize([work.titleBr,work.originalTitle,work.romanizedTitle,work.subtitle,work.comicTradition,work.comicFormat,...work.aliases,...authors,...work.categories,...work.genres,...work.themes,...work.originCountries,...work.originalLanguages,...workSeries,...publishers].filter(Boolean).join(" "));
    return (!query||haystack.includes(normalize(query)))&&(!category||work.categories.includes(category as never))&&(!genre||work.genres.includes(genre))&&(!country||work.originCountries.includes(country))&&(!tradition||work.comicTradition===tradition)&&(!comicFormat||work.comicFormat===comicFormat)&&(!demographic||work.demographics.includes(demographic as never))&&(!publicationStatus||work.publicationStatus===publicationStatus);
  }),[works,query,category,genre,country,tradition,comicFormat,demographic,publicationStatus]);
  return <div className={styles.library}><div className={styles.filters}>
    <label><span>Buscar no acervo</span><input type="search" value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Título, autoria, tema, série ou editora" /></label>
    {categories.length>1&&<label><span>Categoria</span><select value={category} onChange={(event)=>setCategory(event.target.value)}><option value="">Todas</option>{categories.map((item)=><option key={item} value={item}>{labels[item]??item}</option>)}</select></label>}
    {genres.length>1&&<label><span>Gênero</span><select value={genre} onChange={(event)=>setGenre(event.target.value)}><option value="">Todos</option>{genres.map((item)=><option key={item}>{item}</option>)}</select></label>}
    {countries.length>1&&<label><span>País</span><select value={country} onChange={(event)=>setCountry(event.target.value)}><option value="">Todos</option>{countries.map((item)=><option key={item}>{item}</option>)}</select></label>}
    {traditions.length>1&&<label><span>Tradição</span><select value={tradition} onChange={(event)=>setTradition(event.target.value)}><option value="">Todas</option>{traditions.map((item)=><option key={item}>{item}</option>)}</select></label>}
    {comicFormats.length>1&&<label><span>Formato</span><select value={comicFormat} onChange={(event)=>setComicFormat(event.target.value)}><option value="">Todos</option>{comicFormats.map((item)=><option key={item}>{item}</option>)}</select></label>}
    {demographics.length>1&&<label><span>Demografia</span><select value={demographic} onChange={(event)=>setDemographic(event.target.value)}><option value="">Todas</option>{demographics.map((item)=><option key={item}>{item}</option>)}</select></label>}
    {statuses.length>1&&<label><span>Situação</span><select value={publicationStatus} onChange={(event)=>setPublicationStatus(event.target.value)}><option value="">Todas</option>{statuses.map((item)=><option key={item}>{item}</option>)}</select></label>}
  </div><p className={styles.resultCount} aria-live="polite">{results.length} {results.length===1?"livro encontrado":"livros encontrados"}</p><div className={styles.grid}>{results.map((work)=><ReadingCard key={work.id} work={work} variant="compact" />)}</div></div>;
}
