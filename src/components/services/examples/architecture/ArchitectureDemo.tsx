import Image from "next/image";
import type { ServiceExampleRendererProps } from "../ServiceExampleRenderers";
import { ArchitectureProjects, ArchitectureWhatsAppDemo } from "./ArchitectureDemoInteractions";
import { architectureDemoMedia, architectureDemoProjects } from "./architectureDemoData";
import styles from "./ArchitectureDemo.module.scss";

const services = [
  ["01", "Projetos residenciais", "Casas e apartamentos, da definição do programa ao detalhamento."],
  ["02", "Interiores", "Organização espacial, materiais, iluminação e mobiliário fixo."],
  ["03", "Projetos comerciais", "Espaços de atendimento e trabalho adequados à operação."],
  ["04", "Reformas", "Levantamento, reorganização e acompanhamento das alterações previstas."],
  ["05", "Consultoria", "Análise pontual de layout, escolhas e possibilidades para um espaço."],
] as const;

const process = [
  ["01", "Conversa inicial", "Contexto, programa, local e expectativas."],
  ["02", "Estudo", "Levantamento de possibilidades e direção do projeto."],
  ["03", "Desenvolvimento", "Definições técnicas e documentação combinada."],
  ["04", "Acompanhamento", "Suporte durante as etapas previstas no escopo."],
] as const;

export function ArchitectureDemo({ example }: ServiceExampleRendererProps) {
  const structuredData = { "@context": "https://schema.org", "@type": "WebPage", name: example.name, description: example.description, about: "Projeto demonstrativo de portfólio para arquitetura", isPartOf: { "@type": "WebSite", name: "Henrique Reis" } };

  return (
    <div className={styles.site} id="arch-start">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <a className={styles.brand} href="#arch-start"><strong>PB—17</strong><span>Plano Bruto 17<br />arquitetura / nome fictício</span></a>
        <nav className={styles.desktopNav} aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#estudio">Estúdio</a><a href="#servicos-arquitetura">Serviços</a><a href="#contato-arquitetura">Contato</a></nav>
        <details className={styles.mobileMenu}><summary>Menu</summary><nav aria-label="Navegação móvel"><a href="#projetos">Projetos</a><a href="#estudio">Estúdio</a><a href="#servicos-arquitetura">Serviços</a><a href="#contato-arquitetura">Contato</a></nav></details>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="architecture-demo-title">
          <div className={styles.heroImage}><Image src={architectureDemoMedia[0].src} alt={architectureDemoMedia[0].alt} fill priority sizes="100vw" /></div>
          <p className={styles.heroSide}>Arquitetura residencial · interiores · comercial</p>
          <div className={styles.heroTitle}><span>Estúdio fictício / 2026</span><h1 id="architecture-demo-title">Plano<br />Bruto<span>17</span></h1></div>
          <div className={styles.heroCaption}><strong>Plano Bruto 17 · estúdio fictício</strong><p>Projetos residenciais, interiores e espaços comerciais em São Paulo.</p><a href="#projetos">Ver projetos ↓</a></div>
        </section>

        <section className={styles.projectsSection} id="projetos" aria-labelledby="projects-title">
          <div className={styles.projectsHeading}><p>Projetos selecionados</p><h2 id="projects-title">Residencial,<br />interiores e comercial.</h2><span>01—03</span></div>
          <ArchitectureProjects projects={architectureDemoProjects} />
        </section>

        <section className={styles.studio} id="estudio" aria-labelledby="studio-title">
          <p className={styles.verticalLabel}>Sobre o estúdio</p>
          <div className={styles.studioStatement}><span>PB—17 / identidade fictícia</span><h2 id="studio-title">Do estudo inicial ao detalhamento do espaço.</h2></div>
          <div className={styles.studioDetails}><p>Escritório demonstrativo voltado a residências, interiores, reformas e pequenos espaços comerciais.</p><dl><div><dt>Atuação</dt><dd>Projetos, interiores, reformas e consultoria</dd></div><div><dt>Base</dt><dd>São Paulo — localização demonstrativa</dd></div></dl></div>
        </section>

        <section className={styles.services} id="servicos-arquitetura" aria-labelledby="services-title">
          <div className={styles.sectionIndex}><span>02</span><h2 id="services-title">Serviços</h2></div>
          <div className={styles.serviceList}>{services.map(([number, title, description]) => <details key={title}><summary><span>{number}</span><strong>{title}</strong><i aria-hidden="true">+</i></summary><p>{description}</p></details>)}</div>
        </section>

        <section className={styles.process} aria-labelledby="process-architecture-title">
          <div className={styles.sectionIndex}><span>03</span><h2 id="process-architecture-title">Processo</h2></div>
          <ol>{process.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </section>

        <section className={styles.contact} id="contato-arquitetura" aria-labelledby="architecture-contact-title">
          <span>04 / Contato</span><h2 id="architecture-contact-title">Conte sobre<br />o projeto.</h2>
          <div className={styles.contactGrid}><div><small>E-mail demonstrativo</small><a href="mailto:contato@planobruto17.example">contato@planobruto17.example</a></div><div><small>Para começar</small><p>Tipo de espaço, cidade, metragem aproximada e etapa atual.</p></div><div><small>Base</small><p>São Paulo / atendimento sob consulta</p></div><ArchitectureWhatsAppDemo /></div>
        </section>
      </main>
      <footer className={styles.footer}><strong>PB—17</strong><span>Identidade, projetos e localizações fictícios.</span><a href="#arch-start">Topo ↑</a></footer>
    </div>
  );
}
