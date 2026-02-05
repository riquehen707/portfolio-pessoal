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
    label: "Landing page de conversão",
    description: "Campanhas, lançamentos e captação de leads.",
    range: { min: 1500, max: 3500 },
  },
  {
    id: "institutional",
    label: "Site institucional",
    description: "Presença digital completa para profissionais e empresas.",
    range: { min: 3500, max: 8000 },
  },
  {
    id: "commerce",
    label: "E-commerce",
    description: "Catálogo, checkout e integrações essenciais.",
    range: { min: 8000, max: 18000 },
  },
  {
    id: "commerce-app",
    label: "E-commerce + app",
    description: "Operação completa com app complementar.",
    range: { min: 18000, max: 35000 },
  },
];

const addons: Addon[] = [
  {
    id: "cms",
    label: "CMS para conteúdo",
    description: "Painel editorial para publicar e atualizar conteúdo.",
    range: { min: 1000, max: 4000 },
  },
  {
    id: "payments",
    label: "Pagamentos customizados",
    description: "Checkout avançado e regras específicas.",
    range: { min: 1500, max: 6000 },
  },
  {
    id: "pwa",
    label: "PWA / app",
    description: "Experiência mobile com notificações.",
    range: { min: 3000, max: 12000 },
  },
  {
    id: "integrations",
    label: "Integrações externas",
    description: "ERP, CRM, logística ou automações.",
    range: { min: 1500, max: 7000 },
  },
  {
    id: "multilingual",
    label: "Multilíngue",
    description: "Mais de um idioma ou unidade.",
    range: { min: 1200, max: 4500 },
  },
  {
    id: "content-ready",
    label: "Conteúdo e identidade já prontos",
    description: "Desconto por reduzir esforço de produção.",
    range: { min: -800, max: -2500 },
    note: "Pode reduzir o orçamento final.",
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

  return (
    <Column gap="16">
      <Row gap="8" vertical="center">
        <Heading as="h2" variant="heading-strong-s">
          Estimativa rápida
        </Heading>
        <Tag size="s" background="neutral-alpha-weak">
          ?
        </Tag>
      </Row>
      <Text onBackground="neutral-weak">
        Selecione o tipo de projeto e os módulos desejados. Isso gera uma estimativa inicial (não é
        uma proposta formal).
      </Text>

      <Grid columns="2" s={{ columns: 1 }} gap="16">
        <Column
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          border="neutral-alpha-weak"
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
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          border="neutral-alpha-weak"
        >
          <Heading as="h3" variant="heading-strong-m">
            Módulos adicionais
          </Heading>
          <Column gap="8">
            {addons.map((item) => (
              <Checkbox
                key={item.id}
                id={`addon-${item.id}`}
                label={item.label}
                description={item.description}
                isChecked={Boolean(selected[item.id])}
                onToggle={() =>
                  setSelected((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                }
              />
            ))}
          </Column>
        </Column>
      </Grid>

      <Card
        direction="column"
        gap="12"
        paddingX="20"
        paddingY="20"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        border="neutral-alpha-weak"
      >
        <Row gap="12" vertical="center" wrap>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Estimativa inicial
          </Tag>
          <Heading as="h3" variant="heading-strong-l">
            {formatCurrency(totals.min)} — {formatCurrency(totals.max)}
          </Heading>
        </Row>
        <Text onBackground="neutral-weak">
          Valores podem variar para menos ou mais conforme escopo, integrações e volume de conteúdo.
          Projetos com reaproveitamento de assets ou necessidades específicas podem receber ajustes e
          descontos.
        </Text>
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
