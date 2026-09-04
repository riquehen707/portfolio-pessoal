import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingComments } from "@/components/comments/ReadingComments";
import { ReadingAuthors, ReadingCover, ReadingEditionInfo, ReadingEditorialEvaluation, ReadingOffers, ReadingRelations } from "@/components/reading";
import { readingLabel } from "@/components/reading/readingLabels";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ReadingWorkJsonLd } from "@/components/seo/ReadingWorkJsonLd";
import { organizationsById } from "@/content/organizations/organizations";
import { creators } from "@/content/creators/creators";
import { isComicWork } from "@/content/reading/readingDomain";
import { getPublishedBooks, getReadingCurationsForWork, getReadingEditionsForWork, getReadingOffersForEdition, getReadingVolumesForWork, getReadingWorkBySlug, getReadingWorks } from "@/data/reading";
import { selectReadingPrerenderWorks } from "@/data/reading/prerender";
import { baseURL } from "@/resources";
import { commentsConfigured } from "@/lib/comments/supabaseComments";
import styles from "../reading.module.scss";

export const dynamicParams = true;
export const revalidate = 86400;
export async function generateStaticParams() { return selectReadingPrerenderWorks(await getPublishedBooks()).map((work) => ({ slug: work.slug })); }
async function findBook(slug: string) { const work = await getReadingWorkBySlug(slug); return work && work.status === "published" && !isComicWork(work) ? work : undefined; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const work = await findBook((await params).slug);
  if (!work) return { robots: { index: false, follow: false } };
  const title = work.titleBr ?? work.originalTitle;
  const url = `${baseURL}/livros/${work.slug}`;
  const editions = await getReadingEditionsForWork(work.id);
  const featuredEdition = editions.find((edition) => edition.id === work.featuredEditionId) ?? editions.find((edition) => edition.cover);
  const image = work.image ?? featuredEdition?.cover;
  return { title, description: work.shortDescription, alternates: { canonical: url }, robots: { index: true, follow: true }, openGraph: { title, description: work.shortDescription, url, type: "book", images: image ? [{ url: `${baseURL}${image.src}`, alt: image.alt }] : undefined } };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const work = await findBook((await params).slug);
  if (!work) notFound();
  const [volumes, editions, works] = await Promise.all([getReadingVolumesForWork(work.id), getReadingEditionsForWork(work.id), getReadingWorks()]);
  const publishedVolumes = volumes.filter((volume) => volume.status === "published");
  const publishedEditions = editions.filter((edition) => edition.status === "published");
  const offers = (await Promise.all(publishedEditions.map((edition) => getReadingOffersForEdition(edition.id)))).flat();
  const title = work.titleBr ?? work.originalTitle;
  const curations = getReadingCurationsForWork(work.id);
  const peopleById = new Map(creators.map((person) => [person.id, person]));
  const preferredEdition = publishedEditions.find((edition) => edition.id === work.featuredEditionId && edition.cover) ?? publishedEditions.find((edition) => edition.country === "Brasil" && edition.cover) ?? publishedEditions.find((edition) => edition.cover);
  const displayImage = work.image ?? preferredEdition?.cover;
  const organizations = [...new Set([...work.organizationRelationships.map((relation) => relation.organizationId), ...publishedEditions.flatMap((edition) => [edition.publisherId, edition.imprintId].filter((id): id is string => Boolean(id)))])].flatMap((id) => { const organization = organizationsById.get(id); return organization ? [organization] : []; });
  const updatedAt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${work.updatedAt}T00:00:00Z`));

  return <main className={`${styles.page} ${styles.detailPage}`}>
    <ReadingWorkJsonLd work={work} editions={publishedEditions} />
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Livros", url: `${baseURL}/livros` }, { name: title, url: `${baseURL}/livros/${work.slug}` }]} />
    <nav className={styles.breadcrumb} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/livros">Livros</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
    <article className={styles.bookProfile}>
      <div className={styles.coverColumn}><ReadingCover work={work} image={displayImage} />{displayImage ? <small>{displayImage.credit}</small> : null}</div>
      <header className={styles.bookHero}>
        <div className={styles.badges}><span>{readingLabel(work.format)}</span>{work.workType ? <span>{readingLabel(work.workType)}</span> : null}<span>{readingLabel(work.publicationStatus)}</span>{work.publicationDisplay || work.publicationStart ? <span>{work.publicationDisplay ?? work.publicationStart}</span> : null}</div>
        <h1>{title}</h1>{title !== work.originalTitle ? <p className={styles.originalTitle}>{work.originalTitle}</p> : null}
        <ReadingAuthors credits={work.credits} /><p className={styles.synopsis}>{work.shortDescription}</p>
        <dl className={styles.quickFacts}>
          <div><dt>Origem</dt><dd>{work.originCountries.join(" · ")}</dd></div><div><dt>Idioma original</dt><dd>{work.originalLanguages.join(" · ")}</dd></div>
          <div><dt>Gêneros</dt><dd>{work.genres.length ? work.genres.join(" · ") : "Não classificados"}</dd></div><div><dt>Edição brasileira</dt><dd>{publishedEditions.some((edition) => edition.country === "Brasil") ? "Cadastrada" : "Ainda não confirmada"}</dd></div>
        </dl>
      </header>
    </article>
    <div className={styles.contentLayout}>
      <div className={styles.mainColumn}>
        {work.audienceProfile || work.themes.length || work.concepts?.length ? <section className={styles.editorialSection} aria-labelledby="sobre-a-obra"><span className={styles.kicker}>Visão geral</span><h2 id="sobre-a-obra">{work.audienceProfile ? "Sobre a obra" : "Temas e conceitos"}</h2>{work.audienceProfile ? <p>{work.audienceProfile}</p> : null}{(work.concepts?.length ? work.concepts : work.themes).length ? <div className={styles.tags} aria-label="Conceitos da obra">{(work.concepts?.length ? work.concepts : work.themes).map((concept) => <span key={concept}>{concept}</span>)}</div> : null}</section> : null}
        {work.editorialEvaluation ? <ReadingEditorialEvaluation evaluation={work.editorialEvaluation} /> : null}
        {publishedVolumes.length ? <section className={styles.editorialSection}><span className={styles.kicker}>Organização</span><h2>Série e volumes</h2><div className={styles.volumeList}>{publishedVolumes.map((volume) => <article key={volume.id}><strong>{volume.label}</strong>{volume.originalTitle ? <p>{volume.originalTitle}</p> : null}</article>)}</div></section> : null}
        {publishedEditions.length ? <section className={styles.editorialSection}><span className={styles.kicker}>Publicações específicas</span><h2>Edições cadastradas</h2><div className={styles.editionList}>{publishedEditions.map((edition) => <article key={edition.id}><ReadingEditionInfo edition={edition} /></article>)}</div></section> : null}
        <ReadingRelations work={work} works={works} />
        {work.relatedPeople?.length ? <section className={styles.editorialSection}><span className={styles.kicker}>Contexto</span><h2>Pessoas relacionadas</h2><ul className={styles.linkList}>{work.relatedPeople.map((relation) => { const person = peopleById.get(relation.personId); if (!person) return null; return <li key={`${relation.personId}-${relation.relationship}`}>{person.status === "published" && person.profilePath ? <Link href={person.profilePath}>{person.name}</Link> : person.name}{relation.note ? ` — ${relation.note}` : null}</li>; })}</ul></section> : null}
        {work.relatedArticlePaths?.length ? <section className={styles.editorialSection}><span className={styles.kicker}>No arquivo editorial</span><h2>Perfis e artigos relacionados</h2><ul className={styles.linkList}>{work.relatedArticlePaths.map((href) => <li key={href}><Link href={href}>Abrir conteúdo editorial relacionado</Link></li>)}</ul></section> : null}
        {curations.length ? <section className={styles.editorialSection}><span className={styles.kicker}>Continue explorando</span><h2>Artigos relacionados</h2><ul className={styles.linkList}>{curations.map(({ curation }) => <li key={curation.id}><Link href={curation.href}>{curation.title}</Link></li>)}</ul></section> : null}
      </div>
      <aside className={styles.sideColumn} aria-label="Informações complementares">
        {offers.length ? <section><h2>Ler ou comprar</h2><ReadingOffers offers={offers} /></section> : null}
        {organizations.length ? <section><h2>Editoras e organizações</h2><ul>{organizations.map((organization) => <li key={organization.id}>{organization.status === "published" && organization.profilePath ? <Link href={organization.profilePath}>{organization.name}</Link> : organization.name}</li>)}</ul></section> : null}
        <section><h2>Fontes e créditos</h2><ul>{work.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul>{displayImage ? <p>Imagem: {displayImage.credit} · direitos: {displayImage.rights}</p> : null}<p>Ficha revisada em {updatedAt}.</p></section>
      </aside>
    </div>
    <ReadingComments workId={work.id} enabled={commentsConfigured} />
    <nav className={styles.backLink} aria-label="Voltar à biblioteca"><Link href="/livros">← Ver todos os livros</Link></nav>
  </main>;
}
