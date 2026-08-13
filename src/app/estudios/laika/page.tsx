import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { OrganizationWorks, getOrganizationMovies } from "@/components/organizations/OrganizationWorks";
import { creators } from "@/content/creators/creators";
import { laika } from "@/content/organizations/organizations";
import { baseURL } from "@/resources";
import styles from "./laika.module.scss";

const path = "/estudios/laika";
const title = "LAIKA: história, processo e filmografia";
const description = "Perfil editorial da LAIKA: stop-motion, processo híbrido e filmografia relacionada ao estúdio, de Coraline a Wildwood.";
const acceptedRoles = ["production", "animation", "co-production"] as const;

export const metadata: Metadata = {
  title, description, alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, type: "profile", url: `${baseURL}${path}` },
  twitter: { card: "summary", title, description },
};

export default function LaikaPage() {
  const relatedMovies = getOrganizationMovies(laika.id, acceptedRoles);
  const releasedCount = relatedMovies.filter((movie) => movie.productionStatus === "released").length;
  const upcomingMovie = relatedMovies.find((movie) => movie.productionStatus === "upcoming");
  const keyPeople = laika.keyPeopleIds.map((id) => creators.find((person) => person.id === id)).filter((person) => person !== undefined);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization", "@id": `${baseURL}${path}#organization`,
    name: laika.name, legalName: laika.legalName, url: `${baseURL}${path}`, foundingDate: String(laika.founded),
    address: { "@type": "PostalAddress", addressLocality: laika.location?.city, addressRegion: laika.location?.region, addressCountry: "US" },
    employee: keyPeople.map((person) => ({ "@type": "Person", name: person.name })), sameAs: laika.website ? [laika.website] : undefined,
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Estúdios", url: `${baseURL}/estudios` }, { name: "LAIKA", url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <nav className={styles.breadcrumbs} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><span>Estúdios</span><span aria-hidden="true">/</span><strong>LAIKA</strong></nav>

    <header className={styles.hero}>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>Perfil de estúdio · animação</span><h1>LAIKA</h1><p>Stop-motion em escala de longa-metragem, construído entre matéria, fotografia e ferramentas digitais.</p><dl><div><dt>Fundação</dt><dd>{laika.founded}</dd></div><div><dt>Base</dt><dd>{laika.location?.city}, {laika.location?.region}</dd></div><div><dt>Longas lançados</dt><dd>{releasedCount}</dd></div></dl><a className={styles.primaryAction} href="#filmes">Explorar os filmes</a></div>
      <div className={styles.heroVisual} role="img" aria-label="Composição abstrata original inspirada em armaduras, madeira e estruturas de cenário"><i /><i /><i /></div>
    </header>

    <nav className={styles.index} aria-label="Nesta página"><a href="#identidade">Sobre</a><a href="#processo">Processo</a><a href="#filmes">Filmografia</a><a href="#comecar">Por onde começar</a><a href="#fontes">Fontes</a></nav>

    <section className={styles.split} id="identidade"><header><span className={styles.eyebrow}>Sobre o estúdio</span><h2>A técnica é antiga. A organização da imagem, não.</h2></header><div className={styles.prose}><p>A LAIKA começou a operar em 2005 a partir da estrutura do antigo Will Vinton Studios, nos arredores de Portland. <em>Coraline</em>, dirigido por Henry Selick e lançado em 2009, foi seu primeiro longa.</p><p>Os filmes não repetem uma fórmula visual única. O elo está no modo de produção: personagens e cenários ocupam espaço diante da câmera, enquanto acabamento digital amplia possibilidades sem apagar peso, textura e luz.</p><dl className={styles.facts}><div><dt>Especialidade</dt><dd>Stop-motion para longas-metragens</dd></div><div><dt>Liderança registrada</dt><dd>{keyPeople.map((person) => person.name).join(" · ")}</dd></div><div><dt>Próxima estreia</dt><dd>{upcomingMovie ? `${upcomingMovie.titleBr} · 23/10/2026` : "Nenhuma registrada"}</dd></div></dl></div></section>

    <section className={styles.process} id="processo"><header><span className={styles.eyebrow}>Processo e técnicas</span><h2>Uma oficina física com infraestrutura digital.</h2><p>Stop-motion não significa ausência de computador. Na LAIKA, as duas frentes são coordenadas para pertencer à mesma imagem.</p></header><ol><li><strong>Estrutura</strong><p>Armaduras articuladas, espuma, silicone, resina, tecido e pintura constroem corpo e superfície.</p></li><li><strong>Expressão</strong><p>Peças faciais intercambiáveis e impressão 3D ampliam variações, ainda dependentes de acabamento manual.</p></li><li><strong>Palco</strong><p>Cenários em miniatura recebem luz, câmera e efeitos físicos; poses mudam em incrementos entre fotografias.</p></li><li><strong>Integração</strong><p>Composição, remoção de suportes e extensões digitais ampliam o que seria impraticável construir.</p></li></ol></section>

    <section className={styles.filmography} id="filmes"><header><span className={styles.eyebrow}>Filmografia</span><h2>Cinco longas lançados, uma nova estreia confirmada.</h2><p>A sequência vem das relações publicadas no catálogo central. Uma página individual só recebe link quando seu conteúdo estiver pronto.</p></header><OrganizationWorks organizationId={laika.id} roles={acceptedRoles} /></section>
    <section className={styles.upcoming}><header><span className={styles.eyebrow}>Próximo lançamento</span><h2>Wildwood chega aos cinemas em outubro de 2026.</h2><p>A data vem do material oficial de lançamento. A avaliação editorial continua pendente até a versão final.</p></header><OrganizationWorks organizationId={laika.id} roles={acceptedRoles} releaseStatus="upcoming" /></section>

    <section className={styles.start} id="comecar"><header><span className={styles.eyebrow}>Por onde começar</span><h2>Três percursos, não uma ordem obrigatória.</h2></header><div><Link href="/filmes#coraline-e-o-mundo-secreto"><span>Fantasia mais sombria</span><strong>Coraline e o Mundo Secreto</strong><p>A entrada histórica do estúdio, entre precisão material e ameaça doméstica.</p></Link><Link href="/filmes#kubo-e-as-cordas-magicas"><span>Aventura e escala</span><strong>Kubo e as Cordas Mágicas</strong><p>Cenários, efeitos e movimento ampliam o stop-motion sem apagar sua matéria.</p></Link><Link href="/filmes#link-perdido"><span>Uma chegada mais leve</span><strong>Link Perdido</strong><p>Comédia e viagem ocupam o primeiro plano, com menos ameaça gótica.</p></Link></div></section>

    <section className={styles.related} id="relacionados"><span className={styles.eyebrow}>Continue explorando</span><div><Link href="/estudios/studio-ghibli"><strong>Studio Ghibli</strong><span>Oficina, autoria e continuidade institucional em outra tradição.</span></Link><Link href="/estudios/cartoon-saloon"><strong>Cartoon Saloon</strong><span>Desenho, folclore e coprodução na animação irlandesa.</span></Link><Link href="/filmes"><strong>Biblioteca de filmes</strong><span>Obras, técnicas, países e estados editoriais.</span></Link></div></section>

    <footer className={styles.sources} id="fontes"><span className={styles.eyebrow}>Fontes e imagens</span><h2>Referências principais</h2><ul><li><a href="https://www.laika.com/">Site oficial da LAIKA</a> — identidade e atividades; indisponível durante esta revisão.</li><li><a href="https://www.laika.com/our-films/">Filmografia oficial</a> — catálogo primário; indisponível durante esta revisão.</li><li><a href="https://wildwoodmovie.com/">Site oficial de Wildwood</a> e <a href="https://www.youtube.com/watch?v=Prv_FLWLlq8">canal oficial da LAIKA</a> — lançamento em 23 de outubro de 2026.</li><li><a href="https://shop.laika.com/products/laika-the-magic-behind-a-stop-motion-dream-factory">LAIKA: The Magic Behind a Stop-Motion Dream Factory</a> — materiais e processo.</li></ul><p><strong>Imagens:</strong> o hero é uma composição abstrata original em CSS. Os cards usam pôsteres promocionais do catálogo central, armazenados localmente e marcados como pendentes de autorização.</p></footer>
  </main>;
}
