import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { OrganizationWorks, getOrganizationMovies } from "@/components/organizations/OrganizationWorks";
import { laika } from "@/content/organizations/organizations";
import { laikaStudio } from "@/content/studios/studios";
import { baseURL } from "@/resources";
import styles from "./laika.module.scss";

const path = "/estudios/laika";
const title = "LAIKA: história, processo e filmografia";
const description = "Perfil editorial da LAIKA: história, stop-motion, processo híbrido e filmografia relacionada ao estúdio, de Coraline a Wildwood.";
const acceptedRoles = ["production", "animation", "co-production"] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, type: "profile", url: `${baseURL}${path}` },
  twitter: { card: "summary", title, description },
};

export default function LaikaPage() {
  const relatedMovies = getOrganizationMovies(laika.id, acceptedRoles);
  const releasedCount = relatedMovies.filter((movie) => movie.productionStatus === "released").length;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseURL}${path}#organization`,
    name: laika.name,
    legalName: laikaStudio.legalName,
    url: `${baseURL}${path}`,
    foundingDate: String(laikaStudio.founded),
    address: { "@type": "PostalAddress", addressLocality: "Hillsboro", addressRegion: "Oregon", addressCountry: "US" },
    sameAs: ["https://www.laika.com/"],
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: "Estúdios", url: `${baseURL}/estudios` }, { name: "LAIKA", url: `${baseURL}${path}` }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <nav className={styles.breadcrumbs} aria-label="Navegação estrutural"><Link href="/">Início</Link><span aria-hidden="true">/</span><span>Estúdios</span><span aria-hidden="true">/</span><strong>LAIKA</strong></nav>

    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>Perfil de estúdio · animação</span>
        <h1>LAIKA</h1>
        <p>Stop-motion em escala de longa-metragem, construído entre matéria, fotografia e ferramentas digitais.</p>
        <dl><div><dt>Fundação</dt><dd>2005</dd></div><div><dt>Base</dt><dd>Hillsboro, Oregon</dd></div><div><dt>Longas lançados</dt><dd>{releasedCount}</dd></div></dl>
      </div>
      <div className={styles.heroVisual} aria-hidden="true"><i /><i /><i /></div>
    </header>

    <nav className={styles.index} aria-label="Nesta página"><a href="#identidade">Identidade</a><a href="#processo">Processo</a><a href="#filmes">Filmografia</a><a href="#comecar">Por onde começar</a><a href="#fontes">Fontes</a></nav>

    <section className={styles.split} id="identidade"><header><span className={styles.eyebrow}>História e identidade</span><h2>A técnica é antiga. A organização da imagem, não.</h2></header><div className={styles.prose}><p>A LAIKA surgiu em 2005 a partir da estrutura do antigo Will Vinton Studios, nos arredores de Portland. <em>Coraline</em>, dirigido por Henry Selick e lançado em 2009, foi seu primeiro longa.</p><p>Os filmes não repetem uma fórmula visual única. O elo está no modo de produção: personagens e cenários ocupam espaço diante da câmera, enquanto acabamento digital amplia possibilidades sem apagar peso, textura e luz.</p></div></section>

    <section className={styles.process} id="processo"><header><span className={styles.eyebrow}>Processo e técnicas</span><h2>Uma oficina física com infraestrutura digital.</h2><p>Stop-motion não significa ausência de computador. Na LAIKA, as duas frentes são coordenadas para pertencer à mesma imagem.</p></header><ol><li><strong>Estrutura</strong><p>Armaduras articuladas, espuma, silicone, resina, tecido e pintura constroem corpo e superfície.</p></li><li><strong>Expressão</strong><p>Peças faciais intercambiáveis e impressão 3D ampliam variações, ainda dependentes de acabamento manual.</p></li><li><strong>Palco</strong><p>Cenários em miniatura recebem luz, câmera e efeitos físicos; poses mudam em incrementos entre fotografias.</p></li><li><strong>Integração</strong><p>Composição, remoção de suportes e extensões digitais ampliam o que seria impraticável construir.</p></li></ol></section>

    <section className={styles.filmography} id="filmes"><header><span className={styles.eyebrow}>Filmografia</span><h2>Longas lançados</h2><p>Esta lista vem dos relacionamentos publicados no cadastro central das obras. Uma página individual só recebe link quando seu conteúdo está pronto.</p></header><OrganizationWorks organizationId={laika.id} roles={acceptedRoles} /></section>

    <section className={styles.upcoming}><header><span className={styles.eyebrow}>Próximo lançamento</span><h2>Projeto confirmado, avaliação pendente</h2></header><OrganizationWorks organizationId={laika.id} roles={acceptedRoles} releaseStatus="upcoming" /></section>

    <section className={styles.start} id="comecar"><header><span className={styles.eyebrow}>Por onde começar</span><h2>Três percursos, não uma ordem obrigatória.</h2></header><div><article><strong>Identidade</strong><h3>Coraline → ParaNorman</h3><p>Para comparar fantasia doméstica, terror familiar e duas direções distintas.</p></article><article><strong>Escala</strong><h3>Os Boxtrolls → Kubo</h3><p>Para observar mecanismos, multidões e aventura crescerem sem perder materialidade.</p></article><article><strong>Entrada mais leve</strong><h3>Link Perdido</h3><p>Comédia e viagem ocupam o primeiro plano, com menos ameaça gótica.</p></article></div></section>

    <section className={styles.people}><header><span className={styles.eyebrow}>Pessoas relacionadas</span><h2>Autoria muda de filme para filme.</h2></header><p>Henry Selick dirigiu <em>Coraline</em>; Sam Fell, Chris Butler, Graham Annable, Anthony Stacchi e Travis Knight aparecem na direção dos longas seguintes. Perfis individuais só serão ligados quando houver conteýo editorial suficiente.</p></section>

    <section className={styles.related}><span className={styles.eyebrow}>Continue explorando</span><div><Link href="/blog/studio-ghibli"><strong>Studio Ghibli</strong><span>Oficina, autoria e continuidade institucional em outra tradição.</span></Link><Link href="/estudios/cartoon-saloon"><strong>Cartoon Saloon</strong><span>Desenho, folclore e coprodução na animação irlandesa.</span></Link><Link href="/filmes"><strong>Biblioteca de filmes</strong><span>Obras, técnicas, países e estados editoriais.</span></Link></div></section>

    <footer className={styles.sources} id="fontes"><span className={styles.eyebrow}>Fontes e imagens</span><h2>Referências principais</h2><ul><li><a href="https://www.laika.com/" rel="noreferrer" target="_blank">Site oficial da LAIKA</a> — identidade e atividades do estúdio.</li><li><a href="https://www.laika.com/our-films/" rel="noreferrer" target="_blank">Filmografia oficial</a> — catálogo primário; a rota permanecia indisponível na revisão.</li><li><a href="https://wildwoodmovie.com/" rel="noreferrer" target="_blank">Site oficial de Wildwood</a> — estado do projeto.</li><li><a href="https://shop.laika.com/products/laika-the-magic-behind-a-stop-motion-dream-factory" rel="noreferrer" target="_blank">LAIKA: The Magic Behind a Stop-Motion Dream Factory</a> — materiais e processo.</li></ul><p><strong>Imagens:</strong> nenhuma peça promocional foi reutilizada. O detalhe do hero é uma composição abstrata original em CSS; capas oficiais continuam pendentes de licença ou autorização.</p></footer>
  </main>;
}
