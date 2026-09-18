"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";

import type { ServiceInspiration } from "@/data/service-inspirations";
import { wellnessConcerns, wellnessInspirationMedia } from "./wellnessInspirationData";
import styles from "./WellnessInspirationPublication.module.scss";

type RelatedInspiration = Pick<ServiceInspiration, "slug" | "title" | "category" | "image" | "alt" | "width" | "height">;
type Props = { inspiration: ServiceInspiration; contactHref: string; relatedInspirations: RelatedInspiration[] };
type StageCopyProps = { number: string; title: string; lead: string; description: string; id: string };

const components = [
  ["01", "Abertura", "Explica para quem é o atendimento e qual é o próximo passo."],
  ["02", "Motivos", "Ajuda a pessoa a reconhecer temas sem oferecer diagnóstico."],
  ["03", "Modalidades", "Informa público, formato e duração antes do contato."],
  ["04", "Profissional", "Apresenta formação, abordagem e registro com clareza."],
  ["05", "Processo", "Mostra como o primeiro contato e a primeira sessão funcionam."],
  ["06", "Contato", "Reúne apenas os dados necessários para conversar sobre horários."],
] as const;

function StageCopy({ number, title, lead, description, id }: StageCopyProps) {
  return <div className={styles.stageCopy}><div className={styles.stageNumber} aria-hidden="true"><span>{number}</span><i /></div><h2 id={id}>{title}</h2><p className={styles.stageLead}>{lead}</p><p className={styles.stageDescription}>{description}</p></div>;
}

function DemoBrandBar() {
  return <header className={styles.demoBrandBar}><span className={styles.demoBrand}><i aria-hidden="true" /> Marina Vale <small>Psicologia</small></span><nav aria-label="Navegação da demonstração de bem-estar"><a href="#bem-estar-inicio">Início</a><a href="#bem-estar-motivos">Atendimento</a><a href="#bem-estar-profissional">Sobre</a><a href="#bem-estar-contato">Contato</a></nav><a className={styles.demoNavAction} href="#bem-estar-contato">Consultar horários</a></header>;
}

function HomeMockup() {
  const room = wellnessInspirationMedia[2];
  return <div className={`${styles.browserMockup} ${styles.homeMockup}`} id="bem-estar-inicio"><DemoBrandBar /><div className={styles.homeHero}><div className={styles.homeHeroCopy}><span>Psicoterapia individual para adultos</span><h3>Um espaço para entender o que está pedindo atenção.</h3><p>Atendimento online e presencial para conversar sobre emoções, relações, mudanças e dificuldades da rotina.</p><a href="#bem-estar-contato">Consultar horários</a></div><Image src={room.image} alt={room.alt} width={room.width} height={room.height} priority sizes="(max-width: 760px) 94vw, 32rem" /></div><div className={styles.infoStrip}><div><span>Público</span><strong>Adultos</strong></div><div><span>Modalidade</span><strong>Online e presencial</strong></div><div><span>Sessão</span><strong>Cerca de 50 minutos</strong></div></div></div>;
}

function ConcernsMockup() {
  const [selected, setSelected] = useState<(typeof wellnessConcerns)[number]>(wellnessConcerns[0]);
  const botanical = wellnessInspirationMedia[1];
  return <div className={`${styles.browserMockup} ${styles.concernsMockup}`} id="bem-estar-motivos"><DemoBrandBar /><div className={styles.concernsLayout}><div className={styles.concernsCopy}><span>Motivos de procura</span><h3>Você não precisa chegar com tudo organizado.</h3><p>Alguns temas que podem ser conversados em psicoterapia:</p><div className={styles.concernButtons}>{wellnessConcerns.map((concern) => <button key={concern.id} type="button" aria-pressed={selected.id === concern.id} onClick={() => setSelected(concern)}>{concern.title}</button>)}</div><div className={styles.concernAnswer} aria-live="polite"><strong>{selected.title}</strong><p>{selected.description}</p></div></div><Image src={botanical.image} alt={botanical.alt} width={botanical.width} height={botanical.height} sizes="(max-width: 760px) 94vw, 30rem" /></div></div>;
}

function ProfessionalMockup() {
  const portrait = wellnessInspirationMedia[0];
  return <div className={`${styles.browserMockup} ${styles.professionalMockup}`} id="bem-estar-profissional"><DemoBrandBar /><div className={styles.professionalLayout}><Image src={portrait.image} alt={portrait.alt} width={portrait.width} height={portrait.height} sizes="(max-width: 760px) 94vw, 25rem" /><div className={styles.professionalCopy}><span>Sobre a profissional</span><h3>Marina Vale</h3><p>Psicóloga · identidade fictícia</p><blockquote>“O trabalho começa por escutar o que a pessoa vive, sem apressar respostas ou transformar experiências em fórmulas.”</blockquote><dl><div><dt>Formação</dt><dd>Graduação em Psicologia · demonstrativa</dd></div><div><dt>Registro</dt><dd>CRP 00/000000 · fictício</dd></div><div><dt>Atendimento</dt><dd>Adultos · individual</dd></div><div><dt>Modalidades</dt><dd>Online e presencial</dd></div></dl><a href="#bem-estar-contato">Entender o primeiro contato</a></div></div></div>;
}

function ContactMockup() {
  const [notice, setNotice] = useState(false);
  function showNotice(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setNotice(true); }
  return <div className={`${styles.browserMockup} ${styles.contactMockup}`} id="bem-estar-contato"><div className={styles.contactIntro}><span>Primeiro contato</span><h3>Começar pode ser mais simples do que parece.</h3><ol><li><strong>01</strong><span>Você envia uma mensagem breve.</span></li><li><strong>02</strong><span>A disponibilidade é combinada diretamente.</span></li><li><strong>03</strong><span>A primeira sessão ajuda a compreender sua procura.</span></li></ol></div><form onSubmit={showNotice}><span>Consultar horários</span><h3>Conte somente o necessário para começarmos.</h3><label>Nome<input autoComplete="name" placeholder="Seu nome" /></label><label>Modalidade<select defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Online</option><option>Presencial</option><option>Quero conversar sobre isso</option></select></label><label>Mensagem<textarea defaultValue="Gostaria de saber sobre disponibilidade e como funciona o primeiro atendimento." /></label><button type="submit">Enviar mensagem</button><p className={styles.formNotice} aria-live="polite">{notice ? "Esta é uma demonstração: nenhuma mensagem foi enviada." : "Demonstração segura: estes campos não enviam nem armazenam dados."}</p></form></div>;
}

export function WellnessInspirationPublication({ inspiration, contactHref, relatedInspirations }: Props) {
  return <main className={styles.publication}>
    <Link className={styles.backLink} href="/servicos/inspiracoes"><span aria-hidden="true">←</span> Voltar para inspirações</Link>
    <header className={styles.intro}><div><p className={styles.eyebrow}>{inspiration.category}</p><h1>Veja como acolhimento e clareza podem conduzir o primeiro contato</h1><p className={styles.introDescription}>Uma direção para explicar o atendimento, construir confiança e ajudar a pessoa a conversar sobre disponibilidade sem pressão.</p></div><aside className={styles.introNote}><strong>Projeto demonstrativo</strong><p>Identidade, registro e informações de atendimento são fictícios.</p></aside></header>

    <section className={styles.stage} aria-labelledby="bem-estar-acolhimento-title"><StageCopy number="01" id="bem-estar-acolhimento-title" title="Acolhimento" lead="A pessoa entende rapidamente se o atendimento pode fazer sentido." description="A abertura combina linguagem cuidadosa, informação prática e uma ação discreta, sem prometer resultados ou diagnosticar quem lê." /><HomeMockup /></section>
    <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="bem-estar-entendimento-title"><StageCopy number="02" id="bem-estar-entendimento-title" title="Entendimento" lead="A pessoa reconhece temas sem precisar nomear tudo sozinha." description="Uma seleção interativa apresenta motivos de procura com responsabilidade e sem transformar experiências em rótulos clínicos." /><ConcernsMockup /></section>
    <section className={styles.stage} aria-labelledby="bem-estar-confianca-title"><StageCopy number="03" id="bem-estar-confianca-title" title="Confiança" lead="Formação, abordagem e limites aparecem antes do agendamento." description="A apresentação profissional oferece contexto suficiente para avaliar afinidade, modalidade e forma de trabalho." /><ProfessionalMockup /></section>
    <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="bem-estar-contato-title"><StageCopy number="04" id="bem-estar-contato-title" title="Contato" lead="O próximo passo é curto, claro e sem exposição desnecessária." description="O formulário pede apenas o necessário para iniciar uma conversa sobre modalidade e horários; nenhuma informação é enviada nesta demonstração." /><ContactMockup /></section>

    <section className={styles.componentsSection} aria-labelledby="wellness-components-title"><div className={styles.sectionHeading}><h2 id="wellness-components-title">Componentes que constroem essa jornada</h2><p>Informação prática, confiança e contato aparecem na ordem em que ajudam uma decisão cuidadosa.</p></div><ul className={styles.componentGrid}>{components.map(([number, title, description]) => <li key={title}><span aria-hidden="true">{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ul></section>
    <section className={styles.relatedSection} aria-labelledby="wellness-related-title"><div className={styles.sectionHeading}><h2 id="wellness-related-title">Essa direção pode acolher outros serviços de cuidado</h2><Link href="/servicos/inspiracoes">Ver mais direções →</Link></div><div className={styles.relatedGrid}>{relatedInspirations.map((related) => <Link key={related.slug} href={`/servicos/inspiracoes/${related.slug}`}><Image src={related.image} alt={related.alt} width={related.width} height={related.height} loading="eager" sizes="(max-width: 560px) 38vw, 10rem" /><span><strong>{related.title}</strong><small>{related.category}</small></span></Link>)}</div></section>
    <section className={styles.finalCta} aria-labelledby="wellness-commercial-cta-title"><div><p className={styles.eyebrow}>Vamos conversar?</p><h2 id="wellness-commercial-cta-title">Quero um site nessa direção</h2><p>Vamos adaptar essa estrutura à sua atuação, linguagem, informações profissionais e forma de atendimento.</p></div><div className={styles.finalCtaAction}><a href={contactHref} data-analytics-event="services_help_click" data-analytics-location="service_inspiration_bem-estar-acolhedor">Falar sobre meu projeto <span aria-hidden="true">→</span></a><small>Contato pelo WhatsApp</small></div></section>
    <details className={styles.mediaDisclosure}><summary>Sobre a identidade e as imagens</summary><p>Marina Vale é uma identidade fictícia. Duas imagens foram geradas para esta interface e a fotografia do ambiente é licenciada pelo Unsplash. Nenhuma representa cliente ou trabalho de Henrique Reis.</p><ul>{wellnessInspirationMedia.map((item) => <li key={item.id}><strong>{item.id === "consultorio" ? "Consultório" : item.id === "retrato-profissional" ? "Retrato profissional" : "Pausa botânica"}:</strong>{" "}{item.rights === "unsplash" ? <a href={item.source} target="_blank" rel="noreferrer">fotografia de {item.credit}</a> : item.credit}</li>)}</ul></details>
  </main>;
}
