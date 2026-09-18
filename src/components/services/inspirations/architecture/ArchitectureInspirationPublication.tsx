"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import type { ServiceInspiration } from "@/data/service-inspirations";
import {
  architectureFeaturedProject,
  architectureInspirationProjects,
  type ArchitectureCategory,
  type ArchitectureInspirationProject,
} from "./architectureInspirationData";
import styles from "./ArchitectureInspirationPublication.module.scss";

type RelatedInspiration = Pick<
  ServiceInspiration,
  "slug" | "title" | "category" | "image" | "alt" | "width" | "height"
>;

type Props = {
  inspiration: ServiceInspiration;
  contactHref: string;
  relatedInspirations: RelatedInspiration[];
};

type StageCopyProps = {
  number: string;
  title: string;
  lead: string;
  description: string;
  id: string;
};

const categories = ["Todos", "Residencial", "Interiores", "Cultural"] as const;

const componentHighlights = [
  ["01", "Abertura", "Define posicionamento e mostra um projeto antes de explicar o escritório."],
  ["02", "Arquivo", "Organiza projetos por escala ou tipologia sem esconder as imagens."],
  ["03", "Projeto", "Reúne conceito, área, ano e uma sequência visual em uma página."],
  ["04", "Serviços", "Explica o que pode ser contratado com linguagem direta."],
  ["05", "Processo", "Mostra como o trabalho avança do contexto ao detalhamento."],
  ["06", "Briefing", "Leva a conversa inicial com informações úteis sobre o espaço."],
] as const;

function StageCopy({ number, title, lead, description, id }: StageCopyProps) {
  return (
    <div className={styles.stageCopy}>
      <div className={styles.stageNumber} aria-hidden="true"><span>{number}</span><i /></div>
      <h2 id={id}>{title}</h2>
      <p className={styles.stageLead}>{lead}</p>
      <p className={styles.stageDescription}>{description}</p>
    </div>
  );
}

function DemoBrandBar() {
  return (
    <header className={styles.demoBrandBar}>
      <span className={styles.demoBrand}><i aria-hidden="true" /> Norte / Sul</span>
      <nav aria-label="Navegação da demonstração de arquitetura">
        <a href="#arquitetura-inicio">Início</a>
        <a href="#arquitetura-projetos">Projetos</a>
        <a href="#arquitetura-projeto">Estúdio</a>
        <a href="#arquitetura-contato">Contato</a>
      </nav>
      <a className={styles.demoNavAction} href="#arquitetura-contato">Iniciar projeto</a>
    </header>
  );
}

function ProjectCard({ project }: { project: ArchitectureInspirationProject }) {
  return (
    <article className={styles.projectCard}>
      <Image
        src={project.image}
        alt={project.alt}
        width={project.width}
        height={project.height}
        sizes="(max-width: 520px) 82vw, 20rem"
      />
      <span>{project.category} · {project.year}</span>
      <h4>{project.title}</h4>
      <p>{project.location}</p>
    </article>
  );
}

function HomeMockup() {
  return (
    <div className={`${styles.browserMockup} ${styles.homeMockup}`} id="arquitetura-inicio">
      <DemoBrandBar />
      <div className={styles.homeHero}>
        <Image
          src={architectureFeaturedProject.image}
          alt={architectureFeaturedProject.alt}
          width={architectureFeaturedProject.width}
          height={architectureFeaturedProject.height}
          priority
          sizes="(max-width: 760px) 94vw, 62rem"
        />
        <div className={styles.homeHeroCopy}>
          <span>Arquitetura e interiores</span>
          <h3>Espaços pensados a partir de como serão vividos.</h3>
          <p>Projetos residenciais, interiores e espaços culturais apresentados por contexto, matéria e uso.</p>
          <a href="#arquitetura-projetos">Conhecer projetos</a>
        </div>
      </div>
      <div className={styles.featuredStrip}>
        <span>Projeto em destaque</span>
        <strong>{architectureFeaturedProject.title}</strong>
        <small>{architectureFeaturedProject.location} · {architectureFeaturedProject.area}</small>
      </div>
    </div>
  );
}

function ProjectsMockup() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const visibleProjects = useMemo(
    () => architectureInspirationProjects.filter(
      (project) => category === "Todos" || project.category === category,
    ),
    [category],
  );

  return (
    <div className={`${styles.browserMockup} ${styles.projectsMockup}`} id="arquitetura-projetos">
      <DemoBrandBar />
      <div className={styles.projectsHeader}>
        <div><span>Arquivo</span><h3>Projetos selecionados.</h3></div>
        <p>{visibleProjects.length} estudos ilustrativos</p>
      </div>
      <div className={styles.filters} role="group" aria-label="Filtrar projetos por categoria">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.projectsGrid} aria-live="polite">
        {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
      <p className={styles.filterStatus}>
        {category} · {visibleProjects.length} {visibleProjects.length === 1 ? "projeto" : "projetos"}
      </p>
    </div>
  );
}

function ProjectMockup() {
  const [selectedImage, setSelectedImage] = useState(architectureInspirationProjects[0]);

  return (
    <div className={`${styles.browserMockup} ${styles.projectMockup}`} id="arquitetura-projeto">
      <DemoBrandBar />
      <div className={styles.breadcrumb}>Início / Projetos / Casa Horizonte</div>
      <div className={styles.projectLayout}>
        <div className={styles.projectGallery}>
          <div className={styles.projectMainImage}>
            <Image
              src={selectedImage.image}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              sizes="(max-width: 760px) 90vw, 38rem"
            />
          </div>
          <div className={styles.thumbnails} aria-label="Imagens do estudo arquitetônico ilustrativo">
            {architectureInspirationProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                aria-label={`Mostrar ${project.title}`}
                aria-pressed={selectedImage.id === project.id}
                onClick={() => setSelectedImage(project)}
              >
                <Image src={project.image} alt="" width={project.width} height={project.height} sizes="8rem" />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.projectCopy}>
          <span>Residencial · estudo ilustrativo</span>
          <h3>Casa Horizonte</h3>
          <p>Serra Clara — local fictício</p>
          <dl>
            <div><dt>Ano</dt><dd>2026</dd></div>
            <div><dt>Área</dt><dd>248 m²</dd></div>
            <div><dt>Escopo</dt><dd>Arquitetura</dd></div>
          </dl>
          <p className={styles.projectDescription}>
            A página relaciona imagens, conceito e dados essenciais para mostrar como o projeto responde ao terreno, à rotina e à materialidade.
          </p>
          <a href="#arquitetura-contato">Conversar sobre um espaço</a>
        </div>
      </div>
    </div>
  );
}

function ContactMockup() {
  const [notice, setNotice] = useState(false);

  function showDemoNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <div className={`${styles.browserMockup} ${styles.contactMockup}`} id="arquitetura-contato">
      <div className={styles.contactStatement}>
        <span>Primeira conversa</span>
        <h3>Um bom briefing começa pelo espaço e por quem vai usá-lo.</h3>
        <ul>
          <li>Leitura inicial do contexto</li>
          <li>Escopo adequado à etapa</li>
          <li>Próximos passos claros</li>
        </ul>
      </div>
      <form onSubmit={showDemoNotice}>
        <span>Conte sobre o projeto</span>
        <h3>Quais decisões precisam ganhar forma?</h3>
        <label>Tipo de espaço
          <select defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Residencial</option><option>Interiores</option><option>Comercial ou cultural</option></select>
        </label>
        <label>Cidade<input placeholder="Cidade do projeto" /></label>
        <label>Contexto<textarea defaultValue="Gostaria de conversar sobre o espaço, a etapa atual e as possibilidades do projeto." /></label>
        <button type="submit">Enviar briefing inicial</button>
        <p className={styles.formNotice} aria-live="polite">
          {notice ? "Esta é uma demonstração: nenhum briefing foi enviado." : "Demonstração segura: estes campos não enviam nem armazenam dados."}
        </p>
      </form>
    </div>
  );
}

export function ArchitectureInspirationPublication({ inspiration, contactHref, relatedInspirations }: Props) {
  return (
    <main className={styles.publication}>
      <Link className={styles.backLink} href="/servicos/inspiracoes"><span aria-hidden="true">←</span> Voltar para inspirações</Link>

      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{inspiration.category}</p>
          <h1>Veja como seus projetos podem revelar uma forma de pensar</h1>
          <p className={styles.introDescription}>Uma direção para apresentar repertório, aprofundar decisões de projeto e conduzir uma primeira conversa com contexto.</p>
        </div>
        <aside className={styles.introNote}><strong>Projeto demonstrativo</strong><p>Escritório, projetos, locais e dados são ilustrativos.</p></aside>
      </header>

      <section className={styles.stage} aria-labelledby="arquitetura-direcao-title">
        <StageCopy number="01" id="arquitetura-direcao-title" title="Direção" lead="O visitante entende o olhar antes de conhecer o currículo." description="A abertura une uma ideia clara, um projeto dominante e uma ação direta para comunicar método e campo de atuação." />
        <HomeMockup />
      </section>

      <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="arquitetura-exploracao-title">
        <StageCopy number="02" id="arquitetura-exploracao-title" title="Exploração" lead="Os projetos podem ser comparados sem perder escala." description="Filtros funcionais organizam o repertório por tipologia, mantendo as imagens e as informações essenciais em primeiro plano." />
        <ProjectsMockup />
      </section>

      <section className={styles.stage} aria-labelledby="arquitetura-avaliacao-title">
        <StageCopy number="03" id="arquitetura-avaliacao-title" title="Avaliação" lead="Cada projeto explica decisões, não apenas mostra resultados." description="A página individual combina sequência visual, conceito e ficha breve para revelar raciocínio e adequação ao contexto." />
        <ProjectMockup />
      </section>

      <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="arquitetura-contato-title">
        <StageCopy number="04" id="arquitetura-contato-title" title="Briefing" lead="A conversa começa com informações que ajudam a orientar o escopo." description="O formulário pede apenas tipologia, local e contexto, sem prometer orçamento ou viabilidade antes da análise." />
        <ContactMockup />
      </section>

      <section className={styles.componentsSection} aria-labelledby="architecture-components-title">
        <div className={styles.sectionHeading}><h2 id="architecture-components-title">Componentes que constroem essa jornada</h2><p>Cada parte ajuda a reconhecer abordagem, avaliar repertório ou iniciar uma conversa.</p></div>
        <ul className={styles.componentGrid}>
          {componentHighlights.map(([number, title, description]) => <li key={title}><span aria-hidden="true">{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ul>
      </section>

      <section className={styles.relatedSection} aria-labelledby="architecture-related-title">
        <div className={styles.sectionHeading}><h2 id="architecture-related-title">A mesma clareza pode orientar outras direções visuais</h2><Link href="/servicos/inspiracoes">Ver mais direções →</Link></div>
        <div className={styles.relatedGrid}>
          {relatedInspirations.map((related) => <Link key={related.slug} href={`/servicos/inspiracoes/${related.slug}`}><Image src={related.image} alt={related.alt} width={related.width} height={related.height} loading="eager" sizes="(max-width: 560px) 38vw, 10rem" /><span><strong>{related.title}</strong><small>{related.category}</small></span></Link>)}
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="architecture-commercial-cta-title">
        <div><p className={styles.eyebrow}>Vamos conversar?</p><h2 id="architecture-commercial-cta-title">Quero um site nessa direção</h2><p>Vamos adaptar a estrutura aos seus projetos, processo, especialidades e forma de atendimento.</p></div>
        <div className={styles.finalCtaAction}><a href={contactHref} data-analytics-event="services_help_click" data-analytics-location="service_inspiration_arquitetura-editorial">Falar sobre meu projeto <span aria-hidden="true">→</span></a><small>Contato pelo WhatsApp</small></div>
      </section>

      <details className={styles.mediaDisclosure}>
        <summary>Sobre os projetos e as imagens</summary>
        <p>Os três projetos, locais, áreas e datas são fictícios. As fotografias são imagens de banco licenciadas pelo Unsplash e não representam trabalhos de Henrique Reis.</p>
        <ul>{architectureInspirationProjects.map((project) => <li key={project.id}><strong>{project.title}:</strong>{" "}<a href={project.source} target="_blank" rel="noreferrer">fotografia de {project.credit}</a></li>)}</ul>
      </details>
    </main>
  );
}
