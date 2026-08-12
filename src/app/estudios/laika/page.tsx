import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { laikaStudio } from "@/content/studios/studios";
import { getMoviesByIds } from "@/data/movies";
import { baseURL } from "@/resources";
import styles from "./laika.module.scss";

const path = "/estudios/laika";
const title = "LAIKA: stop-motion, técnica e filmografia";
const description = "Um perfil editorial da LAIKA: história, materialidade do stop-motion, processo híbrido e filmes do estúdio, de Coraline a Wildwood.";

export const metadata: Metadata = {
  title, description, alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, type: "profile", url: `${baseURL}${path}` },
  twitter: { card: "summary", title, description },
};

export default async function LaikaPage() {
  const films = await getMoviesByIds(laikaStudio.movieIds);
  const released = films.filter((film) => film.productionStatus === "released");
  const upcoming = films.filter((film) => film.productionStatus === "upcoming");
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization", "@id": `${baseURL}${path}#organization`,
    name: laikaStudio.name, legalName: laikaStudio.legalName, url: `${baseURL}${path}`, foundingDate: String(laikaStudio.founded),
    address: { "@type": "PostalAddress", addressLocality: "Hillsboro", addressRegion: "Oregon", addressCountry: "US" },
    sameAs: ["https://www.laika.com/"],
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Estúdios", url: `${baseURL}/estudios` }, { name: "LAIKA", url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <header className={styles.hero} data-hero-mode="abstract">
      <div className={styles.workbench} aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>Perfil permanente · estúdio de animação</span>
        <h1>LAIKA</h1>
        <p>Um estúdio que constrói o impossível em escala de mesa — e deixa madeira, tecido, metal, tinta e luz participarem da imagem.</p>
        <dl><div><dt>Fundação</dt><dd>2005</dd></div><div><dt>Base</dt><dd>Oregon, EUA</dd></div><div><dt>Longas lançados</dt><dd>{released.length}</dd></div></dl>
      </div>
      <p className={styles.heroCredit}>Composição abstrata original em CSS; nenhum personagem ou cenário foi reproduzido.</p>
    </header>

    <nav className={styles.index} aria-label="Nesta página">
      <a href="#identidade">Identidade</a><a href="#processo">Processo</a><a href="#filmes">Filmografia</a><a href="#percursos">Por onde começar</a><a href="#fontes">Fontes</a>
    </nav>

    <section className={styles.intro} id="identidade">
      <div><span>01 · Identidade</span><h2>Não é nostalgia por uma técnica antiga.</h2></div>
      <div className={styles.prose}><p>A LAIKA nasceu em 2005 a partir da estrutura do antigo Will Vinton Studios, nos arredores de Portland. Seu primeiro longa próprio, <em>Coraline</em>, chegou em 2009 sob direção de Henry Selick. A continuidade do estúdio, porém, não depende de repetir aquele filme: cada produção muda escala, desenho, iluminação e proporção entre trabalho físico e digital.</p><p>O traço comum está menos numa “estética LAIKA” pronta do que numa decisão produtiva: personagens e cenários ocupam espaço real diante da câmera. Marcas de superfície, sombras e pequenas irregularidades não são decoração posterior; fazem parte da atuação.</p></div>
    </section>

    <section className={styles.process} id="processo">
      <header><span>02 · Oficina híbrida</span><h2>O quadro começa na matéria, mas não termina nela.</h2><p>Stop-motion não significa ausência de computador. Na LAIKA, fabricação física e recursos digitais são partes coordenadas da mesma imagem.</p></header>
      <ol>
        <li><b>Estrutura</b><p>Armaduras articuladas sustentam poses repetíveis; espuma, silicone, resina, tecido e pintura constroem corpo e superfície.</p></li>
        <li><b>Substituição</b><p>Expressões faciais podem usar peças intercambiáveis. Impressão 3D amplia a variedade, sem eliminar modelagem, acabamento e ajuste manual.</p></li>
        <li><b>Palco</b><p>Cenários em miniatura recebem iluminação, câmera e efeitos físicos. Animadores alteram poses em incrementos mínimos entre fotografias.</p></li>
        <li><b>Integração</b><p>Rig removal, composição, multidões, atmosfera e extensões digitais removem suportes e ampliam o que seria impraticável construir.</p></li>
      </ol>
      <aside><strong>O ponto não é esconder o digital.</strong><span>É fazê-lo preservar peso, textura e luz do que foi fotografado.</span></aside>
    </section>

    <section className={styles.filmography} id="filmes">
      <header><span>03 · Filmografia</span><h2>Seis longas, uma escala em expansão.</h2><p>A sequência é gerada por IDs permanentes do cadastro central. Obras sem perfil editorial completo continuam sem link.</p></header>
      <div className={styles.timeline}>
        {films.map((film, index) => <article key={film.id} className={styles.film} data-status={film.productionStatus}>
          <div className={styles.frame} aria-label={`Sem capa registrada para ${film.titleBr}`}><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
          <div className={styles.filmCopy}><div className={styles.filmMeta}><span>{film.productionStatus === "upcoming" ? "Próximo lançamento" : film.year}</span><span>{film.directors.join(" · ")}</span></div><h3>{film.titleBr}</h3><p>{film.shortDescription}</p>{film.productionStatus === "upcoming" ? <small>Lançamento anunciado nos EUA: 23 de outubro de 2026. Avaliação editorial pendente.</small> : null}</div>
        </article>)}
      </div>
      {upcoming.length ? <p className={styles.statusNote}><strong>Em produção confirmada:</strong> {upcoming.map((film) => film.titleBr).join(", ")}. Não é tratado como filme já lançado.</p> : null}
    </section>

    <section className={styles.paths} id="percursos">
      <header><span>04 · Seleção editorial</span><h2>Escolha pela pergunta, não por uma nota.</h2></header>
      <div><article><b>Para entender a identidade</b><h3>Coraline → ParaNorman</h3><p>Compare fantasia doméstica, terror familiar e como duas direções diferentes trabalham rostos e espaços.</p></article><article><b>Para observar escala</b><h3>Os Boxtrolls → Kubo</h3><p>Veja mecanismos, multidões e aventura ganharem amplitude sem perder a presença dos objetos.</p></article><article><b>Para uma entrada mais leve</b><h3>Link Perdido</h3><p>Viagem e comédia ocupam o primeiro plano, com cores mais abertas e menos ameaça gótica.</p></article></div>
    </section>

    <section className={styles.slate}>
      <header><span>05 · Além da filmografia lançada</span><h2>Projetos anunciados não são estreias confirmadas.</h2></header>
      {laikaStudio.announcedProjects.map((project) => <article key={project.title}><div><h3>{project.title}</h3><span>{project.kind}</span></div><p>{project.note}</p><strong>{project.state}</strong></article>)}
      <p>Projetos de live action, publicidade, exposições e produtos não foram misturados à filmografia principal.</p>
    </section>

    <section className={styles.related}><span>06 · Relações</span><h2>Continue por técnica, estúdio ou atmosfera.</h2><div><Link href="/blog/studio-ghibli"><b>Studio Ghibli</b><span>Outra relação entre oficina, autoria e continuidade institucional.</span></Link><Link href="/blog/melhores-filmes-terror-seculo-21"><b>Terror no século XXI</b><span>Onde animação, fantasia sombria e horror encontram outros caminhos.</span></Link><Link href="/filmes"><b>Biblioteca de filmes</b><span>Consulte obras, técnicas, países e estados editoriais.</span></Link></div></section>

    <footer className={styles.sources} id="fontes"><span>07 · Fontes e imagens</span><h2>O que sustenta este perfil.</h2><ul><li><a href="https://www.laika.com/" rel="noreferrer" target="_blank">Site oficial da LAIKA</a> — identidade, localização e atividades do estúdio.</li><li><a href="https://www.laika.com/our-films/" rel="noreferrer" target="_blank">Filmografia oficial</a> — referência primária; URL retornava 404 durante a revisão de 11 de agosto de 2026.</li><li><a href="https://wildwoodmovie.com/" rel="noreferrer" target="_blank">Site oficial de Wildwood</a> e anúncio de distribuição — estado e lançamento futuro.</li><li><a href="https://shop.laika.com/products/laika-the-magic-behind-a-stop-motion-dream-factory" rel="noreferrer" target="_blank">LAIKA: The Magic Behind a Stop-Motion Dream Factory</a> — materiais e processo.</li></ul><p><strong>Imagem do hero:</strong> nenhuma imagem promocional foi utilizada. A composição abstrata é original e feita em CSS. Capas e fotografias oficiais permanecem pendentes de licença ou autorização explícita.</p></footer>
  </main>;
}
