import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { animationWorks } from "@/content/animationWorks/animationWorks";
import { creators } from "@/content/creators/creators";
import { organizationsById, scienceSaru } from "@/content/organizations/organizations";
import { baseURL } from "@/resources";
import styles from "./science-saru.module.scss";

const path = "/estudios/science-saru";
const title = "Science SARU: linguagem, pessoas e obras";
const description = "Perfil editorial da Science SARU: história, animação digital, diferentes direções e obras de DEVILMAN crybaby a DAN DA DAN.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, type: "profile", url: `${baseURL}${path}` },
  twitter: { card: "summary", title, description },
};

const formatLabels = { feature: "Longa", short: "Curta", series: "Série" } as const;
const roleLabels = { "primary-production": "Produção principal", "co-production": "Coprodução", "animation-production": "Produção da animação", "animation-service": "Serviço de animação", development: "Desenvolvimento" } as const;

export default function ScienceSaruPage() {
  const works = animationWorks.filter((work) => work.relationships.some((relationship) => relationship.organizationId === scienceSaru.id));
  const releasedWorks = works.filter((work) => work.releaseStatus === "released");
  const upcomingWorks = works.filter((work) => work.releaseStatus === "upcoming");
  const founders = scienceSaru.founderIds.map((id) => creators.find((creator) => creator.id === id)).filter((creator) => creator !== undefined);
  const currentLeaders = scienceSaru.keyPeopleIds.map((id) => creators.find((creator) => creator.id === id)).filter((creator) => creator !== undefined);
  const parent = scienceSaru.parentOrganizationId ? organizationsById.get(scienceSaru.parentOrganizationId) : undefined;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization", "@id": `${baseURL}${path}#organization`,
    name: scienceSaru.name, legalName: scienceSaru.legalName, alternateName: scienceSaru.aliases, url: `${baseURL}${path}`,
    foundingDate: String(scienceSaru.founded), location: { "@type": "Place", name: `${scienceSaru.location?.city}, ${scienceSaru.location?.region}, ${scienceSaru.location?.country}` },
    founder: founders.map((person) => ({ "@type": "Person", name: person.name })), parentOrganization: parent ? { "@type": "Organization", name: parent.name } : undefined,
    sameAs: scienceSaru.website ? [scienceSaru.website] : undefined,
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Estúdios", url: `${baseURL}/estudios` }, { name: "Science SARU", url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <nav className={styles.breadcrumbs} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><span>Estúdios</span><span aria-hidden="true">/</span><strong>Science SARU</strong></nav>

    <header className={styles.hero}>
      <div className={styles.field} role="img" aria-label="Composição abstrata original de linhas, quadros e manchas de cor sugerindo transformação e movimento"><i /><i /><i /><i /></div>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>Estúdio de animação · Tóquio</span><h1>Science<br />SARU</h1><p>Uma estrutura criada para aproximar desenho, tecnologia e movimento — sem transformar essa combinação numa fórmula única.</p><dl><div><dt>Fundação</dt><dd>4 de fevereiro de {scienceSaru.founded}</dd></div><div><dt>Base</dt><dd>{scienceSaru.location?.city}, {scienceSaru.location?.region}</dd></div><div><dt>Grupo</dt><dd>{parent?.name} desde 2024</dd></div></dl><a className={styles.primaryAction} href="#obras">Percorrer as obras</a></div>
    </header>

    <nav className={styles.index} aria-label="Nesta página"><a href="#sobre">Sobre</a><a href="#linguagem">Linguagem</a><a href="#fases">Fases</a><a href="#obras">Obras</a><a href="#comecar">Por onde começar</a><a href="#fontes">Fontes</a></nav>

    <section className={styles.about} id="sobre"><header><span className={styles.eyebrow}>Formação e mudança</span><h2>Um estúdio jovem que já atravessou mais de uma fase.</h2></header><div><p>Masaaki Yuasa e Eunyoung Choi estabeleceram a Science SARU em 2013. A parceria inicial reuniu direção autoral, produção internacional e fluxos digitais capazes de sustentar movimento expressivo com equipes relativamente pequenas.</p><p>Essa origem é importante, mas não deve congelar o estúdio como “a empresa de Yuasa”. Outras direções ganharam espaço, a liderança institucional mudou e, em 2024, a Toho adquiriu integralmente a companhia.</p><dl className={styles.facts}><div><dt>Cofundadores</dt><dd>{founders.map((person) => person.name).join(" · ")}</dd></div><div><dt>Representante atual</dt><dd>{currentLeaders.map((person) => person.name).join(" · ")}</dd></div><div><dt>Estrutura atual</dt><dd>Subsidiária integral da {parent?.name}</dd></div></dl></div></section>

    <section className={styles.language} id="linguagem"><header><span className={styles.eyebrow}>Linguagem e produção</span><h2>Eficiência digital não precisa significar movimento rígido.</h2></header><div><p>A Science SARU ficou associada a linhas simplificadas, deformação livre e integração de desenho manual com ferramentas digitais. O ganho relevante não é “parecer tecnológico”, mas permitir que composição e corpo mudem depressa quando a cena exige.</p><p>Também não existe uma aparência SARU universal. A exuberância de <em>DEVILMAN crybaby</em>, a imaginação espacial de <em>Eizouken</em>, a delicadeza de <em>The Colors Within</em> e a ação paranormal de <em>DAN DA DAN</em> dependem de direções diferentes.</p></div></section>

    <section className={styles.phases} id="fases"><span className={styles.eyebrow}>Três movimentos</span><div><article><b>2013—2020</b><h3>Fundação e consolidação</h3><p>Yuasa e Choi estruturam uma produção reconhecível, do trabalho internacional às séries e aos longas autorais.</p></article><article><b>2020—2024</b><h3>Outras direções</h3><p>O catálogo amplia autoria, formatos e colaborações sem abandonar a flexibilidade gráfica.</p></article><article><b>2024—agora</b><h3>Dentro do grupo Toho</h3><p>A aquisição muda a relação empresarial; ainda é cedo para tratar seus efeitos criativos como conclusão fechada.</p></article></div></section>

    <section className={styles.works} id="obras"><header><span className={styles.eyebrow}>Filmografia estruturada</span><h2>Direções diferentes dentro da mesma infraestrutura.</h2><p>Os títulos são gerados pelos relacionamentos centrais. “Produção da animação” não implica propriedade da obra, financiamento integral ou distribuição.</p></header><div>{releasedWorks.map((work, index) => { const relationship = work.relationships.find((item) => item.organizationId === scienceSaru.id); return <article key={work.id}><b>{String(index + 1).padStart(2, "0")}</b><div><span>{work.year} · {formatLabels[work.format]}</span><h3>{work.title}</h3><p>{work.summary}</p><small>{work.directors.length ? `Direção: ${work.directors.join(" e ")} · ` : ""}{relationship ? roleLabels[relationship.role] : ""}</small></div></article>; })}</div></section>

    {upcomingWorks.length > 0 && <section className={styles.upcoming}><span className={styles.eyebrow}>Próximo registro</span>{upcomingWorks.map((work) => <article key={work.id}><strong>{work.year}</strong><div><h2>{work.title}</h2><p>{work.summary}</p></div><a href={work.officialUrl}>Fonte oficial</a></article>)}</section>}

    <section className={styles.start} id="comecar"><span className={styles.eyebrow}>Por onde começar</span><h2>Escolha o tipo de energia.</h2><div><article><strong>Imaginação em processo</strong><h3>Keep Your Hands Off Eizouken!</h3><p>A porta mais clara para entender como espaço, desenho e produção podem virar aventura.</p></article><article><strong>Performance e história</strong><h3>Inu-Oh</h3><p>Um longa em que música e transformação corporal reorganizam a narrativa histórica.</p></article><article><strong>Impulso contemporâneo</strong><h3>DAN DA DAN</h3><p>Romance, humor, terror e ação mostram a infraestrutura trabalhando com outra geração de direção.</p></article></div></section>

    <section className={styles.related}><span className={styles.eyebrow}>Continue explorando</span><div><Link href="/estudios/studio-ghibli"><strong>Studio Ghibli</strong><span>Continuidade institucional e autoria na animação japonesa.</span></Link><Link href="/estudios/cartoon-saloon"><strong>Cartoon Saloon</strong><span>Outra combinação entre desenho autoral e coproduções internacionais.</span></Link><Link href="/filmes"><strong>Biblioteca de filmes</strong><span>Obras, países e relações do catálogo central.</span></Link></div></section>

    <footer className={styles.sources} id="fontes"><span className={styles.eyebrow}>Fontes e imagens</span><h2>Base documental</h2><ul><li><a href="https://sciencesaru.com/en/about">Perfil institucional da Science SARU</a> — data, localização, representante e atividades.</li><li><a href="https://sciencesaru.com/en/works">Catálogo oficial</a> — formatos, créditos e anos.</li><li><a href="https://www.toho.co.jp/en/company/info/history">História corporativa da Toho</a> — aquisição integral em 2024.</li><li><a href="https://www.bunka.go.jp/j-mediaarts/en/animation/FeaturingStudios/SCIENCE-SARU.html">Agência de Assuntos Culturais do Japão</a> — fundação, pessoas e processo na fase inicial.</li></ul><p><strong>Imagens:</strong> nenhuma arte, personagem ou frame foi reutilizado. O hero usa somente formas abstratas originais em CSS; eventuais ativos promocionais exigem autorização específica.</p></footer>
  </main>;
}
