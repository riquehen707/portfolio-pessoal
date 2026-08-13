import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { animationWorks } from "@/content/animationWorks/animationWorks";
import { creators } from "@/content/creators/creators";
import { aardman } from "@/content/organizations/organizations";
import { baseURL } from "@/resources";
import styles from "./aardman.module.scss";

const path = "/estudios/aardman";
const title = "Aardman: stop-motion, humor e obras essenciais";
const description = "Perfil editorial da Aardman: história em Bristol, processo artesanal, comédia visual, pessoas e obras de Wallace & Gromit a Shaun the Sheep.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, type: "profile", url: `${baseURL}${path}` },
  twitter: { card: "summary", title, description },
};

const formatLabels = { feature: "Longa", short: "Curta", series: "Série" } as const;
const roleLabels = { "primary-production": "Produção principal", "co-production": "Coprodução", "animation-production": "Produção da animação", "animation-service": "Serviço de animação", development: "Desenvolvimento" } as const;

export default function AardmanPage() {
  const works = animationWorks.filter((work) => work.relationships.some((relationship) => relationship.organizationId === aardman.id));
  const releasedWorks = works.filter((work) => work.status === "released");
  const upcomingWorks = works.filter((work) => work.status === "upcoming");
  const founders = aardman.founderIds.map((id) => creators.find((creator) => creator.id === id)).filter((creator) => creator !== undefined);
  const keyPeople = aardman.keyPeopleIds.map((id) => creators.find((creator) => creator.id === id)).filter((creator) => creator !== undefined);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization", "@id": `${baseURL}${path}#organization`,
    name: aardman.name, alternateName: aardman.aliases, url: `${baseURL}${path}`, foundingDate: String(aardman.founded),
    location: { "@type": "Place", name: `${aardman.location?.city}, ${aardman.location?.country}` },
    founder: founders.map((person) => ({ "@type": "Person", name: person.name })), sameAs: aardman.website ? [aardman.website] : undefined,
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Estúdios", url: `${baseURL}/estudios` }, { name: "Aardman", url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <nav className={styles.breadcrumbs} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><span>Estúdios</span><span aria-hidden="true">/</span><strong>Aardman</strong></nav>

    <header className={styles.hero}>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>Estúdio de animação · Bristol</span><h1>Aardman</h1><p>Personagens de massa, máquinas que quase funcionam e uma comédia construída milímetro por milímetro.</p><dl><div><dt>Produção profissional</dt><dd>{aardman.founded}</dd></div><div><dt>Estrutura</dt><dd>Propriedade dos funcionários desde 2018</dd></div><div><dt>Obras no acervo</dt><dd>{works.length}</dd></div></dl><a className={styles.primaryAction} href="#obras">Explorar as obras</a></div>
      <div className={styles.workbench} role="img" aria-label="Composição abstrata original inspirada em bancada, arame, ferramentas e marcas de modelagem"><i /><i /><i /><i /><i /></div>
    </header>

    <nav className={styles.index} aria-label="Nesta página"><a href="#sobre">Sobre</a><a href="#processo">Processo</a><a href="#obras">Obras</a><a href="#comecar">Por onde começar</a><a href="#fontes">Fontes</a></nav>

    <section className={styles.about} id="sobre"><header><span className={styles.eyebrow}>História e identidade</span><h2>O nome veio antes do estúdio profissional.</h2></header><div><p>Peter Lord e David Sproxton registraram o nome Aardman Animations em 1972, ainda no início da parceria. O recorte institucional adotado aqui é 1976: o ano em que se mudaram para Bristol e começaram a produzir profissionalmente.</p><p>A escala cresceu, mas a identidade não depende apenas da argila. Personagem, observação cotidiana, timing e construção de mundo atravessam stop-motion, CGI, 2D, jogos e trabalhos comerciais.</p><dl className={styles.facts}><div><dt>Cofundadores</dt><dd>{founders.map((person) => person.name).join(" · ")}</dd></div><div><dt>Pessoa central</dt><dd>{keyPeople.find((person) => person.id === "person_nick_park")?.name}</dd></div><div><dt>Base</dt><dd>{aardman.location?.city}, {aardman.location?.country}</dd></div></dl></div></section>

    <section className={styles.process} id="processo"><header><span className={styles.eyebrow}>Processo</span><h2>O acabamento preserva as decisões da mão.</h2><p>A página não reduz a Aardman a “bonecos de massinha”. O resultado depende de uma cadeia coordenada de desenho, engenharia, animação, fotografia e pós-produção.</p></header><ol><li><b>01</b><div><strong>Personagem primeiro</strong><p>Expressão, silhueta e gesto precisam sustentar a cena antes que a técnica chame atenção.</p></div></li><li><b>02</b><div><strong>Estrutura interna</strong><p>Armaduras articuladas permitem repetir poses sem eliminar pequenas irregularidades de superfície.</p></div></li><li><b>03</b><div><strong>Comédia física</strong><p>Olhares, pausas e objetos domésticos transformam movimentos mínimos em narrativa legível.</p></div></li><li><b>04</b><div><strong>Ferramentas híbridas</strong><p>Efeitos digitais e outras técnicas ampliam o quadro, mas continuam subordinados ao ritmo e ao desenho.</p></div></li></ol></section>

    <section className={styles.works} id="obras"><header><span className={styles.eyebrow}>Filmografia estruturada</span><h2>Uma amostra entre curtas, séries e longas.</h2><p>Os itens são gerados pelos relacionamentos do catálogo central. A seleção não inclui publicidade, licenciamento nem obras apenas distribuídas pela Aardman.</p></header><div>{releasedWorks.map((work, index) => { const relationship = work.relationships.find((item) => item.organizationId === aardman.id); return <article key={work.id}><b>{String(index + 1).padStart(2, "0")}</b><div><span>{work.year} · {formatLabels[work.format]}</span><h3>{work.title}</h3><p>{work.summary}</p><small>{work.directors.length ? `Direção: ${work.directors.join(" e ")} · ` : ""}{relationship ? roleLabels[relationship.role] : ""}</small></div></article>; })}</div></section>

    {upcomingWorks.length > 0 && <section className={styles.upcoming}><span className={styles.eyebrow}>Próximo lançamento</span>{upcomingWorks.map((work) => <article key={work.id}><div><strong>{work.year}</strong><h2>{work.title}</h2><p>{work.summary}</p><small>Direção: {work.directors.join(" e ")}</small></div><a href={work.officialUrl}>Ver anúncio oficial</a></article>)}</section>}

    <section className={styles.start} id="comecar"><span className={styles.eyebrow}>Por onde começar</span><h2>Três portas para oficinas diferentes.</h2><div><article><strong>Precisão em meia hora</strong><h3>Wallace & Gromit</h3><p>Comece pelos curtas para ver invenção, suspense e comédia visual em máxima concentração.</p></article><article><strong>Escala de cinema</strong><h3>Chicken Run</h3><p>O primeiro longa mostra como a oficina absorveu multidões, cenários maiores e uma coprodução internacional.</p></article><article><strong>Quase sem diálogo</strong><h3>Shaun the Sheep</h3><p>A série é a melhor demonstração de leitura corporal, ritmo e comunicação entre idades.</p></article></div></section>

    <section className={styles.related}><span className={styles.eyebrow}>Continue explorando</span><div><Link href="/estudios/laika"><strong>LAIKA</strong><span>Outra organização do stop-motion, com escala e atmosfera diferentes.</span></Link><Link href="/estudios/cartoon-saloon"><strong>Cartoon Saloon</strong><span>Desenho 2D, folclore e coprodução a partir de Kilkenny.</span></Link><Link href="/filmes"><strong>Biblioteca de filmes</strong><span>Explore o catálogo central por obra, país e gênero.</span></Link></div></section>

    <footer className={styles.sources} id="fontes"><span className={styles.eyebrow}>Fontes e imagens</span><h2>Base documental</h2><ul><li><a href="https://www.aardman.com/about/">About Aardman</a> — história, Bristol e propriedade dos funcionários.</li><li><a href="https://www.aardman.com/about/history/">História oficial</a> — nome registrado em 1972 e produção profissional a partir de 1976.</li><li><a href="https://www.aardman.com/film-tv-games/">Film, TV & Games</a> — formatos e produções.</li><li><a href="https://www.aardman.com/latest-news/2026/march/watch-the-trailer-for-shaun-the-sheep-the-beast-of-mossy-bottom/">The Beast of Mossy Bottom</a> — lançamento e direção confirmados.</li></ul><p><strong>Imagens:</strong> nenhuma arte promocional, personagem ou frame foi usado. O hero é uma composição abstrata original em CSS, criada para permanecer funcional sem licença de imagem.</p></footer>
  </main>;
}
