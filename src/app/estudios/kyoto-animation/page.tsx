import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { animationWorks } from "@/content/animationWorks/animationWorks";
import { creators } from "@/content/creators/creators";
import { kyotoAnimation } from "@/content/organizations/organizations";
import { baseURL } from "@/resources";
import styles from "./kyoto-animation.module.scss";

const path = "/estudios/kyoto-animation";
const title = "Kyoto Animation: história, processo e obras essenciais";
const description = "Perfil editorial da Kyoto Animation: origem em Uji, formação interna, linguagem visual e obras de Haruhi, K-ON!, A Silent Voice e Violet Evergarden.";

export const metadata: Metadata = {
  title, description, alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, type: "profile", url: `${baseURL}${path}` },
  twitter: { card: "summary", title, description },
};

const formatLabels = { feature: "Longa", short: "Curta", series: "Série" } as const;

export default function KyotoAnimationPage() {
  const works = animationWorks.filter((work) => work.relationships.some((relationship) => relationship.organizationId === kyotoAnimation.id));
  const releasedWorks = works.filter((work) => work.status === "released");
  const upcomingWorks = works.filter((work) => work.status === "upcoming");
  const founders = kyotoAnimation.founderIds.map((id) => creators.find((creator) => creator.id === id)).filter((creator) => creator !== undefined);
  const leaders = kyotoAnimation.keyPeopleIds.map((id) => creators.find((creator) => creator.id === id)).filter((creator) => creator !== undefined);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization", "@id": `${baseURL}${path}#organization`,
    name: kyotoAnimation.name, legalName: kyotoAnimation.legalName, alternateName: kyotoAnimation.aliases,
    url: `${baseURL}${path}`, foundingDate: String(kyotoAnimation.founded),
    location: { "@type": "Place", name: `${kyotoAnimation.location?.city}, ${kyotoAnimation.location?.region}, ${kyotoAnimation.location?.country}` },
    founder: founders.map((person) => ({ "@type": "Person", name: person.name })),
    employee: leaders.map((person) => ({ "@type": "Person", name: person.name })),
    sameAs: kyotoAnimation.website ? [kyotoAnimation.website] : undefined,
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Estúdios", url: `${baseURL}/estudios` }, { name: kyotoAnimation.name, url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <nav className={styles.breadcrumbs} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><span>Estúdios</span><span aria-hidden="true">/</span><strong>Kyoto Animation</strong></nav>

    <header className={styles.hero}>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>Estúdio de animação · Uji</span><h1>Kyoto<br />Animation</h1><p>Uma casa de produção em que movimento, luz e atenção ao cotidiano fazem o desenho parecer vivido.</p><dl><div><dt>Fundação</dt><dd>{kyotoAnimation.founded}</dd></div><div><dt>Base</dt><dd>{kyotoAnimation.location?.city}, {kyotoAnimation.location?.region}</dd></div><div><dt>Presidência</dt><dd>{leaders.map((person) => person.name).join(" · ")}</dd></div></dl><a className={styles.primaryAction} href="#obras">Explorar as obras</a></div>
      <div className={styles.lightTable} role="img" aria-label="Composição abstrata original com folhas translúcidas, marcas de registro e luz, sugerindo uma mesa de animação"><span /><span /><span /><i /><i /></div>
    </header>

    <nav className={styles.index} aria-label="Nesta página"><a href="#sobre">Sobre</a><a href="#processo">Processo</a><a href="#linguagem">Linguagem</a><a href="#obras">Obras</a><a href="#comecar">Por onde começar</a><a href="#fontes">Fontes</a></nav>

    <section className={styles.about} id="sobre"><header><span className={styles.eyebrow}>Origem e continuidade</span><h2>De uma equipe em Kyoto a uma estrutura própria de produção.</h2></header><div><p>Yoko e Hideaki Hatta iniciaram a Kyoto Animation em 1981; a empresa foi formalmente constituída em 1985. Sua base permanece em Uji, fora do principal eixo industrial de Tóquio.</p><p>Hideaki Hatta presidiu a companhia desde a incorporação até sua morte, em fevereiro de 2026. Shinichiro Hatta assumiu então a presidência e a função de CEO. A mudança é recente, por isso esta página registra a liderança sem antecipar conclusões sobre uma nova fase criativa.</p><dl className={styles.facts}><div><dt>Cofundadores</dt><dd>{founders.map((person) => person.name).join(" · ")}</dd></div><div><dt>Constituição</dt><dd>1985</dd></div><div><dt>Atuação</dt><dd>Animação, publicação, produtos e formação</dd></div></dl></div></section>

    <section className={styles.process} id="processo"><header><span className={styles.eyebrow}>Processo e formação</span><h2>A obra começa antes da cena pronta.</h2></header><div className={styles.processGrid}><article><b>01</b><h3>Equipe e continuidade</h3><p>A estrutura reúne diferentes etapas da animação e favorece a circulação de conhecimento entre produções. Isso ajuda a explicar consistência, não uma autoria coletiva sem diferenças.</p></article><article><b>02</b><h3>Desenho e acabamento digital</h3><p>Computadores e ferramentas digitais entram no fluxo sem apagar a base desenhada. Cor, composição e fotografia são parte da encenação, não uma camada decorativa.</p></article><article><b>03</b><h3>Formação</h3><p>A escola mantida pela empresa organiza cursos de animação e pintura. É um componente concreto da infraestrutura, embora não autorize generalizações sobre toda trajetória profissional do estúdio.</p></article></div></section>

    <section className={styles.language} id="linguagem"><div><span className={styles.eyebrow}>Linguagem editorial</span><h2>O acontecimento também mora no intervalo.</h2></div><div><p>Uma assinatura recorrente aparece na observação: mãos que hesitam, postura, cabelo e tecido em movimento, mudanças de luz, salas que guardam a tensão entre pessoas. O cotidiano não funciona apenas como pausa; ele organiza personagem e ritmo.</p><p>Isso não reduz a Kyoto Animation a uma aparência única. A comédia expansiva de <em>CITY THE ANIMATION</em>, a contenção de <em>Liz and the Blue Bird</em> e o melodrama visual de <em>Violet Evergarden</em> respondem a direções diferentes dentro da mesma infraestrutura.</p></div></section>

    <aside className={styles.memorial}><span>18 · 07 · 2019</span><p>O incêndio criminoso que atingiu o estúdio e sua equipe faz parte desta história e não cabe como nota de rodapé. Aqui ele permanece registrado com sobriedade, sem imagens, números transformados em espetáculo ou uma narrativa fácil de “superação”.</p></aside>

    <section className={styles.works} id="obras"><header><span className={styles.eyebrow}>Filmografia estruturada</span><h2>Uma amostra, não um cânone fechado.</h2><p>As obras abaixo vêm dos relacionamentos do catálogo central. A seleção atravessa TV e cinema e não confunde produção da animação com distribuição ou propriedade integral.</p></header><div>{releasedWorks.map((work, index) => <article key={work.id}><b>{String(index + 1).padStart(2, "0")}</b><div><span>{work.year} · {formatLabels[work.format]}</span><h3>{work.title}</h3><p>{work.summary}</p><small>{work.directors.length ? `Direção: ${work.directors.join(" e ")} · ` : ""}Produção da animação</small></div></article>)}</div></section>

    {upcomingWorks.length > 0 && <section className={styles.upcoming}><span className={styles.eyebrow}>Obra futura confirmada</span>{upcomingWorks.map((work) => <article key={work.id}><strong>{work.year}</strong><div><h2>{work.title}</h2><p>{work.summary}</p></div><a href={work.officialUrl}>Catálogo oficial</a></article>)}</section>}

    <section className={styles.start} id="comecar"><span className={styles.eyebrow}>Por onde começar</span><h2>Três portas, três ritmos.</h2><div><article><strong>Para observar o cotidiano</strong><h3>Hyōka</h3><p>Comece pela maneira como percepção e espaço visual ampliam mistérios pequenos. Depois, siga para <em>K-ON!</em>.</p></article><article><strong>Para um longa concentrado</strong><h3>Liz and the Blue Bird</h3><p>Uma entrada precisa para gesto, som e distância emocional. Continue com <em>A Silent Voice</em>.</p></article><article><strong>Para escala e acabamento</strong><h3>Violet Evergarden</h3><p>A série combina episódios íntimos com composição visual ampla. Depois, compare com o longa de 2020.</p></article></div></section>

    <section className={styles.related}><span className={styles.eyebrow}>Continue explorando</span><div><Link href="/estudios/studio-ghibli"><strong>Studio Ghibli</strong><span>Outra estrutura japonesa em que continuidade e autoria convivem.</span></Link><Link href="/estudios/science-saru"><strong>Science SARU</strong><span>Fluxos digitais e direções variadas em uma organização mais recente.</span></Link><Link href="/filmes"><strong>Biblioteca de filmes</strong><span>Obras, países e relações do catálogo central.</span></Link></div></section>

    <footer className={styles.sources} id="fontes"><span className={styles.eyebrow}>Fontes e imagens</span><h2>Base documental</h2><ul><li><a href="https://www.kyotoanimation.co.jp/en/company/profile/">Perfil corporativo</a> — endereço, liderança, fundação e constituição.</li><li><a href="https://www.kyotoanimation.co.jp/en/company/business/">Atividades da empresa</a> — animação, publicação, produtos e formação.</li><li><a href="https://www.kyotoanimation.co.jp/en/works/">Catálogo oficial</a> — anos, formatos e situação das obras.</li><li><a href="https://www.socio.kyoto-u.ac.jp/wp-content/uploads/2019/08/EAJW-Pamphlet_2019.pdf">Kyoto University</a> — origem do estúdio e participação de Yoko e Hideaki Hatta.</li><li><a href="https://www.kyotoanimation.co.jp/information/?id=6870">Comunicado sobre Hideaki Hatta</a> — falecimento e sucessão em 2026.</li><li><a href="https://www.kyotoanimation.co.jp/information/?id=3089">Comunicado de 2019</a> — registro institucional do incêndio.</li></ul><p><strong>Imagens:</strong> nenhuma arte promocional, personagem, logotipo ou frame foi reutilizado. O hero é uma composição abstrata original em CSS; ela dispensa ativo externo e pendência de licenciamento.</p></footer>
  </main>;
}
