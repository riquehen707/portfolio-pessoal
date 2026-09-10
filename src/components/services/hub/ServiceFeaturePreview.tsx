"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import type { ServiceFeaturePreviewKind } from "@/data/service-hub";
import styles from "./ServiceFeaturePreview.module.scss";

const portfolioItems = [
  { title: "Casa Pátio 06", category: "Residencial", src: "/images/services/site-arquitetos/residencial.webp" },
  { title: "Interior Linha 02", category: "Interiores", src: "/images/services/site-arquitetos/interiores.webp" },
  { title: "Centro Arco 11", category: "Comercial", src: "/images/services/site-arquitetos/cultural.webp" },
] as const;

const demoServices = [
  { id: "cut", name: "Corte", time: "45 min", price: "R$ 55" },
  { id: "beard", name: "Barba", time: "30 min", price: "R$ 42" },
  { id: "combo", name: "Corte + barba", time: "75 min", price: "R$ 88" },
] as const;

function WhatsAppPreview() {
  const [message, setMessage] = useState("Nenhum aplicativo será aberto.");
  return <div className={styles.whatsapp}><span>TRAÇO 84 · CONTATO</span><h4>Quer conversar sobre seu horário?</h4><p>Envie uma mensagem e confirme a disponibilidade.</p><button type="button" onClick={() => setMessage("Interação demonstrada. Nenhuma mensagem foi enviada.")}>Falar pelo WhatsApp</button><small aria-live="polite">{message}</small></div>;
}

function FormPreview() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("Demonstração: os dados não são enviados.");
  const hasError = feedback.startsWith("Preencha");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(name.trim() && contact.trim() && message.trim() ? "Formulário demonstrado. Nenhum dado foi enviado." : "Preencha os três campos para ver a confirmação.");
  }
  return <form className={styles.form} onSubmit={submit} noValidate aria-describedby="feature-form-feedback"><span>PRIMEIRO CONTATO</span><div><label>Nome<input required aria-invalid={hasError && !name.trim()} value={name} onChange={(event) => setName(event.target.value)} /></label><label>Contato<input required aria-invalid={hasError && !contact.trim()} value={contact} onChange={(event) => setContact(event.target.value)} /></label></div><label>Mensagem<textarea required aria-invalid={hasError && !message.trim()} rows={3} value={message} onChange={(event) => setMessage(event.target.value)} /></label><button type="submit">Enviar mensagem</button><small id="feature-form-feedback" aria-live="polite">{feedback}</small></form>;
}

function PortfolioPreview() {
  const [selected, setSelected] = useState(0);
  const project = portfolioItems[selected];
  return <div className={styles.portfolio}><div className={styles.portfolioImage}><Image src={project.src} alt="Imagem demonstrativa de arquitetura" fill sizes="(max-width: 760px) 90vw, 46rem" /><span>{project.category}</span><strong>{project.title}</strong></div><div className={styles.projectTabs} role="group" aria-label="Escolher projeto demonstrativo">{portfolioItems.map((item, index) => <button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} key={item.title}><span>0{index + 1}</span>{item.title}</button>)}</div></div>;
}

function ServicesPreview() {
  const [selected, setSelected] = useState<(typeof demoServices)[number]["id"]>(demoServices[0].id);
  return <div className={styles.services}><span>SERVIÇOS E PREÇOS · VALORES FICTÍCIOS</span>{demoServices.map((service) => <button type="button" aria-pressed={selected === service.id} onClick={() => setSelected(service.id)} key={service.id}><strong>{service.name}</strong><small>{service.time}</small><b>{service.price}</b><i>{selected === service.id ? "Selecionado" : "Selecionar"}</i></button>)}</div>;
}

function MapPreview() {
  const [feedback, setFeedback] = useState("Endereço demonstrativo.");
  return <div className={styles.map}><div className={styles.mapGraphic} aria-hidden="true"><i /><i /><i /><b>84</b><span>CENTRO<br />SALVADOR</span></div><div className={styles.mapCopy}><span>TRAÇO 84</span><h4>Rua do Traço, 84</h4><p>Centro, Salvador · endereço fictício</p><button type="button" onClick={() => setFeedback("Rota demonstrada. Nenhum mapa externo foi aberto.")}>Ver rota</button><small aria-live="polite">{feedback}</small></div></div>;
}

function SchedulingPreview() {
  const [service, setService] = useState("Corte");
  const [professional, setProfessional] = useState("Caio");
  const [time, setTime] = useState("14:30");
  const [feedback, setFeedback] = useState("Fluxo local: nenhum horário será reservado.");
  return <div className={styles.scheduling}><span>AGENDAMENTO · DEMONSTRAÇÃO</span><div className={styles.scheduleFields}><label>Serviço<select value={service} onChange={(event) => setService(event.target.value)}><option>Corte</option><option>Barba</option><option>Corte + barba</option></select></label><label>Profissional<select value={professional} onChange={(event) => setProfessional(event.target.value)}><option>Caio</option><option>Léo</option></select></label><label>Horário<select value={time} onChange={(event) => setTime(event.target.value)}><option>10:00</option><option>14:30</option><option>17:00</option></select></label></div><div className={styles.scheduleSummary}><p><strong>{service}</strong><span>{professional} · {time}</span></p><button type="button" onClick={() => setFeedback(`${service}, com ${professional}, às ${time}. Demonstração concluída; nada foi reservado.`)}>Revisar horário</button></div><small aria-live="polite">{feedback}</small></div>;
}

export function ServiceFeaturePreview({ kind }: { kind: ServiceFeaturePreviewKind }) {
  if (kind === "form") return <FormPreview />;
  if (kind === "portfolio") return <PortfolioPreview />;
  if (kind === "services") return <ServicesPreview />;
  if (kind === "map") return <MapPreview />;
  if (kind === "scheduling") return <SchedulingPreview />;
  return <WhatsAppPreview />;
}
