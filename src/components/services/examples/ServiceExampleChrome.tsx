import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";
import styles from "./ServiceExampleChrome.module.scss";

type ServiceExampleChromeProps = {
  example: ServiceExample;
  contactHref: string;
  previous?: ServiceExample;
  next?: ServiceExample;
  children: ReactNode;
};

function ProjectLink({ example, direction }: { example?: ServiceExample; direction: "previous" | "next" }) {
  if (!example?.coverImage) return null;
  const label = direction === "previous" ? "Projeto anterior" : "Próximo projeto";
  return (
    <Link className={styles.projectLink} href={getServiceExamplePath(example.slug)}>
      <span className={styles.projectThumb}><Image src={example.coverImage.src} alt="" fill sizes="(max-width: 700px) 38vw, 13rem" /></span>
      <span><small>{label}</small><strong>{example.title}</strong><em>{example.segment}</em></span>
      <b aria-hidden="true">{direction === "previous" ? "←" : "→"}</b>
    </Link>
  );
}

export function ServiceExampleChrome({ example, contactHref, previous, next, children }: ServiceExampleChromeProps) {
  return (
    <div className={`${styles.root} demoCanvasRoot`} data-example-theme={example.visualStyle.themeKey}>
      {children}
      <section className={styles.showcase} aria-labelledby="project-presentation-title">
        <header className={styles.presentationHeading}>
          <p>Projeto demonstrativo · {String(example.order).padStart(2, "0")}</p>
          <div>
            <h2 id="project-presentation-title">Uma interface.<br />Duas escalas.</h2>
            <p>{example.shortDescription} A composição abaixo mostra como a mesma direção visual se adapta ao desktop e ao celular.</p>
          </div>
        </header>

        {example.coverImage ? (
          <figure className={styles.responsiveProof}>
            <div className={styles.desktopFrame}>
              <span><i /><i /><i /><small>{example.slug}.exemplo</small></span>
              <div><Image src={example.coverImage.src} alt={example.coverImage.alt} fill sizes="(max-width: 760px) 92vw, 72vw" /></div>
            </div>
            {example.coverImage.mobileSrc ? (
              <div className={styles.mobileFrame} role="img" aria-label={`Versão móvel de ${example.title}`}>
                <span /><div><Image src={example.coverImage.mobileSrc} alt="" fill sizes="(max-width: 760px) 31vw, 15rem" /></div>
              </div>
            ) : null}
            <figcaption>Desktop e mobile · prévias do projeto demonstrativo</figcaption>
          </figure>
        ) : null}

        <section className={styles.decisions} aria-labelledby="decisions-title">
          <div><p>Direção do projeto</p><h2 id="decisions-title">Três decisões que organizam a experiência.</h2></div>
          <ol>{example.decisions.map((decision, index) => <li key={decision.title}><span>0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.description}</p></div></li>)}</ol>
        </section>

        <section className={styles.offer} aria-labelledby="example-offer-title">
          <div><p>Projeto demonstrativo · seu site será criado a partir do seu conteúdo</p><h2 id="example-offer-title">Quer um site com esse nível de apresentação?</h2></div>
          <div className={styles.price}><span>R$</span><strong>147</strong><small>/mês</small><p>Domínio, hospedagem e manutenção incluídos.</p></div>
          <a className={styles.offerAction} href={contactHref} data-analytics-event="services_help_click" data-analytics-location={`service_example_${example.slug}`}>Quero meu site <span aria-hidden="true">→</span></a>
        </section>

        <nav className={styles.projectNavigation} aria-label="Navegação entre projetos demonstrativos">
          <ProjectLink example={previous} direction="previous" />
          <Link className={styles.allProjects} href="/servicos/exemplos">Ver todos os projetos</Link>
          <ProjectLink example={next} direction="next" />
        </nav>

        <footer className={styles.attribution}>
          <span>Projeto demonstrativo · identidade fictícia</span>
          <strong>Direção e desenvolvimento por Henrique Reis</strong>
          <Link href="/servicos">Conhecer o serviço</Link>
        </footer>
      </section>
    </div>
  );
}
