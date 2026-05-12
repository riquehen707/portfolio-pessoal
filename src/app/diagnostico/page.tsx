import { Button, Column, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { QuickDiagnostic } from "@/components/diagnostic/QuickDiagnostic";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, diagnostic, person, productsPage, social } from "@/resources";

import styles from "./page.module.scss";

const heroSignals = [
  "7 perguntas binárias",
  "resultado instantâneo",
  "sem formulário longo",
] as const;

const diagnosisAreas = [
  {
    id: "01",
    title: "Captação e agenda",
    description:
      "Mostra se o fluxo entre interesse, atendimento e agendamento está claro ou ainda depende de improviso.",
  },
  {
    id: "02",
    title: "Oferta e atendimento",
    description:
      "Expõe onde catálogo, WhatsApp e processo comercial atrapalham a conversão do que já chega até você.",
  },
  {
    id: "03",
    title: "Receita e recorrência",
    description:
      "Ajuda a localizar se a operação está sustentada por retorno, controle e lógica de venda ou só por esforço diário.",
  },
] as const;

const pageMetrics = [
  {
    label: "Tempo",
    value: "2 min",
    detail: "Leitura rápida, sem atrito e sem depender de planilha.",
  },
  {
    label: "Formato",
    value: "Sim ou não",
    detail: "Perguntas diretas para o gargalo aparecer sem floreio.",
  },
  {
    label: "Saída",
    value: "Prioridades",
    detail: "Você termina com uma lista objetiva do que atacar primeiro.",
  },
] as const;

export async function generateMetadata() {
  return {
    title: diagnostic.title,
    description: diagnostic.description,
    alternates: { canonical: `${baseURL}${diagnostic.path}` },
    openGraph: {
      title: diagnostic.title,
      description: diagnostic.description,
      url: `${baseURL}${diagnostic.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(diagnostic.title)}` }],
    },
  };
}

export default function DiagnosticPage() {
  const whatsappLink =
    social.find((item) => item.name === "WhatsApp")?.link ?? "https://wa.me/5575983675164";

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={diagnostic.title}
        description={diagnostic.description}
        path={diagnostic.path}
        image={`/api/og/generate?title=${encodeURIComponent(diagnostic.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${diagnostic.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: diagnostic.label, url: `${baseURL}${diagnostic.path}` },
        ]}
      />

      <section className={styles.hero}>
        <Reveal className={styles.heroCopy} delay={0.04} distance={24}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Diagnóstico rápido
          </Tag>

          <Heading as="h1" className={styles.heroTitle} variant="display-strong-m">
            Descubra em 2 minutos onde o seu negócio está vazando.
          </Heading>

          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {diagnostic.description} Responda sete perguntas objetivas sobre agenda, catálogo,
            WhatsApp, captação, financeiro, recorrência e venda.
          </Text>

          <Row className={styles.heroActions} gap="12" wrap>
            <Button href="#diagnostico-quiz" variant="primary" size="m" arrowIcon>
              Começar agora
            </Button>
            <Button href={productsPage.path} variant="secondary" size="m" arrowIcon>
              Ver soluções
            </Button>
          </Row>

          <div className={styles.signalRail}>
            {heroSignals.map((item) => (
              <div className={styles.signalItem} key={item}>
                <span className={styles.signalDot} aria-hidden="true" />
                <Text variant="body-default-s">{item}</Text>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className={styles.heroPanel} delay={0.14} distance={28}>
          <Text className={styles.panelCaption} onBackground="neutral-weak" variant="body-default-s">
            A direção visual aqui puxa a lógica de produto do AdSense: entrada simples, promessa
            clara e devolutiva imediata.
          </Text>

          <div className={styles.panelStats}>
            {pageMetrics.map((item) => (
              <div className={styles.panelStat} key={item.label}>
                <Text className={styles.panelStatLabel} variant="body-default-s">
                  {item.label}
                </Text>
                <Text className={styles.panelStatValue} variant="heading-strong-l">
                  {item.value}
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {item.detail}
                </Text>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Tag size="s" background="neutral-alpha-weak">
            O que essa página mede
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            O objetivo não é dar nota. É localizar o ponto onde a operação começa a falhar.
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Cada bloco abaixo cobre um tipo de gargalo recorrente em negócios locais e operações
            pequenas que já estão vendendo, mas ainda sem sistema claro.
          </Text>
        </div>

        <div className={styles.areaGrid}>
          {diagnosisAreas.map((item) => (
            <Reveal className={styles.areaCard} delay={0.08} distance={18} key={item.id}>
              <Text className={styles.areaIndex} variant="body-default-s">
                {item.id}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text onBackground="neutral-weak" variant="body-default-s">
                {item.description}
              </Text>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.quizSection} id="diagnostico-quiz">
        <div className={styles.sectionHeader}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Checklist operacional
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Responda com honestidade simples: ou isso já existe, ou ainda está frouxo.
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            O resultado vai sendo montado conforme você responde. Se aparecerem vários “não”, a
            prioridade tende a ser estrutura antes de aceleração.
          </Text>
        </div>

        <QuickDiagnostic whatsappHref={whatsappLink} productsHref={productsPage.path} />
      </section>
    </Column>
  );
}
