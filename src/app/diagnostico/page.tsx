import { Button, Column, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { QuickDiagnostic } from "@/components/diagnostic/QuickDiagnostic";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, diagnostic, person, productsPage, social } from "@/resources";

import styles from "./page.module.scss";

const projectionPage = {
  title: `Simulador de crescimento | ${person.name}`,
  description:
    "Um simulador de projecao para estimar ganhos futuros por categoria de servico, faturamento atual e verba mensal de marketing e anuncios.",
} as const;

const heroSignals = [
  "categoria de servico",
  "faturamento + verba",
  "projecao em 90 dias",
] as const;

const diagnosisAreas = [
  {
    id: "01",
    title: "Categoria e ticket",
    description:
      "Cada segmento parte de uma base diferente de ticket, ciclo comercial e potencial de captura em 90 dias.",
  },
  {
    id: "02",
    title: "Midia e estrutura",
    description:
      "A simulacao cruza verba de anuncios com verba total de marketing para mostrar o peso da estrutura sobre a midia.",
  },
  {
    id: "03",
    title: "Ganho futuro",
    description:
      "O resultado devolve tres cenarios de crescimento com foco em ganho bruto, faturamento projetado e retorno sobre investimento.",
  },
] as const;

const pageMetrics = [
  {
    label: "Tempo",
    value: "2 min",
    detail: "Leitura rapida, sem depender de planilha externa.",
  },
  {
    label: "Entrada",
    value: "Caixa + verba",
    detail: "Categoria do servico, faturamento atual e orcamento mensal.",
  },
  {
    label: "Saida",
    value: "3 cenarios",
    detail: "Voce termina com uma projecao clara de ganho futuro.",
  },
] as const;

export async function generateMetadata() {
  return {
    title: projectionPage.title,
    description: projectionPage.description,
    alternates: { canonical: `${baseURL}${diagnostic.path}` },
    openGraph: {
      title: projectionPage.title,
      description: projectionPage.description,
      url: `${baseURL}${diagnostic.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(projectionPage.title)}` }],
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
        title={projectionPage.title}
        description={projectionPage.description}
        path={diagnostic.path}
        image={`/api/og/generate?title=${encodeURIComponent(projectionPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${diagnostic.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: diagnostic.label, url: `${baseURL}${diagnostic.path}` },
        ]}
      />

      <section className={styles.hero}>
        <Reveal className={styles.heroCopy} delay={0.04} distance={24}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Simulador de crescimento
          </Tag>

          <Heading as="h1" className={styles.heroTitle} variant="display-strong-m">
            Estime quanto seu servico pode crescer com a verba certa.
          </Heading>

          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {projectionPage.description} Comece por psicologas, advogados, corretores de imoveis e
            outros servicos que dependem de agenda, confianca e fechamento consultivo.
          </Text>

          <Row className={styles.heroActions} gap="12" wrap>
            <Button href="#simulador-projecao" variant="primary" size="m" arrowIcon>
              Simular agora
            </Button>
            <Button href={productsPage.path} variant="secondary" size="m" arrowIcon>
              Ver solucoes
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
            A direcao visual continua puxando a logica de produto do AdSense: entrada simples,
            promessa clara e uma devolutiva imediata.
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
            O que esse simulador cruza
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            O objetivo nao e dar um chute bonito. E aproximar um cenario de crescimento por categoria e verba.
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            A pagina combina premissas de mercado com os seus numeros atuais para devolver um
            intervalo mais util de ganho futuro.
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

      <section className={styles.quizSection} id="simulador-projecao">
        <div className={styles.sectionHeader}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Projecao operacional
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Ajuste categoria, faturamento e verba para enxergar o proximo degrau da operacao.
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            O resultado devolve tres cenarios de ganho em 90 dias. A leitura melhora quando a verba
            de anuncios nao vem sozinha, mas acompanhada de estrutura comercial e marketing.
          </Text>
        </div>

        <QuickDiagnostic whatsappHref={whatsappLink} productsHref={productsPage.path} />
      </section>
    </Column>
  );
}
