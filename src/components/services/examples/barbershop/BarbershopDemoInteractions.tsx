"use client";

import { useState } from "react";
import styles from "./BarbershopDemo.module.scss";

const services = [
  { id: "corte", name: "Corte", detail: "Tesoura ou máquina, lavagem e finalização.", price: "R$ 55", time: "45 min" },
  { id: "barba", name: "Barba", detail: "Desenho, acabamento e toalha quente.", price: "R$ 42", time: "30 min" },
  { id: "combo", name: "Corte + barba", detail: "Os dois serviços no mesmo horário.", price: "R$ 88", time: "75 min" },
  { id: "acabamento", name: "Acabamento", detail: "Contorno e ajuste entre cortes.", price: "R$ 28", time: "20 min" },
] as const;

export function BarbershopCommerce() {
  const [serviceId, setServiceId] = useState<(typeof services)[number]["id"]>("corte");
  const [day, setDay] = useState("Qua 16");
  const [time, setTime] = useState("14:30");
  const [message, setMessage] = useState("");
  const selected = services.find((service) => service.id === serviceId) ?? services[0];

  return <>
    <section className={styles.services} id="servicos" aria-labelledby="barber-services-title">
      <div className={styles.sectionLead}><span>01 / Serviços e preços</span><h2 id="barber-services-title">Escolha antes de agendar.</h2><p>Valores e duração são demonstrativos.</p></div>
      <div className={styles.serviceRows} aria-label="Serviços e preços demonstrativos">
        {services.map((service, index) => <button type="button" aria-pressed={selected.id === service.id} onClick={() => { setServiceId(service.id); setMessage(""); }} key={service.id}>
          <span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span><span className={styles.serviceName}><strong>{service.name}</strong><small>{service.detail}</small></span><span className={styles.serviceTime}>{service.time}</span><span className={styles.servicePrice}>{service.price}</span><span className={styles.serviceArrow} aria-hidden="true">Selecionar →</span>
        </button>)}
      </div>
    </section>

    <section className={styles.booking} id="agendamento" aria-labelledby="barber-booking-title">
      <div className={styles.bookingLead}><span>02 / Agendamento</span><h2 id="barber-booking-title">Escolha dia e horário.</h2><p>O serviço selecionado acima já aparece no resumo. Nenhum horário é reservado nesta demonstração.</p></div>
      <div className={styles.bookingPanel}>
        <div className={styles.bookingSummary}><span>Serviço</span><strong>{selected.name}</strong><small>{selected.time} · {selected.price}</small></div>
        <p className={styles.bookingStep}>Dia</p><div className={styles.bookingOptions} role="group" aria-label="Escolher dia">{["Qua 16", "Qui 17", "Sex 18"].map((item) => <button type="button" aria-pressed={day === item} onClick={() => { setDay(item); setMessage(""); }} key={item}>{item}</button>)}</div>
        <p className={styles.bookingStep}>Horário</p><div className={styles.bookingOptions} role="group" aria-label="Escolher horário">{["10:00", "14:30", "17:00"].map((item) => <button type="button" aria-pressed={time === item} onClick={() => { setTime(item); setMessage(""); }} key={item}>{item}</button>)}</div>
        <button className={styles.bookingSubmit} type="button" onClick={() => setMessage(`${selected.name}: ${day}, às ${time}. Simulação concluída; nenhum horário foi reservado.`)}>Revisar horário <span aria-hidden="true">→</span></button>
        <p className={styles.bookingFeedback} aria-live="polite">{message || "Fluxo demonstrativo — não envia dados."}</p>
      </div>
    </section>
  </>;
}

export function BarbershopWhatsApp() {
  const [message, setMessage] = useState("");
  return <div className={styles.whatsappDemo}><button type="button" onClick={() => setMessage("Contato demonstrativo: nenhum aplicativo foi aberto.")}>Chamar no WhatsApp ↗</button><span aria-live="polite">{message}</span></div>;
}
