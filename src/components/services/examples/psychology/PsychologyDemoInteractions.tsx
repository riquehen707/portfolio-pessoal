"use client";

import {
  FormEvent,
  useId,
  useState,
} from "react";

import styles from "./PsychologyDemo.module.scss";

const careTopics = [
  {
    id: "ansiedade",
    title: "Ansiedade e sobrecarga",
    description:
      "Quando preocupações, tensão ou excesso de demandas começam a ocupar espaço demais no cotidiano, no sono ou na concentração.",
  },
  {
    id: "relacoes",
    title: "Relacionamentos",
    description:
      "Conflitos, limites, comunicação e situações difíceis em relações afetivas, familiares ou profissionais.",
  },
  {
    id: "mudancas",
    title: "Mudanças e transições",
    description:
      "Momentos de perda, decisões importantes ou mudanças pessoais e profissionais que exigem reorganização.",
  },
  {
    id: "autoestima",
    title: "Autoestima e autocrítica",
    description:
      "Dificuldades relacionadas à comparação, cobrança excessiva, insegurança ou à forma como você se percebe.",
  },
] as const;

type CareTopicId =
  (typeof careTopics)[number]["id"];

type ContactPreference =
  | "whatsapp"
  | "email";

export function PsychologyCareGuide() {
  const [selected, setSelected] =
    useState<CareTopicId>(
      careTopics[0].id,
    );

  const current =
    careTopics.find(
      (topic) => topic.id === selected,
    ) ?? careTopics[0];

  const detailId = useId();

  return (
    <div className={styles.careGuide}>
      <div
        className={styles.careOptions}
        role="group"
        aria-label="Motivos de procura"
      >
        {careTopics.map((topic) => (
          <button
            type="button"
            aria-pressed={
              selected === topic.id
            }
            aria-controls={detailId}
            onClick={() =>
              setSelected(topic.id)
            }
            key={topic.id}
          >
            {topic.title}
          </button>
        ))}
      </div>

      <div
        className={styles.careDetail}
        id={detailId}
        aria-live="polite"
      >
        <span>
          Um possível motivo de procura
        </span>

        <h3>{current.title}</h3>

        <p>
          {current.description}
        </p>

        <small>
          Estes exemplos ajudam a
          apresentar possíveis motivos de
          procura. Eles não representam
          diagnóstico, avaliação clínica ou
          promessa de resultado.
        </small>
      </div>
    </div>
  );
}

export function PsychologyContactForm() {
  const [preference, setPreference] =
    useState<ContactPreference>(
      "whatsapp",
    );

  const [submitted, setSubmitted] =
    useState(false);

  const privacyId = useId();
  const statusId = useId();

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setSubmitted(true);
  }

  function handlePreferenceChange(
    value: ContactPreference,
  ) {
    setPreference(value);
    setSubmitted(false);
  }

  return (
    <form
      className={styles.form}
      id="formulario"
      onSubmit={handleSubmit}
      aria-describedby={privacyId}
    >
      <label>
        Nome
        <input
          name="name"
          autoComplete="name"
          required
          onChange={() =>
            setSubmitted(false)
          }
        />
      </label>

      <label>
        Como prefere receber o retorno?
        <select
          name="preference"
          value={preference}
          onChange={(event) =>
            handlePreferenceChange(
              event.target
                .value as ContactPreference,
            )
          }
        >
          <option value="whatsapp">
            WhatsApp
          </option>

          <option value="email">
            E-mail
          </option>
        </select>
      </label>

      {preference === "whatsapp" ? (
        <label>
          WhatsApp
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            required
            onChange={() =>
              setSubmitted(false)
            }
          />
        </label>
      ) : (
        <label>
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            required
            onChange={() =>
              setSubmitted(false)
            }
          />
        </label>
      )}

      <label>
        Mensagem
        <textarea
          name="message"
          rows={4}
          placeholder="Se quiser, conte brevemente o motivo do contato."
          onChange={() =>
            setSubmitted(false)
          }
        />
      </label>

      <p
        className={styles.privacyNote}
        id={privacyId}
      >
        Este é um formulário
        demonstrativo. Não inclua
        informações sensíveis ou detalhes de
        saúde. Nenhum dado é enviado ou
        armazenado.
      </p>

      <button type="submit">
        Solicitar contato
      </button>

      <p
        className={styles.formStatus}
        id={statusId}
        role="status"
        aria-live="polite"
      >
        {submitted
          ? "Demonstração concluída. Nenhuma informação foi enviada."
          : ""}
      </p>
    </form>
  );
}

export function PsychologyWhatsAppButton() {
  const [message, setMessage] =
    useState("");

  function simulateWhatsApp() {
    setMessage(
      "Neste projeto demonstrativo, nenhum aplicativo é aberto e nenhuma mensagem é enviada.",
    );
  }

  return (
    <div
      className={styles.whatsappDemo}
    >
      <button
        type="button"
        onClick={simulateWhatsApp}
      >
        Conversar pelo WhatsApp
      </button>

      <span
        role="status"
        aria-live="polite"
      >
        {message}
      </span>
    </div>
  );
}