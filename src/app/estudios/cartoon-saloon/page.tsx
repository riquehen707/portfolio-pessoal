import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { animationWorks } from "@/content/animationWorks/animationWorks";
import { creators } from "@/content/creators/creators";
import { cartoonSaloon } from "@/content/organizations/organizations";
import { baseURL } from "@/resources";
import styles from "./cartoon-saloon.module.scss";

const path = "/estudios/cartoon-saloon";
const title = "Cartoon Saloon: desenho, memória e filmografia";
const description = "Perfil editorial do Cartoon Saloon: história em Kilkenny, animação 2D, folclore irlandês, coproduções, pessoas e obras.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, url: `${baseURL}${path}`, type: "profile" },
  twitter: { card: "summary", title, description },
};

const labels = { feature: "Longa", short: "Curta", series: "Série" } as const;
const roles = {
  "primary-production": "Produção principal",
  "co-production": "Coprodução",
  "animation-production": "Produção da animação",
  "animation-service": "Serviço de animação",
  development: "Desenvolvimento",
} as const;

export default function CartoonSaloonPage() {
  const works = animationWorks.filter((work) =>
    work.relationships.some((relationship) => relationship.organizationId === cartoonSaloon.id),
  );
  const founders = cartoonSaloon.founderIds
    .map((id) => creators.find((creator) => creator.id === id))
    .filter((creator) => creator !== undefined);
  const featureCount = works.filter((work) => work.format === "feature" && work.status === "released").length;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseURL}${path}#organization`,
    name: cartoonSaloon.name,
    url: `${baseURL}${path}`,
    foundingDate: String(cartoonSaloon.founded),
    location: { "@type": "Place", name: `${cartoonSaloon.location?.city}, ${cartoonSaloon.location?.country}` },
    founder: founders.map((person) => ({ "@type": "Person", name: person.name })),
    sameAs: cartoonSaloon.website ? [cartoonSaloon.website] : undefined,
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Estúdios", url: `${baseURL}/estudios` }, { name: "Cartoon Saloon", url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <nav className={styles.breadcrumbs} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><span>Estúdios</span><span aria-hidden="true">/</span><strong>Cartoon Saloon</strong></nav>
    <header className={styles.hero}>
      <div className={styles.print} role="img" aria-label="Composição abstrata original de formas planas, linhas e textura de impressão"><i /><i /><i /><i /></div>
      <div><span>Estúdio de animação · Kilkenny</span><h1>Cartoon<br />Saloon</h1><p>Desenho, movimento e memória cultural tratados como partes da mesma narrativa — sem uma única fórmula visual.</p><dl><div><dt>Fundação</dt><dd>{cartoonSaloon.founded}</dd></div><div><dt>Longas lançados</dt><dd>{featureCount}</dd></div><div><dt>Cofundadores</dt><dd>{founders.map((person) => person.name).join(" · ")}</dd></div></dl><a className={styles.primaryAction} href="#obras">Conhecer as obras</a></div>
      <small>Composição abstrata original em CSS; nenhuma arte dos filmes foi reproduzida.</small>
    </header>

    <nav className={styles.index} aria-label="Nesta página"><a href="#historia">História</a><a href="#linguagem">Linguagem</a><a href="#folclore">Lugar</a><a href="#obras">Obras</a><a href="#comecar">Por onde começar</a><a href="#fontes">Fontes</a></nav>

    <section id="historia"><header><span>Formação e continuidade</span><h2>Um estúdio situado em Kilkenny, construído por colaboração internacional.</h2></header><div><p>Paul Young, Tomm Moore e Nora Twomey estabeleceram o Cartoon Saloon em 1999. Curtas, séries e produção para terceiros conviveram com o desenvolvimento demorado de <em>The Secret of Kells</em>, primeiro longa do estúdio.</p><p>A continuidade não veio de repetir um sucesso. Projetos autorais, adaptações literárias, televisão e coproduções deram escalas diferentes a uma oficina que continua ligada a Kilkenny.</p></div></section>

    <section className={styles.ink} id="linguagem"><header><span>Ilustração em movimento</span><h2>A imagem plana não precisa ser emocionalmente rasa.</h2></header><div><p>Contorno, campos de cor e perspectiva estilizada organizam a atenção antes de simular profundidade. Técnicas tradicionais e digitais servem ao desenho específico de cada obra, uma combinação que o próprio estúdio apresenta como parte de sua prática.</p><p>Essa recorrência não cria uma estética única. Tomm Moore trabalha folclore e paisagem por geometrias próprias; Nora Twomey adapta materiais e contextos culturais distintos. <em>The Breadwinner</em> não é uma extensão decorativa da Irlanda.</p></div></section>

    <section id="folclore"><header><span>Folclore, história e lugar</span><h2>Irlanda aparece como memória disputada, não como ornamento.</h2></header><div><p><em>The Secret of Kells</em>, <em>Song of the Sea</em> e <em>WolfWalkers</em> formam a trilogia informal de folclore irlandês associada a Tomm Moore. São obras independentes, não capítulos de uma franquia.</p><p>Manuscritos, oralidade, paisagem, colonização e a relação entre humanos e natureza mudam de função em cada filme. Fora desse conjunto, outras direções e geografias impedem que “irlandês” se torne um rótulo visual uniforme.</p></div></section>

    <section className={styles.beyond}><span>Além da trilogia</span><h2>Afeganistão, literatura infantil, memória e televisão.</h2><p><em>The Breadwinner</em>, <em>My Father’s Dragon</em>, <em>Late Afternoon</em> e <em>Puffin Rock</em> mudam contextos, públicos, direções e relações produtivas — inclusive o peso de coprodutores e plataformas.</p></section>

    <section className={styles.works} id="obras"><header><span>Obras estruturadas</span><h2>Vínculos confirmados, não uma lista copiada para a página.</h2><p>{works.length} registros centrais estão organizados por formato. A seleção não pretende substituir a filmografia oficial completa.</p></header>{(["feature", "short", "series"] as const).map((format) => { const formatWorks = works.filter((work) => work.format === format); return formatWorks.length > 0 && <div key={format}><h3>{format === "feature" ? "Longas" : format === "short" ? "Curtas" : "Séries"}</h3>{formatWorks.map((work, index) => { const relationship = work.relationships.find((item) => item.organizationId === cartoonSaloon.id); return <article key={work.id}><b>{String(index + 1).padStart(2, "0")}</b><div><span>{work.year} · {labels[work.format]}</span><h4>{work.title}</h4><p>{work.summary}</p><small>{work.directors.length ? `Direção: ${work.directors.join(" e ")} · ` : ""}{relationship ? roles[relationship.role] : ""}</small></div></article>; })}</div>; })}</section>

    <aside className={styles.current}><span>Projeto atual confirmado</span><h2>Julián está em produção, ainda sem data pública.</h2><p>O longa de Louise Bagnall, inspirado no livro <em>Julián Is a Mermaid</em>, aparece no site oficial como coprodução. Sem ano de lançamento confirmado, ele não foi forçado ao catálogo cronológico.</p><a href="https://www.cartoonsaloon.ie/irish-animation-studio/feature-films/julian/">Consultar o registro oficial</a></aside>

    <section className={styles.people}><span>Pessoas</span><h2>O estúdio não substitui seus autores.</h2><p><strong>Tomm Moore</strong>, <strong>Nora Twomey</strong> e <strong>Paul Young</strong> fundaram a organização, mas exercem funções diferentes em direção, criação e produção. Ross Stewart, Louise Bagnall e outros profissionais aparecem nas obras em que seus créditos estão confirmados. Os perfis pessoais permanecem como rascunhos enquanto não houver conteúdo biográfico suficiente.</p></section>

    <section className={styles.start} id="comecar"><span>Por onde começar</span><h2>Escolha uma relação, não uma nota.</h2><div><p><strong>Primeiro contato:</strong> <em>Song of the Sea</em>, pelo equilíbrio entre família, paisagem e tradição oral.</p><p><strong>História e conflito:</strong> <em>The Breadwinner</em>, para conhecer Nora Twomey e outra geografia cultural.</p><p><strong>Forma condensada:</strong> <em>Late Afternoon</em>, um curta em que memória organiza cor e tempo.</p><p><strong>Em família:</strong> <em>Puffin Rock</em>, que revela o lado serial e pré-escolar do estúdio.</p></div></section>

    <section className={styles.related}><span>Continue explorando</span><h2>Outros caminhos existentes.</h2><div><Link href="/estudios/studio-ghibli">Perfil do Studio Ghibli</Link><Link href="/estudios/laika">Perfil da LAIKA</Link><Link href="/filmes">Biblioteca de filmes</Link></div></section>

    <footer id="fontes"><span>Fontes e imagens</span><h2>Base documental</h2><ul><li><a href="https://www.cartoonsaloon.ie/irish-animation-studio/about/">Página institucional oficial</a> — fundação, localização, cofundadores e atividades.</li><li><a href="https://www.cartoonsaloon.ie/irish-animation-studio/feature-films/">Longas oficiais</a>.</li><li><a href="https://www.cartoonsaloon.ie/irish-animation-studio/short-films/">Curtas oficiais</a> e <a href="https://www.cartoonsaloon.ie/tv-series/">séries oficiais</a>.</li><li><a href="https://www.cartoonsaloon.ie/irish-animation-studio/feature-films/julian/">Página oficial de Julián</a> — direção e coprodução; sem data divulgada.</li></ul><p>Nenhuma imagem, pôster ou frame foi usado. A página permanece completa com formas abstratas originais; ativos promocionais seguem pendentes de autorização específica.</p></footer>
  </main>;
}
