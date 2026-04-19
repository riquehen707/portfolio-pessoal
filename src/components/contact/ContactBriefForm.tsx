"use client";

import { useMemo, useState } from "react";

import { Button, Column, Input, Row, Text } from "@once-ui-system/core";
import { trackEvent } from "@/components/analytics/analytics";

import styles from "./ContactBriefForm.module.scss";

type ContactBriefFormProps = {
  email: string;
  whatsappHref: string;
  contextLabel?: string;
  submitLabel?: string;
  whatsappLabel?: string;
  helperText?: string;
};

function buildMailto(
  email: string,
  payload: { name: string; business: string; contact: string; goal: string; contextLabel: string },
) {
  const subject = encodeURIComponent(
    `Briefing inicial - ${payload.contextLabel} - ${payload.business || payload.name || "Novo contato"}`,
  );
  const body = encodeURIComponent(
    [
      `Origem: ${payload.contextLabel}`,
      `Nome: ${payload.name}`,
      `Negocio: ${payload.business}`,
      `Contato: ${payload.contact}`,
      "",
      "Objetivo:",
      payload.goal,
    ].join("\n"),
  );

  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function buildWhatsappHref(
  baseHref: string,
  payload: { name: string; business: string; contact: string; goal: string; contextLabel: string },
) {
  const separator = baseHref.includes("?") ? "&" : "?";
  const text = encodeURIComponent(
    [
      "Ola, Henrique.",
      `Origem: ${payload.contextLabel}.`,
      `Meu nome e ${payload.name || "..."}.`,
      payload.business ? `Negocio: ${payload.business}.` : "",
      payload.contact ? `Contato: ${payload.contact}.` : "",
      payload.goal ? `Objetivo: ${payload.goal}` : "",
    ]
      .filter(Boolean)
      .join(" "),
  );

  return `${baseHref}${separator}text=${text}`;
}

export function ContactBriefForm({
  email,
  whatsappHref,
  contextLabel = "Site",
  submitLabel = "Enviar briefing por e-mail",
  whatsappLabel = "Enviar pelo WhatsApp",
  helperText = "O formulario usa seu cliente de e-mail ou o WhatsApp para abrir a conversa com o briefing ja preenchido.",
}: ContactBriefFormProps) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [goal, setGoal] = useState("");

  const mailtoHref = useMemo(
    () =>
      buildMailto(email, {
        name,
        business,
        contact: contactInfo,
        goal,
        contextLabel,
      }),
    [business, contactInfo, contextLabel, email, goal, name],
  );

  const whatsappMessageHref = useMemo(
    () =>
      buildWhatsappHref(whatsappHref, {
        name,
        business,
        contact: contactInfo,
        goal,
        contextLabel,
      }),
    [business, contactInfo, contextLabel, goal, name, whatsappHref],
  );

  return (
    <Column
      as="form"
      className={styles.form}
      gap="16"
      onSubmit={(event) => {
        event.preventDefault();
        trackEvent("lead_submit", {
          channel: "email",
          location: contextLabel,
        });
        window.location.href = mailtoHref;
      }}
    >
      <Column className={styles.fields} gap="12">
        <Input
          id="contact-name"
          name="name"
          placeholder="Seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          id="contact-business"
          name="business"
          placeholder="Negocio ou segmento"
          value={business}
          onChange={(event) => setBusiness(event.target.value)}
          required
        />
        <Input
          id="contact-info"
          name="contact"
          placeholder="Seu melhor contato"
          value={contactInfo}
          onChange={(event) => setContactInfo(event.target.value)}
          required
        />
        <textarea
          className={styles.textarea}
          name="goal"
          placeholder="Qual e o principal objetivo hoje?"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          required
        />
      </Column>

      <Row className={styles.actions} gap="12" wrap>
        <Button type="submit" variant="primary" size="m" prefixIcon="send">
          {submitLabel}
        </Button>
        <Button
          href={whatsappMessageHref}
          variant="secondary"
          size="m"
          prefixIcon="whatsapp"
          onClick={() =>
            trackEvent("lead_submit", {
              channel: "whatsapp",
              location: contextLabel,
            })
          }
        >
          {whatsappLabel}
        </Button>
      </Row>

      <Text onBackground="neutral-weak" variant="body-default-s">
        {helperText}
      </Text>
    </Column>
  );
}
