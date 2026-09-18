"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { ServiceInspiration } from "@/data/service-inspirations";
import { localBusinessMedia, localBusinessServices, type LocalService } from "./localBusinessInspirationData";
import styles from "./LocalBusinessInspirationPublication.module.scss";

type RelatedInspiration = Pick<ServiceInspiration, "slug" | "title" | "category" | "image" | "alt" | "width" | "height">;
type Props = { inspiration: ServiceInspiration; contactHref: string; relatedInspirations: RelatedInspiration[] };
type StageCopyProps = { number: string; title: string; lead: string; description: string; id: string };

const components = [
  ["01", "Abertura", "Mostra atmosfera, especialidade e agendamento logo no início."],
  ["02", "Serviços", "Mantém nome, duração e preço juntos durante a escolha."],
  ["03", "Agenda", "Permite revisar serviço, dia e horário antes do contato."],
  ["04", "Equipe", "Apresenta profissionais sem inventar reputação ou resultados."],
  ["05", "Localização", "Deixa endereço e horários fáceis de consultar."],
  ["06", "Contato", "Conduz ao canal escolhido sem esconder informações práticas."],
] as const;

function StageCopy({ number, title, lead, description, id }: StageCopyProps) {
  return <div className={styles.stageCopy}><div className={styles.stageNumber} aria-hidden="true"><span>{number}</span><i /></div><h2 id={id}>{title}</h2><p className={styles.stageLead}>{lead}</p><p className={styles.stageDescription}>{description}</p></div>;
}

function DemoBrandBar() {
  return <header className={styles.demoBrandBar}><span className={styles.demoBrand}><i aria-hidden="true" /> Linha 27</span><nav aria-label="Navegação da demonstração de negócio local"><a href="#local-inicio">Início</a><a href="#local-servicos">Serviços</a><a href="#local-agenda">Agenda</a><a href="#local-contato">Onde estamos</a></nav><a className={styles.demoNavAction} href="#local-agenda">Agendar</a></header>;
}

function HomeMockup() {
  const hero = localBusinessMedia[0];
  return <div className={`${styles.browserMockup} ${styles.homeMockup}`} id="local-inicio"><DemoBrandBar /><div className={styles.homeHero}><Image src={hero.image} alt={hero.alt} width={hero.width} height={hero.height} priority sizes="(max-width:760px) 94vw,62rem" /><div className={styles.homeHeroCopy}><span>Barbearia · identidade demonstrativa</span><h3>Corte preciso. Atendimento sem enrolação.</h3><p>Serviços, valores e horários visíveis antes de você sair de casa.</p><a href="#local-agenda">Escolher um horário</a></div><strong className={styles.heroStamp}>Desde<br />2026*</strong></div><div className={styles.quickStrip}><div><span>Hoje</span><strong>10h — 20h</strong></div><div><span>Endereço</span><strong>Rua do Mercado, 27*</strong></div><div><span>Contato</span><strong>WhatsApp demonstrativo</strong></div></div></div>;
}

function ServicesMockup({ selected, onSelect }: { selected: LocalService; onSelect: (service: LocalService) => void }) {
  const cut = localBusinessMedia[1];
  return <div className={`${styles.browserMockup} ${styles.servicesMockup}`} id="local-servicos"><DemoBrandBar /><div className={styles.servicesLayout}><div className={styles.servicesCopy}><span>Serviços e preços</span><h3>Escolha sabendo quanto custa e quanto tempo leva.</h3><div className={styles.serviceRows}>{localBusinessServices.map((service, index) => <button key={service.id} type="button" aria-pressed={selected.id === service.id} onClick={() => onSelect(service)}><span>{String(index + 1).padStart(2,"0")}</span><strong>{service.name}<small>{service.detail}</small></strong><em>{service.duration}</em><b>{service.price}</b></button>)}</div></div><Image src={cut.image} alt={cut.alt} width={cut.width} height={cut.height} sizes="(max-width:760px) 94vw,19rem" /></div></div>;
}

function BookingMockup({ selected }: { selected: LocalService }) {
  const [day, setDay] = useState("Qua 16");
  const [time, setTime] = useState("14:30");
  const [notice, setNotice] = useState("");
  const space = localBusinessMedia[2];
  return <div className={`${styles.browserMockup} ${styles.bookingMockup}`} id="local-agenda"><DemoBrandBar /><div className={styles.bookingLayout}><Image src={space.image} alt={space.alt} width={space.width} height={space.height} sizes="(max-width:760px) 94vw,30rem" /><div className={styles.bookingPanel}><span>Agendamento demonstrativo</span><h3>Escolha dia e horário.</h3><div className={styles.bookingSummary}><small>Serviço selecionado</small><strong>{selected.name}</strong><p>{selected.duration} · {selected.price}</p></div><p className={styles.bookingLabel}>Dia</p><div className={styles.bookingOptions}>{["Qua 16","Qui 17","Sex 18"].map((item)=><button key={item} type="button" aria-pressed={day===item} onClick={()=>{setDay(item);setNotice("");}}>{item}</button>)}</div><p className={styles.bookingLabel}>Horário</p><div className={styles.bookingOptions}>{["10:00","14:30","17:00"].map((item)=><button key={item} type="button" aria-pressed={time===item} onClick={()=>{setTime(item);setNotice("");}}>{item}</button>)}</div><button className={styles.reviewButton} type="button" onClick={()=>setNotice(`${selected.name}: ${day}, às ${time}. Nenhum horário foi reservado.`)}>Revisar horário</button><p className={styles.bookingNotice} aria-live="polite">{notice || "Fluxo seguro: nenhuma reserva é criada nesta demonstração."}</p></div></div></div>;
}

function LocationMockup() {
  const [notice, setNotice] = useState("");
  const team = localBusinessMedia[3];
  return <div className={`${styles.browserMockup} ${styles.locationMockup}`} id="local-contato"><div className={styles.locationImage}><Image src={team.image} alt={team.alt} width={team.width} height={team.height} sizes="(max-width:760px) 94vw,29rem" /><span>Equipe e identidade fictícias</span></div><div className={styles.locationCopy}><span>Onde estamos</span><h3>Perto o bastante para virar parte da rotina.</h3><address>Rua do Mercado, 27<br />Centro · endereço fictício</address><dl><div><dt>Seg — Sex</dt><dd>10h — 20h</dd></div><div><dt>Sábado</dt><dd>9h — 18h</dd></div><div><dt>Domingo</dt><dd>Fechado</dd></div></dl><button type="button" onClick={()=>setNotice("Contato demonstrativo: nenhum aplicativo foi aberto.")}>Chamar no WhatsApp ↗</button><p aria-live="polite">{notice}</p></div></div>;
}

export function LocalBusinessInspirationPublication({ inspiration, contactHref, relatedInspirations }: Props) {
  const [selectedService, setSelectedService] = useState<LocalService>(localBusinessServices[0]);
  return <main className={styles.publication}>
    <Link className={styles.backLink} href="/servicos/inspiracoes"><span aria-hidden="true">←</span> Voltar para inspirações</Link>
    <header className={styles.intro}><div><p className={styles.eyebrow}>{inspiration.category}</p><h1>Veja como um negócio local pode transformar interesse em visita</h1><p className={styles.introDescription}>Uma direção vibrante para apresentar atmosfera, serviços, preços, horários e localização sem obrigar o cliente a perguntar o básico.</p></div><aside className={styles.introNote}><strong>Projeto demonstrativo</strong><p>Marca, equipe, endereço, valores e agenda são fictícios.</p></aside></header>
    <section className={styles.stage} aria-labelledby="local-descoberta-title"><StageCopy number="01" id="local-descoberta-title" title="Descoberta" lead="O visitante reconhece a proposta e encontra a ação principal." description="A abertura combina personalidade, fotografia e informações práticas para transformar curiosidade em escolha." /><HomeMockup /></section>
    <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="local-escolha-title"><StageCopy number="02" id="local-escolha-title" title="Escolha" lead="Serviço, duração e preço permanecem juntos." description="A pessoa compara opções sem adivinhar valores ou precisar iniciar uma conversa para saber o que está disponível." /><ServicesMockup selected={selectedService} onSelect={setSelectedService} /></section>
    <section className={styles.stage} aria-labelledby="local-agendamento-title"><StageCopy number="03" id="local-agendamento-title" title="Agenda" lead="Dia, horário e resumo formam uma sequência curta." description="A interação mostra como revisar uma escolha sem criar reservas reais ou prometer disponibilidade automática." /><BookingMockup selected={selectedService} /></section>
    <section className={`${styles.stage} ${styles.stageReverse}`} aria-labelledby="local-visita-title"><StageCopy number="04" id="local-visita-title" title="Visita" lead="Endereço, funcionamento e contato fecham a decisão." description="As informações locais chegam antes do botão de contato, onde ajudam o cliente a decidir se a visita é viável." /><LocationMockup /></section>
    <section className={styles.componentsSection} aria-labelledby="local-components-title"><div className={styles.sectionHeading}><h2 id="local-components-title">Componentes que constroem essa jornada</h2><p>Uma experiência curta, pensada para responder dúvidas práticas e facilitar a ação.</p></div><ul className={styles.componentGrid}>{components.map(([number,title,description])=><li key={title}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ul></section>
    <section className={styles.relatedSection} aria-labelledby="local-related-title"><div className={styles.sectionHeading}><h2 id="local-related-title">Essa direção pode ser adaptada a outros negócios locais</h2><Link href="/servicos/inspiracoes">Ver mais direções →</Link></div><div className={styles.relatedGrid}>{relatedInspirations.map((related)=><Link key={related.slug} href={`/servicos/inspiracoes/${related.slug}`}><Image src={related.image} alt={related.alt} width={related.width} height={related.height} loading="eager" sizes="(max-width:560px) 38vw,10rem" /><span><strong>{related.title}</strong><small>{related.category}</small></span></Link>)}</div></section>
    <section className={styles.finalCta} aria-labelledby="local-commercial-title"><div><p className={styles.eyebrow}>Vamos conversar?</p><h2 id="local-commercial-title">Quero um site nessa direção</h2><p>Vamos adaptar a estrutura aos seus serviços, identidade, horários, localização e forma de atendimento.</p></div><div className={styles.finalCtaAction}><a href={contactHref} data-analytics-event="services_help_click" data-analytics-location="service_inspiration_negocio-local-vibrante">Falar sobre meu projeto <span aria-hidden="true">→</span></a><small>Contato pelo WhatsApp</small></div></section>
    <details className={styles.mediaDisclosure}><summary>Sobre a marca e as imagens</summary><p>Linha 27, equipe, endereço, preços e horários são fictícios. As fotografias são licenciadas pelo Unsplash e não representam clientes ou trabalhos de Henrique Reis.</p><ul>{localBusinessMedia.map((item)=><li key={item.id}><strong>{item.id}:</strong>{" "}<a href={item.source} target="_blank" rel="noreferrer">fotografia de {item.credit}</a></li>)}</ul></details>
  </main>;
}
