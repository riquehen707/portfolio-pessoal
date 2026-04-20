"use client";

import { useEffect, useMemo, useState } from "react";

import { Button, Column, Input, Row, Text } from "@once-ui-system/core";
import { useSearchParams } from "next/navigation";

import { trackEvent } from "@/components/analytics/analytics";
import { ProductItem } from "@/types";

import styles from "./ProductQuoteForm.module.scss";

type ProductQuoteFormProps = {
  offers: ProductItem[];
  whatsappHref: string;
  scheduleHref: string;
};

function buildWhatsappHref(
  baseHref: string,
  payload: {
    name: string;
    business: string;
    contact: string;
    goal: string;
    product: string;
  },
) {
  const separator = baseHref.includes("?") ? "&" : "?";
  const text = encodeURIComponent(
    [
      "Olá, Henrique.",
      "Quero solicitar um orçamento.",
      payload.name ? `Nome: ${payload.name}.` : "",
      payload.business ? `Negócio: ${payload.business}.` : "",
      payload.product ? `Produto de interesse: ${payload.product}.` : "",
      payload.contact ? `Contato: ${payload.contact}.` : "",
      payload.goal ? `Objetivo principal: ${payload.goal}` : "",
    ]
      .filter(Boolean)
      .join(" "),
  );

  return `${baseHref}${separator}text=${text}`;
}

export function ProductQuoteForm({
  offers,
  whatsappHref,
  scheduleHref,
}: ProductQuoteFormProps) {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("sob-medida");

  useEffect(() => {
    const slug = searchParams.get("produto");
    if (!slug) return;

    const matchingOffer = offers.find((offer) => offer.slug === slug);
    if (matchingOffer) {
      setSelectedProduct(matchingOffer.slug);
    }
  }, [offers, searchParams]);

  const selectedLabel =
    offers.find((offer) => offer.slug === selectedProduct)?.title ?? "Orçamento sob medida";

  const whatsappMessageHref = useMemo(
    () =>
      buildWhatsappHref(whatsappHref, {
        name,
        business,
        contact: contactInfo,
        goal,
        product: selectedLabel,
      }),
    [business, contactInfo, goal, name, selectedLabel, whatsappHref],
  );

  return (
    <Column
      as="form"
      className={styles.form}
      gap="16"
      onSubmit={(event) => {
        event.preventDefault();
        trackEvent("lead_submit", {
          channel: "whatsapp",
          location: "produtos_orcamento",
          product: selectedProduct,
        });
        window.location.href = whatsappMessageHref;
      }}
    >
      <Column className={styles.fields} gap="12">
        <Input
          id="quote-name"
          name="name"
          placeholder="Seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          id="quote-business"
          name="business"
          placeholder="Negócio ou segmento"
          value={business}
          onChange={(event) => setBusiness(event.target.value)}
          required
        />
        <div className={styles.selectWrap}>
          <select
            aria-label="Produto de interesse"
            className={styles.select}
            name="product"
            value={selectedProduct}
            onChange={(event) => setSelectedProduct(event.target.value)}
          >
            <option value="sob-medida">Ainda não sei, preciso de orientação</option>
            {offers.map((offer) => (
              <option key={offer.slug} value={offer.slug}>
                {offer.title}
              </option>
            ))}
          </select>
        </div>
        <Input
          id="quote-contact"
          name="contact"
          placeholder="Seu melhor contato"
          value={contactInfo}
          onChange={(event) => setContactInfo(event.target.value)}
          required
        />
        <textarea
          className={styles.textarea}
          name="goal"
          placeholder="O que você quer destravar agora?"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          required
        />
      </Column>

      <Row className={styles.actions} gap="12" wrap>
        <Button type="submit" variant="primary" size="m" prefixIcon="whatsapp">
          Enviar pedido de orçamento
        </Button>
        <Button
          href={scheduleHref}
          variant="secondary"
          size="m"
          prefixIcon="calendar"
          onClick={() =>
            trackEvent("cta_click", {
              label: "Agendar conversa",
              location: "produtos_orcamento",
              type: "secondary",
            })
          }
        >
          Agendar conversa
        </Button>
      </Row>

      <Text onBackground="neutral-weak" variant="body-default-s">
        O briefing abre direto no WhatsApp com o contexto preenchido para acelerar o orçamento.
      </Text>
    </Column>
  );
}
