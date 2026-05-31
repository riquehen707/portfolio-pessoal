import { Button, Column, Heading, Row, Schema, SmartLink, Tag, Text } from "@once-ui-system/core";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import {
  baseURL,
  blog,
  person,
  productsPage,
  servicesPage,
  simulationPage,
  work,
} from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

const resourceTypes = [
  {
    status: "Planejado",
    title: "Materiais gratuitos",
    description: "Checklists e roteiros para tirar uma decisão do campo do achismo.",
    examples: ["Checklist", "Roteiro", "Guia curto"],
  },
  {
    status: "Em desenho",
    title: "Templates e estruturas",
    description: "Modelos para página, conteúdo e diagnóstico quando começar do zero atrasa tudo.",
    examples: ["Página", "Conteúdo", "Diagnóstico"],
  },
  {
    status: "Experimental",
    title: "Ferramentas simples",
    description: "Utilitários pequenos para simular conta, comparar caminho ou organizar dados.",
    examples: ["Simuladores", "Planilhas", "Apps leves"],
  },
] as const;

const availableNow = [
  {
    label: "Aprender",
    title: "Biblioteca",
    description: "Leia antes de baixar recurso que talvez nem resolva o problema.",
    href: blog.path,
    cta: "Entrar na biblioteca",
  },
  {
    label: "Decidir",
    title: "Simulação",
    description: "Veja se a conta pede ajuste interno, página melhor ou mais volume.",
    href: simulationPage.path,
    cta: "Abrir simulação",
  },
  {
    label: "Ver processo",
    title: "Laboratório",
    description: "Bastidores do que ainda está sendo testado antes de virar material.",
    href: work.path,
    cta: "Ver laboratório",
  },
] as const;

const publishingCriteria = [
  "Resolver um problema específico, sem tentar virar plataforma completa.",
  "Ter uso claro para quem precisa decidir, organizar ou executar melhor.",
  "Nascer de uma necessidade observada em conteúdo, projeto ou atendimento real.",
] as const;

export async function generateMetadata() {
  const image = buildOgImage(productsPage.title);

  return {
    title: productsPage.title,
    description: productsPage.description,
    alternates: { canonical: `${baseURL}${productsPage.path}` },
    openGraph: {
      title: productsPage.title,
      description: productsPage.description,
      url: `${baseURL}${productsPage.path}`,
      images: buildDiscoverImageMetadata(image, productsPage.title),
    },
  };
}

export default function ProductsPage() {
  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={productsPage.title}
        description={productsPage.description}
        path={productsPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(productsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${productsPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: productsPage.label, url: `${baseURL}${productsPage.path}` },
        ]}
      />

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Ferramentas
            </Tag>

            <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
              Recursos para aplicar com menos improviso.
            </Heading>

            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
              wrap="balance"
            >
              Esta área reúne materiais, templates e ferramentas simples quando eles ajudam a
              resolver uma decisão concreta.
            </Text>

            <Text className={styles.heroNote} onBackground="neutral-weak" variant="body-default-m">
              Não é uma loja para parecer cheia. Só entra recurso que eu usaria para decidir,
              organizar ou executar melhor.
            </Text>

            <Row className={styles.actions} gap="12" wrap>
              <Button href={blog.path} variant="primary" size="m" arrowIcon>
                Começar pela biblioteca
              </Button>
              <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
                Entender consultoria
              </Button>
            </Row>
          </div>

          <aside className={styles.roadmapList} aria-label="Navegação da área de ferramentas">
            <a className={styles.roadmapItem} href="#tipos">
              <span className={styles.roadmapLabel}>Tipos</span>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Gratuitos, templates e ferramentas em desenvolvimento.
              </Text>
            </a>
            <a className={styles.roadmapItem} href="#agora">
              <span className={styles.roadmapLabel}>Disponível agora</span>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Biblioteca, simulação e laboratório como apoios imediatos.
              </Text>
            </a>
            <a className={styles.roadmapItem} href="#criterio">
              <span className={styles.roadmapLabel}>Critério</span>
              <Text variant="body-default-m" onBackground="neutral-weak">
                O que precisa ser verdade para um recurso entrar aqui.
              </Text>
            </a>
          </aside>
        </div>
      </section>

      <section className={styles.section} id="tipos">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Tipos de recurso
          </Text>
          <Heading as="h2" variant="heading-strong-xl">
            Organizados pelo problema que resolvem.
          </Heading>
        </div>

        <div className={styles.resourceGrid}>
          {resourceTypes.map((resource) => (
            <article className={styles.resourceCard} key={resource.title}>
              <span className={styles.statusPill}>{resource.status}</span>
              <Heading as="h3" variant="heading-strong-m">
                {resource.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {resource.description}
              </Text>
              <div className={styles.exampleRow}>
                {resource.examples.map((example) => (
                  <span key={`${resource.title}-${example}`}>{example}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="agora">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Disponível agora
          </Text>
          <Heading as="h2" variant="heading-strong-xl">
            Enquanto o catálogo é pequeno, use o caminho certo.
          </Heading>
        </div>

        <div className={styles.linkGrid}>
          {availableNow.map((item) => (
            <article className={styles.linkCard} key={item.title}>
              <Text
                className={styles.sectionLabel}
                variant="label-default-s"
                onBackground="neutral-weak"
              >
                {item.label}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item.description}
              </Text>
              <SmartLink href={item.href} suffixIcon="arrowRight">
                {item.cta}
              </SmartLink>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.criteriaSection}`} id="criterio">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Critério
          </Text>
          <Heading as="h2" variant="heading-strong-xl">
            O que entra nesta área.
          </Heading>
        </div>

        <ul className={styles.criteriaList}>
          {publishingCriteria.map((criterion) => (
            <li key={criterion}>{criterion}</li>
          ))}
        </ul>
      </section>

      <section className={styles.nextStep} id="proximo">
        <div>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="brand-strong"
          >
            Próximo passo
          </Text>
          <Heading as="h2" variant="heading-strong-xl">
            Se precisar de algo agora, escolha pelo momento.
          </Heading>
        </div>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Para estudar, vá para a biblioteca. Para ver bastidor, vá para o laboratório. Para um
          gargalo que já custa tempo ou dinheiro, veja consultoria.
        </Text>
        <Row className={styles.actions} gap="12" wrap>
          <Button href={blog.path} variant="secondary" size="m" arrowIcon>
            Começar pela biblioteca
          </Button>
          <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
            Entender consultoria
          </Button>
        </Row>
      </section>
    </Column>
  );
}
