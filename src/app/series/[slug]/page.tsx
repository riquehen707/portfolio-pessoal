import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SeriesJsonLd } from "@/components/seo/SeriesJsonLd";
import { creators } from "@/content/creators/creators";
import { organizationsById } from "@/content/organizations/organizations";
import { getSeriesOffers } from "@/content/series/seriesOffers";
import { getPublishedSeries, getSeriesBySlug, getSeriesCurations } from "@/data/series";
import { baseURL } from "@/resources";
import styles from "./series.module.scss";

export const dynamicParams=false;
export async function generateStaticParams(){return (await getPublishedSeries()).map((series)=>({slug:series.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const series=await getSeriesBySlug(slug);
  if(!series||series.status!=="published")return{robots:{index:false,follow:false}};
  const url=`${baseURL}/series/${series.slug}`;const title=`${series.titleBr}: temporadas, ficha e onde assistir`;
  return{title,description:series.shortDescription,alternates:{canonical:url},robots:{index:true,follow:true},openGraph:{title,description:series.shortDescription,url,type:"website",images:series.image?[{url:`${baseURL}${series.image.src}`,alt:series.image.alt}]:undefined}};
}

export default async function SeriesDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const series=await getSeriesBySlug(slug);if(!series||series.status!=="published")notFound();
  const offers=getSeriesOffers(series.id);const curations=await getSeriesCurations(series.id);const period=series.endYear?(series.endYear===series.startYear?String(series.startYear):`${series.startYear}–${series.endYear}`):`${series.startYear}–presente`;
  const formatLabel={"live-action":"live-action",animation:"animação",anime:"anime","web-series":"websérie"}[series.format];
  const relatedPeople=series.personRelationships.map((relation)=>({relation,person:creators.find((person)=>person.id===relation.personId)})).filter((item)=>item.person);
  const relatedOrganizations=series.organizationRelationships.map((relation)=>({relation,organization:organizationsById.get(relation.organizationId)})).filter((item)=>item.organization);
  return <main className={styles.page}><SeriesJsonLd series={series}/><BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:"Séries",url:`${baseURL}/series`},{name:series.titleBr,url:`${baseURL}/series/${series.slug}`}]}/>
    <header className={styles.hero}><div className={styles.image} data-placeholder={!series.image||undefined}>{series.image?<Image src={series.image.src} alt={series.image.alt} fill priority sizes="(max-width: 720px) 100vw, 320px"/>:<span aria-label={`Imagem não cadastrada para ${series.titleBr}`}>{series.titleBr.slice(0,2)}</span>}</div><div className={styles.intro}><span>{period} · {formatLabel}</span><h1>{series.titleBr}</h1>{series.originalTitle!==series.titleBr?<p className={styles.original}>{series.originalTitle}</p>:null}<p className={styles.lead}>{series.shortDescription}</p><div className={styles.tags}>{series.genres.map((genre)=><span key={genre}>{genre}</span>)}</div></div></header>
    <div className={styles.layout}><article><section><h2>Ficha essencial</h2><dl className={styles.facts}><div><dt>País</dt><dd>{series.countries.join(" · ")}</dd></div><div><dt>Criação</dt><dd>{series.creators.join(" · ")}</dd></div><div><dt>Temporadas</dt><dd>{series.seasons}</dd></div>{series.episodes?<div><dt>Episódios</dt><dd>{series.episodes}</dd></div>:null}<div><dt>Situação</dt><dd>{series.seriesStatus==="returning"?"Em produção":series.seriesStatus==="limited"?"Minissérie":"Encerrada"}</dd></div></dl></section>
      {offers.length?<section><h2>Onde assistir no Brasil</h2><ul className={styles.offers}>{offers.map((offer)=><li key={offer.id}><a href={offer.url} rel="nofollow noreferrer" target="_blank">{offer.provider}</a><span>Temporada {offer.seasonFrom}{offer.seasonTo!==offer.seasonFrom?` a ${offer.seasonTo}`:""}{offer.note?` · ${offer.note}`:""}</span></li>)}</ul><small>Disponibilidade verificada em {new Intl.DateTimeFormat("pt-BR",{timeZone:"UTC"}).format(new Date(`${offers[0].checkedAt}T12:00:00Z`))}.</small></section>:null}
      {relatedPeople.length||relatedOrganizations.length?<section><h2>Pessoas e estúdios relacionados</h2><div className={styles.relations}>{relatedPeople.map(({person,relation})=><p key={person!.id}>{person!.status==="published"&&person!.profilePath?<Link href={person!.profilePath}>{person!.name}</Link>:person!.name}<span>{relation.roles.join(" · ")}</span></p>)}{relatedOrganizations.map(({organization,relation})=><p key={organization!.id}>{organization!.status==="published"&&organization!.profilePath?<Link href={organization!.profilePath}>{organization!.name}</Link>:organization!.name}<span>{relation.roles.join(" · ")}</span></p>)}</div></section>:null}
      {curations.length?<section><h2>Artigos em que esta série aparece</h2><ul>{curations.map(({curation})=><li key={curation.href}><Link href={curation.href}>{curation.title}</Link></li>)}</ul></section>:null}
    </article><aside><h2>Para quem pode funcionar</h2><p>{series.audienceProfile}</p><h2>Experiência</h2><p>{series.experience}.</p>{series.contentWarnings.length?<><h2>Avisos</h2><p>{series.contentWarnings.join(" · ")}.</p></>:null}</aside></div>
    <footer className={styles.sources}><h2>Fontes e imagem</h2><ul>{series.sources.map((source)=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul>{series.image?<p>Imagem: <a href={series.image.sourceUrl}>{series.image.credit}</a>. Situação de uso: {series.image.rights}.</p>:<p>O acervo ainda não possui imagem com origem e situação de uso registradas para esta série.</p>}</footer>
  </main>;
}
