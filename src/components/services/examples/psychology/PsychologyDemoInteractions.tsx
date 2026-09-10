"use client";

import { FormEvent, useState } from "react";
import styles from "./PsychologyDemo.module.scss";

const careTopics = [
  { id: "ansiedade", title: "Ansiedade e estresse", description: "Preocupações recorrentes, sobrecarga e situações que afetam sono, concentração ou rotina." },
  { id: "relacoes", title: "Relacionamentos", description: "Conflitos, limites, comunicação e mudanças nos vínculos afetivos ou familiares." },
  { id: "mudancas", title: "Mudanças de vida", description: "Transições pessoais ou profissionais, perdas e decisões que exigem reorganização." },
  { id: "autoestima", title: "Autoestima", description: "Autocrítica, comparação e dificuldades na relação com a própria imagem e escolhas." },
] as const;

export function PsychologyCareGuide() {
  const [selected, setSelected] = useState<(typeof careTopics)[number]["id"]>(careTopics[0].id);
  const current = careTopics.find((topic) => topic.id === selected) ?? careTopics[0];
  return (
    <div className={styles.careGuide}>
      <div className={styles.careOptions} role="group" aria-label="Selecionar tema de acompanhamento">
        {careTopics.map((topic) => <button type="button" aria-pressed={selected === topic.id} onClick={() => setSelected(topic.id)} key={topic.id}>{topic.title}</button>)}
      </div>
      <div className={styles.careDetail} aria-live="polite"><span>Tema selecionado</span><h3>{current.title}</h3><p>{current.description}</p><small>Os temas orientam a procura e não representam diagnóstico ou promessa de resultado.</small></div>
    </div>
  );
}

export function PsychologyContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={styles.form} id="formulario" onSubmit={handleSubmit}>
      <div className={styles.fieldPair}>
        <label>
          Nome
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          E-mail
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        Como prefere o primeiro contato?
        <select name="preference" defaultValue="whatsapp">
          <option value="whatsapp">WhatsApp</option>
          <option value="email">E-mail</option>
        </select>
      </label>
      <label>
        Mensagem
        <textarea name="message" rows={4} placeholder="Conte apenas o necessário para organizar o primeiro contato." />
      </label>
      <p className={styles.privacyNote}>Não inclua informações de saúde neste formulário demonstrativo. Nenhum dado é enviado ou armazenado.</p>
      <button type="submit">Enviar mensagem</button>
      <p className={styles.formStatus} aria-live="polite">
        {submitted ? "Mensagem simulada. Nenhum dado foi enviado." : ""}
      </p>
    </form>
  );
}

export function PsychologyWhatsAppButton() {
  const [message, setMessage] = useState("");
  return (
    <div className={styles.whatsappDemo}>
      <button type="button" onClick={() => setMessage("Contato demonstrativo: nenhum aplicativo foi aberto.")}>Conversar pelo WhatsApp</button>
      <span aria-live="polite">{message}</span>
    </div>
  );
}
