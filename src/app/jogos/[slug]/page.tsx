import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { GameJsonLd } from "@/components/seo/GameJsonLd";
import { organizationsById } from "@/content/organizations/organizations";
import { getGameBySlug, getPublishedGames } from "@/data/games";
import { baseURL } from "@/resources";
import styles from "./game.module.scss";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPublishedGames()).map((game) => ({ slug: game.slug }));
}
export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game || game.status !== "published") return { robots: { index: false, follow: false } };
  const url = `${baseURL}/jogos/${game.slug}`;
  const images = game.heroImage
    ? [{ url: `${baseURL}${game.heroImage.src}`, alt: game.heroImage.alt }]
    : undefined;
  return {
    title: game.seo.title,
    description: game.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: game.seo.title,
      description: game.seo.description,
      url,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: game.seo.title,
      description: game.seo.description,
      images: images?.map((item) => item.url),
    },
  };
}
export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game || game.status !== "published" || !game.cover) notFound();
  const studios = game.organizationRelationships.map((rel) => ({
    name: organizationsById.get(rel.organizationId)?.name ?? rel.organizationId,
    roles: rel.roles,
  }));
  return (
    <main className={styles.page}>
      <GameJsonLd game={game} />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Jogos", url: `${baseURL}/jogos` },
          { name: game.title, url: `${baseURL}/jogos/${game.slug}` },
        ]}
      />
      <header className={styles.hero}>
        {game.heroImage ? (
          <Image
            className={styles.heroImage}
            src={game.heroImage.src}
            alt={game.heroImage.alt}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 960px"
          />
        ) : null}
        <div className={styles.heroText}>
          <span>{game.year} · jogo brasileiro</span>
          <h1>{game.title}</h1>
          <p>{game.editorialSummary}</p>
        </div>
      </header>
      <div className={styles.layout}>
        <article>
          <h2>Sobre o jogo</h2>
          <p>{game.description}</p>
          <h2>Como ele joga</h2>
          <p>{game.gameplay}</p>
          {game.artDirection ? (
            <>
              <h2>Direção de arte</h2>
              <p>{game.artDirection}</p>
            </>
          ) : null}
          {game.narrative ? (
            <>
              <h2>Narrativa</h2>
              <p>{game.narrative}</p>
            </>
          ) : null}
          {game.soundAndMusic ? (
            <>
              <h2>Som e música</h2>
              <p>{game.soundAndMusic}</p>
            </>
          ) : null}
          <h2>Por que importa</h2>
          <p>{game.whyItMatters}</p>
          <h2>Conexão com o Brasil</h2>
          {game.brazilianConnection.map((item) => (
            <p key={item.description}>{item.description}</p>
          ))}
          <h2>Desenvolvimento</h2>
          <p>{game.developmentContext}</p>
          {game.screenshots.length ? (
            <section className={styles.gallery} aria-labelledby="screenshots">
              <h2 id="screenshots">Cenas do jogo</h2>
              <div>
                {game.screenshots.map((image) => (
                  <figure key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width ?? 600}
                      height={image.height ?? 338}
                    />
                    <figcaption>{image.credit}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
          <section className={styles.sources}>
            <h2>Fontes e páginas oficiais</h2>
            <ul>
              {game.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <aside>
          <Image
            className={styles.cover}
            src={game.cover.src}
            alt={game.cover.alt}
            width={game.cover.width ?? 1200}
            height={game.cover.height ?? 1800}
          />
          <h2>Ficha essencial</h2>
          <dl>
            <div>
              <dt>Estúdio</dt>
              <dd>{studios.map((item) => item.name).join(", ")}</dd>
            </div>
            <div>
              <dt>Lançamento</dt>
              <dd>
                {game.releaseDate
                  ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(
                      new Date(game.releaseDate),
                    )
                  : game.year}
              </dd>
            </div>
            <div>
              <dt>Gêneros</dt>
              <dd>{[...game.genres, ...game.subgenres].join(", ")}</dd>
            </div>
            <div>
              <dt>Modos</dt>
              <dd>{game.modes.join(", ")}</dd>
            </div>
            <div>
              <dt>Plataformas</dt>
              <dd>{game.platforms.join(", ")}</dd>
            </div>
          </dl>
          {game.officialWebsite ? (
            <Link href={game.officialWebsite} target="_blank">
              Site oficial
            </Link>
          ) : null}
          {game.steamUrl ? (
            <Link href={game.steamUrl} target="_blank">
              Página na Steam
            </Link>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
