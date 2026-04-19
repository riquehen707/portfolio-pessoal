import { Button, Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { ContactBriefForm } from "@/components/contact/ContactBriefForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import ScheduleCall from "@/components/about/ScheduleCall";
import { about, baseURL, contact, contentStrategy, person, social } from "@/resources";

import styles from "./page.module.scss";

const contactStrategy = contentStrategy.pages.contact;
const contactMethods = [
  {
    label: "Agenda online",
    title: "Escolha um horário e avance sem atrito.",
    description: "Melhor opção para alinhar contexto, objetivo e prioridade em uma conversa curta.",
  },
  {
    label: "WhatsApp",
    title: "Contato direto para quem quer rapidez.",
    description: "Ideal para tirar dúvidas iniciais, validar fit e acelerar o próximo passo.",
  },
  {
    label: "Formulário simples",
    title: "Envie um briefing enxuto e objetivo.",
    description: "Bom caminho para negócios que já sabem o que querem destravar.",
  },
] as const;

const contactBenefits = [
  "Leitura objetiva do cenário atual",
  "Clareza sobre prioridade, formato e próximo passo",
  "Direção mais segura para presença, operação e crescimento",
];

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: contact.title,
      description: contact.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
      path: contact.path,
    }),
    keywords: contactStrategy.seo.keywords,
  };
}

export default function ContactPage() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? "https://wa.me/5575983675164";

  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={contact.title}
        description={contact.description}
        path={contact.path}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Contato", url: `${baseURL}${contact.path}` },
        ]}
      />

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          {contactStrategy.hero.eyebrow}
        </Tag>
        <Heading variant="heading-strong-xl">{contactStrategy.hero.headline}</Heading>
        <div className={styles.accentLine} />
        <Text
          className={styles.heroLead}
          onBackground="neutral-weak"
          variant="heading-default-m"
          wrap="balance"
        >
          {contactStrategy.hero.subheadline}
        </Text>

        <Row className={styles.heroActions} gap="12" wrap>
          <Button
            href={contactStrategy.hero.primaryCtaHref}
            variant="primary"
            size="m"
            prefixIcon="calendar"
            data-analytics-event="cta_click"
            data-analytics-label={contactStrategy.hero.primaryCtaLabel}
            data-analytics-location="contact_hero"
            data-analytics-type="primary"
          >
            {contactStrategy.hero.primaryCtaLabel}
          </Button>
          {contactStrategy.hero.secondaryCtaHref && contactStrategy.hero.secondaryCtaLabel && (
            <Button
              href={contactStrategy.hero.secondaryCtaHref}
              variant="secondary"
              size="m"
              prefixIcon="whatsapp"
              data-analytics-event="cta_click"
              data-analytics-label={contactStrategy.hero.secondaryCtaLabel}
              data-analytics-location="contact_hero"
              data-analytics-type="secondary"
            >
              {contactStrategy.hero.secondaryCtaLabel}
            </Button>
          )}
        </Row>
      </Column>

      <Grid className={styles.methodsGrid} columns="3" s={{ columns: 1 }} gap="16">
        {contactMethods.map((method) => (
          <Column key={method.label} className={styles.methodCard} gap="12" padding="20">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              {method.label}
            </Text>
            <Heading as="h2" variant="heading-strong-m" wrap="balance">
              {method.title}
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              {method.description}
            </Text>
          </Column>
        ))}
      </Grid>

      <Column className={styles.panel} gap="20" padding="24">
        <Column className={styles.panelIntro} gap="8">
          <Tag size="s" background="neutral-alpha-weak">
            {contactStrategy.sections[1]?.label ?? "O que acontece"}
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            {contactStrategy.sections[1]?.title ??
              "Uma conversa para entender contexto e prioridade."}
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            {contactStrategy.sections[1]?.description ??
              "O objetivo não é vender no impulso. É ler o cenário, mapear o gargalo e definir o formato de trabalho mais adequado."}
          </Text>
        </Column>

        <Grid className={styles.contentGrid} columns="2" s={{ columns: 1 }} gap="16">
          <Column className={styles.panel} gap="16" padding="20">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Agenda online
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Se a melhor próxima etapa for conversar ao vivo, marque direto.
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              A agenda serve para quem já quer colocar contexto, prioridade e direção na mesa sem
              perder tempo com troca solta de mensagem.
            </Text>
            <ScheduleCall link={contactStrategy.hero.primaryCtaHref} label="Agendar uma ligação" />
          </Column>

          <Column className={styles.panel} gap="16" padding="20">
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Briefing simples
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              Se preferir, descreva o cenário e eu respondo com o próximo passo.
            </Heading>
            <ContactBriefForm
              email={person.email}
              whatsappHref={whatsappLink}
              contextLabel="Pagina de contato"
            />
          </Column>
        </Grid>
      </Column>

      <Column className={styles.panel} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          O que essa conversa pode destravar
        </Tag>
        <Grid className={styles.benefitsGrid} columns="3" s={{ columns: 1 }} gap="16">
          {contactBenefits.map((item) => (
            <Column key={item} className={styles.methodCard} gap="12" padding="20">
              <Text variant="heading-strong-m" wrap="balance">
                {item}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>
    </Column>
  );
}
