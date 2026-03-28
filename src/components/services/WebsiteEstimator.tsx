"use client";

import { useMemo, useState } from "react";
import {
  Column,
  Row,
  Heading,
  Text,
  Tag,
  Grid,
  Card,
  Checkbox,
  RadioButton,
  Button,
} from "@once-ui-system/core";

import styles from "./WebsiteEstimator.module.scss";

type Range = { min: number; max: number };

type ProjectType = {
  id: string;
  label: string;
  description: string;
  range: Range;
};

type Addon = {
  id: string;
  label: string;
  description: string;
  range: Range;
  note?: string;
};

const projectTypes: ProjectType[] = [
  {
    id: "landing",
    label: "Landing page de conversao",
    description: "Campanhas, lancamentos e captacao de leads.",
    range: { min: 1500, max: 3500 },
  },
  {
    id: "institutional",
    label: "Site institucional",
    description: "Presenca digital completa para profissionais e empresas.",
    range: { min: 3500, max: 8000 },
  },
  {
    id: "commerce",
    label: "E-commerce",
    description: "Catalogo, checkout e integracoes essenciais.",
    range: { min: 8000, max: 18000 },
  },
  {
    id: "commerce-app",
    label: "E-commerce + app",
    description: "Operacao completa com app complementar.",
    range: { min: 18000, max: 35000 },
  },
];

const addons: Addon[] = [
  {
    id: "cms",
    label: "CMS para conteudo",
    description: "Painel editorial para publicar e atualizar conteudo.",
    range: { min: 1000, max: 4000 },
  },
  {
    id: "payments",
    label: "Pagamentos customizados",
    description: "Checkout avancado e regras especificas.",
    range: { min: 1500, max: 6000 },
  },
  {
    id: "pwa",
    label: "PWA / app",
    description: "Experiencia mobile com notificacoes.",
    range: { min: 3000, max: 12000 },
  },
  {
    id: "integrations",
    label: "Integracoes externas",
    description: "ERP, CRM, logistica ou automacoes.",
    range: { min: 1500, max: 7000 },
  },
  {
    id: "multilingual",
    label: "Multilingue",
    description: "Mais de um idioma ou unidade.",
    range: { min: 1200, max: 4500 },
  },
  {
    id: "content-ready",
    label: "Conteudo e identidade ja prontos",
    description: "Desconto por reduzir esforco de producao.",
    range: { min: -800, max: -2500 },
    note: "Pode reduzir o orcamento final.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

type WebsiteEstimatorProps = {
  ctaHref: string;
  ctaLabel: string;
  contactEmail: string;
};

export function WebsiteEstimator({ ctaHref, ctaLabel, contactEmail }: WebsiteEstimatorProps) {
  const [projectType, setProjectType] = useState(projectTypes[0].id);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const totals = useMemo(() => {
    const base = projectTypes.find((item) => item.id === projectType) ?? projectTypes[0];
    const addonsSelected = addons.filter((item) => selected[item.id]);
    const minAdd = addonsSelected.reduce((sum, item) => sum + item.range.min, 0);
    const maxAdd = addonsSelected.reduce((sum, item) => sum + item.range.max, 0);
    const min = Math.max(0, base.range.min + minAdd);
    const max = Math.max(min, base.range.max + maxAdd);
    return { base, min, max, addonsSelected };
  }, [projectType, selected]);

  const selectedLabels = totals.addonsSelected.map((item) => item.label);
  const hasDiscount = totals.addonsSelected.some((item) => item.range.min < 0);

  return (
    <Column className={styles.root} gap="16">
      <Row className={styles.heading} gap="8" vertical="center">
        <Heading as="h2" variant="heading-strong-s">
          Estimativa rapida
        </Heading>
        <Tag size="s" background="neutral-alpha-weak">
          Simulador
        </Tag>
      </Row>
      <Text onBackground="neutral-weak">
        Selecione o tipo de projeto e os modulos desejados. Isso gera uma estimativa inicial e ajuda
        a enxergar o peso tecnico de cada camada.
      </Text>

      <Grid columns="2" s={{ columns: 1 }} gap="16">
        <Column
          className={styles.panel}
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
        >
          <Heading as="h3" variant="heading-strong-m">
            Tipo de projeto
          </Heading>
          <Column gap="8">
            {projectTypes.map((item) => (
              <RadioButton
                key={item.id}
                id={`project-${item.id}`}
                name="project-type"
                label={item.label}
                description={item.description}
                isChecked={projectType === item.id}
                onToggle={() => setProjectType(item.id)}
              />
            ))}
          </Column>
        </Column>

        <Column
          className={styles.panel}
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
        >
          <Heading as="h3" variant="heading-strong-m">
            Modulos adicionais
          </Heading>
          <Column gap="8">
            {addons.map((item) => (
              <Checkbox
                key={item.id}
                id={`addon-${item.id}`}
                label={item.label}
                description={item.description}
                isChecked={Boolean(selected[item.id])}
                onToggle={() => setSelected((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              />
            ))}
          </Column>
          {selectedLabels.length > 0 ? (
            <Row className={styles.selection} gap="8" wrap>
              {selectedLabels.map((label) => (
                <Tag key={label} size="s" background="neutral-alpha-weak">
                  {label}
                </Tag>
              ))}
            </Row>
          ) : (
            <Text variant="body-default-s" onBackground="neutral-weak">
              Selecione modulos para ajustar a estimativa.
            </Text>
          )}
          <Row gap="8" wrap>
            <Button type="button" variant="tertiary" size="s" onClick={() => setSelected({})}>
              Limpar selecao
            </Button>
          </Row>
        </Column>
      </Grid>

      <Card
        className={styles.summary}
        direction="column"
        gap="12"
        paddingX="20"
        paddingY="20"
        radius="l"
        background="surface"
      >
        <Row gap="12" vertical="center" wrap>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Estimativa inicial
          </Tag>
          <Heading className={styles.summaryValue} as="h3" variant="heading-strong-l">
            {formatCurrency(totals.min)} - {formatCurrency(totals.max)}
          </Heading>
        </Row>
        <Text onBackground="neutral-weak">
          Valores podem variar para menos ou mais conforme escopo, integracoes e volume de conteudo.
          Projetos com reaproveitamento de assets ou necessidades especificas podem receber ajustes.
        </Text>
        {hasDiscount && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            Selecoes que reduzem esforco podem gerar descontos.
          </Text>
        )}
        <Row gap="12" wrap>
          <Button href={ctaHref} variant="primary" size="m" arrowIcon>
            {ctaLabel}
          </Button>
          <Button href={`mailto:${contactEmail}`} variant="tertiary" size="m" arrowIcon>
            Falar comigo
          </Button>
        </Row>
      </Card>
    </Column>
  );
}
