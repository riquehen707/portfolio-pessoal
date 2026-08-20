import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { MovieListCard } from "@/components/movies/MovieListCard";
import { ReadingCard } from "@/components/reading/ReadingCard";
import { PersonalityWorks } from "@/components/personalities/PersonalityWorks";
import { SeriesCard } from "@/components/series/SeriesCard";
import { getFilmographyForPerson, getPersonalityBySlug, getPublishedPersonalities, getRelatedPersonalities, getWorksForPerson } from "@/data/personalities";
import { baseURL } from "@/resources";
import type { Movie } from "@/content/movies/movieSchema";
import type { ReadingWork } from "@/content/reading/readingSchema";
import type { Series } from "@/content/series/seriesSchema";
import type { EditorialWork } from "@/content/works/workSchema";

import styles from "./page.module.scss";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
type StartingPoint =
  | { kind:"reading"; work:ReadingWork; note:string }
  | { kind:"movie"; work:Movie; note:string }
  | { kind:"series"; work:Series; note:string }
  | { kind:"editorial"; work:EditorialWork; note:string };
const relatedKindLabels = { article:"artigo", list:"lista", genre:"gênero", movement:"movimento", studio:"estúdio", person:"personalidade", other:"conteúdo" } as const;

function lifePeriod(birthDate?: string, deathDate?: string) {
  if (!birthDate) return undefined;
  const birth = new Date(`${birthDate}T12:00:00Z`);
  const start = new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"long", year:"numeric", timeZone:"UTC" }).format(birth);
  if (!deathDate) return `Nascido em ${start}`;
  const death = new Date(`${deathDate}T12:00:00Z`);
  const end = new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"long", year:"numeric", timeZone:"UTC" }).format(death);
  return `${start} — ${end}`;
}

export function generateStaticParams() {
  return getPublishedPersonalities()
    .filter((person) => person.profilePath === `/personalidades/${person.slug}`)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = getPersonalityBySlug((await params).slug);
  if (!person) return {};
  const path = `/personalidades/${person.slug}`;
  const title = `${person.name}: vida, temas e obras para começar`;
  const description = person.summary;
  return {
    title, description,
    alternates:{ canonical:`${baseURL}${path}` },
    openGraph:{ title,description,url:`${baseURL}${path}`,type:"profile",images:person.image?[{url:`${baseURL}${person.image.src}`,alt:person.image.alt}]:undefined },
    twitter:{ card:person.image?"summary_large_image":"summary",title,description,images:person.image?[`${baseURL}${person.image.src}`]:undefined },
  };
}

export default async function PersonalityPage({ params }: Props) {
  const person = getPersonalityBySlug((await params).slug);
  if (!person) notFound();
  const path = `/personalidades/${person.slug}`;
  const [works, filmography] = await Promise.all([getWorksForPerson(person.id), getFilmographyForPerson(person.id)]);
  const readingById = new Map(works.reading.map((work) => [work.id, work]));
  const moviesById = new Map(works.movies.map((work) => [work.id, work]));
  const seriesById = new Map(works.series.map((work) => [work.id, work]));
  const editorialById = new Map(works.editorial.map((work) => [work.id, work]));
  const startingPoints = person.startingPoints.flatMap<StartingPoint>((item) => {
    const reading = readingById.get(item.workId);
    if (reading) return [{ kind:"reading" as const, work:reading, note:item.note }];
    const movie = moviesById.get(item.workId);
    if (movie) return [{ kind:"movie" as const, work:movie, note:item.note }];
    const series = seriesById.get(item.workId);
    if (series) return [{ kind:"series" as const, work:series, note:item.note }];
    const editorial = editorialById.get(item.workId);
    return editorial ? [{ kind:"editorial" as const, work:editorial, note:item.note }] : [];
  });
  const period = lifePeriod(person.birthDate, person.deathDate);
  const publishedPersonIds = new Set(getPublishedPersonalities().map((item) => item.id));
  const relatedPersonalities = getRelatedPersonalities(person.relatedPersonIds);
  const jsonLd = {
    "@context":"https://schema.org", "@type":"Person", "@id":`${baseURL}${path}#person`,
    name:person.name, alternateName:[person.fullName,person.originalName].filter(Boolean), description:person.summary,
    birthDate:person.birthDate, deathDate:person.deathDate, birthPlace:person.birthPlace ? {"@type":"Place",name:person.birthPlace} : undefined,
    nationality:person.countryOrRegion, jobTitle:person.occupations, knowsAbout:person.themes, image:person.image?`${baseURL}${person.image.src}`:undefined, url:`${baseURL}${path}`,
  };

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
    <BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:"Personalidades",url:`${baseURL}/personalidades`},{name:person.name,url:`${baseURL}${path}`}]} />
    <header className={styles.hero}>
      <div className={styles.portrait}>{person.image ? <Image src={person.image.src} alt={person.image.alt} fill priority sizes="(max-width: 720px) 100vw, 42vw" /> : <span aria-hidden="true">{person.name.slice(0,1)}</span>}</div>
      <div className={styles.intro}><span>Personalidade</span><h1>{person.name}</h1>{person.originalName||person.fullName&&person.fullName!==person.name?<p className={styles.fullName}>{[person.originalName,person.fullName!==person.name?person.fullName:undefined].filter(Boolean).join(" · ")}</p>:null}<ul>{person.occupations.map((occupation)=><li key={occupation}>{occupation}</li>)}</ul><dl>{person.countryOrRegion?<div><dt>Origem</dt><dd>{person.countryOrRegion}</dd></div>:null}{period?<div><dt>Período de vida</dt><dd>{period}</dd></div>:null}</dl><p className={styles.lead}>{person.summary}</p></div>
    </header>
    <section className={styles.about}><div><span>Sobre</span><h2>Uma trajetória em contexto</h2></div><div>{person.biography.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}{person.themes.length>0?<ul aria-label="Temas e características">{person.themes.map((theme)=><li key={theme}>{theme}</li>)}</ul>:null}</div></section>
    {person.ideas.length>0?<section className={styles.ideas}><header><span>Ideias principais</span><h2>Conceitos para ler sem atalhos</h2></header><div>{person.ideas.map((idea)=><article key={idea.title}><h3>{idea.title}</h3><p>{idea.description}</p></article>)}</div></section>:null}
    <PersonalityWorks {...works} movies={filmography} personId={person.id} />
    {startingPoints.length>0?<section className={styles.start}><header><span>Por onde começar</span><h2>Uma trilha possível, não uma hierarquia</h2></header><div>{startingPoints.map((item)=>item.kind==="reading"?<ReadingCard key={item.work.id} work={item.work} variant="editorial" comment={item.note} />:item.kind==="movie"?<MovieListCard key={item.work.id} movie={item.work} variant="organization" context={item.note} compact />:item.kind==="series"?<SeriesCard key={item.work.id} seriesId={item.work.id} context={item.note} />:<article className={styles.startingWork} key={item.work.id}><span>{item.work.year}</span><h3>{item.work.title}</h3><p>{item.note}</p><Link href={`/obras/${item.work.slug}`}>Conhecer a obra</Link></article>)}</div></section>:null}
    {person.relatedLinks.length>0||relatedPersonalities.length>0?<section className={styles.related}><span>Relações</span><h2>Conteúdos e personalidades</h2><ul>{relatedPersonalities.map((item)=><li key={item.id}>{publishedPersonIds.has(item.id)?<Link href={`/personalidades/${item.slug}`}>{item.name}<small>personalidade</small></Link>:<div>{item.name}<small>personalidade relacionada</small></div>}</li>)}{person.relatedLinks.map((item)=><li key={item.href}><Link href={item.href}>{item.label}<small>{relatedKindLabels[item.kind]}</small></Link></li>)}</ul></section>:null}
    <footer className={styles.sources}><span>Fontes e imagem</span><h2>Referências verificáveis</h2><ul>{person.sources.map((source)=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul>{person.image?<p>Foto: <a href={person.image.sourceUrl}>{person.image.credit}</a>. Licença: {person.image.licenseUrl?<a href={person.image.licenseUrl}>{person.image.license}</a>:person.image.license}.</p>:null}</footer>
  </main>;
}
