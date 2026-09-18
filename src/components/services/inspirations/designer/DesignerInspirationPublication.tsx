"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

import type { ServiceInspiration } from "@/data/service-inspirations";
import { designerCaseSteps, designerProjects, type DesignerProject } from "./designerInspirationData";
import styles from "./DesignerInspirationPublication.module.scss";

type RelatedInspiration = Pick<ServiceInspiration, "slug" | "title" | "category" | "image" | "alt" | "width" | "height">;
type Props = { inspiration: ServiceInspiration; contactHref: string; relatedInspirations: RelatedInspiration[] };
type StageCopyProps = { number: string; title: string; lead: string; description: string; id: string };

const components = [
  ["01", "Apresentação", "Especialidade, foco e disponibilidade sem uma biografia longa."],
  ["02", "Projetos", "Seleção curta com área, recorte e responsabilidade."],
  ["03", "Cases", "Contexto, processo e entrega em uma narrativa legível."],
  ["04", "Perfil", "Experiência, ferramentas e forma de atuação."],
  ["05", "Currículo", "Um arquivo acessível sem competir com os projetos."],
  ["06", "Contato", "Canal claro para proposta, vaga ou parceria."],
] as const;

function StageCopy({ number, title, lead, description, id }: StageCopyProps) {
  return <div className={styles.stageCopy}><div className={styles.stageNumber} aria-hidden="true"><span>{number}</span><i /></div><h2 id={id}>{title}</h2><p className={styles.stageLead}>{lead}</p><p className={styles.stageDescription}>{description}</p></div>;
}

function DemoBar() {
  return <header className={styles.demoBar}><strong><i aria-hidden="true" /> Lia Prado</strong><nav aria-label="Navegação do portfólio demonstrativo"><a href="#designer-inicio">Início</a><a href="#designer-projetos">Projetos</a><a href="#designer-case">Case</a><a href="#designer-contato">Contato</a></nav><a href="#designer-contato">Disponível</a></header>;
}

function IntroMockup({ inspiration }: { inspiration: ServiceInspiration }) {
  return <div className={`${styles.mockup} ${styles.introMockup}`} id="designer-inicio"><DemoBar /><div className={styles.introCanvas}><div className={styles.introCopy}><span>Designer de marcas e produtos digitais</span><h3>Transformo problemas complexos em sistemas visuais claros.</h3><p>Projetos fictícios apresentados para demonstrar estrutura, ritmo e hierarquia.</p><a href="#designer-projetos">Ver projetos <b aria-hidden="true">↓</b></a></div><div className={styles.introVisual}><Image src={inspiration.image} alt="Painel visual demonstrativo com formas, objetos e composições minimalistas" width={inspiration.width} height={inspiration.height} priority sizes="(max-width:760px) 92vw,35rem" /><span>Portfólio demonstrativo · 2026</span></div></div></div>;
}

function ProjectsMockup({ selected, onSelect }: { selected: DesignerProject; onSelect: (project: DesignerProject) => void }) {
  const filters = ["Todos", "Identidade", "Produto digital", "Editorial"] as const;
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const visible = filter === "Todos" ? designerProjects : designerProjects.filter((project) => project.area === filter);
  return <div className={`${styles.mockup} ${styles.projectsMockup}`} id="designer-projetos"><DemoBar /><div className={styles.projectsHeader}><div><span>Trabalhos selecionados</span><h3>Poucos projetos. Contexto suficiente para entender cada escolha.</h3></div><div className={styles.filters} aria-label="Filtrar projetos">{filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className={styles.projectGrid}>{visible.map((project) => <button className={`${styles.projectCard} ${styles[project.id]}`} key={project.id} type="button" aria-pressed={selected.id === project.id} onClick={() => onSelect(project)}><span className={styles.projectArt} aria-hidden="true"><i /><i /><i /></span><span className={styles.projectMeta}><small>{project.area} · {project.year}</small><strong>{project.title}</strong><em>Ver projeto ↗</em></span></button>)}</div></div>;
}

function CaseMockup({ project }: { project: DesignerProject }) {
  const [activeStep, setActiveStep] = useState<(typeof designerCaseSteps)[number]>(designerCaseSteps[0]);
  return <div className={`${styles.mockup} ${styles.caseMockup}`} id="designer-case"><DemoBar /><div className={styles.caseHeading}><span>{project.area} · case demonstrativo</span><h3>{project.title}</h3><p>{project.summary}</p><dl><div><dt>Papel</dt><dd>{project.role}</dd></div><div><dt>Entregas</dt><dd>{project.deliverables}</dd></div></dl></div><div className={`${styles.caseArt} ${styles[project.id]}`} aria-hidden="true"><i /><i /><i /><b>{project.title.slice(0, 1)}</b></div><div className={styles.caseStory}><div role="tablist" aria-label="Etapas do case">{designerCaseSteps.map((step) => <button key={step.id} type="button" role="tab" aria-selected={activeStep.id === step.id} onClick={() => setActiveStep(step)}>{step.label}</button>)}</div><article role="tabpanel"><span>0{designerCaseSteps.indexOf(activeStep) + 1}</span><div><h4>{activeStep.title}</h4><p>{activeStep.description}</p></div></article></div></div>;
}

function ContactMockup() {
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setNotice("Demonstração concluída: nenhuma mensagem foi enviada ou armazenada."); }
  return <div className={`${styles.mockup} ${styles.contactMockup}`} id="designer-contato"><div className={styles.contactIntro}><span>Contato demonstrativo</span><h3>Vamos falar sobre o próximo projeto?</h3><p>Um formulário curto pode separar proposta, oportunidade profissional e parceria sem pedir informações demais.</p><ul><li>Resposta por e-mail</li><li>Briefing inicial enxuto</li><li>Sem cadastro obrigatório</li></ul></div><form onSubmit={submit}><label>Seu nome<input name="name" autoComplete="name" required /></label><label>Seu e-mail<input name="email" type="email" autoComplete="email" required /></label><label>Sobre o que você quer conversar?<select name="subject" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Projeto de design</option><option>Oportunidade profissional</option><option>Parceria</option></select></label><label>Contexto<textarea name="message" rows={3} required /></label><button type="submit">Revisar mensagem <span aria-hidden="true">→</span></button><p aria-live="polite">{notice || "Este formulário é apenas uma demonstração e não envia dados."}</p></form></div>;
}

export function DesignerInspirationPublication({ inspiration, contactHref, relatedInspirations }: Props) {
  const [selectedProject, setSelectedProject] = useState<DesignerProject>(designerProjects[0]);
  return <main className={styles.publication}>
    <Link className={styles.backLink} href="/servicos/inspiracoes"><span aria-hidden="true">←</span> Voltar para inspirações</Link>
    <header className={styles.introduction}><div><p className={styles.eyebrow}>{inspiration.category}</p><h1>Veja como um portfólio pode mostrar mais do que telas bonitas</h1><p>Uma direção para posicionar uma designer, organizar projetos, explicar raciocínio e abrir uma conversa profissional.</p></div><aside><strong>Projeto demonstrativo</strong><p>Identidade, projetos, responsabilidades e entregas são fictícios.</p></aside></header>
    <section className={styles.stage} aria-labelledby="designer-posicionamento"><StageCopy number="01" id="designer-posicionamento" title="Direção" lead="A primeira tela diz o que a designer faz e para quem." description="Uma apresentação curta dá contexto ao repertório sem competir com os projetos." /><IntroMockup inspiration={inspiration} /></section>
    <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="designer-selecao"><StageCopy number="02" id="designer-selecao" title="Seleção" lead="Área, recorte e autoria ajudam a comparar trabalhos." description="Filtros organizam o repertório, enquanto uma seleção curta evita transformar o portfólio em arquivo sem prioridade." /><ProjectsMockup selected={selectedProject} onSelect={setSelectedProject} /></section>
    <section className={styles.stage} aria-labelledby="designer-case-title"><StageCopy number="03" id="designer-case-title" title="Case" lead="O visitante entende problema, processo e entrega." description="A narrativa separa responsabilidade real, decisões e resultado visual, sem inventar métricas ou impacto." /><CaseMockup project={selectedProject} /></section>
    <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="designer-contato-title"><StageCopy number="04" id="designer-contato-title" title="Contato" lead="O caminho para conversar é curto e contextual." description="A demonstração mostra a estrutura do contato, mas não envia nem armazena nenhuma informação." /><ContactMockup /></section>
    <section className={styles.componentsSection} aria-labelledby="designer-components"><div className={styles.sectionHeading}><h2 id="designer-components">Componentes que constroem essa jornada</h2><p>O portfólio funciona quando cada parte responde a uma dúvida de clientes ou recrutadores.</p></div><ul>{components.map(([number, title, description]) => <li key={title}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ul></section>
    <section className={styles.relatedSection} aria-labelledby="designer-related"><div className={styles.sectionHeading}><h2 id="designer-related">Outras direções para trabalhos visuais</h2><Link href="/servicos/inspiracoes">Ver mais direções →</Link></div><div>{relatedInspirations.map((related) => <Link key={related.slug} href={`/servicos/inspiracoes/${related.slug}`}><Image src={related.image} alt={related.alt} width={related.width} height={related.height} loading="eager" sizes="(max-width:560px) 38vw,10rem" /><span><strong>{related.title}</strong><small>{related.category}</small></span></Link>)}</div></section>
    <section className={styles.finalCta} aria-labelledby="designer-commercial"><div><p className={styles.eyebrow}>Vamos conversar?</p><h2 id="designer-commercial">Quero um site nessa direção</h2><p>A estrutura final será adaptada aos seus projetos, especialidades, identidade e objetivo profissional.</p></div><div><a href={contactHref} data-analytics-event="services_help_click" data-analytics-location="service_inspiration_portfolio-minimalista">Falar sobre meu portfólio <span aria-hidden="true">→</span></a><small>Contato pelo WhatsApp</small></div></section>
    <details className={styles.disclosure}><summary>Sobre os projetos demonstrativos</summary><p>“Lia Prado”, “Estúdio Orla”, “Nexo” e “Caderno 08” são identidades e projetos fictícios. A composição demonstra possibilidades de estrutura e não representa clientes, trabalhos ou resultados de Henrique Reis.</p></details>
  </main>;
}
