import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { OrganizationWorks, getOrganizationMovies } from "@/components/organizations/OrganizationWorks";
import { creators } from "@/content/creators/creators";
import { studioGhibli } from "@/content/organizations/organizations";
import { baseURL } from "@/resources";
import styles from "./studio-ghibli.module.scss";

const path = "/estudios/studio-ghibli";
const title = "Studio Ghibli: história, identidade e filmografia";
const description = "Conheça o Studio Ghibli, sua formação, diferentes linguagens de animação e uma filmografia gerada pelo catálogo central.";
const acceptedRoles = ["production", "animation", "co-production"] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, type: "profile", url: `${baseURL}${path}` },
  twitter: { card: "summary", title, description },
};

export default function StudioGhibliPage() {
  const movies = getOrganizationMovies(studioGhibli.id, acceptedRoles);
  const people = studioGhibli.founderIds
    .map((id) => creators.find((person) => person.id === id))
    .filter((person) => person !== undefined);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseURL}${path}#organization`,
    name: studioGhibli.name,
    legalName: studioGhibli.legalName,
    url: `${baseURL}${path}`,
    foundingDate: String(studioGhibli.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: studioGhibli.location?.city,
      addressRegion: studioGhibli.location?.region,
      addressCountry: "JP",
    },
    founder: people.map((person) => ({ "@type": "Person", name: person.name })),
    parentOrganization: { "@type": "Organization", name: "Nippon Television Network Corporation" },
    sameAs: studioGhibli.website ? [studioGhibli.website] : undefined,
  };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[
      { name: "Início", url: baseURL },
      { name: "Estúdios", url: `${baseURL}/estudios` },
      { name: studioGhibli.name, url: `${baseURL}${path}` },
    ]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <nav className={styles.breadcrumbs} aria-label="Navegação estrutural">
      <Link href="/">Início</Link><span aria-hidden="true">/</span><span>Estúdios</span><span aria-hidden="true">/</span><strong>Studio Ghibli</strong>
    </nav>

    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>Perfil de estúdio · animação</span>
        <h1>Studio<br />Ghibli</h1>
        <p>Uma oficina de longas em que fantasia, cotidiano e experimentação convivem — sem caber numa única “estética Ghibli”.</p>
        <dl>
          <div><dt>Fundação</dt><dd>{studioGhibli.founded}</dd></div>
          <div><dt>Base</dt><dd>{studioGhibli.location?.city}, {studioGhibli.location?.region}</dd></div>
          <div><dt>Longas relacionados</dt><dd>{movies.length}</dd></div>
        </dl>
        <a className={styles.primaryAction} href="#filmografia">Explorar os filmes</a>
      </div>
      <div className={styles.heroVisual} role="img" aria-label="Composição abstrata original com camadas de papel, céu e linhas de movimento">
        <i /><i /><i /><i />
      </div>
    </header>

    <nav className={styles.index} aria-label="Nesta página">
      <a href="#sobre">Sobre</a><a href="#filmografia">Filmografia</a><a href="#comecar">Por onde começar</a><a href="#relacionados">Continue</a><a href="#fontes">Fontes</a>
    </nav>

    <section className={styles.about} id="sobre">
      <header><span className={styles.eyebrow}>Sobre o estúdio</span><h2>O nome é um só. As maneiras de animar, não.</h2></header>
      <div className={styles.aboutCopy}>
        <p>O Studio Ghibli foi aberto em 1985 durante a produção de <em>O Castelo no Céu</em>, depois do resultado de <em>Nausicaä do Vale do Vento</em>. O filme de 1984 é um antecedente decisivo, mas não foi produzido por uma empresa que ainda não existia — por isso não entra na filmografia automática abaixo.</p>
        <p>Hayao Miyazaki e Isao Takahata desenvolveram linhas autorais diferentes, enquanto Toshio Suzuki articulou produção e continuidade. A história do estúdio também é coletiva: direção, desenho, pintura, fotografia, som e ferramentas digitais mudam de função conforme cada obra.</p>
        <dl className={styles.facts}>
          <div><dt>Pessoas centrais</dt><dd>{people.map((person) => person.name).join(" · ")}</dd></div>
          <div><dt>Especialidade</dt><dd>Longas de animação, com projetos para TV, curtas e outras atividades</dd></div>
          <div><dt>Situação</dt><dd>Ativo; subsidiária da Nippon TV desde outubro de 2023</dd></div>
        </dl>
      </div>
    </section>

    <section className={styles.filmography} id="filmografia">
      <header>
        <span className={styles.eyebrow}>Filmografia</span>
        <h2>O começo de um catálogo que aprendeu a mudar.</h2>
        <p>A amostra vem das relações publicadas entre o estúdio e os filmes. Coprodução continua identificada como coprodução; distribuição não é usada para atribuir autoria.</p>
      </header>
      <OrganizationWorks organizationId={studioGhibli.id} roles={acceptedRoles} limit={8} />
      <Link className={styles.secondaryAction} href="/blog/studio-ghibli#rede-de-pessoas-filmes-e-organizacoes">Ver filmografia e contexto completos</Link>
    </section>

    <section className={styles.start} id="comecar">
      <header><span className={styles.eyebrow}>Por onde começar</span><h2>Três portas, não um ranking.</h2></header>
      <div>
        <Link href="/filmes#meu-amigo-totoro"><span>Para uma chegada acolhedora</span><strong>Meu Amigo Totoro</strong><p>Fantasia cotidiana, infância e espera com espaço para respirar.</p></Link>
        <Link href="/filmes#princesa-mononoke"><span>Para conflito e escala</span><strong>Princesa Mononoke</strong><p>Uma aventura mais intensa, sem dividir natureza e indústria em lados simples.</p></Link>
        <Link href="/filmes#o-conto-da-princesa-kaguya"><span>Para descobrir outra linguagem</span><strong>O Conto da Princesa Kaguya</strong><p>O desenho expressivo de Takahata rompe a ideia de uma aparência única do estúdio.</p></Link>
      </div>
    </section>

    <section className={styles.related} id="relacionados">
      <header><span className={styles.eyebrow}>Continue explorando</span><h2>Contexto, técnica e outras oficinas.</h2></header>
      <div>
        <Link href="/blog/studio-ghibli"><strong>Guia aprofundado do Studio Ghibli</strong><span>História por fases, pessoas, processo e filmografia completa.</span></Link>
        <Link href="/estudios/laika"><strong>LAIKA</strong><span>Stop-motion, matéria física e integração digital.</span></Link>
        <Link href="/estudios/cartoon-saloon"><strong>Cartoon Saloon</strong><span>Desenho, folclore e coprodução na animação irlandesa.</span></Link>
      </div>
    </section>

    <footer className={styles.sources} id="fontes">
      <span className={styles.eyebrow}>Fontes e créditos</span><h2>Base documental</h2>
      <ul>
        <li><a href="https://www.ghibli.jp/profile/">Perfil oficial</a> — sede, situação empresarial e atividades.</li>
        <li><a href="https://www.ghibli.jp/history/">História oficial</a> e <a href="https://www.ghibli.jp/chronology/">cronologia</a> — formação e mudanças de produção.</li>
        <li><a href="https://www.ghibli.jp/works/">Catálogo oficial</a> — obras associadas pelo próprio estúdio.</li>
        <li><a href="https://www.ntvhd.co.jp/english/pdf_cms/news/20230921.pdf">Nippon TV</a> — aquisição e relação empresarial.</li>
      </ul>
      <p><strong>Imagem:</strong> o hero usa apenas formas abstratas originais em CSS. Nenhum personagem, frame, cenário, logotipo ou pôster foi reproduzido.</p>
    </footer>
  </main>;
}
